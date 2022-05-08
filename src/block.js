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

  /**
   * Validate if the block has been tampered with or not.  If the block has been
   * tampared with, then the hashes will not match.
   */
  async validate() {
    let self = this;

    try {
      const currentBlockHash = self.hash;
      const currentBlockHashStringified = JSON.stringify(self);
      const newBlockHash = SHA256(currentBlockHashStringified).toString();
      self.hash = newBlockHash;
      return currentBlockHash === newBlockHash;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Decodes the block body, unless the block is the Genesis Block.
   */
  async getBData() {
    let self = this;

    try {
      const decodedData = JSON.parse(hex2ascii(this.body));

      if (self.height === 0) {
        return "** Genesis Block **";
      } else {
        return decodedData;
      }
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports.Block = Block;
