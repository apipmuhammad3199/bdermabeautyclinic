git checkout -f main
git branch -D gh-pages-temp
git checkout --orphan gh-pages-temp
git rm -rf .
Copy-Item -Path katalog-web/dist/* -Destination . -Recurse -Force
git add .
git commit -m "Deploy from bot"
git push -f origin HEAD:gh-pages
git checkout -f main
git branch -D gh-pages-temp
