const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const morgan = require('morgan')
//config
const config = require('./config/config')


const PORT = config.port || 5000
const app = express()


app.get('/', (req, res) => {
    res.send('hello ¡')
})

app.listen(PORT, () => {
    console.log(`server listening in port: ${PORT}`)
})
