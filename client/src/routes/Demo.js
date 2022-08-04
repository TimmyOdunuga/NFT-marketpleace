import React, { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import Slider from 'react-slick'
import useIsMounted from 'react-is-mounted-hook'
import styled from 'styled-components';

import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import Avatar from '@mui/material/Avatar'
import Alert from '@mui/material/Alert'
import Collapse from '@mui/material/Collapse'
import Divider from '@mui/material/Divider'
import SvgIcon from '@mui/material/SvgIcon'
import patrick from '../assets/content/patrick.png'
import { TextField } from '@mui/material';

import { getFlCard } from '../util/Api'
import MultipleSelect from '../components/new/MultipleSelect'
import { sendCurrencyToServer, getMetamaskAccount, ensureLogin } from '../util/Metamask'
import { downloadURI, convertToUSD } from '../util/Func'
import useStore from '../util/Store'

const URL = "https://flashlabs-nft-staging.sevcik.io/card"


const LargeAvatar = styled(Avatar)(({ theme }) => ({
  objectFit: 'cover',
  width: '100%',
  height: 'auto',
  aspectRatio: '1 / 1',
}))

const Demo = () => {
  const isMounted = useIsMounted()
  const history = useHistory()
  const [user, setUser] = useStore('user')
  const [address, setAddress] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('') 
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [purpose, setPurpose] = useState('')


  const getAddress = async () => {
    const {address} = await getMetamaskAccount()
    if (address) {
      setAddress(address);
      return address;
    }
    return 'Please login to MetaMask';
  }
  const inputDetails=[
    {name:'name', label:'Name', value:name, setValue:setName},
    {name:'email', label:'Email', value:email, setValue:setEmail},
    {name:'purpose', label:'Purpose', value:purpose, setValue:setPurpose},
  ]

  useEffect(async () => {
    console.log(await getAddress())

  }, [])

  const getFreeNFT = useCallback(async() => {
    setMessage("Getting you a free NFT")
    await ensureLogin()
    const res = await getFlCard({name, email, purpose})
    setMessage(res.msg)
  }, [name, email, purpose])

  return (
    <Container>
      <Grid container spacing={4} sx={{ mt: 2 }} minHeight='80vh'>
        <Grid item xs={12} md={4}>
          <Paper
            variant="outlined"
            sx={{backgroundColor:'',borderRadius:"18px",position: 'relative', top: { xs: 0, md: 0 }, zIndex: 2 }}
          >
            <Fade in={true}>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                padding={0.6}
              >
                <Grid padding={2} container sx={{backgroundColor:'#132330', borderRadius:'15px 15px 0px 0px'}} alignItems="center">

                  <Grid item xs={4} sm={5} md={1.8} >
                    <LargeAvatar src={patrick} draggable="false" />
                  </Grid>
                  <Grid item sx={{padding:'0px 15px'}}>
                    <Grid item xs={8} sm={7} md>
                      <Typography
                        textAlign="left"
                        variant="h6"
                        color="text.secondary"
                        sx={{ mt: 0 }}
                      >
                        {'Patrick Deegan'}
                      </Typography>
                    </Grid>

                    <Grid item xs={8} sm={7} md>
                      <Typography
                        textAlign="left"
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0 }}
                      >
                        {"CTO at Flash Labs"}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item minHeight='200px'>
                  <Typography
                    textAlign="left"
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0 }}
                  >
                    .
                  </Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                </Grid>
                <Grid item>
                  <Typography
                      variant="body2"
                      color="text.secondary"
                      textAlign="center"
                      justifyContent="center"
                    >
                      Member since 
                    </Typography>
                </Grid>
              </Grid>
            </Fade>
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box sx={{ minHeight: 120 }}>
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
                    variant="subtitle2"
                    textAlign="left"
                    color="text.primary"
                  >
                    Your wallet address is: {address}
                  </Typography>
                </Grid>
                <Grid
                  container
                  padding={2}
                  direction="column"
                  height="100%"
                >
                  {inputDetails.map((input,i)=>{
                    return (
                      <Grid key={i} item>
                        <TextField
                          label={input.label}
                          name={input.name}
                          value={input.value}
                          onChange={(e)=>{
                            input.setValue(e.target.value)
                          }}
                          variant="outlined"
                          margin="normal"
                          style={{height:'45px',}}
                          fullWidth
                          // InputProps={{
                          //   style: {
                          //     height: '45px',
                          //     padding: '0px 10px',
                          //     borderRadius: '5px',
                          //     border: '1px solid #132330',
                          //     backgroundColor: '#132330',
                          //     color: '#fff',
                          //     fontSize: '14px',
                          //     fontWeight: 'bold',
                          //   },
                          // }}
                          />
                      </Grid>
                    )
                  })}
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
                    }}
                    onClick={getFreeNFT}
                    disabled={message!==""}
                  >
                    {message ? message : "Get your NFT"}
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Demo;