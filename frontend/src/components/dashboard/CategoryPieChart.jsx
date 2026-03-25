import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Label,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { COLORS } from "../data/dashboardMockData";
import EmptyDataState from "../common/EmptyDataState";

// --- ย้าย Custom Tooltip มาไว้ข้างในไฟล์เดียวกันเลย ---
const CustomPieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-[#102216]/95 backdrop-blur-sm border border-[#cfe7d7]/30 p-3 rounded-xl shadow-2xl min-w-[160px]">
        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
          <span
            className="w-3 h-3 rounded-full shadow-sm"
            style={{ backgroundColor: data.payload.fill }}
          ></span>
          <p className="text-white font-bold text-sm">{data.name}</p>
        </div>
        <div className="flex justify-between items-center gap-4">
          <span className="text-[#708090] text-xs font-medium uppercase tracking-wider">
            Total
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

const CategoryPieChart = ({ data }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const hasData = data && data.length > 0;
  const totalSpend = data
    .reduce((sum, item) => sum + item.value, 0)
    .toLocaleString();

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-neutral-border dark:border-gray-800">
      <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-neutral-text-main dark:text-white">
        <span className="material-symbols-outlined text-primary">
          pie_chart
        </span>
        Recipes Cost by Category
      </h3>

      <div className="flex-1 w-full flex items-center justify-center">
        {!hasData ? (
          <EmptyDataState 
            title="No Recipes Found" 
            message="Add recipes to see your cost distribution by category."
          />
        ) : (
            <div className="w-full h-[320px] lg:h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.map((item, index) => ({
                      ...item,
                      fill: COLORS[item.name],
                      // fill: COLORS[index % COLORS.length],
                    }))}
                    cx={isMobile ? "50%" : "35%"}
                    cy={isMobile ? "45%" : "50%"}
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    <Label
                      content={() => (
                        <text
                          x={isMobile ? "30%" : "30%"}
                          y={isMobile ? "30%" : "45%"}
                          textAnchor="middle"
                          dominantBaseline="central"
                        >
                          <tspan
                            x={isMobile ? "50%" : "22.5%"}
                            dy="-0.5em"
                            fontSize="11"
                            fill="#708090"
                            fontWeight="600"
                            className="tracking-widest uppercase"
                          >
                            Total Cost
                          </tspan>
                          <tspan
                            x={isMobile ? "50%" : "22.5%"}
                            dy="1.5em"
                            fontSize="22"
                            fill="#13ec5b"
                            fontWeight="900"
                          >
                            ฿{totalSpend}
                          </tspan>
                        </text>
                      )}
                    />
                  </Pie>
                  <Tooltip
                    content={<CustomPieTooltip />}
                    cursor={{ fill: "transparent" }}
                  />
                  <Legend
                    layout={isMobile ? "horizontal" : "vertical"}
                    verticalAlign={isMobile ? "bottom" : "middle"}
                    align={isMobile ? "center" : "right"}
                    iconType="circle"
                    wrapperStyle={
                      isMobile ? { paddingTop: "20px" } : { paddingRight: "20px" }
                    }
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
        )}
        </div>
    </div>
  );
};

export default CategoryPieChart;
