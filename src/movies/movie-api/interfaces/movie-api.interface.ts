import { SearchMovieDto } from '../../dto/search-movie.dto';
import { SearchMovieResultDto } from '../../dto/search-movie-result.dto';

export interface MovieApi {
  search(query: SearchMovieDto): Promise<SearchMovieResultDto>;
}
