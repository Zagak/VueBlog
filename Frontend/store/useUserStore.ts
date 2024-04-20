import { defineStore } from "pinia";
import type { IComment } from "~/types/type";

export const useUserStore = defineStore("user", () => {
  const accesTokenJWT = ref<string | null>(null);
  const commentIdToReply = ref(0);

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
    isLastComment,
    setLastCommentRef,
    getLastCommentRef,
  };
});
