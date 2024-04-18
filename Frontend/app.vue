<template>
  <div class="bg-primary">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { createPinia } from 'pinia';
import { usePostsStore } from './store/usePostsStore';
import * as contentful from 'contentful';

const config = useRuntimeConfig()

const pinia = createPinia();
const nuxtApp = useNuxtApp()
nuxtApp.vueApp.use(pinia);

const store = usePostsStore()

//
// onMounted(async () => {
const contentfulClient = contentful.createClient({
  space: config.public.CONTENTFUL_SPACE_ID,
  accessToken: config.public.CONTENTFUL_ACCES_KEY,
})

//await useAsyncData('posts', () => store.fetchPosts(contentfulClient).then(() => true))
//await useAsyncData('cats', () => store.fetchCats())

//await store.fetchCats()
await store.fetchPosts(contentfulClient)
// })
</script>