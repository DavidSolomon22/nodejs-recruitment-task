import { HttpService } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
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
            somefunc: jest.fn(),
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
});
