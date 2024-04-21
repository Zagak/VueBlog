import { defineStore } from "pinia";
import type { IComment } from "~/types/type";

export const useUserStore = defineStore("user", () => {
  const accesTokenJWT = ref<string | null>(null);
  const commentIdToReply = ref(0);
  const commentIdToEdit = ref(0);

  ///
  let lastComment = 0;
  const lastCommentRef = ref(0);

  const getLastCommentRef = () => {
    return lastCommentRef;
  };

  const setLastCommentRef = (commentId: number) => {
    lastCommentRef.value = commentId;
  };

  const isLastComment = (cmt: IComment) => {
    if (lastComment !== cmt.parent_id) {
      lastComment = cmt.parent_id as number;
      return true;
    }
    return false;
  };

  //used ones down there , and up experimental

  const getAccesToken = () => {
    if (!accesTokenJWT.value) {
      const token = localStorage.getItem("accesToken");
      accesTokenJWT.value = token;
    }
    return accesTokenJWT.value;
  };

  const setAccesToken = (accesToken: string) => {
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

    isLastComment,
    setLastCommentRef,
    getLastCommentRef,
  };
});
