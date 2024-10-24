"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { Card, CardBody, Image, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface Reservation {
  id: string;
  cardName: string;
  cardType: string;
  cardLocation: string;
  selectedDateTime: string;
  spotName: string;
  cardImage: string;
}

export default function Reservation() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchReservations = async () => {
      setIsLoading(true);
      const querySnapshot = await getDocs(collection(db, "Reservation"));
      const reservationData = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          }) as Reservation
      );
      setReservations(reservationData);
      setIsLoading(false);
    };

    fetchReservations();
  }, []);

  return (
    <div>
      <h1 style={{ fontSize: "25px" }}>Your Reservations</h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-5 border-b-2 border-purple-900"></div>
        </div>
      ) : reservations.length > 0 ? (
        reservations.map((reservation) => (
          <>
            <Card
              key={reservation.id}
              isBlurred
              className={
                "border-none mt-5 mb-5 bg-background/60 dark:bg-default-100/50 max-w-[610px] transition-opacity duration-500"
              }
              shadow="sm"
            >
              <CardBody>
                <div
                  key={reservation.id}
                  className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center "
                >
                  <div className="relative col-span-6 md:col-span-4">
                    <Image
                      alt={`${reservation.cardName} logo`}
                      className="object-cover"
                      height={200}
                      shadow="md"
                      src={reservation.cardImage}
                      width="100%"
                    />
                  </div>

                  <div className="flex flex-col col-span-6 md:col-span-8">
                    <div className="flex justify-top items-start">
                      <div className="flex flex-col gap-0">
                        <h1 className="text-4xl font-medium mt-2 mb-3">
                          {reservation.cardName},
                        </h1>
                        <h3 className="font-semibold text-foreground/90">
                          {reservation.cardType}
                        </h3>
                        <p className="text-small text-foreground/80">
                          {reservation.cardLocation}
                        </p>
                        <p>Date: {reservation.selectedDateTime}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </>
        ))
      ) : (
        <div className="text-center mt-8">
          <p className="text-xl">No reservations found.</p>
          <Button
            variant="bordered"
            color="warning"
            onClick={() => router.push("/")}
            className="mt-2"
          >
            Make a reservation to view it here!
          </Button>
        </div>
      )}
    </div>
  );
}
