import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable } from '@nestjs/common';
import { isAxiosError } from 'axios';
import { ExponentialBackoff, handleWhen, retry } from 'cockatiel';
import { firstValueFrom } from 'rxjs';

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
        this.httpService.get(`search/movie?${searchParams}`),
      );
      return data;
    });
  }
}
