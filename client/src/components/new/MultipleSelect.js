import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import SvgIcon from '@mui/material/SvgIcon'

import styled from '@mui/material/styles/styled'

const DropdownCircle = styled(SvgIcon, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    color: theme.palette.text.secondary,
    transition: 'all 0.2s',
    transform: 'rotate(0deg)',
    ...(open && {
      transform: 'rotate(180deg)',
    }),
    border: `2px solid ${theme.palette.text.disabled}`,
    padding: 6,
    borderRadius: 24,
  })
)

const MultipleSelect = ({ options, fullWidth, large, value, onChange, ...props }) => {
  const anchorEl = useRef(null)
  const [open, setOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const handleClickButton = (e) => {
    setOpen(true)
  }

  const handleMenuItemClick = (e, index) => {
    setSelectedIndex(index)
    setOpen(false)
    onChange(options?.[index])
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (!value) {
      setSelectedIndex(-1)
      return
    }
    if (typeof value === 'number') {
      setSelectedIndex(value)
      return
    }
    if (typeof value === 'object' && value?.value) {
      const index = options.findIndex((o) => o.value === value.value)
      if (index === -1) throw new Error('Selection not found in options list')
      setSelectedIndex(index)
      return
    }
    if (typeof value === 'string') {
      const index = options.findIndex((o) => o === value)
      if (index === -1) throw new Error('Selection not found in options list')
      setSelectedIndex(index)
      return
    }
    throw new Error('Invalid value selection')
  }, [value, options])

  return (
    <Box>
      <Button
        variant={!large ? 'select' : 'select-large'}
        fullWidth={fullWidth}
        aria-expanded={open ? 'true' : undefined}
        ref={anchorEl}
        onClick={handleClickButton}
        endIcon={
          <DropdownCircle sx={{ width: 28, height: 28 }} open={open}>
            <use xlinkHref="#icon-arrow-bottom" />
          </DropdownCircle>
        }
        {...props}
      >
        {options?.[selectedIndex]?.label || options?.[selectedIndex] || 'No options selected'}
      </Button>
      <Menu
        id={`lock-menu-${options?.[0]?.label || options?.[0]}`}
        marginThreshold={0}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        MenuListProps={{
          disablePadding: true,
          sx: {
            width: anchorEl?.current?.getBoundingClientRect()?.width || '100%',
          },
        }}
        anchorEl={anchorEl?.current}
        open={open}
        onClose={handleClose}
      >
        {options.map((option, index) => (
          <MenuItem
            key={`${option?.value || option}-${index}`}
            disabled={option?.disabled}
            onClick={(e) => handleMenuItemClick(e, index)}
          >
            <Typography
              variant="body1"
              fontWeight={500}
              color={index === selectedIndex ? 'primary' : 'text.primary'}
            >
              {option?.label || option || 'Invalid Option'}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

MultipleSelect.defaultProps = {
  value: null,
  options: [
    {
      label: 'Value one',
      value: 0,
    },
    {
      label: 'Value two',
      value: 0,
    },
  ],
  fullWidth: false,
  large: false,
  onChange: () => {},
}

MultipleSelect.propTypes = {
  value: PropTypes.any,
  options: PropTypes.array,
  fullWidth: PropTypes.bool,
  large: PropTypes.bool,
  onChange: PropTypes.func,
}

export default MultipleSelect
