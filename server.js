const express = require('express')
const dotenv = require("dotenv")
const path = require("path")

dotenv.config()
const PORT = process.env.PORT

const server = express()
server.use('/animal-agency', express.static('public'))

server.listen(PORT, () => {
  console.log('Listening on port ' + PORT + "...")
})
