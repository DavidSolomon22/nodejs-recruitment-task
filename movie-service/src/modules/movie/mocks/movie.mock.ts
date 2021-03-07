import { createMock } from '@golevelup/ts-jest';
import { Types } from 'mongoose';
import { MovieCreateDto, MovieDto } from '../dtos';
import { MovieForCreation } from '../interfaces';
import { Movie } from '../schemas';

export const userId = '222';

export const movieCreateDto: MovieCreateDto = {
  title: '12 Angry Men',
};

export const movieDto: MovieDto = {
  _id: '6044fb88a06840002ee64770',
  director: 'Sidney Lumet',
  genre: 'Crime, Drama',
  released: new Date('1957-04-10T00:00:00.000Z'),
  title: '12 Angry Men',
  createdAt: new Date('2021-03-07T16:12:57.000Z'),
};

export const movieDtosArray: MovieDto[] = [movieDto, movieDto, movieDto];

export const movieForCreation: MovieForCreation = {
  userId: userId,
  director: 'Sidney Lumet',
  genre: 'Crime, Drama',
  released: new Date('1957-04-10T00:00:00.000Z'),
  title: '12 Angry Men',
};

export const createdMovie = createMock<Movie>({
  _id: new Types.ObjectId() as any,
  ...movieForCreation,
  createdAt: new Date(),
});

export const moviesArray = [createdMovie, createdMovie, createdMovie];

export const toBigMoviesArray = createMock<Movie[]>([
  { title: 'movie1' },
  { title: 'movie2' },
  { title: 'movie3' },
  { title: 'movie4' },
  { title: 'movie5' },
  { title: 'movie6' },
]);
