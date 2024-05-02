// plugins/contentful.js
import pkg from "contentful";
const { createClient } = pkg;
//import { createClient } from "contentful";

export default defineNuxtPlugin(({ $config }) => {
  const config = {
    space: $config.public.CONTENTFUL_SPACE_ID,
    accessToken: $config.public.CONTENTFUL_ACCES_KEY,
  };

  const client = createClient(config);

  return {
    provide: {
      contentfulClient: client,
    },
  };
});
