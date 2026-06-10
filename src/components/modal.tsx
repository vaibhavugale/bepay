import React, { useEffect } from 'react';
import { CloseIcon } from './icons';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  position?: 'side' | 'center';
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  position = 'side',
}: ModalProps) => {
  // Prevent scrolling on body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isSide = position === 'side';

  const panelClasses = isSide
    ? `fixed inset-y-0 right-0 z-[101] w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`
    : `relative z-[101] w-full max-w-lg bg-white rounded-2xl shadow-xl flex flex-col my-auto mx-auto transform transition-all duration-300 ${
        isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/30 z-[100] transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className={isSide ? "" : "fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"}>
        {/* Modal Panel */}
        <div className={`${panelClasses} ${!isSide ? "pointer-events-auto" : ""}`}>
          <div className={`flex flex-col ${isSide ? "h-full" : "max-h-[85vh]"}`}>
            {/* Header */}
            {(title || description) ? (
              <div className="px-6 py-8">
                <div className="flex items-start justify-between">
                  <div>
                    {title && <h2 className="text-[26px] font-bold text-gray-900">{title}</h2>}
                    {description && <p className="mt-2 text-sm text-gray-500">{description}</p>}
                  </div>
                  <button 
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-1 rounded-full hover:bg-gray-100"
                  >
                    <CloseIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-1 rounded-full hover:bg-gray-100 z-10"
              >
                <CloseIcon className="w-6 h-6" />
              </button>
            )}

            {/* Content area */}
            <div className="flex-1 px-6 overflow-y-auto">
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="px-6 py-8 mt-auto border-t border-gray-100">
                {footer}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
