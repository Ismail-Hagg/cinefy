import { create } from "zustand";

type prop = {
  name: string;
  print: (movie: string) => void;
};

export const uesMovieStore = create<prop>((set) => ({
  name: "hello",
  print: (movie: string) => {
    set({ name: movie });
  },
}));
