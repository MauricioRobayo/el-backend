import { Genre, SpokenLanguage } from '../entities/movie.entity';

export class MovieDto {
  genres: Genre[];
  language: SpokenLanguage[];
  movieApiId: number;
  movieIMDBId: string;
  originalLanguage: string;
  overview: string;
  popularity: number;
  posterPath: string;
  releaseDate: string;
  title: string;
  video: boolean;
  voteAverage: number;
  voteCount: number;
}
