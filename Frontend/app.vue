<template>
  <div class="bg-primary">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { usePostsStore } from './stores/usePostsStore';
import * as contentful from 'contentful';

const config = useRuntimeConfig()
const store = usePostsStore()

const contentfulClient = contentful.createClient({
  space: config.public.CONTENTFUL_SPACE_ID,
  accessToken: config.public.CONTENTFUL_ACCES_KEY,
})

//await useAsyncData('posts', () => store.fetchPosts(contentfulClient).then(() => true))

await getCMScomments(contentfulClient);

//await store.fetchPosts(contentfulClient)

</script>
