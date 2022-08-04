export function getBase64FromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      resolve(reader.result)
    }
    reader.onerror = function (err) {
      reject(err)
    }
  })
}

export function downloadURI(uri, name) {
  const matches = uri.match(/^data:.+\/(.+);base64,(.*)$/)
  let ext = matches[1]
  if (ext === 'plain') {
    ext = 'txt'
  }
  const link = document.createElement('a')
  link.download = `${name}.${ext}`
  link.href = uri
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function getShortAddress(address) {
  if (!address || typeof address !== 'string') return ''
  return address.slice(0, 10) + '...' + address.slice(35, 42)
}

export function getShortNumString(num) {
  if (!num || typeof num !== 'number') return '0'
  if (num > 1000000000) {
    return `${Math.round(num / 1000000000)} BILLION`
  }
  if (num > 1000000) {
    return `${Math.round(num / 1000000)} MILLION`
  }
  if (num > 1000) {
    return `${Math.round(num / 1000)} THOUSAND`
  }
  return Math.round(num * 100) / 100
}



export function convertToUSD(coinPrice, coinAmount) {
  if(!coinPrice || !coinAmount) return 0
  if(coinPrice === typeof 'string') coinPrice = parseFloat(coinPrice)
  if(coinAmount === typeof 'string') coinAmount = parseFloat(coinAmount)
  return Number((coinPrice * coinAmount).toFixed(2))
}