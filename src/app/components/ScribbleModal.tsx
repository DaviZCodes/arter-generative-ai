// components/ImageModal.tsx

import React from "react";

interface ScribbleModalProps {
  imageUrl: string;
  onClose: () => void;
}

const ScribbleModal: React.FC<ScribbleModalProps> = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-75 flex justify-center items-center">
      <div className="relative">
        <button
          className="absolute top-2 right-5 text-white text-5xl cursor-pointer"
          onClick={onClose}
        >
          &times;
        </button>
        <img src={imageUrl} alt="Artwork" className="max-h-screen" />
      </div>
    </div>
  );
};

export default ScribbleModal;
