import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isAxiosError } from 'axios';
import { Model } from 'mongoose';
import { TmdbApiService } from '../common/movies-api/tmdb-api/tmdb-api.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UserMapper } from './users.mapper';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly usersModel: Model<User>,
    private readonly userMapper: UserMapper,
    private readonly moviesApiService: TmdbApiService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const newUser = new this.usersModel(createUserDto);
    const createdUser = await newUser.save();
    return this.userMapper.mapToUserDto(createdUser);
  }

  async createFavorite({
    userId,
    movieId,
  }: CreateFavoriteDto): Promise<UserDto> {
    const isValidMovieId = await this.isValidMovieId(movieId);

    if (!isValidMovieId) {
      throw new NotFoundException(`Movie ${movieId} not found`);
    }

    const user = await this.usersModel.findByIdAndUpdate(
      userId,
      { $addToSet: { favorites: movieId } },
      { new: true },
    );

    if (!user) {
      throw new NotFoundException(`User ${userId} not found`);
    }

    return this.userMapper.mapToUserDto(user);
  }

  private async isValidMovieId(movieId: number): Promise<boolean> {
    try {
      await this.moviesApiService.getMovie(movieId);
      return true;
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 404) {
        return false;
      }
      throw new InternalServerErrorException();
    }
  }
}
