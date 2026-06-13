'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, ExternalLink, Smartphone, CreditCard } from 'lucide-react';

interface UPIDialogProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  recipient: string;
  upiId: string;
}

export const UPIDialog: React.FC<UPIDialogProps> = ({
  isOpen,
  onClose,
  amount,
  recipient,
  upiId
}) => {
  const [copied, setCopied] = React.useState(false);

  const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(recipient)}&am=${amount}&cu=INR`;

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenUPI = () => {
    window.location.href = upiLink;
  };

  const apps = [
    { name: 'Google Pay', color: 'bg-[#4285F4]' },
    { name: 'PhonePe', color: 'bg-[#5F259F]' },
    { name: 'Paytm', color: 'bg-[#00B9ED]' },
    { name: 'BHIM', color: 'bg-[#1A1A1A]' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-card rounded-2xl max-w-md w-full p-6 shadow-xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-heading font-semibold text-text">
                    UPI Payment
                  </h3>
                  <p className="text-sm text-text/60">Pay ₹{amount.toLocaleString()}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-card/50 rounded-lg transition-colors"
                >
                  <X size={20} className="text-text" />
                </button>
              </div>

              {/* QR Code */}
              <div className="bg-white rounded-xl p-6 mb-6 flex items-center justify-center">
                <div className="w-48 h-48 bg-white border-2 border-text/10 rounded-lg flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-32 h-32">
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      d="M10,10 L30,10 L30,30 L10,30 Z M35,10 L55,10 L55,30 L35,30 Z M60,10 L80,10 L80,30 L60,30 Z M10,35 L30,35 L30,55 L10,55 Z M60,35 L80,35 L80,55 L60,55 Z M10,60 L30,60 L30,80 L10,80 Z M35,60 L55,60 L55,80 L35,80 Z M60,60 L80,60 L80,80 L60,80 Z"
                    />
                  </svg>
                  <div className="absolute text-xs text-text/40 mt-24">Scan to Pay</div>
                </div>
              </div>

              {/* UPI ID */}
              <div className="mb-6">
                <label className="text-sm font-medium text-text/60 mb-2 block">
                  UPI ID
                </label>
                <div className="flex items-center gap-2 bg-background rounded-lg p-3">
                  <span className="flex-1 font-mono text-text">{upiId}</span>
                  <button
                    onClick={handleCopy}
                    className="p-2 hover:bg-card rounded-lg transition-colors"
                  >
                    {copied ? (
                      <span className="text-xs text-barter">Copied!</span>
                    ) : (
                      <Copy size={16} className="text-text/60" />
                    )}
                  </button>
                </div>
              </div>

              {/* Mobile Deep Links */}
              <div className="mb-6">
                <button
                  onClick={handleOpenUPI}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-action text-white rounded-lg font-medium hover:bg-action/90 transition-colors"
                >
                  <Smartphone size={20} />
                  Open UPI App
                </button>
              </div>

              {/* Popular Apps */}
              <div>
                <p className="text-sm font-medium text-text/60 mb-3">
                  Popular UPI Apps
                </p>
                <div className="grid grid-cols-4 gap-3">
                  {apps.map(app => (
                    <div
                      key={app.name}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className={`w-12 h-12 ${app.color} rounded-xl flex items-center justify-center`}>
                        <CreditCard className="text-white" size={20} />
                      </div>
                      <span className="text-xs text-text/60 text-center">{app.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};