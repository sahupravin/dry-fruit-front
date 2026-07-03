import { useQuery } from "@tanstack/react-query";
import { getSpecialOffers } from "../../services/home";

export function useSpecialOffers(options = {}) {
  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["home", "parallax"],
    queryFn: () => getSpecialOffers(),
    staleTime: 60_000,
    ...options,
  });

  return { data, isLoading, isFetching, isError, error };
}
