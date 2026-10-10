const {spawnSync}=require('child_process'),path=require('path');const root=path.resolve(__dirname,'../..');
function run(command,args,extra={}){const r=spawnSync(command,args,{cwd:root,stdio:'inherit',env:{...process.env,...extra}});if(r.error)throw r.error;if(r.status!==0)process.exit(r.status||1);}
run('bundle',['exec','jekyll','build'],{JEKYLL_IMAGE_OPTIMIZATION:'0'});
run(process.execPath,['tools/images/audit.cjs']);
run(process.execPath,['tools/images/fetch-external.cjs']);
run(process.execPath,['tools/images/audit.cjs']);
run(process.execPath,['tools/images/inventory.cjs']);
run(process.execPath,['tools/images/optimize.cjs']);
run('bundle',['exec','jekyll','build']);
run(process.execPath,['tools/images/verify.cjs']);
run(process.execPath,['tools/images/budgets.cjs']);
