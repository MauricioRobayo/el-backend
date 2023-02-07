import { Module, DynamicModule } from '@nestjs/common';
import { TmdbApiModule } from './tmdb-api/tmdb-api.module';

type MoviesApiName = 'tmdb'; // 'tmdb' | 'otherMovieApi' | 'anotherOne'

@Module({})
export class MoviesApiModule {
  static forRoot(moviesApiName?: MoviesApiName): DynamicModule {
    switch (moviesApiName) {
      // case 'otherMovieApi':
      //   return {/* ... */}
      // case 'anotherOne':
      //   return {/* ... */}
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
