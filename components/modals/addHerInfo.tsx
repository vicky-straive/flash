import React, { useEffect, useState } from "react";
import {
  useRecoilState,
  useRecoilValue,
  atom,
  useSetRecoilState,
} from "recoil";
import {
  isAddSpotOpenState,
  addHerOn,
  selectedCardState,
  selectedDateTimeState,
  isSpotModalOpenState,
} from "../../recoil/atoms";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Image,
  Input,
  Textarea,
} from "@nextui-org/react";

import { DatePicker } from "@nextui-org/react";
import { now, getLocalTimeZone } from "@internationalized/date";

import { db } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

interface Card {
  name: string;
  type: string;
  location: string;
  imageUrl: string;
}

export default function App() {
  const [isOpen, setIsOpen] = useRecoilState(addHerOn);
  const setCustomModalOpen = useSetRecoilState(addHerOn);
  const selectedCard = useRecoilValue<Card | null>(selectedCardState);
  const setSelectedDateTime = useSetRecoilState(selectedDateTimeState);
  const [date, setDate] = useState(now(getLocalTimeZone()));
  const [herInfo, setHerInfo] = useState("");

  console.log("isOpen", isOpen);

  const onClose = () => setIsOpen(false);
  const formatDate = (date: Date) => {
    const pad = (num: number) => num.toString().padStart(2, "0");
    const hours = date.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;

    return `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()} & ${pad(formattedHours)}:${pad(date.getMinutes())}:${pad(date.getSeconds())} ${ampm}`;
  };

  const handleAction = async () => {
    if (!herInfo || !date) {
      console.error("Selected card or date is missing");
      return false;
    }

    const formattedDate = formatDate(date.toDate());
    setSelectedDateTime(formattedDate);

    try {
      const data = {
        herInfo: herInfo, // Assuming you have a state variable for the spot name
      };

      const docRef = await addDoc(collection(db, "herInfomation"), data);
      console.log("Document written with ID: ", docRef.id);

      onClose();
      return true;
    } catch (error) {
      console.error("Error adding document: ", error);
      onClose();
      return false;
    }
  };

  // console.log("selectedDateTime", selectedDateTime);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      backdrop="blur"
      placement="auto"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-3xl">
              Share my info
            </ModalHeader>
            <ModalBody>
              <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Textarea
                  label="Information"
                  placeholder="Enter your info where I can reach out to you!"
                  className="max-w-xs"
                  onChange={(e) => setHerInfo(e.target.value)}
                  value={herInfo}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                onPress={handleAction}
                isDisabled={!herInfo}
              >
                {herInfo ? "Share my spot" : "I am waiting!"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
