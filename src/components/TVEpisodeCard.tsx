import React from "react";
import { Episode } from "../types";

interface TVEpisodeCardProps {
  episode: Episode;
}

const TVEpisodeCard: React.FC<TVEpisodeCardProps> = ({ episode }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {episode.stillPath && (
        <img
          src={episode.stillPath}
          alt={episode.name}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">
          {episode.name || "Untitled Episode"}
        </h3>
        <p className="text-sm text-gray-600 mb-2">
          Season {episode.seasonNumber || "N/A"}, Episode{" "}
          {episode.episodeNumber || "N/A"}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          Air Date: {episode.airDate || "TBA"}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          Rating: {episode.voteAverage ? episode.voteAverage.toFixed(1) : "N/A"}{" "}
          / 10
        </p>
        <p className="text-sm text-gray-600 mb-4">
          Vote Count: {episode.voteCount}
        </p>
        <p className="text-sm text-gray-700 line-clamp-3">
          {episode.overview || "No overview available."}
        </p>
      </div>
    </div>
  );
};

export default TVEpisodeCard;
