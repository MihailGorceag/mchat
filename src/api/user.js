import axios from 'axios'

const path = '/api/user'

export const requestLogoutUser = () => axios.post(`${path}/logout`)

export const requestIsUserAuthenticated = () =>
  axios.get(`${path}/is-authenticated`)


export const requestProfile = () => {
  return axios.get(`${path}/profile`).then(({ data }) => data)
}

export const requestUpdateProfile = (profileData) => {
  return axios.post(`${path}/update-profile`, profileData).then(({data}) => data)
}

export const requestChangePassword = (currentPassword, newPassword) => {
  return axios.post(`${path}/change-password`, {currentPassword, newPassword}).then(({data}) => data)
}

export const requestUserSearch = (email) => {
  return axios.post(`${path}/search`, {email})
}

export const requestUserRegistration = ({email, password}) => {
  return axios.post(`${path}/register`, {email, password})
}

export const requestUserLogin  = ({email, password}) => {
  return axios.post(`${path}/login`, {email, password})
}