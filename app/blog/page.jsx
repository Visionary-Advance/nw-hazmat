import { getAllPosts, getFeaturedPost } from "@/lib/sanity";
import BlogClient from "./BlogClient";

export const revalidate = 3600;

export const metadata = {
  title: "Blog | NorthWest HazMat, Inc.",
  description:
    "Stay informed with the latest news, tips, and insights on hazmat services, mold remediation, asbestos testing, and environmental safety from NorthWest HazMat.",
  keywords:
    "hazmat blog, mold remediation tips, asbestos safety, environmental cleanup news, hazmat training updates",
  alternates: {
    canonical: "https://nwhazmat.com/blog",
  },
  openGraph: {
    title: "Blog | NorthWest HazMat, Inc.",
    description:
      "Stay informed with the latest news, tips, and insights on hazmat services, mold remediation, and environmental safety.",
    url: "https://nwhazmat.com/blog",
    siteName: "NorthWest HazMat, Inc.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/img/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "NorthWest HazMat Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | NorthWest HazMat, Inc.",
    description:
      "Latest news and insights on hazmat services, mold remediation, and environmental safety.",
    images: ["/img/og-default.jpg"],
  },
};

export default async function BlogPage() {
  const [featuredPost, posts] = await Promise.all([
    getFeaturedPost(),
    getAllPosts(),
  ]);

  return <BlogClient featuredPost={featuredPost} posts={posts} />;
}
