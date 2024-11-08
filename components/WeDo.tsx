"use client";

import Image from "next/image";
import { CustomButton } from "@components";
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
              width={400} // Specify width and height for the image
              height={400}
            />
          </div>
          <div className="flex-1 p-8 flex flex-col justify-center">
            <h1 className="mb-4 text-[50px] font-extrabold">
              MITÄ <br /><span className="text-red-500">TEEMME?</span>
            </h1>
            <p className="text-gray-600 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus.
            </p>
            <a
              href="#"
              className="bg-red-500 text-white py-3 px-6 rounded-full font-semibold inline-block hover:bg-red-600 transition"
            >
              LISÄÄ AUTOSI NETTIIN →
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeDo;
