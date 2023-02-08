import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TmdbApiService } from '../common/movies-api/tmdb-api/tmdb-api.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { CreateNoteDto } from './dto/create-note.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Favorite } from './entities/favorite.entity';
import { Note } from './entities/note.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly usersModel: Model<User>,
    @InjectModel(Note.name) private readonly notesModel: Model<Note>,
    @InjectModel(Favorite.name)
    private readonly favoritesModel: Model<Favorite>,
    private readonly moviesApiService: TmdbApiService,
  ) {}

  createUser(createUserDto: CreateUserDto) {
    return this.usersModel.create(createUserDto);
  }

  async getUser(id: string) {
    const user = await this.usersModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  createNote(userId: string, createNoteDto: CreateNoteDto) {
    return this.notesModel.create({
      ...createNoteDto,
      user: userId,
    });
  }

  async updateNote(noteId: string, updateNoteDto: UpdateNoteDto) {
    const updatedNote = await this.notesModel
      .findByIdAndUpdate(noteId, { $set: updateNoteDto })
      .exec();

    if (!updatedNote) {
      throw new NotFoundException(`Note ${noteId} not found`);
    }

    return updatedNote;
  }

  async createFavorite(userId: string, { movieId }: CreateFavoriteDto) {
    const movie = await this.moviesApiService.getMovie(movieId);

    if (!movie) {
      throw new NotFoundException(`Movie ${movieId} not found`);
    }

    return this.favoritesModel.create({ user: userId, movie });
  }
}
