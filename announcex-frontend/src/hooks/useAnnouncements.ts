import {
  useMutation,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { announcementsApi } from "@/api/announcements.api";
import {
  CreateAnnouncementPayload,
} from "@/types/announcement";


export const useCreateAnnouncement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: announcementsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["announcements"],
      });
    },
  });
};

export const useAnnouncements = (pageSize = 10) => {
  return useInfiniteQuery({
    queryKey: ["announcements"],
    queryFn: ({ pageParam = 1 }) =>
      announcementsApi.getUserAnnouncements({
        pageNo: pageParam,
        pageSize,
      }),

    getNextPageParam: (lastPage) =>
      lastPage.pagination?.hasNextPage
        ? lastPage.pagination.pageNo + 1
        : undefined,

    initialPageParam: 1,
  });
};

