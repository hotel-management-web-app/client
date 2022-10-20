import React, { ChangeEvent, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { useFormContext } from 'react-hook-form';
import NoImage from '../../public/images/no_image.jpg';

const ImageUploader = () => {
  const [image, setImage] = useState<StaticImageData | string>(NoImage);

  const { setValue } = useFormContext();

  setValue('image', image);

  const imageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedImage = URL.createObjectURL(e.target.files[0] ?? '');
      setImage(selectedImage);
    }
  };

  return (
    <div>
      <label htmlFor="room-image" className="mt-10 block">
        Room Image
      </label>
      <div className="flex flex-wrap items-center w-96 xl:w-[1000px] mt-5 gap-10">
        <Image id="room-image" width="500" height="300" src={image} />
        <input
          type="file"
          id="room-image-upload"
          className="hidden"
          accept="image/*"
          onChange={imageHandler}
        />
        <label
          htmlFor="room-image-upload"
          className="bg-black text-white px-4 py-2 rounded-lg w-40 text-center cursor-pointer"
        >
          Upload image
        </label>
      </div>
    </div>
  );
};

export default ImageUploader;
