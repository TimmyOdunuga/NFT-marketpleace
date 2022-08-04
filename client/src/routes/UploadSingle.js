import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react'
import { useHistory, Redirect } from 'react-router'
import useIsMounted from 'react-is-mounted-hook'

import CreatePopup from '../components/new/popups/CreatePopup'

import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import SvgIcon from '@mui/material/SvgIcon'
import Divider from '@mui/material/Divider'
import Collapse from '@mui/material/Collapse'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'

import SelectionGrid from '../components/new/SelectionGrid'
import MultipleSelect from '../components/new/MultipleSelect'
import NftCard from '../components/new/NftCard'

import useStore from '../util/Store'
import { getOwner } from '../util/Metamask'
import { getETHPrice, createNFTInit } from '../util/Api'
import { ensureLogin, createNftFinalize } from '../util/Metamask'
import FileInput from '../components/new/FileInput'



const UploadSingle=()=>{
  const [owner, setOwner] = useState(null)

  const getOwnerAddress=()=>{
    getOwner().then(re=>{
      setOwner(re)
    }).catch(err=>{
      console.log(err)
    })
  }

  useLayoutEffect(()=>{
    getOwnerAddress()
  })

  return owner===null?(<div>Loading</div>)
  :(<UploadPage owner={owner}/>)
}


