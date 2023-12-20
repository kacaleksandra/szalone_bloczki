// store.ts
import { create } from "zustand";

interface State {
  accessToken: string;
}

export const useAccessTokenStore = create<State>((set) => ({
  accessToken: "",
}));

export default useAccessTokenStore;
