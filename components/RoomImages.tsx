import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import ImageViewer from 'react-simple-image-viewer';

const images = [
  {
    id: 1,
    url: '/../public/images/rooms.png',
  },
  {
    id: 1,
    url: '/../public/images/home-room-1.png',
  },
  {
    id: 1,
    url: '/../public/images/home-room-2.png',
  },
  {
    id: 1,
    url: '/../public/images/home-room-3.png',
  },
  {
    id: 1,
    url: '/../public/images/room-details.png',
  },
  {
    id: 1,
    url: '/../public/images/room.png',
  },
];

const RoomImages = () => {
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
    <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-20 mt-32">
      {images.map((image, index) => (
        <Image
          key={image.id}
          src={image.url}
          alt="room"
          width="450px"
          height="420px"
          onClick={() => openImageViewer(index)}
          className="cursor-pointer"
        />
      ))}
      {isViewerOpen && (
        <ImageViewer
          src={[
            'http://localhost:3000/images/rooms.png',
            'http://localhost:3000/images/home-room-1.png',
            'http://localhost:3000/images/home-room-2.png',
            'http://localhost:3000/images/home-room-3.png',
            'http://localhost:3000/images/room-details.png',
            'http://localhost:3000/images/room.png',
          ]}
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
