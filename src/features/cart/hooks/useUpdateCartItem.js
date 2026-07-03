import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// payload: { id, ...fields }
export function useUpdateCartItem(options = {}) {
  const queryClient = useQueryClient();

  const { mutate, data, isPending, isError, error, variables, reset } =
    useMutation({
      mutationFn: async ({ id, ...updates }) => {
        if (id === undefined || id === null) {
          throw new Error("useUpdateCartItem: 'id' is required");
        }
        const response = await axios.patch(`/api/cart/${id}`, updates);
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
