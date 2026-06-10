"use client";
import React, { useState, useEffect } from 'react';
import Layout from "../../components/layout";
import { Table, Column } from "../../components/table";
import { Filters } from "../../components/filters";
import { SearchBar } from "../../components/search-bar";
import { SearchIcon, CopyIcon } from "../../components/icons";
import { Button } from "../../components/button";
import { Modal } from "../../components/modal";
import { FilterModal } from "../../components/filter-modal";
import { Input } from "../../components/input";
import { Select } from "../../components/select";
import { PaymentLinkRow, getPaymentLinks } from "../../lib/api";

const COLUMNS: Column<PaymentLinkRow>[] = [
  {
    header: "Invoice ID",
    accessorKey: "invoiceId",
  },
  {
    header: "Order ID",
    accessorKey: "orderId",
  },
  {
    header: "Currency",
    cell: (row) => (
      <div className="flex items-center gap-2">
        <span className="text-gray-700">{row.currency}</span>
        {row.isMoreCurrency && (
          <span className="flex items-center justify-center bg-gray-500 text-white text-[10px] font-bold rounded-sm px-1.5 h-4">
            +2
          </span>
        )}
      </div>
    ),
  },
  {
    header: "Invoice URL",
    cell: (row) => (
      <div className="flex items-center gap-2 text-[#0066FF]">
        <span className="truncate max-w-[200px] xl:max-w-[280px]">
          {row.invoiceUrl}
        </span>
        <button className="text-[#0066FF] hover:text-blue-800 transition-colors cursor-pointer">
          <CopyIcon className="w-4 h-4" />
        </button>
      </div>
    ),
  },
  {
    header: "Status",
    cell: (row) => {
      let bgClass = "";
      if (row.status === "COMPLETED") bgClass = "bg-[#459164]";
      else if (row.status === "IN PROGRESS") bgClass = "bg-[#E68D25]";
      else if (row.status === "FAILED") bgClass = "bg-[#c55d5d]";
      
      return (
        <span
          className={`px-3 py-1 rounded-full text-[11px] font-bold text-white tracking-wide ${bgClass}`}
        >
          {row.status}
        </span>
      );
    },
  },
  {
    header: (
      <div className="flex flex-col">
        <span>Created/ Last</span>
        <span>Updated Date</span>
      </div>
    ),
    accessorKey: "createdDate",
  },
  {
    header: (
      <div className="flex flex-col">
        <span>Created/ Last</span>
        <span>Updated Time</span>
      </div>
    ),
    accessorKey: "createdTime",
  },
];

import { CreatePaymentModal } from "./components/create-payment-modal";

export default function PaymentLinkPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [data, setData] = useState<PaymentLinkRow[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async (filters?: Record<string, string>) => {
    setLoading(true);
    try {
      const result = await getPaymentLinks(filters);
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
    console.log("Applying filters:", values);
    loadData(values);
  };

  const handleCreateSuccess = () => {
    loadData();
  };

  return (
    <main className="w-full h-screen">
      <Layout>
        <div className="p-8 w-full">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Payment Link</h1>

            <div className="flex items-center gap-3">
              <SearchBar
                theme="light"
                placeholder="Search"
                icon={<SearchIcon className="w-5 h-5 text-gray-400" />}
                containerClassName="w-[280px]"
              />

              <Filters onClick={() => setIsFilterOpen(true)} />

              <Button 
                onClick={() => setIsCreateOpen(true)}
                className="!bg-[#282a2e] !text-white hover:!bg-[#3a3d42] !rounded-lg !px-5 whitespace-nowrap"
              >
                + Create Payment Link
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20 text-gray-500">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mr-3"></div>
              Loading payment links...
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
            label: 'Payment Status',
            options: [
              { value: '', label: 'Choose' },
              { value: 'ACTIVE', label: 'Active' },
              { value: 'EXPIRED', label: 'Expired' },
              { value: 'COMPLETED', label: 'Completed' },
              { value: 'IN PROGRESS', label: 'In Progress' },
              { value: 'FAILED', label: 'Failed' }
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
            type: 'select',
            name: 'feePaidByUser',
            label: 'Fee Paid By User',
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
              { value: '', label: 'Choose' },
              { value: 'USD', label: 'USD' },
              { value: 'EUR', label: 'EUR' },
              { value: 'GBP', label: 'GBP' }
            ]
          }
        ]}
      />

      <CreatePaymentModal 
        isOpen={isCreateOpen} 
        onClose={() => setIsCreateOpen(false)} 
        onSuccess={handleCreateSuccess}
      />
    </main>
  );
}
