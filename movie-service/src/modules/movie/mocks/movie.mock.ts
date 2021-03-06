import { createMock } from '@golevelup/ts-jest';
import { MovieCreateDto, MovieDto } from '../dtos';

export const userId = '222';

export const movieCreateDto: MovieCreateDto = {
  title: '12 Angry Men',
};

export const movieDto: MovieDto = {
  director: 'Sidney Lumet',
  genre: 'Crime, Drama',
  released: new Date('1957-04-10T00:00:00.000Z'),
  title: '12 Angry Men',
};
