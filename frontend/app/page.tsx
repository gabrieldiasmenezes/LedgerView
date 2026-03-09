"use client"
import ProfitLineChart  from "@/components/analytics/ProfitLineChart";
import { RevenueBarChart } from "@/components/analytics/RevenueBarChart";
import FilterBar from "@/components/FilterBar";
import MetricCard  from "@/components/MetricCard";
import NavBar from "@/components/NavBar";
import { useFetchWithFilters } from "@/hooks/useFetchWithFilters";
import useFormatMonthlyEvolution from "@/services/analytics/monthlyEvolution";
import  useFilters  from "@/services/filters";
import useMetricsFormatted from "@/services/metrics";
import {useState } from "react";



export default function Home() {
  const [loading,setLoading]=useState<boolean>(true)
  const filters=useFilters({setLoading})

  const [selectedYear,setSelectedYear]=useState<number | undefined>(2025)
  const [selectedRegion,setSelectedRegion]=useState<string | undefined>()
  const params:DashboardParams={
    year:selectedYear,
    region:selectedRegion,
    setLoading
  }

  const metrics=useMetricsFormatted(params)
  const monthlyEvolution=useFormatMonthlyEvolution(params)
  const revenueByRegion=useFetchWithFilters<RevenueByRegion[]>("revenue_by_region",params)
  console.log(revenueByRegion)

  if (loading || !filters) {
    return <div>Loading filters...Filters</div>;
  }


  return (
    <div className="min-h-screen bg-background">
      <NavBar/>

      <main className="mx-auto max-w-[1600px] p-4 md:p-6 lg:p-8">
        <div className="mb-6">
          <FilterBar
              selectedYear={selectedYear!}
              selectedRegion={selectedRegion!}
              onYearChange={setSelectedYear}
              onRegionChange={setSelectedRegion}
              years={filters?.year!}
              regions={filters?.region!}
          />
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {metrics.map((metric, index) => (
            <MetricCard key={metric.label} data={metric} index={index} />
          ))}
        </div>

        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ProfitLineChart data={monthlyEvolution} />

          <RevenueBarChart data={revenueByRegion ?? []}/>
        </div>



      </main>

    </div>
  );
}
