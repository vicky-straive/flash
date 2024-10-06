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
import AddSpotModal from "./modals/addSpotModal";
import SpotAddModal from "./modals/spotAddModal";
import ReachModal from "./modals/reachMeModal";
import { useSetRecoilState, useRecoilValue } from "recoil";
import {
  buttonClickedState,
  dateCancel,
  isSpotModalOpenState,
  musicStateAtom,
} from "../recoil/atoms";
import useSound from "use-sound";

import "primeicons/primeicons.css";
import { Button } from "@nextui-org/button";
import { Coffee } from "lucide-react";

export default function Home() {
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showWordz, setShowWordz] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showCoolMode, setShowCoolMode] = useState(false);
  const shimmerButnState = useRecoilValue(buttonClickedState);
  const cancel = useRecoilValue(dateCancel);
  const setSpot = useSetRecoilState(isSpotModalOpenState);
  const spot = useRecoilValue(isSpotModalOpenState);

  // logs
  console.log("spot", spot);

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
          wordz="Hey Vishnu Priya!"
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
            <SparklesText
              text={
                cancel
                  ? "every wait has its worth, I can wait!"
                  : "but connections can last a lifetime."
              }
            />
          </motion.div>
        )}
      </div>
      <div className="inline-block max-w-l text-center justify-center">
        {showSubtitle && !cancel && (
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
      {!cancel && <Confettie />}
      {showButton && !shimmerButnState && !cancel && (
        <ShimmerButton>YES!!</ShimmerButton>
      )}
      {shimmerButnState && !cancel && (
        <div className="mt-8">
          <Cards />
          <div className="flex justify-center">
            <Button
              color="warning"
              endContent={<Coffee />}
              style={{ marginTop: "30px", marginBottom: "30px" }}
              onClick={() => setSpot(true)}
            >
              Let me know your favourite spot
            </Button>
            <AddSpotModal />
            <SpotAddModal />
            <ReachModal />
          </div>
        </div>
      )}
      {showCoolMode && !cancel && !shimmerButnState && <CoolModeDemo />}
    </section>
  );
}
