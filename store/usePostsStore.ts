import { defineStore } from 'pinia'
import type { Entry, EntrySkeletonType, ContentfulClientApi } from 'contentful';


export const usePostsStore = defineStore('posts', () => {
  const posts: Ref<Entry<EntrySkeletonType, undefined, string>[]> = ref([])

  const fetchPosts = async (client: ContentfulClientApi<undefined>) => {
    const res = await client.getEntries({ content_type: 'blogPost' })
    posts.value = res.items
  }

  const getPosts = computed(() => toRaw(posts.value))

  const getByCategory = ((category: string) =>
    toRaw(posts.value).filter((post) => post.fields.category?.fields.name === category)
  )

  const getGuidesPosts = computed(() =>
    getByCategory("Guides")
    //posts.value.filter((post) => post.fields.category.fields.name === "Guides")
  )

  const emptyPosts = () => {
    posts.value = []
  }

  return { posts, fetchPosts, emptyPosts, getPosts, getGuidesPosts }
})