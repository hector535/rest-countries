import { QueryClient } from "react-query";

export const getQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: 3 * 60 * 1000,
      },
    },
  });
