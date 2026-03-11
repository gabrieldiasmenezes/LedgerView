"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/utils/formatData"
import { getMarginColor, TrendIcon } from "@/utils/formatTable"
import { ArrowUpDown } from "lucide-react"
import { useState } from "react"

interface ProductPerformanceTableProps {
  data: ProductPerformance[]
}


export function ProductPerformanceTable({ data }: ProductPerformanceTableProps) {

    const [sortKey, setSortKey] = useState<SortKey>("cost")
    const [sortOrder, setSortOrder] = useState<SortOrder>("desc")

    const handleSort = (key: SortKey) => {
    if (sortKey === key) {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
        setSortKey(key)
        setSortOrder("desc")
    }
    }

    const sortedData = [...data].sort((a, b) => {

    const aValue = a[sortKey]
    const bValue = b[sortKey]

    if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    }

    return sortOrder === "asc"
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number)
    })

const SortableHeader = ({label,sortKeyName,align = "left",}: {label: string,sortKeyName: SortKey,align?: "left" | "right"}) => (
  <button
    onClick={() => handleSort(sortKeyName)}
    className={`flex w-full items-center gap-1 hover:text-foreground transition-colors ${
      align === "right" ? "justify-end" : "justify-start"
    }`}
  >
    {label}
    <ArrowUpDown className="h-3 w-3" />
  </button>
)

  return (
    <Card className="border-border bg-card">

      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-foreground">
          Product Performance
        </CardTitle>

        <CardDescription className="text-muted-foreground">
          Revenue, margin and sales volume by product
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">

        <div className="space-y-1">

        {/* HEADER */}
        <div className="grid grid-cols-[3fr_1fr_1fr_1fr_80px] items-center border-b border-border pb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">

            <SortableHeader
                label="Product"
                sortKeyName="product"
                align="left"
            />

            <SortableHeader
                label="Revenue"
                sortKeyName="cost"
                align="right"
            />

            <SortableHeader
                label="Margin"
                sortKeyName="margin"
                align="right"
            />

            <SortableHeader
                label="Units Sold"
                sortKeyName="units"
                align="right"
            />

            <div className="text-center">
                Trend
            </div>

        </div>


        {/* ROWS */}
        {sortedData.map((item, index) => (

            <div
            key={`${item.product}-${index}`}
            className={`grid grid-cols-[3fr_1fr_1fr_1fr_80px] items-center py-3 border-b border-border/50 hover:bg-muted/30 ${
                index % 2 === 0 ? "" : "bg-muted/10"
            }`}
            >

            <div className="font-medium text-foreground">
                {item.product}
            </div>

            <div className="text-right font-medium text-foreground tabular-nums">
                {formatCurrency(item.cost)}
            </div>

            <div className={`text-right font-semibold tabular-nums ${getMarginColor(item.margin)}`}>
                {item.margin.toFixed(1)}%
            </div>

            <div className="text-right text-muted-foreground tabular-nums">
                {item.units}
            </div>

            <div className="flex justify-center">
                <TrendIcon trend={item.trend} />
            </div>

            </div>

        ))}

        </div>

        </div>
      </CardContent>

    </Card>
  )
}