import React, { useEffect, useState } from "react";
import { Card, CardBody, Image, Button, Slider } from "@nextui-org/react";
import cardData from "../app/data.json";
import Modal from "./modal";

import { useRecoilValue, useSetRecoilState, atom } from "recoil";
import {
  selectedCardState,
  isModalOpenState,
  isCustomModalOpenState,
} from "../recoil/atoms";

import CustomModal from "./customModal";

interface Place {
  id: string;
  name: string;
  type: string;
  location: string;
  imageUrl: string;
  mapUrl: string;
}

export default function App() {
  const [liked, setLiked] = React.useState(false);
  const [revealedCards, setRevealedCards] = useState<number[]>([]);
  const setSelectedCard = useSetRecoilState(selectedCardState);
  const selectedCard = useRecoilValue(selectedCardState);
  const setIsModalOpen = useSetRecoilState(isModalOpenState);
  const customModalOpen = useRecoilValue(isCustomModalOpenState);

  // console.log("customModalOpen", customModalOpen);

  const handleCardSelect = (place: Place) => {
    setSelectedCard(place);
    setIsModalOpen(true);
  };

  const places: Place[] = Array.isArray(cardData)
    ? cardData.map((place) => ({
        ...place,
        id: place.id.toString(),
        mapUrl: place.mapUrl,
      }))
    : [];

  useEffect(() => {
    const timer = setInterval(() => {
      setRevealedCards((prev) => {
        if (prev.length < places.length) {
          return [...prev, prev.length];
        }
        clearInterval(timer);
        return prev;
      });
    }, 300); // Adjust this value to control the delay between each card reveal

    return () => clearInterval(timer);
  }, [places.length]);

  return (
    <>
      {places.map((place: Place, index: number) => (
        <Card
          key={place.id}
          isBlurred
          className={`border-none mb-5 bg-background/60 dark:bg-default-100/50 max-w-[610px] transition-opacity duration-500 ${
            revealedCards.includes(index) ? "opacity-100" : "opacity-0"
          }`}
          shadow="sm"
        >
          <CardBody>
            <div
              key={place.id}
              className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center "
            >
              <div className="relative col-span-6 md:col-span-4">
                <Image
                  alt={`${place.name} logo`}
                  className="object-cover"
                  height={200}
                  shadow="md"
                  src={place.imageUrl}
                  width="100%"
                />
              </div>

              <div className="flex flex-col col-span-6 md:col-span-8">
                <div className="flex justify-top items-start">
                  <div className="flex flex-col gap-0">
                    <h1 className="text-4xl font-medium mt-2">{place.name},</h1>
                    <h3 className="font-semibold text-foreground/90">
                      {place.type},{" "}
                    </h3>
                    <p className="text-small text-foreground/80">
                      {place.location}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex mt-2 justify-between w-fit gap-5	">
                <Button
                  color="success"
                  variant="bordered"
                  onPress={() => handleCardSelect(place)}
                >
                  This one
                </Button>
                <div className="content-center">
                  <a
                    href={place.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i
                      className="pi pi-map"
                      style={{ fontSize: "1.5rem", cursor: "pointer" }}
                    />
                  </a>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
      <Modal />
      {customModalOpen && <CustomModal />}
    </>
  );
}
