// components/ImageModal.tsx

import React, { useEffect } from "react";

interface ScribbleModalProps {
  imageUrl: string;
  onClose: () => void;
}

const ScribbleModal: React.FC<ScribbleModalProps> = ({ imageUrl, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

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
