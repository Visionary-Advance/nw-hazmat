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

// Plain text of a Portable Text block.
function blockText(block) {
  return (block?.children || [])
    .map((child) => child.text || "")
    .join("")
    .trim();
}

// Extract FAQ Q&A pairs from an "Frequently Asked Questions" section (h3 = question,
// following paragraph(s) = answer) so we can emit FAQPage structured data.
function buildFaqEntries(body = []) {
  const startIndex = body.findIndex(
    (b) => b.style === "h2" && /frequently asked questions/i.test(blockText(b))
  );
  if (startIndex === -1) return [];

  const entries = [];
  for (let i = startIndex + 1; i < body.length; i++) {
    const block = body[i];
    if (block.style === "h2") break; // section ended
    if (block.style !== "h3") continue;

    const question = blockText(block);
    const answerParts = [];
    for (let j = i + 1; j < body.length; j++) {
      const next = body[j];
      if (next.style === "h3" || next.style === "h2") break;
      const text = blockText(next);
      if (text) answerParts.push(text);
    }
    const answer = answerParts.join(" ");
    if (question && answer) {
      entries.push({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      });
    }
  }
  return entries;
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
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://nwhazmat.com/blog/${slug}`,
    },
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
      logo: {
        "@type": "ImageObject",
        url: "https://nwhazmat.com/img/NorthWest_HazMat_Logo.png",
      },
    },
  };

  const faqEntries = buildFaqEntries(post.body);
  const faqJsonLd =
    faqEntries.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqEntries,
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <PostClient post={post} />
    </>
  );
}
