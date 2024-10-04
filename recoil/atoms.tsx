import { atom } from "recoil";

export interface Place {
  id: string;
  name: string;
  type: string;
  location: string;
  imageUrl: string;
  mapUrl: string;
}

export const buttonClickedState = atom({
  key: "buttonClickedState",
  default: false,
});

export const selectedCardState = atom<Place | null>({
  key: "selectedCardState",
  default: null,
});
export const isModalOpenState = atom<boolean>({
  key: "isModalOpenState",
  default: false,
});

export const isCustomModalOpenState = atom<boolean>({
  key: "isCustomModalOpenState",
  default: false,
});


export const selectedDateTimeState = atom<string | null>({
  key: "selectedDateTimeState",
  default: null,
});


