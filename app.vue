<template>
  <div class="bg-primary">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { usePostsStore } from '../store/usePostsStore';
import * as contentful from 'contentful';

const config = useRuntimeConfig()
const contentfulClient = contentful.createClient({
  space: "bbbsu85qq7pj",//config.public.CONTENTFUL_SPACE_ID,
  accessToken: "KGVlTF0t-AfMsE2-jVv6fwdTAsFMjavXqIgdx9go6NY",//config.public.CONTENTFUL_ACCES_KEY,
})

onBeforeMount(async () => {
  const store = usePostsStore()
  await store.fetchPosts(contentfulClient)
})
</script>