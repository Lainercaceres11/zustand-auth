import { StateStorage, createJSONStorage } from "zustand/middleware";

const firebaseUrl = "https://zustand-storage-2837a-default-rtdb.firebaseio.com/zustand"

const firebaseApi: StateStorage = {
  getItem: async function (name: string): string | Promise<string | null> | null {
    try {
        const data = await fetch(`${firebaseUrl}/${name}.json`).then((res)=> res.json())
        console.log(data)

        return JSON.stringify(data)
    } catch (error) {
        throw Error()
    }
  },
  setItem: async function (name: string, value: string): Promise<void> {
    try {
        const data = await fetch(`${firebaseUrl}/${name}.json`, {
          method: "PUT",
          body: value,
        }).then((res) => res.json());
        return data
    } catch (error) {
        throw Error()
    }
   
  },
  removeItem: function (name: string): void | Promise<void> {
    console.log(name);
  },
};

export const firebaseStorage = createJSONStorage(() => firebaseApi);
