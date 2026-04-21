import React, { useEffect, useState } from "react";
import { getDashboardStats } from "../../services/adminService";
import StatsCards from "../../components/admin/StatsCards";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getDashboardStats();

        // ✅ IMPORTANT FIX
        setStats(res.data);
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  if (!stats) {
    return <div className="p-6 text-red-500">Failed to load data</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      {/* Main Cards */}
      <StatsCards stats={stats} />

      {/* Extra Analytics */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-6 rounded-xl shadow border">
          <h3 className="text-gray-500">New Users (This Month)</h3>
          <p className="text-2xl font-bold">{stats.users.newThisMonth}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border">
          <h3 className="text-gray-500">Verified Technicians</h3>
          <p className="text-2xl font-bold">{stats.technicians.verified}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border">
          <h3 className="text-gray-500">Pending Verification</h3>
          <p className="text-2xl font-bold">
            {stats.technicians.pendingVerification}
          </p>
        </div>
      </div>

      {/* Booking Stats */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-6 rounded-xl shadow border">
          <h3 className="text-gray-500">Completed Bookings</h3>
          <p className="text-2xl font-bold">{stats.bookings.completed}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border">
          <h3 className="text-gray-500">Pending Bookings</h3>
          <p className="text-2xl font-bold">{stats.bookings.pending}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border">
          <h3 className="text-gray-500">Cancelled Bookings</h3>
          <p className="text-2xl font-bold">{stats.bookings.cancelled}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;