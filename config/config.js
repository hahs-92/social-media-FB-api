require('dotenv').config()

const config = {
    port: process.env.PORT,
    mongoUri: process.env.MONGO_URI
}

module.exports = config
