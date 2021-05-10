import React, { useEffect, useState, useContext } from 'react'

import {requestProfile} from '../api/user'

export const ProfileContext = React.createContext({})

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    avatar: '',
    balance: 0,
    displayName: '',
    email: '',
    steamId: '',
    tradeLink: '',
    notification: [],
    _id: '',
  })



  const updateProfile = () => {
    requestProfile().then(newprofile => {
      setProfile(newprofile.user)
    })
  }

  return (
    <ProfileContext.Provider value={{ profile, setProfile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  )
}
