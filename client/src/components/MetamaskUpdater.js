import React, { useEffect, useCallback } from 'react'

import { getMetamaskAccount, isMetamaskConnected, CHAIN_ID } from '../util/Metamask'
import useStore from '../util/Store'
import { getUser } from '../util/Api'

const AccountUpdater = () => {
  const [user, setUser] = useStore('user')

  const handleGetAccountInfo = useCallback(async () => {
    try {
      if (user?.metamaskDisconnected) return
      // If metamask is not connected, skip
      if (!isMetamaskConnected()) {
        setUser({
          address: null,
          balance: null,
        })
        return
      }

      if (parseInt(window.ethereum.chainId) !== parseInt(CHAIN_ID)) {
        setUser({
          address: null,
          balance: null,
        })
        return
      }

      const { address, balance } = await getMetamaskAccount()
      if (address !== user?.address || balance !== user?.balance) {
        try {
          const res = await getUser(address)
          return setUser({
            ...res.user,
            address,
            balance,
          })
        } catch (err) {
          return setUser({
            address,
            balance,
          })
        }
      }
    } catch (err) {
      return setUser({
        address: null,
        balance: null,
      })
    }
  }, [user, setUser])

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleGetAccountInfo()
    }, 500)
    const interval = setInterval(() => {
      handleGetAccountInfo()
    }, 3000)

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [handleGetAccountInfo])

  return <div></div>
}

export default AccountUpdater
