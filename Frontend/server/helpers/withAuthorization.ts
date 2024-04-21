import { H3Event } from "h3";
import { IComment } from "~/types/type";

const SERVER_URI = "http://localhost:5000";

const withAuthorization = (handler: (event: H3Event) => Promise<any>) => {
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

export default withAuthorization;