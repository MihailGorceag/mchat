import React, {useContext} from 'react'

import {ProfileContext} from '../../providers/profile'
import {AuthContext} from '../../providers/auth'

import {requestLogoutUser} from '../../api/user'

import './style.css'
import { useHistory } from 'react-router-dom'

const Header = () => {
  const {profile} = useContext(ProfileContext)
  const {isAuthenticated, setIsAuthenticate} = useContext(AuthContext)
  const history = useHistory()

  const logout = () => {
    setIsAuthenticate(false)
    requestLogoutUser()
  }

  const goToProfile = () => {
    history.push('/profile')
  }
  return <div className='header' style={{display: 'flex', justifyContent: 'space-between'}} >
    <div onClick={() => {
      history.push('/')
    }} >
      <span>M</span>
      <span>C</span>
      <span style={{color: '#0046AE'}} >H</span>
      <span style={{color: '#FFD200'}} >A</span>
      <span style={{color: '#CC092F'}} >T</span>
    </div>
    {isAuthenticated && <div>
      <span onClick={goToProfile} >{profile.email}</span> &nbsp;
      <span onClick={logout} >Logout</span>
    </div>}
  </div>
}

export default Header
