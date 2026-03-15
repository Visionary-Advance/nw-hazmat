"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import Breadcrumbs from "@/Components/BreadCrumbs";

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogClient({ featuredPost, posts }) {
  const nonFeaturedPosts = posts?.filter((p) => p._id !== featuredPost?._id) || [];

  return (
    <div className="min-h-screen ">
      <Breadcrumbs />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="fjalla-one text-5xl md:text-6xl text-left mb-12"
        >
          Blog
        </motion.h1>

        {/* Featured Post Hero */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <Link href={`/blog/${featuredPost.slug?.current}`}>
              <div className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                {/* Left Red Panel */}
                <div className="bg-[#ee3523] text-white p-8 md:p-12 flex flex-col justify-center">
                  {featuredPost.category?.title && (
                    <span className="inline-block bg-white/20 text-white text-sm font-semibold px-3 py-1 rounded-full mb-4 w-fit">
                      {featuredPost.category.title}
                    </span>
                  )}
                  <p className="text-white/80 text-sm mb-3">
                    {formatDate(featuredPost.publishedAt)}
                  </p>
                  <h2 className="fjalla-one text-3xl md:text-4xl mb-4">
                    {featuredPost.title}
                  </h2>
                  {featuredPost.excerpt && (
                    <p className="poppins text-white/90 text-lg mb-6 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                  )}
                  <span className="inline-flex items-center text-white font-semibold group">
                    Read More
                    <svg
                      className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </div>

                {/* Right Image Panel */}
                <div className="relative h-64 lg:h-auto min-h-[300px]">
                  {featuredPost.mainImage ? (
                    <Image
                      src={urlFor(featuredPost.mainImage)
                        .width(800)
                        .height(600)
                        .auto("format")
                        .url()}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                      <span className="text-gray-500">No image</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Post Grid */}
        {nonFeaturedPosts.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {nonFeaturedPosts.map((post) => (
              <motion.div key={post._id} variants={itemVariants}>
                <Link href={`/blog/${post.slug?.current}`}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                    <div className="relative h-48">
                      {post.mainImage ? (
                        <Image
                          src={urlFor(post.mainImage)
                            .width(400)
                            .height(250)
                            .auto("format")
                            .url()}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400">No image</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        {post.category?.title && (
                          <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-full">
                            {post.category.title}
                          </span>
                        )}
                        <span className="text-gray-400 text-sm">
                          {formatDate(post.publishedAt)}
                        </span>
                      </div>
                      <h3 className="fjalla-one text-xl mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="poppins text-gray-600 text-sm line-clamp-2 mt-auto">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          !featuredPost && (
            <div className="text-center py-20">
              <h2 className="fjalla-one text-3xl text-gray-400 mb-4">
                No Posts Yet
              </h2>
              <p className="poppins text-gray-500 text-lg">
                Check back soon for articles on hazmat safety, mold remediation,
                and more.
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
