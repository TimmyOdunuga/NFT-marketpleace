import React from 'react'
import { useHistory } from 'react-router-dom'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Container from '@mui/material/Container'
import Fab from '@mui/material/Fab'
import SvgIcon from '@mui/material/SvgIcon'

import logoLight from '../../assets/logo-dark.png'

const Footer = () => {
  const history = useHistory()

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

  const handleNavFAQ = (e) => {
    e.preventDefault()
    history.push('/faq')
    window.scrollTo(0, 0)
  }

  return (
    <Box sx={{ width: '100%', position: 'relative', alignSelf: 'end' }}>
      <Divider />
      <Container sx={{ mt: 6, mb: 1 }}>
        <Grid container spacing={6} padding={2} justifyContent="space-between">
          <Grid item maxWidth={400}>
            <img src={logoLight} alt="logo" style={{ height: 40, width: 'auto' }} />
            <Typography variant="h5" fontWeight={500} sx={{ mt: 3 }}>
              Powered by FlashLabs
            </Typography>
          </Grid>
          
          
          <Grid item maxWidth={400}>
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
              Learn more about FlashLabs
            </Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
              Enter your email to get connect with FlashLabs.
            </Typography>
            <Grid container spacing={1} alignItems="center">
              <Grid item flexGrow={1}>
                <TextField
                  placeholder="Enter your email"
                  variant="outlined"
                  name="newsletter"
                  fullWidth
                />
              </Grid>
              <Grid item>
                <Fab size="small" color="primary">
                  <SvgIcon fontSize="small" sx={{ p: '2px' }}>
                    <use xlinkHref="#icon-arrow-next" />
                  </SvgIcon>
                </Fab>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4 }} />
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography variant="caption" color="text.secondary">
              Copyright © 2021 Flash Labs LLC. All rights reserved
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="caption" color="text.secondary">
              We use cookies for better service.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Footer
