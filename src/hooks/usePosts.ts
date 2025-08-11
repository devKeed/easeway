import { useQuery } from"@tanstack/react-query";
import { getPosts } from"../api/wp";
import { blogPosts } from"../data/blogData"; // DEPRECATED – using static JSON fallback

interface UsePostsParams {
 per_page?: number;
 page?: number;
 search?: string;
}

export const usePosts = ({
 per_page = 10,
 page = 1,
 search ="",
}: UsePostsParams) => {
 return useQuery({
 queryKey: ["posts", { per_page, page, search }],
 queryFn: async () => {
 try {
 const posts = await getPosts({ per_page, page, search });
 return posts.map((post) => ({ ...post, source:"api" }));
 } catch {
 return blogPosts.map((post) => ({ ...post, source:"fallback" })); // Fallback
 }
 },
 });
};
