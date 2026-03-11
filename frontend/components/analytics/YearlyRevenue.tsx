"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/utils/formatData"
import {Bar,BarChart,CartesianGrid,XAxis,YAxis,Tooltip,ResponsiveContainer,Legend,Cell,} from "recharts"


interface YearlyRevenueProps {
  data: YearlyRevenueData[],
  year:number
}

const COLORS = {
  revenue_current: "#10B981",
  revenue_previous: "#475569",
}



export function YearlyRevenue({ data,year }: YearlyRevenueProps) {
    const current=`${year}`
    const previous=`${year-1}`

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-foreground">
              Year-over-Year Revenue Comparison
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {current}-{previous}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis
                dataKey="month"
                stroke="#94A3B8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#94A3B8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => formatCurrency(value)}
                width={70}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1E293B",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  color: "#E2E8F0",
                }}
                formatter={(value,name) => [
                  formatCurrency(value as number),
                  name === "revenue_current" ? current : previous,
                ]}
                labelStyle={{ color: "#94A3B8" }}
              />
              <Legend
                wrapperStyle={{ paddingTop: "20px" }}
                formatter={(value) => (value === "revenue_current" ? "2025" : "2024")}
              />
              <Bar dataKey="revenue_previous" fill={COLORS.revenue_previous} radius={[4, 4, 0, 0]} barSize={20} />
              <Bar dataKey="revenue_current" fill={COLORS.revenue_current} radius={[4, 4, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
