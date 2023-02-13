import {
  Body,
  Controller,
  Request,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { CreateNoteDto } from './dto/create-note.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('notes')
  @UseGuards(AuthGuard('jwt'))
  createNote(
    @Request() req: { user: { idUser: string } },
    @Body() createNoteDto: CreateNoteDto,
  ) {
    return this.usersService.createNote(req.user.idUser, createNoteDto);
  }

  @Patch('notes/:noteId')
  @UseGuards(AuthGuard('jwt'))
  updateNote(
    @Request() req: { user: { idUser: string } },
    @Param('noteId') noteId: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ) {
    return this.usersService.updateNote(req.user.idUser, noteId, updateNoteDto);
  }

  @Post('favorites')
  @UseGuards(AuthGuard('jwt'))
  createFavorite(
    @Request() req: { user: { idUser: string } },
    @Body() createFavoriteDto: CreateFavoriteDto,
  ) {
    return this.usersService.createFavorite(req.user.idUser, createFavoriteDto);
  }
}
