import { TrendingUp, TrendingDown, Minus} from "lucide-react"


export const TrendIcon = ({ trend }: { trend: number }) => {
  if (trend > 0) return <TrendingUp className="h-4 w-4 text-primary" />
  if (trend < 0) return <TrendingDown className="h-4 w-4 text-destructive" />
  return <Minus className="h-4 w-4 text-muted-foreground" />
}

export const getMarginColor = (margin: number) => {
  if (margin >= 50) return "text-primary"
  if (margin >= 40) return "text-secondary"
  return "text-warning"
}