import {
  Injectable,
  HttpService,
  NotImplementedException,
} from '@nestjs/common';
import { OmdbMovie } from 'common/interfaces';

@Injectable()
export class OmdbService {
  constructor(private httpService: HttpService) {}

  getMovieByTitle(title: string): Promise<OmdbMovie> {
    throw new NotImplementedException();
  }
}
