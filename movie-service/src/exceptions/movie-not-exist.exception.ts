import { BadRequestException } from '@nestjs/common';

export class MovieNotExistException extends BadRequestException {
  constructor() {
    super(`Movie with such title does not exist`);
  }
}
