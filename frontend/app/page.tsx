"use client"
import { BusinessUnitChart } from "@/components/analytics/BusinessUnitChart";
import { CashFlow } from "@/components/analytics/CashFlow";
import { ExpenseChart } from "@/components/analytics/ExpensesByCategories";
import ProfitLineChart  from "@/components/analytics/ProfitLineChart";
import { RevenueBarChart } from "@/components/analytics/RevenueBarChart";
import { RevenueVsCost } from "@/components/analytics/RevenueVsCost";
import { TopClientsChart } from "@/components/analytics/TopClientsCharts";
import { YearlyRevenue } from "@/components/analytics/YearlyRevenue";
import FilterBar from "@/components/FilterBar";
import { Goals } from "@/components/Goals";
import MetricCard  from "@/components/MetricCard";
import NavBar from "@/components/NavBar";
import { ProductPerformanceTable } from "@/components/ProductPerformance";
import useMonthlyData from "@/hooks/formatMonthData";
import { useFetchWithFilters } from "@/hooks/useFetchWithFilters";
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
  //Metrics
  const metrics=useMetricsFormatted(params)

  //Data Charts
  const monthlyEvolution=useMonthlyData<MonthlyEvolution>({endpoint:"monthly_evolution",...params})
  const revenueByRegion=useFetchWithFilters<RevenueByRegion[]>("revenue_by_region",params)
  const businessUnit=useFetchWithFilters<BusinessUnit[]>("business_unit",params)
  const topClients=useFetchWithFilters<TopClients[]>("top_clients",params)
  const revenueVsCost=useMonthlyData<RevenueVsCost>({endpoint:"revenue_vs_cost",...params})
  const yearlyRevenue=useMonthlyData<YearlyRevenue>({endpoint:"yearly_revenue",...params})
  const cashFlow=useMonthlyData<CashFlow>({endpoint:"cash_flow",...params})
  const expenseByCategories=useFetchWithFilters<ExpenseCategory[]>("expenses_by_category",params)

  //Goals
  const goals=useFetchWithFilters<Goals[]>("goals",params)
  
  //Product Performance
  const productPerformance=useFetchWithFilters<ProductPerformance[]>("product_performance",params)
  console.log(productPerformance)

  if (loading || !filters) {
    return <div>Loading filters...Filters</div>;
  }


  return (
    <div className="min-h-screen bg-background">
      <NavBar/>

      <main className="mx-auto max-w-[1600px] p-4 md:p-6 lg:p-8">

        {/* Filters */}
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

        {/* Metrics */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {metrics.map((metric, index) => (
            <MetricCard key={metric.label} data={metric} index={index} />
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ProfitLineChart data={monthlyEvolution} />

          <RevenueBarChart data={revenueByRegion ?? []}/>
        </div>

        {/* Charts Row 2 */}
        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <BusinessUnitChart data={businessUnit ?? []}/>
          <TopClientsChart data={topClients ??[]} />
        </div>

        {/* Charts Row 3*/}
        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <RevenueVsCost data={revenueVsCost}/>
          <YearlyRevenue data={yearlyRevenue} year={selectedYear!}/>
        </div>

        {/* Charts Row 4 */}
        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Goals data={goals ?? []}/>
          <CashFlow data={cashFlow}/>
        </div>

        {/* Charts Row 5 */}
        <div className="mb-6">
          <ExpenseChart data={expenseByCategories ?? []}/>
        </div>

        {/* Tabela de Performance */}
        <div>
          <ProductPerformanceTable data={productPerformance ?? []} />
        </div>



      </main>

    </div>
  );
}
