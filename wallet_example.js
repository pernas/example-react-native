'use strict';
global.self = global
const network = require('dream-wallet/src/network')

module.exports = function example() {
  const api = network.createWalletApi()
  const p = api.getWallet('f9df366a-3fc3-4826-827f-fb3c1e8ce616','00efae13-985b-4858-81ad-71bd8b5ac863','100 cent')
  return p
};
