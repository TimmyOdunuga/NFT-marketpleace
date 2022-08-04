import React, { useState } from 'react'
import { useHistory } from 'react-router'

import qrCode from '../assets/content/qr-code.png'

import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Alert from '@mui/material/Alert'
import Collapse from '@mui/material/Collapse'
import Paper from '@mui/material/Paper'
import SvgIcon from '@mui/material/SvgIcon'

import styled from '@mui/material/styles/styled'

import { connectMetamask, getMetamaskAccount } from '../util/Metamask'

import useStore from '../util/Store'

const HeaderBox = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  userSelect: 'none',
  '& svg': {
    transition: '0.2s all',
    position: 'relative',
    right: 0,
  },
  ':hover': {
    '& svg': {
      position: 'relative',
      right: 6,
    },
  },
}))

const WalletBox = styled('div', { shouldForwardProp: (prop) => prop !== 'selected' })(
  ({ selected, theme }) => ({
    cursor: 'pointer',
    userSelect: 'none',
    display: 'flex',
    border: selected ? `2px solid ${theme.palette.text.disabled}` : '2px solid rgba(0, 0, 0, 0.0)',
    borderRadius: 12,
  })
)

const HoverArrowRight = styled(SvgIcon, { shouldForwardProp: (prop) => prop !== 'hidden' })(
  ({ hidden, theme }) => ({
    opacity: 1,
    transition: '0.2s all',
    padding: 2,
    ...(hidden && {
      opacity: 0,
    }),
  })
)

const WalletAvatar = styled(Avatar, {
  shouldForwardProp: (prop) => !['selected', 'color'].includes(prop),
})(({ selected, color, theme }) => ({
  height: 60,
  width: 60,
  backgroundColor: color,
  transition: '0.2s all',
  border: `3px solid ${color}`,
  ...(selected && {
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
  }),
}))

const WalletSelect = ({ color, title, selected, onClick, sx, ...props }) => {
  const [hovering, setHovering] = useState(false)

  const handleOnHover = () => {
    setHovering(true)
  }

  const handleOffHover = () => {
    setHovering(false)
  }

  const handleClick = (e) => {
    onClick(e)
  }

  return (
    <WalletBox
      selected={selected}
      onMouseOver={handleOnHover}
      onMouseLeave={handleOffHover}
      onClick={handleClick}
      sx={{ ...sx }}
      {...props}
    >
      <Grid container padding={{ xs: 2, sm: 4 }} spacing={{ xs: 2, sm: 4 }} alignItems="center">
        <Grid item>
          <WalletAvatar selected={selected} color={color}>
            <SvgIcon htmlColor={selected ? color : null}>
              {selected ? <use xlinkHref="#icon-check" /> : <use xlinkHref="#icon-wallet" />}
            </SvgIcon>
          </WalletAvatar>
        </Grid>
        <Grid item flexGrow={1}>
          <Typography variant="h5">{title}</Typography>
        </Grid>
        <Grid item>
          <HoverArrowRight hidden={!selected && !hovering}>
            <use xlinkHref="#icon-arrow-next" />
          </HoverArrowRight>
        </Grid>
      </Grid>
    </WalletBox>
  )
}

WalletSelect.defaultProps = {
  color: '',
  title: '',
  selected: false,
  onClick: () => {},
  sx: {},
}

