<template>
  <Welcome />
</template>

<script setup>
import Home from '~/pages/Home.vue'
import Welcome from './Welcome.vue';

// import { usePostsStore } from '../stores/usePostsStore';
// import * as contentful from 'contentful';

// const config = useRuntimeConfig()
// const store = usePostsStore()

// const contentfulClient = contentful.createClient({
//   space: config.public.CONTENTFUL_SPACE_ID,
//   accessToken: config.public.CONTENTFUL_ACCES_KEY,
// })

// await useAsyncData('posts', () => store.fetchPosts().then((allPosts) => store.posts = allPosts))
</script>