import axios from 'axios'

const path = '/api/message'

export const requestNewMessage = ({receiver, message}) => {
  console.log('receiver')
  console.log(receiver)
  return axios.post(`${path}/new`, {receiver, message})
}
  

export const requestMessages = (receiver) => {
  return axios.get(`${path}/messages?receiver=${receiver}`)
}