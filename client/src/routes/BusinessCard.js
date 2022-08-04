import React, { useState, useEffect, useCallback } from 'react'
import styled from '@mui/material/styles/styled'
import image from '../assets/content/businesscard.png'
import Grid from '@mui/material/Grid'

const BCImage = styled('img', { shouldForwardProp: (prop) => prop !== 'hovering' })(
  ({ theme, hovering }) => ({
    objectFit: 'cover',
    userSelect: 'none',
    height: '100%',
    width: '100%',
    transition: 'transform 1s',
    ...(hovering ? { transform: 'scale(1.1)' } : {}),
  })
)

const BusinessCard = () => {
  return (
    <Grid container  alignContent='center' alignItems='center' justify='center'>

      <img src={image} ></img>
    </Grid>
  ) 
}

export default BusinessCard
