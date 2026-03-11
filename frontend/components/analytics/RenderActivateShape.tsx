import { Sector } from "recharts"


export default function RenderActiveShape(props: any) {
  const {
    cx,cy,
    innerRadius,outerRadius,
    startAngle,endAngle,
    fill,payload,
    value,} = props

  return (
    <g>
      <text x={cx} y={cy - 8} textAnchor="middle" fill="#E2E8F0" fontSize={14} fontWeight={600}>
        {payload.business_unit}
      </text>
      <text x={cx} y={cy + 14} textAnchor="middle" fill="#94A3B8" fontSize={12}>
        {value}%
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius - 4}
        outerRadius={innerRadius - 2}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  )
}