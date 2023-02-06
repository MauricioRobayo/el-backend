import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable } from '@nestjs/common';
import { isAxiosError } from 'axios';
import { ExponentialBackoff, handleWhen, retry } from 'cockatiel';
import { firstValueFrom } from 'rxjs';
import { SearchMovieDto } from '../../dto/search-movie.dto';
import { SearchMovieResultDto } from '../../dto/search-movie-result.dto';
import { MovieApi } from '../interfaces/movie-api.interface';

@Injectable()
export class TmdbApiService implements MovieApi {
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

  search(query: SearchMovieDto): Promise<SearchMovieResultDto> {
    const searchParams = new URLSearchParams({
      query: query.query,
    });
    if (query.language) {
      searchParams.append('language', query.language);
    }
    if (query.page) {
      searchParams.append('page', String(query.page));
    }
    return this.retry.execute(async () => {
      const { data } = await firstValueFrom(
        this.httpService.get<SearchMovieResultDto>(
          `search/movie?${searchParams}`,
        ),
      );
      return data;
    });
  }
}
