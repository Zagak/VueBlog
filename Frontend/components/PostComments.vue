<template>
  <div v-if="accesToken" class="flex space-x-4">
    <textarea rows="4" cols="50" class="w-full h-24 p-3 rounded-lg border-black border-2 max-w-2xl max-h-20"
      placeholder="Write a comment ..." v-model="commentValue" />
    <button class=" bg-slate-600 w-24 h-12 ml-auto self-center" @click="addNewComment">
      <p class="text-white">Post</p>
    </button>
  </div>
  <div v-else>
    <p>Need to be logged in to post comments</p>
    <div class="flex justify-center mt-5 ">
      <p @click="setAuthType('logIn')"
        class="border border-b-0 border-black p-2 w-24 text-center bg-gray-200 hover:cursor-pointer">
        LogIn
      </p>
      <p @click="setAuthType('register')"
        class="border border-b-0 border-black p-2 w-24 text-center bg-gray-200 hover:cursor-pointer">
        Register</p>
    </div>

    <Form :auth-type="authType" @user-authenticated="getAllComments" />
  </div>

  <div v-for="cmt in postComments" class="my-3">
    <Comment :comment="cmt" />
  </div>
</template>

<script lang="ts" setup>
import type { IComment } from '../types/type';
import Form from './Form.vue';

import { useUserStore } from "~/stores/useUserStore"

const userStore = useUserStore();

const props = defineProps({
  postId: Number
});

const commentValue = ref("");
const postComments = ref<IComment[]>([])

const authType = ref("logIn")
const setAuthType = (type: string) => {
  authType.value = type;
}

const accesToken = ref<string | null>("");

const getAccesToken = async () => {
  await getNewAccesToken();
}

const getAllComments = async () => {
  console.log("Comments displayed")
  accesToken.value = userStore.getAccesToken();
  try {
    postComments.value = await showComments(props.postId);
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  await getAllComments();
})

const addNewComment = async () => {
  try {
    const newComment: IComment = await addComment(props.postId, commentValue.value, null)
    newComment.editable = true;

    console.log(newComment.editable)
    postComments.value.unshift(newComment);
    commentValue.value = "";

  }
  catch (err) {
    console.log(err);
  }

}

</script>
