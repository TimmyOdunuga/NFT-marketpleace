import { ethers, utils, Contract } from 'ethers'
import { FlashlabsNft } from './FlashlabsNft'
import { FlashlabsNftUpgradeableProxy } from './FlashlabsNftUpgradeableProxy'


const DID_REGISTRY_CONTRACT = '0x7f671B02da59Ce1403461dCda13436d9464cC09E '
const ADMIN_PRIVATE_KEY = ''
const PROXY_ADMIN_PRIVATE_KEY = ''
const ETH_RPC_URI = 'https://flashlabs.api.vitrical-demo.com:8546/'

function getProvider() {
  if (ETH_RPC_URI.slice(0, 2) === 'ws') return new ethers.providers.WebSocketProvider(ETH_RPC_URI)
  return new ethers.providers.JsonRpcProvider(ETH_RPC_URI)
}

async function deploy(proxyWallet, adminWallet) {
  const override = { gasLimit: 8000000 }

  var nftFactory = new ethers.ContractFactory(
    FlashlabsNft.output.abi,
    FlashlabsNft.output.bytecode,
    proxyWallet
  )
  var nftLogicContract = await nftFactory.deploy(override)
  console.log('NFT_LOGIC_CONTRACT=' + nftLogicContract.address)
  await nftLogicContract.deployed()

  var proxyFactory = new ethers.ContractFactory(
    FlashlabsNftUpgradeableProxy.output.abi,
    FlashlabsNftUpgradeableProxy.output.bytecode,
    proxyWallet
  )

  var nftProxyContract = await proxyFactory.deploy(
    nftLogicContract.address,
    proxyWallet.address,
    override
  )
  console.log('NFT_CONTRACT= ' + nftProxyContract.address)
  await nftProxyContract.deployed()

  var nftContract = new Contract(nftProxyContract.address, FlashlabsNft.output.abi, adminWallet)

  const nftInitData = utils.defaultAbiCoder.encode(['address'], [DID_REGISTRY_CONTRACT])
  await nftContract.initializer(nftInitData)
  console.log('NFT_CONTRACT INITIALIZED')

  return { nftContract }
}

const provider = getProvider()
const adminWallet = new ethers.Wallet(ADMIN_PRIVATE_KEY, provider)
const proxyWallet = new ethers.Wallet(PROXY_ADMIN_PRIVATE_KEY, provider)

deploy(proxyWallet, adminWallet).then((r) => {})
