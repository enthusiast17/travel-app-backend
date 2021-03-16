import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country, CountryDocument } from 'schemas/country.schema';
import { CountryDto } from './countries.dto';

@Injectable()
export class CountriesService {
  constructor(
    @InjectModel(Country.name) private countryModel: Model<CountryDocument>,
  ) {}

  async createCountry(countryDto: CountryDto): Promise<CountryDocument> {
    return new this.countryModel(countryDto).save();
  }

  async getCountryListByLang(lang: string): Promise<CountryDocument[]> {
    return this.countryModel.find({ lang }).exec();
  }

  async findCountryById(id: string): Promise<CountryDocument | null> {
    try {
      const country = await this.countryModel.findById(id).exec();
      return country;
    } catch (error) {
      return null;
    }
  }

  async findCountryByISOCodeAndLang(
    ISOCode: string,
    lang: string,
  ): Promise<CountryDocument | null> {
    return this.countryModel.findOne({ ISOCode, lang }).exec();
  }

  async findCountryByISOCode(ISOCode: string): Promise<CountryDocument | null> {
    return this.countryModel.findOne({ ISOCode }).exec();
  }

  async editCountry(countryDto: CountryDto): Promise<CountryDocument> {
    return this.countryModel
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
    return this.countryModel.findByIdAndDelete(id).exec();
  }
}
