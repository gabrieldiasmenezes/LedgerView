"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatValue, getProgressColor, getProgressTextColor } from "@/utils/formatGoals"
import { Target } from "lucide-react"

interface GoalsProps {
  data: Goals[]
}

export function Goals({ data }: GoalsProps) {
  const overallProgress = data.reduce((acc, item) => acc + item.progress, 0) / data.length

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-foreground">
              Goals Progress
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Annual Goals Tracking
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-card px-3 py-1.5 border border-border">
            <Target className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              {overallProgress.toFixed(1)}% Overall
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {data.map((goal) => (
            <div key={goal.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  {goal.name}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {formatValue(goal.current, goal.name)} / {formatValue(goal.target, goal.name)}
                  </span>
                  <span className={`text-sm font-semibold ${getProgressTextColor(goal.progress)}`}>
                    {goal.progress.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="relative h-3 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className={`absolute left-0 top-0 h-full rounded-full transition-all duration-500 ${getProgressColor(goal.progress)}`}
                  style={{ width: `${Math.min(goal.progress, 100)}%` }}
                />
                {/* Marcador de meta */}
                <div
                  className="absolute top-0 h-full w-0.5 bg-foreground/50"
                  style={{ left: "100%" }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
