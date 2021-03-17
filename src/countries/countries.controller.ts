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
  constructor(private countriesService: CountriesService) {}

  @Post('/create')
  async createCountry(
    @Request() request,
    @Body() countryDto: CountryDto,
  ): Promise<CountryDocument> {
    const password = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
    if (password !== process.env.ADMIN_PASSWORD) {
      throw new ForbiddenException();
    }

    return this.countriesService.createCountry(countryDto);
  }

  @Get('/list')
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

    return this.countriesService.getCountryListByLang(lang);
  }

  @Get('/single')
  async findCountryByIdOrNameENAndCapitalEN(
    @Query('id') id,
    @Query('nameEN') nameEN,
    @Query('capitalEN') capitalEN,
  ): Promise<CountryDocument> {
    if (id) {
      const response = await this.countriesService.findCountryById(id);
      if (!response) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            message: 'Country is not found',
            error: 'Bad Request',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      return response;
    } else if (nameEN && capitalEN) {
      const response = await this.countriesService.findCountryByNameENAndCapitalEN(
        nameEN,
        capitalEN,
      );
      if (!response) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            message: 'Country is not found',
            error: 'Bad Request',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      return response;
    } else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Find single country by id or nameEN and capitalEN',
          error: 'Bad Request',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
