<template>
  <header class="menu-bg flex bg-primary">
    <NuxtLink class="flex" to="/">
      <NuxtImg src="/logo-site.png" title="BarefootShoesHub" sizes="40px md:60px" />
      <h1 class="text-3xl font-bold my-auto ml-5">BarefootShoesHub</h1>
    </NuxtLink>
    <nav class="space-x-5 my-auto mr-10 hidden sm:flex">
      <NuxtLink class="hover:underline font-semibold" v-for="item in menuItems" :to="item.path" :key="item.path">{{
        item.name }}</NuxtLink>
    </nav>
    <button class="sm:hidden" @click="showModal = true">
      <i class="fa-solid fa-bars"></i>
    </button>
  </header>
  <Teleport to="body">
    <Modal :show="showModal" @close="showModal = false" :menuItems="menuItems">
      <template #header>
        <h3>custom header</h3>
      </template>
    </Modal>
  </Teleport>
</template>

<script lang="ts" setup>

onMounted(() => {
  window.addEventListener('resize', () => { showModal.value = false })
})

const menuItems = [
  { "name": "Guides", "path": "/guides" },
  { "name": "Reviews", "path": "/reviews" },
  { "name": "About", "path": "/about" }
]

const showModal = ref(false);

</script>

<style></style>