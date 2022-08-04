import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import useIsMounted from 'react-is-mounted-hook'

import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import SvgIcon from '@mui/material/SvgIcon'
import Link from '@mui/material/Link'
import CircularProgress from '@mui/material/CircularProgress'

import styled from '@mui/material/styles/styled'

import defaultBackgroundImg from '../assets/default/background.jpg'

import UploadPopup from '../components/new/popups/UploadPopup'

import { ensureLogin } from '../util/Metamask'
import { editUser } from '../util/Api'
import useStore from '../util/Store'

const BackgroundImg = styled('img')(({ theme }) => ({
  width: '100%',
  height: 200,
  objectFit: 'cover',
  borderRadius: 24,
  border: `2px solid ${theme.palette.text.disabled}`,
}))

const EditProfile = () => {
  const isMounted = useIsMounted()
  const history = useHistory()
  const [user, setUser] = useStore('user')
  const [loading, setLoading] = useState(false)
  const [avatarPopup, setAvatarPopup] = useState(false)
  const [backgroundPopup, setBackgroundPopup] = useState(false)
  const [avatar, setAvatar] = useState(user.avatar)
  const [background, setBackground] = useState(user.background)
  const [name, setName] = useState(user.name || '')
  const [email, setEmail] = useState(user.email || '')
  const [bio, setBio] = useState(user.bio || '')
  const [website, setWebsite] = useState(user.website || '')
  const [twitter, setTwitter] = useState(user.twitter || '')
  const [instagram, setInstagram] = useState(user.instagram || '')
  const [facebook, setFacebook] = useState(user.facebook || '')

  const handleChangeName = (e) => {
    setName(e.target.value)
  }

  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
  }

  const handleChangeBio = (e) => {
    setBio(e.target.value)
  }

  const handleChangeWebsite = (e) => {
    setWebsite(e.target.value)
  }

  const handleChangeTwitter = (e) => {
    setTwitter(e.target.value)
  }

  const handleChangeInstagram = (e) => {
    setInstagram(e.target.value)
  }

  const handleChangeFacebook = (e) => {
    setFacebook(e.target.value)
  }

  const handleClickUploadBackground = () => {
    setBackgroundPopup(true)
  }

  const handleClickOffBackgroundPopup = () => {
    setBackgroundPopup(false)
  }

  const handleClickSubmitBackground = ({ base64, name, size }) => {
    setBackground(base64)
    setBackgroundPopup(false)
  }

  const handleClickUploadAvatar = () => {
    setAvatarPopup(true)
  }

  const handleClickOffAvatarPopup = () => {
    setAvatarPopup(false)
  }

  const handleClickSubmitAvatar = ({ base64, name, size }) => {
    setAvatar(base64)
    setAvatarPopup(false)
  }

  const handleSaveProfile = async () => {
    try {
      setLoading(true)
      await ensureLogin()
      const { user: userInfo } = await editUser({
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
      setUser({
        ...user,
        ...userInfo,
      })
      history.push(`/profile/${user?.address}`)
    } catch (err) {
      console.error(err)
    } finally {
      if (!isMounted()) return
      setLoading(false)
    }
  }

  const handleClickBack = (e) => {
    e.preventDefault()
    history.push(`/profile/${user?.address}`)
  }

  const handleClickClearAll = (e) => {
    e.preventDefault()
    setName('')
    setEmail('')
    setBio('')
    setWebsite('')
    setTwitter('')
    setInstagram('')
    setFacebook('')
  }

  useEffect(() => {
    if (!user?.address) {
      history.push('/')
    }
  }, [user, history])

  return (
    <div>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ px: 4, pt: 3 }}>
        <Grid item>
          <Button
            variant="outlined"
            startIcon={
              <SvgIcon fontSize="small" sx={{ p: '4px' }}>
                <use xlinkHref="#icon-arrow-prev" />
              </SvgIcon>
            }
            onClick={handleClickBack}
          >
            Back to profile
          </Button>
        </Grid>

        <Grid item>
          <Grid container alignItems="center" spacing={3}>
            <Grid item sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Link variant="body1" fontWeight={600} href="/">
                Home
              </Link>
            </Grid>
            <Grid item sx={{ display: { xs: 'none', sm: 'block' } }}>
              <SvgIcon sx={{ color: 'text.secondary', p: '4px' }}>
                <use xlinkHref="#icon-arrow-next" />
              </SvgIcon>
            </Grid>
            <Grid item>
              <Typography variant="body1" fontWeight={600}>
                Edit Profile
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider sx={{ my: 3 }} />
      <Container sx={{ my: 8 }}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Edit profile
        </Typography>
        <Typography variant="body1" color="text.secondary">
          You can set preferred display name, create{' '}
          <Typography display="inline" fontWeight={500} color="text.primary">
            Flash Labs NFT
          </Typography>{' '}
          and manage other personal settings.
        </Typography>
        <Grid container sx={{ mt: 8 }} spacing={4}>
          <Grid item xs={12} md={6}>
            <Grid container spacing={4}>
              <Grid item xs={4}>
                <Avatar src={avatar || null} sx={{ width: '100%', height: 'auto' }} />
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1" fontWeight={500}>
                  Profile Photo
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  We recommend an image of at least 400x400 px
                </Typography>
                <Button
                  sx={{ mt: 2 }}
                  variant="outlined"
                  startIcon={
                    <SvgIcon>
                      <use xlinkHref="#icon-upload-file" />
                    </SvgIcon>
                  }
                  onClick={handleClickUploadAvatar}
                  disabled={loading}
                >
                  Upload
                </Button>
              </Grid>
            </Grid>
            <BackgroundImg src={background || defaultBackgroundImg} sx={{ my: 4 }} />
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="body1" fontWeight={500}>
                  Background profile photo
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  We recommend an image of at least 800x400 px
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  sx={{ mt: 2 }}
                  variant="outlined"
                  startIcon={
                    <SvgIcon>
                      <use xlinkHref="#icon-upload-file" />
                    </SvgIcon>
                  }
                  onClick={handleClickUploadBackground}
                  disabled={loading}
                >
                  Upload
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" fontWeight={500}>
              Profile info
            </Typography>
            <Typography
              variant="body2"
              fontWeight={600}
              textTransform="uppercase"
              color="text.accent"
              sx={{ mt: 4, mb: 1 }}
            >
              Display Name
            </Typography>
            <TextField
              name="name"
              placeholder="Enter your display name"
              autoComplete="name"
              required
              value={name}
              onChange={handleChangeName}
              fullWidth
              disabled={loading}
            />
            <Typography
              variant="body2"
              fontWeight={600}
              textTransform="uppercase"
              color="text.accent"
              sx={{ mt: 4, mb: 1 }}
            >
              Email
            </Typography>
            <TextField
              name="email"
              placeholder="Enter your email"
              autoComplete="email"
              required
              value={email}
              onChange={handleChangeEmail}
              fullWidth
              disabled={loading}
            />
            <Typography
              variant="body2"
              fontWeight={600}
              textTransform="uppercase"
              color="text.accent"
              sx={{ mt: 4, mb: 1 }}
            >
              Bio
            </Typography>
            <TextField
              name="bio"
              placeholder="About yourself in a few words"
              autoComplete="bio"
              multiline
              minRows={3}
              fullWidth
              disabled={loading}
              required
              value={bio}
              onChange={handleChangeBio}
            />
            <Typography variant="body1" fontWeight={500} sx={{ my: 4 }}>
              Social
            </Typography>
            <Typography
              variant="body2"
              fontWeight={600}
              textTransform="uppercase"
              color="text.accent"
              sx={{ mt: 4, mb: 1 }}
            >
              Portfolio or website
            </Typography>
            <TextField
              name="portfolio"
              placeholder="Enter URL"
              autoComplete="website"
              value={website}
              onChange={handleChangeWebsite}
              fullWidth
              disabled={loading}
            />
            <Typography
              variant="body2"
              fontWeight={600}
              textTransform="uppercase"
              color="text.accent"
              sx={{ mt: 4, mb: 1 }}
            >
              Twitter
            </Typography>
            <TextField
              name="twitter"
              placeholder="@twitter username"
              autoComplete="twitter"
              value={twitter}
              onChange={handleChangeTwitter}
              fullWidth
              disabled={loading}
            />
            <Typography
              variant="body2"
              fontWeight={600}
              textTransform="uppercase"
              color="text.accent"
              sx={{ mt: 4, mb: 1 }}
            >
              Instagram
            </Typography>
            <TextField
              name="instagram"
              placeholder="instagram username"
              autoComplete="instagram"
              value={instagram}
              onChange={handleChangeInstagram}
              fullWidth
              disabled={loading}
            />
            <Typography
              variant="body2"
              fontWeight={600}
              textTransform="uppercase"
              color="text.accent"
              sx={{ mt: 4, mb: 1 }}
            >
              Facebook
            </Typography>
            <TextField
              name="facebook"
              placeholder="facebook username"
              autoComplete="facebook"
              value={facebook}
              onChange={handleChangeFacebook}
              fullWidth
              disabled={loading}
            />
            <Typography variant="body1" fontWeight={500} color="text.accent" sx={{ mt: 4, mb: 1 }}>
              Address:
              <br />
              To update your settings you should sign message through your wallet. Click 'Update
              profile' then sign the message
            </Typography>
            <Divider sx={{ my: 4 }} />
            <Grid container spacing={4} alignItems="center">
              <Grid item>
                <Button onClick={handleSaveProfile} disabled={loading} size="large">
                  Update Profile
                </Button>
              </Grid>
              <Grid item>
                <Button
                  size="large"
                  variant="outlined"
                  startIcon={
                    <SvgIcon>
                      <use xlinkHref="#icon-circle-close" />
                    </SvgIcon>
                  }
                  onClick={handleClickClearAll}
                  disabled={loading}
                >
                  Clear all
                </Button>
              </Grid>
              {loading && (
                <Grid item>
                  <CircularProgress size={30} />
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <UploadPopup
        open={backgroundPopup}
        onClose={handleClickOffBackgroundPopup}
        onClickSubmit={handleClickSubmitBackground}
        maxSize={100}
      />
      <UploadPopup
        open={avatarPopup}
        onClose={handleClickOffAvatarPopup}
        onClickSubmit={handleClickSubmitAvatar}
        maxSize={100}
      />
    </div>
  )
}

export default EditProfile
