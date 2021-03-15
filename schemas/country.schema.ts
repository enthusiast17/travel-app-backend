import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type CountryDocument = Country & mongoose.Document;

@Schema()
export class Country {
  @Prop({ type: String, required: true })
  capital: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  previewImageUrl: string;

  @Prop({ type: [String], required: true })
  imageUrlList: string[];

  @Prop({ type: String, required: true })
  videoUrl: string;

  @Prop({ type: String, required: true })
  currency: string;

  @Prop({ type: String, required: true })
  ISOCode: string;

  @Prop({ type: [Number], required: true })
  capitalCoordinates: number[];

  @Prop({ type: [[[Number]]], required: true })
  countryCoordinates: number[][][];

  @Prop({ type: String, required: true })
  lang: string;
}

export const CountrySchema = SchemaFactory.createForClass(Country);
