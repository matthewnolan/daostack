start dev: 
npm start

deploy: 
npm run build

after truffle migrate: 
rm -rf src/build
cp build src/build


note: current chain is currently hard coded. 
let currentChain = 'kovan'


