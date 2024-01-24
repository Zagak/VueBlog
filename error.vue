<template>
  <div class="py-40">
    <p class="font-bold text-8xl text-center">{{ props.error?.statusCode }}</p>
    <p class="my-10 text-center text-3xl">Oh , damn !</p>
    <button class="w-full text-xl border-r-2 bg-red-600 text-white p-5 hover:bg-red-700">
      <NuxtLink to="/">
        Get me outta here ASAP !
      </NuxtLink>
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  error: Object
})
</script>
