import { Test, TestingModule } from '@nestjs/testing';
import { TmdbApiModule } from '../common/movies-api/tmdb-api/tmdb-api.module';
import { UserMapper } from './user.mapper';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TmdbApiModule],
      controllers: [UsersController],
      providers: [
        UserMapper,
        UsersService,
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

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
