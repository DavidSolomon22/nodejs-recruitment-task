/* eslint-disable @typescript-eslint/no-var-requires */
import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieController } from './controllers';
import { Movie, MovieSchema } from './schemas';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeatureAsync([
      {
        name: Movie.name,
        useFactory: () => {
          const schema = MovieSchema;
          return schema;
        },
      },
    ]),
  ],
  controllers: [MovieController],
  exports: [],
  providers: [],
})
export class MovieModule {}