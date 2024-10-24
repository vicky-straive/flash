"use client";

import { useEffect } from "react";
import ClientTweetCard from "@/components/ui/client-tweet-card";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebaseConfig"; // Adjust the path as necessary

const AboutHim: React.FC = () => {
  useEffect(() => {
    const sendProfileOpenedResponse = async () => {
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
        await addDoc(collection(db, "Profile View"), {
          event: "profileOpened",
          timestamp: currentDateTime,
        });
        // console.log("Profile opened event recorded successfully!");
      } catch (error) {
        console.error("Error recording profile opened event: ", error);
      }
    };

    sendProfileOpenedResponse();
  }, []);

  return (
    <div>
      <h1 className="mb-8">About Vicky</h1>
      <ClientTweetCard id="1675849118445436929" className="shadow-2xl" />
    </div>
  );
};

export default AboutHim;
