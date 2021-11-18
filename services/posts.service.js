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


    async likePost(post,data) {
        await post.updateOne({
            $push: {
                likes: data
            }
        })
    }


    async unLikePost(post,data) {
        await post.updateOne({
            $pull: {
                likes: data
            }
        })
    }


    async delete(post) {
        await post.deleteOne()
    }


    async findAll(key, value) {
        const query = {}
        if(key & value) query[key] = value
        const posts = await Post.find(query)
        return posts
    }


    async findById(id) {
        const post = await Post.findById(id)
        return post
    }
}

module.exports = PostsService
