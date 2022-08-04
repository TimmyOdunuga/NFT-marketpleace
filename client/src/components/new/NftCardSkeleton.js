import React from 'react'

import Paper from '@mui/material/Paper'
import Skeleton from '@mui/material/Skeleton'

const NftCardSkeleton = ({ ...props }) => {
  return (
    <Paper variant="plain" sx={{ p: 1 }} {...props}>
      <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 1 }} animation="wave" />
      <Skeleton variant="text" height={50} animation="wave" />
      <Skeleton variant="text" animation="wave" />
      <Skeleton variant="text" height={50} animation="wave" />
    </Paper>
  )
}

export default NftCardSkeleton
