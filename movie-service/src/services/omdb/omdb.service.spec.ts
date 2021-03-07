import { createMock } from '@golevelup/ts-jest';
import { HttpService } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosResponse } from 'axios';
import { omdbMovie } from 'common/mocks';
import { MovieNotExistException } from 'exceptions/movie-not-exist.exception';
import { Observable } from 'rxjs';
import { OmdbService } from '.';

describe('OmdbService', () => {
  let omdbService: OmdbService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OmdbService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    omdbService = module.get<OmdbService>(OmdbService);
    httpService = module.get<HttpService>(HttpService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('omdbService should be defined', () => {
    expect(omdbService).toBeDefined();
  });

  it('httpService should be defined', () => {
    expect(httpService).toBeDefined();
  });

  describe('getMovieByTitle', () => {
    it('should throw MovieNotExistException when movie not found', async () => {
      const movieNotFoundResponse = {
        Response: 'False',
        Error: 'Movie not found!',
      };
      const response = {
        body: {
          movieNotFoundResponse,
        },
      };
      jest.spyOn(httpService, 'get').mockReturnValueOnce(
        createMock<Observable<AxiosResponse<any>>>({
          toPromise: jest.fn().mockResolvedValueOnce(response),
        }),
      );
      const movieTitle = '12 Angry Men';
      expect(omdbService.getMovieByTitle(movieTitle)).rejects.toThrowError(
        MovieNotExistException,
      );
    });
    it('should map omdb response object to OmdbMovie interface and return it', async () => {
      const omdbResponseObject = {
        Title: '12 Angry Men',
        Year: '1957',
        Rated: 'Approved',
        Released: '10 Apr 1957',
        Runtime: '96 min',
        Genre: 'Crime, Drama',
        Director: 'Sidney Lumet',
      };
      const response = {
        body: {
          omdbResponseObject,
        },
      };
      jest.spyOn(httpService, 'get').mockReturnValueOnce(
        createMock<Observable<AxiosResponse<any>>>({
          toPromise: jest.fn().mockResolvedValueOnce(response),
        }),
      );
      const movieTitle = '12 Angry Men';
      const res = await omdbService.getMovieByTitle(movieTitle);
      expect(res?.released instanceof Date).toBeTruthy();
      expect(res).toStrictEqual(omdbMovie);
    });
  });
});
