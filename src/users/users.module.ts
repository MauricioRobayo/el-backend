import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { UserMapper } from './users.mapper';
import { MoviesApiModule } from '../common/movies-api/movies-api.module';
import { Note, NoteSchema } from './entities/note.entity';

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
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserMapper],
})
export class UsersModule {}
