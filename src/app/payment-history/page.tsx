"use client";
import React, { useState, useEffect } from 'react';
import Layout from "../../components/layout";
import { Table, Column } from "../../components/table";
import { Filters } from "../../components/filters";
import { SearchBar } from "../../components/search-bar";
import { SearchIcon, ArrowDownIcon, ArrowUpIcon, CloseIcon } from "../../components/icons";
import { Button } from "../../components/button";

import { PaymentRow, getPayments } from "../../lib/api";

const COLUMNS: Column<PaymentRow>[] = [
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
  {
    header: (
      <span>
        Created/ Last <br /> Updated Date
      </span>
    ),
    accessorKey: "createdDate",
  },
  {
    header: (
      <span>
        Created/ Last <br /> Updated Time
      </span>
    ),
    accessorKey: "createdTime",
  },
];

import { Modal } from "../../components/modal";
import { FilterModal } from "../../components/filter-modal";

export default function PaymentHistoryPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [data, setData] = useState<PaymentRow[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Detail Modal state
  const [selectedTx, setSelectedTx] = useState<PaymentRow | null>(null);

  const loadData = async (query: string, filters: Record<string, string>) => {
    setLoading(true);
    try {
      const combinedFilters = { ...filters };
      if (query) combinedFilters.search = query;
      const result = await getPayments(combinedFilters);
      setData(result);
      setCurrentPage(1); // Reset to first page on new search/filter
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      loadData(searchQuery, activeFilters);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery, activeFilters]);

  const handleApplyFilters = (values: Record<string, string>) => {
    setActiveFilters(values);
  };

  // Pagination logic
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(p => p - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(p => p + 1);
  };

  const handleRowClick = (row: PaymentRow) => {
    setSelectedTx(row);
  };

  return (
    <main className="w-full h-screen">
      <Layout>
        <div className="p-8 w-full flex flex-col h-full">
          <div className="flex items-center justify-between mb-8 flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-900">Payment History</h1>

            <div className="flex items-center gap-3">
              <SearchBar
                theme="light"
                placeholder="Search by ID or Order"
                icon={<SearchIcon className="w-5 h-5 text-gray-400" />}
                containerClassName="w-[280px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <Filters onClick={() => setIsFilterOpen(true)} />
            </div>
          </div>

          <div className="flex-1 overflow-auto bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col">
            {loading ? (
              <div className="flex items-center justify-center py-20 text-gray-500">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mr-3"></div>
                Loading payments...
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto">
                  <Table 
                    data={paginatedData} 
                    columns={COLUMNS} 
                    onRowClick={handleRowClick}
                    className="border-none shadow-none rounded-none"
                  />
                </div>
                
                {/* Pagination Controls */}
                {data.length > 0 && (
                  <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50">
                    <span className="text-sm text-gray-600 font-medium">
                      Showing {Math.min(currentPage * itemsPerPage, data.length)} of {data.length} entries
                    </span>
                    <div className="flex items-center gap-2">
                      <Button 
                        onClick={handlePrevPage} 
                        disabled={currentPage === 1}
                        className={`!px-4 !py-2 !rounded-lg text-sm font-semibold border ${currentPage === 1 ? 'border-gray-200 text-gray-400 bg-gray-100 cursor-not-allowed' : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'}`}
                      >
                        Previous
                      </Button>
                      <span className="text-sm font-bold px-3 text-gray-800">
                        Page {currentPage} of {totalPages || 1}
                      </span>
                      <Button 
                        onClick={handleNextPage} 
                        disabled={currentPage === totalPages || totalPages === 0}
                        className={`!px-4 !py-2 !rounded-lg text-sm font-semibold border ${currentPage === totalPages || totalPages === 0 ? 'border-gray-200 text-gray-400 bg-gray-100 cursor-not-allowed' : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'}`}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </Layout>

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleApplyFilters}
        onClear={() => handleApplyFilters({})}
        fields={[
          {
            type: 'select',
            name: 'status',
            label: 'Status',
            options: [
              { value: '', label: 'All Statuses' },
              { value: 'Pending', label: 'Pending' },
              { value: 'Confirmed', label: 'Confirmed' },
              { value: 'Failed', label: 'Failed' },
              { value: 'Expired', label: 'Expired' }
            ]
          }
        ]}
      />

      {/* Transaction Detail Modal */}
      <Modal
        isOpen={!!selectedTx}
        onClose={() => setSelectedTx(null)}
        position="center"
        title="Transaction Details"
      >
        {selectedTx && (
          <div className="flex flex-col pb-6 min-w-[350px]">
            <div className="flex flex-col gap-5">
              <DetailRow label="Transaction ID" value={selectedTx.paymentId} />
              <DetailRow label="Order Reference" value={selectedTx.orderId} />
              {selectedTx.paymentTitle && (
                <DetailRow label="Payment Title" value={selectedTx.paymentTitle} />
              )}
              <div className="grid grid-cols-2 gap-4">
                <DetailRow label="Amount Received" value={selectedTx.amountReceived} />
                <DetailRow label="Original Price" value={selectedTx.originalPrice} />
              </div>
              <DetailRow label="Network" value="Ethereum" /> {/* Mocked Network */}
              <DetailRow 
                label="Status" 
                value={
                  <span className={`px-3 py-1 rounded-full text-xs font-bold text-white tracking-wide ${
                    selectedTx.status === "Confirmed" ? "bg-[#459164]" :
                    selectedTx.status === "Pending" ? "bg-yellow-500" :
                    selectedTx.status === "Failed" ? "bg-[#c55d5d]" : "bg-gray-400"
                  }`}>
                    {selectedTx.status}
                  </span>
                } 
              />
              <DetailRow label="Created At" value={`${selectedTx.createdDate} ${selectedTx.createdTime}`} />
            </div>
          </div>
        )}
      </Modal>
    </main>
  );
}

function DetailRow({ label, value }: { label: string, value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-medium text-gray-500">{label}</span>
      <div className="text-base font-semibold text-gray-900 break-words">{value}</div>
    </div>
  );
}
