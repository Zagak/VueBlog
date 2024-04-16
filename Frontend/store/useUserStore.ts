import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const accesTokenJWT = ref<string | null>(null);

  const getAccesToken = () => {
    if (!accesTokenJWT.value) {
      const token = localStorage.getItem("accesToken");
      accesTokenJWT.value = token;
    }
    return accesTokenJWT;
  };

  const setAccesToken = (accesToken: string) => {
    localStorage.setItem("accesToken", accesToken);
    accesTokenJWT.value = accesToken;
  };

  return { getAccesToken, setAccesToken };
});
