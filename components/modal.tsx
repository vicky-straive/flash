import React, { useState } from "react";
import {
  useRecoilState,
  useRecoilValue,
  atom,
  useSetRecoilState,
} from "recoil";
import {
  isModalOpenState,
  selectedCardState,
  selectedDateTimeState,
} from "../recoil/atoms";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Image, // Import the Image component from the correct package
} from "@nextui-org/react";
import { format } from "date-fns";

import { DatePicker } from "@nextui-org/react";
import { now, getLocalTimeZone } from "@internationalized/date";

interface Card {
  name: string;
  type: string;
  location: string;
  imageUrl: string;
}

export default function App() {
  const [isOpen, setIsOpen] = useRecoilState(isModalOpenState);
  const selectedCard = useRecoilValue<Card | null>(selectedCardState);
  const setSelectedDateTime = useSetRecoilState(selectedDateTimeState);
  const selectedDateTime = useRecoilValue(selectedDateTimeState);
  const [date, setDate] = useState(now(getLocalTimeZone()));

  const onClose = () => setIsOpen(false);
  const formatDate = (date: Date) => {
    const pad = (num: number) => num.toString().padStart(2, "0");
    const hours = date.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format

    return `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()} & ${pad(formattedHours)}:${pad(date.getMinutes())}:${pad(date.getSeconds())} ${ampm}`;
  };

  const handleAction = async () => {
    if (!selectedCard || !date) {
      console.error("Selected card or date is missing");
      return;
    }
  
    const formattedDate = formatDate(date.toDate());
    setSelectedDateTime(formattedDate);
  
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedCard,
          selectedDateTime: formattedDate,
        }),
      });
  
      if (response.ok) {
        console.log("Email sent successfully");
      } else {
        console.error("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  
    onClose();
  };
  

  console.log("selectedDateTime", selectedDateTime);

  // Define the 'place' variable
  const place = {
    name: "Place Name",
    imageUrl: "https://example.com/image.jpg",
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} placement="auto">
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
              {/* <p>{selectedCard?.location}</p> */}
              {/* Add more details as needed */}
              <div className="w-full max-w-xl flex flex-row gap-4">
                <DatePicker
                  label="Pick Date"
                  variant="bordered"
                  hideTimeZone
                  showMonthAndYearPickers
                  onChange={(selected) => setDate(selected)} // This will update the date state
                  defaultValue={now(getLocalTimeZone())}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={handleAction}>
                Action
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
