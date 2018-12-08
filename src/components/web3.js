var Web3 = require('web3');
// require('./web3config');
const infuraEndpoint =
  'https://rinkeby.infura.io/v3/8235d0efb49f4a8eaacdb0544078d834';
let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  web3 = new Web3(window.web3.currentProvider);
  console.log('MetaMask is running');
} else {
  // console.log('MetaMask is not running');
  // If loaded not in browser, or if metakamask in not running...
  const provider = new Web3.providers.HttpProvider(infuraEndpoint);
  web3 = new Web3(provider);
  // console.log('metamask is not running');
}
//need error handling since web3 would be undefined
export default web3;
