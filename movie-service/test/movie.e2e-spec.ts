/* eslint-disable @typescript-eslint/no-var-requires */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from 'utils/testing-utils';
import { ConfigModule } from '@nestjs/config';
import { MovieModule } from 'modules/movie';
import { AuthModule } from 'modules/auth';
import { MovieRepository } from 'modules/movie/repositories';
import { basicUserMoviesForCreation } from './data/movie.data';
import { basicUser } from './data/auth.data';

describe('MovieController (e2e)', () => {
  let app: INestApplication;
  let server: any;
  let movieRepository: MovieRepository;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        rootMongooseTestModule({
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
          useCreateIndex: true,
        }),
        AuthModule,
        MovieModule,
      ],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
    server = app.getHttpServer();

    movieRepository = app.get(MovieRepository);
    await movieRepository.create(basicUserMoviesForCreation[0]);
  });

  afterEach(async () => {
    await closeInMongodConnection();
    await app.close();
  });

  describe('/movies (POST)', () => {
    it('should return 401 when expired or wrong jwt', async () => {
      const res = await request(server)
        .post('/movies')
        .set('Authorization', 'bearer ' + basicUser.expiredJwt)
        .send({ title: '12 Angry Men' });
      expect(res.status).toEqual(401);
    });
    it('should return 400 when basic user try to create more than 5 movies during month', async () => {
      for (let i = 1; i < basicUserMoviesForCreation.length; i++) {
        const basicUserMovieForCreation = basicUserMoviesForCreation[i];
        await movieRepository.create(basicUserMovieForCreation);
      }
      const res = await request(server)
        .post('/movies')
        .set('Authorization', 'bearer ' + basicUser.validJwt)
        .send({ title: '12 Angry Men' });
      expect(res.status).toEqual(400);
    });
  });

  describe('/movies (GET)', () => {
    it('should return 401 when expired or wrong jwt', async () => {
      const res = await request(server)
        .get('/movies')
        .set('Authorization', 'bearer ' + basicUser.expiredJwt);
      expect(res.status).toEqual(401);
    });
    it('should return 200 code and array of movies when everything is fine ', async () => {
      const res = await request(server)
        .get('/movies')
        .set('Authorization', 'bearer ' + basicUser.validJwt);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toEqual(1);
    });
  });
});
