import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { CreateNoteDto } from './dto/create-note.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
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
    @Param('userId') userId: string,
    @Param('noteId') noteId: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ) {
    return this.usersService.updateNote(userId, noteId, updateNoteDto);
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
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
}
