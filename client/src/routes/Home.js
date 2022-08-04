import React, { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import Slider from 'react-slick'
import useIsMounted from 'react-is-mounted-hook'
import styled from 'styled-components';

import PurchasePopup from '../components/new/popups/PurchasePopup'

import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Collapse from '@mui/material/Collapse'
import Divider from '@mui/material/Divider'
import SvgIcon from '@mui/material/SvgIcon'

import { getNFTs, getEvents, getUsers, downloadNFTData, finalizeNFTLicensing, getETHPrice } from '../util/Api'
import MultipleSelect from '../components/new/MultipleSelect'
import { sendCurrencyToServer, getMetamaskAccount, ensureLogin } from '../util/Metamask'
import { downloadURI, convertToUSD } from '../util/Func'
import useStore from '../util/Store'
import UserRanking from '../components/new/UserRanking'
import CollectionPreview from '../components/new/CollectionPreview'

import NftPreview from '../components/new/NftPreview'
import UserPreview from '../components/new/UserPreview'
import NftCard from '../components/new/NftCard'

import DisplayNft from '../components/new/DisplayNft'
import DisplayNftSkeleton from '../components/new/DisplayNftSkeleton'
import { lineHeight, padding } from '@mui/system'

const NftSlider = ({ children }) => {
  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <></>,
    nextArrow: <></>,
    dots: false,
    adaptiveHeight: true,
    speed: 500,
  }

  return <Slider {...settings}>{children}</Slider>
}

const defaultFilter = {
  sort: 'Newest',
  priceRange: [0, 10000],
  price: 'Any',
  category: 'Any',
}

