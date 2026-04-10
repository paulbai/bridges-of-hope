"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, ArrowRight, Heart, ShieldCheck, ChevronLeft } from "lucide-react";

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
  causeName: string;
  flotMerchant?: string;
}

const presetAmounts = [10, 25, 50, 100, 250, 500];

export function DonateModal({
  isOpen,
  onClose,
  causeName,
  flotMerchant,
}: DonateModalProps) {
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<"amount" | "checkout">("amount");
  const [amount, setAmount] = useState("");
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setStep("amount");
      setAmount("");
      setSelectedPreset(null);
      setLoading(true);
    }
  }, [isOpen]);

  // Close on Escape & lock body scroll
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handler);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handlePresetClick = (value: number) => {
    setSelectedPreset(value);
    setAmount(value.toString());
  };

  const handleCustomAmount = (val: string) => {
    // Only allow numbers and decimal point
    const cleaned = val.replace(/[^0-9.]/g, "");
    setAmount(cleaned);
    setSelectedPreset(null);
  };

  const handleProceedToCheckout = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    setStep("checkout");
    setLoading(true);
  };

  const handleBackToAmount = () => {
    setStep("amount");
  };

  const donationAmount = parseFloat(amount) || 0;

  // Use the cause's own Flot merchant name so their name shows on checkout
  const merchantName = flotMerchant || causeName;

  const checkoutUrl = `https://pay.flotme.ai/pay?${new URLSearchParams({
    organization: merchantName,
    cause: causeName,
    ...(donationAmount > 0 ? { amount: donationAmount.toString() } : {}),
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
              style={{ height: step === "checkout" ? "min(85vh, 700px)" : "auto" }}
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

              {step === "amount" ? (
                /* ── Step 1: Amount Selection ── */
                <div className="p-8 sm:p-10">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gold/20 flex items-center justify-center mb-4">
                      <Heart size={28} className="text-gold-deep" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-navy mb-2">
                      Donate to
                    </h3>
                    <p className="text-xl font-serif font-bold text-teal">
                      {causeName}
                    </p>
                  </div>

                  {/* Preset Amounts */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {presetAmounts.map((preset) => (
                      <button
                        key={preset}
                        onClick={() => handlePresetClick(preset)}
                        className={`py-3.5 rounded-xl font-bold text-lg transition-all duration-200 cursor-pointer ${
                          selectedPreset === preset
                            ? "bg-navy text-white shadow-md scale-[0.97]"
                            : "bg-surface-dim text-navy hover:bg-surface-elevated"
                        }`}
                      >
                        ${preset}
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <div className="mb-8">
                    <label className="block text-text-muted text-sm font-semibold mb-2">
                      Or enter a custom amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-navy font-bold text-xl">
                        $
                      </span>
                      <input
                        type="text"
                        inputMode="decimal"
                        value={amount}
                        onChange={(e) => handleCustomAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full pl-10 pr-4 py-4 bg-surface-dim rounded-xl text-navy font-bold text-xl placeholder-text-muted/40 focus:outline-none focus:ring-2 focus:ring-teal/30 transition-all"
                      />
                    </div>
                  </div>

                  {/* Proceed Button */}
                  <button
                    onClick={handleProceedToCheckout}
                    disabled={!amount || parseFloat(amount) <= 0}
                    className="w-full py-4 bg-gold text-navy-dark rounded-xl font-bold text-lg hover:bg-gold-bright transition-all duration-300 cursor-pointer flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-gold"
                  >
                    Proceed to Payment
                    {donationAmount > 0 && (
                      <span className="bg-navy-dark/10 px-3 py-1 rounded-lg text-sm">
                        ${donationAmount.toLocaleString()}
                      </span>
                    )}
                    <ArrowRight size={18} />
                  </button>

                  {/* Trust Note */}
                  <div className="flex items-center justify-center gap-2 mt-5 text-text-muted text-xs">
                    <ShieldCheck size={14} className="text-teal" />
                    <span>Secure payment via Flot Checkout &middot; 100% goes to the cause</span>
                  </div>
                </div>
              ) : (
                /* ── Step 2: Flot Checkout ── */
                <>
                  {/* Back Button */}
                  <button
                    onClick={handleBackToAmount}
                    className="absolute top-4 left-4 z-10 flex items-center gap-1 text-sm font-semibold text-navy/60 hover:text-navy transition-colors cursor-pointer bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full"
                  >
                    <ChevronLeft size={16} />
                    Back
                  </button>

                  {/* Loading Spinner */}
                  {loading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-[5]">
                      <Loader2 size={32} className="text-teal animate-spin mb-4" />
                      <p className="text-text-secondary text-sm font-semibold">
                        Loading Flot Checkout...
                      </p>
                      <p className="text-text-muted text-xs mt-1">
                        {causeName} &middot; ${donationAmount.toLocaleString()}
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
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
