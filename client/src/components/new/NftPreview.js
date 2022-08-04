import React from 'react'
import PropTypes from 'prop-types'

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'

import styled from '@mui/material/styles/styled'

const NftImageOverlay = styled('div')(({ theme }) => ({
  height: '100%',
  width: '100%',
  position: 'absolute',
  transition: 'all 0.3s',
  top: 0,
  pointerEvents: 'none',
  zIndex: 2,
  background: `rgba(20, 20, 22, 0.3)
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' fill='none' xmlns:v='https://vecta.io/nano'%3E%3Cpath d='M0 24C0 10.745 10.745 0 24 0s24 10.745 24 24-10.745 24-24 24S0 37.255 0 24z' fill='%23fcfcfd'/%3E%3Cpath fill-rule='evenodd' d='M25.394 20.843c.271-.25.692-.233.942.038l2.154 2.333c.236.255.236.649 0 .904l-2.154 2.333c-.25.271-.672.287-.942.038s-.287-.671-.038-.942l1.121-1.215H20c-.368 0-.667-.298-.667-.667S19.632 23 20 23h6.477l-1.121-1.214c-.25-.271-.233-.692.038-.942z' fill='%23777e91'/%3E%3C/svg%3E")
    no-repeat 50% 50%/48px 48px`,
  opacity: 0,
}))

const NftImageContainer = styled('div')(({ theme }) => ({
  height: '100%',
  width: '100%',
  aspectRatio: '1 / 1',
  position: 'relative',
  borderRadius: '12px',
  overflow: 'hidden',
  cursor: 'pointer',
  ':hover': {
    '& div': {
      opacity: 1,
    },
  },
}))

const NftImage = styled('img')(({ theme }) => ({
  objectFit: 'cover',
  userSelect: 'none',
  height: '100%',
  width: '100%',
  transition: 'transform 1s',
  ':hover': {
    transform: 'scale(1.1)',
  },
}))

const NftPreview = ({
  image,
  name,
  avatar,
  balance,
  balanceName,
  endText,
  buttonText,
  vertical,
  onClickButton,
  onClickImage,
  sx,
  ...props
}) => {
  return (
    <Box sx={{ ...sx }} {...props}>
      <Grid container spacing={2}>
        <Grid item xs={vertical ? 12 : 6}>
          <NftImageContainer onClick={onClickImage}>
            <NftImageOverlay />
            <NftImage src={image} alt="Nft" draggable={false} />
          </NftImageContainer>
        </Grid>
        <Grid item xs={vertical ? 12 : 6}>
          {vertical ? (
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <Avatar src={avatar} sx={{ height: 60, width: 60 }} />
              </Grid>
              <Grid item>
                <Typography variant="body2" fontSize={18} fontWeight={600} noWrap>
                  {name}
                </Typography>
                {balance && balanceName && (
                  <Grid item>
                    <Chip
                      label={`${balance} ${balanceName}`}
                      variant="outlined"
                      color="secondary"
                      sx={{ mt: 1 }}
                    />
                    {endText && (
                      <Typography variant="caption" noWrap sx={{ ml: 2 }}>
                        {endText}
                      </Typography>
                    )}
                  </Grid>
                )}
              </Grid>
              <Grid item>
                <Button variant="outlined" size="small" onClick={onClickButton}>
                  {buttonText}
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Grid container justifyContent="center" spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body2" fontSize={16} fontWeight={500} noWrap>
                  {name}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item>
                    <Avatar src={avatar} />
                  </Grid>
                  {balance && balanceName && (
                    <Grid item>
                      <Chip
                        label={`${balance} ${balanceName}`}
                        variant="outlined"
                        color="secondary"
                      />
                    </Grid>
                  )}
                  {endText && (
                    <Grid item>
                      <Typography variant="caption" noWrap>
                        {endText}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Button variant="outlined" size="small" onClick={onClickButton}>
                  {buttonText}
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

NftPreview.defaultProps = {
  image: '',
  name: '',
  avatar: '',
  balance: 0,
  balanceName: '',
  endText: '1 of 12',
  buttonText: 'View More',
  vertical: false,
  onClickButton: () => {},
  onClickImage: () => {},
  sx: {},
}

NftPreview.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  avatar: PropTypes.string,
  balance: PropTypes.number,
  balanceName: PropTypes.string,
  endText: PropTypes.string,
  buttonText: PropTypes.string,
  vertical: PropTypes.bool,
  onClickButton: PropTypes.func,
  onClickImage: PropTypes.func,
  sx: PropTypes.object,
}

export default NftPreview
