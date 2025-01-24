import {create} from 'zustand';

interface AppState {
  isDiscoverOpen: boolean;
  selectedPostId: string | null;
  toggleDiscover: () => void;
  setSelectedPost: (id: string | null) => void;
}

export const useAppState = create<AppState>((set) => ({
  isDiscoverOpen: false,
  selectedPostId: null,
  toggleDiscover: () => set((state) => ({ isDiscoverOpen: !state.isDiscoverOpen })),
  setSelectedPost: (id) => set(() => ({ selectedPostId: id })),
}));
