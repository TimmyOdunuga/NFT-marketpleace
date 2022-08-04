// Server side only!!!
const { ethers, utils, Contract } = require('ethers')
const { DidStore } = require('@fl-did-registry/did-ipfs-store')
const { Resolver } = require('@fl-did-registry/did-nft-resolver')
const { JWT } = require('@fl-did-registry/jwt')
const { v4: uuidv4 } = require('uuid')
const { FlashlabsNft } = require("../contracts/FlashlabsNft")
const mongoose = require('mongoose')

const PRIVATE_KEY = process.env.ADMIN_PRIVATE_KEY //'9475b327a6d69dd350e0138cce1d38dc028ee56c7d258f8317a34502c379317d'
const SERVER_ACCOUNT = process.env.ADMIN_ACCOUNT //'0x9C76d5149A887E3953b9C7cE85A126F767d3991e'
const NFT_CONTRACT = process.env.NFT_CONTRACT
const DID_REGISTRY_CONTRACT = process.env.DID_REGISTRY_CONTRACT
const NETWORK_ID = process.env.CHAIN_ID
const IPFS_ENDPOINT = process.env.IPFS_ENDPOINT

const provider = new ethers.providers.JsonRpcProvider(
   process.env.ETH_RPC_URI
)
const User = mongoose.model('User')




function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

module.exports = {
  async getBalance(address) {
    try {
      const balance = await provider.getBalance(address)
      return parseFloat(balance / 10 ** 18)
    } catch (err) {
      throw err
    }
  },
  async verifyLogin(token) {
    try {
      if (!token) {
        throw new Error('Token is missing')
      }
      const { issuer, claimData } = JWT.decode(token)
      const [, , address] = issuer.split(':')
      const checksumAddress = ethers.utils.getAddress(address)

      let user = await User.findOne({ checksumAddress })
      if (!user) {
        user = new User({ checksumAddress })
      }
      const cookie = claimData.cookie
      const lastUsed = Date.now()

      const matchedIndex = user.cookies.findIndex(c => c.cookie === cookie)
      if (matchedIndex >= 0) {
        let matchedCookie = user.cookies[matchedIndex]
        if (lastUsed - matchedCookie.lastUsed > 1000 * 60 * 58) {
          throw new Error('Token expired')
        }
        user.cookies[matchedIndex].lastUsed = lastUsed
        user.markModified('cookies')
        await user.save()
      } else {
        throw new Error('Token cookie not found')
      }

      await JWT.verify(token, checksumAddress)
      if (!claimData.login) {
        throw new Error('Login date does not exist')
      }
      const loggedIn = new Date(claimData.login)
      const now = new Date()
      if (now - loggedIn > 1000 * 60 * 58) {
        throw new Error('Token expired')
      }
      return checksumAddress
    } catch (err) {
      throw err
    }
  },
  async createNftInit(userAddress = '', name = '') {
    try {
      const wallet = new ethers.Wallet(PRIVATE_KEY, provider)
      const nft = new Contract(NFT_CONTRACT, FlashlabsNft.output.abi, wallet);
      //TODO: replace the next 3 lines with generalAgent assigned to the user at account creation
      const id = utils.keccak256(utils.toUtf8Bytes(uuidv4()))
      const tx = await nft.addToken(id, userAddress, name, "");
      const receipt = await tx.wait()
      return id
    } catch (err) {
      console.log(err)	    
      throw err
    }
  },
  async getNftData(nftId) {
    try {
      const id = ethers.BigNumber.from(nftId)
      const did = `did:nft:${NETWORK_ID}:${NFT_CONTRACT}:${id.toHexString()}`
      const didStore = new DidStore(IPFS_ENDPOINT)
      const registrySettings = { address: DID_REGISTRY_CONTRACT }
      const resolver = new Resolver(provider, didStore, registrySettings)

      const document = await resolver.read(did)

      const promises = []
      document.service.forEach((service) => {
        if (service.id.includes('ClaimRepo')) {
          promises.push(
            (async () => {
              try {
                const claim = JSON.parse(await didStore.get(service.serviceEndpoint))
                return claim.claimData
              } catch (err) {
                throw err
              }
            })()
          )
        }
      })
      const totalData = await Promise.all(promises)
      const data = {
        id: id.toHexString(),
        owner: await resolver.identityOwner(did),
        name: null,
        description: null,
        price: null,
        currency: null,
        data: null,
      }
      totalData.forEach((claimData) => {
        Object.keys(claimData).forEach((claimField) => {
          data[claimField] = claimData[claimField]
        })
      })
      console.log(`NFT found, owner: ${data.owner}`)
      return data
    } catch (err) {
      throw err
    }
  },
  async finalizeNftPurchase(seller, buyer, nftId, txHash, requiredPrice) {
    try {
      console.log(`Finalize purchase`)
      console.log(`Address: ${buyer}`)
      console.log(`nftId: ${nftId}`)
      console.log(`txHash: ${txHash}`)

      const id = ethers.BigNumber.from(nftId)
      const wallet = new ethers.Wallet(PRIVATE_KEY, provider)
      const nft = new Contract(NFT_CONTRACT, FlashlabsNft.output.abi, wallet);
      var tx = await provider.getTransaction(txHash)
      var attempts = 0
      while (tx === null && attempts < 5) {
        await sleep(1000)
        attempts += 1
        tx = await provider.getTransaction(txHash)
      }
      var receipt = await tx.wait()
      console.log(receipt)
      if (receipt.status != 1 || receipt.to !== SERVER_ACCOUNT) {
        throw new Error('Funds not sent to the platform')
      }
      if (receipt.from.toLowerCase() !== buyer.toLowerCase()) {
        throw new Error('Fraud detected')
      }
      //TODO: remember transactions to prevent replay attacks
      const txValue = tx.value;
      if (ethers.utils.parseEther(requiredPrice.toString()).gt(txValue)) {
        throw new Error('Fraud detected')
      }

      console.log("bp1")
      tx = await nft.safeTransferFrom(seller, buyer, id, 1, []);
      receipt = await tx.wait()
      console.log("bp2")
      if (receipt.status != 1) {
        throw new Error('Failed, transfer failed, investigate!')
      }

      const ourCut = txValue.mul(5).div(100).add(42000000000)

      tx = await wallet.sendTransaction({
        to: seller,
        value: txValue.sub(ourCut),
      })

    } catch (err) {
      throw err
    }
  },
}
