// app/(frontend)/blog/page.tsx

import { getPayload } from "payload";
import configPromise from "@payload-config";
import BlogPage from "../components/BlogPage"; // Import client-side component for rendering

// Server-side data fetching directly inside the component
const fetchPosts = async () => {
  const payload = await getPayload({ config: configPromise });
  const { docs: blogPosts } = await payload.find({
    collection: "blog",
    limit: 5, // Fetch up to 5 posts
    sort: "-publishedDate", // Sort by published date (most recent first)
    select: {
      title: true,
      slug: true,
      shortDescription: true,
      publishedDate: true,
      creator: true,
      cover: true,
    },
  });

  return blogPosts;
};

export default async function BlogPageWrapper() {
  const blogPosts = await fetchPosts(); // Fetch the posts server-side

  return <BlogPage posts={blogPosts} />;
}