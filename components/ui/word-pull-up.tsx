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
        {words.split(" ").map((word, i) => (
          <motion.span
            key={i}
            variants={framerProps}
            style={{ display: "inline-block", paddingRight: "8px" }}
          >
            {word === "" ? <span>&nbsp;</span> : word}
          </motion.span>
        ))}
        <br />
      </motion.h1>
      {/* {showWordz && (
        <>
          <motion.h1>
            <br />
            {wordz.split(" ").map((word, i) => (
              <motion.span
                key={i}
                variants={framerProps}
                style={{ display: "inline-block", paddingRight: "8px" }}
                className={title({ color: "violet" })}
              >
                {word === "" ? (
                  <span className={title({ color: "violet" })}>&nbsp;</span>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </motion.h1>
        </>
      )} */}
    </>
  );
}
