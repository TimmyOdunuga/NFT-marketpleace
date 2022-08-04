import React from 'react'

import Skeleton from '@mui/material/Skeleton'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

const DisplayNftSkeleton = ({ ...props }) => {
  return (
    <Box {...props}>
      <Grid container justifyContent="space-between" spacing={2} padding={2}>
        <Grid item xs={12} md={7}>
          <Skeleton variant="rectangular" height={800} sx={{ borderRadius: 1 }} animation="wave" />
        </Grid>
        <Grid item xs={12} md={4}>
          <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 1 }} animation="wave" />
          <Skeleton variant="text" height={50} animation="wave" />
          <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 1 }} animation="wave" />
          <Skeleton variant="text" height={50} animation="wave" />
        </Grid>
      </Grid>
    </Box>
  )
}

export default DisplayNftSkeleton
