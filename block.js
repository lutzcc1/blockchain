const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(timestamp, transactions, previousHash = '') {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        if(!this.hasValidTransactions) {
            throw new Error('The block has invalid transactions');
        }

        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("block mined", this.hash);
    }

    hasValidTransactions() {
        if (this.transactions.length === 0) return true;
        for(let transaction of this.transactions) {
            if(!transaction.isValid()) return false;
        }
        return true;
    }
}

module.exports = Block;