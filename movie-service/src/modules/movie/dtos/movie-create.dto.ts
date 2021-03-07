import { IsNotEmpty, IsString } from 'class-validator';

export class MovieCreateDto {
  @IsNotEmpty()
  @IsString()
  title: string;
}
