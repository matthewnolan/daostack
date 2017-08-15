start dev: 
npm start

deploy: 
npm run build

after truffle migrate: 
rm -rf src/build
cp -a build src/build


note: ccurrentChain is hard coded. 
let currentChain = 'kovan'


