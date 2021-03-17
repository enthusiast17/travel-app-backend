import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type CountryDocument = Country & mongoose.Document;

@Schema()
export class Country {
  @Prop({ type: String, required: true })
  capitalEN: string;

  @Prop({ type: String, required: true })
  nameEN: string;

  @Prop({ type: String, required: true })
  capital: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  previewImageUrl: string;

  @Prop({
    type: [{ title: String, description: String, url: String }],
    required: true,
  })
  imageUrlList: { title: string; description: string; url: string }[];

  @Prop({ type: String, required: true })
  videoUrl: string;

  @Prop({ type: String, required: true })
  ISOCode: string;

  @Prop({ type: String, required: true })
  currencyCode: string;

  @Prop({ type: String, required: true })
  timezone: string;

  @Prop({ type: String, required: true })
  geoJsonUrl: string;

  @Prop({ type: String, required: true })
  lang: string;
}

export const CountrySchema = SchemaFactory.createForClass(Country);
