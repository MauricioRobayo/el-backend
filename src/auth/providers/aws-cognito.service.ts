import { Injectable } from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { AuthLoginUserDto } from '../dto/auth-login-user.dto';
import { AuthRegisterUserDto } from '../dto/auth-register-user.dto';
import { AuthenticatedUserDto } from '../dto/authenticated-user.dto';
import { AuthService } from './auth-service.interface';

@Injectable()
export class AwsCognitoService implements AuthService {
  private userPool: CognitoUserPool;

  constructor() {
    this.userPool = new CognitoUserPool({
      UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID ?? '',
      ClientId: process.env.AWS_COGNITO_CLIENT_ID ?? '',
    });
  }

  async registerUser(authRegisterUserDto: AuthRegisterUserDto): Promise<void> {
    const { name, email, password } = authRegisterUserDto;

    return new Promise((resolve, reject) => {
      this.userPool.signUp(
        email,
        password,
        [
          new CognitoUserAttribute({
            Name: 'name',
            Value: name,
          }),
        ],
        [],
        (err, result) => {
          if (result) {
            resolve();
          } else {
            reject(err);
          }
        },
      );
    });
  }

  async authenticateUser(
    authLoginUserDto: AuthLoginUserDto,
  ): Promise<AuthenticatedUserDto> {
    const { email, password } = authLoginUserDto;
    const userData = {
      Username: email,
      Pool: this.userPool,
    };

    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const userCognito = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      userCognito.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve({
            accessToken: result.getAccessToken().getJwtToken(),
            refreshToken: result.getRefreshToken().getToken(),
          });
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }
}
