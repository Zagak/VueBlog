<template>
  <Home />
</template>

<script setup>
import { createClient } from 'contentful';
import Home from '~/pages/Home.vue'

const config = useRuntimeConfig()

const contentfulClient = createClient({
  space: config.public.CONTENTFUL_SPACE_ID,
  accessToken: config.public.CONTENTFUL_ACCES_KEY,
})

const res = await contentfulClient.getEntries({ content_type: 'blogPost' })

console.log(res.items)



</script>