import { formatCurrency } from "./formatData"

export const formatValue = (value: number, categoria: string) => {
  if (categoria === "Receita Anual") {
    return formatCurrency(value)
  }
}

export const getProgressColor = (percentual: number) => {
  if (percentual >= 95) return "bg-primary"
  if (percentual >= 80) return "bg-warning"
  return "bg-destructive"
}

export const getProgressTextColor = (percentual: number) => {
  if (percentual >= 95) return "text-primary"
  if (percentual >= 80) return "text-warning"
  return "text-destructive"
}

