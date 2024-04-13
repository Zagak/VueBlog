<template>
  <textarea rows="4" cols="50" class="w-full h-24 p-3 rounded-lg border-black border-2"
    placeholder="Write a comment ..." />

  <button class=" bg-slate-600 w-24 h-12" @click="">
    <p class="text-white">Post</p>
  </button>

  <div v-for="cmt in postComments" class="my-3">
    <Comment :comment="cmt" />
  </div>
</template>

<script lang="ts" setup>
import type { IComment } from '../types/type';

const props = defineProps({
  postId: Number
});

async function showComments() {
  const { data } = await useAsyncData<any>('comments', () => $fetch(`http://localhost:5000/api/v1/comment/data?postId=${props.postId}`));
  const { nestedComments } = data.value
  return nestedComments;
}
const postComments: Array<IComment> = await showComments();

// async function addComment() {
//   const { data } = await useAsyncData<any>('comments', () => $fetch(`http://localhost:5000/api/v1/comment/data?postId=${props.postId}`));
//   const { nestedComments } = data.value
//   return nestedComments;
// }

// function addComponentToDiv(divElement) {
//   const vnode = createVNode(MyComponent, { propValue: 'some value' });
//   render(vnode, divElement);
// }
</script>
