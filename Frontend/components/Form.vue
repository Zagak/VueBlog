<template>
  <div class="mb-10 bg-gray-200 px-5 border border-black p-10">
    <form @submit.prevent="submitForm" class="w-full flex flex-col sm:flex-row space-x-5 ">
      <div v-if="authType === 'register'" class="mb-4">
        <label for="name" class="block text-gray-700 text-sm font-bold mb-2">
          Name
        </label>
        <input type="text" id="name" v-model="form.name" placeholder="Enter name"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required />
      </div>

      <div class="mb-4">
        <label for="email" class="block text-gray-700 text-sm font-bold mb-2">
          Email
        </label>
        <input type="text" id="email" v-model="form.email" placeholder="Enter email"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required />
      </div>

      <div class="mb-4">
        <label for="password" class="block text-gray-700 text-sm font-bold mb-2">
          Password
        </label>
        <input type="text" id="password" v-model="form.password" placeholder="Enter password"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required />
      </div>

      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit">
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "~/store/useUserStore"
import { logInUser, registerUser } from "~/requestHandlers/authentification";

const userStore = useUserStore();

const props = defineProps({
  authType: String
});

const SERVER_URI = "http://localhost:5000";
const form = {
  name: "",
  email: "",
  password: ""
}

const submitForm = async () => {
  if (props.authType === "logIn") {
    await logInUser(form.email, form.password);
  } else if (props.authType === "register") {
    await registerUser(form.name, form.email, form.password);
  }
}

</script>
