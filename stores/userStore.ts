import { tokenStore } from "@/lib/tokenStore";
import { User } from "@/types/user";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserStore {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User) => void;
  setIsLoading: (isLoading: boolean) => void;
  updateUser: (data: Partial<User>) => void;
  clear: () => void;
  isAdmin: () => boolean;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: true,
      setUser: (user) => set({ user }),
      setIsLoading: (isLoading) => set({ isLoading }),
      updateUser: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),
      clear: () => {
        set({ user: null });
        tokenStore.clear();
        useUserStore.persist.clearStorage();
      },
      isAdmin: () => get().user?.role === "admin",
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state, error) => {
        if (!tokenStore.getAccessToken()) {
          state?.clear();
          return;
        }
        if (error) console.error("Failed to rehydrate user store:", error);
        if (state) state.isLoading = false;
      },
      partialize: (state) => ({ user: state.user }),
    },
  ),
);
