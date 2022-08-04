const express = require('express')
const mongoose = require('mongoose')
const { verifyLogin, getBalance } = require('../../lib/nft')
const { resizeAvatarImage, resizeBackgroundImage } = require('../../lib/files')
const ethers = require('ethers')

const router = express.Router()

const User = mongoose.model('User')
const NFT = mongoose.model('NFT')

const { v4: uuidv4 } = require('uuid')


router.get('/', async (req, res, next) => {
  try {
    const users = await User.find().sort({ sold: -1 })

    return res.status(200).send({ msg: 'Users retrieved successfully', users })
  } catch (err) {
    next(err)
  }
})


router.get('/owner', async (req, res, next) => {
  try {
    const ownerAddress ='0xab8928d8B0f2F0bBe6D50Ba96FE1d3f6d6C5c71b'
    return res.status(200).send({ add: ownerAddress })

  } catch (err) {
    next(err)
  }
})



router.get('/:address', async (req, res, next) => {
  try {
    const { address } = req.params
    if (!address) {
      return res.status(400).send({ msg: 'Invalid address param' })
    }

    const checksumAddress = ethers.utils.getAddress(address)

    const user = await User.findOne({ address: checksumAddress })
    if (!user) {
      return res.status(404).send({ msg: 'Cannot find the user' })
    }

    res.status(200).send({ msg: 'Account information retrieved', user })

    user.balance = await getBalance(user.address)
    await user.save()
  } catch (err) {
    next(err)
  }
})

router.get('/:address/lite', async (req, res, next) => {
  try {
    const { address } = req.params
    if (!address) {
      return res.status(400).send({ msg: 'Invalid address param' })
    }

    const checksumAddress = ethers.utils.getAddress(address)

    const user = await User.findOne(
      { address: checksumAddress },
      '-background -bio -website -instagram -twitter -facebook'
    )
    if (!user) {
      return res.status(404).send({ msg: 'Cannot find the user' })
    }

    return res.status(200).send({ msg: 'Account information retrieved', user })
  } catch (err) {
    next(err)
  }
})

router.get('/:address/nfts', async (req, res, next) => {
  try {
    const { address } = req.params
    if (!address) {
      return res.status(400).send({ msg: 'Invalid address param' })
    }

    const checksumAddress = ethers.utils.getAddress(address)

    const nfts = await NFT.find({ 'owner.address': checksumAddress }, '-data')

    return res.status(200).send({ msg: 'NFTs retrieved', nfts })
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const token = req.headers['authorization']
    const { name, email, bio, website, twitter, instagram, facebook, avatar, background } = req.body

    const address = await verifyLogin(token)

    let user = await User.findOne({ address })
    if (!user) {
      user = new User({ address })
    }
    user.name = name || user.name
    user.email = email || user.email
    user.bio = bio || user.bio
    user.website = website || user.website
    user.twitter = twitter || user.twitter
    user.instagram = instagram || user.instagram
    user.facebook = facebook || user.facebook
    user.avatar = (await resizeAvatarImage(avatar)) || user.avatar
    user.background = (await resizeBackgroundImage(background)) || user.background
    await user.save()

    return res.status(200).send({ msg: 'Successfully edited profile', user })
  } catch (err) {
    next(err)
  }
})

router.put('/follow/:userAddress', async (req, res, next) => {
  try {
    const token = req.headers['authorization']
    const { userAddress } = req.params

    const address = await verifyLogin(token)

    let user = await User.findOne({ address })
    if (!user) {
      user = new User({ address })
    }
    if (user.following.includes(userAddress)) {
      return res.status(400).send({ msg: 'You are following that user already' })
    }
    user.following.push(userAddress)
    user.markModified('following')
    await user.save()

    return res.status(200).send({ msg: 'Successfully edited following list', user })
  } catch (err) {
    next(err)
  }
})

router.delete('/follow/:userAddress', async (req, res, next) => {
  try {
    const token = req.headers['authorization']
    const { userAddress } = req.params

    const address = await verifyLogin(token)

    let user = await User.findOne({ address })
    if (!user) {
      user = new User({ address })
    }
    if (!user.following.includes(userAddress)) {
      return res.status(400).send({ msg: 'You are not currently following that user' })
    }
    user.following.push(userAddress)
    user.markModified('following')
    await user.save()

    return res.status(200).send({ msg: 'Successfully edited following list', user })
  } catch (err) {
    next(err)
  }
})

router.put('/heart/:nftAddress', async (req, res, next) => {
  try {
    const token = req.headers['authorization']
    const { nftAddress } = req.params

    const address = await verifyLogin(token)

    let user = await User.findOne({ address })
    if (!user) {
      user = new User({ address })
    }
    if (user.hearted.includes(nftAddress)) {
      return res.status(400).send({ msg: 'You have hearted that nft already' })
    }
    user.hearted.push(nftAddress)
    user.markModified('hearted')
    await user.save()

    return res.status(200).send({ msg: 'Successfully edited hearted list', user })
  } catch (err) {
    next(err)
  }
})

router.delete('/heart/:nftAddress', async (req, res, next) => {
  try {
    const token = req.headers['authorization']
    const { nftAddress } = req.params

    const address = await verifyLogin(token)

    let user = await User.findOne({ address })
    if (!user) {
      user = new User({ address })
    }
    if (!user.hearted.includes(nftAddress)) {
      return res.status(400).send({ msg: 'You have not hearted that nft' })
    }
    user.hearted.push(nftAddress)
    user.markModified('hearted')
    await user.save()

    return res.status(200).send({ msg: 'Successfully edited hearted list', user })
  } catch (err) {
    next(err)
  }
})

router.get('/:address/cookie', async (req, res, next) => {
  try {
    const { address } = req.params
    const checksumAddress = ethers.utils.getAddress(address)

    const newCookie = uuidv4()
    const lastUsed = Date.now()
    let user = await User.findOne({ checksumAddress })
    if (!user) {
      user = new User({ checksumAddress })
    }
    if (!user.cookies)
      user.cookies = []
    if (user.cookies.length > 0)
      user.cookies = user.cookies.filter(c => c.lastUsed > lastUsed - 1000 * 60 * 60)
    user.cookies.push({ cookie: newCookie, lastUsed })
    user.markModified('cookies')
    await user.save()
    return res.status(200).send({ cookie: newCookie })
  } catch (err) {
    next(err)
  }
})

module.exports = router
