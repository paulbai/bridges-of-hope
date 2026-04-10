"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "How does Bridges of Hope ensure my donation reaches the cause?",
    a: "Bridges of Hope does not hold or manage any donated funds. When you donate to a cause, the payment goes directly to that organization\u2019s verified Flot account. We act as a verification and transparency layer \u2013 ensuring every cause on our platform is legitimate and every milestone is tracked.",
  },
  {
    q: "What does it mean for an organization to be \u201CVerified\u201D?",
    a: "Verified status means the organization has passed our due diligence process, which includes validating their registration, mission, leadership, and impact history. Our partnerships team reviews each application within 48 hours, and full verification typically takes 5\u20137 business days.",
  },
  {
    q: "What payment methods are accepted?",
    a: "All donations are processed through Flot Checkout, which accepts Visa, Mastercard, Mobile Money (Orange Money, Afrimoney), the Flot App, and WhatsApp payments. You can donate from 150+ countries using the method most convenient for you.",
  },
  {
    q: "Are there any platform fees?",
    a: "No. Bridges of Hope charges zero platform fees. 100% of your donation goes directly to the cause\u2019s Flot account. Standard payment processing fees from Flot may apply depending on your payment method.",
  },
  {
    q: "How can my organization join Bridges of Hope?",
    a: "Any charity, NGO, social enterprise, community organization, school, or health facility can apply. Simply fill out the application form in the \u201CPartner With Us\u201D section with your organization details and cause description. Our team will review your application and guide you through the verification process.",
  },
  {
    q: "Can I donate to multiple causes?",
    a: "Absolutely. You can browse all active programs on our platform and donate to as many causes as you\u2019d like. Each donation is processed separately and goes directly to that specific cause\u2019s account.",
  },
  {
    q: "How do I track the impact of my donation?",
    a: "Each verified cause on our platform shares milestone updates, progress reports, and impact photos. When you donate, you\u2019ll be able to see exactly how funds are being used through GPS-tagged updates, verified progress bars, and community impact stories.",
  },
];

interface FaqModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FaqModal({ isOpen, onClose }: FaqModalProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Frequently Asked Questions"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 pb-4 border-b border-outline/10 shrink-0">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-navy">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-text-muted text-sm mt-1">
                    Everything you need to know about donating and partnering with us.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-surface-dim hover:bg-navy/10 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                  aria-label="Close FAQ"
                >
                  <X size={18} className="text-navy" />
                </button>
              </div>

              {/* FAQ Items */}
              <div className="overflow-y-auto flex-1 p-6 space-y-3">
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    className="bg-surface rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer group"
                    >
                      <span className="font-semibold text-navy leading-snug pr-2">
                        {faq.q}
                      </span>
                      <div className="w-7 h-7 rounded-full bg-surface-dim flex items-center justify-center shrink-0 group-hover:bg-teal/10 transition-colors">
                        {openFaq === i ? (
                          <Minus size={14} className="text-teal" />
                        ) : (
                          <Plus size={14} className="text-navy" />
                        )}
                      </div>
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-5 text-text-secondary leading-relaxed text-sm">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
