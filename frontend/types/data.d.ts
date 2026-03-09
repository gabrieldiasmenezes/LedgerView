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
