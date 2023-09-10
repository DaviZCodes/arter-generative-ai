"use client";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import ScribbleModal from "../components/ScribbleModal";

export default function Gallery() {
  const [selectedScribble, setSelectedScribble] = useState<string | null>(null);
  const getScribblesMutation = useQuery(api.scribbles.getScribbles);
  const handleScribbleClick = (imageUrl: string) => {
    setSelectedScribble(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedScribble(null);
  };

  return (
    <main className="flex min-h-screen py-10 px-16 sm:px-0 flex-col items-center bg-slate-200">
      <h3 className="mb-6 font-semibold text-2xl text-center">
        Below are artworks arters have created:
      </h3>
      <div className="grid grid-cols-1 justify-center gap-1 m-0 sm:mx-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
        {getScribblesMutation?.map((scribble) => (
          <div
            key={scribble._id}
            className="p-2 py-3 md:w-80 lg:w-90 max-w-full"
          >
            <img
              loading="lazy"
              className="cursor-pointer w-full h-full"
              width={0}
              height={0}
              src={scribble.result}
              alt="A piece of art"
              onClick={() => handleScribbleClick(scribble.result)}
            />
            <div className="text-center">{scribble.prompt}</div>
          </div>
        ))}

        {selectedScribble && (
          <ScribbleModal
            imageUrl={selectedScribble}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </main>
  );
}
