import React, { useEffect, useState } from "react";
import {
  useRecoilState,
  useRecoilValue,
  atom,
  useSetRecoilState,
} from "recoil";
import {
  isCustomModalOpenState,
  isModalOpenState,
  selectedCardState,
  selectedDateTimeState,
} from "../../recoil/atoms";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Image,
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

const saveDataToFirebase = async (data: any) => {
  try {
    const docRef = await addDoc(collection(db, "bookings"), data);
    // console.log("Document successfully written with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document to Firestore:", error);
    throw error;
  }
};

export default function App() {
  const [isOpen, setIsOpen] = useRecoilState(isModalOpenState);
  const setCustomModalOpen = useSetRecoilState(isCustomModalOpenState);
  const selectedCard = useRecoilValue<Card | null>(selectedCardState);
  const setSelectedDateTime = useSetRecoilState(selectedDateTimeState);
  const selectedDateTime = useRecoilValue(selectedDateTimeState);
  const [date, setDate] = useState(now(getLocalTimeZone()));
  const [isValidDate, setIsValidDate] = useState(false);

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
    if (!selectedCard || !date) {
      console.error("Selected card or date is missing");
      return false;
    }

    const formattedDate = formatDate(date.toDate());
    setSelectedDateTime(formattedDate);

    try {
      const data = {
        cardName: selectedCard.name,
        cardType: selectedCard.type,
        cardLocation: selectedCard.location,
        selectedDateTime: formattedDate,
      };

      const docId = await saveDataToFirebase(data);
      // console.log("Data saved successfully with ID:", docId);
      setCustomModalOpen(true);
      onClose();
      return true;
    } catch (error) {
      console.error("Error processing action:", error);
      onClose();
      return false;
    }
  };

  // console.log("selectedDateTime", selectedDateTime);

  const place = {
    name: "Place Name",
    imageUrl: "https://example.com/image.jpg",
  };

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
              {selectedCard?.name}
            </ModalHeader>
            <ModalBody>
              <div className="relative col-span-6 md:col-span-4">
                <Image
                  alt={selectedCard?.name || "Selected place"}
                  src={selectedCard?.imageUrl || "/placeholder-image.jpg"}
                  width={"auto"}
                  height={"auto"}
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
                {isValidDate ? "Reserve" : "I am waiting!"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
