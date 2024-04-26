import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const accesTokenJWT = ref<string | null>(null);
  const commentIdToReply = ref(0);
  const commentIdToEdit = ref(0);

  const getAccesToken = () => {
    if (import.meta.server) {
      return;
    }
    if (!accesTokenJWT.value) {
      const token = localStorage.getItem("accesToken");
      accesTokenJWT.value = token;
    }
    return accesTokenJWT.value;
  };

  const setAccesToken = (accesToken: string) => {
    if (import.meta.server) {
      return;
    }
    localStorage.setItem("accesToken", accesToken);
    accesTokenJWT.value = accesToken;
  };

  const setCommentIdToEdit = (commentId: number) => {
    commentIdToReply.value = 0;
    commentIdToEdit.value = commentId;
  };

  const getCommentIdToEdit = () => {
    return commentIdToEdit;
  };

  const setCommentIdToReply = (commentId: number) => {
    commentIdToEdit.value = 0;
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
    setCommentIdToEdit,
    getCommentIdToEdit,
  };
});
