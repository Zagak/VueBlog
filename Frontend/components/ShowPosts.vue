<template>
  <div class="mx-20">
    <ul>
      <li v-for="post in pagesPosts" :key="post.sys.id">
        <div class="text-left py-5 sm:flex border-t-2 border-black">
          <NuxtLink class=" text-left sm:w-3/4 font-normal text-xl" :to="'/posts/' + post.fields.slug">{{
            post.fields.title
          }}
          </NuxtLink>
          <p class=" text-left sm:w-1/4 sm:ml-10 mt-5 sm:mt-0">{{ useFormatDate(post.fields.dateOfPosting.toString()) }}
            -
            by <b>{{ post.fields.author }}</b> in
            <NuxtLink :to="'/' + post.fields.category.toString().toLowerCase()" class="hover:underline">
              <b>{{ post.fields.category }}</b>
            </NuxtLink>
          </p>
        </div>
      </li>
    </ul>
    <div class="flex justify-between text-xl">
      <button @click="selectPage(selectedPage - 1)" class="before:content-['\2190'] hover:underline">Prev</button>
      <div class="flex">
        <p v-for="number in range(1, pages)" :key="number" :class="{ 'font-bold': number === selectedPage }"
          class="mx-2 hover:underline hover:cursor-pointer" @click="selectPage(number)">
          {{ number }}
        </p>
      </div>
      <button @click="selectPage(selectedPage + 1)" class="after:content-['\2192'] hover:underline">Next</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { usePostsStore } from "~/stores/usePostsStore"
import type { Entry } from 'contentful';
import type { PostSkeleton } from '~/types/type';



const props = defineProps({
  category: String,
  numberOfElements: {
    type: Number,
    default: 10
  },
})

const store = usePostsStore()
let posts: Entry<PostSkeleton>[] = store.getAllPosts();

let pages: number;
const selectedPage = ref(1);

console.log(store.posts)
onMounted(() => {
  console.log(store.posts)
})
pages = Math.floor((posts.length / (props.numberOfElements + 1) + 1))

const pagesPosts = computed(() => {
  return posts.slice((props.numberOfElements * (selectedPage.value - 1)), (props.numberOfElements * selectedPage.value));
});

//console.log(pagesPosts.value)
const selectPage = (pageNumber: number) => {
  if (pageNumber <= 0 || pageNumber > pages) return

  selectedPage.value = pageNumber
}

const range = (start: number, end: number) => {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

</script>

<style></style>