"use client";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function Gallery() {  
  const getScribblesMutation = useQuery(api.scribbles.getScribbles);
  
  return (
    <main className="flex min-h-screen flex-col items-center bg-slate-200">
      <h3 className="mt-6 font-semibold text-xl">Below are artworks arters have created:</h3>
      <div className="grid grid-cols-3 justify-center gap-3 mt-4" style={{ paddingBottom: '10px' }}>
        {getScribblesMutation?.map((scribble) => (
          <div key={scribble._id} className="image-container">
            <img width="256" height="256" src={scribble.result} alt="A piece of art" />
          </div>
        ))}
      </div>
    </main>
  )
}
