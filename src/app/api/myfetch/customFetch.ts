export type ReturnFetch = typeof customFetch

type FetchArgs = [string | URL, RequestInit | undefined]

type ReturnFetchDefaultOptions = {
  fetch?: ReturnType<ReturnFetch>
  baseUrl?: string | URL
  headers?: HeadersInit
  interceptors?: {
    request?: (
      requestArgs: FetchArgs,
      fetch: ReturnType<ReturnFetch>
    ) => Promise<FetchArgs>
    response?: (
      response: Response,
      requestArgs: FetchArgs,
      fetch: ReturnType<ReturnFetch>
    ) => Promise<Response>
  }
}

const applyDefaultOptions = (
  [input, requestInit]: FetchArgs,
  defaultOptions?: ReturnFetchDefaultOptions
): FetchArgs => {
  const headers = new Headers(defaultOptions?.headers)
  new Headers(requestInit?.headers).forEach((value, key) => {
    headers.set(key, value)
  })

  let inputToReturn: FetchArgs[0] = input
  if (defaultOptions?.baseUrl) {
    inputToReturn = new URL(input.toString(), defaultOptions.baseUrl)
  }

  return [
    inputToReturn,
    {
      ...requestInit,
      headers,
    },
  ]
}

const mergeRequestObjectWithRequestInit = async (
  request: Request,
  requestInit?: RequestInit
): Promise<RequestInit> => {
  const mergedRequest = new Request(request, requestInit)
  const body = await new Response(mergedRequest.body).arrayBuffer()

  return {
    method: mergedRequest.method,
    headers: mergedRequest.headers,
    body,
    referrer: mergedRequest.referrer,
    referrerPolicy: mergedRequest.referrerPolicy,
    mode: mergedRequest.mode,
    credentials: mergedRequest.credentials,
    cache: mergedRequest.cache,
    redirect: mergedRequest.redirect,
    integrity: mergedRequest.integrity,
    keepalive: mergedRequest.keepalive,
    signal: mergedRequest.signal,
    window: requestInit?.window,
  }
}

const normalizeArgs = async (
  ...args: Parameters<typeof fetch>
): Promise<FetchArgs> => {
  let input: string | URL
  let requestInit: RequestInit | undefined

  if (args[0] instanceof Request) {
    input = args[0].url
    requestInit = await mergeRequestObjectWithRequestInit(args[0], args[1])
  } else {
    input = args[0]
    requestInit = args[1]
  }

  return [input, requestInit]
}

const customFetch =
  (defaultOptions?: ReturnFetchDefaultOptions) =>
  async (...args: Parameters<typeof fetch>): Promise<any> => {
    // try catch로 감싸서 에러 처리
    // but error boundary를 사용하기 위해 미적용
    const defaultOptionAppliedArgs = applyDefaultOptions(
      await normalizeArgs(...args),
      defaultOptions
    )

    const fetchProvided = defaultOptions?.fetch || fetch
    let requestInterceptorAppliedArgs: FetchArgs

    if (defaultOptions?.interceptors?.request) {
      requestInterceptorAppliedArgs = await defaultOptions.interceptors.request(
        defaultOptionAppliedArgs,
        fetchProvided
      )
    } else {
      requestInterceptorAppliedArgs = defaultOptionAppliedArgs
    }

    const response = await fetchProvided(...requestInterceptorAppliedArgs)

    if (!response.ok) {
      const error = await response.json()
      const { message } = error
      throw new Error(`${message}`)
    }

    if (defaultOptions?.interceptors?.response) {
      const interceptedResponse = await defaultOptions.interceptors.response(
        response,
        requestInterceptorAppliedArgs,
        fetchProvided
      )
      const contentType = interceptedResponse.headers.get("content-type")
      if (contentType && contentType.indexOf("application/json") !== -1) {
        return await response.json()
      } else {
        const text = await response.text()
        return text
      }
    }

    return await response.json()
  }

export default customFetch
