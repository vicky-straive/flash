import { isAddSpotOpenState, reachMeModal } from "@/recoil/atoms";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import confetti from "canvas-confetti";

export default function App() {
  //   const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const customModalOpen = useRecoilValue(isAddSpotOpenState);
  const setCustomModalOpen = useSetRecoilState(isAddSpotOpenState);
  const setReachMe = useSetRecoilState(reachMeModal);

  const onClose = () => {
    setCustomModalOpen(false);
  };
  confetti({});

  return (
    <>
      {/* <Button onPress={onOpen}>Open Modal</Button> */}
      <Modal
        backdrop="blur"
        isOpen={customModalOpen}
        onOpenChange={onClose}
        // classNames={{
        //   backdrop:
        //     "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        // }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                New fav spot added ❤️
              </ModalHeader>
              <ModalBody>
                <h1 style={{ fontSize: "25px" }}>
                  You just made this moment even more special by picking the
                  perfect place! 🌟 I can't wait to experience it with you and
                  make it a day to remember. 😊 Thanks for choosing a spot that
                  means something to you!
                </h1>
                <p style={{ fontSize: "25px" }}>See you soon!</p>
                <p>I'll give you a heads up when the spot is resvered!</p>
              </ModalBody>
              <ModalFooter className="mt-3">
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={() => setReachMe(true)}>
                  Click here, to reach me!
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
