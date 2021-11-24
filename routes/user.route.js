const express = require('express')
const bcrypt = require('bcrypt')
//service
const UsersService = require('../services/users.service')


const router = express.Router()
const service = new UsersService()


//get one user by Id
router.get('/', async (req, res) => {
    const userId = req.query.userId
    const username = req.query.username
    try {
        const user = userId
            ? await service.findOneById(userId)
            : await service.findOne(username)

        !user && res.status(404).json('user not found')

        const { password, updatedAt, ...other } = user._doc

        res.status(200).json(other)
    } catch (error) {
        console.error("GET_USER: ",error)
    }
})

router.patch('/:id',async (req,res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin) {

        if(req.body.password) {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(req.body.password, salt)
            req.body.password = hashPassword
        }

       try {
           const user = await service.updateById(req.params.id, req.body)

           !user && res.status(400).json('Not udpated')
           res.status(200).json("Account has been updated")

       } catch (error) {
           console.log('PUT: ', error)
       }
    } else {
        return res.status(403).json('Access not allow')
    }
})


router.delete('/:id',async (req,res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin) {

       try {
           const user = await service.delete(req.params.id)

           !user && res.status(400).json('Not deleted')

           res.status(200).json("Account has been deleted")

       } catch (error) {
           console.log('DELETED: ', error)
       }
    } else {
        return res.status(403).json('Access not allow')
    }
})


//follow a user
router.patch('/:id/follow',async(req, res) => {

    if(req.body.userId !== req.params.id) {
        try {
            const user = await service.findOneById(req.params.id)
            const currentUser = await service.findOneById(req.body.userId)

            if(!user.followers.includes(req.body.userId)) {

                await service.followUser(user,'followers',req.body.userId)
                await service.followUser(currentUser,'followings',req.params.id)

                res.status(200).json('user has been followed')
            }else {
                res.status(403).json('you already follow this user')
            }
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json('Access not allow')
    }
})


//unfollow a user
router.patch('/:id/unfollow',async(req, res) => {

    if(req.body.userId !== req.params.id) {
        try {
            const user = await service.findOneById(req.params.id)
            const currentUser = await service.findOneById(req.body.userId)

            if(user.followers.includes(req.body.userId)) {

                await service.unFollowUser(user,'followers',req.body.userId)
                await service.unFollowUser(currentUser,'followings',req.params.id)

                res.status(200).json('user has been unfollowed')
            }else {
                res.status(403).json('you do not follow this user')
            }
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json('Access not allow')
    }
})


module.exports = router