const Home = () => {
  const isMounted = useIsMounted()
  const history = useHistory()
  const [user, setUser] = useStore('user')
  const [nfts, setNfts] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [ethPrice, setEthPrice] = useState(0)
  const [founderNFT, setFounderNft] = useState([])
  const [memberNFT, setMemberNFT] = useState([])
  const [events, setEvents] = useStore([]);
  const [activeNft, setActiveNft] = useState({})
  const [purchasePopup, setPurchasePopup] = useState(false)
  const [status, setStatus] = useState('')
  const [purchaseLoading, setPurchaseLoading] = useState(false)

  const handleNavDiscover = (e) => {
    e.preventDefault()
    history.push('/discover')
    window.scrollTo(0, 0)
  }

  const handleNavConnect = (e) => {
    e.preventDefault()
    history.push('/connect')
    window.scrollTo(0, 0)
  }

  const handleNavUpload = (e) => {
    e.preventDefault()
    history.push('/upload')
    window.scrollTo(0, 0)
  }

  const handleClickPurchase = (item) => {
    setActiveNft(item)
    setPurchasePopup(true)
  }

  const handleClickViewItem = (item) => {
    history.push(`/item/${item.nftId}`)
    window.scrollTo(0, 0)
  }

  const handleCloseError = () => {
    setError('')
  }

  const handleClickNFT = (nft) => {
    history.push(`/item/${nft.nftId}`)
    window.scrollTo(0, 0)
  }

  const handleClickOffPurchase = () => {
    if (purchaseLoading) return
    setPurchasePopup(false)
  }

  const handleClickNFTPurchase = useCallback(async () => {
    try {
      setPurchaseLoading(true)
      setError('')
      if (!user.address) throw Error('You must have a connected wallet to purchase an NFT')
      if (activeNft.price >= user.balance)
        throw Error('You do not have sufficient funds to purchase this NFT')
      if (activeNft.stock < 1) throw Error('NFT is out of stock')
      setStatus('Initiating Transaction')
      window.onbeforeunload = () => {
        return ''
      }
      const txHash = await sendCurrencyToServer(activeNft.priceType, activeNft.price)
      setStatus('Finalizing Licensing')
      const { nft: newNft } = await finalizeNFTLicensing({
        id: activeNft.nftId,
        buyer: user.address,
        seller: activeNft.owner?.address,
        txHash,
      })
      setNfts(
        nfts.map((item) => {
          if (item.nftId === activeNft.nftId) return newNft
          return item
        })
      )
      const { address, balance } = await getMetamaskAccount()
      setUser({
        ...user,
        address,
        balance,
      })
      history.push(`/item/${activeNft.nftId}`)
      window.scrollTo(0, 0)
    } catch (err) {
      console.error(err)
      setError(err?.response?.data?.msg || err.message)
    } finally {
      if (!isMounted()) return
      setPurchaseLoading(false)
      setStatus('')
      window.onbeforeunload = undefined
    }
  }, [activeNft, user, nfts, history, isMounted, setUser])

  const handleClickNFTDownload = async (nft) => {
    try {
      setPurchaseLoading(true)
      await ensureLogin()
      const { data } = await downloadNFTData(nft.nftId)
      if (!isMounted()) return
      downloadURI(data, nft.name)
    } catch (err) {
      console.error(err)
    } finally {
      if (!isMounted()) return
      setPurchaseLoading(false)
    }
  }

  const populateUsers = useCallback(async () => {
    try {
      setLoading(true)

      const { users } = await getUsers()
      if (!isMounted()) return

      setUsers(users)
    } catch (err) {
      console.error(err)
      setError(err?.response?.data?.msg || err.message)
    } finally {
      if (!isMounted()) return
      setLoading(false)
    }
  }, [isMounted])

  const populateNFTs = useCallback(async () => {
    try {
      setLoading(true)
      const { sort, price, priceRange, category } = defaultFilter
      const {  nfts: { docs },  } = await getNFTs({ sort, price, priceRange, category })

      const {  nfts: { docs:memberDocs },  } = await getNFTs({ sort, price, priceRange, category:"membership" })
      const {  nfts: { docs:founderDocs },  } = await getNFTs({ sort, price, priceRange, category:'founder' })

      if (!isMounted()) return
      
      setFounderNft(founderDocs)
      setMemberNFT(memberDocs)

      setNfts(docs)
    } catch (err) {
      console.error(err)
      setError(err?.response?.data?.msg || err.message)
    } finally {
      if (!isMounted()) return
      setLoading(false)
    }
  }, [isMounted])

  const populateEvents = useCallback(async () => {
    try {
      let loadEvents = await getEvents();

      setEvents(loadEvents.events);
    } catch (err) {
      console.log(err);
    }
  }, []);


  useEffect(() => {
    populateUsers();
  }, [populateUsers])

  useEffect(() => {
    populateEvents();
  }, [populateUsers])
  
  useEffect(() => {
    populateNFTs()
  }, [populateNFTs])

  const populateEthPrice = useCallback(async () => {
    try {
      const data = await getETHPrice('usd')
      if (!isMounted()) return
      setEthPrice(data.price)
    } catch (err) {
      console.error(err)
    }
  }, [isMounted])

  useEffect(() => {
    populateEthPrice()
  }, [populateEthPrice])

  return (
    <div>
      <PurchasePopup
        name={activeNft.name}
        description={activeNft.description}
        price={activeNft.price}
        priceType={activeNft.priceType}
        image={activeNft.image}
        open={purchasePopup}
        status={status}
        loading={purchaseLoading}
        error={error}
        onClickPurchase={handleClickNFTPurchase}
        onClose={handleClickOffPurchase}
        onCloseError={handleCloseError}
      />
      <Box sx={{ p: 2 }}>
        <Collapse in={!!error} unmountOnExit>
          <Alert severity="error" onClose={handleCloseError}>
            {error}
          </Alert>
        </Collapse>
      </Box>
      <Box sx={{ my: 10 }}>
        <Container style={{padding:'20px'}}>
          <div style={{ backgroundColor:'#4E032A', borderRadius:'15px', backgroundImage:"url(https://images.unsplash.com/photo-1568213816046-0ee1c42bd559?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80)"}}>
            <Background>
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                direction="column"
                spacing={1}
              >
                <Grid item>
                  <Typography
                    variant="subtitle2"
                    textAlign="center"
                    color="text.secondary"
                    textTransform="uppercase"
                  >
                    Explore and Purchase Membership NFTs to gain access to special events, offerings and more!
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography color='white' variant="h3" textAlign="center">
                    Welcome to the Barrel Riot
                  </Typography>
                  <Typography color='white' variant="h3" textAlign="center">
                    Wines NFT Page
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    sx={{ mt: 2 }}
                    style={{
                      fontSize: '15px',
                      fontWeight: '600',
                      borderWidth: '2px',
                      padding: '5px 20px',
                      color: 'white',
                    }}
                    href="/discover"
                    onClick={handleNavDiscover}
                  >
                    Start your search
                  </Button>
                </Grid>
              </Grid>
            </Background>
          </div>
        </Container>
      </Box>
      <Box sx={{ my: 12 }}>
        <Container style={{padding:'20px'}}>
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              direction="column"
              spacing={1}
            >
              <Grid item>
                <Typography
                  variant="h5"
                  textAlign="center"
                  color="text"
                  textTransform="uppercase"
                >
                  Explore our NFT collections we have available for our winery!
                </Typography>
              </Grid>
              <Grid item>
                <Typography style={{maxWidth:'1000px', lineHeight:'35px'}} component='p' variant="body1" textAlign="center">
                Become part of our exciting adventure as we grow. 
                NFT owners get more: Not only do you own one of our NFTs but NFTs give you access to special member only features and events. Find out more by exploring our NFTs below
                </Typography>
              </Grid>
            </Grid>
        </Container>
      </Box>
      
      <Box sx={{ bgcolor: '#f4f5f6', py: 8 }}>
        <Container>
          <Grid container justifyContent="start">
            <Grid item xs={12} sm={4} md={3} lg={2}>
              <Typography variant="h5" sx={{ ml: 1 }}>
                Founder NFT Collection:
              </Typography>
            </Grid>
            <Grid item>
              <Typography 
                style={{maxWidth:'800px'}} 
                textAlign="center"
                variant="h6"
                color="text.secondary">
                Founder NFTs are ‘Platinum’ and 'Legendary' levels (our most elite NFT offerings). Founders have access to every and all events. Owners of these NFTs become part of our customer board and are invited to participate in tasting wines for choosing the next varietals, naming the new wines, bottle design, and more. Includes special access to signature cases of each varietal. Click here to find out more about Founder level NFTs.
                <a style={{padding:'0px 5px', textDecoration:'none'}} href='https://barrelriot.com/home/nft-level/'>Click here to find out more about Founder level NFTs</a>
              </Typography>
            </Grid>
            <Grid container spacing={3} sx={{ my: 3 }} justifyContent="center">
            {founderNFT.map((item, index) =>(
              <Grid item xs={12} sm={6} md={4} lg={3} key={`nft-home-${index}`}>
                <NftCard
                  category={item.categories[0]}
                  name={item.name}
                  image={item.image}
                  stock={item.stock}
                  description={item.description}
                  price={convertToUSD(ethPrice ,item.price)}
                  priceType={"USD"}
                  status={item.status}
                  schedule={`Upcoming Event: ${events[0].eventName}. ${events[0].date}`}
                  isOwner={
                    user?.address
                      ? item.owner.address.toLowerCase() === user?.address?.toLowerCase()
                      : false
                  }
                  onClickDownload={() => handleClickNFTDownload(item)}
                  onClickPurchase={() => handleClickPurchase(item)}
                  onClick={() => handleClickNFT(item)}
                />
              </Grid>
            ))}
          </Grid>
          </Grid>
          
        </Container>
      </Box>
      <Box sx={{ py: 8 }}>
      <Container>
          <Grid container justifyContent="start">
            <Grid item xs={12} sm={4} md={3} lg={2}>
              <Typography variant="h5" sx={{ ml: 1 }}>
                Member NFT Collection:
              </Typography>
            </Grid>
            <Grid item>
              <Typography 
                style={{maxWidth:'800px'}} 
                textAlign="center"
                variant="h6"
                color="text.secondary">
                Member NFTs are our ‘Gold’ and ‘Silver’ NFT offerings. Members have access to barrel tasting and get invited to special member only events. Includes special access to signature bottles and cases of each varietal.
                <a style={{padding:'0px 5px', textDecoration:'none'}} href='https://barrelriot.com/home/nft-level/'>Click here to find out more about Member level NFTs</a>
              </Typography>
            </Grid>
            <Grid container spacing={3} sx={{ my: 3 }} justifyContent="center">
            {memberNFT.map((item, index) =>(
              <Grid item xs={12} sm={6} md={4} lg={3} key={`nft-home-${index}`}>
                <NftCard
                  category={item.categories[0]}
                  name={item.name}
                  image={item.image}
                  stock={item.stock}
                  description={item.description}
                  price={convertToUSD(ethPrice ,item.price)}
                  priceType={"USD"}
                  status={item.status}
                  isOwner={
                    user?.address
                      ? item.owner.address.toLowerCase() === user?.address?.toLowerCase()
                      : false
                  }
                  schedule={`Upcoming Event: ${events[0].eventName}. ${events[0].date}`}
                  onClickDownload={() => handleClickNFTDownload(item)}
                  onClickPurchase={() => handleClickPurchase(item)}
                  onClick={() => handleClickNFT(item)}
                />
              </Grid>
            ))}
          </Grid>
          </Grid>
          
        </Container>
      </Box>
      <Box sx={{ bgcolor: '#f4f5f6', py: 8 }}>
        <Container>
          <Typography variant="h3" sx={{ mt: 3 }}>
            Discover
          </Typography>
          
        </Container>
      </Box>
      <Box sx={{ bgcolor: '#f4f5f6', py: 4 }}>
        <Container>
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                direction="column"
                spacing={1}
              >
                <Grid item>
                  <Typography
                    variant="subtitle2"
                    textAlign="center"
                    color="text.secondary"
                    textTransform="uppercase"
                  >
                    Discover more NFTs
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography style={{maxWidth:'800px'}} color='text' variant="h5" textAlign="center">
                  Periodically we may release special NFTs for every wine release which may include special access privileges, artwork and more
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    sx={{ my: 5 }}
                    variant="outlined"
                    size="large"
                    href="/discover"
                    onClick={handleNavDiscover}
                    endIcon={
                      <SvgIcon fontSize="small" sx={{ p: '2px' }}>
                        <use xlinkHref="#icon-arrow-next" />
                      </SvgIcon>
                    }
                  >
                    Discover More
                  </Button>
                </Grid>
              </Grid>
          </Container>
      </Box>
    </div>
  )
}

export default Home





const Background = styled.div`
  background: rgba( 0, 0, 0, 0.20 );
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 2.1px );
  -webkit-backdrop-filter: blur( 9px );
  // border: 1px solid rgba( 255, 255, 255, 0.18 );
  padding: 35px 25px;
  border-radius: 15px;
`