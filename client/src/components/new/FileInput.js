import React from 'react'
import PropTypes from 'prop-types'
import { getBase64FromFile } from '../../util/Func'

import styled from '@mui/material/styles/styled'
import SvgIcon from '@mui/material/SvgIcon'
import { Typography } from '@mui/material'

const getSizeMB = (size) => {
  return Math.round((size / (1024 * 1024)) * 100) / 100
}

const UploadContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '182px',
  marginTop: '16px',
  borderRadius: '16px',
  overflow: 'hidden',
  background: theme.palette.text.light,
}))

const UploadInput = styled('input')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  fontSize: '400px',
  opacity: 0,
}))

const FileInput = ({ title, accept, limit, fileName, fileSize, onUpload, onError, ...props }) => {
  const handleChangeFile = async (e) => {
    try {
      const file = e.target.files[0]
      if (getSizeMB(file.size) >= limit) {
        throw new Error(`Failed to upload file - too big (${getSizeMB(file.size)} MB)`)
      }
      const base64 = await getBase64FromFile(file)
      onUpload(file, base64)
    } catch (err) {
      onError(err.message)
      console.error(err)
    }
  }

  return (
    <UploadContainer {...props}>
      <UploadInput type="file" accept={accept} onChange={handleChangeFile} />
      <SvgIcon sx={{ color: 'text.secondary', mb: 1 }}>
        <use xlinkHref="#icon-upload-file" />
      </SvgIcon>
      <Typography variant="body2" color="text.secondary">
        {!fileName ? title : `${fileName} ( ${getSizeMB(fileSize)} MB ) Uploaded`}
      </Typography>
    </UploadContainer>
  )
}

FileInput.defaultProps = {
  title: '',
  accept: '.png,.jpg,.jpeg',
  limit: 800,
  fileName: '',
  fileSize: 0,
  onUpload: () => {},
  onError: () => {},
}

FileInput.propTypes = {
  title: PropTypes.string,
  accept: PropTypes.string,
  limit: PropTypes.number,
  fileName: PropTypes.string,
  fileSize: PropTypes.number,
  onUpload: PropTypes.func,
  onError: PropTypes.func,
}

export default FileInput
