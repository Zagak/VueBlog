<template>
  <div class="p-5 bg-zinc-500 rounded-lg">
    <div class="flex justify-between">
      <p class="text-lg font-semibold">{{ $props.comment.name }}</p>
      <p class="text-sm">{{ useFormatDate($props.comment.createdAt) }}</p>
    </div>
    <p>{{ props.comment.text }}</p>
    <p class="flex flex-row-reverse text-lg font-bold text-slate-800 hover:underline cursor-pointer">Reply</p>
  </div>
  <div v-for="cmt in $props.comment.children" class="ml-10 my-3">
    <Comment :comment=cmt />
  </div>
</template>

<script lang="ts" setup>
import type { IComment } from '../types/type.js';

const props = defineProps<{
  comment: IComment;
}>();


</script>