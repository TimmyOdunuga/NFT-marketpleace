import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router'
import useIsMounted from 'react-is-mounted-hook'
import { SwitchTransition } from 'react-transition-group'

import PurchasePopup from '../components/new/popups/PurchasePopup'

import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Fab from '@mui/material/Fab'
import Fade from '@mui/material/Fade'
import Skeleton from '@mui/material/Skeleton'
import SvgIcon from '@mui/material/SvgIcon'

import styled from '@mui/material/styles/styled'

import SelectionGrid from '../components/new/SelectionGrid'

import { getNFTByID, getETHPrice, downloadNFTData, finalizeNFTLicensing } from '../util/Api'
import { downloadURI } from '../util/Func'
import { ensureLogin, sendCurrencyToServer, getMetamaskAccount } from '../util/Metamask'
import useStore from '../util/Store'

const NftImageOverlay = styled('div')(({ theme }) => ({
  height: '100%',
  width: '100%',
  position: 'absolute',
  transition: 'all 0.3s',
  top: 0,
  zIndex: 2,
}))

const NftImageContainer = styled('div')(({ theme }) => ({
  height: '100%',
  width: '100%',
  aspectRatio: '5 / 6',
  position: 'relative',
  borderRadius: 14,
  overflow: 'hidden',
}))

const NftImage = styled('img')(({ theme }) => ({
  objectFit: 'cover',
  userSelect: 'none',
  height: '100%',
  width: '100%',
}))

