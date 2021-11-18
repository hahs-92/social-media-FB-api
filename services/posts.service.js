//model
const Post = require('../models/Post.model')


class PostsService {

    async create(data) {
        const newPost = await Post.create(data)
        return newPost
    }

    async update(post,data) {
        await post.updateOne({
            $set: data
        })
    }

    async delete(post) {
        await post.deleteOne()
    }

    async findAll() {
        const posts = await Post.find({})
        return posts
    }

    async findById(id) {
        const post = await Post.findById(id)
        return post
    }
}

module.exports = PostsService
