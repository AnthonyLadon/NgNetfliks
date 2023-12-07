import { Movie } from "./movie";

//typage des données de l'api (tv shows)
export type Tvshow = {
  id: number;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
  first_air_date: string;
};

export type TvShowsDataTypeObject = {
  page: number;
  results: Tvshow[];
  total_pages: number;
  total_results: number;
};

// On map les données de l'api (tv shows) en données
// de l'api (movies) en changeant les propriétés differentes
// (name => title, original_name => original_title)
export function mapToMovies(tvshows: Tvshow[]): Movie[] {
  return tvshows.map((tvshow: Tvshow) => {
    return {
      ...tvshow,
      title: tvshow.name,
      original_title: tvshow.original_name,
    };
  });
}

export function mapToMovie(tvshow: Tvshow): Movie {
  return {
    ...tvshow,
    title: tvshow.name,
    original_title: tvshow.original_name,
  };
}
