import { IUserHided } from 'src/auth/auth.interface';

export interface IRate {
  userId: string;
  country: string;
  capital: string;
  rateNumber: number;
}

export interface IRateHided {
  user: IUserHided;
  country: string;
  capital: string;
  rateNumber: number;
}

export interface ISingleCountryRate {
  rates: IRateHided[];
  averageRateNumber: number;
}
