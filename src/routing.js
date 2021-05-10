import React, { useContext, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, Redirect
} from "react-router-dom"

import createHistory from 'history/createBrowserHistory';

import {AuthContext} from './providers/auth'
import {ProfileContext} from './providers/profile'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import ProfilePage from './pages/Profile'
import MainPage from './pages/Main'
import Header from './features/Header'

const history = createHistory();
const AuthApp = () => {
  const {updateProfile} = useContext(ProfileContext)

  useEffect(() => {
    updateProfile()
  }, [])

  return (
    <Switch>
      <Route exact path='/profile' component={ProfilePage} />
      <Route exact path='/' component={MainPage} />
      <Redirect to='/' />
    </Switch>
  )
}

const UnAuthorizedApp = () => {
  return (
    <Switch>
      <Route exact path='/login' component={LoginPage} />
      <Route exact path='/registration' component={RegisterPage} />
      <Redirect to='/login' />
    </Switch>
  )
}


const Routing = () => {
  const {isAuthenticated} = useContext(AuthContext)
  console.log('isAuthenticated')
  console.log(isAuthenticated)
  return <Router history={history}>
    <Header />
    <Switch>
      {isAuthenticated ? <AuthApp /> : <UnAuthorizedApp />}
    </Switch>
  </Router>
}

export default Routing

