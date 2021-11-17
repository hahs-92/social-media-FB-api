//models
const User = require('../models/User.model')


class UsersService {

    async create(data) {
        const newUser = await User.create(data)
        return newUser
    }

    async findOne(email) {
        const user = await User.findOne({email})
        return user
    }
}


module.exports = UsersService

