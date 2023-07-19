"use client";

import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import { SetStateAction, useRef, useState } from "react";
import ScribbleModal from "./components/ScribbleModal";

export default function Home() {
  //prompt
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ prompt: string }>();
  const [promptInput, setPromptInput] = useState<string>("");
  const [showPassedLimitText, setShowPassedLimitText] =
    useState<boolean>(false);

  //scribble/image
  const uploadScribbleMutation = useMutation(api.scribbles.uploadScribble);
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [selectedScribble, setSelectedScribble] = useState<string | null>(null);
  const scribblesQuery = useQuery(api.scribbles.getScribbles);
  const sortedQuery = (scribblesQuery ?? []).sort((a, b) => {
    return b._creationTime - a._creationTime;
  });

  const handlePromptInput = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setPromptInput(e.target.value);

    if (promptInput.length > 50) {
      setShowPassedLimitText(true);
    }
  };

  const handleScribbleClick = (imageUrl: string) => {
    setSelectedScribble(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedScribble(null);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 pt-10 bg-gradient-to-b from-purple-600 to-blue-900">
      <div className="container mx-auto flex gap-3">
        <form
          className="flex flex-col gap-2 w-1/4"
          onSubmit={handleSubmit(async (formData) => {
            if (!canvasRef.current) return;
            //character limit for the prompt
            if (promptInput.length > 50) return;

            const scribble = await canvasRef.current.exportImage("jpeg");
            console.log(scribble);
            await uploadScribbleMutation({ ...formData, scribble });
          })}
        >
          <p className="text-xl text-white">Prompt</p>
          <input
            id="prompt"
            className="border-white rounded-md px-2 py-2 bg-transparent text-white border focus:outline-none"
            {...register("prompt", { required: true })}
            value={promptInput}
            onChange={(e) => handlePromptInput(e)}
          />
          {errors.prompt && <ErrorMessage message="You must write a prompt." />}

          {showPassedLimitText && (
            <ErrorMessage message="Character limit exceeded." />
          )}

          <p className="mt-3 text-xl text-white">Canvas (Scribble below)</p>
          <ReactSketchCanvas
            ref={canvasRef}
            style={{ height: 350 }}
            strokeWidth={4}
            strokeColor="black"
            className="cursor-cell"
          />
          <button className="bg-purple-700 rounded cursor-pointer py-2 px-4 text-white font-semibold transition-transform duration-300 hover:scale-105">
            Submit
          </button>
          <button
            type="button"
            className="bg-blue-600 rounded cursor-pointer py-2 px-4 text-white font-semibold mt-3 transition-transform duration-300 hover:scale-105"
            onClick={() => {
              canvasRef.current?.clearCanvas();
              setPromptInput("");
            }}
          >
            Clear
          </button>
        </form>

        <section className="ml-20">
          <h3 className="text-xl text-white">Artworks</h3>
          <div className="grid grid-cols-1 gap-3 mt-6 lg:grid-cols-2 lg:gap-6 lg:gap-x-10 xl:grid-cols-3 xl:gap-3">
            {/*only showing the most recent 6*/}
            {sortedQuery.slice(0, 6).map((scribble) => (
              <img
                key={scribble._id}
                width="256"
                height="256"
                src={scribble.result}
                alt="Artwork"
                className="cursor-pointer"
                title="Click to expand"
                onClick={() => handleScribbleClick(scribble.result)}
              />
            ))}
          </div>
        </section>

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

function ErrorMessage({ message }: { message: string }) {
  return (
    <span className="flex justify-center text-red-500 font-normal">
      {message}
    </span>
  );
}
