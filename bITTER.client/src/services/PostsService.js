import { AppState } from "../AppState.js";
import { Post } from "../models/Post.js";
import { api } from "./AxiosService.js";
import { logger } from "../utils/Logger.js";

class PostsService {
    async getPosts(){
        logger.log('[SERVICE: GETTING POSTS]')
        let res = await api.get('api/posts')
        logger.log(res.data)
        AppState.posts = res.data.map(post => new Post(post))
        logger.log(AppState.posts)
    }

    async deletePost(postId){
        logger.log(`[SERVICE: Removing ${postId}]`)
        const res = await api.delete(`api/posts/${postId}`)
        logger.log(`[DB]: Removed ${res.data}`)
        let updatedList = AppState.posts.filter(post => post.postId != postId)
        AppState.posts = updatedList
    }

    async createPost(dataBody){
        let res = await api.post('api/posts', dataBody)
        let newPost = new Post(res.data)
        AppState.posts.push(newPost)
    }
}

export const postsService = new PostsService()