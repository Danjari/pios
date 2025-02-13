import Link from "next/link";
import Image from "next/image";

export default function BlogPage({ posts }) {
  return (
    <div className="relative min-h-screen text-black bg-gray-50 py-16 px-6 sm:px-10 lg:px-16">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-900">Blog</h1>

      {/* Blog posts container */}
      <div className="max-w-7xl mx-auto">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No blog posts available.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform transform group-hover:scale-[1.02] group-hover:shadow-lg">
                  {/* Cover Image */}
                  <div className="relative w-full h-60">
                    {post.cover?.url ? (
                      <Image
                        src={post.cover.url}
                        alt={post.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">{post.shortDescription}</p>

                    <div className="mt-4 flex items-center text-sm text-gray-500">
                      <p>
                        Published on{" "}
                        <span className="font-medium text-gray-800">
                          {new Date(post.publishedDate).toLocaleDateString()}
                        </span>{" "}
                        by{" "}
                        <span className="font-medium text-gray-800">
                          {post.creator?.firstName} {post.creator?.lastName}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}