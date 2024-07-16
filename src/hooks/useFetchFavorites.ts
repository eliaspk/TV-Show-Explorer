import { useQuery } from "@tanstack/react-query";
import { fetchFavorites } from "../api/favorites";
import { useAuth } from "./useAuth";

export const useFetchFavorites = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["favorites", user?.idToken],
    queryFn: user?.idToken ? fetchFavorites : () => [],
    staleTime: Infinity,
  });
};
