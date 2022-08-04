import React, { useState } from 'react'
import PropTypes from 'prop-types'
import GenericPopup from './GenericPopup'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import SvgIcon from '@mui/material/SvgIcon'
import Collapse from '@mui/material/Collapse'

import styled from '@mui/material/styles/styled'

import FileInput from '../FileInput'

const PreviewImg = styled('img')(({ theme }) => ({
  borderRadius: '12px',
  objectFit: 'contain',
  height: '300px',
  width: '100%',
  backgroundColor: theme.palette.text.disabled,
}))

const UploadPopup = ({ open, maxSize, accept, onUpload, onClose, onClickSubmit }) => {
  const [error, setError] = useState('')
  const [file, setFile] = useState('')
  const [fileName, setFileName] = useState('')
  const [fileSize, setFileSize] = useState('')

  const handleChangeFileUpload = (file, base64) => {
    setFileName(file?.name)
    setFileSize(file.size)
    setFile(base64)
    onUpload({ base64, name: file?.name, size: file.size })
  }

  const handleClickSubmit = (e) => {
    e.preventDefault()
    onClickSubmit({ base64: file, name: fileName, size: fileSize })
  }

  const handleClearUpload = () => {
    setFile('')
  }

  const handleCloseError = () => {
    setError('')
  }

  const handleOnError = (err) => {
    setError(err)
  }

  return (
    <GenericPopup open={open} onClose={onClose}>
      <Typography variant="subtitle1" fontWeight={600}>
        Upload file
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Drag or choose your file to upload
      </Typography>
      <Collapse in={!!error} unmountOnExit>
        <Alert severity="error" onClose={handleCloseError}>
          {error}
        </Alert>
      </Collapse>
      {file ? (
        <div>
          <PreviewImg src={file} alt="uploaded file" />
          <Button
            sx={{ mt: 2 }}
            variant="outlined"
            startIcon={
              <SvgIcon>
                <use xlinkHref="#icon-upload-file" />
              </SvgIcon>
            }
            onClick={handleClearUpload}
          >
            Upload New
          </Button>
        </div>
      ) : (
        <FileInput
          accept={accept}
          title={`${accept.split(',').join(', ')} Max ${maxSize}MB.`}
          limit={maxSize}
          onUpload={handleChangeFileUpload}
          onError={handleOnError}
        />
      )}
      <Button
        size="large"
        fullWidth
        onClick={handleClickSubmit}
        disabled={!file}
        sx={{ mb: 1, mt: 2 }}
      >
        Use This Photo
      </Button>
      <Button size="large" variant="outlined" fullWidth onClick={onClose} sx={{ mb: 1 }}>
        Close
      </Button>
    </GenericPopup>
  )
}

UploadPopup.defaultProps = {
  open: false,
  maxSize: 560,
  accept: '.png,.jpg,.jpeg',
  onUpload: () => {},
  onClose: () => {},
  onClickSubmit: () => {},
}

UploadPopup.propTypes = {
  open: PropTypes.bool,
  maxSize: PropTypes.number,
  accept: PropTypes.string,
  onUpload: PropTypes.func,
  onClose: PropTypes.func,
  onClickSubmit: PropTypes.func,
}

export default UploadPopup
