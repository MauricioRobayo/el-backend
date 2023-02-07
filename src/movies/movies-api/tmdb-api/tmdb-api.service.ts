import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable } from '@nestjs/common';
import { isAxiosError } from 'axios';
import { ExponentialBackoff, handleWhen, retry } from 'cockatiel';
import { firstValueFrom } from 'rxjs';
import { SearchMovieDto } from '../../dto/search-movie.dto';
import { MovieResultDto } from '../../dto/movie-result.dto';
import { MoviesApi } from '../movies-api.interface';
import { PopularMovieDto } from '../../dto/popular-movie.dto';
import { TmdbMovieMapper, TmdbResult } from './trmdb-movie.mapper';

@Injectable()
export class TmdbApiService implements MoviesApi {
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
  constructor(
    private readonly httpService: HttpService,
    private readonly tmdbMovieMapper: TmdbMovieMapper,
  ) {}

  search({ query, language, page }: SearchMovieDto): Promise<MovieResultDto> {
    const searchParams = new URLSearchParams({ query });
    if (language) {
      searchParams.append('language', language);
    }
    if (page) {
      searchParams.append('page', String(page));
    }
    return this.retry.execute(async () => {
      const { data } = await firstValueFrom(
        this.httpService.get<TmdbResult>(`search/movie?${searchParams}`),
      );
      return {
        ...data,
        results: data.results.map(this.tmdbMovieMapper.mapToMovieEntity),
      };
    });
  }

  popular({ language, page }: PopularMovieDto): Promise<MovieResultDto> {
    const searchParams = new URLSearchParams();
    if (language) {
      searchParams.append('language', language);
    }
    if (page) {
      searchParams.append('page', String(page));
    }
    return this.retry.execute(async () => {
      const { data } = await firstValueFrom(
        this.httpService.get<TmdbResult>(`movie/popular?${searchParams}`),
      );
      return {
        ...data,
        results: data.results.map(this.tmdbMovieMapper.mapToMovieEntity),
      };
    });
  }
}
