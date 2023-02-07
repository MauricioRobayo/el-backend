import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { isAxiosError } from 'axios';
import { ExponentialBackoff, handleWhen, retry } from 'cockatiel';
import { firstValueFrom } from 'rxjs';
import { MovieResultDto } from '../../../movies/dto/movie-result.dto';
import { MovieDto } from '../../../movies/dto/movie.dto';
import { PopularMovieDto } from '../../../movies/dto/popular-movie.dto';
import { SearchMovieDto } from '../../../movies/dto/search-movie.dto';
import { MoviesApi } from '../movies-api.interface';
import { TmdbMovie, TmdbMovieMapper, TmdbResult } from './trmdb-movie.mapper';

@Injectable()
export class TmdbApiService implements MoviesApi {
  private readonly logger = new Logger(TmdbApiService.name);
  private readonly retryStatuses: (number | undefined)[] = [
    HttpStatus.INTERNAL_SERVER_ERROR,
    HttpStatus.BAD_GATEWAY,
    HttpStatus.GATEWAY_TIMEOUT,
  ];
  private readonly retry = retry(
    handleWhen(
      (err) =>
        isAxiosError(err) && this.retryStatuses.includes(err.response?.status),
    ),
    {
      maxAttempts: 3,
      backoff: new ExponentialBackoff(),
    },
  );
  constructor(
    private readonly httpService: HttpService,
    private readonly tmdbMovieMapper: TmdbMovieMapper,
  ) {
    this.retry.onRetry((data) => {
      this.logger.warn(`Retrying ${data}`);
    });
  }

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

  getMovie(id: number): Promise<MovieDto | null> {
    return this.retry.execute(async () => {
      try {
        const { data } = await firstValueFrom(
          this.httpService.get<TmdbMovie>(`movie/${id}`),
        );
        return this.tmdbMovieMapper.mapToMovieEntity(data);
      } catch (err) {
        if (
          isAxiosError(err) &&
          err.response?.status === HttpStatus.NOT_FOUND
        ) {
          return null;
        }
        throw err;
      }
    });
  }
}
