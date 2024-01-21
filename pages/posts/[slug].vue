<template>
  <div>

  </div>
</template>

<script lang="ts" setup>
import { createClient } from 'contentful';
import type { ContentSkeleton } from '~/types/type';
import { usePostsStore } from '~/store/usePostsStore';

const route = useRoute()
const config = useRuntimeConfig()
const contentfulClient = createClient({
  space: config.public.CONTENTFUL_SPACE_ID,
  accessToken: config.public.CONTENTFUL_ACCES_KEY,
})

const postDetails = usePostsStore().posts.find((post) => post.fields.slug === route.params.slug)
const postContent = await contentfulClient.getEntries<ContentSkeleton>({ content_type: 'content', "fields.slug[match]": route.params.slug.toString() }) //route.params.slug.toString()
console.log(postContent)
console.log(postDetails)
</script>

<style></style>