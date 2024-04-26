import type { Entry, ContentfulClientApi } from "contentful";
import type { PostSkeleton } from "~/types/type";

export const getCMScomments = async (
  client: ContentfulClientApi<undefined>
) => {
  const store = usePostsStore();

  const res = await client.getEntries<PostSkeleton>({
    content_type: "blogPost",
    order: "-sys.createdAt",
  });

  store.setAllPosts(res.items);
};
