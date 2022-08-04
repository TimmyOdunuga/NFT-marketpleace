import React from 'react'
import PropTypes from 'prop-types'

import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

const StatusLoader = ({ label }) => {
  return (
    <Grid container alignItems="center" justifyContent="center" spacing={2}>
      <Grid item>
        <Typography
          variant="body1"
          fontWeight={500}
          color="text.secondary"
          textAlign="center"
          sx={{ userSelect: 'none' }}
        >
          {label}
        </Typography>
      </Grid>
      <Grid item>
        <CircularProgress size={20} sx={{ mt: 1 }} />
      </Grid>
    </Grid>
  )
}

StatusLoader.defaultProps = {
  label: 'Loading...',
}

StatusLoader.propTypes = {
  label: PropTypes.string,
}

export default StatusLoader
