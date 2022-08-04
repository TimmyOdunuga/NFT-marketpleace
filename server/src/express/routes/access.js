const express = require('express')
const router = express.Router()


router.get('/verifyToken', async (req, res, next) => {
  try {
    const token = req.header('token')
    res.status(200).send({ msg: token })

  } catch (err) {
    next(err)
  }
})

module.exports = router
