interface ReactNativeWebView {
  postMessage(message: string): void
}

interface Window {
  ReactNativeWebView: ReactNativeWebView
}
