import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useCart(options = {}) {
  const { data, isLoading, isFetching, isError, error, refetch } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await axios.get("/api/cart");
      return response.data;
    },
    staleTime: 30_000,
    ...options,
  });

  return {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  };
}
