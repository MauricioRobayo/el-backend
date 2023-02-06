import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(private readonly httpService: HttpService) {}

  async search({
    query,
    language,
  }: {
    query: string;
    language: string;
  }): Promise<any> {
    const searchParams = new URLSearchParams({
      query,
      language,
    });
    const { data } = await firstValueFrom(
      this.httpService.get(
        `https://api.themoviedb.org/3/search/movie?${searchParams}`,
      ),
    );
    return data;
  }

  create(createMovieDto: CreateMovieDto) {
    return 'This action adds a new movie';
  }

  findAll() {
    return `This action returns all movies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
