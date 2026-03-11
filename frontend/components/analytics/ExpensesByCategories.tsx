"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { formatCurrency } from "@/utils/formatData"

interface ExpenseChartProps {
  data: ExpenseCategory[]
}

const COLORS = ["#EF4444", "#F59E0B", "#0EA5E9", "#8B5CF6", "#10B981", "#64748B"]

export function ExpenseChart({ data = [] }: ExpenseChartProps) {

  const totalCost = data.reduce((acc, item) => acc + item.cost, 0)

  const chartData = data.map(item => ({
    ...item,
    percent: totalCost ? (item.cost / totalCost) * 100 : 0
  }))

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-foreground">
              Expenses by Category
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Operational Cost Distribution
            </CardDescription>
          </div>

          <div className="rounded-lg bg-destructive/10 px-3 py-1.5">
            <span className="text-sm font-medium text-destructive">
              {formatCurrency(totalCost)} Total
            </span>
          </div>

        </div>
      </CardHeader>

      <CardContent>
        <div className="h-[250px] w-full">

          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            >

              <XAxis
                type="number"
                stroke="#94A3B8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => formatCurrency(value)}
              />

              <YAxis
                dataKey="cost_category"
                type="category"
                stroke="#94A3B8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                width={90}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#1E293B",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  color: "#E2E8F0",
                }}
                formatter={(value, _, props) => [
                  `${formatCurrency(value as number)} (${props.payload.percent.toFixed(1)}%)`,
                  "Expense",
                ]}
                labelStyle={{ color: "#94A3B8" }}
              />

              <Bar dataKey="cost" radius={[0, 4, 4, 0]} barSize={24}>
                {chartData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>

            </BarChart>
          </ResponsiveContainer>

        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-3">
          {chartData.map((item, index) => (
            <div key={item.cost_category} className="flex items-center gap-2">

              <div
                className="h-3 w-3 rounded-sm"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />

              <span className="text-xs text-muted-foreground">
                {item.cost_category} ({item.percent.toFixed(1)}%)
              </span>

            </div>
          ))}
        </div>

      </CardContent>
    </Card>
  )
}