import { useFetchWithFilters } from "@/hooks/useFetchWithFilters"

const months = [
  "Jan","Fev","Mar","Abr","Mai","Jun",
  "Jul","Ago","Set","Out","Nov","Dez"
]

type useMonthlyDataProps= DashboardParams &{
    endpoint:string
}
export default function useMonthlyData
<T extends {month:number}>
({year,region,setLoading,endpoint}: useMonthlyDataProps)
: (T & { month: string })[] {

  const yearlyRevenue = useFetchWithFilters<T[]>(
    endpoint,
    { year, region, setLoading }
  )

  if (!yearlyRevenue) return []

  return yearlyRevenue.map(item => ({
    ...item,
    month: months[item.month - 1],
  }))
}