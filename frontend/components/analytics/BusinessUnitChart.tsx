"use client"

import { PieChart, Pie, Cell} from "recharts"
import { useState } from "react"
import {ChartContainer} from "@/components/ui/chart"
import renderActiveShape from "./RenderActivateShape"

const COLORS = ["#10B981", "#0EA5E9", "#F59E0B", "#8B5CF6", "#94A3B8"]

const chartConfig = {
  participacao: {
    label: "Participacao",
    color: "#10B981",
  },
}

interface BusinessUnitChartProps {
  data: BusinessUnit[]
}

export function BusinessUnitChart({ data }: BusinessUnitChartProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="animate-fade-in-up rounded-xl border border-border bg-card p-5" style={{ animationDelay: "700ms", animationFillMode: "backwards" }}>
      <h3 className="mb-1 text-base font-semibold text-foreground">
        Business Unit Distribution
      </h3>
      <p className="mb-4 text-sm text-muted-foreground">
        Revenue Share by Segment
      </p>
      <ChartContainer config={chartConfig} className="mx-auto h-[280px] w-full">
        <PieChart>
          <Pie
            {...({
                activeIndex: activeIndex,
                activeShape: renderActiveShape,
            } as any)}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={90}
            outerRadius={130}
            dataKey="share"
            nameKey="business_unit"
            onMouseEnter={(_, index) => setActiveIndex(index)}
            strokeWidth={2}
            stroke="#0F172A"
          >
            {data?.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
      {/* Legend */}
      <div className="mt-3 flex flex-wrap justify-center gap-4">
        {data?.map((item, index) => (
          <div key={item.business_unit} className="flex items-center gap-2">
            <div
              className="h-2.5 w-2.5 rounded-sm"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-xs text-muted-foreground">{item.business_unit}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
