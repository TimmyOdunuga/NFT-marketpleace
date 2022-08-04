import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'

import styled from '@mui/material/styles/styled'

const NftImageContainer = styled('div')(({ theme }) => ({
  height: '100%',
  width: '100%',
  position: 'relative',
  borderRadius: '12px',
  overflow: 'hidden',
}))

const NftImage = styled('img')(({ theme }) => ({
  objectFit: 'cover',
  userSelect: 'none',
  height: '100%',
  width: '100%',
}))

const CollectionPreview = ({
  name,
  username,
  avatar,
  items,
  imageOne,
  imageTwo,
  imageThree,
  imageFour,
  sx,
  onClick,
  ...props
}) => {
  const [hovering, setHovering] = useState(false)

  const handleClick = (e) => {
    onClick(e)
  }

  const handleMouseEnter = () => {
    setHovering(true)
  }

  const handleMouseLeave = () => {
    setHovering(false)
  }

  return (
    <Box
      sx={{ cursor: 'pointer', userSelect: 'none', ...sx }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <NftImageContainer sx={{ maxHeight: 240 }}>
            <NftImage draggable={false} src={imageOne} />
          </NftImageContainer>
        </Grid>
        <Grid item xs={4}>
          <NftImageContainer sx={{ maxHeight: 90 }}>
            <NftImage draggable={false} src={imageTwo} />
          </NftImageContainer>
        </Grid>
        <Grid item xs={4}>
          <NftImageContainer sx={{ maxHeight: 90 }}>
            <NftImage draggable={false} src={imageThree} />
          </NftImageContainer>
        </Grid>
        <Grid item xs={4}>
          <NftImageContainer sx={{ maxHeight: 90 }}>
            <NftImage draggable={false} src={imageFour} />
          </NftImageContainer>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            sx={{ transition: 'all 0.2s' }}
            color={hovering ? 'primary' : 'text.primary'}
          >
            {name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <Avatar src={avatar} />
            </Grid>
            <Grid item flexGrow={1}>
              <Typography variant="body2" fontWeight={500}>
                By {username}
              </Typography>
            </Grid>
            <Grid item>
              <Chip variant="outlined" label={`${items} ITEMS`} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

CollectionPreview.defaultProps = {
  name: '',
  username: '',
  avatar: '',
  items: 0,
  imageOne: '',
  imageTwo: '',
  imageThree: '',
  imageFour: '',
  sx: {},
  onClick: () => {},
}

CollectionPreview.propTypes = {
  name: PropTypes.string,
  username: PropTypes.string,
  avatar: PropTypes.string,
  items: PropTypes.number,
  imageOne: PropTypes.string,
  imageTwo: PropTypes.string,
  imageThree: PropTypes.string,
  imageFour: PropTypes.string,
  sx: PropTypes.object,
  onClick: PropTypes.func,
}

export default CollectionPreview
