const fs=require('fs'),path=require('path'),crypto=require('crypto'),assert=require('assert'),sharp=require('sharp');const {Parser}=require('htmlparser2');
const {root,local}=require('./inventory.cjs');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'_data/image_assets.json')));
const audit=JSON.parse(fs.readFileSync(path.join(__dirname,'reports/audit.json')));
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
function walk(p){return fs.readdirSync(p,{withFileTypes:true}).flatMap(x=>x.isDirectory()?walk(path.join(p,x.name)):[path.join(p,x.name)]);}
function paths(srcset){return srcset.split(',').map(s=>s.trim().replace(/\s+[\d.]+[wx]$/,''));}
(async()=>{const stats={pages:0,pictures:0,lazyImages:0,eagerImages:0,posters:0,checkedVariants:0,animations:0};const checked=new Set(),types={};
for(const a of audit){assert.equal(sha(fs.readFileSync(path.join(root,a.path))),a.sha256,'Original changed: '+a.path);}
for(const [source,a] of Object.entries(manifest.assets)){
 if(source.startsWith('http'))continue;
 assert.equal(sha(fs.readFileSync(path.join(root,source))),a.sha256,source);
 const type=path.extname(source).slice(1).replace('jpg','jpeg');types[type]||={assets:0,originalBytes:0,largestDeliveredBytes:0};types[type].assets++;types[type].originalBytes+=a.bytes;types[type].largestDeliveredBytes+=a.variants.length?a.variants.at(-1).bytes:a.bytes;
 for(const v of a.variants){if(checked.has(v.url))continue;checked.add(v.url);const m=await sharp(path.join(root,v.url),{animated:true,limitInputPixels:false}).metadata();assert.equal(m.width,v.width);assert(Math.abs((m.pageHeight||m.height)-a.height*v.width/a.width)<=1,'aspect ratio '+v.url);assert(v.bytes<a.bytes);stats.checkedVariants++;
  if(a.frames>1){assert.equal(m.pages,a.frames,'frame count '+source);assert.equal(m.loop,a.loop,'loop '+source);assert.deepEqual(m.delay,a.delay,'frame timing '+source);stats.animations++;}
 }
}
for(const file of walk(path.join(root,'_site')).filter(p=>p.endsWith('.html'))){stats.pages++;const parser=new Parser({onopentag(name,a){
 const refs=[];
 if(name==='picture')stats.pictures++;
 if(name==='img'){
  if(a.src)refs.push(a.src);if(a.srcset)refs.push(...paths(a.srcset));
  if(a['data-optimized-image']){assert(Number(a.width)>0&&Number(a.height)>0);assert(['eager','lazy'].includes(a.loading));if(a.loading==='lazy')stats.lazyImages++;else stats.eagerImages++;}
 }
 if(name==='source'&&a.type==='image/webp')refs.push(...paths(a.srcset));
 if(name==='video'&&a.poster){refs.push(a.poster);stats.posters++;}
 for(const url of refs){const p=local(url);if(p)assert(fs.existsSync(path.join(root,'_site',p)),`Missing image ${url} in ${file}`);}
 }});parser.write(fs.readFileSync(file,'utf8'));parser.end();}
for(const type of Object.values(types)){type.savedBytes=type.originalBytes-type.largestDeliveredBytes;type.savingsPercent=Number((100*type.savedBytes/type.originalBytes).toFixed(2));}
const originalBytes=Object.values(types).reduce((s,t)=>s+t.originalBytes,0),deliveredBytes=Object.values(types).reduce((s,t)=>s+t.largestDeliveredBytes,0);
const allRaster=audit.filter(a=>['png','jpeg','gif'].includes(a.format));const report={...stats,byType:types,referencedRaster:{originalBytes,largestDeliveredBytes:deliveredBytes,savedBytes:originalBytes-deliveredBytes,savingsPercent:Number((100*(1-deliveredBytes/originalBytes)).toFixed(2))},rasterLibrary:{files:allRaster.length,bytes:allRaster.reduce((s,a)=>s+a.bytes,0)},derivativeStorageBytes:[...checked].reduce((s,p)=>s+fs.statSync(path.join(root,p)).size,0),notes:['Largest available derivative per referenced original; responsive browsers often select smaller candidates. This is an asset payload budget, not a measured page load benchmark.','Original PNG/JPEG/GIF files remain available as picture fallbacks and source masters.','SVG, social preview and favicon files are retained unchanged.','Videos are outside the image-compression scope; only their image posters are optimized.']};
fs.writeFileSync(path.join(__dirname,'reports/verification.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
})().catch(e=>{console.error(e);process.exit(1)});
