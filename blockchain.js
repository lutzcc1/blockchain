const Block = require('./block');
const Transaction = require("./transaction");

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.pendingTransactions = [];
        this.miningReward = 100;
        this.difficulty = 4;
    }

    createGenesisBlock() {
        return new Block("11/08/2020", "LCoin", null);
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(miningRewardAddress) {
        let block = new Block(Date.now(), this.pendingTransactions, this.chain[this.chain.length -1].hash);
        block.mineBlock(this.difficulty);

        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

    addTransaction(transaction) {
        if(!transaction.fromAddress || !transaction.toAddress) {
            throw new Error('Transaction must include from and to address');
        }

        if(!transaction.isValid()) {
            throw new Error('Cannot add invalid transaction to chain');
        }

        if(this.getBalanceOfAddress(transaction.fromAddress) < transaction.amount) {
            throw new Error("Not enough funds");
        }

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
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) return false;
            if (currentBlock.previousHash !== previousBlock.hash) return false;
            if (!currentBlock.hasValidTransactions()) return false;
        }
        return true;
    }
}

module.exports = Blockchain;