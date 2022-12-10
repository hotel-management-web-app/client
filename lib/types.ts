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
  roomType: { name: string };
  roomTypeId: number;
  roomNumber: number;
  floorNumber: number;
  roomStatus: string;
  housekeepingStatus: string;
  priority: string;
  comments: string;
}

export interface SelectOption {
  label: string | number;
  value: string | number;
}

export interface Guest {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  lastBooking: string;
  status: string;
  _count: { bookings: number };
  notes: string;
}

export interface Booking {
  id?: number;
  status: string;
  arrivalDate: string;
  departureDate: string;
  paymentMethod: string;
  roomType: string;
  roomNumber: number;
  adults: number;
  children: number;
  guestName: string;
}

export interface Housekeeping {
  id: number;
  roomNumber: number;
  roomType: string;
  housekeepingStatus: string;
  priority: string;
  floor: number;
  reservationStatus: string;
  comments: string;
}

export interface HousekeepingStatusOption {
  id: number;
  name: string;
  textColor: string;
  backgroundColor: string;
}

export interface PriorityStatusOption {
  id: number;
  name: string;
  color: string;
}

export interface ServerSideParams extends ParsedUrlQuery {
  id: string;
}

export interface GeneralSettings {
  hotelName: string;
  country: string;
  email: string;
  phoneNumber: string;
}

export interface AboutDetail {
  id: number;
  title: string;
  description: string;
  imgUrl: string;
}

export interface AboutInfo {
  id: number;
  title: string;
  description: string;
  aboutDetails: AboutDetail[];
}

export interface ProfileInfo {
  name: string;
  email: string;
  phoneNumber: string;
}

export interface StatusesProps {
  [key: string]: string;
}

export interface BookingStatusedProps {
  [key: string]: {
    convertedName: string;
    color: string;
  };
}
