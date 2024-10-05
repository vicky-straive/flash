"use client";

import { RecoilRoot } from "recoil";
import Hero from "../components/hero";

import "primeicons/primeicons.css";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <>
      <RecoilRoot>
        <Toaster />
        <Hero />
      </RecoilRoot>
    </>
  );
}
