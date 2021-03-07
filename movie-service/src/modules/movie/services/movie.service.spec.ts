import { Test, TestingModule } from '@nestjs/testing';
import { omdbMovie, user } from 'common/mocks';
import { CreatedMoviesLimitExceededException } from 'exceptions/created-movies-limit-exceeded.exception';
import { OmdbService } from 'services/omdb';
import { MovieService } from '.';
import {
  createdMovie,
  movieCreateDto,
  movieForCreation,
  moviesArray,
  toBigMoviesArray,
  userId,
} from '../mocks';
import { MovieRepository } from '../repositories';

describe('MovieService', () => {
  let movieService: MovieService;
  let repository: MovieRepository;
  let omdbService: OmdbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        {
          provide: MovieRepository,
          useValue: {
            create: jest.fn(),
            getUserMovies: jest.fn(),
            getUserMoviesFromLastPeriod: jest.fn(),
          },
        },
        {
          provide: OmdbService,
          useValue: {
            getMovieByTitle: jest.fn(),
          },
        },
      ],
    }).compile();

    movieService = module.get<MovieService>(MovieService);
    repository = module.get<MovieRepository>(MovieRepository);
    omdbService = module.get<OmdbService>(OmdbService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('service should be defined', () => {
    expect(movieService).toBeDefined();
  });

  it('repository should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('omdbService should be defined', () => {
    expect(omdbService).toBeDefined();
  });

  describe('createMovie', () => {
    it('should throw an error if user with basic role has already seen 5 movies at month', async () => {
      jest
        .spyOn(repository, 'getUserMoviesFromLastPeriod')
        .mockResolvedValue(toBigMoviesArray);
      expect(
        movieService.createMovie(user, movieCreateDto),
      ).rejects.toThrowError(CreatedMoviesLimitExceededException);
    });
    it('should get information about the movie from omdb service', async () => {
      jest
        .spyOn(repository, 'getUserMoviesFromLastPeriod')
        .mockResolvedValue(moviesArray);
      const getMovieByTitleSpy = jest
        .spyOn(omdbService, 'getMovieByTitle')
        .mockResolvedValue(omdbMovie);
      await movieService.createMovie(user, movieCreateDto);
      expect(getMovieByTitleSpy).toHaveBeenCalledTimes(1);
      expect(getMovieByTitleSpy).toHaveBeenCalledWith(movieCreateDto.title);
    });
    it('should return successfully created movie', async () => {
      jest
        .spyOn(repository, 'getUserMoviesFromLastPeriod')
        .mockResolvedValue(moviesArray);
      jest.spyOn(omdbService, 'getMovieByTitle').mockResolvedValue(omdbMovie);
      const createSpy = jest
        .spyOn(repository, 'create')
        .mockResolvedValue(createdMovie);
      const res = await movieService.createMovie(user, movieCreateDto);
      expect(createSpy).toHaveBeenCalledTimes(1);
      expect(createSpy).toHaveBeenCalledWith(movieForCreation);
      expect(res).toBeDefined();
    });
  });

  describe('getUserMovies', () => {
    it('should return array of user movies', async () => {
      const getUserMoviesSpy = jest
        .spyOn(repository, 'getUserMovies')
        .mockResolvedValue(moviesArray);
      const res = await movieService.getUserMovies(userId);
      expect(getUserMoviesSpy).toBeCalledTimes(1);
      expect(Array.isArray(res)).toBeTruthy();
    });
  });
});
