// plugins/contentful.js
import * as contentful from "contentful";

export default defineNuxtPlugin((nuxtApp) => {
  const config = {
    space: "bbbsu85qq7pj",
    accessToken: "KGVlTF0t-AfMsE2-jVv6fwdTAsFMjavXqIgdx9go6NY",
  };

  const client = contentful.createClient(config);

  nuxtApp.provide("contentfulClient", client);
});
