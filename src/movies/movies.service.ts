import { Inject, Injectable } from '@nestjs/common';
import { PopularMovieDto } from './dto/popular-movie.dto';
import { SearchMovieDto } from './dto/search-movie.dto';
import { TmdbApiService } from './movies-api/tmdb-api/tmdb-api.service';

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
