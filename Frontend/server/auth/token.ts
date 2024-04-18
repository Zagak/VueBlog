const SERVER_URI = "http://localhost:5000";

export default defineEventHandler(async (event) => {
  console.log("obtinem new token");

  const newAccesToken = await $fetch(`${SERVER_URI}/api/v1/auth/token`, {
    credentials: "include",
    method: "GET",
    //headers: useRequestHeaders(['cookie']),
  });
  console.log("am obtinut token");
  return newAccesToken;
});
