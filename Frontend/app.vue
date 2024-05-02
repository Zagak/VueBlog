<template>
  <div class="bg-primary">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { usePostsStore } from './stores/usePostsStore';
//import { createClient } from "contentful";
const { $contentfulClient } = useNuxtApp();

const config = useRuntimeConfig()
const store = usePostsStore()

// const contentfulClient = createClient({
//   space: "bbbsu85qq7pj",//config.public.CONTENTFUL_SPACE_ID,
//   accessToken: "KGVlTF0t-AfMsE2-jVv6fwdTAsFMjavXqIgdx9go6NY"//config.public.CONTENTFUL_ACCES_KEY,
// })

//await useAsyncData('posts', () => store.fetchPosts())

await store.fetchPosts($contentfulClient);

</script>
