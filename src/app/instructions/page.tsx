"use client";

import Link from "next/link";

export default function Instructions() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-slate-200">
      <h3 className="mt-10 mb-6 font-semibold text-3xl">
        How to become an Arter?
      </h3>
      <ol className="text-xl">
        <li> 1. Write a prompt </li>
        <li> 2. Draw your scribble </li>
        <li> 3. Submit and enjoy your work of art. </li>
      </ol>

      <Link href="/">
        <p className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-6 rounded mt-6">
          Start now!
        </p>
      </Link>

      <p className="flex p-20">
        Visit the&nbsp;
        <Link className="text-blue-500 underline" href="gallery">
          gallery
        </Link>
        &nbsp;to view all the past artworks.
      </p>
    </main>
  );
}
