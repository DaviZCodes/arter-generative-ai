"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "../images/logo.png";
import githubIcon from "../images/github icon.png";

export function NavBar() {
  return (
    <div className="border-b py-3 bg-purple-700 text-sm sm:text-xl 2xl:text-2xl">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="w-12 h-12">
              <Image src={logo} alt="logo" width={48} height={48} />
            </div>
            <span className="text-xl font-bold text-white hover:text-purple-300">
              Arter
            </span>
          </div>
        </Link>
        <nav className="space-x-20">
          <Link
            href="/gallery"
            className="text-white hover:text-purple-300 transition-colors duration-300"
          >
            Gallery
          </Link>
          <Link
            href="/instructions"
            className="text-white hover:text-purple-300 transition-colors duration-300"
          >
            How to Use?
          </Link>
        </nav>
        <button
          id="toggleModeBtn"
          className="bg-purple-600 text-white px-4 py-2 hover:bg-purple-500 transition-colors duration-300 rounded-3xl"
        >
          <Link
            className="flex"
            href="https://github.com/DaviZCodes/arter-generative-ai"
            target="_blank"
            placeholder="GitHub Link"
          >
            {" "}
            <Image
              className="mr-2"
              src={githubIcon}
              width={30}
              height={30}
              alt="Github Icon"
            />
            GitHub
          </Link>
        </button>
      </div>
    </div>
  );
}
