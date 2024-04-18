import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const accesTokenJWT = ref<string | null>(null);
  const commentIdToReply = ref(0);

  const getAccesToken = () => {
    if (!accesTokenJWT.value) {
      const token = localStorage.getItem("accesToken");
      accesTokenJWT.value = token;
    }
    return accesTokenJWT;
  };

  const setAccesToken = (accesToken: string) => {
    localStorage.setItem("accesToken", accesToken);
    accesTokenJWT.value = accesToken;
  };

  const setCommentIdToReply = (commentId: number) => {
    commentIdToReply.value = commentId;
  };

  const getCommentIdToReply = () => {
    return commentIdToReply;
  };

  return {
    getAccesToken,
    setAccesToken,
    setCommentIdToReply,
    getCommentIdToReply,
  };
});
