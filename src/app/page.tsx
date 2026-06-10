"use client";
import React, { useState, useEffect } from 'react';
import Layout from "../components/layout";
import { Table, Column } from "../components/table";
import { Filters } from "../components/filters";
import { SearchBar } from "../components/search-bar";
import { SearchIcon, ArrowDownIcon, ArrowUpIcon, FolderUploadIcon, FileSuccessIcon, FileErrorIcon } from "../components/icons";
import { Button } from "../components/button";

import { PaymentRow, getPayments } from "../lib/api";

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
    cell: (row) => (
      <span
        className={`px-3 py-1 rounded-full text-xs font-bold text-white tracking-wide ${row.status === "ACTIVE" ? "bg-[#459164]" : "bg-[#c55d5d]"
          }`}
      >
        {row.status}
      </span>
    ),
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

import { Modal } from "../components/modal";
import { FilterModal } from "../components/filter-modal";
import { Input } from "../components/input";
import { Select } from "../components/select";

export default function Home() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [data, setData] = useState<PaymentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<"PDF" | "CSV" | "XLS" | null>(null);
  const [exportStatus, setExportStatus] = useState<"idle" | "success" | "error">("idle");

  const loadData = async (filters?: Record<string, string>) => {
    setLoading(true);
    try {
      const result = await getPayments(filters);
      setData(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleApplyFilters = (values: Record<string, string>) => {
    loadData(values);
  };

  // Handler to reset status when modal is closed
  const handleCloseExport = () => {
    setIsExportOpen(false);
    setTimeout(() => {
      setExportStatus("idle");
    }, 300); // Reset after modal close animation
  };

  const handleExportClick = () => {
    // Simulate export - randomly succeed or fail for demonstration
    const isSuccess = Math.random() > 0.5;
    setExportStatus(isSuccess ? "success" : "error");
  };

  return (
    <main className="w-full h-screen">
      <Layout>
        <div className="p-8 w-full">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Payments</h1>

            <div className="flex items-center gap-3">
              <SearchBar
                theme="light"
                placeholder="Search"
                icon={<SearchIcon className="w-5 h-5 text-gray-400" />}
                containerClassName="w-[280px]"
              />

              <Filters onClick={() => setIsFilterOpen(true)} />

              <Button 
                className="!bg-[#282a2e] !text-white hover:!bg-[#3a3d42] !rounded-lg !px-5"
                onClick={() => setIsExportOpen(true)}
              >
                Export
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20 text-gray-500">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mr-3"></div>
              Loading payments...
            </div>
          ) : (
            <Table data={data} columns={COLUMNS} />
          )}
        </div>
      </Layout>

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleApplyFilters}
        fields={[
          {
            type: 'select',
            name: 'status',
            label: 'Status',
            options: [
              { value: '', label: 'All Statuses' },
              { value: 'ACTIVE', label: 'Active' },
              { value: 'EXPIRED', label: 'Expired' }
            ]
          },
          {
            type: 'select',
            name: 'fixedRate',
            label: 'Fixed Rate',
            options: [
              { value: '', label: 'Choose' },
              { value: 'YES', label: 'Yes' },
              { value: 'NO', label: 'No' }
            ]
          },
          {
            type: 'input',
            name: 'payinAddress',
            label: 'Payin address',
            placeholder: 'Enter Address'
          },
          {
            type: 'input',
            name: 'payingHash',
            label: 'Paying hash',
            placeholder: 'Enter hash'
          },
          {
            type: 'select',
            name: 'outcomeCurrency',
            label: 'Outcome currency',
            options: [
              { value: '', label: 'Choose Currency' },
              { value: 'USD', label: 'USD' },
              { value: 'GBP', label: 'GBP' }
            ]
          }
        ]}
      />

      <Modal
        isOpen={isExportOpen}
        onClose={handleCloseExport}
        position="center"
      >
        <div className="flex flex-col items-center justify-center p-12 min-h-[300px]">
          {exportStatus === "idle" && (
            <>
              <FolderUploadIcon className="w-[72px] h-[72px] text-gray-800 mb-6" strokeWidth={1} />
              
              <h3 className="text-[22px] font-bold text-gray-900 mb-8">
                Choose the format to export
              </h3>

              <div className="flex items-center gap-4 w-full mb-8">
                {["PDF", "CSV", "XLS"].map((format) => (
                  <button
                    key={format}
                    onClick={() => setExportFormat(format as any)}
                    className={`flex-1 py-3.5 rounded-full border text-sm font-bold transition-all cursor-pointer ${
                      exportFormat === format
                        ? "border-black text-black bg-gray-50 shadow-sm"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {format}
                  </button>
                ))}
              </div>

              <Button 
                className="w-full !bg-black !text-white !rounded-full py-4 text-[15px] font-semibold"
                onClick={handleExportClick}
              >
                Export
              </Button>
            </>
          )}

          {exportStatus === "success" && (
            <div className="flex flex-col items-center py-6">
              <FileSuccessIcon className="w-[84px] h-[84px] text-gray-800 mb-6" strokeWidth={1} />
              <h3 className="text-[20px] font-bold text-gray-700 text-center">
                Your file is exported successfully!
              </h3>
            </div>
          )}

          {exportStatus === "error" && (
            <div className="flex flex-col items-center py-6">
              <FileErrorIcon className="w-[84px] h-[84px] text-gray-800 mb-6" strokeWidth={1} />
              <h3 className="text-[20px] font-bold text-gray-700 text-center mb-1">
                We couldn't export your file.
              </h3>
              <p className="text-[18px] font-medium text-gray-600 text-center">
                Please try again later.
              </p>
            </div>
          )}
        </div>
      </Modal>
    </main>
  );
}
