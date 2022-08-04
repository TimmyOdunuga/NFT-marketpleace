import React from 'react'
import PropTypes from 'prop-types'
import GenericPopup from './GenericPopup'

import StatusLoader from '../StatusLoader'

import Alert from '@mui/material/Alert'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Collapse from '@mui/material/Collapse'

import styled from '@mui/material/styles/styled'

const PreviewImg = styled('img')(({ theme }) => ({
  borderRadius: '12px',
  objectFit: 'cover',
  height: '300px',
  width: '100%',
}))

const signatureDeniedError = 'MetaMask Tx Signature: User denied transaction signature.'

const PurchasePopup = ({
  name,
  description,
  price,
  priceType,
  image,
  open,
  loading,
  status,
  error,
  onClose,
  onClickCreate,
  onCloseError,
}) => {
  const handleOnClose = () => {
    if (loading) return
    onClose()
  }

  return (
    <GenericPopup open={open} onClose={handleOnClose}>
      <PreviewImg src={image} alt="nft preview" />
      <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
        <Grid item>
          <Typography variant="subtitle1" fontWeight={600}>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Grid>
        <Grid item>
          <Chip variant="outlined" color="secondary" label={`${price} ${priceType}`} />
        </Grid>
      </Grid>
      <Typography variant="h4" sx={{ mt: 2 }}>
        Create new NFT
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" fontWeight={400} sx={{ my: 2 }}>
        Are you sure you want to create a new NFT{' '}
        <Typography display="inline" fontWeight={600} color="text.primary">
          "{name}"
        </Typography>{' '}
        for{' '}
        <Typography display="inline" fontWeight={600} color="text.primary">
          {price.toString()} {priceType}
        </Typography>
        ?
      </Typography>
      <Collapse in={!!error} unmountOnExit>
        <Alert severity="error" onClose={onCloseError}>
          {error === signatureDeniedError ? 'Purchase Denied' : error}
        </Alert>
      </Collapse>
      <Button disabled={loading} size="large" fullWidth onClick={onClickCreate} sx={{ mt: 3 }}>
        Create NFT
      </Button>
      <Button
        disabled={loading}
        size="large"
        variant="outlined"
        fullWidth
        onClick={onClose}
        sx={{ my: 1 }}
      >
        Cancel
      </Button>
      <Collapse in={!!status}>
        <StatusLoader label={status} />
      </Collapse>
    </GenericPopup>
  )
}

PurchasePopup.defaultProps = {
  name: '',
  description: '',
  price: 0,
  priceType: 'ETH',
  image: '',
  open: false,
  loading: false,
  status: '',
  error: '',
  onClose: () => {},
  onClickCreate: () => {},
  onCloseError: () => {},
}

PurchasePopup.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  priceType: PropTypes.string,
  image: PropTypes.string,
  open: PropTypes.bool,
  loading: PropTypes.bool,
  status: PropTypes.string,
  error: PropTypes.string,
  onClose: PropTypes.func,
  onClickCreate: PropTypes.func,
  onCloseError: PropTypes.func,
}

export default PurchasePopup
