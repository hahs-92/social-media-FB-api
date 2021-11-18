const express = require('express')
//service
const PostsService = require('../services/posts.service')
const UsersService = require('../services/users.service')


const router = express.Router()
const service = new PostsService()
const serviceUser = new UsersService()



//create new Post
router.post('/', async (req, res) => {
    try {
        const newPost = await service.create(req.body)

        res.status(200).json(newPost)
    } catch (error) {
        console.error(error.message)
        res.status(500).json(error.message)
    }
})


//get post by id
router.get('/:id', async (req, res) => {
    try {
        const post = await service.findById(req.params.id)

        if(!post) return res.status(404).json('Post not Found')

        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error.message)
    }
})


//updatePost
router.patch('/:id', async (req, res) => {
    try {
        const post = await service.findById(req.params.id)

        if(!post) return res.status(403).json('you can update only your post');

        if(post.userId === req.body.userId) {
            await service.update(post, req.body)

            res.status(200).json('post has been updated')
        } else {
            res.status(403).json('you can update only your post')
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).json(error.message)
    }
})


//deletePost
router.delete('/:id', async (req, res) => {
    try {
        const post = await service.findById(req.params.id)

        if(!post) return res.status(403).json('you can delete only your post');

        if(post.userId === req.body.userId) {
            await service.delete(post)

            res.status(200).json('post has been deleted')
        } else {
            res.status(403).json('you can delete only your post')
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).json(error.message)
    }
})


//like and dislike a post
router.patch('/:id/like', async (req, res) => {
    try {
        const post = await service.findById(req.params.id)

        if(!post) return res.status(404).json('Not found')

        if(!post.likes.includes(req.body.userId)){
            await service.likePost(post, req.body.userId)
            res.status(200).json('The post has been liked')
        }else {
            await service.unLikePost(post, req.body.userId)
            res.status(200).json('The post has been disliked')
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).json(error.message)
    }
})


//timeline
router.get('/timeline/all', async(req, res) => {
    try {
        const user = await serviceUser.findOneById(req.body.userId)

        const userPosts = await service.findAll('userId', user._id)

        const friendPosts = await Promise.all(
            user.followings.map((friendId) => {
                return service.findAll('userId',friendId)
            })
        )

        res.status(200).json(userPosts.concat(...friendPosts))

    } catch (error) {
        res.status(500).json(error.message)
    }
})


module.exports = router
