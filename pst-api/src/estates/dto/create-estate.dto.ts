import { IsEnum, Length } from 'class-validator';

export class CreateEstateDto {
  @Length(5, 100)
  name: string;

  @IsEnum(['apartment', 'house', 'holiday-home', 'bungalow'], { message: 'Invalid type' })
  type: 'apartment' | 'house' | 'holiday-home' | 'bungalow';
}
