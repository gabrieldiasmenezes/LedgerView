import { useFetchWithFilters } from "@/hooks/useFetchWithFilters";

export default function useMetricsFormatted({year,region,setLoading}:DashboardParams) {
  const metrics = useFetchWithFilters<Metrics>("metrics",{year,region,setLoading})

  const metricCards: MetricCardData[] = [
    {
      label: "Total Revenue",
      value: metrics?.revenue?.value,
      prefix: "R$ ",
      decimals: 0,
      trend: metrics?.revenue?.growth,
    },
    {
      label: "Net Profit",
      value: metrics?.profit?.value,
      prefix: "R$ ",
      decimals: 0,
      trend: metrics?.profit?.growth,
    },
    {
      label: "Profit Margin",
      value: metrics?.margin?.value,
      suffix: "%",
      decimals: 1,
      trend: metrics?.margin?.growth,
    },
    {
      label: "Average Ticket",
      value: metrics?.average_ticket?.value,
      prefix: "R$ ",
      decimals: 0,
      trend: metrics?.average_ticket?.growth,
    },
    {
      label: "Monthly Growth",
      value: metrics?.monthly_growth?.value,
      suffix: "%",
      decimals: 1,
      trend: metrics?.monthly_growth?.growth,
    },
  ]

  return metricCards
}