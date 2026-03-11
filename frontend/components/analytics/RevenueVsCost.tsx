"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/utils/formatData"
import {Area,AreaChart,CartesianGrid,XAxis,YAxis,Tooltip,ResponsiveContainer,Legend,} from "recharts"

interface RevenueVsCostProps {
  data: RevenueVsCostData[]
}

const COLORS = {
  revenue: "#10B981",
  cost: "#EF4444",
}


export function RevenueVsCost({ data }: RevenueVsCostProps) {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-foreground">
          Revenue vs Costs
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Monthly trend of revenue and operational costs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gradientRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.revenue} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={COLORS.revenue} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradientCost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.cost} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={COLORS.cost} stopOpacity={0} />
                </linearGradient>
              </defs>
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
                  name === "revenue" ? "Revenue" : name === "cost" ? "Cost" : "",
                ]}
                labelStyle={{ color: "#94A3B8" }}
              />
              <Legend
                wrapperStyle={{ paddingTop: "20px" }}
                formatter={(value) =>
                  value === "revenue" ? "Revenue" : value === "cost" ? "Cost" : ""
                }
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke={COLORS.revenue}
                strokeWidth={2}
                fill="url(#gradientRevenue)"
              />
              <Area
                type="monotone"
                dataKey="cost"
                stroke={COLORS.cost}
                strokeWidth={2}
                fill="url(#gradientCost)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
