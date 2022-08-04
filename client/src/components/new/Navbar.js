import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react'
import { useHistory } from 'react-router-dom'

import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import styled from '@mui/material/styles/styled'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import SvgIcon from '@mui/material/SvgIcon'

import ethImg from '../../assets/content/etherium-circle.jpg'
import logoLight from '../../assets/logo-dark.png'
import logoLightMini from '../../assets/logo-dark-mini.png'
import BarrelRiot_Words from '../../assets/BarrelRiot_Words.png'
import singleBarrel from '../../assets/single-barrel.png'

import useStore from '../../util/Store'
import { getOwner } from '../../util/Metamask'
import { getShortAddress, getShortNumString } from '../../util/Func'
import { getETHPrice } from '../../util/Api'
import useIsMounted from 'react-is-mounted-hook'

const NavbarBox = styled('div')(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.text.disabled}`,
  userSelect: 'none',
  height: '110px',
  [theme.breakpoints.down('sm')]: {
    height: 'auto',
  },
}))

const LogoImg = styled('img')(({ theme }) => ({
  height: 40,
  cursor: 'pointer',
}))

const ProfileButton = styled('div')(({ theme }) => ({
  border: `2px solid ${theme.palette.text.disabled}`,
  borderRadius: 40,
  userSelect: 'none',
  cursor: 'pointer',
  height: '100%',
  padding: 2,
}))

const NavMenuItem = styled(MenuItem, { shouldForwardProp: (prop) => prop !== 'last' })(
  ({ theme, last }) => ({
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    transition: '0.2s all',
    fontSize: 14,
    fontWeight: 600,
    color: theme.palette.text.secondary,
    marginTop: 10,
    paddingBottom: 16,
    ...(!last && {
      borderBottom: `1px solid ${theme.palette.text.disabled}`,
    }),
    ':hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.0)',
      color: theme.palette.primary.main,
    },
  })
)

const Navbar = () => {
  const history = useHistory()
  const isMounted = useIsMounted()
  const [menuAnchorEl, setMenuAnchorEl] = useState(null)
  const [ethPrice, setEthPrice] = useState(null)
  const [user] = useStore('user')
  const [owner, setOwner] = useState(null)

  const handleOpenAccountPopup = (e) => {
    setMenuAnchorEl(e.currentTarget)
  }

  const handleCloseAccountPopup = () => {
    setMenuAnchorEl(null)
  }

  const handleNavProfile = (e) => {
    e.preventDefault()
    history.push(`/profile/${user?.address || ''}`)
    window.scrollTo(0, 0)
    setMenuAnchorEl(null)
  }

  const handleNavConnect = (e) => {
    e.preventDefault()
    history.push('/connect')
    window.scrollTo(0, 0)
    setMenuAnchorEl(null)
  }

  const handleNavDiscover = (e) => {
    e.preventDefault()
    history.push('/discover')
    window.scrollTo(0, 0)
    setMenuAnchorEl(null)
  }

  const handleNavUpload = (e) => {
    e.preventDefault()
    history.push('/upload')
    window.scrollTo(0, 0)
    setMenuAnchorEl(null)
  }

  const handleNavHome = (e) => {
    e.preventDefault()
    history.push('/')
    window.scrollTo(0, 0)
    setMenuAnchorEl(null)
  }

  const populateEthPrice = useCallback(async () => {
    try {
      const data = await getETHPrice('usd')
      if (!isMounted()) return
      setEthPrice(data.price)
    } catch (err) {
      console.error(err)
    }
  }, [isMounted])

  const getOwnerAddress=()=>{
    getOwner().then(re=>{
      setOwner(re)
    }).catch(err=>{
      console.log(err)
    })
  }
  useLayoutEffect(()=>{
    getOwnerAddress()
  })
  useEffect(() => {
    populateEthPrice()
  }, [populateEthPrice])

  return (
    <NavbarBox>
      <Container>
        <Grid
          container
          padding={{ xs: 1, sm: 2 }}
          spacing={{ xs: 1, sm: 4 }}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <LogoImg src={BarrelRiot_Words} alt="logo" draggable={false} onClick={handleNavHome} />
          </Grid>
          <Grid item sx={{ display: { xs: 'flex', sm: 'none' } }}>
            <LogoImg src={singleBarrel} alt="logo" draggable={false} onClick={handleNavHome} />
          </Grid>
          <Grid item sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Divider orientation="vertical" sx={{ height: 40 }} />
          </Grid>
          {/* <Grid item sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Link href="/discover" onClick={handleNavDiscover}>
              Discover
            </Link>
          </Grid>
          <Grid item sx={{ display: { xs: 'none', lg: 'flex' } }}>
            <Link href="/" onClick={handleNavHome}>
              How it works
            </Link>
          </Grid> */}
          {user?.address && (
            <Grid item sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Link href={`/profile/${user?.address || ''}`} onClick={handleNavProfile}>
                My profile
              </Link>
            </Grid>
          )}
          <Grid item flexGrow={1} sx={{ display: { xs: 'none', md: 'flex' } }}></Grid>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item sx={{ display: { xs: 'none', sm: 'flex' } }}>
                {(user?.address === owner && user?.address!== null && owner!== null )&&(
                  <Button href="/upload" onClick={handleNavUpload}>
                    Create NFT
                  </Button>
                )}
              </Grid>
              <Grid item>
                {!user?.address ? (
                  <Button variant="outlined" onClick={handleNavConnect} sx={{ ml: 2 }}>
                    Connect Wallet
                  </Button>
                ) : (
                  <ProfileButton onClick={handleOpenAccountPopup}>
                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                      <Grid item>
                        <Avatar src={user?.avatar} sx={{ height: 35, width: 35 }} />
                      </Grid>
                      <Grid item sx={{ pr: 2 }}>
                        <Typography
                          variant="subtitle2"
                          fontWeight={600}
                          display="inline"
                          textAlign="center"
                        >
                          {Math.round(user?.balance * 10000) / 10000}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          color="secondary"
                          display="inline"
                          textAlign="center"
                        >
                          {' '}
                          BNB
                        </Typography>
                      </Grid>
                    </Grid>
                  </ProfileButton>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Menu
        id="account-menu"
        anchorEl={menuAnchorEl}
        open={!!menuAnchorEl}
        onClose={handleCloseAccountPopup}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: '50%',
              width: 20,
              height: 20,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
      >
        <Grid container padding={2} alignItems="center" maxWidth={250}>
          <Grid item xs={12}>
            <Typography variant="h5">{user?.name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary" display="inline">
              {getShortAddress(user?.address)}
            </Typography>
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
          <Grid item xs={12}>
            <Paper
              variant="plain"
              sx={{
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                my: 2,
              }}
            >
              <Grid container padding={1} alignItems="center">
                <Grid item>
                  <Avatar src={ethImg} sx={{ mr: 2 }} />
                </Grid>
                <Grid item>
                  <Typography variant="body2" color="text.secondary">
                    BNB Balance
                  </Typography>
                  <Typography variant="subtitle2" color="text.primary">
                    {Math.round(user?.balance * 10000) / 10000}
                  </Typography>
                  {ethPrice && (
                    <Typography variant="body2" color="text.secondary">
                      {getShortNumString(user?.balance * ethPrice)} USD
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          {/* <Grid item xs={12}>
            <NavMenuItem sx={{ display: { sm: 'none' } }} onClick={handleNavHome}>
              <ListItemIcon>
                <SvgIcon fontSize="small">
                  <use xlinkHref="#icon-home" />
                </SvgIcon>
              </ListItemIcon>
              Home
            </NavMenuItem>
          </Grid> */}
          {user?.address === owner && <Grid item xs={12}>
            <NavMenuItem sx={{ display: { sm: 'none' } }} onClick={handleNavUpload}>
              <ListItemIcon>
                <SvgIcon fontSize="small">
                  <use xlinkHref="#icon-upload-file" />
                </SvgIcon>
              </ListItemIcon>
              Upload
            </NavMenuItem>
          </Grid>}
          <Grid item xs={12}>
            <NavMenuItem onClick={handleNavDiscover}>
              <ListItemIcon>
                <SvgIcon fontSize="small">
                  <use xlinkHref="#icon-globe" />
                </SvgIcon>
              </ListItemIcon>
              Listings
            </NavMenuItem>
          </Grid>
          <Grid item xs={12}>
            <NavMenuItem last onClick={handleNavProfile}>
              <ListItemIcon>
                <SvgIcon fontSize="small">
                  <use xlinkHref="#icon-candlesticks-up" />
                </SvgIcon>
              </ListItemIcon>
              My Profile
            </NavMenuItem>
          </Grid>
        </Grid>
      </Menu>
    </NavbarBox>
  )
}

export default Navbar
