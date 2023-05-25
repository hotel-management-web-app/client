import * as yup from 'yup';

export const roomTypeSchema = yup.object({
  name: yup.string().min(3).max(48).required('Name is required!'),
  description: yup.string(),
  occupancy: yup
    .number()
    .typeError('Occupancy must be a number!')
    .positive()
    .integer('Occupancy must be an integer!')
    .required('Occupancy is required!'),
  price: yup
    .number()
    .typeError('Price must be a number!')
    .positive()
    .required('Price is required!'),
  roomImage: yup.string(),
  roomImages: yup.array(),
});

export const roomSchema = yup.object({
  roomStatus: yup.string(),
  roomTypeId: yup.number().required(),
  floorNumber: yup
    .number()
    .typeError('Floor number must be a number')
    .required(),
  roomNumber: yup.number().typeError('Room number must be a number').required(),
});

export const guestSchema = yup.object({
  firstName: yup.string().min(3).max(48).required('First Name is required!'),
  lastName: yup.string().min(3).max(48).required('Last Name is required!'),
  email: yup
    .string()
    .email('Field should contain a valid e-mail')
    .required('Email address is required!'),
  phoneNumber: yup.string().required('Phone number is required!').nullable(),
  notes: yup.string(),
});

export const bookingSchema = yup.object({
  status: yup.string().required('Status is required!'),
  arrivalDate: yup.date().required('Arrival date is required!'),
  departureDate: yup.date().required('Departure date is required!'),
  roomId: yup.number().required('Room is required!'),
  adults: yup.number().typeError('Number of adults is required!').required(),
  children: yup
    .number()
    .typeError('Number of children is required!')
    .required('Number of children is required!'),
});

export const generalSettingsSchema = yup.object({
  hotelName: yup.string().required('Hotel name is required!'),
  country: yup.string().required('Country is required!'),
  email: yup
    .string()
    .email('Email is not valid!')
    .required('Email is required!'),
  phoneNumber: yup.string().required('Phone number is required!').nullable(),
});

export const aboutDetailSchema = yup.object({
  title: yup.string().required('Title is required!'),
  description: yup.string(),
});

export const profileSchema = yup.object({
  name: yup.string().required('Name is required!'),
  email: yup
    .string()
    .email('Email is not valid!')
    .required('Email is required!'),
  phoneNumber: yup.string().required('Phone number is required!').nullable(),
});

export const loginSchema = yup.object({
  email: yup.string().email().required('Email is required!'),
  password: yup.string().required('Password is required!'),
});

export const reportSchema = yup.object({
  startDate: yup.string().required('Start date is required!'),
  endDate: yup.string().required('End date is required!'),
});

export const contactSchema = yup.object({
  firstName: yup.string().min(3).max(48).required('First name is required!'),
  secondName: yup.string().min(3).max(48).required('Second name is required!'),
  email: yup.string().email().required('Email is required!'),
  phoneNumber: yup.string().nullable(),
  subject: yup.string().required('Subject is required!'),
  message: yup.string().required('Message is required!'),
});

export const bookingFormSchema = yup.object({
  firstName: yup.string().min(3).max(48).required('First name is required!'),
  lastName: yup.string().min(3).max(48).required('Second name is required!'),
  email: yup.string().email().required('Email is required!'),
  phoneNumber: yup.string().required('Phone number is required!').nullable(),
  notes: yup.string(),
  privacyTerms: yup.bool().oneOf([true], 'Privacy terms are required!'),
  conditionsAndPolicies: yup
    .bool()
    .oneOf([true], 'Conditions and Policies are required!'),
});

export const registerSchema = yup.object({
  name: yup.string().min(3).max(48).required('User name is required!'),
  email: yup.string().email().required('Email is required!'),
  phoneNumber: yup.string().required('Email is required!').nullable(),
  password: yup.string().min(8).max(48).required('Password is required!'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match!'),
});

export const userSchema = profileSchema;
