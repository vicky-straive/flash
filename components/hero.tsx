"use client";

import { title, subtitle } from "@/components/primitives";
import WordPullUp from "@/components/ui/word-pull-up";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SparklesText from "@/components/ui/sparkles-text";
import ShimmerButton from "@/components/ui/shimmer-button";
import Confettie from "@/components/ui/confetti";
import Cards from "../components/card";
import { CoolModeDemo } from "../components/coolMode";

import { useSetRecoilState, useRecoilValue } from "recoil";
import { buttonClickedState } from "../recoil/atoms";

import "primeicons/primeicons.css";
import { Button } from "@nextui-org/button";

export default function Home() {
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showWordz, setShowWordz] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showCoolMode, setShowCoolMode] = useState(false);
  const shimmerButnState = useRecoilValue(buttonClickedState);

  // logs
  // console.log("shimmerButnState", shimmerButnState);

  useEffect(() => {
    const timers = [
      { state: setShowWordz, delay: 10000 },
      { state: setShowSubtitle, delay: 15000 },
      { state: setShowButton, delay: 20000 },
      { state: setShowCoolMode, delay: 25000 },
    ];

    const timeoutIds = timers.map(({ state, delay }) =>
      setTimeout(() => state(true), delay)
    );

    return () => timeoutIds.forEach(clearTimeout);
  }, []);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py- md:py-7">
      <div className="inline-block max-w-l text-center justify-center">
        <WordPullUp
          words="In the midst of life's chaos, there's a moment waiting to be shared over a cup of coffee—where words may be few,"
          wordz="but connections can last a lifetime."
        />
      </div>
      <div className="inline-block max-w-l text-center justify-center gap-4 py-8 md:py-7">
        {showWordz && (
          <motion.div
            className={title({ color: "violet", class: "mb-8" })}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            // style={{ marginTop: "15px" }}
          >
            <SparklesText text="but connections can last a lifetime." />
          </motion.div>
        )}
      </div>
      <div className="inline-block max-w-l text-center justify-center">
        {showSubtitle && (
          <motion.div
            className={subtitle({ class: "mt-4" })}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {shimmerButnState
              ? "Pick a place where our story starts"
              : "Would you join me for one of those moments?"}
          </motion.div>
        )}
      </div>
      <Confettie />
      {showButton && !shimmerButnState && <ShimmerButton>YES!!</ShimmerButton>}
      {shimmerButnState && (
        <div className="mt-8">
          <Cards />
        </div>
      )}
      {showCoolMode && <CoolModeDemo />}
    </section>
  );
}
