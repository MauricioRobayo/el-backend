import { PickType } from '@nestjs/mapped-types';
import { AuthRegisterUserDto } from './auth-register-user.dto';

export class AuthLoginUserDto extends PickType(AuthRegisterUserDto, [
  'email',
  'password',
] as const) {}
