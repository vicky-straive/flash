import { reachMeModal } from "@/recoil/atoms";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  ModalProps,
} from "@nextui-org/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import confetti from "canvas-confetti";
import React, { useState } from "react";

export default function App() {
  //   const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const customModalOpen = useRecoilValue(reachMeModal);
  const setCustomModalOpen = useSetRecoilState(reachMeModal);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

  const onClose = () => {
    setCustomModalOpen(false);
  };
  //   confetti({});

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 1) {
      setIsScrolledToBottom(true);
    }
  };

  return (
    <>
      <Modal
        backdrop="blur"
        isOpen={customModalOpen}
        onOpenChange={onClose}
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                IKYK who am I
              </ModalHeader>
              <ModalBody onScroll={handleScroll}>
                <h1 style={{ fontSize: "25px" }}>
                  I could have reached out or spoken to you sooner, but
                  something held me back. It wasn’t just fear of you walking
                  away; it was the thought of not wanting to rush things,
                  because some moments are worth waiting for. 💫
                </h1>
                <h1 style={{ fontSize: "25px" }}>
                  I don’t have much to reach out to you with, except for the way
                  I keep admiring your smile. 😊 Honestly, that smile of yours
                  feels like it touches another dimension, something that words
                  can’t fully capture. Whatever happens, always keep that
                  smile—it’s truly something special. 💖
                </h1>
                <h1>
                  And if you feel like making this moment even more meaningful,
                  we can meet on our first day and let the conversation flow
                  from there. ☕
                </h1>
                <p>
                  P.S. IKYK who I am... and I think you’ve always known. 😉"
                </p>
                <p>
                  If you still want to view my profile, you can view from
                  clicking the view info button or you can share me your
                  profile..
                </p>
              </ModalBody>
              <ModalFooter className="mt-3">
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={onClose}
                  isDisabled={!isScrolledToBottom}
                >
                  View his info
                </Button>
                <Button color="primary" onPress={onClose}>
                  Share My proifle
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
