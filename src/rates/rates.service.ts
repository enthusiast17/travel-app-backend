import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rate, RateDocument } from 'schemas/rate.schema';
import { UsersService } from 'src/users/users.service';
import { IRate, IRateHided } from './rates.interface';

@Injectable()
export class RatesService {
  constructor(
    @InjectModel(Rate.name) private rateModule: Model<RateDocument>,
    private usersService: UsersService,
  ) {}

  async createRate(rate: IRate): Promise<IRate> {
    return new this.rateModule(rate).save();
  }

  async isUserRated(
    userId: string,
    country: string,
    capital: string,
  ): Promise<boolean> {
    const rate = await this.rateModule
      .findOne({ userId, country, capital })
      .exec();
    return rate ? true : false;
  }

  async getAverageByCountryAndCapital(
    country: string,
    capital: string,
  ): Promise<number | null> {
    const rates = await this.rateModule.find({ country, capital }).exec();
    const sum = rates.reduce((sum, rate) => sum + rate.rateNumber, 0);
    return sum / rates.length;
  }

  async findRatesByCountryAndCapital(
    country: string,
    capital: string,
  ): Promise<IRateHided[]> {
    const rates = await this.rateModule.find({ country, capital }).exec();
    return await Promise.all(
      rates.map(async (rate: RateDocument) => {
        const user = await this.usersService.findUserById(rate.userId);
        return {
          user: { username: user.username, avatar: user.avatar },
          country,
          capital,
          rateNumber: rate.rateNumber || 0,
        };
      }),
    );
  }
}
