import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable } from '@nestjs/common';
import { isAxiosError } from 'axios';
import { ExponentialBackoff, handleWhen, retry } from 'cockatiel';
import { firstValueFrom } from 'rxjs';
import { Movie } from '../entities/movie.entity';
import { SearchMovieDto } from '../dto/search-movie.dto';

interface SearchResult {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

@Injectable()
export class TmdbApiService {
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

  search({ query, language }: SearchMovieDto): Promise<SearchResult> {
    const searchParams = new URLSearchParams({
      query,
      language,
    });
    return this.retry.execute(async () => {
      const { data } = await firstValueFrom(
        this.httpService.get<SearchResult>(`search/movie?${searchParams}`),
      );
      return data;
    });
  }
}
