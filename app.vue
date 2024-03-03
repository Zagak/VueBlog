<template>
  <div v-if="isLoading">
    Loading ...
  </div>
  <div v-else class="bg-primary">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<!-- await useAsyncData(
  'mountains',
  () => store.fetchPosts(contentfulClient)
) -->

<script setup>
import { usePostsStore } from '../store/usePostsStore';
import * as contentful from 'contentful';

const config = useRuntimeConfig()
let isLoading = true;

// onMounted(async () => {
const contentfulClient = contentful.createClient({
  space: config.public.CONTENTFUL_SPACE_ID,
  accessToken: config.public.CONTENTFUL_ACCES_KEY,
})

const store = usePostsStore()

try {
  await store.fetchPosts(contentfulClient)
} catch (err) {
  console.error('Error fetching data:', error);
} finally {
  isLoading = false
}

// })
</script>