import React, { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router'
import useIsMounted from 'react-is-mounted-hook'

import PurchasePopup from '../components/new/popups/PurchasePopup'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Container from '@mui/material/Container'
import Slider from '@mui/material/Slider'
import TextField from '@mui/material/TextField'
import Fab from '@mui/material/Fab'
import Box from '@mui/material/Box'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Fade from '@mui/material/Fade'
import SvgIcon from '@mui/material/SvgIcon'

import MultipleSelect from '../components/new/MultipleSelect'
import NftCard from '../components/new/NftCard'
import NftCardSkeleton from '../components/new/NftCardSkeleton'

import useStore from '../util/Store'
import { getNFTs, finalizeNFTLicensing, downloadNFTData } from '../util/Api'
import { sendCurrencyToServer, getMetamaskAccount, ensureLogin } from '../util/Metamask'
import { downloadURI } from '../util/Func'

const groups = [ 'Membership', 'Founder']

const defaultFilter = {
  sort: 'Newest',
  priceRange: [0, 1000],
  price: 'Any',
  category: 'Any',
} 

const Discover = () => {
  const isMounted = useIsMounted()
  const history = useHistory()
  const [user, setUser] = useStore('user')
  const [nftsLoading, setNftsLoading] = useState(false)
  const [purchaseLoading, setPurchaseLoading] = useState(false)
  const [status, setStatus] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(10)
  const [limit, setLimit] = useState(10)
  const [error, setError] = useState('')

  const [nfts, setNfts] = useState([])
  const [filter, setFilter] = useState(defaultFilter)
  const [savedFilter, setSavedFilter] = useState(defaultFilter)

  const [activeNft, setActiveNft] = useState({})
  const [purchasePopup, setPurchasePopup] = useState(false)

  const handleCloseAlert = () => {
    setError('')
  }

  const handleClickNFT = (nft) => {
    history.push(`/item/${nft.nftId}`)
    window.scrollTo(0, 0)
  }

  const handleClickNFTPendingPurchase = (nft) => {
    setActiveNft(nft)
    setPurchasePopup(true)
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

  const handleChangeCategory = (e, name) => {
    e.preventDefault()
    if (nftsLoading) return
    setPage(1)
    setFilter({
      ...filter,
      category: name,
    })
    setSavedFilter({
      ...savedFilter,
      category: name,
    })
  }

  const handleChangePriceRange = (e, value) => {
    setFilter({
      ...filter,
      priceRange: value,
    })
  }

  const handleChangeSelectPrice = (value) => {
    if (value === filter.price) return
    setFilter({
      ...filter,
      price: value,
      sort: 'Any',
    })
  }

  const handleChangeSelectSort = (value) => {
    if (value === filter.sort) return
    setFilter({
      ...filter,
      sort: value,
      price: 'Any',
    })
  }

  const handleResetFilter = (e) => {
    e.preventDefault()
    setFilter({ ...defaultFilter })
    setSavedFilter({ ...defaultFilter })
  }

  const handleChangeSearch = (e) => {
    setSearch(e.target.value)
    if (e.target.value === '') {
      populateNFTs(e.target.value)
    }
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    populateNFTs(search)
  }

  const handleAddPage = () => {
    setPage(page + 1)
  }

  const handleRemovePage = () => {
    setPage(page - 1)
  }

  const handleSubmitFilter = () => {
    setSavedFilter(filter)
  }

  const isFilterSame = useCallback(() => {
    return JSON.stringify(filter) === JSON.stringify(savedFilter)
  }, [filter, savedFilter])

  const populateNFTs = useCallback(
    async (search) => {
      try {
        const { sort, price, priceRange, category } = savedFilter
        setNftsLoading(true)
        const {
          nfts: { docs, totalDocs, limit },
        } = await getNFTs({ search, page, sort, price, priceRange, category })
        if (!isMounted()) return
        setNfts(docs)
        setTotal(totalDocs)
        setLimit(limit)
      } catch (err) {
        console.error(err)
        setError(err?.response?.data?.msg || err.message)
      } finally {
        if (!isMounted()) return
        setNftsLoading(false)
      }
    },
    [page, savedFilter, isMounted]
  )

  useEffect(() => {
    populateNFTs()
  }, [populateNFTs])

  return (
    <div>
      <Container sx={{ mt: 6 }}>
        <Grid container justifyContent="space-between" spacing={2}>
          <Grid item>
            <Typography variant="h5" fontWeight={500}>
              Listings
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item flexGrow={1}>
                <form onSubmit={handleSearchSubmit}>
                  <TextField
                    placeholder="Search..."
                    fullWidth
                    value={search}
                    onChange={handleChangeSearch}
                  />
                </form>
              </Grid>
              <Grid item>
                <Fab color="primary" size="small" onClick={handleSearchSubmit}>
                  <SvgIcon fontSize="small">
                    <use xlinkHref="#icon-search" />
                  </SvgIcon>
                </Fab>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 4, mb: 5 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <MultipleSelect
                  fullWidth
                  options={['Newest', 'Oldest', 'Any']}
                  value={filter.sort}
                  onChange={handleChangeSelectSort}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ p: 1 }}>
                  <Slider
                    value={filter.priceRange}
                    onChange={handleChangePriceRange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={100}
                    step={0.1}
                    valueLabelFormat={(s) => `${s === 1 ? '> 1' : s} BNB`}
                  />
                </Box>
                <Typography variant="subtitle2" color="text.accent">
                  {filter.priceRange[0]} BNB -{' '}
                  {filter.priceRange[1] === 1000 ? '∞' : filter.priceRange[1]} BNB
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ mb: 3 }} />
                <Typography
                  variant="subtitle2"
                  color="text.accent"
                  textTransform="uppercase"
                  sx={{ mb: 1 }}
                >
                  Price
                </Typography>
                <MultipleSelect
                  fullWidth
                  options={['Ascending', 'Descending', 'Any']}
                  value={filter.price}
                  onChange={handleChangeSelectPrice}
                />
                <Divider sx={{ mt: 3 }} />
              </Grid>
              <Grid item xs={12}>
                <Grid container justifyContent="space-between" alignItems="center">
                  <Grid item>
                    <Button disabled={nftsLoading || isFilterSame()} onClick={handleSubmitFilter}>
                      Save
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      startIcon={
                        <SvgIcon>
                          <use xlinkHref="#icon-close-circle" />
                        </SvgIcon>
                      }
                      onClick={handleResetFilter}
                    >
                      Reset Filter
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md lg>
            <Grid container justifyContent="end" spacing={1}>
              <Grid item>
                <ToggleButtonGroup size="small" aria-label="category select">
                  <ToggleButton
                    key={0}
                    onClick={(e) => handleChangeCategory(e, 'Any')}
                    selected={filter.category === 'Any'}
                    value="Any"
                  >
                    All Items
                  </ToggleButton>
                  {groups.map((group, index) => (
                    <ToggleButton
                      key={index + 1}
                      onClick={(e) => handleChangeCategory(e, group)}
                      selected={filter.category === group}
                      value={group}
                    >
                      {group}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Grid>
            </Grid>
            {nftsLoading ? (
              <Grid container spacing={4} padding={4} justifyContent="center">
                <Grid item xs={12} sm={6} md={4}>
                  <NftCardSkeleton />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <NftCardSkeleton />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <NftCardSkeleton />
                </Grid>
              </Grid>
            ) : (
              <Fade in={!nftsLoading}>
                <Grid container spacing={4} padding={4} justifyContent="center">
                  {nfts.map((item, index) => (
                    <Grid item key={`discover-item-${index}`} xs={12} sm={6} md={4}>
                      <NftCard
                        name={item.name}
                        description={item.description}
                        image={item.image}
                        stock={item.stock}
                        price={item.price}
                        priceType={item.priceType}
                        category={item.categories?.[0]}
                        isOwner={
                          user?.address
                            ? item.owner.address.toLowerCase() === user?.address?.toLowerCase()
                            : false
                        }
                        status={item.status}
                        onClick={() => handleClickNFT(item)}
                        onClickDownload={() => handleClickNFTDownload(item)}
                        onClickPurchase={() => handleClickNFTPendingPurchase(item)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Fade>
            )}
            {nfts.length === 0 && !nftsLoading && (
              <Grid
                container
                spacing={4}
                padding={4}
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <Grid item>
                  <Typography variant="h6">
                    Whoops! Looks like there's no NFTs that match that search
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    startIcon={
                      <SvgIcon>
                        <use xlinkHref="#icon-close-circle" />
                      </SvgIcon>
                    }
                    onClick={handleResetFilter}
                  >
                    Reset Filter
                  </Button>
                </Grid>
              </Grid>
            )}
            {nfts.length !== 0 && (
              <Grid container spacing={4} padding={4} justifyContent="center">
                <Grid item>
                  <Button
                    variant="outlined"
                    disabled={nfts.length === 0 || page === 1 || nftsLoading}
                    onClick={handleRemovePage}
                  >
                    Previous Page
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    disabled={nfts.length === 0 || page === Math.ceil(total / limit) || nftsLoading}
                    onClick={handleAddPage}
                  >
                    Next Page
                  </Button>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
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
        onCloseError={handleCloseAlert}
      />
    </div>
  )
}

export default Discover
