import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
import { isValidObjectId } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { UserMapper } from './user.mapper';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly usersModel: Model<User>,
    @InjectModel(Note.name) private readonly notesModel: Model<Note>,
    @InjectModel(Favorite.name)
    private readonly favoritesModel: Model<Favorite>,
    private readonly moviesApiService: TmdbApiService,
    private readonly userMapper: UserMapper,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const newUser = await this.usersModel.create(createUserDto);
    return this.userMapper.mapUserToDto(newUser);
  }

  async createNote(userId: string, createNoteDto: CreateNoteDto) {
    if (!isValidObjectId(userId)) {
      throw new BadRequestException(`Invalid user id '${userId}'`);
    }

    const user = await this.usersModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException(`User ${userId} not found`);
    }

    return this.notesModel.create({
      ...createNoteDto,
      user: userId,
    });
  }

  async updateNote(
    userId: string,
    noteId: string,
    updateNoteDto: UpdateNoteDto,
  ) {
    if (!isValidObjectId(userId)) {
      throw new BadRequestException(`Invalid user id '${userId}'`);
    }

    if (!isValidObjectId(noteId)) {
      throw new BadRequestException(`Invalid note id '${noteId}'`);
    }

    const updatedNote = await this.notesModel
      .findOneAndUpdate(
        { _id: noteId, user: userId },
        { $set: updateNoteDto },
        { new: true },
      )
      .exec();

    if (!updatedNote) {
      throw new NotFoundException(
        `Note ${noteId} for user ${userId} not found`,
      );
    }

    return updatedNote;
  }

  async createFavorite(userId: string, { movieId }: CreateFavoriteDto) {
    if (!isValidObjectId(userId)) {
      throw new BadRequestException(`Invalid user id '${userId}'`);
    }

    const user = await this.usersModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException(`User ${userId} not found`);
    }

    const movie = await this.moviesApiService.getMovie(movieId);

    if (!movie) {
      throw new NotFoundException(`Movie ${movieId} not found`);
    }

    return this.favoritesModel.create({ user: userId, movie });
  }
}
