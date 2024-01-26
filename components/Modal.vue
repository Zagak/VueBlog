<template>
  <Transition name="modal">
    <div v-if="show" class="z-999 fixed top-0 left-0 w-full h-full transition-opacity bg-white pt-10">
      <div class="float-right">
        <button class="text-2xl mb-10 centered ml-5" @click="$emit('close')">X</button>
        <nav class="space-y-5">
          <NuxtLink class="block hover:underline font-semibold mr-5" @click="$emit('close')"
            v-for="item in props.menuItems" :to="item.path" :key="item.path">{{
              item.name }}
          </NuxtLink>
        </nav>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
const props = defineProps({
  show: Boolean,
  menuItems: {
    type: Array as PropType<{ name: string; path: string }[]>,
    required: true,
  },
})
</script>

<style>
.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}
</style>