"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, MapPin, Calendar, Users, Target, ArrowRight } from "lucide-react";

export interface CauseDetail {
  title: string;
  description: string;
  longDescription: string;
  raised: string;
  goal: string;
  percent: number;
  imgSrc: string;
  imgAlt: string;
  location: string;
  startDate: string;
  beneficiaries: string;
  milestones: string[];
  impact: string[];
  flotMerchant: string;
}

interface CauseDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  cause: CauseDetail | null;
  onDonate: (causeName: string, flotMerchant?: string) => void;
}

export function CauseDetailModal({
  isOpen,
  onClose,
  cause,
  onDonate,
}: CauseDetailModalProps) {
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

  if (!cause) return null;

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
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden relative max-h-[90vh] flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-label={`Details for ${cause.title}`}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-navy/80 hover:bg-navy flex items-center justify-center transition-colors cursor-pointer shadow-lg"
                aria-label="Close details"
              >
                <X size={18} className="text-white" />
              </button>

              {/* Scrollable Content */}
              <div className="overflow-y-auto flex-1">
                {/* Hero Image */}
                <div className="relative h-64 sm:h-80 overflow-hidden">
                  <img
                    src={cause.imgSrc}
                    alt={cause.imgAlt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/30 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md text-white font-semibold px-3 py-1.5 rounded-full text-xs tracking-wide mb-3">
                      <CheckCircle2 size={13} className="text-teal-muted" />
                      Verified Program
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
                      {cause.title}
                    </h2>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-8 space-y-8">
                  {/* Quick Info Badges */}
                  <div className="flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-surface-dim rounded-xl text-navy font-semibold text-sm">
                      <MapPin size={15} className="text-teal" />
                      {cause.location}
                    </span>
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-surface-dim rounded-xl text-navy font-semibold text-sm">
                      <Calendar size={15} className="text-teal" />
                      Since {cause.startDate}
                    </span>
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-surface-dim rounded-xl text-navy font-semibold text-sm">
                      <Users size={15} className="text-teal" />
                      {cause.beneficiaries}
                    </span>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-bold text-navy mb-3">About This Program</h3>
                    <p className="text-text-secondary leading-relaxed">
                      {cause.longDescription}
                    </p>
                  </div>

                  {/* Progress */}
                  <div>
                    <h3 className="text-lg font-bold text-navy mb-4">Funding Progress</h3>
                    <div className="bg-surface-dim rounded-2xl p-5">
                      <div className="flex justify-between items-end mb-3">
                        <div>
                          <p className="text-3xl font-serif font-bold text-navy">{cause.raised}</p>
                          <p className="text-text-muted text-sm">raised of {cause.goal} goal</p>
                        </div>
                        <span className="text-2xl font-bold text-teal">{cause.percent}%</span>
                      </div>
                      <div className="w-full bg-white rounded-full h-3 overflow-hidden">
                        <motion.div
                          className="bg-gradient-to-r from-teal to-teal-light h-3 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${cause.percent}%` }}
                          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Key Milestones */}
                  <div>
                    <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
                      <Target size={18} className="text-teal" />
                      Key Milestones
                    </h3>
                    <div className="space-y-3">
                      {cause.milestones.map((milestone, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-teal/10 flex items-center justify-center shrink-0 mt-0.5">
                            <CheckCircle2 size={14} className="text-teal" />
                          </div>
                          <p className="text-text-secondary text-sm leading-relaxed">{milestone}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Impact Highlights */}
                  <div>
                    <h3 className="text-lg font-bold text-navy mb-4">Impact Highlights</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {cause.impact.map((item, i) => (
                        <div key={i} className="bg-surface-dim rounded-xl p-4">
                          <p className="text-navy font-semibold text-sm">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sticky Donate Footer */}
              <div className="border-t border-outline/10 p-5 sm:p-6 bg-white shrink-0">
                <button
                  onClick={() => {
                    onDonate(cause.title, cause.flotMerchant);
                    onClose();
                  }}
                  className="w-full py-4 bg-gold text-navy-dark rounded-xl font-bold text-lg hover:bg-gold-bright transition-all duration-300 cursor-pointer flex items-center justify-center gap-3"
                >
                  Donate to {cause.title}
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
