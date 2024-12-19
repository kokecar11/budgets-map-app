import { create } from "zustand";
import Cookies from "js-cookie";

interface AuthState {
  accessToken: string | null | undefined;
  refreshToken: string | null | undefined;
  setTokens: (tokens: { accessToken: string; refreshToken: string }) => void;
  clearTokens: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken:
    typeof window !== "undefined" ? Cookies.get("access_token") : null,
  refreshToken:
    typeof window !== "undefined" ? Cookies.get("refresh_token") : null,
  setTokens: ({ accessToken, refreshToken }) => {
    if (typeof window !== "undefined") {
    }
    Cookies.set("access_token", accessToken);
    Cookies.set("refresh_token", refreshToken);
    set({ accessToken, refreshToken });
  },
  clearTokens: () => {
    if (typeof window !== "undefined") {
    }
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    set({ accessToken: null, refreshToken: null });
  },
}));
