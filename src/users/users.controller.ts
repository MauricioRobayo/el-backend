import { Body, Controller, Post } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('favorites')
  createFavorite(
    @Body() createFavoriteDto: CreateFavoriteDto,
  ): Promise<UserDto> {
    return this.usersService.createFavorite(createFavoriteDto);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.usersService.createUser(createUserDto);
  }
}
