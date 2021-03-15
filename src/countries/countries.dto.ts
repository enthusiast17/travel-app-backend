import { IsNotEmpty, IsString } from 'class-validator';
import {
  IsCapitalCoordinates,
  IsCountryCoordinates,
  IsImageUrlList,
} from './countries.decorators';

export class CountryDto {
  @IsString({ message: 'Capital must be a string' })
  @IsNotEmpty({ message: "Capital can't be empty" })
  capital: string;

  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: "Description can't be empty" })
  description: string;

  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: "Name can't be empty" })
  name: string;

  @IsString({ message: 'Image URL must be a string' })
  @IsNotEmpty({ message: "Image URL can't be empty" })
  previewImageUrl: string;

  @IsImageUrlList({ message: 'Image url list must be an array of string' })
  @IsNotEmpty({ message: "Image url list can't be empty" })
  imageUrlList: string[];

  @IsString({ message: 'Video URL must be a string' })
  @IsNotEmpty({ message: "Video URL can't be empty" })
  videoUrl: string;

  @IsString({ message: 'Currency must be a string' })
  @IsNotEmpty({ message: "Currency can't be empty" })
  currency: string;

  @IsString({ message: 'ISO Code must be a string' })
  @IsNotEmpty({ message: "ISO Code can't be empty" })
  ISOCode: string;

  @IsNotEmpty({ message: "Capital coordinates coordinates can't be empty" })
  @IsCapitalCoordinates({
    message:
      'Capital coordinates must be an array of coordinates [number, number]',
  })
  capitalCoordinates: number[];

  @IsNotEmpty({ message: "Country coordinates coordinates can't be empty" })
  @IsCountryCoordinates({
    message:
      'Country coordinates must be an 3d array of coordinates [[[number, number]]]',
  })
  @IsNotEmpty({ message: "Country coordinates can't be empty" })
  countryCoordinates: number[][][];

  @IsString({ message: 'Lang must be a string' })
  @IsNotEmpty({ message: "Lang can't be empty" })
  lang: string;
}
