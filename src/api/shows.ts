import axios from "axios";
import { Show, Season, Episode } from "../types";

const API_URL = process.env.REACT_APP_API_URL;

export const searchShows = async (
  searchTerm: string,
  idToken?: string
): Promise<Show[]> => {
  const url = idToken
    ? `${API_URL}/auth/shows?searchQuery=${encodeURIComponent(searchTerm)}`
    : `${API_URL}/shows?searchQuery=${encodeURIComponent(searchTerm)}`;

  const response = await axios.get<{ results: Show[] }>(url, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
  return response.data.results;
};

export const fetchShowDetails = async (showId: number): Promise<Show> => {
  const response = await axios.get(`${API_URL}/shows/${showId}`);
  return response.data;
};

export const fetchShowSeasons = async (showId: number): Promise<Season[]> => {
  const response = await axios.get(`${API_URL}/shows/${showId}/seasons`);
  return response.data;
};

export const fetchSeasonEpisodes = async (
  showId: number,
  seasonNumber: number
): Promise<Episode[]> => {
  const response = await axios.get(
    `${API_URL}/shows/${showId}/seasons/${seasonNumber}/episodes`
  );
  return response.data;
};

export const fetchTrendingShows = async (idToken?: string): Promise<Show[]> => {
  const url = idToken
    ? `${API_URL}/auth/shows/discover`
    : `${API_URL}/shows/discover`;

  const response = await axios.get(url, {
    headers: {
      Authorization: idToken ? `Bearer ${idToken}` : "",
    },
  });
  return response.data.results;
};
