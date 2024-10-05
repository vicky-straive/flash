import { Button } from "@nextui-org/button";
import { CoolMode } from "./ui/cool-mode";
import { HeartFilledIcon } from "@/components/icons";
import ShimmerButton from "./ui/shimmer-no";

export function CoolModeDemo() {
  return (
    <div className="relative justify-center">
      <div className="mt-3 relative cursor-pointer justify-center rounded-full border-2">
        <CoolMode
          options={{
            particle:
              "https://cdn-icons-png.freepik.com/256/6023/6023126.png?semt=ais_hybrid",
          }}
        >
          <ShimmerButton>No</ShimmerButton>
          {/* <div className=" m-4">NO 🫤</div> */}
        </CoolMode>
      </div>
    </div>
  );
}
