import axios from "axios";
import { Show } from "../types";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchFavorites = async ({
  queryKey,
}: {
  queryKey: Array<string | undefined>;
}) => {
  const [, accessToken] = queryKey;
  if (!accessToken) throw new Error("Unauthorized");

  const response = await axios.get(`${API_URL}/favorites`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const toggleFavorite = async (show: Show, accessToken?: string) => {
  if (!accessToken) throw new Error("Unauthorized");

  const endpoint = `${API_URL}/favorites`;

  if (show.isFavorite) {
    await axios.delete(`${endpoint}/${show.id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } else {
    await axios.post(
      endpoint,
      { showId: show.id },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  }
  return show;
};
