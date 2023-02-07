import { IsArray } from 'class-validator';

export class UserDto {
  @IsArray({ each: true })
  favorites: string[];
}
