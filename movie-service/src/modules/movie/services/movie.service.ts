import { Injectable, NotImplementedException } from '@nestjs/common';
import { Role } from 'common/enums';
import { UserParam } from 'common/interfaces';
import { CreatedMoviesLimitExceededException } from 'exceptions';
import * as moment from 'moment';
import { OmdbService } from 'services/omdb';
import { MovieCreateDto, MovieDto } from '../dtos';
import { MovieForCreation } from '../interfaces';
import { MovieRepository } from '../repositories';

@Injectable()
export class MovieService {
  constructor(
    private movieRepository: MovieRepository,
    private omdbService: OmdbService,
  ) {}

  async createMovie(user: UserParam, movie: MovieCreateDto): Promise<MovieDto> {
    if (user.role === Role.Basic) {
      const lastMonthDate = new Date();
      lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
      const userMoviesFromLastMonth = await this.movieRepository.getUserMoviesFromLastPeriod(
        user.userId,
        lastMonthDate,
      );
      if (userMoviesFromLastMonth.length >= 5) {
        throw new CreatedMoviesLimitExceededException();
      }
    }
    const omdbMovie = await this.omdbService.getMovieByTitle(movie?.title);
    const movieForCreation: MovieForCreation = {
      title: movie?.title,
      userId: user?.userId,
      ...omdbMovie,
    };
    return await this.movieRepository.create(movieForCreation);
  }

  async getUserMovies(userId: string): Promise<MovieDto[]> {
    throw new NotImplementedException();
  }
}
