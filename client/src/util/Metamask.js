import { DIDDocumentFull } from '@fl-did-registry/did-document'
import { DidStore } from '@fl-did-registry/did-ipfs-store'
import { Operator } from '@fl-did-registry/did-nft-resolver'
import { ethers, Contract } from 'ethers'
import { JWT } from '@fl-did-registry/jwt'
import { setHeader, getHeader, getOwnerAddress, getCookie } from './Api'
import { FlashlabsNft } from '../contracts/FlashlabsNft'

const IPFS_ENDPOINT = process.env.REACT_APP_IPFS_ENDPOINT ? process.env.REACT_APP_IPFS_ENDPOINT : 'https://sevcik.io'
const SERVER_ACCOUNT = process.env.REACT_APP_ADMIN_ACCOUNT 
const NFT_CONTRACT = process.env.REACT_APP_NFT_CONTRACT ? process.env.REACT_APP_NFT_CONTRACT : '0x1bE9D87D5cA10Fc7281389648C8fceDB613603b4'
const DID_REGISTRY_CONTRACT= process.env.REACT_APP_DID_REGISTRY_CONTRACT ? process.env.REACT_APP_DID_REGISTRY_CONTRACT : '0x21a15120198B971869046Efca2002d892aD8ca8E'
export const CHAIN_ID = process.env.REACT_APP_CHAIN_ID ? process.env.REACT_APP_CHAIN_ID :  '43113'


export function getShortAddress(address) {
  return address.slice(0, 10) + '...' + address.slice(35, 42)
}

export function isMetamaskConnected() {
  if (!window.ethereum) return false
  const address = window.ethereum.selectedAddress
  if (!address) return false
  return window.ethereum.isConnected()
}


//getOwner gets the owner address of the NFT contract
export async function getOwner(address){
  //check if wallet is connected
  // if (!window.ethereum) throw new Error('Not connected to metamask')
  let res = await getOwnerAddress()
  return res;
}

export async function getMetamaskAccount() {
  if (!window.ethereum) throw new Error('Not connected to metamask')
  const address = window.ethereum.selectedAddress
  if (!address) throw new Error('Address not found')
  const balance =
    Number(
      await window.ethereum.request({ method: 'eth_getBalance', params: [address, 'latest'] })
    ) /
    10 ** 18
  return { address: ethers.utils.getAddress(address), balance }
}

export async function connectMetamask() {
  try {
    if (!window.ethereum) throw new Error('Metamask is not installed')
    if (parseInt(window.ethereum.chainId) !== parseInt(CHAIN_ID)) throw new Error('Metamask is connected to different chain, our is ' + CHAIN_ID)
    return window.ethereum.request({ method: 'eth_requestAccounts' })
  } catch (err) {
    throw err
  }
}

export async function createClaim(data) {
  try {
    const address = await window.ethereum.request({ method: 'eth_accounts' })
    if (!address) throw new Error('Address not found')
    const web3Provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = web3Provider.getSigner()
    if (!signer) throw new Error('Signer not found')
    const did = 'did:ethr:' + address[0]
    const jwtOptions = { issuer: did, subject: did }
    const claim = {
      subject: did,
      issuer: did,
      claimData: data,
    }
    return JWT.sign(signer, claim, { ...jwtOptions, algorithm: 'ES256' })
  } catch (err) {
    throw err
  }
}

export async function requestLogin() {
  try {
    let address = await window.ethereum.request({ method: 'eth_accounts' })
    if (!address) throw new Error('Address not found')
    address = address[0]
    const { cookie } = await getCookie({address})
    const data = {
      login: new Date().toString(),
      cookie,
    }
    const loginToken = await createClaim(data)
    setHeader('Authorization', loginToken)
  } catch (err) {
    throw err
  }
}

export async function verifyLogin() {
  try {
    const vc = getHeader('Authorization')
    if (!vc) {
      throw new Error('User is not logged in')
    }
    const userAddress = window.ethereum.selectedAddress

    const { issuer, claimData } = JWT.decode(vc)
    const [, , address] = issuer.split(':')
    if (address !== userAddress) {
      throw new Error('Token is linked to wrong account')
    }
    const checksumAddress = ethers.utils.getAddress(address)

    await JWT.verify(vc, checksumAddress)
    if (!claimData.login) {
      throw new Error('Login date does not exist')
    }
    const loggedIn = new Date(claimData.login)
    const now = new Date()
    if (now - loggedIn > 1000 * 60 * 58) {
      throw new Error('Token expired')
    }
    return claimData
  } catch (err) {
    throw err
  }
}

