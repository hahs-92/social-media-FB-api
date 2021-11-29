const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
//config
const config = require('./config/config')
//db
const connectDB = require('./db/connect')
//route
const routerApi = require('./routes')


//storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        // cb(null, file.originalname)
        cb(null, req.body.name)
    }
})

const PORT = config.port || 5000
const app = express()
const upload = multer({storage})

app.use('/images', express.static(path.join(__dirname, 'public/images')))

//middleware
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))
app.use(cors())


//routes
app.get('/', (req, res) => {
    res.send('hello ¡')
})

//upload images
app.post('/api/v1/upload', upload.single('file'), (req, res) => {
    try {
        return res.status(200).json({msg:"image uploaded"})
    } catch (error) {
        console.error(error.message)
    }
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
