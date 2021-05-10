const user = require('express').Router()
const jwt = require('jsonwebtoken')

const {SECRET, reEmail, rePwd} = require('../constants')
const checkAuth = require('../middlewares/checkAuth')

user.post('/login', async (req, res) => {
  const {email, password} = req.body
  if (!reEmail.test(email.toLowerCase())) {
    res.json({error: 'email is invalid'})
    return
  }

  if (!rePwd.test(password)) {
    res.json({error: 'password is invalid'})
    return
  }

  const result = await res.db.query('SELECT * from users where email = $1 AND password = $2', [email, password])

  if (!result.rowCount) {
    res.json({error: 'No such user, or incorrect credentials'})
    return
  }
  
  else {
    const user = result.rows[0]
    const token = jwt.sign(
      {
        userId: user.id,
      },
      SECRET,
    )
  
    res.cookie('jwt', token, {
      httpOnly: true,
    })
  
    res.cookie('jwtfe', 'jwtfe', {
      httpOnly: false,
    })

    res.json({success: true})
    return
  }
})

user.post('/register', async (req, res) => {
  const {email, password} = req.body
  if (!reEmail.test(email.toLowerCase())) {
    res.json({error: 'email is invalid'})
    return
  }

  if (!rePwd.test(password)) {
    res.json({error: 'password is invalid'})
    return
  }
  const responseFromDB = await res.db.query(`select * from users where email = $1`, [email])

  if (responseFromDB.rowCount > 0) {
    res.json({error: 'user with such email already exists'})
    return
  }

 const result = await res.db.query('INSERT INTO users(email, password) VALUES($1, $2)', [email, password])
  if (result.rowCount > 0)  {
    res.json({success: true})
    return
  }

  res.json({error: 'something went wrong'})
})

user.get('/profile', checkAuth, async (req, res) => {
  const result = await res.db.query('SELECT * FROM users WHERE id = $1', [req.userId])
  const user = result.rows[0]
  res.json({user})
  return
})

user.post('/logout', checkAuth, async (req, res) => {
  res.clearCookie('jwt')
  res.clearCookie('jwtfe')
  res.status(200).send()
})

user.get('/is-authenticated', checkAuth, async (req, res) => {
  res.status(200).send(true)
})

user.post('/change-password', checkAuth, async (req, res) => {
  const {currentPassword, newPassword} = req.body
  const result = await res.db.query('SELECT * FROM users WHERE password = $1', [currentPassword])
  if (!result.rows[0]) {
    res.json({error: 'Current password is wrong'})
    return
  }
  if (!rePwd.test(newPassword)) {
    res.json({error: 'password is invalid'})
    return
  }
  const changePwdResult = await res.db.query(`UPDATE users SET password = $1 WHERE id = $2`, [newPassword, req.userId])
  res.json({success: true})
})

user.post('/search', async (req, res) => {
  const {email} = req.body
  const result = await res.db.query(`SELECT * FROM users WHERE email LIKE $1`, [`${email}%`])
  res.json({users: result.rows})
})

module.exports = user