import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CountriesService } from 'src/countries/countries.service';
import { UsersService } from 'src/users/users.service';
import { RateDto } from './rates.dto';
import { IRateHided, ISingleCountryRate } from './rates.interface';
import { RatesService } from './rates.service';

@Controller('rates')
export class RatesController {
  constructor(
    private ratesService: RatesService,
    private usersService: UsersService,
    private countriesService: CountriesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createRate(
    @Request() request,
    @Body() rateDto: RateDto,
  ): Promise<IRateHided> {
    if (
      (
        await this.countriesService.findCountriesByNameENAndCapitalEN(
          rateDto.country,
          rateDto.capital,
        )
      ).length === 0
    ) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Country or capital is not found',
          error: 'Bad Request',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (rateDto.rateNumber < 1 || rateDto.rateNumber > 5) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Rate number must be from 1 to 5',
          error: 'Bad Request',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      await this.ratesService.isUserRated(
        request.user.userId,
        rateDto.country,
        rateDto.capital,
      )
    ) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'User is already rated',
          error: 'Bad Request',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const rate = await this.ratesService.createRate({
      userId: request.user.userId,
      ...rateDto,
    });
    const user = await this.usersService.findUserById(request.user.userId);
    return {
      user: { username: user.username, avatar: user.avatar },
      country: rate.country,
      capital: rate.capital,
      rateNumber: rate.rateNumber,
    };
  }

  @Get('/single')
  async findRatesByCountryAndCapital(
    @Query('country') country,
    @Query('capital') capital,
  ): Promise<ISingleCountryRate> {
    if (capital && country) {
      return {
        rates: await this.ratesService.findRatesByCountryAndCapital(
          country,
          capital,
        ),
        averageRateNumber:
          (await this.ratesService.getAverageByCountryAndCapital(
            country,
            capital,
          )) || 0,
      };
    } else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Find single rating by capital and country',
          error: 'Bad Request',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
