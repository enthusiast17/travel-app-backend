import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Request,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import { CountryDocument } from 'schemas/country.schema';
import { CountryDto } from './countries.dto';
import { CountriesService } from './countries.service';

@Controller('countries')
export class CountriesController {
  constructor(private counrtriesService: CountriesService) {}

  @Post('/create')
  async createCountry(
    @Request() request,
    @Body() countryDto: CountryDto,
  ): Promise<CountryDocument> {
    const password = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
    if (password !== process.env.ADMIN_PASSWORD) {
      throw new ForbiddenException();
    }

    return this.counrtriesService.createCountry(countryDto);
  }

  @Get()
  async getCountriesByLang(@Query('lang') lang): Promise<CountryDocument[]> {
    if (!['kz', 'en', 'ru'].includes(lang)) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Lang is not found. Choose from [kz, en, ru]',
          error: 'Bad Request',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.counrtriesService.getCountryListByLang(lang);
  }
}
