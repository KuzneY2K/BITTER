<template>
<section v-for="post in posts" :key="post.id" class="p-0 m-0 row container-fluid position-relative animate__animated animate__bounceInDown">
  <PostCard :post="post" />
</section>
<div class="createBtnContainer position-fixed">
  <button class="btn btn-success px-3" data-bs-toggle="modal" data-bs-target="#createPostModal"><i class="mdi mdi-file-plus fs-1"></i></button>
</div>

<!-- CREATE POST MODAL -->
  <div class="modal fade" id="createPostModal" tabindex="-1" aria-labelledby="createPostModal" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="createPostModal">Create a bitter post?</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <PostForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { postsService } from '../services/PostsService.js';

export default {
  setup() {
    async function getPosts(){
      try {
        logger.log('[HOMEPAGE: GETTING POSTS]')
        await postsService.getPosts()
      } catch (error) {
        Pop.error(error)
      }
    }
    onMounted(()=>{
      getPosts()
    })
    return {
      posts: computed(()=> AppState.posts.reverse())
    }
  }
}
</script>

<style scoped lang="scss">

.createBtnContainer{
  bottom: 2rem;
  right: 1rem;
}

.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
