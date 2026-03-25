import React, { useState, useEffect } from "react";
import api from "../lib/axios"; // ปรับ Path ตามไฟล์ api.js ของคุณ

// Import Dashboard Components ที่เราแยกไว้
import Navbar from "../components/layout/Navbar";
import Header from "../components/layout/Header";
import StatCard from "../components/dashboard/StatCard";
import RevenueAreaChart from "../components/dashboard/RevenueAreaChart";
import CategoryPieChart from "../components/dashboard/CategoryPieChart";
import IngredientBarChart from "../components/dashboard/IngredientBarChart";
import PerformanceTable from "../components/dashboard/PerformanceTable";

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      // 🟢 เรียกผ่าน Axios instance ที่จัดการ Token ให้แล้ว
      const response = await api.get("/dashboard/analytics");
      setData(response.data);
    } catch (error) {
      console.error("Error loading dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    );

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen text-neutral-text-main dark:text-gray-100 flex flex-col font-display">
      <Navbar />
      <main className="flex-1 overflow-x-hidden p-6 md:p-8 max-w-[1600px] mx-auto w-full">
        <Header title="Advanced Analytics" description="System Intelligence & Financial Reports"></Header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Main Charts */}
          <div className="lg:col-span-9 space-y-8">
            <RevenueAreaChart data={data?.revenueData} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <CategoryPieChart data={data?.categoryData} />
              <IngredientBarChart data={data?.ingredientCostData} />
            </div>
          </div>

          {/* Side Statistics */}
          <div className="lg:col-span-3 space-y-6">
            <StatCard
              title="Ingredients"
              value={data?.stats.totalIngredients}
              icon="inventory_2"
            />
            <StatCard
              title="Active Recipes"
              value={data?.stats.activeRecipes}
              icon="restaurant_menu"
            />
            <StatCard
              title="Avg. Sell Price"
              value={`฿${data?.stats.avgSellingPrice}`}
              icon="payments"
            />
          </div>
        </div>

        {/* Performance Table */}
        <PerformanceTable data={data?.revenueData} onRefresh={fetchDashboard} />
      </main>
    </div>
  );
};

export default DashboardPage;
