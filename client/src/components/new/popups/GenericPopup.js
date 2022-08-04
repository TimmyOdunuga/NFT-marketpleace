import React, { forwardRef } from 'react'
import Dialog from '@mui/material/Dialog'
import Grow from '@mui/material/Grow'
import styled from '@mui/material/styles/styled'

const DialogContainer = styled('div')(({ theme }) => ({
  padding: '22px',
  [theme.breakpoints.down('sm')]: {
    padding: '12px',
  },
}))

const Transition = forwardRef((props, ref) => {
  return <Grow ref={ref} {...props} />
})

const GenericPopup = ({ open, onClose, children, ...props }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={onClose}
      aria-describedby="popup"
      maxWidth="xs"
      {...props}
    >
      <DialogContainer>{children}</DialogContainer>
    </Dialog>
  )
}

export default GenericPopup
