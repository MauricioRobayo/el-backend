import { MovieDto } from './movie.dto';

export class MovieResultDto {
  page: number;
  results: MovieDto[];
  total_pages: number;
  total_results: number;
}
