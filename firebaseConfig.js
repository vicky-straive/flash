import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Replace the following with your app's Firebase project configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAisdMF0f-S0ZcO6mrBVMxjuZDuB0cmDL4",
//   authDomain: "flash-1787b.firebaseapp.com",
//   projectId: "flash-1787b",
//   storageBucket: "flash-1787b.appspot.com",
//   messagingSenderId: "466677074806",
//   appId: "1:466677074806:web:23b48f269c340b29cb8857",
//   measurementId: "G-FNH3L1R21F"
// };

const firebaseConfig = {
  apiKey: "AIzaSyA-oqEVWlxM2PZbZYv7MT4J2p6JYDRVC1E",
  authDomain: "black-jack-e28d1.firebaseapp.com",
  projectId: "black-jack-e28d1",
  storageBucket: "black-jack-e28d1.appspot.com",
  messagingSenderId: "518212964783",
  appId: "1:518212964783:web:2f43e8af1a0613409b1f5a"
};

const app = initializeApp(firebaseConfig);
const db =getFirestore(app)

// const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// const messaging = async () => {
//   const supported = await isSupported();
//   return supported ? getMessaging(app) : null;
// };

// export const fetchToken = async () => {
//   try {
//     const fcmMessaging = await messaging();
//     if (fcmMessaging) {
//       const token = await getToken(fcmMessaging, {
//         vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
//       });
//       return token;
//     }
//     return null;
//   } catch (err) {
//     console.error("An error occurred while fetching the token:", err);
//     return null;
//   }
// };

export { db };
