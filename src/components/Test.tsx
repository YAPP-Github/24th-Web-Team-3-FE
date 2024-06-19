"use client"

import { useSuspenseQuery } from "@tanstack/react-query"

const fetching = async () => {
  await new Promise((resolve) => setTimeout(resolve, 700))

  let res
  try {
    res = await fetch("https://jsonplaceholder.typicode.com/todo/1")
  } catch (error) {
    throw error
  }

  const data = await res.json()
  if (res.ok) return data
  throw new Error(data)
}

const Test = () => {
  // useSuspenseQuery는 useQuery와 비슷하지만, Suspense를 사용하여 데이터를 가져옵니다.
  // 즉 useSuspenseQuery를 이용하여 데이터 패칭 시, 로딩 중일 경우 loading.tsx에 정의된 로딩 컴포넌트를 보여줍니다.
  const { data } = useSuspenseQuery({
    queryKey: ["test", "s"],
    queryFn: () => fetching(),
  })

  return <div>get list....{data?.title}</div>
}

export default Test
