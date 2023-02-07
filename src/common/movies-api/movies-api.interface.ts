import { SearchMovieDto } from '../../movies/dto/search-movie.dto';
import { MovieResultDto } from '../../movies/dto/movie-result.dto';
import { PopularMovieDto } from '../../movies/dto/popular-movie.dto';

export interface MoviesApi {
  search(query: SearchMovieDto): Promise<MovieResultDto>;
  popular(query: PopularMovieDto): Promise<MovieResultDto>;
}
