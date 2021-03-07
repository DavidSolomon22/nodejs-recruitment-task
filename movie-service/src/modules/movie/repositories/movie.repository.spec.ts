import { createMock } from '@golevelup/ts-jest';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model, Query } from 'mongoose';
import { MovieRepository } from '.';
import { createdMovie, movieForCreation, moviesArray, userId } from '../mocks';
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
    it('should return created movie', async () => {
      const createSpy = jest
        .spyOn(model, 'create')
        .mockResolvedValue(createdMovie as never);
      const res = await repository.create(movieForCreation);
      expect(res).toBeDefined();
      expect(res).toStrictEqual(createdMovie);
      expect(createSpy).toHaveBeenCalledTimes(1);
      expect(createSpy).toHaveBeenCalledWith(movieForCreation);
    });
  });

  describe('getUserMovies', () => {
    it('should return all user movies', async () => {
      const findSpy = jest.spyOn(model, 'find').mockReturnValueOnce(
        createMock<Query<Movie[], Movie>>({
          exec: jest.fn().mockResolvedValueOnce(moviesArray),
        }),
      );
      const res = await repository.getUserMovies(userId);
      expect(findSpy).toBeCalledTimes(1);
      expect(res).toStrictEqual(moviesArray);
    });
  });

  describe('getUserMoviesFromLastPeriod', () => {
    it('should return created movies by specific user from last period', async () => {
      const findSpy = jest.spyOn(model, 'find').mockReturnValueOnce(
        createMock<Query<Movie[], Movie>>({
          exec: jest.fn().mockResolvedValueOnce(moviesArray),
        }),
      );
      const lastMonthDate = new Date();
      lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
      const res = await repository.getUserMoviesFromLastPeriod(
        userId,
        lastMonthDate,
      );
      expect(findSpy).toBeCalledTimes(1);
      expect(res).toStrictEqual(moviesArray);
    });
  });
});
