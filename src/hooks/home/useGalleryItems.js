import { useQuery } from "@tanstack/react-query";
import { getGalleryItems } from "../../services/home";

export function useGalleryItems(options = {}) {
  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["home", "gallery"],
    queryFn: () => getGalleryItems(),
    staleTime: 60_000,
    ...options,
  });

  return { data, isLoading, isFetching, isError, error };
}
