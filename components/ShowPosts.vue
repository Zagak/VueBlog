<template>
  <div class="mx-20">
    <h1 class="font-normal text-3xl mb-10 text-left">{{ props.title }}</h1>
    <ul>
      <li v-for="post in pagesPosts" :key="post.sys.id">
        <div class="text-left py-5 sm:flex border-t-2 border-black">
          <NuxtLink class=" text-left sm:w-3/4 font-normal text-xl" :to="post.fields.slug">{{ post.fields.title }}
          </NuxtLink>
          <p class=" text-left sm:w-1/4 sm:ml-10 mt-5 sm:mt-0">{{ formatDate(post.fields.dateOfPosting.toString()) }} -
            by <b>{{ post.fields.author }}</b> in <b>{{ post.fields.category.fields.name }}</b></p>
        </div>
      </li>
    </ul>
    <div class="flex">
      <p v-for="number in range(1, pages)" :key="number" class="mr-5 text-xl hover:underline hover:cursor-pointer"
        @click="selectPage(number)">
        {{ number }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { usePostsStore } from "~/store/usePostsStore"
import type { Entry } from 'contentful';
import type { PostSkeleton } from '~/types/type';

const props = defineProps({
  title: String,
  category: String,
  numberOfElements: {
    type: Number,
    default: 10
  },
})

const store = usePostsStore()
let posts: Entry<PostSkeleton>[];
let pages: number = 1;
let selectedPage = 1;

if (props.category === "guides") posts = store.getGuidesPosts
else if (props.category === "reviews") posts = store.getReviewsPosts
else posts = store.posts

pages = Math.floor((posts.length / (props.numberOfElements + 1) + 1))

const pagesPosts = ref(posts.slice((props.numberOfElements * (selectedPage - 1)), (props.numberOfElements * selectedPage)))

const selectPage = (pageNumber: number) => {
  selectedPage = pageNumber
  pagesPosts.value = posts.slice((props.numberOfElements * (selectedPage - 1)), (props.numberOfElements * selectedPage))
  console.log(pageNumber)
  console.log(pagesPosts.value)
}

const formatDate = (date: string): string => {
  const parsedDate = new Date(date);

  const formattedDate = parsedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return formattedDate;
}

const range = (start: number, end: number) => {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

</script>

<style></style>