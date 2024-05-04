const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const newAccesToken = await $fetch(
    `${config.public.SERVER_URI}/api/v1/auth/token`,
    {
      credentials: "include",
      method: "GET",
      //headers: useRequestHeaders(['cookie']),
    }
  );
  return newAccesToken;
});
