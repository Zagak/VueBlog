import { defineStore } from "pinia";
import type { Entry, ContentfulClientApi } from "contentful";
import type { PostSkeleton } from "~/types/type";
import { PostCategory } from "~/types/enum";
import axios from "axios";

export const usePostsStore = defineStore("posts", () => {
  const posts: Entry<PostSkeleton>[] = [];

  const fetchPosts = async (client: ContentfulClientApi<undefined>) => {
    if (posts.length !== 0) return;

    const res = await client.getEntries<PostSkeleton>({
      content_type: "blogPost",
      order: "-sys.createdAt",
    });

    res.items.forEach((post) => {
      posts.push(post);
    });
  };

  const getByCategory = (category: string) =>
    posts.filter((post) => post.fields.category === category);

  const getGuidesPosts = computed(() => getByCategory(PostCategory.Guides));

  const getReviewsPosts = computed(() => getByCategory(PostCategory.Reviews));

  return {
    posts,
    fetchPosts,
    getGuidesPosts,
    getReviewsPosts,
  };
});
