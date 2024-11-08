"use client";

import Image from "next/image";
import { CustomButton } from "@components";

const Hero = () => {
  const handleScroll = () => {
    const nextSection = document.getElementById("discover");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative h-screen w-full">
      <Image 
        src="/autohero.png" 
        alt="hero" 
        layout="fill" 
        className="object-cover" 
        priority
      />
      <div className="absolute inset-0 flex flex-col items-start justify-center">
        <h1 className="absolute bottom-0 left-0 text-white text-[100px] font-extrabold p-[100px]">
          LÄHDETÄÄN<br/><span className="text-red-theme">TIEN PÄÄLLE!</span> 
        </h1>
        <CustomButton onClick={handleScroll} classname="bg-red-theme" />
      </div>
    </div>
  );
};

export default Hero;
