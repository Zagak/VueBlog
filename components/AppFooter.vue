<template>
  <footer class="menu-bg sm:flex">
    <div class="space-y-4">
      <NuxtImg src="/logo-site.png" title="BarefootShoesHub" sizes="40px" />
      <p class="text-xl font-semibold my-auto">BarefootShoesHub</p>
      <p class="max-w-80 text-stone-500">Step into Freedom: Unleash Your Sole with Barefoot Bliss!</p>
    </div>
    <nav class="my-auto mr-10 space-y-2 mt-10 sm:mt-0">
      <p class="font-bold">Privacy</p>
      <NuxtLink class="hover:underline font-semibold block" v-for="item in menuItems" :to="item.path" :key="item.path">{{
        item.name }}</NuxtLink>
    </nav>
  </footer>
</template>

<script lang="ts" setup>
const menuItems = [
  { "name": "Terms and Conditions", "path": "/t%26c" },
  { "name": "Privacy", "path": "/privacy" },
  { "name": "Contact", "path": "/contact" }
]
</script>

<style></style>