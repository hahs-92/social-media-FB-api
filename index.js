const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
//config
const config = require('./config/config')
//db
const connectDB = require('./db/connect')
//route
const routerApi = require('./routes')


const PORT = config.port || 5000
const app = express()

//middleware
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))
app.use(cors())

//routes
app.get('/', (req, res) => {
    res.send('hello ¡')
})

routerApi(app)


const start = async () => {
    try {
        await connectDB(config.mongoUri)
        app.listen(PORT, () =>
            console.log(`Server is listening on port ${PORT}...`)
        )
    } catch (error) {
        console.log(error)
    }
}

start()
