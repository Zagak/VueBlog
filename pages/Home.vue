<template>
  <div class="text-center mt-20">
    <section>
      <div class="max-w-screen-md mx-auto">
        <h1 class="font-semibold text-4xl italic">Step into Freedom: Unleash Your Sole with Barefoot Bliss!</h1>
        <p class="mt-10">At Barefoot Shoes Hub, we’ve curated a haven of wisdom and expertise dedicated to liberating your
          feet. Discover
          the world of shoes that embrace your natural stride, where knowledge meets comfort, all at your fingertips.
        </p>
      </div>
      <div class="mx-20">
        <div class="my-20 mx-auto sm:max-w-screen-2xl overflow-hidden rounded-3xl">
          <NuxtPicture src="/bsh-1.webp" />
        </div>
      </div>
    </section>
    <section class="max-w-full px-20 py-20 bg-secondary">
      <Introduction title="A more natural feel"
        description="Allow your foot to step the way it was designed to by nature." />
      <div class="sm:inline-grid grid-cols-3 gap-10">
        <div class="mt-10 max-w-md text-left" v-for="feature in features" :key="feature.title">
          <i class="fa-solid fa-asterisk text-3xl "></i>
          <h1 class="font-semibold text-xl italic">{{ feature.title }}</h1>
          <p class="mt-5">{{ feature.description }}</p>
        </div>
      </div>
    </section>
    <section class="sm:max-w-screen-2xl mx-auto px-20 pt-20">
      <Introduction title="An array of resources to help you get started"
        description="Embark on a transformative journey to freedom, where empowerment guides your every step into a world of boundless liberation." />
      <ShortInformation title="Guides" image="/bsh-2.webp"
        :checks="['Learn about the benefits.', 'Discover the true shoes.', 'Find out how barefoot shoes can change your lifestyle.']" />
      <ShortInformation title="Reviews" image="/bsh-3.webp" image-first
        :checks="['Be aware of what to consider when choosing your pairs.', 'Made an informative decision.', 'Find the best shoes that suits your needs.']" />
    </section>
    <section>
      <h1 class="font-normal text-3xl mx-20 text-left">Last guides and reviews</h1>
      <ShowPosts class="sm:max-w-screen-2xl mx-auto px-20 pt-10" :number-of-elements="2" />
    </section>
  </div>
</template>

<script lang="ts" setup>
const features = [
  { "title": "Foot Health", "description": "Experience a footwear revolution that prioritizes foot health, promoting natural movement and minimizing the risk of common foot problems." },
  { "title": "Enhanced Balance and Stability", "description": "Step confidently with enhanced balance and stability with optimize proprioception for a sensory-rich experience and surefooted confidence." },
  { "title": "Muscle Strengthening", "description": "Unlock the power of stronger foot muscles, fostering natural strength and resilience for a foundation that supports your active lifestyle." },
  { "title": "Sensory Ground Connection", "description": "Feel the ground beneath your feet with thin-soled design, providing a sensory-rich connection to the earth and a more immersive walking or running experience." },
  { "title": "Optimal Posture & Alignment", "description": "Improve posture and alignment effortlessly as minimalist shoes encourage a natural gait, allowing your body to move the way it was designed." },
  { "title": "Stylish Performance Wear", "description": "Merge style with performance, designed not just for function but to complement your individual taste and elevate your fashion-forward, active lifestyle." }
]

import { usePostsStore } from '../store/usePostsStore';
import * as contentful from 'contentful';


const config = useRuntimeConfig()
const contentfulClient = contentful.createClient({
  space: config.public.CONTENTFUL_SPACE_ID,
  accessToken: config.public.CONTENTFUL_ACCES_KEY,
})

const store = usePostsStore()
await store.fetchPosts(contentfulClient)
</script>

<style></style>