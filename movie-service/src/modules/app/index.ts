import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from 'config/services';
import { AuthModule } from 'modules/auth';
import { MovieModule } from 'modules/movie';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
      inject: [ConfigService],
    }),
    AuthModule,
    MovieModule,
  ],
  controllers: [],
  providers: [MongooseConfigService],
})
export class AppModule {}
