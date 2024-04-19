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

    <Form :auth-type="authType" />
  </div>

  <div v-for="cmt in postComments" class="my-3">
    <Comment :comment="cmt" />
  </div>
</template>

<script lang="ts" setup>
import type { IComment } from '../types/type';
import Form from './Form.vue';
import { showComments, addComment } from '../requestHandlers/comments';

import { useUserStore } from "~/store/useUserStore"

const userStore = useUserStore();
const commentToShow = userStore.getLastCommentRef();

watch(commentToShow, (newValue, oldValue) => {
  console.log(`Count changed from ${oldValue} to ${newValue}`);
  // Additional logic to handle the change
  //Incearca sa faci un un nou array in locul lui postComments si lui ala sa-i dai slice in functie de deph level care vine de la Comment
});

const props = defineProps({
  postId: Number
});

const commentValue = ref("");

const authType = ref("logIn")
const setAuthType = (type: string) => {
  authType.value = type;
}

const accesToken = userStore.getAccesToken();

const postComments = ref(await showComments(props.postId));

// async function getNewAccesToken() {

//   const data = await $fetch(`http://localhost:5000/api/v1/auth/token`, {
//     credentials: "include",
//     method: "GET",
//     //headers: useRequestHeaders(['cookie']),
//   });
// }

const addNewComment = async () => {
  try {
    const newComment = await addComment(props.postId, commentValue.value, null)
    postComments.value.unshift(newComment);
    commentValue.value = "";

  }
  catch (err) {
    console.log(err);
  }

}

</script>
