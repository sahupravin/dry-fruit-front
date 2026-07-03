import { useQuery } from "@tanstack/react-query";
import { getBestProducts } from "../../services/home";

export function useBestProducts(options = {}) {
  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["home", "best-products"],
    queryFn: () => getBestProducts(),
    staleTime: 30_000,
    ...options,
  });

  return { data, isLoading, isFetching, isError, error };
}
