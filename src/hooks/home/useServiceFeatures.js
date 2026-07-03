import { useQuery } from "@tanstack/react-query";
import { getServiceFeatures } from "../../services/home";

export function useServiceFeatures(options = {}) {
  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["home", "service-features"],
    queryFn: () => getServiceFeatures(),
    staleTime: 60_000,
    ...options,
  });

  return { data, isLoading, isFetching, isError, error };
}
