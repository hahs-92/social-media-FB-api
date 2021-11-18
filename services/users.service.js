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

    async updateById(id,data) {
        const user = await User.findByIdAndUpdate(id,{
            $set: data
        })

       return user
    }

    async followUser(user,key,value) {
        await user.updateOne({
            $push: {
                [key]: value
            }
        })
    }


    async unFollowUser(user,key,value) {
        await user.updateOne({
            $pull: {
                [key]: value
            }
        })
    }


    async delete(id) {
        const user = await User.findByIdAndDelete(id)
        return user
    }

}


module.exports = UsersService

