import { defineEventHandler, readBody, H3Event, EventHandlerRequest } from "h3";
import { IComment } from "~/types/type";
import withAuthorization from "../../helpers/withAuthorization";

const config = useRuntimeConfig();

// Define your original event handler
const addCommentHandler = async (event: H3Event): Promise<IComment> => {
  // Your logic to add a comment
  const { text, postId, CommentId } = await readBody(event);

  const cookieHeader = event.node.req.headers.cookie;
  const authorizationHeader = event.node.req.headers.authorization;

  const newComment = await $fetch(
    `${config.public.SERVER_URI}/api/v1/comment`,
    {
      method: "POST",
      headers: {
        //...(cookieHeader ? { cookie: cookieHeader } : {}),
        ...(authorizationHeader ? { Authorization: authorizationHeader } : {}),
      },
      body: {
        text,
        postId,
        CommentId,
      },
    }
  );

  return newComment as IComment;
};

export default withAuthorization(addCommentHandler);
