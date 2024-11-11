"use client";

import Image from "next/image";
import { AddCars, CustomButton } from "@components";
import Head from "next/head"; // Import the Head component from Next.js

const WeDo = () => {
  const handleScroll = () => {
    const nextSection = document.getElementById("discover");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Main body content */}
      <div className="flex justify-center items-center min-h-screen p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 bg-white max-w-[1300px] w-full md:gap-[90px]">
        <div className="flex">
          <Image
            src="/wedoCar.png"
            alt="Car Image"
            className="w-full h-auto sm:h-[600px] object-cover md:h-auto"
            width={500}
            height={500}
            priority
          />

          </div>
          <div className="p-4 sm:p-6 md:p-8 flex flex-col justify-center items-start">
            <h1 className="text-[36px] sm:text-[32px] md:text-[50px] font-bold font-sans leading-tight pb-4 sm:pb-6 md:pb-[50px]">
              MITÄ <br />
              <span className="text-red-500 font-sans">TEEMME?</span>
            </h1>
            <p className="mb-4 md:mb-6 font-medium text-black font-sans text-sm sm:text-base md:text-lg md:max-w-[400px] pb-[30px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus.
            </p>
            <AddCars />
          </div>
        </div>
      </div>
    </>
  );
};

export default WeDo;
