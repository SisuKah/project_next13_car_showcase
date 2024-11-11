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
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col md:flex-row bg-white shadow-md max-w-[1400px] w-full border gap-x-[150px]">
          <div className="flex-1">
            <Image
              src="/wedoCar.png"
              alt="Car Image"
              className="w-full h-full object-cover"
              width={500} // Specify width and height for the image
              height={500}
            />
          </div>
          <div className="flex-1 p-8 justify-center items-start flex flex-col min-h-screen">
          <h1 className="text-[50px] font-extrabold">
            MITÄ <br/><span className="text-red-500">TEEMME?</span>
          </h1>
          <p className="mb-6 font-normal font-sans">
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
