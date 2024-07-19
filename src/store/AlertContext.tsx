"use client"

import { create } from "zustand"

import Alert from "../common/Alert"

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

export const useAlert = () => {
  const { showAlert, hideAlert, title, description, visible } = useAlertStore()
  return { showAlert, hideAlert, title, description, visible }
}

const AlertContainer = () => {
  const { title, description, visible, hideAlert } = useAlert()

  if (!visible) return null

  return <Alert title={title} description={description} onClose={hideAlert} />
}

export default AlertContainer
