import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import EmptyDataState from "../common/EmptyDataState";

// Component ย่อย: รูปภาพบนจุดกราฟ
const CustomImageDot = (props) => {
  const { cx, cy, payload } = props;
  if (!cx || !cy) return null;
  return (
    <foreignObject x={cx - 16} y={cy - 16} width={32} height={32}>
      <div
        className="w-8 h-8 rounded-full bg-cover bg-center border-2 border-primary shadow-sm hover:scale-125 transition-transform duration-200 cursor-pointer"
        style={{ backgroundImage: `url(${payload.image})` }}
        title={payload.name}
      />
    </foreignObject>
  );
};

// Component ย่อย: กล่อง Tooltip
const CustomAreaTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#102216]/95 backdrop-blur-sm border border-[#cfe7d7]/30 p-4 rounded-xl shadow-2xl min-w-[180px]">
        <p className="text-white font-black text-base mb-3 border-b border-white/10 pb-2">
          {data.name}
        </p>
        <div className="space-y-1.5">
          <div className="flex justify-between items-center gap-4">
            <span className="text-[#708090] text-xs font-medium uppercase tracking-wider">
              Food Cost
            </span>
            <span className="text-[#708090] font-bold text-sm">
              ฿{data.cost}
            </span>
          </div>
          <div className="flex justify-between items-center gap-4">
            <span className="text-[#13ec5b] text-xs font-medium uppercase tracking-wider">
              Sell Price
            </span>
            <span className="text-[#13ec5b] font-bold text-sm">
              ฿{data.sellingPrice}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center gap-4 mt-3 pt-3 border-t border-white/10">
          <span className="text-white text-xs font-bold uppercase tracking-wider">
            Net Profit
          </span>
          <span className="text-[#13ec5b] font-black text-base">
            ฿{data.profit}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

const RevenueAreaChart = ({ data }) => {
  const hasData = data && data.length > 0;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-neutral-border dark:border-gray-800">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg text-neutral-text-main dark:text-white">
          Food Cost vs. Revenue Analysis
        </h3>
      </div>
      <div className="flex-1 w-full flex items-center justify-center">
        {!hasData ? (
          <EmptyDataState 
            title="No Foods Found" 
            message="Add foods with costing to view the analytics."
          />
        ) : (
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#13ec5b" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#13ec5b" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" tick={false} axisLine={false} />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `฿${value}`}
            />
            <Tooltip
              content={<CustomAreaTooltip />}
              cursor={{
                stroke: "rgba(19, 236, 91, 0.2)",
                strokeWidth: 2,
                strokeDasharray: "4 4",
              }}
            />
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#cfe7d7"
              opacity={0.2}
            />
            <Area
              type="monotone"
              dataKey="sellingPrice"
              name="Selling Price"
              stroke="#13ec5b"
              fillOpacity={1}
              fill="url(#colorProfit)"
              dot={<CustomImageDot />}
              activeDot={false}
            />
            <Area
              type="monotone"
              dataKey="cost"
              name="Food Cost"
              stroke="#708090"
              fillOpacity={1}
              fill="url(#colorCost)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
        )}
        </div>
    </div>
  );
};

export default RevenueAreaChart;
