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
    <main className="flex min-h-screen flex-col items-center bg-slate-200">
      <h3 className="mt-10 mb-6 font-semibold text-2xl text-center">
        Below are artworks arters have created:
      </h3>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 justify-center gap-3 mt-4"
        style={{ paddingBottom: "10px" }}
      >
        {getScribblesMutation?.map((scribble) => (
          <div key={scribble._id} className="image-container">
            <img
              className="cursor-pointer"
              width="256"
              height="256"
              src={scribble.result}
              alt="A piece of art"
              onClick={() => handleScribbleClick(scribble.result)}
            />
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
