import { PickType } from '@nestjs/swagger';
import { SearchMovieDto } from './search-movie.dto';

export class PopularMovieDto extends PickType(SearchMovieDto, [
  'language',
  'page',
] as const) {}
