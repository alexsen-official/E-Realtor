import { IUser } from './user.interface';

export enum PropertyType {
  House = 'house',
  Flat  = 'flat'
}

export enum PropertyFurnishing {
  Fully = 'fully-furnished',
  Semi  = 'semi-furnished',
  Un    = 'unfurnished'
}

export interface IProperty {
  _id: string,
  owner: IUser,

  title: string,
  type: PropertyType,
  furnishing: PropertyFurnishing,
  rooms: number,
  area: number,
  price: number,

  forRent: boolean,
  available?: {
    from: Date,
    to: Date
  },

  country: string,
  state: string,
  city: string,
  street: string,

  description?: string,
  images: string[]
}
