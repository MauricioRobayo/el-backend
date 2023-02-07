import { Controller, Get, Query } from '@nestjs/common';
import { PopularMovieDto } from './dto/popular-movie.dto';
import { SearchMovieDto } from './dto/search-movie.dto';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('search')
  search(@Query() query: SearchMovieDto) {
    return this.moviesService.search(query);
  }

  @Get('popular')
  popular(@Query() query: PopularMovieDto) {
    return this.moviesService.popular(query);
  }
}
