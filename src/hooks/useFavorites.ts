import { useQuery } from "@tanstack/react-query";
import { fetchFavorites } from "../api/favorites"; // You'll need to create this function
import { useAuth } from "./useAuth";

export const useFavorites = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["favorites", user?.accessToken],
    queryFn: user?.accessToken ? fetchFavorites : () => [],
    staleTime: Infinity, // 5 minutes
  });
};
