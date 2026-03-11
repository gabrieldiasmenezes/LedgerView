//FILTERS AND PARAMS

interface LoadingProps{
  setLoading:React.Dispatch<React.SetStateAction<boolean>>
}

type Filters = {
  region: string[];
  year: number[];
};

interface FiltersProps{
  year?:number;
  region?:string;
}

type DashboardParams= FiltersProps & LoadingProps

//METRICS

type MetricValue = {
  value: number
  growth: number
}

interface Metrics {
  revenue: MetricValue
  profit: MetricValue
  margin: MetricValue
  average_ticket: MetricValue
  monthly_growth: MetricValue
}


interface MetricCardData {
  label: string
  value?: number
  prefix?: string
  suffix?: string
  decimals?: number
  trend?: number 
}

//MONTHLY EVOLUTION

interface MonthlyEvolution{
  month:number;
  profit:number;
}

interface MonthlyEvolutionData{
  month:string;
  profit:number;
}

//REVENUE BY REGION
interface RevenueByRegion{
  region:string,
  revenue:number
}


//BUSINESS UNIT
interface BusinessUnit{
  business_unit:string
  share:number
}

//TOP 5 CLIENTS
interface TopClients {
  client: string
  revenue: number
}

//REVENUE VS COST
interface RevenueVsCost{
  month:number,
  revenue:number,
  cost:number,
}
interface RevenueVsCostData{
  month:string,
  revenue:number,
  cost:number,
}

//YEARLY REVENUE
interface YearlyRevenue{
  month:number,
  revenue_current:number,
  revenue_previous:number
}

interface YearlyRevenueData{
  month:string,
  revenue_current:number,
  revenue_previous:number
}

//CASH FLOW
interface CashFlow{
  month:number,
  revenue:number,
  cost:number,
  balance:number
}
interface CashFlowData{
  month:string,
  revenue:number,
  cost:number,
  balance:number
}


// EXPENSES BY CATEGORY
interface ExpenseCategory{
  cost_category:string,
  cost:number
}

//GOALS
interface Goals{
  name:string,
  current:number,
  target:number,
  progress:number
}


// TABLE OF PERFORMANCE
interface ProductPerformance{
  product:string,
  cost:number,
  units:number,
  margin:number,
  trend:number
}

type SortKey = "product" | "cost" | "margin" | "units"
type SortOrder = "asc" | "desc"



