import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RateDto {
  @IsString({ message: 'ISOCode must be a string' })
  @IsNotEmpty({ message: "ISOCode can't be empty" })
  ISOCode: string;

  @IsNumber({}, { message: 'Rate number must be a number' })
  @IsNotEmpty({ message: "Rate number can't be empty" })
  rateNumber: number;
}
