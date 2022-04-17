export interface IProperty {
  id: number,

  // Basic info
  name: string,
  city: string,
  propertyType: string,
  furnishingType: string,
  BHK: number,
  forSell: boolean,

  // Pricing and area
  price: number,
  security?: number,
  maintenance?: number,
  builtArea?: number,
  carpetArea: number,

  // Location
  address: string,
  floor?: number,
  totalFloor?: number,
  landmark?: string,

  // Other details
  readyToMove: boolean,
  possession?: Date,
  age?: number,
  gatedCommunity?: boolean,
  mainEntrance: string,
  description?: string,

  // Photos
  image?: string
}
