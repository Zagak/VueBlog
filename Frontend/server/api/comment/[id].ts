import { H3Event, EventHandlerRequest } from "h3";
import withAuthorization from "../../helpers/withAuthorization";

const config = useRuntimeConfig();

const deleteCommentHandler = async (
  event: H3Event<EventHandlerRequest>
): Promise<void> => {
  const commentId = event?.context?.params?.id;
  const authorizationHeader = event.node.req.headers.authorization;

  await $fetch(`${config.public.SERVER_URI}/api/v1/comment/${commentId}`, {
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
    `${config.public.SERVER_URI}/api/v1/comment/${commentId}`,
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

const commentHandler = async (
  event: H3Event<EventHandlerRequest>
): Promise<void> => {
  if (event.node.req.method === "PATCH") {
    await editCommentHandler(event);
    console.log("editam");
  } else if (event.node.req.method === "DELETE") {
    await deleteCommentHandler(event);
    console.log("stergem");
  }
};

export default withAuthorization(commentHandler);
