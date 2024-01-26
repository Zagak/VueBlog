<template>
  <div class="flex justify-between">
    <button class="before:content-['\2190'] hover:underline" v-if="prevPost">
      <NuxtLink :to="'/posts/' + prevPost?.fields.slug">Previous: {{ prevPost?.fields.title }}</NuxtLink>
    </button>
    <button class="after:content-['\2192'] hover:underline" v-if="nextPost">
      <NuxtLink :to="'/posts/' + nextPost?.fields.slug">Next: {{ nextPost?.fields.title }}</NuxtLink>
    </button>
  </div>
</template>

<script lang="ts" setup>
import type { Entry } from "contentful";
import { usePostsStore } from "~/store/usePostsStore";
import type { PostSkeleton } from "~/types/type";

const props = defineProps({
  slug: String
})

const store = usePostsStore();
const posts: Entry<PostSkeleton>[] = store.posts

const currentPostIndex = posts.findIndex((post) => post.fields.slug === props.slug)

const prevPost = currentPostIndex > 0 ? posts.at(currentPostIndex - 1) : undefined
const nextPost = posts.at(currentPostIndex + 1)

</script>

<style></style>