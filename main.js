// import Blockchain from './blockchain';
// import Transaction from './transaction';

const Blockchain = require("./blockchain");
const Transaction = require("./transaction");

let lcoin = new Blockchain();

lcoin.createTransaction(new Transaction('Luis', 'Juan Pablo', 26));
lcoin.createTransaction(new Transaction('Luis', 'Vera', 9));
lcoin.createTransaction(new Transaction('Vera', 'Juan Pablo', 4));

console.log('Starting the miner...');
lcoin.minePendingTransactions('Theminer');

console.log('Balance of Vera', lcoin.getBalanceOfAddress('Vera'));
console.log('Balance of Juan Pablo', lcoin.getBalanceOfAddress('Juan Pablo'));
console.log('Balance of Luis', lcoin.getBalanceOfAddress('Luis'));
console.log('Balance of The Miner', lcoin.getBalanceOfAddress('Theminer'));

lcoin.minePendingTransactions("Luis");

console.log('Balance of The Miner (after)', lcoin.getBalanceOfAddress('Theminer'));


