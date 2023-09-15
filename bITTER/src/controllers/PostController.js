import BaseController from "../utils/BaseController.js";
import { logger } from "../utils/Logger.js";
import { BadRequest } from "../utils/Errors.js";
import { postService } from "../services/PostService.js";
import { Auth0Provider } from "@bcwdev/auth0provider";

export class PostController extends BaseController {
    constructor() {
        super('api/posts')
        this.router
            .get('', this.getPostAll)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createPost)
            .delete('/:postId', this.removePost)
            .put('/:postId', this.editPost)
    }

    async createPost(req, res, next) {
        try {
            logger.log('[CREATING POST 📝]')
            let dataReq = req.body
            dataReq.authorId = req.userInfo.id
            dataReq.authorName = req.userInfo.nickname
            dataReq.authorPicture = req.userInfo.picture
            let newPost = await postService.createPost(dataReq)
            res.send(newPost)
        } catch (error) {
            next(error)
        }
    }

    async getPostAll(req, res, next) {
        try {
            logger.log('[GRABBING ALL POSTS 🫳]')
            let postAll = await postService.getPostAll()
            res.send(postAll)
        } catch (error) {
            next(error)
        }
    }

    async removePost(req, res, next) {
        try {
            logger.log('[DELETING BITTER POST ❌]')
            let postId = req.params.postId
            let removedPost = await postService.removePost(postId)
            res.send(removedPost)
        } catch (error) {
            next(error)
        }
    }

    async editPost(req, res, next) {
        try {
            logger.log('[EDITING.. TOO BITTER? ✏️]')
            let dataReq = req.body
            let postId = req.params.postId
            let editedPost = await postService.editPost(dataReq, postId)
            res.send(editedPost)
        } catch (error) {
            next(error)
        }
    }
}