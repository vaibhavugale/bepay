"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Layout from "../../../components/layout";
import { getPaymentLinkById, PaymentLinkRow } from "../../../lib/api";

export default function PaymentLinkDetail() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [data, setData] = useState<PaymentLinkRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchDetail() {
      setLoading(true);
      try {
        const result = await getPaymentLinkById(id);
        if (result) setData(result);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [id]);

  const handleCopy = () => {
    if (data?.invoiceUrl) {
      navigator.clipboard.writeText(data.invoiceUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <main className="w-full h-screen">
        <Layout>
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mr-3"></div>
            Loading detail...
          </div>
        </Layout>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="w-full h-screen">
        <Layout>
          <div className="p-8 w-full max-w-4xl mx-auto flex flex-col items-center mt-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Link Not Found</h2>
            <button onClick={() => router.back()} className="text-[#0066FF] hover:underline cursor-pointer">
              Return to Payment Links
            </button>
          </div>
        </Layout>
      </main>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE": return "bg-[#EBF5FF] text-[#0066FF]";
      case "COMPLETED": return "bg-[#E6F4EA] text-[#459164]";
      case "IN PROGRESS": return "bg-[#FEF3C7] text-[#E68D25]";
      case "FAILED": return "bg-[#FDE8E8] text-[#c55d5d]";
      case "EXPIRED": return "bg-gray-100 text-gray-600";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <main className="w-full h-screen">
      <Layout>
        <div className="p-8 w-full max-w-5xl mx-auto">
          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-2 text-gray-500 hover:text-black mb-6 transition-colors cursor-pointer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            <span className="font-medium">Back to Payment Links</span>
          </button>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
            <div className="p-8 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {data.paymentTitle || "Payment Link"}
                </h1>
                <p className="text-gray-500 font-medium">Invoice ID: {data.invoiceId}</p>
              </div>
              <div>
                <span className={`px-4 py-1.5 rounded-full text-sm font-bold tracking-wide ${getStatusColor(data.status)}`}>
                  {data.status}
                </span>
              </div>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Payment Details</h3>
                  <div className="bg-[#fcfcfc] rounded-xl p-5 flex flex-col gap-4 border border-gray-50">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Amount</span>
                      <span className="font-bold text-gray-900 text-lg">{data.amount || "Variable"} {data.currency}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Network</span>
                      <span className="font-medium text-gray-900">{data.network || "Any Supported"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Reference ID</span>
                      <span className="font-medium text-gray-900">{data.orderId || "-"}</span>
                    </div>
                    {data.description && (
                      <div className="flex flex-col gap-1 mt-2 pt-4 border-t border-gray-100">
                        <span className="text-gray-500">Description</span>
                        <span className="text-gray-900">{data.description}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Timeline</h3>
                  <div className="bg-[#fcfcfc] rounded-xl p-5 flex flex-col gap-4 border border-gray-50">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Created At</span>
                      <span className="font-medium text-gray-900">{data.createdDate} • {data.createdTime}</span>
                    </div>
                    {data.expiryDate && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Expires At</span>
                        <span className="font-medium text-gray-900">{new Date(data.expiryDate).toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Share Link</h3>
                  <div className="bg-[#F8F9FA] border border-gray-100 rounded-xl p-5">
                    <p className="text-sm text-gray-500 mb-3">Send this link to your customer to request payment.</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-3 truncate text-sm text-gray-800">
                        {data.invoiceUrl}
                      </div>
                      <button 
                        onClick={handleCopy}
                        className="bg-black text-white px-5 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        {copied ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  </div>
                </div>

                {data.status === "COMPLETED" && (
                  <div>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Transaction Info</h3>
                    <div className="bg-green-50 rounded-xl p-5 border border-green-100">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-green-800 font-medium">Status</span>
                        <span className="font-bold text-green-700">Paid Successfully</span>
                      </div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-green-800 font-medium">Tx Hash</span>
                        <span className="font-medium text-green-700 truncate max-w-[200px]">
                          0x{Math.random().toString(16).slice(2, 10)}...{Math.random().toString(16).slice(2, 6)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-green-800 font-medium">Completed At</span>
                        <span className="font-medium text-green-700">
                          {data.createdDate} • {data.createdTime}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </main>
  );
}
