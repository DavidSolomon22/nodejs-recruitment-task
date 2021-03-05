import { Test, TestingModule } from '@nestjs/testing';
import { OmdbService } from 'services/omdb';
import { MovieService } from '.';
import { MovieRepository } from '../repositories';

describe('MovieService', () => {
  let service: MovieService;
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

    service = module.get<MovieService>(MovieService);
    repository = module.get<MovieRepository>(MovieRepository);
    omdbService = module.get<OmdbService>(OmdbService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('repository should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('omdbService should be defined', () => {
    expect(omdbService).toBeDefined();
  });
});
