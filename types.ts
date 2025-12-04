export type Role = 'ADMIN' | 'USER';

export interface User {
  id: string; // "10190758-WEA"
  name: string; // "LABHANA VENKATESH"
  password: string; // Phone number as password based on input
  phone: string;
  role: Role;
  clusters: string[]; // ["C4", "C2"]
}

export interface FloorDetail {
  floorNo: number;
  length: number;
  width: number;
  houseType: string; // e.g., "RCC", "Tiled"
}

export interface TaxYear {
  year: string; // "2025-26"
  amount: number;
}

export interface Household {
  assessmentNo: string;
  oldAssessmentNo: string;
  ownerName: string;
  parentName: string;
  clusterNo: string;
  phoneNo: string;
  aadhaarNo: string;
  hNo: string;
  noOfFloors: number;
  
  // Plot Dimensions
  totalLength: number;
  totalWidth: number;

  // Tax Info
  tax2023_24: number;
  tax2024_25: number;
  tax2025_26: number;
  totalTax: number;
  taxCollected: number; // To calculate pending
  
  // Floor Details
  floors: FloorDetail[];

  // New Property Details
  natureOfProperty: string;
  natureOfLandUse: string;
  natureOfUsage: string;
  natureOfOwnership: string;
  modeOfAcquisition: string;

  // Boundaries
  boundaryEast: string;
  boundaryWest: string;
  boundaryNorth: string;
  boundarySouth: string;
}

export interface CollectionRecord {
  sNo: string;
  assessmentNo: string;
  oldAssessmentNo: string;
  ownerName: string;
  doorNo: string;
  dateOfPayment: string;
  receiptNo: string;
  paymentSource: string;
  paymentMode: string;
  dueYear: string;
  demandCategory: string;
  houseTax: number;
  libraryCess: number;
  waterTax: number;
  lightningTax: number;
  drainageTax: number;
  sportsCess: number;
  fireTax: number;
  totalTax: number;
  receiptStatus: string;
  settlementStatus: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  userId: string;
  password: string;
}