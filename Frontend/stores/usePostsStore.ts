import { defineStore } from "pinia";
import type { Entry, ContentfulClientApi } from "contentful";
import type { PostSkeleton } from "~/types/type";
import { PostCategory } from "~/types/enum";

export const usePostsStore = defineStore("posts", () => {
  const config = useRuntimeConfig();
  let posts: Entry<PostSkeleton>[] = [];

  const fetchPosts = async (client: ContentfulClientApi<undefined>) => {
    //
    console.log("facem rost de posts");
    if (posts.length !== 0) return;

    const res = await client.getEntries<PostSkeleton>({
      content_type: "blogPost",
      order: "-sys.createdAt",
    });

    // const { data } = await useAsyncData("posts", () =>
    //   $fetch(
    //     `https://cdn.contentful.com/spaces/${config.public.CONTENTFUL_SPACE_ID}/entries?access_token=${config.public.CONTENTFUL_ACCES_KEY}&content_type=blogPost`
    //   )
    // );
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
