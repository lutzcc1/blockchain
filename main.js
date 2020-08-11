const SHA256m = require('crypto-js/sha256');
const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
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

    isChainValid() {
        for (let i = 1; i < this.chain.length - 1; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) return false;
            if (currentBlock.previousHash !== previousBlock.hash) return false;

            return true;
        }
    }
}

let lcoin = new Blockchain();
lcoin.addBlock(new Block(1, "today", { from: "me", to: "you", quantity: "tons" }));
lcoin.addBlock(new Block(2, "tomorrow", { from: "mama", to: "vera", quantity: 5 }));

console.log(JSON.stringify(lcoin, null, 2));

console.log("valid?", lcoin.isChainValid());
lcoin.chain[1].data.quantity = "not that much";
console.log(JSON.stringify(lcoin, null, 2));
console.log("valid?", lcoin.isChainValid());
