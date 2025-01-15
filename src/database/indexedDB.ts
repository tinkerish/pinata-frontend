import { openDB } from "idb";
import { StorageValue } from "zustand/middleware";
import { FormStore } from "../store/formStore";

const dbPromise = openDB("recipe-form-db", 1, {
  upgrade(db) {
    db.createObjectStore("formData");
  },
});

export const indexedDBStorage = {
  getItem: async (name: IDBValidKey) => {
    const db = await dbPromise;
    const value = await db.get("formData", name);
    return value ? JSON.parse(value) : null;
  },
  setItem: async (name: IDBValidKey, value: StorageValue<FormStore>) => {
    const db = await dbPromise;
    await db.put("formData", JSON.stringify(value), name);
  },
  removeItem: async (name: IDBValidKey) => {
    const db = await dbPromise;
    await db.delete("formData", name);
  },
};
