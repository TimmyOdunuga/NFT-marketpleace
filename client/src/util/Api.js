import Axios from 'axios'

const DEV_URL = 'http://localhost:5000'
const PROD_URL = ''

const api = Axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? DEV_URL : PROD_URL,
  headers: { Authorization: '' },
})

export function setHeader(field, value) {
  api.defaults.headers[field] = value
}

export function getHeader(field) {
  return api.defaults.headers[field]
}

export async function getETHPrice(currency) {
  try {
    const { data } = await api.get(`/api/crypto/bnb/${currency.toUpperCase()}`)
    return {
      msg: data.msg,
      price: data.price,
    }
  } catch (err) {
    throw err
  }
}

export async function getUsers() {
  try {
    const { data } = await api.get('/api/user')
    return {
      msg: data.msg,
      users: data.users,
    }
  } catch (err) {
    throw err
  }
}


export async function getOwnerAddress() {
  try {
    const { data } = await api.get('/api/user/owner')
    return data.add;

  } catch (err) {
    throw err
  }
}

//Events get
export async function getEvents() {
  try {
    const { data } = await api.get('/api/event')
    return data;

  } catch (err) {
    throw err
  }
}

//Event create
export async function createEvent({
  eventName,
  description,
  date, 
  permissions,
  reservations,
  requirement,
}) {
  try {
    const { data: resData } = await api.post('/api/event', {
      eventName,
      description,
      date, 
      permissions,
      requirement,
    })
    return {
      msg: resData.msg,
      response: resData
    }
  } catch (err) {
    throw err
  }
}

//Delete Events
export async function deleteEvent({
  eventId,
  _id
}) {
  try {
    const { data: resData } = await api.post('/api/event/delete', {
      eventId, _id
    });
    return {
      msg: resData.msg,
      response: resData
    }
  } catch (err) {
    throw err
  }
}

//reserve Events
export async function reserveEvent({
  eventId,
  user, _id
}) {
  try {
    const { data: resData } = await api.post('/api/event/reserve', {
      eventId, user, _id
    });
    return {
      msg: resData.msg,
      response: resData
    }
  } catch (err) {
    throw err
  }
}

export async function getUser(address) {
  try {
    const { data } = await api.get(`/api/user/${address}`)
    return {
      msg: data.msg,
      user: data.user,
    }
  } catch (err) {
    throw err
  }
}

export async function editUser({
  name,
  email,
  bio,
  website,
  twitter,
  instagram,
  facebook,
  avatar,
  background,
}) {
  try {
    const { data } = await api.post('/api/user/', {
      name,
      email,
      bio,
      website,
      twitter,
      instagram,
      facebook,
      avatar,
      background,
    })
    return {
      msg: data.msg,
      user: data.user,
    }
  } catch (err) {
    throw err
  }
}

export async function getUserLite(address) {
  try {
    const { data } = await api.get(`/api/user/${address}/lite`)
    return {
      msg: data.msg,
      user: data.user,
    }
  } catch (err) {
    throw err
  }
}

export async function getNFTsByUserAddress(address) {
  try {
    const { data } = await api.get(`/api/user/${address}/nfts`)
    return {
      msg: data.msg,
      nfts: data.nfts,
    }
  } catch (err) {
    throw err
  }
}

export async function getNFTs({ search, page, sort, price, priceRange, category }) {
  try {
    const { data } = await api.get(
      `/api/nft?search=${search || ''}&page=${page || 1}&sort=${sort || ''}&price=${
        price || ''
      }&priceMin=${priceRange[0] || 0}&priceMax=${priceRange[1] || 1}&category=${category}`
    )
    return {
      msg: data.msg,
      nfts: data.nfts,
    }
  } catch (err) {
    throw err
  }
}

export async function getNFTByID(id) {
  try {
    const { data } = await api.get(`/api/nft/${id}`)
    return {
      msg: data.msg,
      nft: data.nft,
    }
  } catch (err) {
    throw err
  }
}

export async function updateNft(id, { image, name, description, price }) {
  try {
    const { data: resData } = await api.put(`/api/nft/${id}`, {
      image,
      name,
      description,
      price,
    })
    return {
      msg: resData.msg,
      nft: resData.nft,
    }
  } catch (err) {
    throw err
  }
}

export async function downloadNFTData(id) {
  try {
    const { data } = await api.get(`/api/nft/${id}/download`)
    return {
      msg: data.msg,
      data: data.data,
    }
  } catch (err) {
    throw err
  }
}

export async function createNFTInit({
  name,
  description,
  image, // Base64 datauri for image
  data, // Base64 datauri for image
  priceType,
  price,
  categories,
}) {
  try {
    const { data: resData } = await api.put('/api/nft', {
      name,
      description,
      image,
      data,
      priceType,
      price,
      categories,
    })
    return {
      msg: resData.msg,
      nftId: resData.nftId,
      image: resData.image,
    }
  } catch (err) {
    throw err
  }
}

export async function finalizeNFTLicensing({ id, buyer, seller, txHash }) {
  try {
    const { data } = await api.post(`/api/nft/${id}`, {
      buyer,
      seller,
      txHash,
    })
    return {
      msg: data.msg,
      nft: data.nft,
    }
  } catch (err) {
    throw err
  }
}

export async function getFlCard({ }) {
  try {
    const { data } = await api.post(`/api/demo`)
    return {
      msg: data.msg,
    }
  } catch (err) {
    throw err
  }
}

export async function specialAccessRes({token }) {
  try {
    const { data } = await api.get(`/api/access/verifyToken`,{
      headers:{token}
    })
    return {
      msg: data.msg,
      // nft: data.nft,
    }
  } catch (err) {
    throw err
  }
}

export async function getCookie({address}) {
  try {
    const { data } = await api.get(`/api/user/${address}/cookie`)
    return {
      cookie: data.cookie,
    }
  } catch (err) {
    throw err
  }
}

export default api
