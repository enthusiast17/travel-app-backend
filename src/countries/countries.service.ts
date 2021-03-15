import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country, CountryDocument } from 'schemas/country.schema';
import { CountryDto } from './countries.dto';

@Injectable()
export class CountriesService {
  constructor(
    @InjectModel(Country.name) private counryModel: Model<CountryDocument>,
  ) {}

  async createCountry(countryDto: CountryDto): Promise<CountryDocument> {
    return new this.counryModel(countryDto).save();
  }

  async getCountryListByLang(lang: string): Promise<CountryDocument[]> {
    return this.counryModel.find({ lang }).exec();
  }

  async findCountryById(id: string): Promise<CountryDocument | null> {
    try {
      const country = await this.counryModel.findById(id).exec();
      return country;
    } catch (error) {
      return null;
    }
  }

  async editCountry(countryDto: CountryDto): Promise<CountryDocument> {
    return this.counryModel
      .findOneAndUpdate(
        {
          name: countryDto.name,
          capital: countryDto.capital,
          lang: countryDto.lang,
        },
        countryDto,
      )
      .exec();
  }

  async deleteCountry(id: string): Promise<CountryDocument> {
    return this.counryModel.findByIdAndDelete(id).exec();
  }
}
