"use client"

import {LineChart,Line,XAxis,YAxis,CartesianGrid,} from "recharts"
import {ChartContainer,ChartTooltip,ChartTooltipContent,} from "@/components/ui/chart"

const EMERALD = "#10B981"

const chartConfig = {
  lucro: {
    label: "Monthly Profit",
    color: EMERALD,
  },
}

interface ProfitLineChartProps {
  data: MonthlyEvolutionData[]
}

export default function ProfitLineChart({ data }: ProfitLineChartProps) {
  return (
    <div className="animate-fade-in-up rounded-xl border border-border bg-card p-5" style={{ animationDelay: "500ms", animationFillMode: "backwards" }}>
      <h3 className="mb-1 text-base font-semibold text-foreground">
        Monthly Profit
      </h3>
      <p className="mb-4 text-sm text-muted-foreground">
        Profit trend throughout the year
      </p>
      <ChartContainer config={chartConfig} className="h-[280px] w-full">
        <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="lucroGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={EMERALD} stopOpacity={0.3} />
              <stop offset="100%" stopColor={EMERALD} stopOpacity={0} />
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
          <Line
            type="monotone"
            dataKey="profit"
            stroke={EMERALD}
            strokeWidth={2.5}
            dot={{ fill: EMERALD, strokeWidth: 0, r: 3 }}
            activeDot={{ r: 6, fill: EMERALD, stroke: "#0F172A", strokeWidth: 2 }}
            name="profit"
          />
        </LineChart>
      </ChartContainer>
    </div>
  )
}
