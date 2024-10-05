"use client";

import { motion, Variants } from "framer-motion";
import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { title } from "../primitives";

interface WordPullUpProps {
  words: string;
  wordz: string;
  delayMultiple?: number;
  wrapperFramerProps?: Variants;
  framerProps?: Variants;
  className?: string;
}

export default function WordPullUp({
  words,
  wordz,
  wrapperFramerProps = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  },
  framerProps = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  },
  className,
}: WordPullUpProps) {
  const [showWordz, setShowWordz] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWordz(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <motion.h1
        variants={wrapperFramerProps}
        initial="hidden"
        animate="show"
        className={cn(
          "font-display text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm",
          className
        )}
      >
        <div>
          <div>
            {wordz.split(" ").map((word, i) => (
              <motion.span
                key={`wordz-${i}`}
                variants={framerProps}
                className="mb-7"
                style={{ display: "inline-block", paddingRight: "8px" }}
              >
                <span className="">{word}</span>
              </motion.span>
            ))}
          </div>
          <div>
            {words.split(" ").map((word, i) => (
              <motion.span
                key={`words-${i}`}
                variants={framerProps}
                style={{ display: "inline-block", paddingRight: "8px" }}
              >
                {word && wordz === "" ? (
                  <span>&nbsp;</span>
                ) : (
                  <span>{word}</span>
                )}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.h1>
    </>
  );
}
