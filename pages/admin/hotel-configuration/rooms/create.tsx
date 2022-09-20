import React from 'react';
import Seo from '../../../../components/Seo';
import BackButton from '../../../../components/Admin/BackButton';
import Header from '../../../../components/Admin/Header';
import SubmitButton from '../../../../components/Admin/SubmitButton';

const AddRoom = () => (
  <div>
    <Seo title="Add Room" />
    <div className="flex justify-between items-center w-full">
      <div className="flex items-center gap-5">
        <Header title="Add room" />
        <BackButton name="rooms" url="/admin/hotel-configuration/rooms/" />
      </div>
      <SubmitButton name="Add room" />
    </div>
  </div>
);

export default AddRoom;
