export interface User{
    id ?: string,
    fullName : string ,
    email : string ,
    password : string ,
    address : string ,
    role : string,
    points?: number;
    balance ?: number
}

export interface Collector {
    id?: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    address: string,
    phoneNumber: string,
    dateOfBirth: string,
    city: string,
    userType: string,
    points?: number;
    balance?: number;
}

export type WasteType = 'plastic' | 'glass' | 'paper' | 'metal';
export type RequestStatus = 'pending' | 'occupied' | 'in_progress' | 'completed' | 'rejected';

export interface WasteItem {
  type: WasteType;
  weight: number;
}

export interface Request {
  id: string;
  userId: string;
  wastes: WasteItem[];
  collectionAddress: string;
  collectionDateTime: string; 
  status: RequestStatus;
  collectorId?: string;
  points?: number
}

export interface VoucherOption {
  points: number;
  amount: number;
}

export const VOUCHER_OPTIONS: VoucherOption[] = [
  { points: 100, amount: 50 },
  { points: 200, amount: 120 },
  { points: 500, amount: 350 }
];