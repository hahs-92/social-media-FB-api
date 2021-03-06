const express = require('express')
//services
const UsersService = require('../services/users.service')


const router = express.Router()
const service = new UsersService()


router.post('/register', async(req, res) => {
    console.log("passwordRegister: ", req.body.password)
    try {
        const newUser = await service.create(req.body)

        res.status(201).json(newUser)
    } catch (error) {
        console.error(error)
        // res.status(500).json(error)
    }
})


router.post('/login', async(req, res) => {
    try {
        const user = await service.findOne("email",req.body.email)

        !user && res.status(404).json('User not found')

        //verify password
        const isPassword = await user.comparePassword(req.body.password)

        !isPassword && res.status(404).json('Invalid Credentials')

        // res.status(200).json({id: user._id, username: user.username})

        const { password, ...info } = user._doc
        console.log("user: ", info)
        res.status(200).json(info)

    } catch (error) {
        console.error(error)
        // res.status(500).json(error)
    }
})


module.exports = router