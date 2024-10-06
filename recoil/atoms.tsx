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

export const isSpotModalOpenState = atom<boolean>({
  key: "isSpotModalOpenState",
  default: false,
});

export const isAddSpotOpenState = atom<boolean>({
  key: "isAddSpotOpenState",
  default: false,
});

export const dateCancel = atom<boolean>({
  key: "isMDateCancel",
  default: false,
});

export const isCustomModalOpenState = atom<boolean>({
  key: "isCustomModalOpenState",
  default: false,
});

export const reachMeModal = atom<boolean>({
  key: "reachMeModal",
  default: true,
});

export const selectedDateTimeState = atom<string | null>({
  key: "selectedDateTimeState",
  default: null,
});

export const musicStateAtom = atom({
  key: "musicState",
  default: "initial", // Can be 'initial', 'buttonClicked', or 'cancelled'
});
