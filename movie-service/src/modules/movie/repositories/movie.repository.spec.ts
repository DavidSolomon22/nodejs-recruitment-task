import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { MovieRepository } from '.';
import { Movie } from '../schemas';

describe('MovieRepository', () => {
  let repository: MovieRepository;
  let model: Model<Movie>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieRepository,
        {
          provide: getModelToken('Movie'),
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<MovieRepository>(MovieRepository);
    model = module.get<Model<Movie>>(getModelToken('Movie'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('repository should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('model should be defined', () => {
    expect(model).toBeDefined();
  });

  describe('create', () => {
    it('should return created movie', async () => {});
  });

  describe('getUserMovies', () => {
    it('should return all user movies', async () => {});
  });

  describe('getUserLastFiveMovies', () => {
    it('should return last 5 created movies by specific user (or less)', async () => {});
  });
});
