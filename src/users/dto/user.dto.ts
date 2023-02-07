import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { Movie } from '../../movies/entities/movie.entity';

export class UserDto {
  @IsString()
  userId: string;

  @IsOptional()
  @IsArray({ each: true })
  @Type(() => Movie)
  favorites?: Movie[];
}
