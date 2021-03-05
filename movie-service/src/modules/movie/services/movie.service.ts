import { Injectable, NotImplementedException } from '@nestjs/common';
import { OmdbService } from 'services/omdb';
import { MovieCreateDto, MovieDto } from '../dtos';
import { MovieRepository } from '../repositories';

@Injectable()
export class MovieService {
  constructor(
    private movieRepository: MovieRepository,
    private omdbService: OmdbService,
  ) {}

  async createMovie(userId: string, movie: MovieCreateDto): Promise<MovieDto> {
    throw new NotImplementedException();
  }

  async getUserMovies(userId: string): Promise<MovieDto[]> {
    throw new NotImplementedException();
  }
}
