import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Fab from '@mui/material/Fab'
import SvgIcon from '@mui/material/SvgIcon'
import Box from '@mui/material/Box'

import styled from '@mui/material/styles/styled'

const NftImageOverlay = styled('div', { shouldForwardProp: (prop) => prop !== 'hovering' })(
  ({ theme, hovering }) => ({
    height: '100%',
    width: '100%',
    position: 'absolute',
    transition: 'all 0.3s',
    top: 0,
    zIndex: 2,
    background: `rgba(20, 20, 22, 0.3)`,
    ...(hovering ? { opacity: 1 } : { opacity: 0 }),
  })
)

const NftImageContainer = styled('div')(({ theme }) => ({
  height: '100%',
  width: '100%',
  aspectRatio: '5 / 6',
  position: 'relative',
  borderRadius: 14,
  overflow: 'hidden',
}))

const NftImage = styled('img', { shouldForwardProp: (prop) => prop !== 'hovering' })(
  ({ theme, hovering }) => ({
    objectFit: 'cover',
    userSelect: 'none',
    height: '100%',
    width: '100%',
    transition: 'transform 1s',
    ...(hovering ? { transform: 'scale(1.1)' } : {}),
  })
)

const NftCard = ({
  name,
  price,
  priceType,
  description,
  footerContent,
  image,
  stock,
  status,
  statusColor,
  category,
  categoryColor,
  isOwner,
  disabled,
  schedule,
  sx,
  onClick,
  onClickPurchase,
  onClickHeart,
  onClickDownload,
  editView,
  handleClickEdit,
  ...props
}) => {
  const [hovering, setHovering] = useState(false)

  const handleBeginHover = () => {
    setHovering(true)
  }

  const handleEndHover = () => {
    setHovering(false)
  }

  const handleClickImage = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onClick(e)
  }

  const handleClickPurchase = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onClickPurchase(e)
  }

  const handleClickHeart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onClickHeart(e)
  }

  const handleClickDownload = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onClickDownload(e)
  }
  return (
    <Paper
      variant="plain"
      sx={{ cursor: 'pointer', ...sx }}
      onClick={handleClick}
      onMouseEnter={handleBeginHover}
      onMouseLeave={handleEndHover}
      {...props}
    >
      <Box sx={{ padding: 1 }}>
        <NftImageContainer sx={{ cursor: 'default' }} onClick={handleClickImage}>
          <NftImageOverlay hovering={hovering}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="stretch"
              height="100%"
              padding={2}
            >
              {!editView && <Grid item flexGrow={1}>
                <Grid container justifyContent="space-between" alignItems="center">
                  <Grid item>
                    <Chip variant="status" color={categoryColor} label={category} />
                  </Grid>
                  <Grid item>
                    <Fab size="small" sx={{ color: 'text.secondary' }} onClick={handleClickHeart}>
                      <SvgIcon>
                        <use xlinkHref="#icon-heart" />
                      </SvgIcon>
                    </Fab>
                  </Grid>
                </Grid>
              </Grid>}
              {schedule && <Grid item minHeight='100px' bgcolor='white' style={{margin:'0 0 30px 0', padding:'10px', borderRadius:'10px'}}>
                <Typography variant="body2" color="text.primary">
                  {schedule}
                </Typography>
              </Grid>}

              {editView && <Grid item flexGrow={1}>
                <Grid container justifyContent="space-between" alignItems="center">
                  <Grid item>
                    <Fab size="small" sx={{ color: 'text.secondary' }} onClick={handleClickEdit}>
                      <SvgIcon sx={{width:'20px', height:'20px'}}>
                        <use color={"black"} xlinkHref="#icon-edit" />
                      </SvgIcon>
                    </Fab>
                  </Grid>
                </Grid>
              </Grid>}
              
              {!editView &&<>
              {isOwner ? (
                <Grid item>
                  <Button
                    size="large"
                    fullWidth
                    startIcon={
                      <SvgIcon>
                        <use xlinkHref="#icon-upload-file" />
                      </SvgIcon>
                    }
                    onClick={handleClickDownload}
                    disabled={disabled}
                  >
                    Download
                  </Button>
                </Grid>
              ) : (
                <Grid item>
                  <Button
                    size="large"
                    fullWidth
                    startIcon={
                      <SvgIcon>
                        <use xlinkHref="#icon-wallet" />
                      </SvgIcon>
                    }
                    onClick={handleClickPurchase}
                    disabled={status !== 'on sale' || disabled}
                  >
                    Purchase
                  </Button>
                </Grid>
              )}</>}
            </Grid>
          </NftImageOverlay>
          {image && <NftImage src={image} hovering={hovering} />}
        </NftImageContainer>
      </Box>
      <Grid container padding={2} spacing={1} justifyContent="space-between">
        <Grid item xs={12} zeroMinWidth>
          <Grid container wrap="nowrap" justifyContent="space-between" spacing={1}>
            <Grid item zeroMinWidth>
              <Typography variant="h6" color="text.primary" noWrap textOverflow="ellipsis">
                {name}
              </Typography>
            </Grid>
            <Grid item>
              <Chip variant="outlined" color="secondary" label={`${price} ${priceType}`} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} zeroMinWidth>
          <Typography variant="body1" noWrap>
            {description}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider orientation="horizontal" sx={{ my: 2 }} />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            {!!footerContent && (
              <Grid item flexGrow={1}>
                {footerContent}
              </Grid>
            )}
            <Grid item>
              <Chip variant="outlined" label={`${stock} in stock`} />
            </Grid>
            <Grid item>
              <Chip variant="status" color={statusColor} label={status} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

NftCard.defaultProps = {
  name: '',
  price: 0.034,
  priceType: 'ETH',
  description: '',
  footerContent: <></>,
  image: '',
  schedule: '',
  stock: 0,
  status: 'on sale',
  statusColor: 'primary',
  category: 'category',
  categoryColor: 'secondary',
  isOwner: false,
  disabled: false,
  sx: {},
  onClick: () => {},
  onClickHeart: () => {},
  onClickPurchase: () => {},
  onClickDownload: () => {},
}

NftCard.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  priceType: PropTypes.string,
  description: PropTypes.string,
  footerContent: PropTypes.node,
  image: PropTypes.string,
  stock: PropTypes.number,
  status: PropTypes.string,
  statusColor: PropTypes.string,
  category: PropTypes.string,
  categoryColor: PropTypes.string,
  isOwner: PropTypes.bool,
  disabled: PropTypes.bool,
  sx: PropTypes.object,
  onClick: PropTypes.func,
  onClickHeart: PropTypes.func,
  onClickPurchase: PropTypes.func,
  onClickDownload: PropTypes.func,
  schedule: PropTypes.string,
  editView: PropTypes.bool,
  handleClickEdit:PropTypes.func
}

export default NftCard
