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

  async createNote(userId: string, createNoteDto: CreateNoteDto) {
    const user = await this.usersModel.findOne({ userId }).exec();
    if (!user) {
      throw new NotFoundException(`User ${userId} not found`);
    }

    return this.notesModel.create({
      ...createNoteDto,
      user: user._id,
    });
  }

  async updateNote(
    userId: string,
    noteId: string,
    updateNoteDto: UpdateNoteDto,
  ) {
    const user = await this.usersModel.findOne({ userId }).exec();
    if (!user) {
      throw new NotFoundException(`User ${userId} not found`);
    }

    if (!isValidObjectId(noteId)) {
      throw new BadRequestException(`Invalid note id '${noteId}'`);
    }

    const updatedNote = await this.notesModel
      .findOneAndUpdate(
        { _id: noteId, userId: user._id },
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
    const user = await this.usersModel.findOne({ userId }).exec();
    if (!user) {
      throw new NotFoundException(`User ${userId} not found`);
    }

    const movie = await this.moviesApiService.getMovie(movieId);

    if (!movie) {
      throw new NotFoundException(`Movie ${movieId} not found`);
    }

    return this.favoritesModel.create({ user: user._id, movie });
  }
}
