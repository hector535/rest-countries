import { QueryClient } from "react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 3 * 60 * 1000,
    },
  },
});
