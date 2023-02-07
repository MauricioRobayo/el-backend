import { Controller, Get, Query } from '@nestjs/common';
import { PopularMovieDto } from './dto/popular-movie.dto';
import { SearchMovieDto } from './dto/search-movie.dto';
import { TmdbApiService } from './movie-api/tmdb-api/tmdb-api.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly tmdbApiService: TmdbApiService) {}

  @Get('search')
  search(@Query() query: SearchMovieDto) {
    return this.tmdbApiService.search(query);
  }

  @Get('popular')
  popular(@Query() query: PopularMovieDto) {
    return this.tmdbApiService.popular(query);
  }
}
