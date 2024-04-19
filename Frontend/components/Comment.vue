<template>
  <button v-if="showButtonDown()" class="text-cyan-900 text-lg" @click="seeMoreReplies">
    See more replies ...
  </button>
  <div v-show="isLevelDepthInRange()">
    <div class="p-5 bg-zinc-500 rounded-lg">
      <div class="flex justify-between">
        <p class="text-lg font-semibold">{{ $props.comment.name }}</p>
        <p class="text-sm">{{ useFormatDate($props.comment.createdAt) }}</p>
      </div>
      <p>{{ props.comment.text }}</p>
      <p class="flex flex-row-reverse text-lg font-bold text-slate-800 hover:underline cursor-pointer"
        @click="openReplyBox">Reply</p>
    </div>
    <div v-if="commentIdToReply === props.comment.id" class="border-black border-2 rounded-md mt-1 bg-white">
      <textarea rows="4" cols="50" class="w-full h-24 p-3 rounded-lg max-w-2xl max-h-30 resize-none focus:outline-none"
        :placeholder=commentPlaceholder v-model="commentValue" />
      <div class="flex justify-between mb-5">
        <button class="ml-5 text-red-600 hover:underline" @click="closeReply">Close</button>
        <button class="mr-10 text-green-600 hover:underline" @click="replyToComment">Send</button>
      </div>
    </div>
  </div>
  <div v-for="cmt in $props.comment.children" :class="{ 'ml-10': isLevelDepthInRange(), 'my-3': true }">
    <Comment :comment=cmt />
  </div>
</template>

<script lang="ts" setup>
//:class="{ 'ml-10': !isLevelDepthInRange(), 'my-3': true }"
import type { IComment } from '../types/type.js';
import { addComment } from '~/requestHandlers/comments.js';
import { useUserStore } from '../store/useUserStore.js'

const props = defineProps<{
  comment: IComment;
}>();
const userStore = useUserStore();

const commentValue = ref("");
const commentPlaceholder = `Reply to ${props.comment.name} ...`;
const commentIdToReply = userStore.getCommentIdToReply();

const commentSection = ref(0);
const levelDepthPass = 3;

const showButtonDown = () =>{
  const isFirstChild = userStore.isLastComment(props.comment)
  return (props.comment.level == (levelDepthPass * (commentSection.value + 1))+1)
    &&isFirstChild;
}

const seeMoreReplies = () =>{
  commentSection.value++;
  userStore.setLastCommentRef(props.comment.parent_id);
  console.log( commentSection.value)
}

const isLevelDepthInRange = () => {
 //return true
  return props.comment.level >= levelDepthPass*commentSection.value
    && props.comment.level <=  levelDepthPass*(commentSection.value + 1) ;
}

const openReplyBox = () => {
  userStore.setCommentIdToReply(props.comment.id);
  console.log(props.comment.level)
}

const closeReply = () => {
  userStore.setCommentIdToReply(0);
  commentValue.value = "";
}

const replyToComment = async () => {
  const replyComment = await addComment(props.comment.postId, commentValue.value, props.comment.id)
  if (!replyComment) {
    closeReply();
    return
  }
  if (!props.comment.children) {
    props.comment.children = [];
  }
  props.comment.children.unshift(replyComment);
  if (!props.comment.children[0].level) props.comment.children[0].level = props.comment.level + 1
  closeReply();
}

</script>