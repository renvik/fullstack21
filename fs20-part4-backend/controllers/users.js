const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', { title: 1, url: 1,  likes: 1, author: 1 })

  response.json(users.map(u => u.toJSON()))
})

// user log in -route (broken!)
usersRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({ username: body.username })
  const correctpwd = user === null ? false : await bcrypt.compare(body.password, user.passwordHash)

  if(!(user && correctpwd)){
    return response.status(400).json({ error: 'invalid user information to log in' })
  }
  response.status(200).json({ info: 'welcome!' })
})

// user registration -route (ie. user creates an account) broken! Form is also missing
usersRouter.post('/', async (request, response) => {
  const { password, name, username } = request.body

  if ( !password || password.length<3 ) {
    return response.status(400).send({
      error: 'password must min length 3'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username, name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})


module.exports = usersRouter