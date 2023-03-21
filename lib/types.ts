import { ParsedUrlQuery } from 'querystring';
import { ReactNode } from 'react';

export interface RoomType {
  id?: number;
  name: string;
  description: string;
  occupancy: number;
  rooms?: Room[];
  image: File | string;
  images: File[] | string[];
  price: string;
  amenities: string[];
  details: string[];
}

export interface RoomTypeQuery {
  roomTypes: RoomType[];
  pageCount: number;
}

export interface Room {
  id: number;
  roomType: RoomType;
  roomTypeId: number;
  roomNumber: number;
  floorNumber: number;
  roomStatus: string;
  housekeepingStatus: string;
  priority: string;
  comments: string;
  bookings: Booking[];
}

export interface RoomQuery {
  rooms: Room[];
  pageCount: number;
}

export interface SelectOption {
  label: string | number;
  value: string | number;
}

export interface Guest {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  lastBooking?: string;
  status: string;
  _count?: { bookings: number };
  notes: string;
}

export interface GuestQuery {
  guests: Guest[];
  pageCount: number;
}

export interface Booking {
  id?: number;
  status: string;
  arrivalDate: Date;
  departureDate: Date;
  roomNumber: number;
  totalPrice: number;
  adults: number;
  children: number;
  guest: Guest;
  guestId: number;
  room: Room;
  roomId: number;
}

export interface BookingQuery {
  bookings: Booking[];
  pageCount: number;
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
  logo: string | Blob;
  hotelName: string;
  country: string;
  email: string;
  phoneNumber: string;
}

export interface AboutDetail {
  id: number;
  title: string;
  description: string;
  image: string;
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
  lastLogin: Date;
  createdAt: Date;
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

export interface LoginForm {
  email: string;
  password: string;
}
export interface LinkProps {
  name: string;
  route: string;
  icon: ReactNode;
  sublinks?: SublinkProps[];
}
export interface SublinkProps {
  name: string;
  route: string;
}

export interface DashboardData {
  personCount: {
    adults: number;
    children: number;
    [key: string]: any;
  };
  allRoomStatusCount: {
    availableRooms: number;
    reservedRooms: number;
  };
  arrivalsAndDeparturesToday: {
    arrivalsToday: Booking[];
    departuresToday: Booking[];
  };
  allHousekeepingStatusCount: {
    clean: number;
    cleaning: number;
    dirty: number;
    outOfService: number;
  };
  allBookingStatusCount: {
    confirmed: number;
    pending: number;
    cancelled: number;
    notConfirmed: number;
  };
  availableRoomsByRoomTypeCount: {
    name: string;
    count: number;
  }[];
  revenueData: RevenueData[];
}

export interface ChartDataProps {
  [key: string]: any;
}

export interface Chart {
  name: string;
  value: any;
}

export interface ReportForm {
  startDate: Date;
  endDate: Date;
}

export interface BookingsInfoProps {
  [key: string]: number;
}

export interface ReportProps {
  allBookingsInfo: BookingsInfoProps;
  averageInfo: BookingsInfoProps;
  cancelledBookingsInfo: BookingsInfoProps;
  confirmedBookingsInfo: BookingsInfoProps;
  roomTypesInfo: {
    roomTypeName: string;
    allBookingsInfo: { [key: string]: number };
    confirmedBookingsInfo: { [key: string]: number };
    cancelledBookingsInfo: { [key: string]: number };
  }[];
  [key: string]: BookingsInfoProps | any;
}

export interface RevenueData {
  month: string;
  totalAmount: number;
}

export interface ContactFormInputs {
  firstName: string;
  secondName: string;
  email: string;
  phoneNumber: string;
  subject: string;
  message: string;
}

export interface BookingFormInputs {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  notes: string;
  privacyTerms: boolean;
  conditionsAndPolicies: boolean;
}

export interface PaymentData extends BookingFormInputs {
  roomTypeId: number;
  arrivalDate: string;
  departureDate: string;
  adults: number;
  children: number;
}
