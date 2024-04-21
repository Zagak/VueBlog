import { useUserStore } from "~/store/useUserStore";
import type { IComment } from "~/types/type";

const SERVER_URI = "http://localhost:5000";
const store = useUserStore();

export async function showComments(postId: number | undefined) {
  const accesToken = store.getAccesToken();

  const { data } = await useAsyncData<any>("comments", () =>
    $fetch(`${SERVER_URI}/api/v1/comment/data?postId=${postId}`, {
      headers: {
        Authorization: `Bearer ${accesToken}`, // Add the Authorization header
      },
    })
  );
  const { nestedComments } = data.value;
  return nestedComments;
}

export async function editComment(
  newText: string,
  commentId: number
): Promise<string> {
  const accesToken = store.getAccesToken();

  const editedCommentText: string = await $fetch(`/api/comment/${commentId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accesToken}`, // Add the Authorization header
    },
    body: {
      newText,
    },
  });

  return editedCommentText;
}

export async function deleteComment(commentId: number): Promise<void> {
  const accesToken = store.getAccesToken();

  await $fetch(`/api/comment/${commentId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accesToken}`, // Add the Authorization header
    },
  });
}

export async function addComment(
  postId: number | undefined,
  text: String,
  CommentId: Number | null
): Promise<IComment> {
  const accesToken = store.getAccesToken();

  const newComment: IComment = await $fetch("/api/comment", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accesToken}`, // Add the Authorization header
    },
    body: {
      text: text,
      postId: postId,
      CommentId: CommentId,
    },
  });

  return newComment;
}
