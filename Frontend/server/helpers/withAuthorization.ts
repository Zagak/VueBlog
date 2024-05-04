import { H3Event } from "h3";

const config = useRuntimeConfig();

const withAuthorization = (handler: (event: H3Event) => Promise<any>) => {
  return defineEventHandler(async (event) => {
    try {
      // Perform actions before the original handler
      const result = await handler(event);
      // Perform actions after the original handler
      return result;
    } catch (error) {
      if (error.status === 401) {
        //return await $fetch("/auth/token");
        const newAccesToken = await $fetch(
          `${config.public.SERVER_URI}/api/v1/auth/token`,
          {
            credentials: "include",
            method: "GET",
            //headers: useRequestHeaders(["cookie"]),
          }
        );
        return newAccesToken;
      }
      // Handle the error appropriately
    }
  });
};

export default withAuthorization;
