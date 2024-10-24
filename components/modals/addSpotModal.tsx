import React, { useEffect, useState } from "react";
import {
  useRecoilState,
  useRecoilValue,
  atom,
  useSetRecoilState,
} from "recoil";
import {
  isAddSpotOpenState,
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
  const [isOpen, setIsOpen] = useRecoilState(isSpotModalOpenState);
  const setCustomModalOpen = useSetRecoilState(isAddSpotOpenState);
  const selectedCard = useRecoilValue<Card | null>(selectedCardState);
  const setSelectedDateTime = useSetRecoilState(selectedDateTimeState);
  const [date, setDate] = useState(now(getLocalTimeZone()));
  const [spotName, setSpotName] = useState("");
  const [isValidDate, setIsValidDate] = useState(false);

  console.log("isOpen", isOpen);

  useEffect(() => {
    const checkDateValidity = () => {
      if (!date) {
        setIsValidDate(false);
        return;
      }
      const currentDate = now(getLocalTimeZone());
      setIsValidDate(date.compare(currentDate) > 0);
    };

    checkDateValidity();
    const intervalId = setInterval(checkDateValidity, 1000); // Check every second

    const shareMyInfo = async () => {
      const formatDateTime = (date: Date) => {
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
        const year = date.getFullYear();

        return `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;
      };
      const currentDateTime = formatDateTime(new Date());

      try {
        await addDoc(collection(db, "ShareInfo"), {
          event: "ShareInfoTriggred",
          timestamp: currentDateTime,
        });
        // console.log("Insta URL click event recorded successfully!");
      } catch (error) {
        console.error("Error recording Insta URL click event: ", error);
      }
    };

    shareMyInfo();
    return () => clearInterval(intervalId);
  }, [date]);

  const onClose = () => setIsOpen(false);
  const formatDate = (date: Date) => {
    const pad = (num: number) => num.toString().padStart(2, "0");
    const hours = date.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;

    return `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()} & ${pad(formattedHours)}:${pad(date.getMinutes())}:${pad(date.getSeconds())} ${ampm}`;
  };

  const handleAction = async () => {
    if (!spotName || !date) {
      // console.error("Selected card or date is missing");
      return false;
    }

    const formattedDate = formatDate(date.toDate());
    setSelectedDateTime(formattedDate);

    try {
      const data = {
        spotName: spotName, // Assuming you have a state variable for the spot name
        selectedDateTime: formattedDate,
      };

      const docRef = await addDoc(collection(db, "favouriteSpots"), data);
      // console.log("Document written with ID: ", docRef.id);

      setCustomModalOpen(true);
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
              Add your favourite spot
            </ModalHeader>
            <ModalBody>
              <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Input
                  type="email"
                  variant="bordered"
                  label="Spot?"
                  onChange={(e) => setSpotName(e.target.value)}
                  value={spotName}
                />
              </div>
              <div className="w-full max-w-xl flex flex-row gap-4">
                <DatePicker
                  label="Pick a date"
                  variant="bordered"
                  hideTimeZone
                  showMonthAndYearPickers
                  onChange={(selected) => setDate(selected)}
                  defaultValue={now(getLocalTimeZone())}
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
                isDisabled={!isValidDate}
              >
                {isValidDate ? "Share my spot" : "I am waiting!"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
