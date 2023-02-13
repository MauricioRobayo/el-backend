import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { MoviesApiModule } from '../common/movies-api/movies-api.module';
import { Favorite, FavoriteSchema } from '../users/entities/favorite.entity';
import { Note, NoteSchema } from '../users/entities/note.entity';
import { User, UserSchema } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { AwsCognitoService } from './providers/aws-cognito.service';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Note.name,
        schema: NoteSchema,
      },
      {
        name: Favorite.name,
        schema: FavoriteSchema,
      },
    ]),
    MoviesApiModule.register('tmdb'),
  ],
  providers: [AwsCognitoService, JwtStrategy, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
