<template>
  <div class="sm:flex my-20 sm:space-x-20"
    :class="{ 'sm:flex-row-reverse': props.imageFirst, 'sm:space-x-reverse': props.imageFirst }">
    <div class="text-left space-y-4 my-auto sm:w-1/2 ">
      <i class="fa-solid fa-asterisk text-3xl"></i>
      <h1 class="font-semibold text-xl italic ">{{ title }}</h1>
      <ul class="space-y-2">
        <li v-for="check in checks" :key="check" class="before:content-['\2713'] text-lg">{{ check }}</li>
      </ul>
    </div>
    <div class=" mt-10 sm:mt-0 sm:w-1/2">
      <!-- de ce NuxtPicture este broken ?-->
      <NuxtImg :src="props.image" class="rounded-3xl" />
    </div>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps({
  title: String,
  image: String,
  imageFirst: {
    type: Boolean,
    default: false
  },
  checks: {
    type: Array<string>,
    required: true,
  },
})
</script>

<style></style>