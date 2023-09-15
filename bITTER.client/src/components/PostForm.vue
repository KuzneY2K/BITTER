<template>
    <form @submit.prevent="createPost">
        <div class="mb-3">
            <label for="mediaUrl" class="form-label">Only image URL's are supported right now.</label>
            <input v-model="dataBody.mediaUrl" type="url" class="form-control" id="mediaUrl" aria-describedby="emailHelp"
                placeholder="Insert URL">
        </div>
        <div class="mb-3">
            <label for="contents" class="form-label">Share some bitter thoughts...</label>
            <input v-model="dataBody.contents" type="text" class="form-control" id="contents" aria-describedby="emailHelp"
                placeholder="Enter Message.">
        </div>
        <button type="submit" class="btn btn-success">Submit</button>
    </form>
</template>

<script>
import { ref } from 'vue';
import { postsService } from '../services/PostsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
    setup() {
        let dataBody = ref({})
        return {
            dataBody,
            // CREATE POST
            async createPost() {
                try {
                    logger.log('[HOMEPAGE: CREATING POST]')
                    await postsService.createPost(dataBody.value)
                    dataBody.value = {}
                } catch (error) {
                    Pop.error(error)
                }
            }

        }
    }
}
</script>

<style scoped></style>