
export type Warehouse = {
  slug: string;
  title: string;
  city: string;
  state: string;
  area: number;
  available: number;
  price: number;
  rating: number;
  reviews: number;
  category: string;
  tag: string;
  image: string;
  images: string[];
  facilities: string[];
  description: string;
  specs: {
    microMarket: string;
    highwayDistance: string;
    airportDistance: string;
    railwayDistance: string;
    containerAccess: boolean;
    clearHeight: number;
    grade: string;
    flooring: string;
    floorLoad: number;
    minLease: string;
    availableFrom: string;
    powerLoad: number;
    powerBackup: string;
    fireSafety: string;
    fireNoc: boolean;
    roadWidth: string;
  };
  mapX: number;
  mapY: number;
  lat: number;
  lng: number;
};

export const categories = [
  "All",
  "General / Dry storage",
  "Cold storage",
  "Climate-controlled",
  "E-commerce fulfillment",
  "3PL",
  "Cross-docking",
  "Hazmat",
  "Pharma-grade",
  "Food grade",
  "Bonded / SEZ",
  "Auto parts",
  "Open yard",
];


