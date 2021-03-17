import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type RateDocument = Rate & mongoose.Document;

@Schema()
export class Rate {
  @Prop({ type: String, required: true })
  userId: string;

  @Prop({ type: String, required: true })
  country: string;

  @Prop({ type: String, required: true })
  capital: string;

  @Prop({ type: Number, required: true })
  rateNumber: number;
}

export const RateSchema = SchemaFactory.createForClass(Rate);
