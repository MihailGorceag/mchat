
const message = require('express').Router()
const checkAuth = require('../middlewares/checkAuth')


message.post('/new', checkAuth, async (req, res) => {
  const {receiver, message} = req.body
  console.log(req.body)
  if (!receiver) {
    res.json({error: 'no receiver'})
    return
  }
  const sender = req.userId
  //check if such chat already exists
  const chatMemberReceiver = await res.db.query('SELECT * FROM chat_member WHERE user_id = $1', [receiver])
  const chatMemberSender = await res.db.query('SELECT * FROM chat_member WHERE user_id = $1', [sender])
  const chatIdsReceiver = chatMemberReceiver.rows.map(chatMember => chatMember.chat_id)

  const chatIdsSender = chatMemberSender.rows.map(chatMember => chatMember.chat_id)
  let commonChatId = null
  chatIdsReceiver.forEach(id => {
    if (chatIdsSender.includes(id)) commonChatId = id
  })
  if (commonChatId !== null) {
    const senderChatMember = await res.db.query('SELECT * FROM chat_member WHERE user_id = $1', [sender])
    const receiverChatMember = await res.db.query('SELECT * FROM chat_member WHERE user_id = $1', [receiver])
    const senderChatMemberId = senderChatMember.rows[0].id
    const newMessage = await res.db.query('INSERT INTO message(user_id, chat_id, text, chat_member_id) VALUES ($1, $2, $3, $4) returning id', [sender, commonChatId, message, senderChatMemberId])
  }
  else {
    const newChat = await res.db.query('INSERT INTO chat DEFAULT VALUES returning id')
    const newChatId = newChat.rows[0].id
    const newChatMemberSender = await res.db.query('INSERT INTO chat_member(user_id, chat_id) VALUES($1, $2) returning id', [sender, newChatId])
    const newChatMemberSenderId = newChatMemberSender.rows[0].id
    const newChatMemberReceiver = await res.db.query('INSERT INTO chat_member(user_id, chat_id) VALUES($1, $2) returning id', [receiver, newChatId])
    const newMessage = await res.db.query('INSERT INTO message(user_id, chat_id, text, chat_member_id) VALUES ($1, $2, $3, $4)', [sender, newChatId, message, newChatMemberSenderId])
  }
})

message.get('/messages', checkAuth, async (req, res) => {
  const {receiver} = req.query
  const sender = req.userId
  const chatMemberReceiver = await res.db.query('SELECT * FROM chat_member WHERE user_id = $1', [receiver])
  const chatMemberSender = await res.db.query('SELECT * FROM chat_member WHERE user_id = $1', [sender])
  const chatIdsReceiver = chatMemberReceiver.rows.map(chatMember => chatMember.chat_id)

  const chatIdsSender = chatMemberSender.rows.map(chatMember => chatMember.chat_id)
  let commonChatId = null
  chatIdsReceiver.forEach(id => {
    if (chatIdsSender.includes(id)) commonChatId = id
  })

  const messages = await res.db.query('SELECT * FROM message WHERE chat_id = $1', [commonChatId])
  res.json({messages: messages.rows})
})

module.exports = message
