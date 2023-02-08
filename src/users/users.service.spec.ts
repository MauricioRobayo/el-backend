import { Test, TestingModule } from '@nestjs/testing';
import { TmdbApiModule } from '../common/movies-api/tmdb-api/tmdb-api.module';
import { UserMapper } from './user.mapper';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TmdbApiModule],
      providers: [
        UsersService,
        UserMapper,
        {
          provide: 'UserModel',
          useValue: {},
        },
        {
          provide: 'NoteModel',
          useValue: {},
        },
        {
          provide: 'FavoriteModel',
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
