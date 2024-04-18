import { defineEventHandler, readBody } from "h3";

const SERVER_URI = "http://localhost:5000";

export default defineEventHandler(async (event) => {
  console.log("S-a apelat din server folder");

  const { text, postId, CommentId } = await readBody(event);

  const cookieHeader = event.node.req.headers.cookie;
  const authorizationHeader = event.node.req.headers.authorization;

  const newComment = await $fetch(`${SERVER_URI}/api/v1/comment`, {
    method: "POST",
    headers: {
      ...(cookieHeader ? { cookie: cookieHeader } : {}), // Include the cookie header if it exists
      ...(authorizationHeader ? { Authorization: authorizationHeader } : {}),
    },
    body: {
      text,
      postId,
      CommentId,
    },
  });

  return newComment;
});
