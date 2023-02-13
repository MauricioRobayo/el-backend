import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AwsCognitoService } from './providers/aws-cognito.service';
import { AuthLoginUserDto } from './dto/auth-login-user.dto';
import { AuthRegisterUserDto } from './dto/auth-register-user.dto';
import { AuthenticatedUserDto } from './dto/authenticated-user.dto';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly awsCognitoService: AwsCognitoService,
    private readonly usersService: UsersService,
  ) {}

  @Post('/register')
  async register(@Body() authRegisterUserDto: AuthRegisterUserDto) {
    const newUser = await this.awsCognitoService.registerUser(
      authRegisterUserDto,
    );
    await this.usersService.createUser(newUser);
    return newUser;
  }

  @Post('/login')
  @UsePipes(ValidationPipe)
  async login(
    @Body() authLoginUserDto: AuthLoginUserDto,
  ): Promise<AuthenticatedUserDto> {
    return await this.awsCognitoService.authenticateUser(authLoginUserDto);
  }
}
