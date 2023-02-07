import { IsNumber, IsString } from 'class-validator';

export class CreateFavoriteDto {
  @IsString()
  userId: string;

  @IsNumber()
  movieId: number;
}
