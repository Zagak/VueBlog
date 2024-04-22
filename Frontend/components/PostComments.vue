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
import { showComments, addComment } from '../requestHandlers/comments';

import { useUserStore } from "~/store/useUserStore"

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

const getAllComments = async () => {
  console.log("Comments displayed")
  accesToken.value = userStore.getAccesToken();
  try {
    postComments.value = await showComments(props.postId);
  } catch (err) {
    console.log(err)
  }
}
getAllComments();

console.log(postComments)
const visiblePostComments = ref<IComment[]>([]);

const commentToShow = userStore.getLastCommentRef();

// const visibleComments = (comments: IComment[], parentId: number | null = null): IComment[] => {
//   if (parentId === commentToShow.value) return null as unknown as IComment[];
//   return comments
//     .filter((comment) => comment.parent_id === parentId)
//     .map((comment) => ({
//       ...comment,
//       children: visibleComments(comments, comment.id),
//     }));
// };

watchEffect(() => {
  //console.log(`Count changed from ${oldValue} to ${newValue}`);
  console.log("been called")
  // Additional logic to handle the change
  //Incearca sa faci un un nou array in locul lui postComments si lui ala sa-i dai slice in functie de deph level care vine de la Comment
  //visiblePostComments.value = visibleComments(postComments.value);
  //visiblePostComments.value = visibleComments(postComments.value, null, 0, 2, 5);

  //console.log(visiblePostComments.value)
});

// async function getNewAccesToken() {

//   const data = await $fetch(`http://localhost:5000/api/v1/auth/token`, {
//     credentials: "include",
//     method: "GET",
//     //headers: useRequestHeaders(['cookie']),
//   });
// }

const addNewComment = async () => {
  try {
    const newComment: IComment = await addComment(props.postId, commentValue.value, null)
    newComment.editable = true;
    newComment.deleted = false;
    postComments.value.unshift(newComment);
    commentValue.value = "";

  }
  catch (err) {
    console.log(err);
  }

}

</script>
