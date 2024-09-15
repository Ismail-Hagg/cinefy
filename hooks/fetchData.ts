import { apiCall } from "@/util/functions";
import { useQuery } from "@tanstack/react-query";

export const useFetchData = (link: string, keys: (string | number)[]) => {
  const fetch = useQuery({
    queryKey: keys,
    queryFn: async () => await apiCall(link),
  });
  return fetch;
};
