const SHA256 = require('crypto-js/sha256');

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block {
    constructor(timestamp, transaction, previousHash = '') {
        this.timestamp = timestamp;
        this.transactions = transaction;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("block mined", this.hash);
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.pendingTransactions = [];
        this.miningReward = 100;
        this.difficulty = 3;
    }

    createGenesisBlock() {
        return new Block("11/08/2020", "LCoin", null);
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(miningRewardAddress) {
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);

        console.log('Block succesfully mined!');
        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address) {
        let balance = 0;

        for(let block of this.chain) {
            for(let trans of block.transactions) {
                if(trans.fromAddress === address) {
                    balance -= trans.amount;
                }

                if(trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }
        return balance;
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


