import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios'

import Input from '../../components/Input'
import Button from '../../components/Button'
import {requestUserRegistration} from '../../api/user'

import './style.css'
const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [error, setError] = useState('')
  const history = useHistory()

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleRepeatPasswordChange = (e) => {
    setRepeatPassword(e.target.value)
  }

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const validatePassword = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
    return re.test(String(password))
  }

  const validateRepeatPassword = (password, repeatPassword) => {
    return password === repeatPassword
  }

  const submitForm = () => {
    if (!validateEmail(email)) {
      setError('Email is invalid')
      return 
    }
    if (!validatePassword(password)) {
      setError('Password should contain at least one digit, one lower case, one upper case, and contain at leas 8 characters')
      return 
    }
    if (!validateRepeatPassword(password, repeatPassword)) {
      setError('Password and repeat password should be the same')
      return 
    }
    setError('')

    requestUserRegistration({email, password}).then(response => {
      if (response.data.error) {
        setError(response.data.error)
      }
      else {
        history.push('/login');
      }
    })

  }

  return (<div className='register-page'>
    <div className='register-page-inner' >
    <h3>Registration</h3>
    <label>
      Email<br />
      <Input onChange={handleEmailChange} />
    </label><br /><br />
    <label>
      Password<br />
      <Input type='password' onChange={handlePasswordChange} />
    </label><br /><br />
    <label>
      Repeat Password<br />
      <Input type='password' onChange={handleRepeatPasswordChange} />
    </label>
    <p className='error-text' >{error !== '' && error}</p>
    <Button onClick={submitForm} >Submit</Button>
  </div></div>)
}
export default Register