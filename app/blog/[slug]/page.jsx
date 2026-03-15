import { getAllPosts, getPostBySlug, urlFor } from "@/lib/sanity";
import PostClient from "./PostClient";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug?.current }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  const ogImage = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).auto("format").url()
    : "/img/Hazmat-Services.jpg";

  return {
    title: `${post.title} | NorthWest HazMat Blog`,
    description: post.excerpt || `Read "${post.title}" on the NorthWest HazMat blog.`,
    alternates: {
      canonical: `https://nwhazmat.com/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt || `Read "${post.title}" on the NorthWest HazMat blog.`,
      url: `https://nwhazmat.com/blog/${slug}`,
      siteName: "NorthWest HazMat, Inc.",
      type: "article",
      publishedTime: post.publishedAt,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: post.author
      ? { "@type": "Person", name: post.author.name }
      : undefined,
    image: post.mainImage
      ? urlFor(post.mainImage).width(1200).height(630).url()
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "NorthWest HazMat, Inc.",
      url: "https://nwhazmat.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PostClient post={post} />
    </>
  );
}
