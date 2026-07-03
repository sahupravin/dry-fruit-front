import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useRemoveFromCart(options = {}) {
  const queryClient = useQueryClient();

  const { mutate, data, isPending, isError, error, variables, reset } =
    useMutation({
      mutationFn: async (id) => {
        if (id === undefined || id === null) {
          throw new Error("useRemoveFromCart: 'id' is required");
        }
        const response = await axios.delete(`/api/cart/${id}`);
        return response.data;
      },
      onSuccess: (...args) => {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
        options?.onSuccess?.(...args);
      },
      onError: (...args) => {
        options?.onError?.(...args);
      },
    });

  return { mutate, data, isPending, isError, error, variables, reset };
}
