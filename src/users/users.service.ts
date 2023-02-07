import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
}
