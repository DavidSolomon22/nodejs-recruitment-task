import { Injectable, NotImplementedException } from '@nestjs/common';
import { UserParam } from 'common/interfaces';
import { OmdbService } from 'services/omdb';
import { MovieCreateDto, MovieDto } from '../dtos';
import { MovieRepository } from '../repositories';

@Injectable()
export class MovieService {
  constructor(
    private movieRepository: MovieRepository,
    private omdbService: OmdbService,
  ) {}

  async createMovie(user: UserParam, movie: MovieCreateDto): Promise<MovieDto> {
    const userLastFiveMovies = await this.movieRepository.getUserLastFiveMovies(
      user.userId,
    );
    throw new NotImplementedException();
  }

  async getUserMovies(userId: string): Promise<MovieDto[]> {
    throw new NotImplementedException();
  }
}
