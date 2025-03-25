"use client"
import React, { useEffect } from "react";
import Header from "@/components/LandingPage/Header";
import Hero from "@/components/LandingPage/Hero";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const page = () => {
  return (
    <div>
      <Header />
      <Hero />
    </div>
  );
};

export default page;
