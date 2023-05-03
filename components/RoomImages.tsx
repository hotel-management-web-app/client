import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import ImageViewer from 'react-simple-image-viewer';

interface RoomImagesProps {
  images: string[];
}

const RoomImages: React.FC<RoomImagesProps> = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
  return (
    <div
      data-testid="room-images"
      className="grid md:grid-cols-2 2xl:grid-cols-3 gap-20 mt-32"
    >
      {images.map((image, index) => (
        <Image
          key={image}
          src={image}
          loader={() => image}
          alt={`image-${index}`}
          width="450px"
          height="420px"
          onClick={() => openImageViewer(index)}
          className="cursor-pointer"
        />
      ))}
      {isViewerOpen && (
        <ImageViewer
          src={images}
          currentIndex={currentImage}
          disableScroll={false}
          closeOnClickOutside
          onClose={closeImageViewer}
        />
      )}
    </div>
  );
};

export default RoomImages;
