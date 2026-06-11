"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from "../components/layout";
import { Table, Column } from "../components/table";
import { 
  ArrowDownIcon, 
  ArrowUpIcon, 
  RefreshIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  XCircleIcon, 
  DollarSignIcon, 
  CalendarIcon, 
  ExternalLinkIcon 
} from "../components/icons";
import { Button } from "../components/button";
import { PaymentRow, getPayments } from "../lib/api";

const RECENT_COLUMNS: Column<PaymentRow>[] = [
  { header: "Payment ID", accessorKey: "paymentId" },
  { header: "Order ID", accessorKey: "orderId" },
  { header: "Original Price", accessorKey: "originalPrice" },
  {
    header: "Amount Recieved",
    cell: (row) => (
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded flex items-center justify-center border border-green-500 text-green-500">
          <ArrowDownIcon className="w-3.5 h-3.5" />
        </div>
        <span>{row.amountReceived}</span>
      </div>
    ),
  },
  {
    header: "Amount Sent",
    cell: (row) => (
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded flex items-center justify-center border border-red-500 text-red-500">
          <ArrowUpIcon className="w-3.5 h-3.5" />
        </div>
        <span>{row.amountSent}</span>
      </div>
    ),
  },
  {
    header: "Status",
    cell: (row) => {
      let bg = "bg-gray-500";
      if (row.status === "Confirmed") bg = "bg-[#459164]";
      if (row.status === "Pending") bg = "bg-yellow-500";
      if (row.status === "Failed") bg = "bg-[#c55d5d]";
      if (row.status === "Expired") bg = "bg-gray-400";
      return (
        <span className={`px-3 py-1 rounded-full text-xs font-bold text-white tracking-wide ${bg}`}>
          {row.status}
        </span>
      );
    },
  },
  { header: "Date", accessorKey: "createdDate" }
];

export default function Dashboard() {
  const [data, setData] = useState<PaymentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState("Last 7 Days");

  const loadData = async () => {
    setLoading(true);
    try {
      const result = await getPayments();
      setData(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [dateRange]);

  // Aggregate metrics
  const totalReceived = data.reduce((sum, payment) => {
    if (payment.status === "Confirmed") {
      // Assuming amountReceived is formatted like "$1,000" or similar
      const val = parseFloat(payment.amountReceived.replace(/[^0-9.-]+/g, ""));
      return sum + (isNaN(val) ? 0 : val);
    }
    return sum;
  }, 0);

  const successfulPayments = data.filter(p => p.status === "Confirmed").length;
  const expiredPayments = data.filter(p => p.status === "Expired" || p.status === "Failed").length;
  const pendingPayments = data.filter(p => p.status === "Pending").length;

  return (
    <main className="w-full h-screen overflow-y-auto">
      <Layout>
        <div className="p-8 w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2 bg-white shadow-sm">
                <CalendarIcon className="w-4 h-4 text-gray-500" />
                <select 
                  className="bg-transparent border-none outline-none text-sm font-medium text-gray-700 cursor-pointer"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <option>Today</option>
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>All Time</option>
                </select>
              </div>
              <Button 
                className="flex items-center gap-2 !bg-[#282a2e] !text-white hover:!bg-[#3a3d42] !rounded-lg !px-4"
                onClick={loadData}
                disabled={loading}
              >
                <RefreshIcon className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Link href="/payment-link" className="group flex items-center justify-between p-6 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-all border border-gray-800">
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg mb-1">Create Payment Link</span>
                <span className="text-gray-400 text-sm">Generate a new link to accept payments</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <ExternalLinkIcon className="w-5 h-5 text-white" />
              </div>
            </Link>
            
            <Link href="/payment-history" className="group flex items-center justify-between p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-200">
              <div className="flex flex-col">
                <span className="text-gray-900 font-bold text-lg mb-1">View Payment History</span>
                <span className="text-gray-500 text-sm">Review all past and ongoing transactions</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                <ExternalLinkIcon className="w-5 h-5 text-gray-900" />
              </div>
            </Link>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard 
              title="Total Received" 
              value={`$${totalReceived.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`} 
              icon={<DollarSignIcon className="w-6 h-6 text-[#459164]" />} 
              trend="+12.5%" 
              trendUp={true} 
            />
            <MetricCard 
              title="Successful Payments" 
              value={successfulPayments.toString()} 
              icon={<CheckCircleIcon className="w-6 h-6 text-[#459164]" />} 
            />
            <MetricCard 
              title="Pending Payments" 
              value={pendingPayments.toString()} 
              icon={<ClockIcon className="w-6 h-6 text-yellow-500" />} 
            />
            <MetricCard 
              title="Failed / Expired" 
              value={expiredPayments.toString()} 
              icon={<XCircleIcon className="w-6 h-6 text-[#c55d5d]" />} 
            />
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-12">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Recent Transactions</h2>
              <Link href="/payment-history" className="text-sm font-semibold text-gray-600 hover:text-black transition-colors">
                View all &rarr;
              </Link>
            </div>
            {loading ? (
              <div className="flex items-center justify-center py-20 text-gray-500">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mr-3"></div>
                Loading recent transactions...
              </div>
            ) : data.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                <p className="mb-4">No transactions found.</p>
              </div>
            ) : (
              <Table data={data.slice(0, 5)} columns={RECENT_COLUMNS} />
            )}
          </div>
        </div>
      </Layout>
    </main>
  );
}

function MetricCard({ title, value, icon, trend, trendUp }: { title: string, value: string, icon: React.ReactNode, trend?: string, trendUp?: boolean }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-gray-50 rounded-xl">
          {icon}
        </div>
        {trend && (
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${trendUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {trend}
          </span>
        )}
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
