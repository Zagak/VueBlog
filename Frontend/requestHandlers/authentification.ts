import { useUserStore } from "~/store/useUserStore";

const SERVER_URI = "http://localhost:5000";
const userStore = useUserStore();

export async function logInUser(email: string, password: string) {
  const { accesToken } = await $fetch<{ accesToken: string }>(
    `${SERVER_URI}/api/v1/auth/login`,
    {
      method: "POST",
      body: {
        email: email,
        password: password,
      },
    }
  );
  userStore.setAccesToken(accesToken);
}

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  const { accesToken } = await $fetch<{ accesToken: string }>(
    `${SERVER_URI}/api/v1/auth/register`,
    {
      method: "POST",
      body: {
        name: name,
        email: email,
        password: password,
      },
    }
  );
  userStore.setAccesToken(accesToken);
}

export async function getNewAccesToken() {
  const { data } = await useAsyncData<any>("token", () =>
    $fetch(`${SERVER_URI}/api/v1/auth/token`, {
      credentials: "include",
      method: "GET",
      //headers: useRequestHeaders(['cookie']),
    })
  );
}