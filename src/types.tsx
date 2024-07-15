export interface Episode {
  id: number;
  name: string;
  overview: string;
  seasonNumber: number;
  episodeNumber: number;
  airDate: any;
  stillPath: string;
  voteAverage: number;
  voteCount: number;
}

export interface Season {
  id: number;
  name: string;
  seasonNumber: number;
  episodes: [];
}

export interface Show {
  id: number;
  voteCount: number;
  voteAverage: number;
  posterPath: string;
  popularity: number;
  overview: string;
  name: string;
  seasons: Season[];
  isFavorite: boolean;
}
