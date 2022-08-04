const express = require('express')
const mongoose = require('mongoose')
const ethers = require('ethers')
const { verifyLogin, createNftInit, getNftData, finalizeNftPurchase } = require('../../lib/nft')
const { resizeCardImage } = require('../../lib/files')

const router = express.Router()

const User = mongoose.model('User')
const NFT = mongoose.model('NFT')

function getOptions(search, sort, price, priceMin, priceMax, category) {
  const searchQuery = search
    ? {
        name: { $regex: search, $options: 'i' },
      }
    : {}

  const sortOptions =
    sort.toLowerCase() === 'any'
      ? {
          price:
            price.toLowerCase() === 'any'
              ? undefined
              : price.toLowerCase() === 'ascending'
              ? 1
              : -1,
        }
      : {
          createdAt:
            sort.toLowerCase() === 'any' ? undefined : sort.toLowerCase() === 'newest' ? 1 : -1,
        }

  const filterOptions =
    category.toLowerCase() === 'any'
      ? {
          ...searchQuery,
          status: { $in: ['on sale', 'initialized'] },
          price: { $gt: priceMin, $lt: priceMax },
        }
      : {
          ...searchQuery,
          status: { $in: ['on sale', 'initialized'] },
          price: { $gt: priceMin, $lt: priceMax },
          categories: category.toLowerCase(),
        }
  return { filterOptions, sortOptions }
}

router.get('/', async (req, res, next) => {
  try {
    const { search, page, sort, price, priceMin, priceMax, category } = req.query

    const { filterOptions, sortOptions } = getOptions(
      search,
      sort,
      price,
      priceMin,
      priceMax,
      category
    )

    const nfts = await NFT.paginate(filterOptions, {
      page: page || 1,
      limit: 6,
      sort: sortOptions,
      select: '-data -history -owner.avatar',
    })

    return res.status(200).send({
      msg: 'Retrieved NFTs',
      nfts,
    })
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const token = req.headers['authorization']
    const {
      name,
      description,
      image, // Base64 datauri
      data, // Base64 datauri
      priceType,
      price,
      categories,
    } = req.body

    const address = await verifyLogin(token)
    let user = await User.findOne({ address })
    if (!user) {
      user = new User({ address })
      await user.save()
    }

    const imageIcon = image ? await resizeCardImage(image) : await resizeCardImage(data)

    const nft = new NFT({
      owner: user,
      creator: user,
      name,
      description,
      image: imageIcon,
      data,
      priceType,
      price,
      categories,
      history: [
        {
          date: new Date(),
          user: {
            name: user.name || 'Guest User',
            avatar: user.avatar || '',
            address: user.address,
          },
          action: `Created the NFT`,
        },
      ],
    })

    nft.nftId = await createNftInit(address, name)

    await nft.save()

    return res
      .status(200)
      .send({ msg: 'Initialized NFT creation', nftId: nft.nftId, image: nft.image })
  } catch (err) {
    next(err)
  }
})

router.get('/:nftId', async (req, res, next) => {
  try {
    const { nftId } = req.params

    const nft = await NFT.findOne({ nftId }, '-data')
    if (!nft) return res.status(404).send({ msg: 'Cannot find the NFT' })
    if (nft.status === 'initialized') {
      nft.status = 'on sale'
    }

    res.status(200).send({ msg: 'Successfully found the nft', nft })
    const user = await User.findOne({ address: nft.owner.address })
    nft.owner = user
    nft.views++
    await nft.save()
  } catch (err) {
    next(err)
  }
})

