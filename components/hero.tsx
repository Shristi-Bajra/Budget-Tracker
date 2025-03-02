"use client";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "./ui/button";

const HeroSection = () => {
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const imageElement = imageRef.current;
    
    const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const scrollThreshold = 100;
    
    if (imageElement) {
      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    }
  };
    window.addEventListener("scroll",handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  },[])
  return (
    <div className="pb-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-to-br from-blue-600 to-purple-600">
        Manage Your Money 
        <br/>
        Smartly
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        A smart financial management platform that helps you track, analyze, 
        and optimize your spending with real-time insights.
        </p>
      </div>
      <div className="flex justify-center space-x-4">
        <Link href="/dashboard">
          <Button size="lg" className="px-8">
            Get Started
          </Button>
        </Link>
      </div>
      <div className="hero-image-wrapper">
        <div ref={imageRef} className="hero-image">
          <Image src="/banner.jpeg" alt="Dashboard Preview" width={1280} height={720} className="rounded-lg shadow-2xl border mx-auto" priority />
        </div>
       </div>
    </div>
  );
};

export default HeroSection;
