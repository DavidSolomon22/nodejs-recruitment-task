import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OmdbMovieNotFound } from 'common/enums/omdb-movie-not-found.enum';
import { OmdbMovie } from 'common/interfaces';
import { MovieNotExistException } from 'exceptions/movie-not-exist.exception';
import * as moment from 'moment';

@Injectable()
export class OmdbService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  private omdbUrl = this.configService.get<string>('OMDB_URL');
  private omdbApiKey = this.configService.get<string>('OMDB_API_KEY');

  async getMovieByTitle(title: string): Promise<OmdbMovie> {
    const { data } = await this.httpService
      .get(`${this.omdbUrl}?t=${title}&apikey=${this.omdbApiKey}`)
      .toPromise();
    if (
      data?.Response === OmdbMovieNotFound.Response &&
      data?.Error === OmdbMovieNotFound.Error
    ) {
      throw new MovieNotExistException();
    }
    const omdbMovie: OmdbMovie = {
      director: data?.Director === 'N/A' ? undefined : data?.Director,
      genre: data?.Genre === 'N/A' ? undefined : data?.Genre,
      released:
        data?.Released === 'N/A'
          ? undefined
          : moment(data?.Released, 'DD MMM YYYY').toDate(),
    };
    return omdbMovie;
  }
}
