const http = require('http')
const path = require('path')
const express = require('express')
const cors = require('cors')
const ipFilter = require('express-ipfilter').IpFilter
const { getIp, handleExpressError } = require('../lib/express')
var morgan = require('morgan')


const { PORT, NODE_ENV, IS_STAGING } = process.env

const { INTERNAL_IPS, DEVELOPER_IPS } = require('../config')

const app = express()
app.use(morgan('combined'))


if (NODE_ENV !== 'production') {
  app.use(cors())
}

if (IS_STAGING.toLowerCase() == 'true') {
  // For the SIT environment for testing, allow only specific developer access
  app.use(
    ipFilter({
      detectIp: getIp,
      forbidden: 'SIT Unauthorized',
      filter: [...INTERNAL_IPS, ...Object.keys(DEVELOPER_IPS).map((field) => DEVELOPER_IPS[field])],
    })
  )
}

// Site avaliable api endpoints
app.use('/api/user', express.json({ limit: '921600mb' }), require('./routes/user'))
app.use('/api/nft', express.json({ limit: '921600mb' }), require('./routes/nft'))
app.use('/api/crypto', express.json({ limit: '921600mb' }), require('./routes/crypto'))
app.use('/api/access', express.json({ limit: '921600mb' }), require('./routes/access'))
app.use('/api/demo', express.json({ limit: '921600mb' }), require('./routes/demo'))
app.use('/api/event', express.json({ limit: '921600mb' }), require('./routes/events'))

app.use(handleExpressError)

app.use('/', express.static(path.join(__dirname, '../../public')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../public/index.html'))
})

module.exports = {
  startServer() {
    http.createServer(app).listen(PORT)
    console.log(`HTTP server listening on port ${PORT}`)
  },
}
