import { defineStore } from 'pinia'
import type { Entry, ContentfulClientApi } from 'contentful';
import type { PostSkeleton } from '~/types/type';

export const usePostsStore = defineStore('posts', () => {
  const posts: Entry<PostSkeleton>[] = []

  const fetchPosts = async (client: ContentfulClientApi<undefined>) => {
    if (posts.length !== 0) return

    const res = await client.getEntries<PostSkeleton>({ content_type: 'blogPost' })
    res.items.sort((a, b) => {
      const dateA = new Date(a.fields.dateOfPosting).getTime();
      const dateB = new Date(b.fields.dateOfPosting).getTime();

      return dateB - dateA;
    });

    res.items.forEach(post => {
      posts.push(post)
    })
  }

  const getByCategory = ((category: string) =>
    posts.filter((post) => post.fields.category.fields.name === category)
  )

  const getGuidesPosts = computed(() =>
    getByCategory("Guides")
  )

  const getReviewsPosts = computed(() =>
    getByCategory("Reviews")
  )

  return { posts, fetchPosts, getGuidesPosts, getReviewsPosts }
})