import { Module, DynamicModule } from '@nestjs/common';
import { TmdbApiModule } from './tmdb-api/tmdb-api.module';

type MoviesApiName = 'tmdb';

@Module({})
export class MoviesApiModule {
  static forRoot(moviesApiName: MoviesApiName): DynamicModule {
    switch (moviesApiName) {
      case 'tmdb':
      default:
        return {
          module: TmdbApiModule,
        };
    }
  }
}