export async function ensureLogin(prevErr) {
  try {
    await verifyLogin()
    return true
  } catch (verifyErr) {
    if (prevErr) throw prevErr
    try {
      await requestLogin()
      return ensureLogin(verifyErr)
    } catch (loginErr) {
      throw loginErr
    }
  }
}

export async function sendCurrencyToServer(currency, price) {
  // 1. transfer money from consumer to the server (client side), returns TX1 ID
  // 2. server checks TX1 ID if transaction finished and if the amount matches, if not, break (skip this step for demo)
  // 3. server grants license, checks if TX2 succeeded
  // 4a. if TX2 succeeded, server sends money to the author
  // 4b. if TX2 failed, money is returned to the consumer
  const web3Provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = web3Provider.getSigner() //Licensee
  const address = await signer.getAddress()
  const balance = await web3Provider.getBalance(address)
  const balanceFormated = parseFloat(ethers.utils.formatEther(balance))
  if (balanceFormated <= price) throw Error('Insufficient balance!')
  console.log(SERVER_ACCOUNT)
  const tx = await signer.sendTransaction({
    to: SERVER_ACCOUNT,
    value: ethers.utils.parseEther(price.toString()),
  })
  return tx.hash
}

export async function mint(id, amount) {
  try {
    const address = window.ethereum.selectedAddress
    const nftId = ethers.BigNumber.from(id)
    const web3Provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = web3Provider.getSigner()
    const nft = new Contract(NFT_CONTRACT, FlashlabsNft.output.abi, signer);

    await nft.mintToken(address, id, amount, [])
  } catch (err) {
    throw err
  }
}

export async function putOnSale(id, amount) {
  try {
    const nftId = ethers.BigNumber.from(id)
    const web3Provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = web3Provider.getSigner()
    const nft = new Contract(NFT_CONTRACT, FlashlabsNft.output.abi, signer);

    await nft.lockFor(SERVER_ACCOUNT, nftId, amount)
  } catch (err) {
    throw err
  }
}

/**
 * Finalizes the NFT creation process after the server has initialized it
 * @param {string} id Hex id of the NFT
 * @param {object} data { name, description, currency, price}
 * @returns Claim URI
 */
export async function createNftFinalize(id, { name, description, currency, price }) {
  try {
    console.log("createNftFinalize called")
    const nftId = ethers.BigNumber.from(id)
    const web3Provider = new ethers.providers.Web3Provider(window.ethereum)
    const didStore = new DidStore(IPFS_ENDPOINT)
    const registrySettings = { address: DID_REGISTRY_CONTRACT }

    const signer = web3Provider.getSigner()
    const operator = new Operator(signer, didStore, registrySettings)

    const chainIdStr = '0x' + parseInt(CHAIN_ID).toString(16)
    const did = `did:nft:${chainIdStr}:${NFT_CONTRACT}:` + nftId.toHexString()
    console.log(did)	  
    const document = new DIDDocumentFull(did, operator)
    console.log("BP1")
    await document.create()
    console.log("BP2")
    await mint(nftId, 1)

    const descriptor = {
      id: nftId.toHexString(),
      uri: 'https://redirectnft.flashlabs.io?id=' + nftId.toHexString(),
      description,
      name,
      currency,
      price,
      //      image,
    }
    console.log("BP3", descriptor)

    const claim = await operator.createPublicClaim(descriptor, did)
    console.log("BP4")
    const rv = await operator.verifyPublicClaim(claim, descriptor)
    console.log(rv, claim)
    try{
      await operator.publishPublicClaim(claim, descriptor)
    }catch (err) {
      console.error(err)
    }
    
    console.log("BP5")
    await putOnSale(nftId, 1)
    console.log("BP6")
  } catch (err) {
    console.error(err)
    throw err
  }
}
