const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
require('dotenv')

loginRouter.post('/', async (request, response) => {
    const body = request.body

    const user = await User.findOne({ username: body.username })
    const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

    console.log('user and pass : ', user, passwordCorrect)

    if (!(user && passwordCorrect)) {
    return response.status(401).json({
        error: 'invalid username or password'
    })
    }

    const userForToken = {
    username: user.username,
    id: user._id,
    }
    
    console.log('secret ', process.env.SECRET)

    const token = jwt.sign(userForToken, process.env.SECRET)

    response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter