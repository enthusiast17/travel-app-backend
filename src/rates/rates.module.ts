import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Country, CountrySchema } from 'schemas/country.schema';
import { Rate, RateSchema } from 'schemas/rate.schema';
import { User, UserSchema } from 'schemas/user.schema';
import { CountriesService } from 'src/countries/countries.service';
import { UsersService } from 'src/users/users.service';
import { RatesController } from './rates.controller';
import { RatesService } from './rates.service';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Country.name, schema: CountrySchema }]),
    MongooseModule.forFeature([{ name: Rate.name, schema: RateSchema }]),
  ],
  controllers: [RatesController],
  providers: [RatesService, UsersService, CountriesService],
})
export class RatesModule {}
