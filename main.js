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

lcoin.minePendingTransactions(myWalletAddress);
lcoin.minePendingTransactions("minerAddress");

let tx1 = new Transaction(myWalletAddress, xWalletAddress, 10);
tx1.signTransaction(myKey);
lcoin.addTransaction(tx1);

lcoin.minePendingTransactions("minerAddress");

let tx2 = new Transaction(xWalletAddress, "TestAddress", 3);
tx2.signTransaction(xKey);
lcoin.addTransaction(tx2);

lcoin.minePendingTransactions("minerAddress");

console.log(JSON.stringify(lcoin, null, 4));

console.log("My balance: ", lcoin.getBalanceOfAddress(myWalletAddress));
console.log("x balance: ", lcoin.getBalanceOfAddress(xWalletAddress));
console.log("TestAddress balance: ", lcoin.getBalanceOfAddress("TestAddress"));

console.log("Valid: ", lcoin.isChainValid());





