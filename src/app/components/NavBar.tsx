"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../images/logo.png";
import githubIcon from "../images/github icon.png";

export function NavBar() {
  const [isNavBarOpen, setIsNavBarOpen] = useState<boolean>(false);

  const handleNavBarToggle = () => {
    setIsNavBarOpen(!isNavBarOpen);
  };

  const closeNavBar = () => {
    setIsNavBarOpen(false);
  };

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

        {/* For devices larger than md */}
        <nav className="hidden md:flex space-x-20">
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

        {/* Devices smaller than md */}
        <button
          className="md:hidden bg-purple-600 text-white px-6 mr-2 py-2 hover:bg-purple-500 transition-colors duration-300 rounded-3xl"
          onClick={handleNavBarToggle}
        >
          Menu
        </button>

        {/* The NavBar popup */}
        {isNavBarOpen && (
          <div className="md:hidden absolute top-16 right-0 left-0 bg-purple-700 py-3 gap-y-1 flex flex-col items-center space-y-3 z-50">
            <Link href="/gallery">
              <p
                className="text-white text-lg hover:text-purple-300 transition-colors duration-300"
                onClick={closeNavBar}
              >
                Gallery
              </p>
            </Link>
            <Link href="/instructions">
              <p
                className="text-white text-lg hover:text-purple-300 transition-colors duration-300 "
                onClick={closeNavBar}
              >
                How to Use?
              </p>
            </Link>
            <Link href="https://github.com/DaviZCodes/arter-generative-ai">
              <p
                className="text-white text-lg hover:text-purple-300 transition-colors duration-300 "
                onClick={closeNavBar}
              >
                GitHub
              </p>
            </Link>
          </div>
        )}

        <div
          id="toggleModeBtn"
          className="hidden md:block bg-purple-600 text-white px-4 py-2 hover:bg-purple-500 transition-colors duration-300 rounded-3xl"
        >
          <Link
            className="flex"
            href="https://github.com/DaviZCodes/arter-generative-ai"
            target="_blank"
            title="GitHub Link"
          >
            <Image
              className="mr-2"
              src={githubIcon}
              width={30}
              height={30}
              alt="Github Icon"
            />
            GitHub
          </Link>
        </div>
      </div>
    </div>
  );
}
