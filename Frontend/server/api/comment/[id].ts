const SERVER_URI = "http://localhost:5000";
import { H3Event, EventHandlerRequest } from "h3";
import withAuthorization from "../../helpers/withAuthorization";

const deleteCommentHandler = async (
  event: H3Event<EventHandlerRequest>
): Promise<void> => {
  const commentId = event?.context?.params?.id;
  const authorizationHeader = event.node.req.headers.authorization;

  await $fetch(`${SERVER_URI}/api/v1/comment/${commentId}`, {
    method: "DELETE",
    headers: {
      ...(authorizationHeader ? { Authorization: authorizationHeader } : {}),
    },
  });
};

const editCommentHandler = async (
  event: H3Event<EventHandlerRequest>
): Promise<string> => {
  const newText = await readBody(event);
  const commentId = event?.context?.params?.id;
  const authorizationHeader = event.node.req.headers.authorization;

  const editedCommentText: string = await $fetch(
    `${SERVER_URI}/api/v1/comment/${commentId}`,
    {
      method: "PATCH",
      headers: {
        ...(authorizationHeader ? { Authorization: authorizationHeader } : {}),
      },
      body: {
        newText,
      },
    }
  );

  return editedCommentText;
};

export default {
  DELETE: withAuthorization(deleteCommentHandler),
  PATCH: withAuthorization(editCommentHandler),
};
