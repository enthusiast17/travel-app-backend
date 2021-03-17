import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RateDto {
  @IsString({ message: 'Country must be a string' })
  @IsNotEmpty({ message: "Country can't be empty" })
  country: string;

  @IsString({ message: 'Capital must be a string' })
  @IsNotEmpty({ message: "Capital can't be empty" })
  capital: string;

  @IsNumber({}, { message: 'Rate number must be a number' })
  @IsNotEmpty({ message: "Rate number can't be empty" })
  rateNumber: number;
}
