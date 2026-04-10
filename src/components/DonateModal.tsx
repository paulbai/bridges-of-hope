"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
  causeName: string;
  organizationName?: string;
}

export function DonateModal({
  isOpen,
  onClose,
  causeName,
  organizationName = "Bridges of Hope",
}: DonateModalProps) {
  const [loading, setLoading] = useState(true);

  // Close on Escape & lock body scroll
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handler);
      document.body.style.overflow = "hidden";
      setLoading(true);
    }
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const checkoutUrl = `https://pay.flotme.ai/pay?${new URLSearchParams({
    organization: causeName,
    cause: causeName,
  }).toString()}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-navy/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
          >
            <div
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden relative"
              style={{ height: "min(85vh, 700px)" }}
              role="dialog"
              aria-modal="true"
              aria-label={`Donate to ${causeName}`}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-navy/80 hover:bg-navy flex items-center justify-center transition-colors cursor-pointer shadow-lg"
                aria-label="Close checkout"
              >
                <X size={18} className="text-white" />
              </button>

              {/* Loading Spinner */}
              {loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-[5]">
                  <Loader2 size={32} className="text-teal animate-spin mb-4" />
                  <p className="text-text-secondary text-sm font-semibold">
                    Loading Flot Checkout...
                  </p>
                  <p className="text-text-muted text-xs mt-1">
                    {causeName} &middot; {organizationName}
                  </p>
                </div>
              )}

              {/* Flot Checkout Iframe */}
              <iframe
                src={checkoutUrl}
                title={`Flot Checkout — ${causeName}`}
                className="w-full h-full border-0 rounded-3xl"
                onLoad={() => setLoading(false)}
                allow="payment"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
