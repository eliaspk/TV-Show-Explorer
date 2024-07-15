import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Star, Heart } from "lucide-react";
import { Show } from "../types";

interface TVShowCardProps {
  show: Show;
  onToggleFavorite: () => void;
}

const TVShowCard: React.FC<TVShowCardProps> = ({ show, onToggleFavorite }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="relative pt-150">
        <img
          className="absolute inset-0 w-full h-full object-cover cursor-pointer"
          src={show.posterPath}
          alt={show.name}
          onClick={() => navigate(`/show/${show.id}`)}
        />
        <div className="absolute top-0 right-0 p-2">
          <button
            onClick={() => onToggleFavorite()}
            className={`p-2 rounded-full bg-white bg-opacity-70 ${
              show.isFavorite ? "text-red-500" : "text-gray-400"
            }`}
          >
            <Heart size={20} fill={show.isFavorite ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
      <div className="p-4">
        <Link
          to={`/show/${show.id}`}
          className="font-bold text-lg mb-1 hover:text-blue-600 block"
        >
          {show.name}
        </Link>
        <div className="flex items-center mb-2">
          <Star className="text-yellow-400 mr-1" size={16} />
          <span className="font-bold">{show.voteAverage.toFixed(1)}</span>
        </div>
        <p className="text-sm text-gray-500 line-clamp-2">
          {show.overview || "No description available"}
        </p>
      </div>
    </div>
  );
};

export default TVShowCard;
