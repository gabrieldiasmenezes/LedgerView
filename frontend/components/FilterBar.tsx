"use client"

import { Calendar, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

interface FilterBarProps{
  selectedYear:number | null;
  selectedRegion:string | null;
  onYearChange:(year:number) => void;
  onRegionChange: (region:string)=>void;
  years:number[];
  regions:string[];
}

export default function FilterBar({
  selectedYear,selectedRegion,
  onYearChange,onRegionChange,
  years,regions
}:FilterBarProps){
    return (
      <div className="flex flex-wrap items-center gap-3">
        {/* Period filter */}
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <div className="flex rounded-lg border border-border bg-card">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => onYearChange(year)}
                className={cn(
                  "px-3 py-1.5 text-sm font-medium transition-all duration-200",
                  "first:rounded-l-lg last:rounded-r-lg",
                  selectedYear === year
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* Region filter */}
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <select
            value={selectedRegion!}
            onChange={(e) => onRegionChange(e.target.value)}
            className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground transition-all duration-200 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {regions.map((region) => (
              <option key={region} value={region} className="bg-card text-foreground">
                {region}
              </option>
            ))}
          </select>
        </div>
      </div>
    )
}

