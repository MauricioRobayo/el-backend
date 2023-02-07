import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TmdbApiService } from '../common/movies-api/tmdb-api/tmdb-api.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { CreateNoteDto } from './dto/create-note.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { Favorite } from './entities/favorite.entity';
import { Note } from './entities/note.entity';
import { User } from './entities/user.entity';
import { UserMapper } from './users.mapper';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly usersModel: Model<User>,
    @InjectModel(Note.name) private readonly notesModel: Model<Note>,
    @InjectModel(Favorite.name)
    private readonly favoritesModel: Model<Favorite>,
    private readonly userMapper: UserMapper,
    private readonly moviesApiService: TmdbApiService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const newUser = new this.usersModel(createUserDto);
    const createdUser = await newUser.save();
    return this.userMapper.mapToUserDto(createdUser);
  }

  async getUser(id: string) {
    const user = await this.usersModel.findById(id);
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return this.userMapper.mapToUserDto(user);
  }

  async createNote(userId: string, createNoteDto: CreateNoteDto) {
    const newNote = new this.notesModel({
      user: userId,
      ...createNoteDto,
    });
    return newNote.save();
  }

  async createFavorite(userId: string, { movieId }: CreateFavoriteDto) {
    const movie = await this.moviesApiService.getMovie(movieId);

    if (!movie) {
      throw new NotFoundException(`Movie ${movieId} not found`);
    }

    const newFavorite = new this.favoritesModel({ user: userId, movie });
    return newFavorite.save();
  }
}
