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
    if (!(await this.countriesService.findCountryByISOCode(rateDto.ISOCode))) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'ISO Code is not found',
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
      await this.ratesService.isUserRated(request.user.userId, rateDto.ISOCode)
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
      rateNumber: rate.rateNumber,
    };
  }

  @Get('/single')
  async findRatesByISOCode(
    @Query('ISOCode') ISOCode,
  ): Promise<ISingleCountryRate> {
    return {
      rates: await this.ratesService.findRatesByISOCode(ISOCode),
      averageRateNumber:
        (await this.ratesService.getAverageByISOCode(ISOCode)) || 0,
    };
  }
}
