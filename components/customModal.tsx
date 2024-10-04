import {
  isCustomModalOpenState,
  selectedCardState,
  selectedDateTimeState,
} from "@/recoil/atoms";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import confetti from "canvas-confetti";


export default function App() {
//   const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const customModalOpen = useRecoilValue(isCustomModalOpenState);
  const setCustomModalOpen = useSetRecoilState(isCustomModalOpenState);
  const selectedCard = useRecoilValue(selectedCardState);
  const selectedDateTime = useRecoilValue(selectedDateTimeState);

  const onClose = () => {
    setCustomModalOpen(false);
  };
  confetti({});



  return (
    <>
      {/* <Button onPress={onOpen}>Open Modal</Button> */}
      <Modal
        backdrop="opaque"
        isOpen={customModalOpen}
        onOpenChange={onClose}
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Location Reserved!
              </ModalHeader>
              <ModalBody>
                <h1 style={{fontSize: '25px'}}>
                  Wow, I never imagined you’d actually make it this far! But
                  here we are, and I couldn’t be more excited. The fact that
                  you’ve chosen a spot makes this moment feel even more special.
                  I’m really looking forward to sharing that coffee with
                  you—it’s not just about the place, it’s about the company that
                  makes it perfect.
                </h1>
                <p style={{fontSize: '25px'}}>
                See you soon!
                </p>
                <p>Place: {selectedCard?.name}</p>
                <p>Location: {selectedCard?.location}</p>
                <p>Date and Time: {selectedDateTime}</p>
              </ModalBody>
              <ModalFooter className="mt-3">
                <Button  color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
