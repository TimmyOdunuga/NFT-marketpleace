import React, { useState, useEffect, useCallback } from 'react'
import { useHistory, useParams } from 'react-router'
import useIsMounted from 'react-is-mounted-hook'
import { SwitchTransition } from 'react-transition-group'

import UploadPopup from '../components/new/popups/UploadPopup'

import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Fade from '@mui/material/Fade'
import SvgIcon from '@mui/material/SvgIcon'

import styled from '@mui/material/styles/styled'

import SelectionGrid from '../components/new/SelectionGrid'
import NftCard from '../components/new/NftCard'
import NftCardSkeleton from '../components/new/NftCardSkeleton'
import Skeleton from '@mui/material/Skeleton'

import { ensureLogin, getShortAddress } from '../util/Metamask'
import { editUser, getUser, getNFTsByUserAddress, downloadNFTData } from '../util/Api'
import useStore from '../util/Store'
import { downloadURI } from '../util/Func'

const ProfileBackgroundOverlay = styled('div')(({ theme }) => ({
  height: '100%',
  width: '100%',
  position: 'absolute',
  transition: 'all 0.3s',
  top: 0,
  zIndex: 2,
  border: 'none',
  outline: 'none',
}))

const ProfileBackgroundContainer = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    height: '180px',
  },
  height: '320px',
  width: '100%',
  position: 'relative',
  border: 'none',
  outline: 'none',
}))

const ProfileBackground = styled('img')(({ theme }) => ({
  objectFit: 'cover',
  userSelect: 'none',
  height: '100%',
  width: '100%',
  border: 'none',
  outline: 'none',
}))

const LargeAvatar = styled(Avatar)(({ theme }) => ({
  objectFit: 'cover',
  width: '100%',
  height: 'auto',
  aspectRatio: '1 / 1',
}))

