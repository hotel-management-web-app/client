export const routes = {
  root: () => '/',
  profile: () => '/admin/profile',
  admin: (route: string) => `/admin/${route}`,
  addBooking: (startDate?: Date, roomTypeId?: number, roomId?: number) =>
    startDate
      ? `/admin/bookings/create?startDate=${startDate}&roomTypeId=${roomTypeId}&roomId=${roomId}`
      : '/admin/bookings/create',
  editBooking: (id: number) => `/admin/bookings/edit/${id}`,
};
