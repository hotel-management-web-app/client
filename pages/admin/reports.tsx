import React from 'react';
import FormWrapper from '../../components/Admin/FormWrapper';
import Header from '../../components/Admin/Header';
import Input from '../../components/Admin/Input';
import SubmitButton from '../../components/Admin/SubmitButton';
import Seo from '../../components/Seo';

const Reports = () => (
  <div>
    <Seo title="Reports" />
    <Header title="Reports" />
    <FormWrapper>
      <div className="flex items-end gap-10">
        <Input id="" title="From" type="date" />
        <Input id="" title="To" type="date" />
        <SubmitButton name="Generate raport" />
        <div className="grid grid-cols-4" />
      </div>
    </FormWrapper>
  </div>
);

export default Reports;
