import { create } from "zustand";

// The set function is a special function provided by Zustand that allows you to update the state of the store immutably. It takes an object containing the new state values.
export const useUsersStore = create((set) => ({
  users: [],
  updateUsers: (users) => set({ users: users }),
}));
