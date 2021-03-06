import { BadRequestException } from '@nestjs/common';

export class CreatedMoviesLimitExceededException extends BadRequestException {
  constructor() {
    super(`Exceeded the creation limit of 5 movies this month`);
  }
}
