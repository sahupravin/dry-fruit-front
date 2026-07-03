import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useAddToCart(options = {}) {
  const queryClient = useQueryClient();

  const { mutate, data, isPending, isError, error, variables, reset } =
    useMutation({
      mutationFn: async (newItem) => {
        const response = await axios.post("/api/cart", newItem);
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
