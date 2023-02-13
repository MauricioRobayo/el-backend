import { AuthLoginUserDto } from '../dto/auth-login-user.dto';
import { AuthRegisterUserDto } from '../dto/auth-register-user.dto';
import { AuthenticatedUserDto } from '../dto/authenticated-user.dto';

export interface AuthService {
  registerUser(authRegisterUserDto: AuthRegisterUserDto): Promise<void>;
  authenticateUser(
    authLoginUserDto: AuthLoginUserDto,
  ): Promise<AuthenticatedUserDto>;
}
