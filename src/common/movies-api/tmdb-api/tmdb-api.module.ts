import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TmdbApiService } from './tmdb-api.service';
import { TmdbMovieMapper } from './trmdb-movie.mapper';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        baseURL: process.env.TMDB_API_BASE_URL,
        headers: {
          Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        },
      }),
    }),
  ],
  providers: [TmdbApiService, TmdbMovieMapper],
  exports: [TmdbApiService],
})
export class TmdbApiModule {}