router.get('/:nftId/check', async (req, res, next) => {
  try {
    const { nftId } = req.params
    const { address } = req.query

    const nft = await NFT.findOne({ nftId })
    if (!nft) return res.status(404).send({ msg: 'Cannot find the NFT' })

    try {
      const data = await getNftData(nft.nftId)
      const checksumAddress = address ? ethers.utils.getAddress(address) : null
      const licensed = await getNftLicense(checksumAddress, nft.nftId)

      let nftModified = false
      if (nft.status === 'initialized') {
        nft.status = 'on sale'
        nftModified = true
      }
      if (!nft.image) {
        nft.image = await resizeCardImage(nft.data)
        nftModified = true
      }
      if (nft.status === 'errored') {
        nft.status = 'off market'
        nftModified = true
      }
      await nft.save()
      if (data.currency && nft.priceType !== data.currency) {
        nft.priceType = data.currency
        nftModified = true
      }
      if (data.description && nft.description !== data.description) {
        nft.description = data.description
        nftModified = true
      }
      if (data.name && nft.name !== data.name) {
        nft.name = data.name
        nftModified = true
      }
      if (data.price && nft.price !== data.price) {
        nft.price = data.price
        nftModified = true
      }
      if (licensed) {
        if (nft.owner.address !== checksumAddress) {
          console.error(
            `NFT is licensed to ${checksumAddress} but is not listed as owner of ${nft.nftId}`
          )
        }
        const user = await User.findOne({ address: checksumAddress })
        nft.owner = user
        nft.markModified('owner')
        nftModified = true
      }
      if (nftModified) {
        await nft.save()
      }

      return res
        .status(200)
        .send({ msg: 'Successfully recieved the nft information from the ledger', nft: data })
    } catch (err) {
      console.error(err)
      nft.status = 'errored'
      await nft.save()
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:nftId/download', async (req, res, next) => {
  try {
    const token = req.headers['authorization']
    const { nftId } = req.params

    const address = await verifyLogin(token)

    const nft = await NFT.findOne({ nftId }, 'owner data')
    if (!nft) {
      return res.status(404).send({ msg: 'Cannot find the NFT' })
    }
    if (nft.owner.address !== address) {
      return res.status(401).send({ msg: 'You are unauthorized to download this data' })
    }

    return res.status(200).send({ msg: 'Initialized NFT creation', data: nft.data })
  } catch (err) {
    next(err)
  }
})

router.post('/:nftId', async (req, res, next) => {
  try {
    const { nftId } = req.params
    const { buyer, seller, txHash } = req.body

    const checksumBuyerAddress = ethers.utils.getAddress(buyer)
    const checksumSellerAddress = ethers.utils.getAddress(seller)

    const nft = await NFT.findOne({ nftId }, '-data')
    if (!nft) return res.status(404).send({ msg: 'Cannot find the NFT' })

    await finalizeNftPurchase(checksumSellerAddress, checksumBuyerAddress, nft.nftId, txHash, nft.price)

    let user = await User.findOne({ address: checksumBuyerAddress })
    if (!user) {
      user = new User({ address: checksumBuyerAddress })
      await user.save()
    }

    nft.owner = user
    nft.status = 'purchased'
    nft.history.push({
      date: new Date(),
      user: {
        name: user.name,
        avatar: user.avatar,
        address: user.address,
      },
      action: `Purchased the NFT for ${nft.price} ${nft.priceType}`,
    })
    nft.markModified('user')
    nft.markModified('history')
    await nft.save()

    return res.status(200).send({ msg: 'Successfully transfered the NFT', nft })
  } catch (err) {
    next(err)
  }
})

// Update NFT
router.put('/:nftId', async (req, res, next) => {
  try {
    const token = req.headers['authorization']
    const { nftId } = req.params
    const { image, name, description, price } = req.body

    const address = await verifyLogin(token)

    const nft = await NFT.findOne({ nftId }, '-data')
    if (!nft) {
      return res.status(404).send({ msg: 'Cannot find the NFT' })
    }
    if (nft.owner.address !== address) {
      return res.status(401).send({ msg: 'This NFT does not belong to you' })
    }

    if (image) {
      nft.image = await resizeCardImage(image)
    }
    if (name) nft.name = name
    if (description) nft.description = description
    if (price) nft.price = price
    await nft.save()

    return res.status(200).send({ msg: 'Successfully updated the NFT', nft })
  } catch (err) {
    next(err)
  }
})

module.exports = router
