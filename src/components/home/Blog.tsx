"use client";

import React from "react";
import BlogCard from "./BlogCard";
import { usePosts } from "../../hooks/usePosts";
// import { blogPosts } from"../../pages/blogData"; // DEPRECATED – using static JSON fallback

const Blog: React.FC = () => {
  const { data: posts, isLoading, isError } = usePosts({ per_page: 3 });

  if (isLoading) {
    return <div>Loading recent posts...</div>;
  }

  if (isError || !posts) {
    return <div>Error loading recent posts.</div>;
  }

  const recentPosts = posts.slice(0, 3);

  return (
    <div className="w-full bg-white text-black">
      <div className="bg-[#F5F5F5] rounded-xl md:rounded-3xl p-8 max-w-[1500px] mx-auto">
        <div className="flex flex-col items-center mb-8">
          <h3 className="font-bold uppercase mb-2 mt-5">CHECKOUT THE BLOG</h3>
          <p className="mb-8 w-full md:w-1/2 text-center text-body font-uber">
            From the latest physiotherapy techniques, to injury prevention tips,
            to wellness advice, our expert physiotherapists have compiled it all
            for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-0 md:px-8">
          {recentPosts.map((post: any) => (
            <BlogCard
              key={post.id}
              id={post.id}
              image={String(
                (post as Record<string, unknown>).featured_media ||
                  (post as Record<string, unknown>).featured_image ||
                  ">/images/default-blog.png"
              )}
              title={
                typeof post.title === "string"
                  ? post.title
                  : post.title.rendered
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
