import React, { useCallback, useContext, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

import Input from '../../components/Input'
import Button from '../../components/Button'
import {AuthContext} from '../../providers/auth'
import {requestUserLogin} from '../../api/user'

import './style.css'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const history = useHistory()
  const {setIsAuthenticate} = useContext(AuthContext)

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const submitForm = () => {
    setError('')
    requestUserLogin({email, password}).then(response => {
      if (response.data.error) setError(response.data.error)
      else {
        setIsAuthenticate(true)
        setTimeout(() => {
          history.push('/')
        }, 500)
      }
    })
  }
  return <div className='login-page' >
    <div className='login-page-inner' >
    <h3>Login</h3>
    <label>
      Email<br />
      <Input onChange={handleEmailChange} />
    </label><br /><br />
    <label>
      Password<br />
      <Input onChange={handlePasswordChange} type='password' /><br />
    </label>
    <p className='error-text' >{error}</p>
    <Button onClick={submitForm} >Submit</Button>
    <p onClick={() => history.push('/registration')} >Registration</p>
  </div>
  </div>
}

export default LoginPage