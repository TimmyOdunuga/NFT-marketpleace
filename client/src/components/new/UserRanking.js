import React from 'react'
import PropTypes from 'prop-types'

import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import SvgIcon from '@mui/material/SvgIcon'

const UserRanking = ({
  name,
  avatar,
  ranking,
  balance,
  balanceType,
  onClick,
  onClickAdd,
  onClickOpen,
  variant,
  sx,
  ...props
}) => {
  const handleClickAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onClickAdd(e)
  }

  const handleClickOpen = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onClickAdd(e)
  }

  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onClick(e)
  }

  return (
    <Paper
      variant={variant}
      sx={{ cursor: 'pointer', userSelect: 'none', ...sx }}
      onClick={handleClick}
      {...props}
    >
      <Grid container justifyContent="space-between" alignItems="center" padding={2}>
        <Grid item>
          {!!ranking && (
            <Chip
              icon={
                <SvgIcon>
                  <use xlinkHref="#icon-coin" />
                </SvgIcon>
              }
              label={`#${ranking}`}
              sx={{ fontWeight: 600, fontSize: 16 }}
              color="primary"
              size="small"
            />
          )}
        </Grid>
        <Grid item>
          <IconButton sx={{ color: 'text.accent' }} onClick={handleClickAdd}>
            <SvgIcon fontSize="medium">
              <use xlinkHref="#icon-minus-square" />
            </SvgIcon>
          </IconButton>
          <IconButton sx={{ color: 'text.accent' }} onClick={handleClickOpen}>
            <SvgIcon fontSize="medium">
              <use xlinkHref="#icon-add-square" />
            </SvgIcon>
          </IconButton>
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Divider orientation="horizontal" />
        </Grid>
      </Grid>
      <Grid
        container
        padding={2}
        spacing={1}
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Grid item>
          <Avatar src={avatar} />
        </Grid>
        <Grid item>
          <Typography variant="body2">{name}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" fontWeight={600} display="inline">
            {balance}{' '}
          </Typography>
          <Typography variant="body2" display="inline">
            {balanceType}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

UserRanking.defaultProps = {
  name: '',
  avatar: '',
  ranking: 0,
  balance: 0,
  balanceType: 'ETH',
  onClick: () => {},
  onClickAdd: () => {},
  onClickOpen: () => {},
  variant: 'plain',
  sx: {},
}

UserRanking.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string,
  ranking: PropTypes.number,
  balance: PropTypes.number,
  balanceType: PropTypes.string,
  onClick: PropTypes.func,
  onClickAdd: PropTypes.func,
  onClickOpen: PropTypes.func,
  variant: PropTypes.string,
  sx: PropTypes.object,
}

export default UserRanking
