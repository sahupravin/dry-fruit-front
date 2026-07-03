import { useQuery } from "@tanstack/react-query";
import { getHeaderSliders } from "../../services/home";

export function useHeaderData(options = {}) {
  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["header-data"],
    queryFn: () => getHeaderSliders(),
    staleTime: 30_000,
    ...options,
  });

  return {
    data,
    isLoading,
    isFetching,
    isError,
    error,
  };
}
