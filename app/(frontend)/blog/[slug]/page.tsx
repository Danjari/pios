"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getPayload } from "payload";
import configPromise from "@payload-config";

// Define the component that fetches and displays a single blog post
export default function BlogPostDetail() {
  const [post, setPost] = useState<any | null>(null);  // Store single post
  const [loading, setLoading] = useState<boolean>(true);
  const { query } = useRouter();
  const { slug } = query;  // Extract the slug from the URL

  // Fetch the blog post by slug
  useEffect(() => {
    async function fetchPost() {
      if (slug) {
        const payload = await getPayload({ config: configPromise });
        const { docs: [blogPost] } = await payload.find({
          collection: "blog",
          where: { slug: { equals: slug } },
          limit: 1,
        });

        setPost(blogPost);
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  if (loading) {
    return <p>Loading...</p>;  // Display loading state
  }

  if (!post) {
    return <p>Blog post not found.</p>;  // Handle case where post is not found
  }

  return (
    <div className="relative min-h-screen text-black bg-gray-50 py-20 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-6">
          Published on {new Date(post.publishedDate).toLocaleDateString()} by{" "}
          {post.creator?.firstName} {post.creator?.lastName}
        </p>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: post.content_html || "" }}
        />
      </div>
    </div>
  );
}