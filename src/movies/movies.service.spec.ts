import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { TmdbApiModule } from '../common/movies-api/tmdb-api/tmdb-api.module';
import { TmdbApiService } from '../common/movies-api/tmdb-api/tmdb-api.service';
import { TmdbMovieMapper } from '../common/movies-api/tmdb-api/trmdb-movie.mapper';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TmdbApiModule, HttpModule],
      providers: [MoviesService, TmdbMovieMapper],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
