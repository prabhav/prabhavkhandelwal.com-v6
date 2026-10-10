const fs=require('fs'),path=require('path'),crypto=require('crypto'),sharp=require('sharp');
const root=path.resolve(__dirname,'../..');
const {Parser}=require('htmlparser2');
const refs=[];
for(const file of walk(path.join(root,'_site')).filter(p=>p.endsWith('.html'))){
 const parser=new Parser({onopentag(tag,attrs){
  if(tag==='img')for(const attribute of ['src','srcset'])if(attrs[attribute])refs.push({page:path.relative(root,file),tag,attribute,value:attrs[attribute]});
  if(tag==='video'&&(attrs['data-original-poster']||attrs.poster))refs.push({page:path.relative(root,file),tag,attribute:'poster',value:attrs['data-original-poster']||attrs.poster});
 }});parser.write(fs.readFileSync(file,'utf8'));parser.end();
}
fs.mkdirSync(path.join(__dirname,'reports'),{recursive:true});
fs.writeFileSync(path.join(__dirname,'reports/references-before.json'),JSON.stringify(refs,null,2)+'\n');
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(x=>x.isDirectory()?walk(path.join(dir,x.name)):[path.join(dir,x.name)]);}
(async()=>{const assets=[];for(const p of walk(path.join(root,'assets/img')).filter(p=>/\.(png|jpe?g|gif|svg|ico)$/i.test(p))){const b=fs.readFileSync(p);let meta={};try{meta=await sharp(p,{animated:true,limitInputPixels:false}).metadata()}catch(e){meta.error=e.message}assets.push({path:'/'+path.relative(root,p),bytes:b.length,sha256:crypto.createHash('sha256').update(b).digest('hex'),format:meta.format||path.extname(p).slice(1),width:meta.width,height:meta.pageHeight||meta.height,pages:meta.pages||1,loop:meta.loop,delay:meta.delay,alpha:meta.hasAlpha});}fs.mkdirSync(path.join(__dirname,'reports'),{recursive:true});fs.writeFileSync(path.join(__dirname,'reports/audit.json'),JSON.stringify(assets,null,2)+'\n');console.log(JSON.stringify(assets.sort((a,b)=>b.bytes-a.bytes).slice(0,22),null,2));})();
