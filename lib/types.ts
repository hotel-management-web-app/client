import { ParsedUrlQuery } from 'querystring';

export interface RoomType {
  id: number;
  name: string;
  description: string;
  occupancy: number;
  price: string;
  amenities: {
    id: number;
    name: string;
  }[];
  details: {
    id: number;
    name: string;
  }[];
}

export interface Room {
  id: number;
  roomType: string;
  roomNumber: number;
  floorNumber: number;
  roomStatus: string;
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface Guest {
  id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  country: string;
  address: string;
  latestBooking: string;
  city: string;
  postalCode: string;
  status: string;
  bookings: number;
  notes: string;
}

export interface ServerSideParams extends ParsedUrlQuery {
  id: string;
}
