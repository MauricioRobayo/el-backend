import { Injectable } from '@nestjs/common';
import { TmdbApiService } from '../common/movies-api/tmdb-api/tmdb-api.service';
import { PopularMovieDto } from './dto/popular-movie.dto';
import { SearchMovieDto } from './dto/search-movie.dto';

@Injectable()
export class MoviesService {
  constructor(private readonly moviesApiService: TmdbApiService) {}

  search(query: SearchMovieDto) {
    return this.moviesApiService.search(query);
  }

  popular(query: PopularMovieDto) {
    return this.moviesApiService.popular(query);
  }
}
