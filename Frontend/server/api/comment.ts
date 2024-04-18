import { defineEventHandler, readBody } from "h3";

const SERVER_URI = "http://localhost:5000";

// Define your original event handler
const addCommentHandler = async (event) => {
  // Your logic to add a comment
  console.log("S-a apelat din server folder");

  const { text, postId, CommentId } = await readBody(event);

  const cookieHeader = event.node.req.headers.cookie;
  const authorizationHeader = event.node.req.headers.authorization;

  const newComment = await $fetch(`${SERVER_URI}/api/v1/comment`, {
    method: "POST",
    headers: {
      ...(cookieHeader ? { cookie: cookieHeader } : {}),
      ...(authorizationHeader ? { Authorization: authorizationHeader } : {}),
    },
    body: {
      text,
      postId,
      CommentId,
    },
  });

  return newComment;
};

// Define the wrapResponse function
const wrapResponse = (handler) => {
  return defineEventHandler(async (event) => {
    try {
      // Perform actions before the original handler
      const result = await handler(event);
      // Perform actions after the original handler
      return result;
    } catch (error) {
      console.log(error.status);
      if (error.status === 401) {
        //return await $fetch("/auth/token");
        const newAccesToken = await $fetch(`${SERVER_URI}/api/v1/auth/token`, {
          credentials: "include",
          method: "GET",
          //headers: useRequestHeaders(["cookie"]),
        });
        console.log("am obtinut token");
        return newAccesToken;
      }
      console.log(error);
      // Handle the error appropriately
    }
  });
};

// Wrap your original event handler with wrapResponse
export default wrapResponse(addCommentHandler);
