<template>
  <div class="bg-primary">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { createClient } from 'contentful';
import { usePostsStore } from '../store/usePostsStore';

const config = useRuntimeConfig()
const contentfulClient = createClient({
  space: config.public.CONTENTFUL_SPACE_ID,
  accessToken: config.public.CONTENTFUL_ACCES_KEY,
})

const store = usePostsStore()
await store.fetchPosts(contentfulClient)

</script>