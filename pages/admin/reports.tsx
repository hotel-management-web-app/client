import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormWrapper from '../../components/Admin/Form/FormWrapper';
import Header from '../../components/Admin/Table/Header';
import Input from '../../components/Admin/Form/Input';
import SubmitButton from '../../components/Admin/Form/SubmitButton';
import Seo from '../../components/Seo';
import { reportSchema } from '../../lib/schemas';
import { BookingsInfoProps, ReportForm, ReportProps } from '../../lib/types';
import { useGetReport } from '../../lib/operations/report';

const totalBookingsLabels = [
  'Total bookings received',
  'Total guests',
  'Total nights booked',
  'Total amount',
];

const confirmedBookingsLabels = [
  'Total confirmed bookings received',
  'Total confirmed guests',
  'Total confirmed nights',
  'Total amount',
];

const cancelledBookingsLabels = [
  'Total cancelled bookings received',
  'Total cancelled guests',
  'Total cancelled nights',
  'Total amount',
];

const averageInfoLabels = [
  'Adults',
  'Children',
  'Nights per booking',
  'Guests per booking',
];

const labels = [
  totalBookingsLabels,
  confirmedBookingsLabels,
  cancelledBookingsLabels,
  averageInfoLabels,
];

const getReportInfo = (
  bookingsInfo: BookingsInfoProps,
  bookingsInfoLabels: string[]
) => {
  const convertedBookingsInfo = Object.keys(bookingsInfo).map((key, index) => ({
    label: bookingsInfoLabels[index],
    value: bookingsInfo[key],
  }));

  const bookingsInfoTsx = convertedBookingsInfo.map((bookingInfo) => (
    <div key={nanoid()}>
      <p>{bookingInfo.label}</p>
      <p className="text-gray-400 mt-1">
        {bookingInfo.value} {bookingInfo.label.includes('amount') && '$'}
      </p>
    </div>
  ));

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10 gap-y-10 [&:not(:last-child)]:border-b [&:not(:last-child)]:pb-5">
      {bookingsInfoTsx}
    </div>
  );
};

const displayReportInfo = (report: ReportProps) => {
  const reportInfo = Object.keys(report).map((key, index) =>
    getReportInfo(report[key], labels[index])
  );

  return reportInfo;
};

const Reports = () => {
  const [report, setReport] = useState<ReportProps | null>(null);
  const methods = useForm<ReportForm>({
    resolver: yupResolver(reportSchema),
    mode: 'onChange',
  });
  const { handleSubmit } = methods;

  const { mutate, isLoading } = useGetReport();

  const onSubmit: SubmitHandler<ReportForm> = (data) => {
    const { startDate, endDate } = data;
    const formattedStartDate = new Date(startDate);
    const formattedEndDate = new Date(endDate);
    mutate(
      { startDate: formattedStartDate, endDate: formattedEndDate },
      {
        onSuccess: (res) => setReport(res.data),
      }
    );
  };

  return (
    <div>
      <Seo title="Reports" />
      <Header title="Reports" />
      <FormProvider {...methods}>
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-end gap-10 flex-wrap">
            <Input
              id="startDate"
              title="From"
              fieldName="startDate"
              type="date"
              defaultValue="2023-02-01"
            />
            <Input
              id="endDate"
              title="To"
              fieldName="endDate"
              type="date"
              defaultValue="2023-02-08"
            />
            <SubmitButton name="Generate report" isLoading={isLoading} />
          </div>
          {report && displayReportInfo(report)}
        </FormWrapper>
      </FormProvider>
    </div>
  );
};

export default Reports;
