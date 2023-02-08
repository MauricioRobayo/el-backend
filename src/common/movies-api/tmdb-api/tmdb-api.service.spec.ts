import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { TmdbApiService } from './tmdb-api.service';
import { TmdbMovieMapper } from './trmdb-movie.mapper';

describe('TmdbApiServiceService', () => {
  let service: TmdbApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [TmdbApiService, TmdbMovieMapper],
    }).compile();

    service = module.get<TmdbApiService>(TmdbApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
