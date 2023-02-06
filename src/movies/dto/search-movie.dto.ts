import { IsOptional, IsString } from 'class-validator';

export class SearchMovieDto {
  @IsString()
  readonly query: string;

  @IsOptional()
  @IsString()
  readonly language: string;
}
