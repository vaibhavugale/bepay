"use client";
import React, { useState, useRef, useEffect } from "react";
import { Modal } from "../../../components/modal";
import { Toggle } from "../../../components/toggle";
import { ChevronDownIcon, BtcIcon, EthIcon, SolanaIcon, TonIcon, ContactBookIcon, BitcoinDoodleIcon, CopyIcon, FileSuccessIcon } from "../../../components/icons";
import { addPaymentLink } from "../../../lib/api";

interface CreatePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const CRYPTO_OPTIONS = [
  { id: "btc-net", name: "BTC (Bitcoin network)", icon: <BtcIcon className="w-5 h-5" /> },
  { id: "btc", name: "BTC", icon: <BtcIcon className="w-5 h-5" /> },
  { id: "eth", name: "Ethereum", icon: <EthIcon className="w-5 h-5" /> },
  { id: "sol", name: "Solana", icon: <SolanaIcon className="w-5 h-5" /> },
  { id: "ton", name: "TON", icon: <TonIcon className="w-5 h-5" /> },
];

export const CreatePaymentModal = ({ isOpen, onClose, onSuccess }: CreatePaymentModalProps) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [selectedCryptos, setSelectedCryptos] = useState<typeof CRYPTO_OPTIONS[0][]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [partialPayments, setPartialPayments] = useState(false);
  const [price, setPrice] = useState("");
  const [linkFor, setLinkFor] = useState("");
  const [isCustomerDetailsOpen, setIsCustomerDetailsOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerMobile, setCustomerMobile] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [showCopiedToast, setShowCopiedToast] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Reset step when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setStep('form'), 300);
      setShowCopiedToast(false);
    }
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isValid = selectedCryptos.length > 0 && price.trim() !== "" && linkFor.trim() !== "";

  const handleCreate = async () => {
    if (!isValid) return;
    setIsCreating(true);
    
    try {
      const isAllSelected = selectedCryptos.length === CRYPTO_OPTIONS.length;
      
      await addPaymentLink({
        currency: isAllSelected ? "All currencies" : selectedCryptos[0].name,
        amount: price,
        paymentTitle: linkFor,
        network: selectedCryptos[0]?.name,
        isMoreCurrency: !isAllSelected && selectedCryptos.length > 1,
      });
      setStep('success');
      onSuccess?.();
    } catch (e) {
      console.error(e);
    } finally {
      setIsCreating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("0xdwdhwhdwhysuwyhduhwhxbhjabvxhsaghxahw827w8");
    setShowCopiedToast(true);
    setTimeout(() => setShowCopiedToast(false), 3000);
  };

  return (
    <>
      {/* Toast Notification */}
      {showCopiedToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg border border-gray-100 animate-in fade-in slide-in-from-top-4 duration-300">
          <span className="text-sm font-medium text-gray-900">Copied to Clipboard</span>
          <FileSuccessIcon className="w-5 h-5 text-green-500" />
        </div>
      )}

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        position="center"
        title={step === 'form' ? "Create Payment Tools" : ""}
      >
        {step === 'form' ? (
          <div className="flex flex-col gap-6 py-4 pb-8">

        {/* Pay Currency */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Pay Currency</label>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between p-4 bg-[#F8F9FA] border border-transparent rounded-xl text-left focus:outline-none focus:border-gray-300 transition-colors"
            >
              <div className="flex items-center gap-3">
                {selectedCryptos.length > 0 ? (
                  <div className="flex flex-wrap items-center gap-2">
                    {selectedCryptos.map(crypto => (
                      <div key={crypto.id} className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg px-2 py-1">
                        {React.cloneElement(crypto.icon as React.ReactElement<{ className?: string }>, { className: "w-4 h-4" })}
                        <span className="text-xs font-medium text-gray-900">{crypto.name}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-900">All currencies</span>
                    <span className="text-xs text-gray-500">Please choose any supported crypto for payment</span>
                  </div>
                )}
              </div>
              <ChevronDownIcon className={`w-5 h-5 text-gray-500 shrink-0 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden max-h-60 overflow-y-auto">
                {CRYPTO_OPTIONS.map((option) => {
                  const isSelected = selectedCryptos.some(c => c.id === option.id);
                  return (
                    <button
                      key={option.id}
                      onClick={() => {
                        if (isSelected) {
                          setSelectedCryptos(prev => prev.filter(c => c.id !== option.id));
                        } else {
                          setSelectedCryptos(prev => [...prev, option]);
                        }
                      }}
                      className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        {option.icon}
                        <span className={`text-sm font-medium ${isSelected ? 'text-black' : 'text-gray-900'}`}>{option.name}</span>
                      </div>
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-black border-black' : 'border-gray-300 bg-white'}`}>
                        {isSelected && <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Price</label>
          <div className="relative">
            <input
              type="text"
              placeholder="0.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-4 bg-[#F8F9FA] rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-900">
              USD
            </span>
          </div>
        </div>

        {/* Link For? */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Link For?</label>
          <input
            type="text"
            placeholder="Enter your reason for this link"
            value={linkFor}
            onChange={(e) => setLinkFor(e.target.value)}
            className="w-full p-4 bg-[#F8F9FA] rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300"
          />
        </div>

        {/* Additional Settings */}
        <div className="flex flex-col border-b border-gray-100 pb-2">
          <button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className="flex items-center justify-between py-2 cursor-pointer group"
          >
            <span className="text-sm font-medium text-gray-700">Additional Settings</span>
            <ChevronDownIcon className={`w-4 h-4 text-gray-500 transition-transform ${isSettingsOpen ? "rotate-180" : ""}`} />
          </button>

          {isSettingsOpen && (
            <div className="flex flex-col gap-4 mt-4 mb-2 p-4 border border-gray-100 rounded-xl shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Partial Payments</span>
                <Toggle checked={partialPayments} onChange={setPartialPayments} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Reference ID</span>
                <button className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">+ Add</button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Expiry Date</span>
                <button className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">+ Add</button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Internal Notes</span>
                <button className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">+ Add</button>
              </div>
            </div>
          )}
        </div>

        {/* Customer Details */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between py-2">
            <span className="text-sm font-medium text-gray-700">Customer Details</span>
            <button
              onClick={() => setIsCustomerDetailsOpen(!isCustomerDetailsOpen)}
              className={`text-sm font-medium transition-colors ${isCustomerDetailsOpen ? 'text-[#c55d5d] hover:text-red-700' : 'text-gray-900 hover:text-gray-600'}`}
            >
              {isCustomerDetailsOpen ? 'Delete' : '+ Add'}
            </button>
          </div>

          {isCustomerDetailsOpen && (
            <div className="flex flex-col gap-4 p-4 mt-2 border border-gray-100 rounded-xl shadow-sm">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Name</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Arshi Kohli"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full p-4 bg-[#F8F9FA] rounded-xl text-sm text-gray-900 placeholder:text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-300"
                  />
                  <ContactBookIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Mobile Number</label>
                <input
                  type="text"
                  placeholder="927969237982"
                  value={customerMobile}
                  onChange={(e) => setCustomerMobile(e.target.value)}
                  className="w-full p-4 bg-[#F8F9FA] rounded-xl text-sm text-gray-900 placeholder:text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  placeholder="aryhhdiuw@gmail.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full p-4 bg-[#F8F9FA] rounded-xl text-sm text-gray-900 placeholder:text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
              </div>
            </div>
          )}
        </div>

        {/* Create Button */}
        <div className="mt-4">
          <button
            onClick={handleCreate}
            disabled={!isValid || isCreating}
            className={`w-full py-3.5 font-medium rounded-full transition-all duration-200 flex items-center justify-center ${isValid && !isCreating
                ? "bg-black text-white cursor-pointer hover:bg-gray-800"
                : "bg-[#F3F4F6] text-gray-400 cursor-not-allowed"
              }`}
          >
            {isCreating ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
            ) : (
              "Create"
            )}
          </button>
        </div>
      </div>
    ) : (
          <div className="flex flex-col items-center pt-8 pb-4">
            
            {/* QR Code Placeholder */}
            <div className="w-48 h-48 bg-white border border-gray-200 rounded-xl shadow-sm mb-6 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-2 grid grid-cols-8 grid-rows-8 gap-1 opacity-80">
                 {/* Decorative mock QR pattern */}
                 {Array.from({ length: 64 }).map((_, i) => (
                    <div key={i} className={`${Math.random() > 0.4 ? 'bg-black rounded-sm' : 'bg-transparent'}`} />
                 ))}
                 {/* Corner blocks */}
                 <div className="absolute top-0 left-0 w-10 h-10 border-4 border-black rounded-md" />
                 <div className="absolute top-0 right-0 w-10 h-10 border-4 border-black rounded-md" />
                 <div className="absolute bottom-0 left-0 w-10 h-10 border-4 border-black rounded-md" />
              </div>
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-8">Payment Link Created!</h2>
            
            <div className="w-full flex flex-col gap-6">
              {/* Amount and Date */}
              <div className="flex justify-between items-end relative">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-gray-500">Total Amount</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-gray-900">{price}</span>
                    {selectedCryptos.length > 0 && (
                      <div className="flex items-center gap-1">
                        {selectedCryptos.map(crypto => (
                          <div key={crypto.id} className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center" title={crypto.name}>
                            {React.cloneElement(crypto.icon as React.ReactElement<{ className?: string }>, { className: "w-4 h-4" })}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-red-500 absolute -top-2 right-4 text-xs font-bold">-</span>
                  <span className="text-sm text-gray-400">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>

              {/* Link Box */}
              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-500">Link</span>
                <div className="flex items-center justify-between p-4 bg-[#F8F9FA] border border-gray-100 rounded-xl">
                  <span className="text-sm text-gray-900 break-all pr-4">0xdwdhwhdwhysuwyhduhwhxbhjabvxhsaghxahw827w8</span>
                  <button onClick={handleCopy} className="text-gray-500 hover:text-black transition-colors shrink-0 cursor-pointer">
                    <CopyIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 mt-4">
                <button className="w-full py-4 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-colors cursor-pointer">
                  Share Via Other Apps
                </button>
                <button 
                  onClick={onClose}
                  className="w-full py-3 text-sm font-medium text-gray-600 hover:text-black transition-colors cursor-pointer"
                >
                  I'll do it later
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};
