import { IsArray, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  userId: string;

  @IsArray({ each: true })
  favorites: string[];
}
