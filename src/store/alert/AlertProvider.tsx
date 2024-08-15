"use client"

import Alert from "../../common/Alert"
import useAlertStore from "./useAlertStore"

const AlertProvider = () => {
  const { title, description, visible, hideAlert } = useAlertStore()

  if (!visible) return null

  return <Alert title={title} description={description} onClose={hideAlert} />
}

export default AlertProvider
