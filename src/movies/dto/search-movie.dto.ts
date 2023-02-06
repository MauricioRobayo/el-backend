import { IsOptional, IsString, IsInt, IsPositive } from 'class-validator';

export class SearchMovieDto {
  @IsString()
  readonly query: string;

  @IsOptional()
  @IsPositive()
  @IsInt()
  readonly page?: number;

  @IsOptional()
  @IsString()
  readonly language?: string;
}
