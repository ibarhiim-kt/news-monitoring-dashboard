// store/newsStore.js
import { create } from "zustand";

export const useNewsStore = create((set) => ({
  selectedArticle: null,
  setSelectedArticle: (article) => set({ selectedArticle: article }),
}));
