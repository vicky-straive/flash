"use client";

import { RecoilRoot } from "recoil";
import Hero from "../components/hero";

import "primeicons/primeicons.css";

export default function Home() {
  return (
    <>
      <RecoilRoot>
        <Hero />
      </RecoilRoot>
    </>
  );
}
