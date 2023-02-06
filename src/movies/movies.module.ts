import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { TmdbApiModule } from './tmdb-api/tmdb-api.module';

@Module({
  imports: [TmdbApiModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
