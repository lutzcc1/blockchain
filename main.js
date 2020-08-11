const SHA256m = require('crypto-js/sha256');
const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash= previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, "11/08/2020", "LCoin", null);
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}

let lcoin = new Blockchain();
lcoin.addBlock(new Block(1, "today", {from: "me", to: "you", quantity: "tons"}));
lcoin.addBlock(new Block(2, "tomorrow", {from: "mama", to: "vera", quantity: 5}));

console.log(JSON.stringify(lcoin, null, 2));
