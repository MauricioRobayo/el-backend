import { Module, DynamicModule } from '@nestjs/common';
import { TmdbApiModule } from './tmdb-api/tmdb-api.module';

type MoviesApiName = 'tmdb'; // 'tmdb' | 'otherMoviesApi' | 'anotherOne'

@Module({})
export class MoviesApiModule {
  static forRoot(moviesApiName?: MoviesApiName): DynamicModule {
    switch (moviesApiName) {
      // case 'otherMoviesApi':
      //   return { module: OtherMoviesApi, /* ... */ }
      // case 'anotherOne':
      //   return { module: AnotherOne, /* ... */}
      //
      //
      // default to 'tmdb' if no argument provided
      case 'tmdb':
      default:
        return {
          module: TmdbApiModule,
        };
    }
  }
}
