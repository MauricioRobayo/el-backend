import { Module } from '@nestjs/common';
import { MoviesApiModule } from './movies-api/movies-api.module';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  imports: [MoviesApiModule.forRoot('tmdb')],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
