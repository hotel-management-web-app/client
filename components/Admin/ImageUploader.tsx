import React, { ChangeEvent, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { useFormContext } from 'react-hook-form';
import NoImage from '../../public/images/no_image.jpg';

interface ImageUploaderProps {
  id: string;
  label: string;
  width?: number;
  height?: number;
  defaultImage?: string;
  loader?: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  id,
  label,
  width = 300,
  height = width,
  defaultImage,
  loader = false,
}) => {
  const [image, setImage] = useState<StaticImageData | string>(
    defaultImage || NoImage
  );

  const { setValue } = useFormContext();

  const imageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedImage = URL.createObjectURL(e.target.files[0] ?? '');
      setImage(selectedImage);
      setValue('image', e.target.files[0]);
    }
  };

  return (
    <div>
      <label htmlFor={`${id}-display`} className="mt-10 block">
        {label}
      </label>
      <div className="flex flex-wrap items-center mt-5 gap-10">
        <Image
          {...(loader ? { loader: () => image as string } : {})}
          id={`${id}-display`}
          width={width}
          height={height}
          src={image}
        />
        <input
          type="file"
          id={`${id}-upload`}
          className="hidden"
          accept="image/*"
          onChange={imageHandler}
        />
        <label
          htmlFor={`${id}-upload`}
          className="bg-black text-white px-4 py-2 rounded-lg w-40 text-center cursor-pointer"
        >
          Upload image
        </label>
      </div>
    </div>
  );
};

export default ImageUploader;
