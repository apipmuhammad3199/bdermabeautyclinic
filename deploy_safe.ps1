npm run build --prefix katalog-web
if (Test-Path ../temp-deploy) { Remove-Item -Recurse -Force ../temp-deploy }
New-Item -ItemType Directory -Path ../temp-deploy
Copy-Item -Path katalog-web/dist/* -Destination ../temp-deploy/ -Recurse -Force
cd ../temp-deploy
git init
git checkout -b gh-pages
git add .
git commit -m "Deploy to enefclinic.com custom domain"
git remote add origin https://github.com/apipmuhammad3199/enif-clinic-katalog.git
git push -f origin gh-pages
cd ../enifclinic_katalogweb
Remove-Item -Recurse -Force ../temp-deploy
Remove-Item deploy_safe.ps1
