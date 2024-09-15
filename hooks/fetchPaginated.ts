import { apiCall } from "@/util/functions";
import { useInfiniteQuery } from "@tanstack/react-query";

export const usePaginatedFetch = (link: string, keys: (string | number)[]) => {
  const getData = async ({ pageParam = 1 }) => {
    const url = `${link}${pageParam}`;
    const data = await apiCall(url);
    return data;
  };
  return useInfiniteQuery({
    queryKey: keys,
    queryFn: getData,
    getNextPageParam: (lastPage, pages) => pages.length + 1,
    initialPageParam: 1,
  });
};
