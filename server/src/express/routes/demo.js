const express = require('express')
const {ethers, Contract} = require('ethers')
const { verifyLogin } = require('../../lib/nft')
const { DemoNFT } = require('../../contracts/demo')
const router = express.Router()

const URL = 'https://flashlabs.app/company/'

const PRIVATE_KEY = '9475b327a6d69dd350e0138cce1d38dc028ee56c7d258f8317a34502c379317d'
const SERVER_ACCOUNT = '0x9C76d5149A887E3953b9C7cE85A126F767d3991e'
const NFT_CONTRACT = process.env.DEMO_NFT_CONTRACT
const NFT_ID = 0x02

const provider = new ethers.providers.JsonRpcProvider(
   process.env.DEMO_ETH_RPC_URI
)

router.post('/', async (req, res, next) => {
  try {
    const token = req.headers['authorization']
    const address = await verifyLogin(token)

    const { name, email, purpose } = req.body
    console.log(name, email, purpose)
    
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider)
    const nft = new Contract(NFT_CONTRACT, DemoNFT.output.abi, wallet);
    const tx = await nft.mintToken(address, NFT_ID, 1, 0x00);
    const receipt = await tx.wait()

    const message = "Check your wallet for a new NFT"
    return res.status(200).send({ msg: message })
  } catch (err) {
    next(err)
  }
})

module.exports = router
