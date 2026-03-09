import { useFetchWithFilters } from "@/hooks/useFetchWithFilters";

export default function FormatMonthlyEvolution({year,region,setLoading,}: DashboardParams): MonthlyEvolutionData[] {

  const months = [
    "Jan","Fev","Mar","Abr","Mai","Jun",
    "Jul","Ago","Set","Out","Nov","Dez"
  ]

  const monthlyEvolution = useFetchWithFilters<MonthlyEvolution[]>(
    "monthly_evolution",
    { year, region, setLoading }
  )

  if (!monthlyEvolution) return []

  return monthlyEvolution.map(item => ({
    month: months[item.month - 1],
    profit: item.profit
  }))
}