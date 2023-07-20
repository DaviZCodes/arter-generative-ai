"use node";

import { internalAction } from "./_generated/server";
import { internal } from "./_generated/api";
import Replicate from "replicate";
import { Id } from "./_generated/dataModel";

export const generateImage = internalAction(
  async (
    { runMutation },
    {
      scribbleId,
      prompt,
      scribble,
    }: { scribbleId: Id<string>; prompt: string; scribble: string }
  ) => {
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN!,
    });

    console.log("generate invoked", { scribbleId, prompt, scribble });

    const output = (await replicate.run(
      "jagilley/controlnet-scribble:435061a1b5a4c1e26740464bf786efdfa9cb3a3ac488595a2de23e143fdb0117",
      {
        input: {
          image: scribble, // docs say this must be called image input
          scale: 7,
          prompt,
          image_resolution: "512",
        },
      }
    )) as [string, string];

    await runMutation(internal.scribbles.updateScribbleResult, {
      scribbleId,
      result: output[1],
    });
  }
);
