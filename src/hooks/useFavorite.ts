import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleFavorite } from "../api/favorites";
import { Show } from "../types";

type ToggleFavoriteParams = {
  show: Show;
  accessToken?: string;
};

export const useFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ show, accessToken }: ToggleFavoriteParams) =>
      toggleFavorite(show, accessToken),
    onMutate: async ({ show }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["favorites"] });
      await queryClient.cancelQueries({ queryKey: ["searchShows"] });
      await queryClient.cancelQueries({ queryKey: ["trendingShows"] });

      // Snapshot the previous values
      const previousFavorites = queryClient.getQueryData<Show[]>(["favorites"]);
      const previousSearchShows = queryClient.getQueryData<Show[]>([
        "searchShows",
      ]);
      const previousTrendingShows = queryClient.getQueryData<Show[]>([
        "trendingShows",
      ]);

      // Optimistically update favorites
      queryClient.setQueryData<Show[]>(["favorites"], (old) => {
        if (show.isFavorite) {
          return old ? old.filter((s) => s.id !== show.id) : [];
        } else {
          return old
            ? [...old, { ...show, isFavorite: true }]
            : [{ ...show, isFavorite: true }];
        }
      });

      // Helper function to update show lists
      const updateShowList = (shows: Show[] | undefined) =>
        shows?.map((s) =>
          s.id === show.id ? { ...s, isFavorite: !s.isFavorite } : s
        );

      // Update search results
      queryClient.setQueryData<Show[]>(["searchShows"], (old) =>
        updateShowList(old)
      );

      // Update trending shows
      queryClient.setQueryData<Show[]>(["trendingShows"], (old) =>
        updateShowList(old)
      );

      return { previousFavorites, previousSearchShows, previousTrendingShows };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["favorites"], context?.previousFavorites);
      queryClient.setQueryData(["searchShows"], context?.previousSearchShows);
      queryClient.setQueryData(
        ["trendingShows"],
        context?.previousTrendingShows
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      queryClient.invalidateQueries({ queryKey: ["searchShows"] });
      queryClient.invalidateQueries({ queryKey: ["trendingShows"] });
    },
  });
};
