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

  async isUserRated(userId: string, ISOCode: string): Promise<boolean> {
    const rate = await this.rateModule.findOne({ userId, ISOCode }).exec();
    return rate ? true : false;
  }

  async getAverageByISOCode(ISOCode: string): Promise<number | null> {
    const rates = await this.rateModule.find({ ISOCode }).exec();
    const sum = rates.reduce((sum, rate) => sum + rate.rateNumber, 0);
    return sum / rates.length;
  }

  async findRatesByISOCode(ISOCode: string): Promise<IRateHided[]> {
    const rates = await this.rateModule.find({ ISOCode }).exec();
    return await Promise.all(
      rates.map(async (rate: RateDocument) => {
        const user = await this.usersService.findUserById(rate.userId);
        return {
          user: { username: user.username, avatar: user.avatar },
          rateNumber: rate.rateNumber || 0,
        };
      }),
    );
  }
}
