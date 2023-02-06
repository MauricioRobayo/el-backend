import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable } from '@nestjs/common';
import { isAxiosError } from 'axios';
import { ExponentialBackoff, handleWhen, retry } from 'cockatiel';
import { firstValueFrom } from 'rxjs';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
@Injectable()
export class MoviesService {
  private readonly retryStatuses: (number | undefined)[] = [
    HttpStatus.INTERNAL_SERVER_ERROR,
    HttpStatus.BAD_GATEWAY,
    HttpStatus.GATEWAY_TIMEOUT,
  ];
  private readonly retry = retry(
    handleWhen(
      (err) => isAxiosError(err) && this.retryStatuses.includes(err.status),
    ),
    {
      maxAttempts: 3,
      backoff: new ExponentialBackoff(),
    },
  );
  constructor(private readonly httpService: HttpService) {}

  search({
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
    return this.retry.execute(async () => {
      const { data } = await firstValueFrom(
        this.httpService.get(
          `https://api.themoviedb.org/3/search/movie?${searchParams}`,
        ),
      );
      return data;
    });
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
