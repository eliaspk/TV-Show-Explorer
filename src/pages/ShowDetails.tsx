import React, { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Star } from "lucide-react";
import TVEpisodeCard from "../components/TVEpisodeCard";
import {
  fetchShowDetails,
  fetchShowSeasons,
  fetchSeasonEpisodes,
} from "../api/shows";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  LineChart,
} from "recharts";
import { Episode, Season, Show } from "../types";
import LoadingIndicator from "../components/common/LoadingIndicator";

const ShowDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [minRating, setMinRating] = useState(0);
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);

  const showId = Number(id);

  const { data: showDetails, isLoading: isLoadingDetails } = useQuery<
    Show,
    Error
  >({
    queryKey: ["showDetails", showId],
    queryFn: () => fetchShowDetails(showId),
    staleTime: 1000 * 60 * 5,
  });

  const { data: seasons } = useQuery<Season[], Error>({
    queryKey: ["showSeasons", showId],
    queryFn: () => fetchShowSeasons(showId),
    staleTime: 1000 * 60 * 5,
  });

  const { data: episodes } = useQuery<Episode[], Error>({
    queryKey: ["seasonEpisodes", showId, selectedSeason],
    queryFn: () =>
      selectedSeason !== null
        ? fetchSeasonEpisodes(showId, selectedSeason)
        : Promise.resolve([]),
    enabled: selectedSeason !== null,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (seasons && seasons.length > 0 && selectedSeason === null) {
      setSelectedSeason(seasons[0].seasonNumber);
    }
  }, [seasons, selectedSeason]);

  const currentEpisodes = useMemo<Episode[]>(() => {
    return episodes || [];
  }, [episodes]);

  const chartData = useMemo(() => {
    return currentEpisodes.map((episode) => ({
      name: `E${episode.episodeNumber}`,
      rating: episode.voteAverage,
    }));
  }, [currentEpisodes]);

  const filteredEpisodes = useMemo(() => {
    return currentEpisodes.filter(
      (episode) => episode.voteAverage >= minRating
    );
  }, [currentEpisodes, minRating]);

  if (isLoadingDetails) {
    return <LoadingIndicator />;
  }

  if (!showDetails) {
    return <div className="text-center py-10">Show not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-gray-700 hover:text-gray-900 bg-gray-200 hover:bg-gray-300 transition duration-300 px-4 py-2 rounded-full"
      >
        <ArrowLeft className="mr-2" size={20} /> Back to Shows
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:w-48"
              src={showDetails.posterPath}
              alt={showDetails.name}
            />
          </div>
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-2">{showDetails.name}</h1>
            <div className="flex items-center mb-4">
              <Star className="text-yellow-400 mr-1" size={20} />
              <span className="font-bold text-lg">
                {showDetails.voteAverage.toFixed(1)}
              </span>
              <span className="text-gray-600 ml-2">/ 10</span>
            </div>
            <p className="text-gray-700">{showDetails.overview}</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Seasons</h2>
        <div className="flex flex-wrap gap-2">
          {seasons &&
            seasons.map((season) => (
              <button
                key={season.id}
                onClick={() => setSelectedSeason(season.seasonNumber)}
                className={`px-4 py-2 rounded ${
                  selectedSeason === season.seasonNumber
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Season {season.seasonNumber}
              </button>
            ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Episode Ratings</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 10]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="rating"
              stroke="#636363"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <h2 className="text-2xl font-bold mb-4">Episodes</h2>

      <div className="bg-gray-200 p-4 rounded-lg mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-700">
          Filter by Minimum Rating: {minRating.toFixed(1)}
        </label>
        <input
          type="range"
          min="0"
          max="10"
          step="0.1"
          value={minRating}
          onChange={(e) => setMinRating(parseFloat(e.target.value))}
          className="w-full accent-gray-600"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEpisodes.map((episode) => (
          <TVEpisodeCard key={episode.id} episode={episode} />
        ))}
      </div>

      {filteredEpisodes.length === 0 && (
        <p className="text-center text-gray-600 py-10">
          No episodes match the selected rating. Try lowering the minimum
          rating.
        </p>
      )}
    </div>
  );
};

export default ShowDetails;