const DefaultOption = () => {
  return (
    <Box>
      <Typography variant="h3">Scan to connect</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        Powered by FlashLabs.Wallet
      </Typography>
      <Paper sx={{ mt: 8, bgcolor: 'text.disabled' }} elevation={0}>
        <Grid container justifyContent="center" alignItems="center" sx={{ aspectRatio: '1 / 1' }}>
          <Grid item>
            <Paper variant="outlined" sx={{ p: 4 }}>
              <img src={qrCode} alt="qr-code" />
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}

const MetamaskOption = ({
  connected,
  error,
  onClickConnect,
  onCloseError,
  onClickDontHave,
  onClickProfile,
}) => {
  const handleClickConnect = (e) => {
    e.preventDefault()
    onClickConnect(e)
  }

  const handleCloseError = (e) => {
    e.preventDefault()
    onCloseError(e)
  }

  const handleClickDontHave = (e) => {
    e.preventDefault()
    onClickDontHave(e)
  }

  const handleClickProfile = (e) => {
    e.preventDefault()
    onClickProfile(e)
  }

  return (
    <Box>
      <Collapse in={!!error} unmountOnExit>
        <Alert severity="error" onClose={handleCloseError} sx={{ my: 2 }}>
          {error}
        </Alert>
      </Collapse>
      <Typography variant="h3">Connect with Metamask</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        Powered by FlashLabs.Wallet
      </Typography>
      {connected ? (
        <Grid container spacing={2}>
          <Grid item>
            <Button size="large" href="/profile" onClick={handleClickProfile}>
              Go to profile
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2}>
          <Grid item>
            <Button size="large" href="#metamask" onClick={handleClickConnect}>
              Connect
            </Button>
          </Grid>
          <Grid item>
            <Button
              size="large"
              variant="outlined"
              href="#no-metamask"
              onClick={handleClickDontHave}
            >
              Don't have Metamask?
            </Button>
          </Grid>
        </Grid>
      )}
    </Box>
  )
}

MetamaskOption.defaultProps = {
  connected: false,
  error: '',
  onClickConnect: () => {},
  onCloseError: () => {},
  onClickDontHave: () => {},
  onClickProfile: () => {},
}

const Connect = () => {
  const history = useHistory()
  const [selected, setSelected] = useState('')
  const [error, setError] = useState('')
  const [user] = useStore('user')

  const handleNavHome = (e) => {
    e.preventDefault()
    history.push('/')
  }

  const handleToggleCoinbase = (e) => {
    e.preventDefault()
    setSelected('coinbase')
  }

  const handleToggleEther = (e) => {
    e.preventDefault()
    setSelected('ether')
  }

  const handleToggleConnect = (e) => {
    e.preventDefault()
    setSelected('connect')
  }

  const handleToggleMetamask = (e) => {
    e.preventDefault()
    setSelected('metamask')
  }

  const handleConnectMetamask = async () => {
    try {
      await connectMetamask()
      const { address } = await getMetamaskAccount()
      history.push(`/profile/${address}`)
    } catch (err) {
      setError(err?.response?.data || err.message)
      console.error(err)
    }
  }

  const handleCloseError = () => {
    setError('')
  }

  return (
    <div>
      <Container sx={{ mt: 8 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <HeaderBox onClick={handleNavHome}>
              <SvgIcon fontSize="small" sx={{ mr: 2 }}>
                <use xlinkHref="#icon-arrow-prev" />
              </SvgIcon>
              <Typography variant="h3">Connect your Wallet</Typography>
            </HeaderBox>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Grid>
      </Container>
      <Container sx={{ mt: 8 }}>
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={12} md={5}>
            <WalletSelect
              color="#fa8211"
              title="Metamask"
              onClick={handleToggleMetamask}
              selected={selected === 'metamask' || selected === 'ready-metamask'}
            />
            <WalletSelect
              color="#3772ff"
              title="Coinbase Wallet"
              onClick={handleToggleCoinbase}
              selected={selected === 'coinbase' || selected === 'ready-coinbase'}
            />
            <WalletSelect
              color="#45b26b"
              title="MyEtherWallet"
              onClick={handleToggleEther}
              selected={selected === 'ether' || selected === 'ready-ether'}
            />
            <WalletSelect
              color="#ef466f"
              title="Wallet Connect"
              onClick={handleToggleConnect}
              selected={selected === 'connect' || selected === 'ready-connect'}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            {(selected === 'metamask' || selected === 'ready-metamsk') && (
              <MetamaskOption
                connected={user?.address}
                error={error}
                onClickConnect={handleConnectMetamask}
                onCloseError={handleCloseError}
              />
            )}
            {(selected === 'coinbase' || selected === 'ready-coinbase') && <DefaultOption />}
            {(selected === 'ether' || selected === 'ready-ether') && <DefaultOption />}
            {(selected === 'connect' || selected === 'ready-connect') && <DefaultOption />}
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Connect
