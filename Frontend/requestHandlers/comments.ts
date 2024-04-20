import { useUserStore } from "~/store/useUserStore";

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

export async function addComment(
  postId: number | undefined,
  text: String,
  CommentId: Number | null
) {
  const accesToken = store.getAccesToken();

  const newComment = await $fetch("/api/comment", {
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
