"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { CustomButton } from "@components";
import AddCars from "./AddCarsButton"; // Adjust this import path as needed

const Hero = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const handleScroll = () => {
    const nextSection = document.getElementById("discover");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative h-screen w-full">
      {/* Background Image */}
      <Image
        src="/autohero.png"
        alt="hero"
        layout="fill"
        className="object-cover"
        priority
      />
      
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center px-8">
        
        {/* Logo at the top center */}
        {!isSmallScreen && (
          <div className="absolute top-40">
            <Image 
              src="/AutoLogo.png" 
              alt="Auto Logo" 
              width={150} 
              height={50} 
              className="object-contain"
            />
          </div>
        )}

        {/* Heading with spacing and style */}
        <h1 className="text-white text-6xl md:text-8xl font-extrabold leading-tight text-center mt-[200px]"> {/* Added margin-top to move text down */}
          LAITA AUTOSI<br />
          <span className="text-red-theme">MYYNTIIN HETI!</span>
        </h1>

        {/* Call to action button */}
        <div className="mt-8">
          <CustomButton 
            onClick={handleScroll} 
            classname="bg-red-theme text-white py-3 px-8 rounded-lg shadow-md hover:shadow-xl transition duration-300"
          />
        </div>

        {/* Optional AddCars component */}
        <div className="mt-8">
          <AddCars />
        </div>
      </div>
    </div>
  );
};

export default Hero;
