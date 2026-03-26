import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import EmptyDataState from "../common/EmptyDataState";

const CustomBarTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-[#102216]/95 backdrop-blur-sm border border-[#cfe7d7]/30 p-3 rounded-xl shadow-2xl min-w-[160px]">
        <div className="mb-2 pb-2 border-b border-white/10">
          <p className="text-white font-bold text-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-primary">
              category
            </span>
            {label}
          </p>
        </div>
        <div className="flex justify-between items-center gap-4">
          <span className="text-[#708090] text-xs font-medium uppercase tracking-wider">
            Total Cost
          </span>
          <span className="text-[#13ec5b] font-black text-base">
            ฿{data.value.toLocaleString()}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

const IngredientBarChart = ({ data }) => {
  const hasData = data && data.length > 0;
  return (
    <div className="bg-white dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-neutral-border dark:border-border-dark">
      <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-neutral-text-main dark:text-white">
        <span className="material-symbols-outlined text-primary">
          show_chart
        </span>
        Ingredients Cost by Category
      </h3>
      {/* <div className="h-[250px] w-full"> */}
      <div className="flex-1 w-full flex items-center justify-center">
        {!hasData ? (
          <EmptyDataState 
            title="No Ingredients Found" 
            message="Add ingredients to see your cost distribution by category."
          />
        ) : (
            <div className="h-[320px] lg:h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{ top: 20, right: 10, left: 0, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#cfe7d7"
                    opacity={0.2}
                  />
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `฿${value}`}
                  />
                  <Tooltip
                    content={<CustomBarTooltip />}
                    cursor={{ fill: "rgba(19, 236, 91, 0.1)" }}
                  />
                  <Bar
                    dataKey="cost"
                    name="Total Cost"
                    fill="#13ec5b"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
        )}
        </div>
    </div>
  );
};

export default IngredientBarChart;
