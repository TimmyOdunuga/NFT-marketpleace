const path = require('path')
const fs = require('fs')

const envPath = path.join(__dirname, '../.env')
const envExists = fs.existsSync(envPath)
if (!envExists) {
  console.warn(`Please include a .env file with the directory ${envPath}`)
  process.exit(0)
} else {
  require('dotenv').config({ path: envPath })
}

console.log(process.env.MONGO_URI)

const envSchema = {
  NODE_ENV: 'development',
  PORT: 5000,
  MONGO_URI: '',
  IS_STAGING: true,
  CHAIN_ID: '97',
  IPFS_ENDPOINT: 'https://sevcik.io',
  ETH_RPC_URI: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  NFT_CONTRACT: '0x32168468852782BfA1e21FfFf2792464249bf878',
  DEMO_NFT_CONTRACT: '0xFF01CA9C87E6545e4f3d859d372A8dfbB350581e',
  DEMO_ETH_RPC_URI: 'https://bsc-dataseed1.binance.org/',
  DID_REGISTRY_CONTRACT: '0x4dE57C5BDEEb7DCE2B91A432e4adeeA6C9D57501',
}

for (const field in envSchema) {
  if (process.env[field] === undefined) {
    console.warn(`Env variable "${field}" not found. Setting default of "${envSchema[field]}".`)
    process.env[field] = envSchema[field]
  }
}

module.exports = {
  INTERNAL_IPS: ['::1', '127.0.0.1', '10.124.0.*'],
  DEVELOPER_IPS: {
    'Timmy Odunuga': '73.119.13.80',
  },
}
