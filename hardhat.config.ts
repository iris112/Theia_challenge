import { utils } from "ethers";

// Config
import { HardhatUserConfig } from "hardhat/config";

// PLUGINS
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-deploy";

// TASKS
// Comment this out and back in to compile without typechain artifacts
import "./hardhat/tasks";

// Process Env Variables
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });

const DEFAULT_BLOCK_GAS_LIMIT = 12450000;
const UNLIMITED_BYTECODE_SIZE = process.env.UNLIMITED_BYTECODE_SIZE === 'true';
const ALCHEMY_ID = process.env.ALCHEMY_ID;

const PK_MAINNET = process.env.PK_MAINNET;
const PK = process.env.PK;

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

// CONFIG
const config: HardhatUserConfig = {
  // hardhat-deploy
  etherscan: {
    apiKey: ETHERSCAN_API_KEY ? ETHERSCAN_API_KEY : "",
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  networks: {
    mainnet: {
      accounts: PK_MAINNET ? [PK_MAINNET] : [],
      chainId: 1,
      url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_ID}`,
      gasPrice: parseInt(utils.parseUnits("25", "gwei").toString()),
    },
    ropsten: {
      accounts: PK ? [PK] : [],
      chainId: 3,
      url: `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_ID}`,
    },
  },

  solidity: {
    compilers: [
      {
        version: "0.8.7",
        settings: {
          optimizer: { enabled: true },
        },
      },
    ],
  },

  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
};

export default config;
