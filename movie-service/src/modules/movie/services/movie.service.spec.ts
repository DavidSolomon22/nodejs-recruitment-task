import { Test, TestingModule } from '@nestjs/testing';
import { omdbMovie, user } from 'common/mocks';
import { CreatedMoviesLimitExceededException } from 'exceptions/created-movies-limit-exceeded.exception';
import { OmdbService } from 'services/omdb';
import { MovieService } from '.';
import {
  createdMovie,
  movieCreateDto,
  movieDto,
  movieForCreation,
  toBigMoviesArray,
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
            getUserLastFiveMovies: jest.fn(),
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
        .spyOn(repository, 'getUserLastFiveMovies')
        .mockResolvedValue(toBigMoviesArray);
      expect(
        movieService.createMovie(user, movieCreateDto),
      ).rejects.toThrowError(CreatedMoviesLimitExceededException);
    });
    it('should get information about the movie from omdb service', async () => {
      const getMovieByTitleSpy = jest
        .spyOn(omdbService, 'getMovieByTitle')
        .mockResolvedValue(omdbMovie);
      await movieService.createMovie(user, movieCreateDto);
      expect(getMovieByTitleSpy).toHaveBeenCalledTimes(1);
      expect(getMovieByTitleSpy).toHaveBeenCalledWith(movieCreateDto.title);
    });
    it('should transform released date of film from string into date');
    it('should return successfully created movie', async () => {
      const createSpy = jest
        .spyOn(repository, 'create')
        .mockResolvedValue(createdMovie);
      const res = await movieService.createMovie(user, movieForCreation);
      expect(createSpy).toHaveBeenCalledTimes(1);
      expect(createSpy).toHaveBeenCalledWith(movieForCreation);
      expect(res).toEqual(movieDto);
    });
  });
});
