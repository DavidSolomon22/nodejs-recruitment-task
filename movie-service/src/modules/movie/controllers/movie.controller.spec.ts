import { Test, TestingModule } from '@nestjs/testing';
import { user } from 'common/mocks';
import { MovieController } from '.';
import { movieCreateDto, movieDto, movieDtosArray, userId } from '../mocks';
import { MovieService } from '../services';

describe('MovieController', () => {
  let controller: MovieController;
  let movieService: MovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [
        {
          provide: MovieService,
          useValue: {
            createMovie: jest.fn(),
            getUserMovies: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MovieController>(MovieController);
    movieService = module.get<MovieService>(MovieService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('service should be defined', () => {
    expect(movieService).toBeDefined();
  });

  describe('createMovie', () => {
    it('should return successfully created movie', async () => {
      const createMovieSpy = jest
        .spyOn(movieService, 'createMovie')
        .mockResolvedValue(movieDto);
      const res = await controller.createMovie(user, movieCreateDto);
      expect(res).toStrictEqual(movieDto);
      expect(createMovieSpy).toBeCalledTimes(1);
    });
  });

  describe('getMovies', () => {
    it('should return array of user movies', async () => {
      const getUserMoviesSpy = jest
        .spyOn(movieService, 'getUserMovies')
        .mockResolvedValue(movieDtosArray);
      const res = await controller.getMovies(userId);
      expect(Array.isArray(res)).toBeTruthy();
      expect(res).toStrictEqual(movieDtosArray);
      expect(getUserMoviesSpy).toBeCalledTimes(1);
    });
  });
});
