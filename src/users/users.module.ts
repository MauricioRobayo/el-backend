import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { MoviesApiModule } from '../common/movies-api/movies-api.module';
import { Note, NoteSchema } from './entities/note.entity';
import { Favorite, FavoriteSchema } from './entities/favorite.entity';
import { UserMapper } from './user.mapper';

@Module({
  imports: [
    MoviesApiModule.register('tmdb'),
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
  ],
  controllers: [UsersController],
  providers: [UsersService, UserMapper],
})
export class UsersModule {}
