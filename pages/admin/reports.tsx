import React, { useState } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormWrapper from '../../components/Admin/Form/FormWrapper';
import Header from '../../components/Admin/Table/Header';
import Input from '../../components/Admin/Form/Input';
import SubmitButton from '../../components/Admin/Form/SubmitButton';
import Seo from '../../components/Seo';
import { reportSchema } from '../../lib/schemas';
import { Report } from '../../lib/types';
import { useGetReport } from '../../lib/operations/report';

const reports = [
  {
    id: 1,
    title: 'Total bookings received',
    result: '1',
  },
  {
    id: 2,
    title: 'Total guests',
    result: '3',
  },
  {
    id: 3,
    title: 'Total nights booked',
    result: '9',
  },
  {
    id: 4,
    title: 'Total amount',
    result: '1,171.50 $',
  },
  {
    id: 5,
    title: 'Total confirmed bookings',
    result: '1',
  },
  {
    id: 6,
    title: 'Total confirmed guests',
    result: '3',
  },
  {
    id: 7,
    title: 'Total nights booked',
    result: '9',
  },
  {
    id: 8,
    title: 'Total amount',
    result: '1,171.50 $',
  },
  {
    id: 9,
    title: 'Total cancelled bookings',
    result: '0',
  },
  {
    id: 10,
    title: 'Total cancelled guests',
    result: '0',
  },
  {
    id: 11,
    title: 'Total cancelled nights',
    result: '0',
  },
  {
    id: 12,
    title: 'Total amount',
    result: '0.00 $',
  },
];

const Reports = () => {
  const [report, setReport] = useState(null);
  const methods = useForm<Report>({
    resolver: yupResolver(reportSchema),
    mode: 'onChange',
  });
  const { handleSubmit } = methods;

  const { mutate, isLoading } = useGetReport();

  const onSubmit: SubmitHandler<Report> = (data) => {
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

  console.log(report);

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
          <div className="grid lg:grid-cols-3 xl:grid-cols-4 mt-10 gap-y-10">
            {reports.map((data) => (
              <div key={data.id}>
                <p>{data.title}</p>
                <p className="text-gray-400 mt-1">{data.result}</p>
              </div>
            ))}
          </div>
        </FormWrapper>
      </FormProvider>
    </div>
  );
};

export default Reports;
