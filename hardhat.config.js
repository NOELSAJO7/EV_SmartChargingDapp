require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */

const GOERLI_URL = process.env.GOERLI_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
module.exports = {
  solidity: "0.8.0",
  networks: {
    // goerli: {
    //   url: GOERLI_URL,
    //   accounts: [PRIVATE_KEY],
    // },

    ganache: {
        url: GOERLI_URL,
        accounts: [PRIVATE_KEY],
      }
  },
};


// Deployed contract address : 0x5AEa3d47AEacCBf2738721fdEB8a5E37Ed7c7DcC
 