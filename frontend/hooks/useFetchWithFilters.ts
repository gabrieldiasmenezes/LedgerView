import { buildQueryParams } from "@/lib/fetcher"
import { useEffect, useState } from "react"

export function useFetchWithFilters<T>(
  endpoint: string,
  { year, region, setLoading }: DashboardParams
) {
  const [data, setData] = useState<T | null>(null)
  const filters={
    year:year,
    region:region
  }
  useEffect(() => {
    async function loadData() {
      const response=await buildQueryParams({filters,endpoint})

      setData(response)
      setLoading(false)
    }

    loadData()
  }, [year, region])

  return data
}