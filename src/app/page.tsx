"use client";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import { useRef } from "react";

export default function Home() {  
  const uploadScribbleMutation = useMutation(api.scribbles.uploadScribble);
  const { register, handleSubmit, formState: { errors } } = useForm<{prompt: string}>();
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const scribblesQuery = useQuery(api.scribbles.getScribbles);
  const sortedQuery = (scribblesQuery ?? []).sort((a,b) => {
    return b._creationTime - a._creationTime;
  })
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 pt-10 bg-gradient-to-b from-purple-600 to-blue-900">
      <div className="container mx-auto flex gap-3">
        <form
          className="flex flex-col gap-2 w-1/4"
          onSubmit={handleSubmit(async (formData) => {
            if (!canvasRef.current) {
              return;
            }
            const scribble = await canvasRef.current.exportImage("jpeg");
            console.log(scribble);
            await uploadScribbleMutation({ ...formData, scribble });
          })}
        >
          <p className="text-xl text-white">Prompt</p>
          <input
            id="prompt"
            className="border border-white rounded px-3 py-2 bg-opacity-30 text-black"
            {...register("prompt", { required: true })}
          />
          {errors.prompt && <span className="flex justify-center text-red-500 font-bold">You must write a prompt.</span>}

          <p className="mt-3 text-xl text-white">Painting (Scribble below)</p>
          <ReactSketchCanvas
            ref={canvasRef}
            style={{ width: 333, height: 350 }}
            strokeWidth={4}
            strokeColor="black"
            className="cursor-crosshair"
          />
          <button className="bg-purple-700 rounded cursor-pointer py-2 px-4 text-white font-semibold transition-transform duration-300 hover:scale-105">
            Submit
          </button>
          <button type="button"
            className="bg-blue-600 rounded cursor-pointer py-2 px-4 text-white font-semibold mt-3 transition-transform duration-300 hover:scale-105"
            onClick={() => {
              canvasRef.current?.clearCanvas();
            }}
          >
            Clear
          </button>
        </form>

        <section className="ml-20">
          <h3 className="text-xl text-white">Your Artworks</h3>
          <div className="grid grid-cols-3 gap-3 mt-4">
            {sortedQuery.map(scribble => (
              <img key={scribble._id} width="256" height="256" src={scribble.result} alt="Artwork" />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}