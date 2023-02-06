import { SearchMovieDto } from '../../dto/search-movie.dto';
import { MovieResultDto } from '../../dto/movie-result.dto';
import { PopularMovieDto } from '../../dto/popular-movie.dto';

export interface MovieApi {
  search(query: SearchMovieDto): Promise<MovieResultDto>;
  popular(query: PopularMovieDto): Promise<MovieResultDto>;
}
