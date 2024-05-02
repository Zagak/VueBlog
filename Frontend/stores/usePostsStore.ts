import { defineStore } from "pinia";
import type { Entry, ContentfulClientApi } from "contentful";
import type { PostSkeleton } from "~/types/type";
import { PostCategory } from "~/types/enum";

export const usePostsStore = defineStore("posts", () => {
  let posts: Entry<PostSkeleton>[] = [];

  const fetchPosts = async (client: ContentfulClientApi<undefined>) => {
    const config = useRuntimeConfig();
    //client: ContentfulClientApi<undefined>
    console.log("facem rost de posts");
    if (posts.length !== 0) return;

    const res = await client.getEntries<PostSkeleton>({
      content_type: "blogPost",
      order: "-sys.createdAt",
    });

    posts = res.items;
  };

  const getByCategory = (category: string) =>
    posts.filter((post) => post.fields.category === category);

  const getGuidesPosts = computed(() => getByCategory(PostCategory.Guides));

  const getReviewsPosts = computed(() => getByCategory(PostCategory.Reviews));

  const getAllPosts = () => {
    return posts;
  };

  return {
    fetchPosts,
    getGuidesPosts,
    getReviewsPosts,
    getAllPosts,
  };
});
