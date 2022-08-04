const { NODE_ENV } = process.env

module.exports = {
  handleExpressError(err, req, res, next) {
    if (!err) return next()
    const msg = err?.response?.data?.msg || err.message
    const stack = err?.response?.data?.stack || err.stack
    const status = err?.response?.status || 500
    if (err.isAxiosError) {
      console.log(`Request Error: ${msg}`)
      console.log(`At ${err?.request?.host}`)
    } else {
      console.error(msg)
      console.error(stack)
    }
    return res.status(status).send({
      msg,
      isAxiosError: err.isAxiosError,
      stack: NODE_ENV !== 'development' ? [] : err.stack.split('\n').map((line) => line.trim()),
      err:
        err.isAxiosError && NODE_ENV === 'development'
          ? {
              at: err?.request?.host,
              status: err?.response?.status,
              data: err?.response?.data,
            }
          : undefined,
    })
  },
  getIp(req) {
    return req.headers['x-forwarded-for']
      ? req.headers['x-forwarded-for'].split(', ')[0]
      : req.socket.remoteAddress || req.ip
  },
}
