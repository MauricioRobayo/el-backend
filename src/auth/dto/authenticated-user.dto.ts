import { IsString } from 'class-validator';

export class AuthenticatedUserDto {
  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;
}
