"use client";
import React, { useState, useRef, useEffect } from "react";
import { Modal } from "../../../components/modal";
import { Toggle } from "../../../components/toggle";
import { ChevronDownIcon, BtcIcon, EthIcon, SolanaIcon, TonIcon, CopyIcon, FileSuccessIcon } from "../../../components/icons";
import { addPaymentLink } from "../../../lib/api";
import { useFormik } from "formik";
import * as yup from "yup";

interface CreatePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const CRYPTO_OPTIONS = [
  { id: "usdc", name: "USDC", icon: <EthIcon className="w-5 h-5" /> }, // using eth icon as placeholder
  { id: "usdt", name: "USDT", icon: <EthIcon className="w-5 h-5" /> },
  { id: "btc", name: "BTC", icon: <BtcIcon className="w-5 h-5" /> },
  { id: "eth", name: "Ethereum", icon: <EthIcon className="w-5 h-5" /> },
  { id: "sol", name: "Solana", icon: <SolanaIcon className="w-5 h-5" /> },
];

const NETWORK_OPTIONS = [
  { id: "polygon", name: "Polygon" },
  { id: "ethereum", name: "Ethereum" },
  { id: "base", name: "Base" },
  { id: "solana", name: "Solana" },
];

export const CreatePaymentModal = ({ isOpen, onClose, onSuccess }: CreatePaymentModalProps) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  
  const [selectedToken, setSelectedToken] = useState(CRYPTO_OPTIONS[0]);
  const [isTokenDropdownOpen, setIsTokenDropdownOpen] = useState(false);
  
  const [selectedNetwork, setSelectedNetwork] = useState(NETWORK_OPTIONS[0]);
  const [isNetworkDropdownOpen, setIsNetworkDropdownOpen] = useState(false);
  
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [partialPayments, setPartialPayments] = useState(false);

  const [showCopiedToast, setShowCopiedToast] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [createdUrl, setCreatedUrl] = useState("");

  const tokenDropdownRef = useRef<HTMLDivElement>(null);
  const networkDropdownRef = useRef<HTMLDivElement>(null);

  const formik = useFormik({
    initialValues: {
      price: "",
      linkFor: "",
      referenceId: "",
      expiryDate: "",
      description: "",
    },
    validationSchema: yup.object({
      price: yup.number().typeError("Price must be a number").positive("Price must be greater than 0").required("Price is required"),
      linkFor: yup.string().required("Link For is required"),
      referenceId: yup.string(),
      expiryDate: yup.date().nullable().min(new Date(), "Expiry must be in the future"),
      description: yup.string(),
    }),
    onSubmit: async (values) => {
      setIsCreating(true);
      try {
        const newLink = await addPaymentLink({
          currency: selectedToken.name,
          amount: values.price,
          paymentTitle: values.linkFor,
          network: selectedNetwork.name,
          description: values.description,
          expiryDate: values.expiryDate,
          orderId: values.referenceId
        });
        setCreatedUrl(newLink.invoiceUrl);
        setStep('success');
        onSuccess?.();
      } catch (e) {
        console.error(e);
      } finally {
        setIsCreating(false);
      }
    },
  });

  const { resetForm } = formik;
  // Reset step when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep('form');
        resetForm();
        setSelectedToken(CRYPTO_OPTIONS[0]);
        setSelectedNetwork(NETWORK_OPTIONS[0]);
        setShowCopiedToast(false);
      }, 300);
    }
  }, [isOpen, resetForm]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (tokenDropdownRef.current && !tokenDropdownRef.current.contains(event.target as Node)) {
        setIsTokenDropdownOpen(false);
      }
      if (networkDropdownRef.current && !networkDropdownRef.current.contains(event.target as Node)) {
        setIsNetworkDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(createdUrl);
    setShowCopiedToast(true);
    setTimeout(() => setShowCopiedToast(false), 3000);
  };

  const [qrPattern, setQrPattern] = useState<boolean[]>([]);

  useEffect(() => {
    setQrPattern(Array.from({ length: 64 }).map(() => Math.random() > 0.4));
  }, []);

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
        title={step === 'form' ? "Create Payment Link" : ""}
      >
        {step === 'form' ? (
          <div className="flex flex-col gap-6 py-4 pb-8">

        <div className="flex gap-4">
          {/* Pay Currency */}
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-sm font-medium text-gray-700">Token</label>
            <div className="relative" ref={tokenDropdownRef}>
              <button
                onClick={() => setIsTokenDropdownOpen(!isTokenDropdownOpen)}
                className="w-full flex items-center justify-between p-4 bg-[#F8F9FA] border border-transparent rounded-xl text-left focus:outline-none focus:border-gray-300 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg px-2 py-1">
                    {React.cloneElement(selectedToken.icon as React.ReactElement<{ className?: string }>, { className: "w-4 h-4" })}
                    <span className="text-xs font-medium text-gray-900">{selectedToken.name}</span>
                  </div>
                </div>
                <ChevronDownIcon className={`w-5 h-5 text-gray-500 shrink-0 transition-transform ${isTokenDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isTokenDropdownOpen && (
                <div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden max-h-60 overflow-y-auto">
                  {CRYPTO_OPTIONS.map((option) => {
                    const isSelected = selectedToken.id === option.id;
                    return (
                      <button
                        key={option.id}
                        onClick={() => {
                          setSelectedToken(option);
                          setIsTokenDropdownOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          {option.icon}
                          <span className={`text-sm font-medium ${isSelected ? 'text-black' : 'text-gray-900'}`}>{option.name}</span>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${isSelected ? 'bg-black border-black' : 'border-gray-300 bg-white'}`}>
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Network */}
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-sm font-medium text-gray-700">Network</label>
            <div className="relative" ref={networkDropdownRef}>
              <button
                onClick={() => setIsNetworkDropdownOpen(!isNetworkDropdownOpen)}
                className="w-full flex items-center justify-between p-4 bg-[#F8F9FA] border border-transparent rounded-xl text-left focus:outline-none focus:border-gray-300 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-900">{selectedNetwork.name}</span>
                </div>
                <ChevronDownIcon className={`w-5 h-5 text-gray-500 shrink-0 transition-transform ${isNetworkDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isNetworkDropdownOpen && (
                <div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden max-h-60 overflow-y-auto">
                  {NETWORK_OPTIONS.map((option) => {
                    const isSelected = selectedNetwork.id === option.id;
                    return (
                      <button
                        key={option.id}
                        onClick={() => {
                          setSelectedNetwork(option);
                          setIsNetworkDropdownOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors text-left cursor-pointer"
                      >
                        <span className={`text-sm font-medium ${isSelected ? 'text-black' : 'text-gray-900'}`}>{option.name}</span>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${isSelected ? 'bg-black border-black' : 'border-gray-300 bg-white'}`}>
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Price</label>
          <div className="relative">
            <input
              type="text"
              name="price"
              placeholder="0.00"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-4 bg-[#F8F9FA] rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 ${formik.touched.price && formik.errors.price ? 'border border-red-500' : ''}`}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-900">
              USD
            </span>
          </div>
          {formik.touched.price && formik.errors.price ? (
            <span className="text-xs text-red-500">{formik.errors.price}</span>
          ) : null}
        </div>

        {/* Link For? */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Link For?</label>
          <input
            type="text"
            name="linkFor"
            placeholder="Enter your reason for this link"
            value={formik.values.linkFor}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full p-4 bg-[#F8F9FA] rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 ${formik.touched.linkFor && formik.errors.linkFor ? 'border border-red-500' : ''}`}
          />
          {formik.touched.linkFor && formik.errors.linkFor ? (
            <span className="text-xs text-red-500">{formik.errors.linkFor}</span>
          ) : null}
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
              
              <div className="flex flex-col gap-2 mt-2">
                <label className="text-sm font-medium text-gray-700">Reference ID</label>
                <input
                  type="text"
                  name="referenceId"
                  placeholder="e.g. ORD-1234"
                  value={formik.values.referenceId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full p-3 bg-[#F8F9FA] rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
                {formik.touched.referenceId && formik.errors.referenceId ? (
                  <span className="text-xs text-red-500">{formik.errors.referenceId}</span>
                ) : null}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Expiry Date</label>
                <input
                  type="datetime-local"
                  name="expiryDate"
                  value={formik.values.expiryDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full p-3 bg-[#F8F9FA] rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 ${formik.touched.expiryDate && formik.errors.expiryDate ? 'border border-red-500' : ''}`}
                />
                {formik.touched.expiryDate && formik.errors.expiryDate ? (
                  <span className="text-xs text-red-500">{formik.errors.expiryDate}</span>
                ) : null}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Internal Notes / Description</label>
                <textarea
                  name="description"
                  placeholder="Details about this payment"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full p-3 bg-[#F8F9FA] rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 resize-none h-20"
                />
              </div>
            </div>
          )}
        </div>

        {/* Create Button */}
        <div className="mt-4">
          <button
            onClick={() => formik.handleSubmit()}
            disabled={!formik.isValid || !formik.dirty || isCreating}
            className={`w-full py-3.5 font-medium rounded-full transition-all duration-200 flex items-center justify-center ${formik.isValid && formik.dirty && !isCreating
                ? "bg-black text-white cursor-pointer hover:bg-gray-800"
                : "bg-[#F3F4F6] text-gray-400 cursor-not-allowed"
              }`}
          >
            {isCreating ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
            ) : (
              "Create Payment Link"
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
                 {qrPattern.map((isBlack, i) => (
                    <div key={i} className={`${isBlack ? 'bg-black rounded-sm' : 'bg-transparent'}`} />
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
                    <span className="text-xl font-bold text-gray-900">{formik.values.price} {selectedToken.name}</span>
                    <div className="flex items-center gap-1">
                      <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center" title={selectedToken.name}>
                        {React.cloneElement(selectedToken.icon as React.ReactElement<{ className?: string }>, { className: "w-4 h-4" })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-sm text-gray-400">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>

              {/* Link Box */}
              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-500">Link</span>
                <div className="flex items-center justify-between p-4 bg-[#F8F9FA] border border-gray-100 rounded-xl">
                  <span className="text-sm text-gray-900 break-all pr-4">{createdUrl}</span>
                  <button onClick={handleCopy} className="text-gray-500 hover:text-black transition-colors shrink-0 cursor-pointer">
                    <CopyIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 mt-4">
                <button onClick={handleCopy} className="w-full py-4 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-colors cursor-pointer">
                  Copy Link
                </button>
                <button 
                  onClick={onClose}
                  className="w-full py-3 text-sm font-medium text-gray-600 hover:text-black transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};
