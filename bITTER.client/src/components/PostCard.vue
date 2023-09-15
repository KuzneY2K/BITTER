<template>
      <div class="col-12 col-md-6 offset-md-3 d-flex flex-row justify-content-center mt-5">
        <!-- POST CARD -->
      <div class="card w-100 mx-3 mb-5">
        <div class="card-body elevation-5 px-4">
          <!-- PROFILE PIC / TITLE -->
          <hr class="position-relative">
          <div class="div post-head d-flex flex-row justify-content-start">
            <img :src="props.post.authorPicture" alt="Profile Picture" class="me-3 pfp rounded rounded-pill elevation-5">
            <h5 class="card-title position-relative authName">{{ props.post.authorName }} says...</h5>
          </div>
          <button v-if="props.post.authorId == account.id" class="btn btn-success elevation-5 rounded rounded-pill position-absolute m-0" id="deletePostBtn" @click="deletePost"><i class="mdi mdi-close"></i></button>
          <!-- END PROFILE PIC / TITLE / START POST BODY -->
          <div class="div post-bod d-flex flex-row mt-3">
            <p class="card-text fs-5">{{props.post.contents}}</p>
          </div>
          <div v-if="props.post.mediaUrl" class="media-container mt-3">
            <hr>
            <img :src="props.post.mediaUrl" alt="" class="media img-fluid rounded-top elevation-5">
            <hr>
          </div>
              <!-- COMMENT FORM -->
              <form>
                <div v-if="!account" class="form-group">
                  <label for="commentInput" class="mt-3">Got a bitter response?</label>
                    <input type="text" id="commentInput" class="form-control mt-3 elevation-3" required maxlength="50" minlength="1" disabled placeholder="Feature Currently Unavailable">
                      <a href="#" class="btn btn-success mt-3 elevation-3">Submit</a>
                </div>
              </form>
              <hr>
              <!-- END FORM -->
        </div>
      </div>
      <!-- END POST CARD -->
      </div>
</template>

<script>
import { Post } from '../models/Post.js';
import { AppState } from '../AppState.js';
import { computed } from 'vue';
import { logger } from '../utils/Logger.js';
import {postsService} from '../services/PostsService.js'
import Pop from '../utils/Pop.js';

    export default {
      props: {post: {type: Post, required: true}},
        setup(props){
          return{
            props,
            account: computed(()=> AppState.account),
            async deletePost(){
            try {
                logger.log('[CARD INSTANCE: DELETING POST]')
                await postsService.deletePost(props.post.postId)
            } catch (error) {
                Pop.error(error)
                }
            },
          }
        }
    }
</script>

<style scoped>
#deletePostBtn{
  right: -1rem !important;
  top: -1rem;
}

.pfp {
  height: 3rem;
}

.authName{
  top: .7rem !important;
}

.media {
  object-fit: cover;
  height: 375px;
  width: 100%;
}

</style>