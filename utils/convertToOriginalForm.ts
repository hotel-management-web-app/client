import { StatusesProps } from '../lib/types';

export const convertToOriginalForm = (
  statuses: StatusesProps,
  status: string
): string | undefined =>
  Object.keys(statuses).find((key) => statuses[key] === status);
