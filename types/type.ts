import type { EntryFieldTypes, EntrySkeletonType } from 'contentful'

export type TypePost = {
  author: EntryFieldTypes.Text;
  category: EntryFieldTypes.Text; //Sa-mi bag picioru stang daca stiu ce type tre la asta fmmmmmmmmmmm
  content: EntryFieldTypes.RichText;
  dateOfPosting: EntryFieldTypes.Date;
  featuredImage: EntryFieldTypes.AssetLink;
  slug: EntryFieldTypes.Symbol;
  thumbnail: EntryFieldTypes.AssetLink;
  title: EntryFieldTypes.Text;
}
export type PostSkeleton = EntrySkeletonType<TypePost, 'blogPost'>

export type TypeContent = {
  fullPost: EntryFieldTypes.RichText;
  slug: EntryFieldTypes.Text;
}
export type ContentSkeleton = EntrySkeletonType<TypeContent, 'content'>