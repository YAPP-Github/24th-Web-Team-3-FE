import { create } from "zustand"

interface AlertState {
  title: string
  description: string
  visible: boolean
  showAlert: (title: string, description: string) => void
  hideAlert: () => void
}

const useAlertStore = create<AlertState>((set) => ({
  title: "",
  description: "",
  visible: false,
  showAlert: (title: string, description: string) =>
    set({ title, description, visible: true }),
  hideAlert: () => set({ visible: false }),
}))

export default useAlertStore
