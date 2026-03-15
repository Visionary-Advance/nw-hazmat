import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

export const client = createClient({
  projectId: "myt6kdu8",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = createImageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

export async function getAllPosts() {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      mainImage,
      excerpt,
      publishedAt,
      featured,
      "category": category->{ title, slug },
      "author": author->{ name, image }
    }`
  );
}

export async function getFeaturedPost() {
  return client.fetch(
    `*[_type == "post" && featured == true] | order(publishedAt desc)[0] {
      _id,
      title,
      slug,
      mainImage,
      excerpt,
      publishedAt,
      "category": category->{ title, slug },
      "author": author->{ name, image }
    }`
  );
}

export async function getPostBySlug(slug) {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      mainImage,
      excerpt,
      body,
      publishedAt,
      "category": category->{ title, slug },
      "author": author->{ name, image, bio }
    }`,
    { slug }
  );
}

export async function getAllCategories() {
  return client.fetch(
    `*[_type == "category"] | order(title asc) {
      _id,
      title,
      slug,
      description
    }`
  );
}
