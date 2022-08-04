import React from 'react'
import PropTypes from 'prop-types'

import styled from '@mui/material/styles/styled'

export const SelectionContainer = styled('div')(({ theme }) => ({
  boxShadow: `inset 0 0 0 2px ${theme.palette.text.disabled}`,
  borderRadius: 20,
  padding: 6,
  display: 'flex',
}))

export const SelectionItem = styled('a', {
  shouldForwardProp: (prop) => !['active', 'last'].includes(prop),
})(({ active, last, theme }) => ({
  cursor: 'pointer',
  padding: '6px 12px',
  borderRadius: '14px',
  background: 'none',
  fontSize: '14px',
  lineHeight: '1.14286',
  fontWeight: '700',
  color: theme.palette.text.secondary,
  transition: 'all 0.2s',
  ...(!last && {
    marginRight: 8,
  }),
  ...(active
    ? {
        backgroundColor: theme.palette.text.selection,
        color: theme.palette.text.contrast,
      }
    : {
        ':hover': {
          color: theme.palette.text.primary,
        },
      }),
}))

const SelectionGrid = ({ options, value, onChange, ...props }) => {
  const getOptionName = (option) => {
    if (typeof option === 'string') {
      return option
    }
    return option?.label || 'Invalid Option'
  }

  const getIsActive = (option) => {
    if (value?.value !== undefined) {
      return value.value === option?.value
    }
    return option === value
  }

  const handleChangeSelection = (e, option) => {
    onChange(e, option)
  }

  return (
    <SelectionContainer {...props}>
      {options.map((option, index) => (
        <SelectionItem
          key={`selection-${option?.value || option}-${index}`}
          active={getIsActive(option)}
          onClick={(e) => handleChangeSelection(e, option)}
          last={options.length - 1 === index}
        >
          {getOptionName(option)}
        </SelectionItem>
      ))}
    </SelectionContainer>
  )
}

SelectionGrid.defaultProps = {
  options: [],
  value: null,
  onChange: () => {},
}

SelectionGrid.propTypes = {
  options: PropTypes.array,
  value: PropTypes.any,
  onChange: PropTypes.func,
}

export default SelectionGrid
