export const countDaysBetweenDates = (arrivalDate: Date, departureDate: Date) =>
  Math.ceil(
    (new Date(departureDate).getTime() - new Date(arrivalDate).getTime()) /
      (60 * 60 * 24 * 1000)
  );
