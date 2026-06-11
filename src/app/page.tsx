"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from "../components/layout";
import { Table, Column } from "../components/table";
import { ExternalLinkIcon } from "../components/icons";
import { Button } from "../components/button";
import { PaymentRow, getPayments } from "../lib/api";
import { usePage } from "../context/PageContext";

const RECENT_COLUMNS: Column<PaymentRow>[] = [
  { header: "Payment ID", accessorKey: "paymentId" },
  { header: "Order ID", accessorKey: "orderId" },
  { header: "Original Price", accessorKey: "originalPrice" },
  {
    header: "Amount Recieved",
    cell: (row) => (
      <div className="flex items-center gap-2">
        <span className="text-green-600 font-medium">{row.amountReceived}</span>
      </div>
    ),
  },
  {
    header: "Amount Sent",
    cell: (row) => (
      <div className="flex items-center gap-2">
        <span className="text-red-600 font-medium">{row.amountSent}</span>
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

function DashboardContent() {
  const [data, setData] = useState<PaymentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState("Last 7 Days");
  const { setLabel } = usePage();

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
    setLabel("Dashboard");
    loadData();
  }, [setLabel, dateRange]);

  // Aggregate metrics
  const totalReceived = data.reduce((sum, payment) => {
    if (payment.status === "Confirmed") {
      const val = parseFloat(payment.amountReceived.replace(/[^0-9.-]+/g, ""));
      return sum + (isNaN(val) ? 0 : val);
    }
    return sum;
  }, 0);

  const successfulPayments = data.filter(p => p.status === "Confirmed").length;
  const expiredPayments = data.filter(p => p.status === "Expired" || p.status === "Failed").length;
  const pendingPayments = data.filter(p => p.status === "Pending").length;

  return (
    <div className="flex flex-col gap-8 p-8 w-full max-w-[1600px] mx-auto bg-[#F8F9FA] min-h-full">
      {/* Controls Row */}
      <div className="flex justify-end items-center gap-4">
        <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 bg-white shadow-sm">
          <select 
            className="bg-transparent border-none outline-none text-sm font-semibold text-gray-700 cursor-pointer"
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
          className="flex items-center gap-2 !bg-[#1c1d21] !text-white hover:!bg-[#2e3036] !rounded-xl px-5 py-2.5 !text-sm !font-semibold shadow-sm"
          onClick={loadData}
          disabled={loading}
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </Button>
      </div>

      {/* Navigation Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/payment-link" className="group flex items-center justify-between p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-[24px] shadow-sm hover:shadow-md transition-all border border-gray-800">
          <div className="flex flex-col">
            <span className="text-white font-bold text-xl mb-2">Create Payment Link</span>
            <span className="text-gray-400 text-sm font-medium">Generate a new link to accept payments seamlessly</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors shrink-0">
            <ExternalLinkIcon className="w-6 h-6 text-white" />
          </div>
        </Link>
        
        <Link href="/payment-history" className="group flex items-center justify-between p-8 bg-white rounded-[24px] shadow-sm hover:shadow-md transition-all border border-gray-100">
          <div className="flex flex-col">
            <span className="text-gray-900 font-bold text-xl mb-2">View Payment History</span>
            <span className="text-gray-500 text-sm font-medium">Review all past and ongoing transactions in detail</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:bg-gray-100 transition-colors shrink-0">
            <ExternalLinkIcon className="w-6 h-6 text-gray-900" />
          </div>
        </Link>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Total Received" 
          value={`$ ${totalReceived.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`} 
        />
        <MetricCard 
          title="Successful Payments" 
          value={successfulPayments.toString()} 
        />
        <MetricCard 
          title="Pending Payments" 
          value={pendingPayments.toString()} 
        />
        <MetricCard 
          title="Failed or Expired" 
          value={expiredPayments.toString()} 
        />
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-[24px] p-8 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-bold text-gray-900">Recent Transactions</h3>
          <Link href="/payment-history" className="text-sm font-bold text-gray-500 hover:text-black transition-colors bg-gray-50 px-4 py-2 rounded-lg">
            View all
          </Link>
        </div>
        {loading ? (
          <div className="py-12 text-center font-medium text-gray-500">Loading recent transactions...</div>
        ) : data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-500">
            <p className="font-medium">No transactions found for the selected period.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table data={data.slice(0, 5)} columns={RECENT_COLUMNS} />
          </div>
        )}
      </div>
    </div>
  );
}

function MetricCard({ title, subtitle, value }: { title: string, subtitle?: string, value: string }) {
  return (
    <div className="bg-white p-8 rounded-[24px] border border-gray-100 shadow-sm flex flex-col justify-center flex-1">
      <div>
        <h3 className="text-[15px] font-bold text-gray-500">{title}</h3>
        {subtitle && <p className="text-[13px] font-medium text-gray-400 mb-1">{subtitle}</p>}
        <p className="text-[32px] font-bold tracking-tight text-gray-900 mt-4">{value}</p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Layout>
      <DashboardContent />
    </Layout>
  );
}
