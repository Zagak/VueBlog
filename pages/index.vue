<template>
  <Home />
</template>

<script setup>
import { createClient } from 'contentful';
import Home from '~/pages/Home.vue'

import { usePostsStore } from '../store/usePostsStore';

const config = useRuntimeConfig()
const contentfulClient = createClient({
  space: config.public.CONTENTFUL_SPACE_ID,
  accessToken: config.public.CONTENTFUL_ACCES_KEY,
})

const store = usePostsStore()

await store.fetchPosts(contentfulClient)
console.log(toRaw(store.posts))

console.log(store.getPosts)

console.log(store.getGuidesPosts)


</script>