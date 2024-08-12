import { create } from "zustand"

interface AuthState {
  accessToken: string | null
  setAccessToken: (token: string | null) => void
  clearAuth: () => void
}

const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
  clearAuth: () => set({ accessToken: null }),
}))

export default useAuthStore
