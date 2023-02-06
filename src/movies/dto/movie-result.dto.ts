import { Movie } from '../entities/movie.entity';

export class MovieResultDto {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
