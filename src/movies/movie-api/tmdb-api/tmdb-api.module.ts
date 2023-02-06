import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TmdbApiService } from './tmdb-api.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        baseURL: process.env.TMDB_BASE_API_URL,
        headers: {
          Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        },
      }),
    }),
  ],
  providers: [TmdbApiService],
  exports: [TmdbApiService],
})
export class TmdbApiModule {}
