import './App.css'

import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import CssBaseline from '@mui/material/CssBaseline'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import Theme from './Theme'
import Box from '@mui/material/Box'

import Home from './routes/Home'
import Connect from './routes/Connect'
import Upload from './routes/Upload'
import UploadSingle from './routes/UploadSingle'
import Discover from './routes/Discover'
import Profile from './routes/Profile'
import EditProfile from './routes/EditProfile'
import ItemDetails from './routes/ItemDetails'
import Demo from './routes/Demo'
import BusinessCard from './routes/BusinessCard'
import AdminSpecialAccess from './routes/AdminSpecialAccess' 

import Navbar from './components/new/Navbar'
import Footer from './components/new/Footer'
import MetamaskUpdater from './components/MetamaskUpdater'
import Banner from './components/Banner'
import SpecialAccess from './routes/SpecialAccess'

import { setStoreDefaults } from './util/Store'
import { setHeader } from './util/Api'

const storeState = setStoreDefaults({
  user: {
    address: null,
    balance: null,
  },
  token: null,
})

const routes = (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/connect" component={Connect} />
    <Route path="/upload" component={Upload} />
    <Route path="/upload-single" component={UploadSingle} />
    <Route path="/edit-profile" component={EditProfile} />
    <Route path="/profile/:address" component={Profile} />
    <Route path="/discover" component={Discover} />
    <Route path="/item/:id" component={ItemDetails} />
    <Route path="/special-access" component={SpecialAccess} />
    <Route path="/demo" component={Demo} />
    <Route path="/business-card" component={BusinessCard} />
    <Route path="/admin-special-access" component={AdminSpecialAccess} />

  </Switch>
)

const App = () => {

  useEffect(() => {
    setHeader('Authorization', storeState.token)
  }, [])

  return (
    <div>
      <Router>
        <ThemeProvider theme={Theme}>
          <CssBaseline />
          <MetamaskUpdater />
          <Navbar />
          <Box sx={{ minHeight: 'calc(100vh - 356px)' }}>{routes}</Box>
          <Footer />
          <Banner />
        </ThemeProvider>
      </Router>
    </div>
  )
}

export default App
