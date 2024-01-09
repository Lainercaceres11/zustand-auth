import { create } from "zustand";
import { PersonSlice, createPersonSlice } from "./personSlice";
import { devtools } from "zustand/middleware";
import { GuestSlice, createGuestSlice } from "./guest.slice";
import { DateSlice, createDateSlice } from './date.slice';
import { ConfirmationSlice, createConfirmationSlice } from './confirmation.slice';

type SharedStore = PersonSlice & GuestSlice & DateSlice & ConfirmationSlice;

export const useWeedingBoundStore = create<SharedStore>()(
  devtools((...a) => ({
    ...createPersonSlice(...a),
    ...createGuestSlice(...a),
    ...createDateSlice(...a),
    ...createConfirmationSlice(...a),
  }))
);
