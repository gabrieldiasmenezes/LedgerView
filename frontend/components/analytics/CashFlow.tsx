"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {Bar,CartesianGrid,XAxis,YAxis,Tooltip,ResponsiveContainer,Legend,Line,ComposedChart,} from "recharts"
import { formatCurrency } from "@/utils/formatData"

interface CashFlowProps {
  data: CashFlowData[]
}

const COLORS = {
  revenues: "#10B981",
  costs: "#EF4444",
  balance: "#0EA5E9",
}



export function CashFlow({ data }: CashFlowProps) {
  const totalRevenues = data.reduce((acc, item) => acc + item.revenue, 0)
  const totalCosts = data.reduce((acc, item) => acc + item.cost, 0)
  const saldoBalance = data.reduce((acc, item) => acc + item.balance, 0)

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-2">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-foreground">
              Cash Flow
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Monthly Inflows, Outflows and Net Balance
            </CardDescription>
          </div>
          <div className="flex gap-3">
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Inflows</p>
              <p className="text-sm font-semibold text-primary">{formatCurrency(totalRevenues)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Outflows</p>
              <p className="text-sm font-semibold text-destructive">{formatCurrency(totalCosts)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Net Balance</p>
              <p className="text-sm font-semibold text-secondary">{formatCurrency(saldoBalance)}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
                formatter={(value, name) => [
                  formatCurrency(value as number),
                  name === "revenue" ? "Revenue" : name === "cost" ? "Cost" : "Balance",
                ]}
                labelStyle={{ color: "#94A3B8" }}
              />
              <Legend
                wrapperStyle={{ paddingTop: "20px" }}
                formatter={(value) =>
                  value === "revenue" ? "Revenue" : value === "cost" ? "Cost" : "Balance"
                }
              />
              <Bar dataKey="revenue" fill={COLORS.revenues} radius={[4, 4, 0, 0]} barSize={16} />
              <Bar dataKey="cost" fill={COLORS.costs} radius={[4, 4, 0, 0]} barSize={16} />
              <Line
                type="monotone"
                dataKey="balance"
                stroke={COLORS.balance}
                strokeWidth={3}
                dot={{ fill: COLORS.balance, strokeWidth: 2, r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
