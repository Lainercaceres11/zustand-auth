import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { firebaseStorage } from "../../storage/firebase-storage";
import { useWeedingBoundStore } from "../wedding";

interface PersonStore {
  firstname: string;
  lastName: string;
}

interface Action {
  setFirstname: (value: string) => void;
  setLastname: (value: string) => void;
}

const storeApi: StateCreator<
  PersonStore & Action,
  [["zustand/devtools", never]]
> = (set) => ({
  firstname: "",
  lastName: "",

  setFirstname: (value: string) =>
    set({ firstname: value }, false, "setFirstname"),
  setLastname: (value: string) =>
    set({ lastName: value }, false, "setLastname"),
});

export const usePersonStore = create<PersonStore & Action>()(
  devtools(
    persist(
      storeApi,

      // { name: "person-storage", storage: customStorage }
      { name: "person-storage", storage: firebaseStorage }
    )
  )
);

usePersonStore.subscribe((nextState) => {
  const { firstname, lastName } = nextState;

  useWeedingBoundStore.getState().setFirstName(firstname);
  useWeedingBoundStore.getState().setLastName(lastName);
});
