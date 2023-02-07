import { Module, DynamicModule } from '@nestjs/common';
import { TmdbApiModule } from './tmdb-api/tmdb-api.module';

type MoviesApiName = 'tmdb'; // 'tmdb' | 'otherMoviesApi' | 'anotherOne'

@Module({})
export class MoviesApiModule {
  static register(moviesApiName?: MoviesApiName): DynamicModule {
    switch (moviesApiName) {
      // case 'otherMoviesApi':
      //   return { /* ... */ }
      // case 'anotherOne':
      //   return { /* ... */}
      //
      //
      // default to 'tmdb'
      case 'tmdb':
      default:
        return {
          module: TmdbApiModule,
        };
    }
  }
}
