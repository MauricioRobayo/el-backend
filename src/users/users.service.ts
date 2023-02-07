import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFavoriteDto } from './dto/create-favorite';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly usersModel: Model<User>,
  ) {}

  createFavorite({ userId, movieId }: CreateFavoriteDto) {
    const user = this.usersModel.findByIdAndUpdate(
      userId,
      { $addToSet: { favorites: movieId } },
      { new: true, upsert: true },
    );

    if (!user) {
      throw new NotFoundException(`User ${userId} not found`);
    }

    return user;
  }
}
