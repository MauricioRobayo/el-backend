import { Module } from '@nestjs/common';
import { MoviesApiModule } from '../common/movies-api/movies-api.module';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  imports: [MoviesApiModule.register('tmdb')],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
