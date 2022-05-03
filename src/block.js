/**
 *  The Block class is a main component in any Blockchain platform.
 *  It will store the data and act as a dataset for your application.
 *  The class will expose a method to validate the data.  The body of
 *  the block will contain an Object that contains the data to be stored.
 *  The data should be stored encoded.
 *
 *  All the exposed methods should return a Promise to allow all the methods
 *  run asynchronous.
 */

const SHA256 = require("crypto-js/sha256");
const hex2ascii = require("hex2ascii");

class Block {
  constructor(data) {
    this.hash = null;
    this.height = 0;
    this.body = Buffer.from(JSON.stringify(data)).toString("hex");
    this.time = 0;
    this.previousBlockHash = null;
  }

  validate() {
    let self = this;
    return new Promise((resolve, reject) => {
      try {
        const currentBlockHash = self.hash;
        const currentBlockHashStringified = JSON.stringify(self);
        const newBlockHash = SHA256(currentBlockHashStringified).toString();
        self.hash = newBlockHash;
        currentBlockHash === newBlockHash ? resolve(true) : resolve(false);
      } catch (err) {
        reject(new Error(err));
      }
    });
  }

  getBData() {
    let self = this;

    return new Promise(async (resolve, reject) => {
      try {
        const decodedData = JSON.parse(hex2ascii(this.body));

        self.height == 0
          ? resolve("** Genesis Block **")
          : resolve(decodedData);
      } catch (err) {
        reject(new Error(err));
      }
    });
  }
}

module.exports.Block = Block;
