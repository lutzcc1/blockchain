// main file to test and use the blockchain

const Blockchain = require("./blockchain");
const Transaction = require("./transaction");
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('9282b733e679238669e9759d2546581d2117d3d3fe90a5c0e19598b87c533b27');
const myWalletAddress = myKey.getPublic('hex');

const xKey = ec.keyFromPrivate('1e0176a58d92d6ee344a09a381bb7e70d6cd1e0cc6481a90d0ceb1b71fa21f5e');
const xWalletAddress = xKey.getPublic('hex');

let lcoin = new Blockchain();














