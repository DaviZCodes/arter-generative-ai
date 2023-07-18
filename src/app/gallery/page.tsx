"use client";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function Gallery() {  
  const getScribblesMutation = useQuery(api.scribbles.getScribbles);
  
  return (
    <div className="flex flex-col items-center pt-6"> 
      <h3 className="mt-10 font-semibold text-xl">Below are artworks you have created:</h3>
      <div className="grid grid-cols-3 justify-center gap-3 mt-10 pb-24">
        {getScribblesMutation?.map((scribble) => (
          <div key={scribble._id} className="image-container">
            <img width="256" height="256" src={scribble.result} alt="Artwork" />
          </div>
        ))}
      </div>
    </div>
  )
}