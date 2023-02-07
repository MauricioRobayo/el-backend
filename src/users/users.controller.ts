import { Body, Controller, Post } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('favorite')
  createFavorite(@Body() createFavoriteDto: CreateFavoriteDto) {
    return this.usersService.createFavorite(createFavoriteDto);
  }
}
