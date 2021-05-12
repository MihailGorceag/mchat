const express = require('express')
const {Client} = require('pg')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const checkAuth = require('./middlewares/checkAuth')
const userRouter = require('./controllers/user')
const messageRouter = require('./controllers/message')

const app = express()

const client = new Client({
  user: 'postgres',
  host: 'db',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
})


const main = async () => {
  await client.connect()

  await client.query(`
  CREATE TABLE Users (
    id  SERIAL PRIMARY KEY,
    nickname varchar(255),
    email varchar(255),
    created DATE default CURRENT_TIMESTAMP,
    password varchar(255)
  )
  
  CREATE TABLE Chat (
    id SERIAL PRIMARY KEY,
    created DATE default CURRENT_TIMESTAMP
  )
  
  CREATE TABLE chat_member (
      id SERIAL PRIMARY KEY,
    
      user_id integer, 
      CONSTRAINT fk_user_id
         FOREIGN KEY (user_id) 
         REFERENCES users (id),
    
      chat_id integer, 
      CONSTRAINT fk_chat_id
         FOREIGN KEY (chat_id) 
         REFERENCES chat (id)
    )
        
  
  CREATE TABLE Message (
      id SERIAL PRIMARY KEY,
      text TEXT,
      created DATE default CURRENT_TIMESTAMP,
    
      user_id integer, 
      constraint fk_user_id
         foreign key (user_id) 
         REFERENCES users (id),
    
      chat_id integer, 
      constraint fk_chat_id
         foreign key (chat_id) 
         REFERENCES chat (id),
  
      chat_member_id integer,
      constraint fk_chat_member_id
      FOREIGN KEY (chat_member_id)
      REFERENCES chat_member(id)
    
    )
  
  `)
  // const res = await client.query('SELECT * FROM users')


  
  app.use(bodyParser())
  app.use(cookieParser())

  app.use((req, res, next) => {
    res.db = client
    next()
  })

  app.use('/api/user', userRouter)
  app.use('/api/message', messageRouter)
  

  app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:${3000}`)
  })
  
}

main()



