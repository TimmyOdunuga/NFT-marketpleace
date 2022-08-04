import React from 'react'
import PropTypes from 'prop-types'

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import Paper from '@mui/material/Paper'

import styled from '@mui/material/styles/styled'

const DisplayNftImage = styled('img')({
  borderRadius: 12,
  height: 'auto',
  width: '100%',
  maxHeight: 850,
})

const DisplayNft = ({
  name,
  username,
  avatar,
  image,
  description,
  price,
  priceType,
  usdPrice,
  isOwner,
  stock,
  status,
  category,
  sx,
  onClickPurchase,
  onClickView,
  onClickDownload,
  ...props
}) => {
  return (
    <Box sx={{ ...sx }} {...props}>
      <Grid container justifyContent="space-between" spacing={2} padding={2}>
        <Grid item xs={12} md={7}>
          <DisplayNftImage src={image} draggable={false} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container direction="column" justifyContent="space-between" height="100%">
            <Grid item>
              <Typography variant="h2" sx={{ mb: 2 }}>
                {name}
              </Typography>
              <Grid container spacing={1} sx={{ mb: 2 }}>
                <Grid item>
                  <Chip variant="outlined" label={`${stock} in stock`} />
                </Grid>
                <Grid item>
                  <Chip variant="status" color="secondary" label={category} />
                </Grid>
                <Grid item>
                  <Chip variant="status" color="primary" label={status} />
                </Grid>
              </Grid>
              <Grid container spacing={1} justifyContent="start" alignItems="center">
                <Grid item>
                  <Avatar src={avatar} />
                </Grid>
                <Grid item flexGrow={1}>
                  <Typography variant="body2" color="text.secondary">
                    Owner
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    {username}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" color="text.secondary">
                    {description}
                  </Typography>
                </Grid>
              </Grid>
              <Paper
                variant="outlined"
                sx={{
                  my: 4,
                  p: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="body1" fontWeight={500} color="text.primary">
                  Current Price
                </Typography>
                <Typography variant="h3" fontWeight={500} color="text.primary">
                  {price} {priceType}
                </Typography>
                <Typography variant="h5" fontWeight={600} color="text.secondary">
                  ${usdPrice}
                </Typography>
              </Paper>
              {isOwner ? (
                <Button size="large" fullWidth sx={{ mb: 2 }} onClick={onClickDownload}>
                  Download
                </Button>
              ) : (
                <Button size="large" fullWidth sx={{ mb: 2 }} onClick={onClickPurchase}>
                  Purchase
                </Button>
              )}
              <Button size="large" fullWidth variant="outlined" onClick={onClickView}>
                View item
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

DisplayNft.defaultProps = {
  name: '',
  username: '',
  avatar: '',
  image: '',
  description: '',
  price: 0,
  priceType: '',
  usdPrice: 0,
  isOwner: false,
  stock: 1,
  status: 'on sale',
  category: 'Uncategorized',
  sx: {},
  onClickPurchase: () => {},
  onClickView: () => {},
  onClickDownload: () => {},
}

DisplayNft.propTypes = {
  name: PropTypes.string,
  username: PropTypes.string,
  avatar: PropTypes.string,
  image: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  priceType: PropTypes.string,
  usdPrice: PropTypes.number,
  isOwner: PropTypes.bool,
  stock: PropTypes.number,
  status: PropTypes.string,
  category: PropTypes.string,
  sx: PropTypes.object,
  onClickPurchase: PropTypes.func,
  onClickView: PropTypes.func,
  onClickDownload: PropTypes.func,
}

export default DisplayNft
