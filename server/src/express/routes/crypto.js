const { getCryptoPrice } = require('crypto-price')
const express = require('express')

const router = express.Router()

const ETH_BINANCE_PRICE_API = 'https://api.binance.com/api/v3/avgPrice?symbol=BNBUSDC'

router.get('/bnb/:currency', async (req, res, next) => {
  try {
    const { currency } = req.params
    const rv = await fetch(ETH_BINANCE_PRICE_API)
    const data = await rv.json()
    const price = parseFloat(data.price)
    return res.status(200).send({ price })
  } catch (err) {
    next(err)
  }
})

router.get('/btc/:currency', async (req, res, next) => {
  try {
    const { currency } = req.params
    const { price } = await getCryptoPrice(currency, 'BTC')
    return res.status(200).send({ price })
  } catch (err) {
    next(err)
  }
})

router.get('/ltc/:currency', async (req, res, next) => {
  try {
    const { currency } = req.params
    const { price } = await getCryptoPrice(currency, 'LTC')
    return res.status(200).send({ price })
  } catch (err) {
    next(err)
  }
})

module.exports = router
