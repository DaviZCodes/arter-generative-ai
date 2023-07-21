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

  //canva
  const canvasRef = useRef<ReactSketchCanvasRef>(null);

  //scribble/image
  const uploadScribbleMutation = useMutation(api.scribbles.uploadScribble);
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
      <div className="container mx-auto flex flex-col md:flex-row gap-1 xl:justify-center">
        <form
          className="flex flex-col gap-2 w-full md:w-1/2 lg:w-1/3 2xl:w-1/4 xl:ml-0"
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
            strokeWidth={4}
            style={{ height: 350 }}
            strokeColor="black"
            className="cursor-cell"
          />
          <button className="bg-purple-700 rounded cursor-pointer py-2 px-3 text-white font-semibold transition-transform duration-300 hover:scale-105">
            Submit
          </button>
          <button
            type="button"
            className="bg-blue-600 rounded cursor-pointer py-2 px-3 text-white font-semibold mt-3 transition-transform duration-300 hover:scale-105"
            onClick={() => {
              canvasRef.current?.clearCanvas();
              setPromptInput("");
            }}
          >
            Clear
          </button>
        </form>

        <section className="flex flex-col items-center ml-0 translate-x-0 md:ml-14 md:items-start md:translate-x-6 lg:translate-x-10 xl:translate-x-0">
          <h3 className="text-2xl text-center mt-6 md:my-0 md:text-xl lg:text-left text-white">
            Artworks
          </h3>
          <div className="grid grid-cols-1 gap-3 mt-6 lg:grid-cols-2 xl:grid-cols-3 xl:gap-3 xl:translate-x-0">
            {/*only showing the most recent 6*/}
            {sortedQuery.slice(0, 6).map((scribble) => (
              <div className="">
                <img
                  key={scribble._id}
                  src={scribble.result}
                  alt="Artwork"
                  width={256}
                  height={256}
                  className="cursor-pointer"
                  title="Click to expand"
                  onClick={() => handleScribbleClick(scribble.result)}
                />
              </div>
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
