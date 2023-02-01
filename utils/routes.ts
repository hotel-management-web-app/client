export const routes = {
  root: () => '/',
  profile: () => '/admin/profile',
  admin: (route: string) => `/admin/${route}`,
  editBooking: (id: number) => `/admin/bookings/edit/${id}`,
};
