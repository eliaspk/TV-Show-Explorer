import React from "react";
import { useAuth } from "../hooks/useAuth";
import LoadingIndicator from "../components/common/LoadingIndicator";
import ErrorMessage from "../components/common/ErrorMessage";
import TVShowCard from "../components/TVShowCard";
import { Show } from "../types";
import { useFetchFavorites } from "../hooks/useFetchFavorites";
import { useToggleFavorite } from "../hooks/useToggleFavorite";

const Favorites: React.FC = () => {
  const { user, isLoading } = useAuth();
  const {
    data: favoritesData,
    isLoading: favoritesIsLoading,
    error: favoritesError,
  } = useFetchFavorites();
  const toggleFavorite = useToggleFavorite();

  const handleToggleFavorite = (show: Show) => {
    toggleFavorite.mutate({ show });
  };

  if (isLoading || favoritesIsLoading) {
    return <LoadingIndicator />;
  }

  if (user?.id && favoritesError) {
    return (
      <ErrorMessage message="Failed to load favorites. Please try again" />
    );
  }

  if (!user?.id) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">
          Sign in to view your favorites
        </h2>
        <p className="mb-6">
          To save and view your favorite TV shows, please login
        </p>
      </div>
    );
  }

  // Placeholder for signed-in users
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Your Favorites</h2>
      {favoritesData.shows && favoritesData.shows.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoritesData.shows.map((show: Show) => (
            <TVShowCard
              key={show.id}
              show={show}
              onToggleFavorite={() => handleToggleFavorite(show)}
            />
          ))}
        </div>
      ) : (
        <p className="text-center py-10">
          You haven't added any favorites yet.
        </p>
      )}
    </div>
  );
};

export default Favorites;
