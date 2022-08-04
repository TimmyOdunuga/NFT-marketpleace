import React, {useLayoutEffect, useState} from 'react'
import { useHistory, Redirect } from 'react-router'

import upload1Img from '../assets/content/upload-pic-1.jpg'
import upload1ImgSet from '../assets/content/upload-pic-1@2x.jpg'
import upload2Img from '../assets/content/upload-pic-2.jpg'
import upload2ImgSet from '../assets/content/upload-pic-2@2x.jpg'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import SvgIcon from '@mui/material/SvgIcon'

import styled from '@mui/material/styles/styled'

import { getOwner } from '../util/Metamask'
import useStore from '../util/Store'



const SelectionBox = styled('div')(({ theme }) => ({
  border: `1px solid ${theme.palette.text.disabled}`,
  transition: 'box-shadow 0.2s',
  borderRadius: 16,
  padding: '16px 16px 24px',
  ':hover': {
    boxShadow: '0px 40px 32px -24px rgba(15, 15, 15, 0.12)',
  },
}))

const RoundedImg = styled('img')(({ theme }) => ({
  borderRadius: 8,
  marginBottom: 24,
}))



const Upload=()=>{
  const [owner, setOwner] = useState(null)

  const getOwnerAddress=()=>{
    getOwner().then(re=>{
      setOwner(re)
    }).catch(err=>{
      console.log(err)
    })
  }

  useLayoutEffect(()=>{
    getOwnerAddress()
    console.log(owner)
  })

  return owner===null?(<div>Loading</div>)
  :(<UploadPage owner={owner}/>)
}



const UploadPage = ({owner}) => {
  const history = useHistory();
  const [user] = useStore('user')


  const handleNavHome = (e) => {
    e.preventDefault()
    history.push('/')
  }

  const handleNavUploadSingle = (e) => {
    e.preventDefault()
    history.push('/upload-single')
    window.scrollTo(0, 0)
  }

  const handleNavUploadMultiple = (e) => {
    e.preventDefault()
    history.push('/upload-multiple')
    window.scrollTo(0, 0)
  }

  //only owner can visit route 
  // if(user?.address === owner && user?.address!== null && owner!== null )
  if(user?.address !== owner) return <Redirect to='/'/>

  return (
    <div>
      <Container sx={{ mt: 3 }}>
        <Grid container justifyContent="space-between" alignItems="center" sx={{ my: 3 }}>
          <Grid item>
            <Button
              variant="outlined"
              startIcon={
                <SvgIcon fontSize="small" sx={{ p: '4px' }}>
                  <use xlinkHref="#icon-arrow-prev" />
                </SvgIcon>
              }
              onClick={handleNavHome}
            >
              Back to home
            </Button>
          </Grid>
          <Grid item>
            <Grid container alignItems="center" spacing={3}>
              <Grid item sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Link variant="body1" fontWeight={600} href="/" onClick={handleNavHome}>
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
                  Upload Item
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Divider />
      <Container sx={{ mt: 8, mb: 3 }}>
        <Grid container direction="column" alignItems="center" justifyContent="center" spacing={2}>
          <Grid item>
            <Typography variant="h3" textAlign="center">
              Upload item
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" textAlign="center">
              Choose{' '}
              <Typography display="inline" fontWeight={600}>
                “Single”
              </Typography>{' '}
              if you want your collectible to be one of a kind or{' '}
              <Typography display="inline" fontWeight={600}>
                “Multiple”
              </Typography>{' '}
              if you want to sell one collectible multiple times
            </Typography>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <SelectionBox>
              <RoundedImg srcSet={upload1ImgSet + ' 2x'} src={upload1Img} alt="create-single" />
              <Grid container justifyContent="center">
                <Grid item>
                  <Button variant="outlined" size="large" onClick={handleNavUploadSingle}>
                    Create Single
                  </Button>
                </Grid>
              </Grid>
            </SelectionBox>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SelectionBox>
              <RoundedImg srcSet={upload2ImgSet + ' 2x'} src={upload2Img} alt="create-single" />
              <Grid container justifyContent="center">
                <Grid item>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={handleNavUploadMultiple}
                    disabled
                  >
                    Create Multiple
                  </Button>
                </Grid>
              </Grid>
            </SelectionBox>
          </Grid>
        </Grid>
      </Container>
      <Container>
        <Grid container justifyContent="center">
          <Grid item>
            <Typography variant="caption" color="text.secondary">
              We do not own your private keys and cannot access your funds without your
              confirmation.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Upload
