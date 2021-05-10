import React, { useContext, useEffect, useState } from 'react'
import { ProfileContext } from '../../providers/profile'
import {requestChangePassword} from '../../api/user'

import './style.css'

const Profile = () => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [error, setError] = useState('')

  const {profile} = useContext(ProfileContext)

  const validatePassword = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
    return re.test(String(password))
  }

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value)
  }

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value)
  }

  const submitForm = () => {
    console.log(123)
    if (!validatePassword(newPassword)) {
      setError('Password should contain at least one digit, one lower case, one upper case, and contain at leas 8 characters')
      return 
    }
    else {
      requestChangePassword(currentPassword, newPassword)
    }
  }

  return <div><div className='profile-page-inner' >
    Email: {profile.email}

    <h3>Change Password:</h3>

    <label>
      <p>Current password:</p>
      <input onChange={handleCurrentPasswordChange} type='password' />
    </label>
    <label>
      <p>New password:</p>
      <input onChange={handleNewPasswordChange} type='password' />
    </label>
    <p className='error-text' >{error}</p>
    <button onClick={submitForm} >Submit</button>
  </div></div>
}

export default Profile