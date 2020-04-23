const session = require('express-session');
const express = require('express');
const helmet = require("helmet")
const cors = require("cors")
const restricted = require('../auth/restricted-middleware.js');

const authRouter = require("../auth/auth-router.js")
const usersRouter = require("../users/users-router.js")

const server = express()

const sessionConfig = {
  name: 'chocolate-chip',
  secret: 'myspeshulsecret',
  cookie: {
    maxAge: 3600 * 1000,
    secure: false, 
  },
  resave: false,
  saveUninitialized: false,  
}

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(session(sessionConfig))

server.use("/api/auth", authRouter)
server.use("/api/users", restricted, usersRouter)

server.get('/', (req, res) => {
  res.json({ message: "Welcome to our API"})
})

module.exports = server;