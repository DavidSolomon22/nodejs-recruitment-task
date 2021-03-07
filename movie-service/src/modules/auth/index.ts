import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies';

@Module({
  imports: [ConfigModule, PassportModule],
  providers: [JwtStrategy],
  exports: [],
})
export class AuthModule {}
