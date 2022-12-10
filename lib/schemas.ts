import * as yup from 'yup';

export const roomTypeSchema = yup.object({
  name: yup.string().required('Name is required!'),
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

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const guestSchema = yup.object({
  firstName: yup.string().required('First Name is required!'),
  lastName: yup.string().required('Last Name is required!'),
  email: yup
    .string()
    .email('Field should contain a valid e-mail')
    .required('Email address is required!'),
  phoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid!'),
  notes: yup.string(),
});

export const generalSettingsSchema = yup.object({
  hotelName: yup.string().required('Hotel name is required!'),
  country: yup.string().required('Country is required!'),
  email: yup
    .string()
    .email('Email is not valid!')
    .required('Email is required!'),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid!')
    .required('Phone number is required!'),
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
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid!')
    .required('Phone number is required!'),
});
