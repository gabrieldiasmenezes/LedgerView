import { DollarSign, TrendingUp, Activity } from "lucide-react"

export default function Navbar() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-sidebar/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 md:px-6">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary">
            <DollarSign className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-foreground">
              LedgerView
            </span>
            <span className="hidden text-xs text-muted-foreground sm:block">
              Financial Analytics Dashboard
            </span>
          </div>
        </div>

        {/* Center - Status Indicators */}
        <div className="hidden items-center gap-6 md:flex">
          
          <div className="flex items-center gap-2">
            <div className="flex h-2 w-2 items-center justify-center">
              <span className="absolute h-2 w-2 animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative h-2 w-2 rounded-full bg-primary" />
            </div>
            <span className="text-sm text-muted-foreground">
              System Status: Online
            </span>
          </div>

          <div className="h-4 w-px bg-border" />

          <div className="flex items-center gap-2 text-muted-foreground">
            <Activity className="h-4 w-4 text-primary" />
            <span className="text-sm">
              Data Pipeline Active
            </span>
          </div>

          <div className="h-4 w-px bg-border" />

          <div className="flex items-center gap-2 text-muted-foreground">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-sm">
              Reporting Period: 2025
            </span>
          </div>

        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <div className="hidden flex-col items-end lg:flex">
            <span className="text-sm font-medium text-foreground">
              Tech Solutions Ltd.
            </span>
            <span className="text-xs capitalize text-muted-foreground">
              {currentDate}
            </span>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-card text-sm font-semibold text-primary">
            TS
          </div>
        </div>

      </div>
    </header>
  )
}