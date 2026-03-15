"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/lib/sanity";
import portableTextComponents from "@/lib/portableTextComponents";
import Breadcrumbs from "@/Components/BreadCrumbs";

function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function PostClient({ post }) {
  return (
    <div className="min-h-screen bg-white">
      <Breadcrumbs />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Meta Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            {post.category?.title && (
              <span className="bg-red-100 text-red-600 text-sm font-semibold px-3 py-1 rounded-full">
                {post.category.title}
              </span>
            )}
            <span className="text-gray-500 text-sm">
              {formatDate(post.publishedAt)}
            </span>
            {post.author?.name && (
              <>
                <span className="text-gray-300">|</span>
                <span className="text-gray-500 text-sm">
                  By {post.author.name}
                </span>
              </>
            )}
          </div>

          <h1 className="fjalla-one text-4xl md:text-5xl leading-tight mb-6">
            {post.title}
          </h1>
        </motion.div>

        {/* Hero Image */}
        {post.mainImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full h-64 md:h-96 mb-10 rounded-2xl overflow-hidden"
          >
            <Image
              src={urlFor(post.mainImage)
                .width(1200)
                .height(600)
                .auto("format")
                .url()}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        )}

        {/* Body Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="prose prose-lg max-w-none"
        >
          {post.body && (
            <PortableText value={post.body} components={portableTextComponents} />
          )}
        </motion.div>

        {/* Back Link */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/blog"
            className="inline-flex items-center text-red-600 hover:text-red-800 font-semibold"
          >
            <svg
              className="mr-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            Back to Blog
          </Link>
        </div>
      </article>
    </div>
  );
}
