// Allows us to use ES6 in our migrations and tests.
require("babel-polyfill");
require("babel-register")({
  "presets": ["es2015"],
  "plugins": ["syntax-async-functions","transform-regenerator"]
});


module.exports = {
  build: 'webpack',
  networks: {
    "live": {
      network_id: 1,
      host: "localhost",
      port: 8546   // Different than the default below
    },    
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
      from: "",
      gas: 4700036
    },
    staging: {
      host: "localhost",
      port: 8546,
      network_id: 1337
    },
    ropsten: {
      host: "158.253.8.12",
      port: 8545,
      network_id: 3
    }
  },
  migrations_directory: './migrations'
}


