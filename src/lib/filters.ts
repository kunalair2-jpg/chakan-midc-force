export type FiltersState = {
  // Section 1
  microMarkets: string[];
  highwayDistance: string;
  puneDistance: number;
  midcZoneOnly: boolean;
  airportDistance: string;
  railwayDistance: string;
  landmarks: string[];
  pinCode: string;
  roadWidth: string;
  containerAccess: boolean;

  // Section 2
  clearHeight: number;

  // Section 3
  grades: string[];
  flooring: string[];
  floorLoad: number;

  // Section 4
  rentPerSqftMin: number;
  rentPerSqftMax: number;
  monthlyRentMin: number;
  monthlyRentMax: number;

  // Section 5
  leasePeriods: string[];
  availableFrom: string;

  // Section 6
  powerLoad: number;
  powerBackup: string[];

  // Section 7
  fireSafety: string[];
  fireNocConfirmed: boolean;

  // Section 8
  warehouseTypes: string[];

  // Section 9
  verifiedOnly: boolean;
};

export const defaultFilters: FiltersState = {
  microMarkets: [], highwayDistance: 'Any', puneDistance: 0, midcZoneOnly: false,
  airportDistance: 'Any', railwayDistance: 'Any', landmarks: [], pinCode: '',
  roadWidth: 'Any', containerAccess: false,
  clearHeight: 6,
  grades: [], flooring: [], floorLoad: 2,
  rentPerSqftMin: 10, rentPerSqftMax: 40,
  monthlyRentMin: 50000, monthlyRentMax: 10000000,
  leasePeriods: [], availableFrom: 'Any',
  powerLoad: 50, powerBackup: [],
  fireSafety: [], fireNocConfirmed: true,
  warehouseTypes: [],
  verifiedOnly: true
};
