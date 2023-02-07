import { Module } from '@nestjs/common';
import { TmdbApiModule } from './movie-api/tmdb-api/tmdb-api.module';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  imports: [TmdbApiModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
