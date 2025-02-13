// components/BlogPage.tsx

import Link from "next/link";
import Image from "next/image";

export default function BlogPage({ posts }) {
  return (
    <div className="relative min-h-screen text-black bg-gray-50 py-20 px-4 sm:px-8">
      <h1 className="text-4xl font-semibold text-center mb-8">Blog</h1>

      {/* Display blog posts */}
      <div className="max-w-6xl mx-auto">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No blog posts available.</p>
        ) : (
          posts.map((post) => (
            <div key={post.slug} className="mb-8">
              <Link href={`/blog/${post.slug}`}>
                <div className="bg-white rounded-lg shadow-md p-6 transition-transform transform hover:scale-105 hover:shadow-xl">
                  {/* Cover Image */}
                  {post.cover && post.cover.url ? (
                    <Image
                      src={post.cover.url}
                      alt={post.title}
                      width={600}
                      height={400}
                      className="w-full h-64 object-cover rounded-t-lg"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gray-200 rounded-t-lg"></div> // Placeholder if no cover
                  )}
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-4">{post.title}</h2>
                  <p className="text-sm text-gray-500">{post.shortDescription}</p>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">
                      Published on {new Date(post.publishedDate).toLocaleDateString()} by{" "}
                      {post.creator?.firstName} {post.creator?.lastName}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}