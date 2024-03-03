<template>
  <Home />
</template>

<script setup>
import Home from '~/pages/Home.vue'
import { usePostsStore } from '../store/usePostsStore';
import * as contentful from 'contentful';


const config = useRuntimeConfig()
const contentfulClient = contentful.createClient({
  space: config.public.CONTENTFUL_SPACE_ID,
  accessToken: config.public.CONTENTFUL_ACCES_KEY,
})

const store = usePostsStore()
await store.fetchPosts(contentfulClient)


</script>