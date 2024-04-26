const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  console.log("obtinem new token");

  const newAccesToken = await $fetch(
    `${config.public.SERVER_URI}/api/v1/auth/token`,
    {
      credentials: "include",
      method: "GET",
      //headers: useRequestHeaders(['cookie']),
    }
  );
  console.log("am obtinut token");
  return newAccesToken;
});
