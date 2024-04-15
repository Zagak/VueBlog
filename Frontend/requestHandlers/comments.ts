import { useUserStore } from "~/store/useUserStore";

const SERVER_URI = "http://localhost:5000";
const store = useUserStore();

export async function showComments(postId: number | undefined) {
  const { data } = await useAsyncData<any>("comments", () =>
    $fetch(`${SERVER_URI}/api/v1/comment/data?postId=${postId}`)
  );
  const { nestedComments } = data.value;
  return nestedComments;
}

export async function addComment(
  postId: number | undefined,
  text: String,
  CommentId: Number | null,
  postComments: any
) {
  const accesToken = store.getAccesToken();

  const newComment = await $fetch(`${SERVER_URI}/api/v1/comment`, {
    method: "POST",
    headers: {
      ...useRequestHeaders(["cookie"]), // Spread the cookie header(s)
      Authorization: `Bearer ${accesToken}`, // Add the Authorization header
    },
    body: {
      text: text,
      postId: postId,
      CommentId: CommentId,
    },
  });
  //console.log(postComments.value)
  postComments.value.push(newComment);
  console.log(postComments.value);
  //return newComment;
}
