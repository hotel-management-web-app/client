import React, { useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { AiOutlinePlus } from 'react-icons/ai';
import { GrFormClose } from 'react-icons/gr';
import { useFormContext } from 'react-hook-form';

const ImagesUploader = () => {
  const [images, setImages] = useState([]);
  const { setValue } = useFormContext();
  const maxNumber = 69;

  const onChange = (imageList: ImageListType) => {
    // data for submit
    setImages(imageList as never[]);
  };

  setValue('images', images);

  return (
    <div className="mt-10">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
      >
        {({
          imageList,
          onImageUpload,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="flex gap-10 flex-wrap lg:w-[600px] xl:w-[1000px]">
            <button
              type="button"
              style={isDragging ? { background: 'green' } : undefined}
              onClick={onImageUpload}
              className="border w-64 h-64 border-black rounded-2xl"
              {...dragProps}
            >
              <AiOutlinePlus size="70" className="mx-auto" />
            </button>
            {imageList.map((image, index) => (
              <div className="relative">
                <button
                  key={Math.floor(Math.random() * 1000000)}
                  className="image-item relative"
                  type="button"
                  onClick={() => onImageUpdate(index)}
                >
                  <img
                    src={image.dataURL}
                    alt=""
                    className="w-64 h-64 rounded-2xl"
                  />
                </button>
                <button
                  type="button"
                  onClick={() => onImageRemove(index)}
                  className="bg-white border rounded-full absolute top-2 right-2"
                >
                  <GrFormClose size="25" />
                </button>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

export default ImagesUploader;
