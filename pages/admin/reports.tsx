import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import FormWrapper from '../../components/Admin/FormWrapper';
import Header from '../../components/Admin/Header';
import Input from '../../components/Admin/Input';
import SubmitButton from '../../components/Admin/SubmitButton';
import Seo from '../../components/Seo';

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
  const methods = useForm();
  const { handleSubmit } = methods;

  const onSubmit = () => {};
  return (
    <div>
      <Seo title="Reports" />
      <Header title="Reports" />
      <FormProvider {...methods}>
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-end gap-10 flex-wrap">
            <Input id="from" title="From" type="date" />
            <Input id="to" title="To" type="date" />
            <SubmitButton name="Generate raport" />
          </div>
          <div className="grid lg:grid-cols-3 xl:grid-cols-4 mt-10 gap-y-10">
            {reports.map((report) => (
              <div key={report.id}>
                <p>{report.title}</p>
                <p className="text-gray-400 mt-1">{report.result}</p>
              </div>
            ))}
          </div>
        </FormWrapper>
      </FormProvider>
    </div>
  );
};

export default Reports;
