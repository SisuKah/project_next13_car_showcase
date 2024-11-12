"use client";

import Image from "next/image";
import { AddCars } from "@components";
import Head from "next/head"; // Import the Head component from Next.js

const Pricing = () => {
  const handleScroll = () => {
    const nextSection = document.getElementById("discover");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Main body content */}
      <div className="flex justify-center items-center px-4 sm:px-6 lg:px-8 py-8 bg-white">
        <div className="flex flex-col md:flex-row-reverse md:max-w-[1500px] w-full gap-8 md:gap-12">
          {/* Image Section */}
          <div className="flex justify-center md:justify-end md:w-1/2">
            <Image
              src="/pricingCar.png"
              alt="Car Image"
              className="object-cover rounded-lg shadow-lg"
              width={600}
              height={600}
              priority
            />
          </div>

          {/* Text Section */}
          <div className="flex flex-col justify-center items-start md:w-1/2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
              <span className="text-red-500">HINNASTO</span>
            </h1>
            <p className="mb-6 text-lg sm:text-xl md:text-2xl text-gray-700">
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

export default Pricing;
