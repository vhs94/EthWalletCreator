const ethers = require("ethers");
const bip39 = require("bip39");
const hdkey = require("hdkey");
const ethUtil = require("ethereumjs-util");

//Ver post : https://medium.com/@harshagoli/so-you-want-to-build-an-ethereum-hd-wallet-cb2b7d7e4998

const mnemonic = bip39.generateMnemonic();
let wallet = ethers.Wallet.fromMnemonic(mnemonic);

const seed = bip39.mnemonicToSeedSync(mnemonic);
const root = hdkey.fromMasterSeed(seed);
const masterPrivateKey = root.privateKey.toString('hex');

const addrNode = root.derive("m/44'/60'/0'/0/0");
const pubKey = ethUtil.privateToPublic(addrNode._privateKey);
const addr = ethUtil.publicToAddress(pubKey).toString('hex');
const address = ethUtil.toChecksumAddress(addr);
/*
   If using ethereumjs-wallet instead do:
   const address = addrNode.getWallet().getChecksumAddressString();
*/
 

console.log("mnemonic: " + mnemonic);
console.log("seed: " + seed.toString('hex'));
console.log("address 1: " + address);
console.log("Ethers.js wallet obj: "+JSON.stringify(wallet));

