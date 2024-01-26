<template>
  <div class="max-w-screen-sm mx-auto my-40">
    <h1 class="text-left font-normal text-5xl mb-5">{{ title }}</h1>
    <p class="mb-20">{{ useFormatDate(dateOfPosting) }} - by {{ author }} in {{ category }}</p>
    <NuxtImg class="mx-auto my-5" :src="'https:' + featuredImage.fields.file.url"
      :width="featuredImage.fields.file.details.image.width" :height="featuredImage.fields.file.details.image.height" />
    <!-- <div v-html="documentToHtmlString(fullPost)" /> -->
    <RichTextRenderer :document="fullPost" :markRenderers="renderMarks()" :nodeRenderers="renderNodes()" />
    <PostsNavigator :slug="slug" class="py-40 my-40 border-t-2 border-black" />
  </div>
</template>

<script lang="ts" setup>
//import { createClient } from 'contentful';
import * as contentful from 'contentful';

import type { ContentSkeleton } from '~/types/type';
import { usePostsStore } from '~/store/usePostsStore';
import RichTextRenderer from 'contentful-rich-text-vue-renderer';
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import type { Hyperlink, Paragraph, Heading2, ListItem, AssetHyperlink } from '@contentful/rich-text-types';

function renderMarks() {
  return {
    [MARKS.BOLD]: (text: string, key: string) => h('strong', { key }, text),
    [MARKS.UNDERLINE]: (text: string, key: string) => h('h3', { key, class: 'text-4xl' }, text),
  };
}

function renderNodes() {
  return {
    [BLOCKS.PARAGRAPH]: (node: Paragraph, key: string, next: Function) => {
      return h('p', { key, class: 'my-6' }, next(node.content, key, next));
    },
    [BLOCKS.HEADING_2]: (node: Heading2, key: string, next: Function) => {
      return h('h2', { key, class: 'text-4xl' }, next(node.content, key, next));
    },
    [BLOCKS.HEADING_3]: (node: Heading2, key: string, next: Function) => {
      return h('h3', { key, class: 'text-3xl' }, next(node.content, key, next));
    },
    [BLOCKS.HEADING_4]: (node: Heading2, key: string, next: Function) => {
      return h('h3', { key, class: 'text-2xl' }, next(node.content, key, next));
    },
    [BLOCKS.LIST_ITEM]: (node: ListItem, key: string, next: Function) => {
      return h('li', { key, class: 'list-disc ml-5 my-0' }, next(node.content, key, next));
    },
    [BLOCKS.EMBEDDED_ASSET]: (node: AssetHyperlink, key: string, next: Function) => {
      const src = node.data.target.fields.file.url
      return h('img', { key, src, class: 'my-6' }, next(node.content, key, next));
    },
    [INLINES.HYPERLINK]: (node: Hyperlink, key: string, next: Function) => {
      const href = node.data.uri
      return h('a', { key, href, class: 'underline inline ' }, next(node.content, key, next));
    }
  }
};


const route = useRoute()
const config = useRuntimeConfig()
const contentfulClient = contentful.createClient({
  space: config.public.CONTENTFUL_SPACE_ID,
  accessToken: config.public.CONTENTFUL_ACCES_KEY,
})

const postDetails = usePostsStore().posts.find((post) => post.fields.slug === route.params.slug)
const postContent = await contentfulClient.getEntries<ContentSkeleton>({ content_type: 'content', "fields.slug[match]": route.params.slug.toString() }) //route.params.slug.toString()

const { title, author, category, dateOfPosting, featuredImage, slug } = postDetails?.fields
const { fullPost } = postContent.items[0].fields;
</script>

<style></style>