<template>
  <div>
    <i class="fa-solid fa-asterisk text-3xl"></i>
    <h1 class="font-normal text-4xl italic">{{ props.title }}</h1>
    <p class="my-5">{{ props.description }}</p>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: String,
  description: String
})
</script>

<style></style>