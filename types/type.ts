import type { EntryFieldTypes, EntrySkeletonType } from 'contentful'

export type TypePost = {
  author: EntryFieldTypes.Text;
  category: EntryFieldTypes.EntryLink<EntrySkeletonType<EntryFieldTypes.Text, 'category'>>; //Sa-mi bag picioru stang daca stiu ce type tre la asta fmmmmmmmmmmm
  content: EntryFieldTypes.RichText;
  dateOfPosting: EntryFieldTypes.Date;
  featuredImage: EntryFieldTypes.AssetLink;
  slug: EntryFieldTypes.Symbol;
  thumbnail: EntryFieldTypes.AssetLink;
  title: EntryFieldTypes.Text;
}

export type PostSkeleton = EntrySkeletonType<TypePost, 'blogPost'>