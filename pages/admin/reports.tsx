import React, { useState } from 'react';
import moment from 'moment';
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

const tableHeaders = [
  'Booked',
  'Guests',
  'Nights',
  'Amount',
  'Booked',
  'Guests',
  'Nights',
  'Amount',
  'Booked',
  'Guests',
  'Nights',
  'Amount',
];

const getReportInfo = (
  bookingsInfo: BookingsInfoProps,
  bookingsInfoLabels: string[]
) => {
  const convertedBookingsInfo = Object.keys(bookingsInfo).map((key, index) => ({
    label: bookingsInfoLabels?.[index],
    value: bookingsInfo[key],
  }));

  const bookingsInfoTsx = convertedBookingsInfo.map((bookingInfo) => (
    <div key={nanoid()}>
      <p>{bookingInfo.label}</p>
      <p className="text-gray-400 mt-1">
        {bookingInfo.value} {bookingInfo.label?.includes('amount') && '$'}
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
  const {
    allBookingsInfo,
    confirmedBookingsInfo,
    cancelledBookingsInfo,
    averageInfo,
  } = report;

  const reportInfo = Object.keys({
    allBookingsInfo,
    confirmedBookingsInfo,
    cancelledBookingsInfo,
    averageInfo,
  }).map((key, index) => getReportInfo(report[key], labels[index]));

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

  const today = new Date();
  const monthBack = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    today.getDay()
  );

  const dateFormat = 'YYYY-MM-DD';
  const formattedTodayDate = moment(today).format(dateFormat);
  const formattedMonthBackDate = moment(monthBack).format(dateFormat);

  const roomTypesInfo = report?.roomTypesInfo;

  return (
    <div className="pb-20">
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
              defaultValue={formattedMonthBackDate}
            />
            <Input
              id="endDate"
              title="To"
              fieldName="endDate"
              type="date"
              defaultValue={formattedTodayDate}
            />
            <SubmitButton name="Generate report" isLoading={isLoading} />
          </div>

          {report && (
            <>
              {displayReportInfo(report)}
              <div className="overflow-auto scrollbar scrollbar-h-2 scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-thumb-rounded">
                <table className="mt-10 border border-collapse">
                  <thead>
                    <tr>
                      <th rowSpan={2} className="border text-sm px-2 py-1">
                        Rooms
                      </th>
                      <th colSpan={4} className="border text-sm px-2 py-1">
                        Bookings Received
                      </th>
                      <th colSpan={4} className="border text-sm px-2 py-1">
                        Confirmed Bookings
                      </th>
                      <th colSpan={4} className="border text-sm px-2 py-1">
                        Cancelled Bookings
                      </th>
                    </tr>
                    <tr>
                      {tableHeaders.map((header) => (
                        <th className="border px-[31px] py-1 text-sm">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {roomTypesInfo?.map((roomTypeInfo) => {
                      const {
                        roomTypeName,
                        allBookingsInfo,
                        confirmedBookingsInfo,
                        cancelledBookingsInfo,
                      } = roomTypeInfo;

                      return (
                        <tr>
                          <td className="border text-sm px-5 py-2 text-center whitespace-nowrap">
                            {roomTypeName}
                          </td>
                          {Object.keys(allBookingsInfo).map((key) => (
                            <td className="border text-sm py-2 text-center">
                              {allBookingsInfo[key]}
                              {key.includes('Amount') && '$'}
                            </td>
                          ))}
                          {Object.keys(confirmedBookingsInfo).map((key) => (
                            <td className="border text-sm py-2 text-center">
                              {confirmedBookingsInfo[key]}
                              {key.includes('Amount') && '$'}
                            </td>
                          ))}
                          {Object.keys(cancelledBookingsInfo).map((key) => (
                            <td className="border text-sm py-2 text-center">
                              {cancelledBookingsInfo[key]}
                              {key.includes('Amount') && '$'}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </FormWrapper>
      </FormProvider>
    </div>
  );
};

export default Reports;
