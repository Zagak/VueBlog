import { useUserStore } from "~/stores/useUserStore";
import type { IComment } from "~/types/type";

//const config = useRuntimeConfig();

export async function showComments(postId: number | undefined) {
  const store = useUserStore();
  const accesToken = store.getAccesToken();
  const config = useRuntimeConfig();

  const data = await $fetch<any>(
    `${config.public.SERVER_URI}/api/v1/comment/data?postId=${postId}`,
    {
      //mode: "no-cors",
      headers: accesToken
        ? {
            Authorization: `Bearer ${accesToken}`, // Add the Authorization header
          }
        : {},
    }
  );
  const { nestedComments } = data;
  return nestedComments;
}

export async function editComment(
  newText: string,
  commentId: number
): Promise<string> {
  const store = useUserStore();
  const accesToken = store.getAccesToken();
  const config = useRuntimeConfig();

  const editedCommentText: string = await $fetch(
    `${config.public.SERVER_URI}/api/v1/comment/${commentId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accesToken}`, // Add the Authorization header
      },
      body: {
        newText,
      },
    }
  );

  return editedCommentText;
}

export async function deleteComment(commentId: number): Promise<void> {
  const store = useUserStore();
  const accesToken = store.getAccesToken();
  const config = useRuntimeConfig();

  await $fetch(`${config.public.SERVER_URI}/api/v1/comment/${commentId}`, {
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
  const store = useUserStore();
  const accesToken = store.getAccesToken();
  const config = useRuntimeConfig();

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
