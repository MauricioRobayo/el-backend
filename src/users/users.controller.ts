import { Body, Controller, Post } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('favorite')
  createFavorite(
    @Body() createFavoriteDto: CreateFavoriteDto,
  ): Promise<UserDto> {
    return this.usersService.createFavorite(createFavoriteDto);
  }
}
