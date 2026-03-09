"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"
import useCountUp from "@/hooks/useCountUp"
import formatNumber from "@/utils/formatNuber"


interface MetricCardProps {
  data: MetricCardData
  index: number
}

export default function MetricCard({ data, index }: MetricCardProps) {
  const animatedValue = useCountUp(data.value!, 1500 + index * 200, data.decimals)
  const isZero = data.trend === 0
  const isPositive = data.trend! >= 0


  return (
    <div
      className="animate-fade-in-up rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: "backwards" }}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{data.label}</p>
        { !isZero &&(
            <div
            className={cn(
                "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                isPositive
                ? "bg-primary/10 text-primary"
                : "bg-destructive/10 text-destructive"
            )}
            >
                {isPositive ? (
                    <TrendingUp className="h-3 w-3" />
                ) : (
                    <TrendingDown className="h-3 w-3" />
                )}
                <span>
                    {isPositive ? "+" : ""}
                    {data.trend}%
                </span>
            </div>
            )
        }
      </div>
      <div className="mt-3">
        <p className="text-2xl font-bold tracking-tight text-foreground">
          {data.prefix}
          {data.decimals && data.decimals > 0
            ? animatedValue.toFixed(data.decimals)
            : formatNumber(animatedValue)}
          {data.suffix}
        </p>
      </div>
    </div>
  )
}
