import React, { useContext, useEffect, useState, useRef } from 'react'

import Input from '../../components/Input'

import {requestUserSearch} from '../../api/user'
import {requestNewMessage, requestMessages} from '../../api/message'

import TextArea from '../../components/Textarea'
import {ProfileContext} from '../../providers/profile'
import TelegramIcon from '../../assets/icons/telegram'

import './style.css'

let intervalMessageFetch
let timeoutUserEmailSearch
const Main = () => {
  const {profile} = useContext(ProfileContext)
  const [userSearch, setUserSearch] = useState('')
  const [userSearchResult, setUserSearchResult] = useState([])
  const [selectedUser, setSelectedUser] = useState({})
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const messagesListRef = useRef()

  const handleMessageChange = (e) => {
    setMessage(e.target.value)
  }

  const handleOnUserSearchChange = (e) => {
    setUserSearch(e.target.value)
    clearTimeout(timeoutUserEmailSearch)
    timeoutUserEmailSearch = setTimeout(() => {
      startUserSearch()
    }, 1500);
  }

  const startUserSearch = () => {
    if (userSearch !== '') {
      requestUserSearch(userSearch).then(({data}) => {
        setUserSearchResult(data.users)
      })
    }
  }

  const sendMessage = () => {
    if (message.length === 0) return
    const receiver = selectedUser.id
    console.log('message')
    console.log(message)
    requestNewMessage({receiver, message})
  }

  const scrollMessages = (newMessages) => {
      if (newMessages.length !== messages.length) {
        setMessages(newMessages)
      }
  }

  useEffect(() => {
    if (selectedUser.id) {
      clearInterval(intervalMessageFetch)
      intervalMessageFetch = setInterval(() => {
        requestMessages(selectedUser.id).then((response) => {
          scrollMessages(response.data.messages)
        })
      }, 2000)
      requestMessages(selectedUser.id).then((response) => {
        setMessages(response.data.messages)
        try {
          messagesListRef.current.scrollTop = messagesListRef.current.scrollHeight
        }
        catch (e) {
          console.log('wasnt able to scroll messages list')
        }
      })
    }
  }, [selectedUser.id])

  useEffect(() => {
    try {
      messagesListRef.current.scrollTop = messagesListRef.current.scrollHeight
    }
    catch {

    }

  }, [messages.length])

  console.log('selectedUser')
  console.log(selectedUser)


  return <div style={{height: '100%'}} >
    <div className='chat-section'>
      <div className='left-side'>
        <div className='search-block'>
          <label>User search</label>
          <Input onChange={handleOnUserSearchChange} value={userSearch} />
        </div>
        <div className='users-list'>
          {userSearchResult.filter(user => user.id !== profile.id).map(user => {
            return <div  style={{
              marginTop: '10px',
              borderBottom: user.id === selectedUser.id ? '1px solid black' : '',
              width: '98%'
              }} onClick={() => setSelectedUser(user)} >
              {user.email}
            </div>
          })}
        </div>
      </div>
      <div className='right-side'>
        <div ref={messagesListRef} className='messages-list'>
          {messages.map(message => {
            return <div key={message.id} style={
              {
                textAlign: profile.id === message.user_id ? 'right': 'left',
                border: '1px solid rgba(128,128,128,0.15)',
                borderRadius: '10px',
                padding: '10px',
                marginBottom: '10px'
              }
            } >{message.text}</div>
          })}
        </div>
        <div className='new-message-area'>
          <TextArea onChange={handleMessageChange} />&nbsp;
          <span onClick={sendMessage} ><TelegramIcon  /></span>
        </div>
      </div>
    </div>
  </div>
}

export default Main