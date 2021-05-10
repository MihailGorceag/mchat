import React from 'react'

import './App.css'

import Routes from './routing'
import { AuthProvider } from './providers/auth'
import { ProfileProvider } from './providers/profile'

const App = () => {
  return (
      <AuthProvider>
          <ProfileProvider>
            <Routes />
          </ProfileProvider>
      </AuthProvider>
  )
}

export default App
