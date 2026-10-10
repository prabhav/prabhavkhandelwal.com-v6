const fs=require('fs'),path=require('path'),crypto=require('crypto'),sharp=require('sharp');
const inventory=require('./inventory.cjs');const {root}=inventory;
sharp.cache({memory:64,files:20,items:100});sharp.concurrency(2);
const output=path.join(root,'assets/img/optimized');fs.mkdirSync(output,{recursive:true});
const manifest={version:1,recipe:'responsive-webp-v3',assets:{},hover:{}};
const manifestPath=path.join(root,'_data/image_assets.json');
const previous=fs.existsSync(manifestPath)?JSON.parse(fs.readFileSync(manifestPath)):{};
const originals=JSON.parse(fs.readFileSync(path.join(__dirname,'reports/audit.json')));const audit=new Map(originals.map(x=>[x.path,x]));
const unique=new Map();
(async()=>{for(const source of inventory.used){
 if(!/\.(png|jpe?g|gif)$/i.test(source)||/\/favicon\/|\/og\./.test(source))continue;
 const file=path.join(root,source),meta=await sharp(file,{animated:true,limitInputPixels:false}).metadata();
 const hash=crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');const animated=(meta.pages||1)>1;
 const cached=previous.assets?.[source];
 if(previous.recipe===manifest.recipe&&cached?.sha256===hash&&cached.variants.every(v=>fs.existsSync(path.join(root,v.url)))){manifest.assets[source]=cached;continue;}
 const maxWidth=Math.min(meta.width,source.startsWith('/assets/img/wall/')?960:3840);const widths=[...new Set([480,960,1600,2400,3200,3840].filter(x=>x<maxWidth).concat(maxWidth))];
 const profile=animated?'animation-q88-v2':'lossless-v1';
 const key=hash+'-'+profile;let variants=unique.get(key);
 if(!variants){variants=[];for(const width of widths){
  const name=hash.slice(0,20)+'-'+profile+'-'+width+'.webp',out=path.join(output,name);
  if(!fs.existsSync(out)){console.log('encode',source,width,animated?'animated':'static');await sharp(file,{animated,limitInputPixels:false}).resize({width,withoutEnlargement:true}).webp({lossless:!animated,quality:88,alphaQuality:100,smartSubsample:true,effort:4,loop:meta.loop,delay:meta.delay}).toFile(out);}
  let chosen=name,bytes=fs.statSync(out).size;
  if(animated){
    const lossless=hash.slice(0,20)+'-lossless-v1-'+width+'.webp';
    const candidate=path.join(output,lossless);
    if(!fs.existsSync(candidate))await sharp(file,{animated:true,limitInputPixels:false}).resize({width,withoutEnlargement:true}).webp({lossless:true,effort:4,loop:meta.loop,delay:meta.delay}).toFile(candidate);
    if(fs.statSync(candidate).size<bytes){chosen=lossless;bytes=fs.statSync(candidate).size;}
  }
  // Keep the original fallback when conversion would increase the transfer size.
  if(bytes<fs.statSync(file).size)variants.push({width,url:'/assets/img/optimized/'+chosen,bytes});
 }
 if(!variants.some(v=>v.width===maxWidth))variants=[];
 variants=variants.filter((v,i,all)=>!all.slice(i+1).some(larger=>larger.bytes<=v.bytes));
 unique.set(key,variants);}
 manifest.assets[source]={source,width:meta.width,height:meta.pageHeight||meta.height,frames:meta.pages||1,loop:meta.loop,delay:meta.delay,alpha:meta.hasAlpha,bytes:fs.statSync(file).size,sha256:hash,variants};
 }
 for(const [url,source] of Object.entries(inventory.external)){manifest.assets[url]=manifest.assets[source];}
 for(const source of inventory.used.filter(x=>x.startsWith('/assets/img/wall/'))){const a=manifest.assets[source];if(a?.variants.length){const v=a.variants;manifest.hover[path.basename(source,'.gif')]={src:v[v.length-1].url,srcset:v.map(x=>`${x.url} ${x.width}w`).join(', '),sizes:'(min-width: 1640px) 512px, 32vw',original:source};}}
 fs.mkdirSync(path.join(root,'_data'),{recursive:true});fs.writeFileSync(path.join(root,'_data/image_assets.json'),JSON.stringify(manifest,null,2)+'\n');
 const keep=new Set(Object.values(manifest.assets).flatMap(a=>a.variants.map(v=>path.basename(v.url))));
 for(const file of fs.readdirSync(output))if(/^[a-f0-9]{20}-.*\.webp$/.test(file)&&!keep.has(file))fs.unlinkSync(path.join(output,file));
 console.log('Generated manifest for',Object.keys(manifest.assets).length,'sources');
})().catch(e=>{console.error(e);process.exit(1)});
