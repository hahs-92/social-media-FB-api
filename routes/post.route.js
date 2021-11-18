const express = require('express')
//service
const PostsService = require('../services/posts.service')


const router = express.Router()
const service = new PostsService()



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

//get one user by Id
router.get('/', async (req, res) => {
    try {
        // const posts = await service.findAll()

        // res.status(200).json(posts)
        res.send('posts')
    } catch (error) {
        console.error("GET_USER: ",error)
    }
})


module.exports = router
