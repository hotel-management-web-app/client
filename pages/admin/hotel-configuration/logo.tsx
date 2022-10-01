import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { FileUploader } from 'react-drag-drop-files';
import FormWrapper from '../../../components/Admin/FormWrapper';
import Header from '../../../components/Admin/Header';
import Seo from '../../../components/Seo';
import NoImage from '../../../public/images/no_image.jpg';
import Input from '../../../components/Admin/Input';

const fileTypes = ['JPG', 'PNG', 'GIF'];

const Logo = () => {
  const [file, setFile] = useState<StaticImageData | string>(NoImage);
  const handleChange = (selectedFile: string) => {
    setFile(selectedFile);
  };
  return (
    <div>
      <Seo title="Logo" />
      <Header title="Logo" />
      <FormWrapper>
        <div className="flex justify-center my-5">
          <div className="flex flex-col gap-10 lg:w-2/3">
            <Input id="hotel-name" title="Hotel name" />
            <label htmlFor="" className="block -mb-8">
              Logo
            </label>
            <div className="flex items-center gap-10 flex-wrap">
              <Image src={file} alt="no image" width="100" height="100" />
              <FileUploader
                handleChange={handleChange}
                name="file"
                types={fileTypes}
              />
            </div>
            <Input id="hotel-name" title="Country" />
            <Input id="hotel-name" title="Email" />
            <Input id="hotel-name" title="Phone number" />
          </div>
        </div>
      </FormWrapper>
    </div>
  );
};

export default Logo;
