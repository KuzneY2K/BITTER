import { PostSchema } from "../models/Post.js";
import { logger } from "../utils/Logger.js";
import { BadRequest } from "../utils/Errors.js";
import { dbContext } from "../db/DbContext.js";

class PostService {
    async editPost(dataReq, postId) {
        let postToEdit = await dbContext.Post.findById(postId)
        if (!postToEdit) {
            throw new BadRequest(`How'd you manage that one? Wrong id.`)
        }
        postToEdit.contents = dataReq.contents ? dataReq.contents : postToEdit.contents
        postToEdit.mediaUrl = dataReq.mediaUrl ? dataReq.mediaUrl : postToEdit.mediaUrl
        postToEdit.save()
        return postToEdit
    }
    async removePost(postId) {
        let postToDelete = await dbContext.Post.findById(postId)
        if (!postToDelete) {
            throw new BadRequest('Invalid Post ID')
        }
        postToDelete.remove()
        return `[${postToDelete.contents}] <= Was Vaporized From Existence.`
    }
    async createPost(dataReq) {
        let newPost = await dbContext.Post.create(dataReq)
        return newPost
    }

    async getPostAll() {
        let postAll = await dbContext.Post.find()
        return postAll
    }
}

export const postService = new PostService()