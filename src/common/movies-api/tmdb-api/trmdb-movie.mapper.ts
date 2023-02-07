import {
  Genre,
  Movie,
  SpokenLanguage,
} from '../../../movies/entities/movie.entity';

export interface TmdbResult {
  page: number;
  results: TmdbMovie[];
  total_pages: number;
  total_results: number;
}

export interface TmdbMovie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: any;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: any;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export class TmdbMovieMapper {
  mapToMovieEntity(tmdbMovie: TmdbMovie): Movie {
    return {
      genres: tmdbMovie.genres,
      language: tmdbMovie.spoken_languages,
      movieApiId: tmdbMovie.id,
      movieIMDBId: tmdbMovie.imdb_id,
      originalLanguage: tmdbMovie.original_language,
      overview: tmdbMovie.overview,
      popularity: tmdbMovie.popularity,
      posterPath: tmdbMovie.poster_path,
      releaseDate: tmdbMovie.release_date,
      title: tmdbMovie.title,
      video: tmdbMovie.video,
      voteAverage: tmdbMovie.vote_average,
      voteCount: tmdbMovie.vote_count,
    };
  }
}
