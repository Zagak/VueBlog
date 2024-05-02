<template>
  <div class="bg-primary">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { usePostsStore } from './stores/usePostsStore';
//import { createClient } from 'contentful';

const { $contentfulClient } = useNuxtApp();

const store = usePostsStore()
// const contentfulClient = contentful.createClient({
//   space: config.public.CONTENTFUL_SPACE_ID,
//   accessToken: config.public.CONTENTFUL_ACCES_KEY,
// })
await store.fetchPosts($contentfulClient);

</script>