const UploadPage = ({owner}) => {
  const isMounted = useIsMounted()
  const history = useHistory()
  const [user] = useStore('user')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [priceType, setPriceType] = useState('BNB')
  const [iconFile, setIconFile] = useState('')
  const [iconFileName, setIconFileName] = useState('')
  const [iconFileSize, setIconFileSize] = useState('')
  const [dataFile, setDataFile] = useState('')
  const [dataFileName, setDataFileName] = useState('')
  const [dataFileSize, setDataFileSize] = useState('')
  const [ethPrice, setEthPrice] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [category, setCategory] = useState(null)
  const [status, setStatus] = useState('')
  const [createPopupActive, setCreatePopupActive] = useState(false)

  const handleChangeIconFile = (file, base64) => {
    setIconFileName(file?.name)
    setIconFileSize(file.size)
    setIconFile(base64)
  }

  const handleChangeDataFile = (file, base64) => {
    setDataFileName(file?.name)
    setDataFileSize(file.size)
    setDataFile(base64)
  }

  const handleClearIconUpload = () => {
    setIconFileName(null)
    setIconFileSize(0)
    setIconFile(null)
  }

  const handleClearDataUpload = () => {
    setDataFileName(null)
    setDataFileSize(0)
    setDataFile(null)
  }

  const handleChangePrice = (e) => {
    setPrice(e.target.value)
  }

  const handleChangePriceType = (newValue) => {
    setPriceType(newValue)
  }

  const handleChangeDescription = (e) => {
    setDescription(e.target.value)
  }

  const handleChangeName = (e) => {
    setName(e.target.value)
  }

  const handleChangeCategory = (e, newValue) => {
    setCategory(newValue)
  }

  const handleUploadNFT = async () => {
    try {
      setLoading(true)
      setError('')
      if (!dataFile) {
        throw new Error('You have not selected a file to upload')
      }
      if (!user?.address) {
        throw new Error('You must have a connected wallet to do that')
      }
      if (!name) {
        throw new Error('Please include the NFT name')
      }
      if (!description) {
        throw new Error('Please include the NFT description')
      }
      if (!price) {
        throw new Error('Please include the NFT price')
      }
      setStatus('Logging in...')
      window.onbeforeunload = () => {
        return ''
      }
      await ensureLogin()
      setStatus('Minting... This may take a while...')
      const { nftId, image } = await createNFTInit({
        name,
        description,
        image: iconFile,
        data: dataFile,
        priceType,
        price,
        categories: category?.value ? [category.value] : [],
      })
      setStatus('Finalizing...')
      try {
        await createNftFinalize(nftId, {
          name,
          description,
          currency: priceType,
          price,
          image,
        })
      } catch (err) {
        setStatus('Failed. Retrying...')
        try {
          await createNftFinalize(nftId, {
            name,
            description,
            currency: priceType,
            price,
            image,
          })
        } catch (err) {
          console.error(err)
        }
      }
      history.push(`/item/${nftId}`)
    } catch (err) {
      console.error(err)
      setError(err?.response?.data?.msg || err.message)
    } finally {
      if (!isMounted()) return
      window.onbeforeunload = undefined
      setLoading(false)
      setStatus('')
    }
  }

  const handleCloseError = () => {
    setError('')
  }

  const handleClickCreatePopup = () => {
    try {
      setError('')
      if (!dataFile) {
        throw new Error('You have not selected a file to upload')
      }
      if (!user?.address) {
        throw new Error('You must have a connected wallet to do that')
      }
      if (!name) {
        throw new Error('Please include the NFT name')
      }
      if (!description) {
        throw new Error('Please include the NFT description')
      }
      if (!price) {
        throw new Error('Please include the NFT price')
      }
      setCreatePopupActive(true)
    } catch (err) {
      console.error(err)
      setError(err?.response?.data?.msg || err.message)
    }
  }

  const handleClickOffCreatePopup = () => {
    if (loading) return
    setCreatePopupActive(false)
  }

  const populateEthPrice = useCallback(async () => {
    try {
      setLoading(true)

      const { price } = await getETHPrice('USD')
      console.log(price)
      if (!isMounted()) return

      setEthPrice(price)
    } catch (err) {
      console.error(err)
    } finally {
      if (!isMounted()) return
      setLoading(false)
    }
  }, [isMounted])

  useEffect(() => {
    populateEthPrice()
  }, [populateEthPrice])

  const canCreateNft = () => {
    if (loading || !category || !name || !description || !dataFile) {
      return false
    }
    return true
  }


  //only owner can visit route 
  if(user?.address !== owner) return <Redirect to='/'/>


  return (
    <div>
      <Container sx={{ mt: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Grid container justifyContent="space-between" sx={{ mb: 4 }} spacing={2}>
              <Grid item>
                <Typography variant="h3">Create single NFT</Typography>
              </Grid>
              <Grid item>
                <Typography>
                  <Button variant="outlined" disabled>
                    Switch to Multiple
                  </Button>
                </Typography>
              </Grid>
            </Grid>
            {!!dataFile ? (
              <div>
                <Typography variant="body1" fontWeight={500} sx={{ mt: 3 }}>
                  NFT Data Uploaded
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  This data is kept secret from everybody
                </Typography>
                <Button
                  size="large"
                  variant="outlined"
                  endIcon={
                    <SvgIcon>
                      <use xlinkHref="#icon-upload-file" />
                    </SvgIcon>
                  }
                  sx={{ mt: 2 }}
                  onClick={handleClearDataUpload}
                  fullWidth
                >
                  Upload New
                </Button>
              </div>
            ) : (
              <div>
                <Typography variant="body1" fontWeight={500} sx={{ mt: 3 }}>
                  Upload NFT Data
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Drag or choose your file to upload
                </Typography>
                <FileInput
                  title="PNG, JPG, JPEG, TXT, DOCX or WEBP. Max 800MB."
                  accept=".png,.jpg,.jpeg"
                  onUpload={handleChangeDataFile}
                  fileSize={dataFileSize}
                  fileName={dataFileName}
                  limit={800}
                />
              </div>
            )}
            {!!iconFile ? (
              <div>
                <Typography variant="body1" fontWeight={500} sx={{ mt: 3 }}>
                  NFT Icon Uploaded
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  This image is public for everyone to see
                </Typography>
                <Button
                  size="large"
                  variant="outlined"
                  endIcon={
                    <SvgIcon>
                      <use xlinkHref="#icon-upload-file" />
                    </SvgIcon>
                  }
                  sx={{ mt: 2 }}
                  onClick={handleClearIconUpload}
                  fullWidth
                >
                  Upload New
                </Button>
              </div>
            ) : (
              dataFile && (
                <div>
                  <Typography variant="body1" fontWeight={500} sx={{ mt: 3 }}>
                    Upload NFT Icon ( Optional )
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Drag or choose your file to upload
                  </Typography>
                  <FileInput
                    title="PNG, JPG, JPEG, TXT, DOCX or WEBP. Max 800MB."
                    accept=".png,.jpg,.jpeg"
                    onUpload={handleChangeIconFile}
                    fileSize={iconFileSize}
                    fileName={iconFileName}
                    limit={800}
                  />
                </div>
              )
            )}
            <Typography variant="body1" sx={{ mt: 4 }}>
              Item Details
            </Typography>
            <Typography
              variant="body2"
              fontWeight={600}
              textTransform="uppercase"
              color="text.accent"
              sx={{ mt: 3, mb: 2 }}
            >
              Item Name
            </Typography>
            <TextField
              placeholder="My Special NFT..."
              fullWidth
              value={name}
              onChange={handleChangeName}
            />
            <Typography
              variant="body2"
              fontWeight={600}
              textTransform="uppercase"
              color="text.accent"
              sx={{ mt: 3, mb: 2 }}
            >
              Description
            </Typography>
            <TextField
              placeholder="About this NFT..."
              fullWidth
              multiline
              minRows={3}
              value={description}
              onChange={handleChangeDescription}
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  textTransform="uppercase"
                  color="text.accent"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Select Currency
                </Typography>
                <MultipleSelect
                  options={['BNB']}
                  value={priceType}
                  onChange={handleChangePriceType}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  textTransform="uppercase"
                  color="text.accent"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Select NFT Price
                </Typography>
                <TextField
                  placeholder="0.0256..."
                  value={price}
                  onChange={handleChangePrice}
                  fullWidth
                />
                <Typography
                  variant="body2"
                  fontWeight={600}
                  textTransform="uppercase"
                  color="text.accent"
                  sx={{ mt: 2 }}
                >
                  Approx {Math.round(price * ethPrice * 100) / 100} USD
                </Typography>
              </Grid>
            </Grid>
            <Divider sx={{ my: 5 }} />
            <Typography variant="body1" fontWeight={500} sx={{ mt: 3 }}>
              Choose category
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
              Choose a category that fits your NFT
            </Typography>
            <SelectionGrid
              options={[
                { label: 'Membership', value: 'membership', color: '#4BC9F0' },
                { label: 'Founder', value: 'founder', color: '#45B26B' },
              ]}
              value={category}
              onChange={handleChangeCategory}
            />
            <Box sx={{ mt: 6, mb: 2 }}>
              <Collapse in={!!error} unmountOnExit>
                <Alert severity="error" onClose={handleCloseError}>
                  {error}
                </Alert>
              </Collapse>
            </Box>
            <Button
              size="large"
              disabled={!canCreateNft()}
              onClick={handleClickCreatePopup}
              sx={{ mb: 2 }}
              endIcon={
                <SvgIcon>
                  <use xlinkHref="#icon-arrow-next" />
                </SvgIcon>
              }
            >
              Create NFT
            </Button>
          </Grid>
          <Grid item xs={12} md={4} sx={{ display: { xs: 'none', md: 'block' } }}>
            <NftCard
              image={iconFile || dataFile || null}
              name={name || undefined}
              description={description || undefined}
              price={Number(price) || 0}
              priceType={priceType}
              stock={1}
            />
          </Grid>
        </Grid>
      </Container>
      <CreatePopup
        image={iconFile || dataFile || ''}
        name={name || undefined}
        description={description || undefined}
        price={Number(price) || 0}
        priceType={priceType}
        open={createPopupActive}
        error={error}
        loading={loading}
        status={status}
        onClickCreate={handleUploadNFT}
        onCloseError={handleCloseError}
        onClose={handleClickOffCreatePopup}
      />
    </div>
  )
}

export default UploadSingle
