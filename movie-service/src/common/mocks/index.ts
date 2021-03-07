import { OmdbMovie, UserParam } from 'common/interfaces';
import * as moment from 'moment';

export const omdbMovie: OmdbMovie = {
  director: 'Sidney Lumet',
  genre: 'Crime, Drama',
  released: moment('10 Apr 1957', 'DD MMM YYYY').toDate(),
};

export const user: UserParam = {
  userId: '222',
  role: 'basic',
};