const ItemDetails = () => {
  const { id } = useParams()
  const isMounted = useIsMounted()
  const [user, setUser] = useStore('user')
  const [loading, setLoading] = useState(false)
  const [ethPrice, setEthPrice] = useState(0)
  const [nft, setNft] = useState({})
  const [disNavActive, setDisNavActive] = useState('Info')
  const [disableInput, setDisableInput] = useState(false)
  const [error, setError] = useState('')
  const [status, setStatus] = useState('')

  const [purchasePopup, setPurchasePopup] = useState(false)

  const handleClickNFTPendingPurchase = (nft) => {
    setPurchasePopup(true)
  }

  const handleClickOffPurchase = () => {
    if (loading) return
    setPurchasePopup(false)
  }

  const handleClickNFTPurchase = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      console.log(user)
      if (!user.address) throw Error('You must have a connected wallet to purchase an NFT')
      if (nft.price >= user.balance)
        throw Error('You do not have sufficient funds to purchase this NFT')
      if (nft.stock < 1) throw Error('NFT is out of stock')
      setStatus('Initiating Transaction')
      window.onbeforeunload = () => {
        return ''
      }
      const txHash = await sendCurrencyToServer(nft.priceType, nft.price)
      setStatus('Finalizing Licensing')
      console.log(user.address, nft.owner?.address)
      const { nft: newNft } = await finalizeNFTLicensing({
        id: nft.nftId,
        buyer: user.address,
        seller: nft.owner?.address,
        txHash,
      })
      setNft(newNft)
      const { address, balance } = await getMetamaskAccount()
      setUser({
        ...user,
        address,
        balance,
      })
      setPurchasePopup(false)
    } catch (err) {
      console.error(err)
      setError(err?.response?.data?.msg || err.message)
    } finally {
      if (!isMounted()) return
      setLoading(false)
      setStatus('')
      window.onbeforeunload = undefined
    }
  }, [isMounted, user, nft, setUser])

  const handleCloseAlert = () => {
    setError('')
  }

  const handleClickDownload = async () => {
    try {
      setDisableInput(true)
      await ensureLogin()
      const { data } = await downloadNFTData(nft.nftId)
      if (!isMounted()) return
      downloadURI(data, nft.name)
    } catch (err) {
      console.error(err)
    } finally {
      if (!isMounted()) return
      setDisableInput(false)
    }
  }

  const handleNav = (e, newValue) => {
    e.preventDefault()
    setDisNavActive(newValue)
  }

  const populateEthPrice = useCallback(async () => {
    try {
      const { price } = await getETHPrice('USD')
      if (!isMounted()) return

      setEthPrice(price)
    } catch (err) {
      console.error(err)
    }
  }, [isMounted])

  const populateItem = useCallback(async () => {
    try {
      setLoading(true)

      const data = await getNFTByID(id)
      setNft(data.nft)
    } catch (err) {
      console.error(err)
    } finally {
      if (!isMounted()) return
      setLoading(false)
    }
  }, [setLoading, isMounted, id])

  useEffect(() => {
    populateEthPrice()
  }, [populateEthPrice])

  useEffect(() => {
    populateItem()
  }, [populateItem])

  return (
    <div>
      {loading ? (
        <Container sx={{ mt: 8, mb: 4 }}>
          <Grid container justifyContent="space-between">
            <Grid item xs={12} md={7}>
              <Skeleton
                variant="rectangular"
                animation="wave"
                sx={{ aspectRatio: '5 / 6', width: '100%', height: '100%', borderRadius: '14px' }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Skeleton
                variant="rectangular"
                animation="wave"
                sx={{ borderRadius: '14px', mt: { xs: 2, md: 0 } }}
                height={200}
              />
              <Skeleton
                variant="rectangular"
                animation="wave"
                sx={{ borderRadius: '14px', mt: 2 }}
                height={60}
              />
              <Skeleton
                variant="rectangular"
                animation="wave"
                sx={{ borderRadius: '14px', mt: 8 }}
                height={140}
              />
              <Skeleton
                variant="rectangular"
                animation="wave"
                sx={{ borderRadius: '14px', mt: 2 }}
                height={80}
              />
              <Skeleton
                variant="rectangular"
                animation="wave"
                sx={{ borderRadius: '14px', mt: 12 }}
                height={160}
              />
            </Grid>
          </Grid>
        </Container>
      ) : (
        <Fade in={!loading}>
          <Container sx={{ mt: 8, mb: 4 }}>
            <Grid container justifyContent="space-between">
              <Grid item xs={12} md={7}>
                <Box>
                  <NftImageContainer>
                    <NftImageOverlay>
                      <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="stretch"
                        height="100%"
                        padding={2}
                      >
                        <Grid item flexGrow={1}>
                          <Grid container justifyContent="space-between" alignItems="center">
                            <Grid item>
                              <Chip
                                variant="status"
                                color="secondary"
                                label={nft?.status}
                                sx={{ mr: 1, boxShadow: '0px 12px 12px rgba(31, 47, 70, 0.12)' }}
                              />
                              <Chip
                                variant="status"
                                color="primary"
                                label={nft?.categories?.[0]}
                                sx={{ boxShadow: '0px 12px 12px rgba(31, 47, 70, 0.12)' }}
                              />
                            </Grid>
                            <Grid item>
                              <Fab
                                size="small"
                                sx={{
                                  color: 'text.secondary',
                                  boxShadow: '0px 12px 12px rgba(31, 47, 70, 0.12)',
                                }}
                              >
                                <SvgIcon fontSize="small">
                                  <use xlinkHref="#icon-heart" />
                                </SvgIcon>
                              </Fab>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Grid container justifyContent="center">
                            {/**Put content in here when ready */}
                          </Grid>
                        </Grid>
                      </Grid>
                    </NftImageOverlay>
                    <NftImage src={nft?.image} />
                  </NftImageContainer>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ mt: { xs: 2, md: 0 } }}>
                  <Typography variant="h3">{nft?.name}</Typography>
                  <Grid container spacing={1} sx={{ mt: 1 }}>
                    <Grid item>
                      <Chip variant="outlined" color="secondary" label={`${nft?.price} BNB`} />
                    </Grid>
                    <Grid item>
                      <Chip
                        variant="outlined"
                        label={`$${Math.round(nft?.price * ethPrice * 100) / 100}`}
                      />
                    </Grid>
                    <Grid item>
                      <Chip variant="outlined" label={`${nft?.stock} in stock`} />
                    </Grid>
                  </Grid>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    fontWeight={500}
                    sx={{ my: 4 }}
                  >
                    {nft?.description}
                  </Typography>
                  <SelectionGrid
                    options={['Info', 'History']}
                    value={disNavActive}
                    onChange={handleNav}
                  />
                  <Box sx={{ height: 400, overflowY: 'auto' }}>
                    <SwitchTransition>
                      {disNavActive === 'Info' ? (
                        <Fade key={`details-item-info`} unmountOnExit>
                          <div>
                            <Grid container sx={{ mt: 2 }} spacing={2} alignItems="center">
                              <Grid item>
                                <Avatar src={nft?.owner?.avatar} />
                              </Grid>
                              <Grid item>
                                <Typography variant="body1" color="text.secondary" fontWeight={500}>
                                  Owner
                                </Typography>
                                <Typography variant="body2" fontWeight={500}>
                                  {nft?.owner?.name}
                                </Typography>
                              </Grid>
                            </Grid>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="body1" fontWeight={500}>
                              Created on
                            </Typography>
                            <Typography
                              variant="body2"
                              fontWeight={500}
                              color="text.secondary"
                              sx={{ mb: 2 }}
                            >
                              {new Date(nft?.createdAt).toUTCString()}
                            </Typography>
                            <Typography variant="body1" fontWeight={500}>
                              Owner Address
                            </Typography>
                            <Typography
                              variant="body2"
                              fontWeight={500}
                              color="text.secondary"
                              sx={{ mb: 2 }}
                            >
                              {nft?.owner?.address}
                            </Typography>
                            <Typography variant="body1" fontWeight={500}>
                              Views
                            </Typography>
                            <Typography
                              variant="body2"
                              fontWeight={500}
                              color="text.secondary"
                              sx={{ mb: 2 }}
                            >
                              {nft?.views}
                            </Typography>
                          </div>
                        </Fade>
                      ) : (
                        <Fade key={`details-item-history`} unmountOnExit>
                          <div>
                            {nft?.history?.map((history, index) => (
                              <Box key={`history-item-${index}`}>
                                <Grid container sx={{ mt: 2 }} spacing={2}>
                                  <Grid item alignSelf="center">
                                    <Avatar src={history?.user?.avatar} />
                                  </Grid>
                                  <Grid item flexGrow={1}>
                                    <Typography variant="body1" fontWeight={500}>
                                      {history?.user?.name}
                                    </Typography>
                                    <Typography
                                      variant="body1"
                                      color="text.secondary"
                                      fontWeight={500}
                                    >
                                      {history?.action}
                                    </Typography>
                                  </Grid>
                                  <Grid item>
                                    <Typography variant="caption" color="text.secondary">
                                      {new Date(history?.date).toUTCString()}
                                    </Typography>
                                  </Grid>
                                </Grid>
                                <Divider sx={{ mt: 2 }} />
                              </Box>
                            ))}
                          </div>
                        </Fade>
                      )}
                    </SwitchTransition>
                  </Box>
                  <Paper variant="outlined" sx={{ p: 3 }}>
                    <Typography variant="body1" color="text.secondary" fontWeight={500}>
                      {nft?.name} by{' '}
                      <Typography
                        component="span"
                        display="inline"
                        variant="body1"
                        color="text.primary"
                        fontWeight={500}
                      >
                        {nft?.owner?.name}
                      </Typography>
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ mb: 3 }}
                      fontWeight={500}
                    >
                      for{' '}
                      <Typography
                        display="inline"
                        component="span"
                        color="text.primary"
                        fontWeight={500}
                      >
                        {Math.round(nft?.price * 1.015 * 10000) / 10000} {nft?.priceType}{' '}
                      </Typography>
                    </Typography>
                    {user?.address !== nft?.owner?.address ? (
                      <Button
                        size="large"
                        disabled={loading || disableInput || nft.status !== 'on sale'}
                        onClick={handleClickNFTPendingPurchase}
                        startIcon={
                          <SvgIcon fontSize="small">
                            <use xlinkHref="#icon-wallet" />
                          </SvgIcon>
                        }
                      >
                        Purchase now
                      </Button>
                    ) : (
                      <Button
                        size="large"
                        disabled={loading || disableInput}
                        onClick={handleClickDownload}
                        startIcon={
                          <SvgIcon fontSize="small">
                            <use xlinkHref="#icon-upload-file" />
                          </SvgIcon>
                        }
                      >
                        Download
                      </Button>
                    )}
                    {user?.address !== nft?.owner?.address && (
                      <Grid container justifyContent="space-between">
                        <Grid item>
                          <Typography sx={{ mt: 2 }} color="text.secondary" fontWeight={500}>
                            + Service fee{' '}
                            <Typography
                              display="inline"
                              component="span"
                              color="text.primary"
                              fontWeight={500}
                            >
                              1.5%
                            </Typography>
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography textAlign='left' sx={{ mt: 2 }} color="text.secondary" fontWeight={500}>
                            Total
                            <Typography sx={{ mt: 1 }} color="text.primary" fontWeight={600}>
                              ${Math.round(nft?.price * ethPrice * 1.015 * 100) / 100}
                            </Typography>
                          </Typography>
                          
                        </Grid>
                      </Grid>
                    )}
                  </Paper>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Fade>
      )}
      <PurchasePopup
        name={nft.name}
        description={nft.description}
        price={nft.price}
        priceType={nft.priceType}
        image={nft.image}
        open={purchasePopup}
        status={status}
        loading={loading}
        error={error}
        onClickPurchase={handleClickNFTPurchase}
        onClose={handleClickOffPurchase}
        onCloseError={handleCloseAlert}
      />
    </div>
  )
}

export default ItemDetails
