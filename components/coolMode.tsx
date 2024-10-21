import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import ShimmerButton from "./ui/shimmer-no";
import { CoolMode } from "./ui/cool-mode";
import { dateCancel } from "@/recoil/atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";

export function CoolModeDemo() {
  const { toast } = useToast();
  const [clickCount, setClickCount] = useState(0);
  const setCancel = useSetRecoilState(dateCancel);
  const cancel = useRecoilValue(dateCancel);

  const handleClick = () => {
    setClickCount((prevCount) => {
      const newCount = prevCount + 1;

      if (newCount % 15 === 0) {
        let title, message;

        switch (newCount) {
          case 15:
            title = "Caught you playing with the button! 😄";
            message =
              "I see you're having fun with that button 😄. Don't leave me hanging—how about a 'Yes'?";
            break;
          case 30:
            title = "Wondering? 🤔";
            message =
              "Are you just curious, or thinking it over? 🤔 A 'Yes' could lead to something fun! 🎉";
            break;
          case 45:
            title = "Almost There! 😏";
            message =
              "I'm waiting for that 'Yes'! 😏 Don't overthink it—it'll be worth it, I promise. 🙌";
            break;
          case 60:
            title = "Why Not? 😇";
            message =
              "It's just one little 'Yes'… and it could turn into a pretty great moment together. 😊☕";
            break;
          default:
            title = "Don't Leave Me Hanging... 😢";
            message =
              "I was really hoping you'd say 'Yes'... but if not, maybe next time? ☹️💔";
        }

        toast({
          variant: "destructive",
          title: title,
          description: message,
          duration: 5000,
          action:
            newCount >= 75 ? (
              <ToastAction altText="Try again" onClick={() => setCancel(true)}>
                Still No?
              </ToastAction>
            ) : undefined,
        });
      }
      return newCount;
    });
  };

  return (
    <div className="relative justify-center">
      <div
        className="mt-3 relative cursor-pointer justify-center rounded-full border-2"
        onClick={handleClick}
      >
        <CoolMode
          options={{
            particle:
              "https://cdn-icons-png.freepik.com/256/6023/6023126.png?semt=ais_hybrid",
          }}
        >
          <ShimmerButton>No 👠</ShimmerButton>
        </CoolMode>
      </div>
    </div>
  );
}
