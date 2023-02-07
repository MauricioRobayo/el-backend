import { IsArray, IsOptional, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  userId: string;

  @IsOptional()
  @IsArray({ each: true })
  favorites?: string[];
}
