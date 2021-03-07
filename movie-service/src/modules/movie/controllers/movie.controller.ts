import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserParam } from 'common/interfaces';
import { User } from 'decorators';
import { JwtAuthGuard } from 'modules/auth/guards';
import { MovieCreateDto, MovieDto } from '../dtos';
import { MovieService } from '../services';

@Controller()
export class MovieController {
  constructor(private movieService: MovieService) {}

  @UseGuards(JwtAuthGuard)
  @Post('movies')
  async createMovie(
    @User() user: UserParam,
    @Body() movie: MovieCreateDto,
  ): Promise<MovieDto> {
    return await this.movieService.createMovie(user, movie);
  }

  @UseGuards(JwtAuthGuard)
  @Get('movies')
  async getMovies(@User('userId') userId: string): Promise<MovieDto[]> {
    return await this.movieService.getUserMovies(userId);
  }
}
