import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Country, CountrySchema } from 'schemas/country.schema';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    MongooseModule.forFeature([{ name: Country.name, schema: CountrySchema }]),
  ],
  controllers: [CountriesController],
  providers: [CountriesService],
})
export class CountriesModule {}
