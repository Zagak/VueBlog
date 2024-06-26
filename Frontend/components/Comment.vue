<template>
  <section v-if="commentIdToEdit !== props.comment.id" class="p-5 bg-zinc-300 rounded-lg">
    <div class="flex justify-between">
      <p class="text-lg font-semibold">{{ $props.comment.name }}</p>
      <p class="text-sm">{{ useFormatDate($props.comment.createdAt) }}</p>
    </div>
    <p v-if="props.comment.deleted" class="text-red-700">This comment has been deleted</p>
    <p v-else>{{ props.comment.text }}</p>
    <div class="flex justify-between pt-3">
      <div v-if="props.comment.editable" class="space-x-5">
        <button @click="deleteYourComment">
          <i class="fa-solid fa-trash-can text-red-600"></i>
        </button>
        <button @click="openEditBox">
          <i class="fa-regular fa-pen-to-square text-green-600"></i>
        </button>
      </div>
      <div v-else />
      <p class="text-xl font-bold text-slate-800 hover:underline cursor-pointer" @click="openReplyBox">Reply</p>
    </div>
  </section>
  <section v-else v-show="commentIdToEdit === props.comment.id" class="border-black border-2 rounded-md mt-1 bg-white">
    <textarea rows="4" cols="50" class="w-full h-24 p-3 rounded-lg max-w-2xl max-h-30 resize-none focus:outline-none"
      v-model="commentValue" />
    <div class="flex justify-between mb-5">
      <button class="ml-5 text-red-600 hover:underline" @click="closeEdit">Cancel</button>
      <button class="mr-10 text-green-600 hover:underline" @click="editYourComment">Edit</button>
    </div>
  </section>
  <section v-if="commentIdToReply === props.comment.id" class="border-black border-2 rounded-md mt-1 bg-white">
    <textarea rows="4" cols="50" class="w-full h-24 p-3 rounded-lg max-w-2xl max-h-30 resize-none focus:outline-none"
      :placeholder=commentPlaceholder v-model="commentValue" />
    <div class="flex justify-between mb-5">
      <button class="ml-5 text-red-600 hover:underline" @click="closeReply">Close</button>
      <button class="mr-10 text-green-600 hover:underline" @click="replyToComment">Send</button>
    </div>
  </section>

  <div v-for="cmt in $props.comment.children" class="ml-10 my-3">
    <Comment :comment=cmt />
  </div>
</template>

<script lang="ts" setup>

import type { IComment } from '../types/type.js';
import { useUserStore } from '../stores/useUserStore.js'

const props = defineProps<{
  comment: IComment;
}>();
const userStore = useUserStore();

const commentValue = ref("");
const commentPlaceholder = `Reply to ${props.comment.name} ...`;
const commentIdToReply = userStore.getCommentIdToReply();
const commentIdToEdit = userStore.getCommentIdToEdit();

const openEditBox = () => {
  userStore.setCommentIdToEdit(props.comment.id)
  commentValue.value = props.comment.text;
}

const openReplyBox = () => {
  userStore.setCommentIdToReply(props.comment.id);
  commentValue.value = "";
}

const closeEdit = () => {
  userStore.setCommentIdToEdit(0);
  commentValue.value = "";
}

const closeReply = () => {
  userStore.setCommentIdToReply(0);
  commentValue.value = "";
}

const deleteYourComment = async () => {
  await deleteComment(props.comment.id);
  props.comment.deleted = true;
}

const editYourComment = async () => {
  const editedCommentText: string = await editComment(commentValue.value, props.comment.id);
  if (!editedCommentText) {
    closeReply();
    return
  }
  //commentDummyText.value = commentValue.value;
  props.comment.text = editedCommentText;
  closeReply();
}

const replyToComment = async () => {
  const replyComment: IComment = await addComment(props.comment.postId, commentValue.value, props.comment.id)
  if (!replyComment) {
    closeReply();
    return
  }
  if (!props.comment.children) {
    props.comment.children = [];
  }
  replyComment.editable = true;
  props.comment.children.unshift(replyComment);
  if (!props.comment.children[0].level) props.comment.children[0].level = props.comment.level + 1
  closeReply();
}

</script>