import moment from 'moment';

export const routes = {
  root: () => '/',
  profile: () => '/admin/profile',
  admin: (route: string) => `/admin/${route}`,
  addBooking: (startDate?: Date, roomTypeId?: number, roomId?: number) =>
    startDate
      ? `/admin/bookings/create?startDate=${startDate}&roomTypeId=${roomTypeId}&roomId=${roomId}`
      : '/admin/bookings/create',
  editBooking: (id: number) => `/admin/bookings/edit/${id}`,
  roomTypes: (id: number) => `/rooms/${id}`,
  roomBooking: (
    adultsNumber?: number,
    childrenNumber?: number,
    startDate?: moment.Moment | null,
    endDate?: moment.Moment | null
  ) =>
    (adultsNumber || adultsNumber === 0) &&
    (childrenNumber || childrenNumber === 0) &&
    startDate &&
    endDate
      ? `/room-booking?adults=${adultsNumber}&children=${childrenNumber}&arrive=${startDate}&departure=${endDate}`
      : '/room-booking',
  bookingForm: (
    adultsNumber: string,
    childrenNumber: string,
    startDate: string,
    endDate: string,
    roomTypeId: string
  ) =>
    `/booking-form?adults=${adultsNumber}&children=${childrenNumber}&arrive=${startDate}&departure=${endDate}&room=${roomTypeId}`,
  contactSuccess: '/contact/success',
};
