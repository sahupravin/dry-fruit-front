import { useQuery } from "@tanstack/react-query";
import { getTeamMembers } from "../../services/home";

export function useTeamMembers(options = {}) {
  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["home", "team-members"],
    queryFn: () => getTeamMembers(),
    staleTime: 60_000,
    ...options,
  });

  return { data, isLoading, isFetching, isError, error };
}
