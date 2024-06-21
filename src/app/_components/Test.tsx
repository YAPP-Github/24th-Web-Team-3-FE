"use client"

import { useSuspenseQuery } from "@tanstack/react-query"

import { getJsonplaceholder } from "../api"

const Test = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["test", "asd"],
    queryFn: () => getJsonplaceholder("1"),
  })

  return <div>get list....{data?.title}</div>
}

export default Test
