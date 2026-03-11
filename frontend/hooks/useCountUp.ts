"use client"
import { useEffect, useState, useRef } from "react"

export default function useCountUp(
  end: number,
  duration: number = 1500,
  decimals: number = 0
) {
  const [count, setCount] = useState(0)
  const countRef = useRef(0)
  const startTimeRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    countRef.current = 0
    startTimeRef.current = null
    setCount(0)

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp
      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1)

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = eased * end

      countRef.current = current
      setCount(current)

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [end, duration])

  return decimals > 0 ? Number(count.toFixed(decimals)) : Math.round(count)
}
