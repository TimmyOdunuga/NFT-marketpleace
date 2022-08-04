import React, { useState, useLayoutEffect } from 'react'
import {useHistory} from 'react-router-dom'
import Dialog from '@mui/material/Dialog'
import Grow from '@mui/material/Grow'
import styled from 'styled-components'


import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Collapse from '@mui/material/Collapse'
import Divider from '@mui/material/Divider'
import SvgIcon from '@mui/material/SvgIcon'

const Banner = ({ open, onClose, children, ...props }) => {
    const history = useHistory()
    const [isOpen, setIsOpen] = useState(open && open);
    const [local, setLocal] = useState(null)

    const handleClose = (accepted) => {
        onClose && onClose();
        //if accepted, set localStorage to true
        accepted === true && localStorage.setItem('newToWeb3', true)
        accepted && history.push('/demo')
        setIsOpen(false);
    }

    useLayoutEffect(() => {
        //Get newToWeb3 from localStorage
        const newToWeb3 = localStorage.getItem('newToWeb3')
        //If newToWeb3 is true, show banner
        if (newToWeb3 !== 'true') {
            setIsOpen(true)
        }else{
            setIsOpen(false)
        }
    },[])

  return (
    <>
        {isOpen && <DialogContainer>
            <Box sx={{  py: 2 }}>
                <Container>
                    <Grid container justifyContent="space-evenly">
                        <Grid item padding='10px'>
                            <Typography 
                                style={{maxWidth:'800px'}} 
                                textAlign="center"
                                variant="body1"
                                color="text.secondary">
                                Are you new to Web3 ? If you are,  please click yes to see a demo on how to use a wallet and buy your first cryptocurrency.
                            </Typography>
                        </Grid>

                        <Grid maxWidth='800px' padding='10px' item container justifyContent="space-evenly">
                            <Grid item margin='5px 10px' width='120px'>
                                <Button color='secondary' onClick={(e)=>{
                                    e.preventDefault();
                                    handleClose(true) }} fullWidth>Yes</Button>
                            </Grid>

                            <Grid item margin='5px 10px' width='120px'>
                                <Button onClick={(e)=>{
                                    e.preventDefault();
                                    handleClose() }} fullWidth>
                                    No, I'm good</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                
                </Container>
            </Box>
        </DialogContainer>}
    </>
  )
}


const DialogContainer = styled.div`
    background-color: #132330;
    min-height: 120px;
    min-width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1500;
    box-shadow: 0px -1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12);
`

export default Banner