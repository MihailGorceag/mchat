import React, { useState, useEffect } from 'react'

import getCookie from '../utils/getCookie'
import { requestIsUserAuthenticated, requestLogoutUser } from '../api/user'

export const AuthContext = React.createContext(false)

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticate] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    requestIsUserAuthenticated().then(() => {
      if (getCookie('jwtfe')) setIsAuthenticate(true)
      else setIsAuthenticate(false)
      setIsLoading(false)
    }).catch(() => {
      setIsLoading(false)
    })
  }, [])

  const logout = () => {
    requestLogoutUser()
    setIsAuthenticate(false)
  }

  // console.log('isLoading')
  // console.log(isLoading)

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticate, logout }}
    >
      {isLoading ? null : children}
    </AuthContext.Provider>
  )
}