const Profile = () => {
  const params = useParams()
  const history = useHistory()
  const isMounted = useIsMounted()
  const [user, setUser] = useStore('user')
  const [loading, setLoading] = useState(false)
  const [backgroundLoading, setBackgroundLoading] = useState(false)
  const [nftsLoading, setNftsLoading] = useState(false)
  const [downloadLoading, setDownloadLoading] = useState(false)

  const [backgroundPopup, setBackgroundPopup] = useState(false)
  const [category, setCategory] = useState('All')
  const [profile, setProfile] = useState({})
  const [nfts, setNfts] = useState([])
  const [access, setAccess]  = useState(false)

  const handleChangeCategory = (e, newValue) => {
    setCategory(newValue)
  }

  const handleClickEditBackground = () => {
    setBackgroundPopup(true)
  }

  const handleClickOffBackgroundPopup = () => {
    setBackgroundPopup(false)
  }

  const handleClickSubmitBackground = async ({ base64 }) => {
    try {
      setBackgroundLoading(true)
      setBackgroundPopup(false)
      await ensureLogin()
      await editUser({
        background: base64,
      })
      if (!isMounted()) return
      setProfile({ ...user, background: base64 })
      setUser({ ...user, background: base64 })
    } catch (err) {
      console.error(err)
    } finally {
      if (!isMounted()) return
      setBackgroundLoading(false)
    }
  }

  const isProfileOwner = () => {
    return user?.address === params.address
  }

  const handleNormalizeWebsite = (website) => {
    if (website.includes('https://') || website.includes('http://')) {
      return website
    }
    return 'https://' + website
  }

  const handleClickEditProfile = (e) => {
    e.preventDefault()
    history.push('/edit-profile')
    window.scrollTo(0, 0)
  }

  const handleClickNFT = (nft) => {
    history.push(`/item/${nft.nftId}`)
    window.scrollTo(0, 0)
  }

  const handleClickNFTPurchase = (nft) => {
    history.push(`/item/${nft.nftId}`)
    window.scrollTo(0, 0)
  }

  const handleClickNFTDownload = async (nft) => {
    try {
      setDownloadLoading(true)
      await ensureLogin()
      const { data } = await downloadNFTData(nft.nftId)
      if (!isMounted()) return
      downloadURI(data, nft.name)
    } catch (err) {
      console.error(err)
    } finally {
      if (!isMounted()) return
      setDownloadLoading(false)
    }
  }

  const populateUserNFTs = useCallback(async () => {
    try {
      setNftsLoading(true)
      const data = await getNFTsByUserAddress(params.address)
      if (!isMounted()) return
      setAccess(data.nfts.length >= 1)
      setNfts(data.nfts)
    } catch (err) {
      console.error(err)
    } finally {
      if (!isMounted()) return
      setNftsLoading(false)
    }
  }, [isMounted, params.address])

  const populateProfile = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getUser(params.address)
      if (!isMounted()) return
      setProfile(data.user)
    } catch (err) {
      console.error(err)
    } finally {
      if (!isMounted()) return
      setLoading(false)
    }
  }, [isMounted, params.address])

  useEffect(() => {
    populateProfile()
  }, [populateProfile])

  useEffect(() => {
    populateUserNFTs()
  }, [populateUserNFTs])

  return (
    <Box>
      <ProfileBackgroundContainer>
        <ProfileBackgroundOverlay>
          {isProfileOwner() && (
            <Grid
              container
              padding={2}
              spacing={2}
              justifyContent="end"
              alignItems="end"
              height="100%"
            >
              <Grid item>
                <Button disabled={backgroundLoading} onClick={handleClickEditBackground}>
                  Edit cover photo
                </Button>
              </Grid>
              <Grid item>
                <Button disabled={backgroundLoading} onClick={handleClickEditProfile}>
                  Edit Profile
                </Button>
              </Grid>

              {access&&<Grid item>
                <Button disabled={backgroundLoading} onClick={()=>history.push('/special-access')}>
                  Special access
                </Button>
              </Grid>}
            </Grid>
          )}
        </ProfileBackgroundOverlay>
        {backgroundLoading || loading ? (
          <Skeleton variant="rectangular" animation="wave" sx={{ width: '100%', height: '100%' }} />
        ) : (
          <Fade in={!backgroundLoading}>
            <ProfileBackground src={profile?.background} draggable="false" />
          </Fade>
        )}
      </ProfileBackgroundContainer>
      <Container>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={3}>
            <Paper
              variant="outlined"
              sx={{ position: 'relative', top: { xs: -80, md: -160 }, zIndex: 2 }}
            >
              {loading ? (
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  height={490}
                  sx={{ borderRadius: '22px' }}
                />
              ) : (
                <Fade in={!loading}>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    padding={2}
                    spacing={2}
                  >
                    <Grid item xs={4} sm={5} md={9}>
                      <LargeAvatar src={profile?.avatar} draggable="false" />
                    </Grid>
                    <Grid item xs={8} sm={7} md>
                      <Typography textAlign="center" variant="h6">
                        {profile?.name || 'Guest Account'}
                      </Typography>
                      {profile?.address && (
                        <Grid container alignItems="center" justifyContent="center">
                          <Grid item>
                            <Typography
                              textAlign="center"
                              variant="body2"
                              color="text.secondary"
                              fontWeight={600}
                            >
                              {getShortAddress(profile?.address)}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <IconButton
                              sx={{ ml: 2, width: 10, height: 10 }}
                              size="small"
                              onClick={() => window.navigator.clipboard.writeText(user?.address)}
                            >
                              <SvgIcon fontSize="small">
                                <use xlinkHref="#icon-copy" />
                              </SvgIcon>
                            </IconButton>
                          </Grid>
                        </Grid>
                      )}
                      <Typography
                        textAlign="center"
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 2 }}
                      >
                        {profile?.bio || 'No bio has been set!'}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={12}>
                      <Grid container justifyContent="center">
                        {profile?.website && (
                          <Grid item>
                            <Link
                              rel="noreferrer"
                              href={handleNormalizeWebsite(profile?.website)}
                              target="_blank"
                              textAlign="center"
                              variant="body2"
                              alignItems="center"
                            >
                              <SvgIcon fontSize="small" sx={{ mr: 1 }}>
                                <use xlinkHref="#icon-globe" />
                              </SvgIcon>
                              {profile?.website?.replace('https://', '')?.replace('http://', '') ||
                                'No website has been set'}
                            </Link>
                          </Grid>
                        )}
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6} md={12}>
                      <Grid container justifyContent="center" spacing={2}>
                        {profile?.twitter && (
                          <Grid item>
                            <IconButton
                              href={`https://www.twitter.com/${profile?.twitter}/`}
                              rel="noreferrer"
                              target="_blank"
                            >
                              <SvgIcon>
                                <use xlinkHref="#icon-twitter" />
                              </SvgIcon>
                            </IconButton>
                          </Grid>
                        )}
                        {profile?.instagram && (
                          <Grid item>
                            <IconButton
                              href={`https://www.instagram.com/${profile?.instagram}/`}
                              rel="noreferrer"
                              target="_blank"
                            >
                              <SvgIcon>
                                <use xlinkHref="#icon-instagram" />
                              </SvgIcon>
                            </IconButton>
                          </Grid>
                        )}
                        {profile?.facebook && (
                          <Grid item>
                            <IconButton
                              href={`https://www.facebook.com/${profile?.facebook}/`}
                              rel="noreferrer"
                              target="_blank"
                            >
                              <SvgIcon>
                                <use xlinkHref="#icon-facebook" />
                              </SvgIcon>
                            </IconButton>
                          </Grid>
                        )}
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider sx={{ my: 1 }} />
                    </Grid>
                    <Grid item>
                      {profile?.createdAt ? (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          textAlign="center"
                          justifyContent="center"
                        >
                          Member since {new Date(profile?.createdAt).toUTCString()}
                        </Typography>
                      ) : (
                        <Button onClick={handleClickEditProfile}>Update Profile</Button>
                      )}
                    </Grid>
                  </Grid>
                </Fade>
              )}
            </Paper>
          </Grid>
          <Grid item xs={12} md={9}>
            <Box sx={{ minHeight: 1200 }}>
              <SelectionGrid
                options={['All', 'Purchased', 'On Sale']}
                onChange={handleChangeCategory}
                value={category}
              />
              {nftsLoading ? (
                <Grid container spacing={2} sx={{ mt: 4 }}>
                  <Grid item xs={12} sm={6} lg={4}>
                    <NftCardSkeleton />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={4}>
                    <NftCardSkeleton />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={4}>
                    <NftCardSkeleton />
                  </Grid>
                </Grid>
              ) : (
                <SwitchTransition>
                  {category === 'All' ? (
                    <Fade key="profile-nfts-all" unmountOnExit>
                      <Grid container spacing={2} sx={{ mt: 4 }}>
                        {nfts.map((item, index) => (
                          <Grid item xs={12} sm={6} lg={4} key={`profile-item-${index}`}>
                            <NftCard
                              name={item.name}
                              description={item.description}
                              image={item.image}
                              stock={item.stock}
                              price={item.price}
                              priceType={item.priceType}
                              category={item.categories?.[0]}
                              owner={item.owner}
                              isOwner={
                                user?.address
                                  ? item.owner.address.toLowerCase() ===
                                    user?.address?.toLowerCase()
                                  : false
                              }
                              disabled={downloadLoading}
                              status={item.status}
                              onClick={() => handleClickNFT(item)}
                              onClickDownload={() => handleClickNFTDownload(item)}
                              onClickPurchase={() => handleClickNFTPurchase(item)}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Fade>
                  ) : category === 'Purchased' ? (
                    <Fade key="profile-nfts-purchased" unmountOnExit>
                      <Grid container spacing={2} sx={{ mt: 4 }}>
                        {nfts
                          .filter((nft) => nft.status === 'purchased')
                          .map((item, index) => (
                            <Grid item xs={12} sm={6} lg={4} key={`profile-item-${index}`}>
                              <NftCard
                                name={item.name}
                                description={item.description}
                                image={item.image}
                                stock={item.stock}
                                price={item.price}
                                priceType={item.priceType}
                                category={item.categories?.[0]}
                                owner={item.owner}
                                isOwner={
                                  user?.address
                                    ? item.owner.address.toLowerCase() ===
                                      user?.address?.toLowerCase()
                                    : false
                                }
                                status={item.status}
                                onClick={() => handleClickNFT(item)}
                                onClickDownload={() => handleClickNFTDownload(item)}
                                onClickPurchase={() => handleClickNFTPurchase(item)}
                              />
                            </Grid>
                          ))}
                      </Grid>
                    </Fade>
                  ) : (
                    <Fade key="profile-nfts-sale" unmountOnExit>
                      <Grid container spacing={2} sx={{ mt: 4 }}>
                        {nfts
                          .filter((nft) => nft.status === 'on sale')
                          .map((item, index) => (
                            <Grid item xs={12} sm={6} lg={4} key={`profile-item-${index}`}>
                              <NftCard
                                name={item.name}
                                description={item.description}
                                image={item.image}
                                stock={item.stock}
                                price={item.price}
                                priceType={item.priceType}
                                category={item.categories?.[0]}
                                owner={item.owner}
                                isOwner={
                                  user?.address
                                    ? item.owner.address.toLowerCase() ===
                                      user?.address?.toLowerCase()
                                    : false
                                }
                                status={item.status}
                                onClick={() => handleClickNFT(item)}
                                onClickDownload={() => handleClickNFTDownload(item)}
                                onClickPurchase={() => handleClickNFTPurchase(item)}
                              />
                            </Grid>
                          ))}
                      </Grid>
                    </Fade>
                  )}
                </SwitchTransition>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
      <UploadPopup
        open={backgroundPopup}
        onClose={handleClickOffBackgroundPopup}
        onClickSubmit={handleClickSubmitBackground}
        maxSize={100}
      />
    </Box>
  )
}

export default Profile
