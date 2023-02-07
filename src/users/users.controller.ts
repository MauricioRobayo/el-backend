import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { CreateNoteDto } from './dto/create-note.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post(':id/notes')
  createNote(@Param('id') id: string, @Body() createNoteDto: CreateNoteDto) {
    return this.usersService.createNote(id, createNoteDto);
  }

  @Post(':id/favorites')
  createFavorite(
    @Param('id') id: string,
    @Body() createFavoriteDto: CreateFavoriteDto,
  ) {
    return this.usersService.createFavorite(id, createFavoriteDto);
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.usersService.createUser(createUserDto);
  }
}
