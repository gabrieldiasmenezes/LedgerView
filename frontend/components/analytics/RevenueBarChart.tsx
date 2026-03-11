"use client"

import {BarChart,Bar,XAxis,YAxis,CartesianGrid,Cell,} from "recharts"
import {ChartContainer,ChartTooltip,ChartTooltipContent,} from "@/components/ui/chart"

const COLORS = ["#10B981", "#0EA5E9", "#F59E0B", "#8B5CF6", "#EF4444"]

const chartConfig = {
  receita: {
    label: "Receita",
    color: "#10B981",
  },
}

interface RevenueBarChartProps {
  data: RevenueByRegion[]
}

export function RevenueBarChart({ data }: RevenueBarChartProps) {
  return (
    <div className="animate-fade-in-up rounded-xl border border-border bg-card p-5" style={{ animationDelay: "600ms", animationFillMode: "backwards" }}>
      <h3 className="mb-1 text-base font-semibold text-foreground">
        Revenue Distribution by Region
      </h3>
      <p className="mb-4 text-sm text-muted-foreground">
        Breakdown of revenue across regions
      </p>
      <ChartContainer config={chartConfig} className="h-[280px] w-full">
        <BarChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis
            dataKey="region"
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
            tickFormatter={(value) =>
              `${(value / 1000).toFixed(0)}K`
            }
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value) => (
                  <span className="font-mono text-foreground">
                    R$ {Number(value).toLocaleString("pt-BR")}
                  </span>
                )}
              />
            }
          />
          <Bar dataKey="revenue" radius={[6, 6, 0, 0]} name="revenue">
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  )
}
