import React from 'react'
import PropTypes from 'prop-types'

import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'

const UserPreview = ({ name, avatar, balance, balanceName, sx, ...props }) => {
  return (
    <Box sx={{ ...sx }} {...props}>
      <Grid container justifyContent="start" alignItems="center">
        <Grid item>
          <Avatar src={avatar} alt={name} sx={{ height: 50, width: 50, mr: 1 }} />
        </Grid>
        <Grid item>
          <Grid
            container
            justifyContent="space-between"
            justifyItems="space-between"
            direction="column"
          >
            <Grid item>
              <Typography variant="body2" fontWeight={600} sx={{ mb: 0.5 }}>
                {name}
              </Typography>
            </Grid>
            <Grid item>
              <Chip label={`${balance} ${balanceName}`} variant="outlined" color="secondary" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

UserPreview.defaultProps = {
  name: 'Name',
  avatar: '',
  balance: 0,
  balanceName: 'ETH',
  sx: {},
}

UserPreview.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string,
  balance: PropTypes.number,
  balanceName: PropTypes.string,
  sx: PropTypes.object,
}

export default UserPreview
