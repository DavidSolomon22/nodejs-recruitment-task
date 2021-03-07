import { Test, TestingModule } from '@nestjs/testing';
import { user } from 'common/mocks';
import { MovieController } from '.';
import { movieCreateDto, movieDto } from '../mocks';
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
});
