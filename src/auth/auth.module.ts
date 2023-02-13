import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AwsCognitoService } from './providers/aws-cognito.service';

@Module({
  providers: [AwsCognitoService],
  controllers: [AuthController],
})
export class AuthModule {}
