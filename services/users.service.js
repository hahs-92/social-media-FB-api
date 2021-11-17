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

    async findOneById(id) {
        const user = await User.findById(id)
        return user
    }

    async update(id,data) {
        const user = await User.findByIdAndUpdate(id,{
            $set: data
        })

       return user
    }

    async delete(id) {
        const user = await User.findByIdAndDelete(id)
        return user
    }

}


module.exports = UsersService

