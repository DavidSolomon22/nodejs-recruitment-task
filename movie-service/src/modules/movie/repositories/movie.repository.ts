import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MovieForCreation } from '../interfaces';
import { Movie } from '../schemas';

@Injectable()
export class MovieRepository {
  constructor(
    @InjectModel('Movie')
    private movieModel: Model<Movie>,
  ) {}

  async create(movie: MovieForCreation): Promise<Movie> {
    return this.movieModel.create(movie as Movie);
  }

  async getUserMovies(userId: string): Promise<Movie[]> {
    return this.movieModel.find({ userId }).exec();
  }

  async getUserLastFiveMovies(userId: string): Promise<Movie[]> {
    throw new NotImplementedException();
  }
}
