const sharp = require('sharp')

function dataUrlToBuffer(dataUrl) {
  const matches = dataUrl.match(/^data:.+\/(.+);base64,(.*)$/)
  const ext = matches[1]
  const data = matches[2]
  const buffer = Buffer.from(data, 'base64')
  return { buffer, ext }
}

function bufferToDataUrl(buffer, ext) {
  const base64 = buffer.toString('base64')
  return `data:image/${ext};base64,${base64}`
}

module.exports = {
  resizeCardImage(dataUrl) {
    return new Promise((resolve, reject) => {
      if (!dataUrl) return resolve('')
      const matches = dataUrl.match(/^data:.+\/(.+);base64,(.*)$/)
      const ext = matches[1]
      const data = matches[2]
      const buffer = Buffer.from(data, 'base64')
      if (ext !== 'png' && ext !== 'jpeg' && ext !== 'jpg' && ext !== 'webp') {
        return resolve('')
      }
      sharp(buffer)
        .resize(580, 740)
        .toBuffer()
        .then((data) => resolve(bufferToDataUrl(data, ext)))
        .catch(reject)
    })
  },
  resizeBackgroundImage(dataUrl) {
    return new Promise((resolve, reject) => {
      if (!dataUrl) return resolve('')
      const matches = dataUrl.match(/^data:.+\/(.+);base64,(.*)$/)
      const ext = matches[1]
      const data = matches[2]
      const buffer = Buffer.from(data, 'base64')
      if (ext !== 'png' && ext !== 'jpeg' && ext !== 'jpg' && ext !== 'webp') {
        return resolve('')
      }
      sharp(buffer)
        .resize(1200, 800)
        .toBuffer()
        .then((data) => resolve(bufferToDataUrl(data, ext)))
        .catch(reject)
    })
  },
  resizeAvatarImage(dataUrl) {
    return new Promise((resolve, reject) => {
      if (!dataUrl) return resolve('')
      const matches = dataUrl.match(/^data:.+\/(.+);base64,(.*)$/)
      const ext = matches[1]
      const data = matches[2]
      const buffer = Buffer.from(data, 'base64')
      if (ext !== 'png' && ext !== 'jpeg' && ext !== 'jpg' && ext !== 'webp') {
        return resolve('')
      }
      sharp(buffer)
        .resize(200, 200)
        .toBuffer()
        .then((data) => resolve(bufferToDataUrl(data, ext)))
        .catch(reject)
    })
  },
  resizeAvatarImageSmall(dataUrl) {
    return new Promise((resolve, reject) => {
      if (!dataUrl) return resolve('')
      const matches = dataUrl.match(/^data:.+\/(.+);base64,(.*)$/)
      const ext = matches[1]
      const data = matches[2]
      const buffer = Buffer.from(data, 'base64')
      if (ext !== 'png' && ext !== 'jpeg' && ext !== 'jpg' && ext !== 'webp') {
        return resolve('')
      }
      sharp(buffer)
        .resize(40, 40)
        .toBuffer()
        .then((data) => resolve(bufferToDataUrl(data, ext)))
        .catch(reject)
    })
  },
}
