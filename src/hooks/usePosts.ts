import { useQuery } from "@tanstack/react-query";
import { blogPosts } from "../data/blogData"; // DEPRECATED – using static JSON fallback

interface UsePostsParams {
  per_page?: number;
  page?: number;
  search?: string;
}

export const usePosts = ({
  per_page = 10,
  page = 1,
  search = "",
}: UsePostsParams) => {
  return useQuery({
    queryKey: ["posts", { per_page, page, search }],
    queryFn: async () => {
      try {
        // Use static fallback data since API endpoint is not available
        let posts = blogPosts;

        // Apply search filter if provided
        if (search) {
          posts = posts.filter(
            (post) =>
              post.title.toLowerCase().includes(search.toLowerCase()) ||
              post.excerpt.toLowerCase().includes(search.toLowerCase())
          );
        }

        // Apply pagination
        const start = (page - 1) * per_page;
        const end = start + per_page;
        posts = posts.slice(start, end);

        return posts.map((post) => ({ ...post, source: "static" }));
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        // Fallback to static data
        return blogPosts.slice(0, per_page);
      }
    },
  });
};
