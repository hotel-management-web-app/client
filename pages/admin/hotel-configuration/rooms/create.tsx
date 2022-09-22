import React from 'react';
import Seo from '../../../../components/Seo';
import BackButton from '../../../../components/Admin/BackButton';
import Header from '../../../../components/Admin/Header';
import SubmitButton from '../../../../components/Admin/SubmitButton';
import FormWrapper from '../../../../components/Admin/FormWrapper';
import Input from '../../../../components/Admin/Input';
import ListboxInput from '../../../../components/Admin/ListboxInput';

const AddRoom = () => (
  <form>
    <Seo title="Add Room" />
    <div className="flex justify-between items-center w-full">
      <div className="flex items-center flex-wrap gap-5">
        <Header title="Add room" />
        <BackButton name="rooms" url="/admin/hotel-configuration/rooms/" />
      </div>
      <SubmitButton addIcon name="Add room" />
    </div>
    <FormWrapper>
      <div className="mx-auto w-11/12 lg:w-3/4 py-5">
        <ListboxInput />
        <Input
          id="room-floor-number"
          title="Floor number"
          type="number"
          min="0"
        />
        <Input id="room-number" title="Room number" type="number" min="0" />
      </div>
    </FormWrapper>
  </form>
);

export default AddRoom;
