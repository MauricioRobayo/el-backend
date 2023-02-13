import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { UsersService } from './users.service';

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
