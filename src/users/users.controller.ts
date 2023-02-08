import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { CreateNoteDto } from './dto/create-note.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post(':userId/notes')
  createNote(
    @Param('userId') userId: string,
    @Body() createNoteDto: CreateNoteDto,
  ) {
    return this.usersService.createNote(userId, createNoteDto);
  }

  @Patch(':userId/notes/:noteId')
  updateNote(
    @Param('noteId') noteId: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ) {
    return this.usersService.updateNote(noteId, updateNoteDto);
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
