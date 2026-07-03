import { useQuery } from "@tanstack/react-query";
import { getHomeBlogPosts } from "../../services/home";

export function useHomeBlogPosts(options = {}) {
  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["home", "blog-posts"],
    queryFn: () => getHomeBlogPosts(),
    staleTime: 30_000,
    ...options,
  });

  return { data, isLoading, isFetching, isError, error };
}
