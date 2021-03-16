import { IsNotEmpty, IsString } from 'class-validator';
import { IsImageUrlList } from './countries.decorators';

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

  @IsImageUrlList({
    message:
      'Image url list must be an array of { title: string; description: string; url: string }',
  })
  @IsNotEmpty({ message: "Image url list can't be empty" })
  imageUrlList: { title: string; description: string; url: string }[];

  @IsString({ message: 'Video URL must be a string' })
  @IsNotEmpty({ message: "Video URL can't be empty" })
  videoUrl: string;

  @IsString({ message: 'ISO code must be a string' })
  @IsNotEmpty({ message: "ISO code can't be empty" })
  ISOCode: string;

  @IsString({ message: 'Currency code must be a string' })
  @IsNotEmpty({ message: "Currency code can't be empty" })
  currencyCode: string;

  @IsString({ message: 'Time zone must be a string' })
  @IsNotEmpty({ message: "Time zone can't be empty" })
  timezone: string;

  @IsString({ message: 'Geo JSON URL must be a string' })
  @IsNotEmpty({ message: "Geo JSON URL can't be empty" })
  geoJsonUrl: string;

  @IsString({ message: 'Lang must be a string' })
  @IsNotEmpty({ message: "Lang can't be empty" })
  lang: string;
}
