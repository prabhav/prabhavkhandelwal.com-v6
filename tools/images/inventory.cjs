const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'../..');
const external=JSON.parse(fs.readFileSync(path.join(__dirname,'external-sources.json')));
const refs=JSON.parse(fs.readFileSync(path.join(__dirname,'reports/references-before.json')));
function local(url){if(external[url])return external[url];try{const u=new URL(url,'https://prabhavkhandelwal.com');if(u.hostname==='prabhavkhandelwal.com')return decodeURIComponent(u.pathname)}catch{}return null;}
const used=new Set(),missing=new Set();
for(const r of refs){const urls=r.attribute==='srcset'?r.value.split(/,\s*/).map(x=>x.trim().replace(/\s+[\d.]+[wx]$/,'')):[r.value];for(const url of urls){if(!url)continue;const p=local(url);if(p&&/\.(png|jpe?g|gif|svg)$/i.test(p)){if(fs.existsSync(path.join(root,p)))used.add(p);else missing.add(p)}}}
// The homepage requests these only on hover; they don't appear in img src at build time.
const home=fs.readFileSync(path.join(root,'index.markdown'),'utf8');
for(const m of home.matchAll(/class="point"[^>]*id="([^"]+)"/g)){const p='/assets/img/wall/'+m[1]+'.gif';if(fs.existsSync(path.join(root,p)))used.add(p);else missing.add(p)}
const result={used:[...used].sort(),missing:[...missing].sort(),external};
if(require.main===module){fs.writeFileSync(path.join(__dirname,'reports/referenced.json'),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({used:used.size,missing:[...missing]},null,2))}
module.exports={root,local,...result};
