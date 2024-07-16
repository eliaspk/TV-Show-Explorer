import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { Search } from "lucide-react";
import TVShowCard from "../components/TVShowCard";
import { searchShows, fetchTrendingShows } from "../api/shows";
import LoadingIndicator from "../components/common/LoadingIndicator";
import ErrorMessage from "../components/common/ErrorMessage";
import { useFavorite } from "../hooks/useFavorite";
import { Show } from "../types";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../hooks/useSearch";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm, searchResults, setSearchResults } =
    useSearch();
  const { user } = useAuth();
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const favoriteMutation = useFavorite();

  const {
    data: searchData,
    isLoading: isSearchLoading,
    error: searchError,
  } = useQuery({
    queryKey: ["searchShows", debouncedSearchTerm],
    queryFn: () => searchShows(debouncedSearchTerm, user?.idToken),
    enabled: debouncedSearchTerm.length > 0,
    staleTime: 1000 * 60 * 15,
  });

  const {
    data: trendingData,
    isLoading: isTrendingLoading,
    error: trendingError,
  } = useQuery({
    queryKey: ["trendingShows"],
    queryFn: () => fetchTrendingShows(user?.idToken),
    enabled: debouncedSearchTerm.length === 0,
    staleTime: 1000 * 60 * 15,
  });

  const error = searchError ?? trendingError;

  useEffect(() => {
    if (searchData) {
      setSearchResults(searchData);
    } else if (trendingData && debouncedSearchTerm.length === 0) {
      setSearchResults(trendingData);
    }
  }, [searchData, trendingData, debouncedSearchTerm, setSearchResults]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onToggleFavorite = async (show: Show) => {
    if (!user?.idToken) {
      navigate("/favorites");
      return;
    }
    favoriteMutation.mutate({ show, idToken: user?.idToken });
  };

  const isLoading = isSearchLoading || isTrendingLoading;

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="mb-8 relative">
        <input
          type="text"
          placeholder="Search for a TV show..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchResults.map((show) => {
          return (
            <TVShowCard
              key={show.id}
              show={show}
              onToggleFavorite={() => onToggleFavorite(show)}
            />
          );
        })}
      </div>
      {isLoading && <LoadingIndicator />}
      {error && <ErrorMessage message={(error as Error).message} />}
      {searchResults.length === 0 && !isLoading && !error && (
        <div className="text-center py-10">No results found</div>
      )}
    </div>
  );
};

export default Home;
