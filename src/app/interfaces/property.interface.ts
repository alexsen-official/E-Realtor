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
  id: number,

  main: {
    title: string,
    type: PropertyType,
    furnishing: PropertyFurnishing,
    rooms: number,
    area: number,
    price: number
  },

  rent: {
    forRent: boolean,
    available?: { from: Date, to: Date }
  },

  location: {
    country: string,
    state: string,
    city: string,
    street: string,
    floor?: number
  },

  details: {
    description?: string,
    images: string[]
  }
}
