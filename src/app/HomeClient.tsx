"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import {
  ShieldCheck,
  BarChart3,
  Play,
  ArrowRight,
  CheckCircle2,
  Lock,
  Zap,
  Users,
  Target,
  Heart,
  Globe,
  Mail,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  Smartphone,
  Handshake,
  Building2,
  BadgeCheck,
  FileText,
  Send,
  Quote,
  Plus,
  Minus,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { DonateModal } from "@/components/DonateModal";
import { CauseDetailModal, type CauseDetail } from "@/components/CauseDetailModal";
import { FaqModal } from "@/components/FaqModal";

/* ─────────────────────────────────────────────
   ANIMATION VARIANTS
   ───────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

/* ─────────────────────────────────────────────
   ANIMATED COUNTER
   ───────────────────────────────────────────── */
function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = target;
    const step = Math.max(1, Math.floor(end / 80));
    const intervalMs = (duration * 1000) / (end / step);

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ─────────────────────────────────────────────
   SECTION WRAPPER WITH SCROLL REVEAL
   ───────────────────────────────────────────── */
function RevealSection({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeIn}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ─────────────────────────────────────────────
   PROGRAM CARD
   ───────────────────────────────────────────── */
function ProgramCard({
  title,
  description,
  raised,
  goal,
  percent,
  imgSrc,
  imgAlt,
  delay,
  onDonate,
}: {
  title: string;
  description: string;
  raised: string;
  goal: string;
  percent: number;
  imgSrc: string;
  imgAlt: string;
  delay: number;
  onDonate: (causeName: string) => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={delay}
      variants={fadeUp}
      className="group bg-surface-card rounded-2xl overflow-hidden shadow-ambient hover:shadow-ambient-lg transition-shadow duration-500 flex flex-col cursor-pointer"
    >
      <div className="h-64 relative overflow-hidden">
        <img
          src={imgSrc}
          alt={imgAlt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-md text-teal font-semibold px-3 py-1.5 rounded-full text-xs tracking-wide">
            <CheckCircle2 size={14} className="fill-teal text-white" />
            Verified
          </span>
        </div>
      </div>
      <div className="p-8 flex-grow flex flex-col">
        <h3 className="text-2xl font-serif font-bold text-navy mb-3 leading-tight">
          {title}
        </h3>
        <p className="text-text-secondary leading-relaxed mb-6 flex-grow">
          {description}
        </p>
        <div className="space-y-4">
          <div className="w-full bg-surface-dim rounded-full h-2 overflow-hidden">
            <motion.div
              className="bg-teal h-2 rounded-full"
              initial={{ width: 0 }}
              animate={inView ? { width: `${percent}%` } : { width: 0 }}
              transition={{
                duration: 1.5,
                delay: delay * 0.12 + 0.3,
                ease: "easeOut",
              }}
            />
          </div>
          <div className="flex justify-between text-sm font-semibold">
            <span className="text-navy">{raised} raised</span>
            <span className="text-text-muted">
              {percent}% of {goal}
            </span>
          </div>
          <button
            onClick={() => onDonate(title)}
            className="w-full py-3.5 bg-navy text-white rounded-xl font-bold hover:bg-navy-light transition-colors duration-300 cursor-pointer"
          >
            Donate to this Cause
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   BENTO CARD
   ───────────────────────────────────────────── */
function BentoCard({
  title,
  description,
  raised,
  goal,
  percent,
  imgSrc,
  imgAlt,
  delay,
  onDonate,
  flotMerchant,
  onClick,
  className = "",
  featured = false,
}: {
  title: string;
  description: string;
  raised: string;
  goal: string;
  percent: number;
  imgSrc: string;
  imgAlt: string;
  delay: number;
  onDonate: (causeName: string, flotMerchant?: string) => void;
  flotMerchant?: string;
  onClick?: () => void;
  className?: string;
  featured?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={delay}
      variants={fadeUp}
      onClick={onClick}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer ${className}`}
    >
      {/* Background Image */}
      <img
        src={imgSrc}
        alt={imgAlt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-6 lg:p-8">
        {/* Verified Badge */}
        <div className="absolute top-5 left-5">
          <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md text-white font-semibold px-3 py-1.5 rounded-full text-xs tracking-wide">
            <CheckCircle2 size={13} className="text-teal-muted" />
            Verified
          </span>
        </div>

        {/* Title & Description */}
        <h3 className={`font-serif font-bold text-white leading-tight mb-2 ${featured ? "text-3xl lg:text-4xl" : "text-xl lg:text-2xl"}`}>
          {title}
        </h3>
        {(featured || description) && (
          <p className={`text-white/60 leading-relaxed mb-4 ${featured ? "text-base max-w-md" : "text-sm line-clamp-2"}`}>
            {description}
          </p>
        )}

        {/* Progress + Donate */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex-grow bg-white/15 rounded-full h-1.5 overflow-hidden">
              <motion.div
                className="bg-gold h-1.5 rounded-full"
                initial={{ width: 0 }}
                animate={inView ? { width: `${percent}%` } : { width: 0 }}
                transition={{ duration: 1.5, delay: delay * 0.1 + 0.3, ease: "easeOut" }}
              />
            </div>
            <span className="text-white/50 text-xs font-semibold whitespace-nowrap">{percent}%</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-white/50 text-xs">
              <span className="text-white font-semibold">{raised}</span> of {goal}
            </span>
            <button
              onClick={(e) => { e.stopPropagation(); onDonate(title, flotMerchant); }}
              className={`bg-gold text-navy-dark font-bold rounded-full hover:bg-gold-bright transition-all duration-300 hover:scale-[0.97] cursor-pointer ${featured ? "px-6 py-2.5 text-sm" : "px-4 py-2 text-xs"}`}
            >
              Donate
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═════════════════════════════════════════════
   MAIN PAGE
   ═════════════════════════════════════════════ */
export type ProgramInput = CauseDetail & {
  className: string;
  featured?: boolean;
};

export default function HomeClient({ programs }: { programs: ProgramInput[] }) {
  const allPrograms = programs;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [donateCause, setDonateCause] = useState("");
  const [donateMerchant, setDonateMerchant] = useState("");
  const [causeDetailOpen, setCauseDetailOpen] = useState(false);
  const [selectedCause, setSelectedCause] = useState<CauseDetail | null>(null);
  const [faqModalOpen, setFaqModalOpen] = useState(false);

  const openDonateModal = (causeName: string, flotMerchant?: string) => {
    setDonateCause(causeName);
    setDonateMerchant(flotMerchant || causeName);
    setDonateModalOpen(true);
  };

  const openCauseDetail = (cause: CauseDetail) => {
    setSelectedCause(cause);
    setCauseDetailOpen(true);
  };


  /* Parallax for hero */
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  /* Navbar background on scroll */
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 60);
  });

  const navLinks = [
    { label: "Our Mission", href: "#mission" },
    { label: "Programs", href: "#programs" },
    { label: "Partner With Us", href: "#join" },
  ];

  return (
    <>
      {/* ───── NAVIGATION ───── */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled ? "glass shadow-ambient" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <Logo
              size={38}
              className={`transition-colors duration-300 ${
                scrolled ? "text-teal" : "text-gold"
              }`}
            />
            <span
              className={`text-xl font-serif font-bold tracking-tight transition-colors duration-300 ${
                scrolled ? "text-navy" : "text-white"
              }`}
            >
              Bridges of Hope
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-semibold tracking-wide transition-colors duration-300 hover:text-teal ${
                  scrolled
                    ? "text-text-secondary"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4">
            <a
              href="#programs"
              className="bg-gold text-navy-dark px-6 py-2.5 rounded-full font-bold text-sm hover:bg-gold-bright transition-all duration-300 hover:scale-[0.97] cursor-pointer shadow-sm"
            >
              Donate Now
            </a>
            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X
                  className={scrolled ? "text-navy" : "text-white"}
                  size={24}
                />
              ) : (
                <Menu
                  className={scrolled ? "text-navy" : "text-white"}
                  size={24}
                />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden glass border-t border-outline/10 px-6 py-6 space-y-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-navy font-semibold text-lg py-2"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </nav>

      {/* ───── HERO SECTION ───── */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden" style={{ position: "relative" }}>
        {/* Background Image with Parallax */}
        <motion.div style={{ y: heroImgY }} className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1920&q=80"
            alt="African children smiling together in warm sunlight"
            className="w-full h-[120%] object-cover"
          />
          <div className="absolute inset-0 hero-gradient opacity-75" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/40 via-transparent to-navy/60" />
        </motion.div>

        {/* Decorative Noise */}
        <div className="absolute inset-0 noise-overlay z-[1]" />

        {/* Hero Content */}
        <motion.div
          style={{ y: heroTextY, opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-40 pb-32 min-h-screen flex items-center"
        >
          <div className="max-w-3xl space-y-8">
            {/* Eyebrow */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-5 py-2 text-gold text-sm font-semibold tracking-wide"
            >
              <Globe size={16} />
              Verified Humanitarian Impact Since 2026
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-5xl sm:text-6xl lg:text-[5.5rem] font-serif font-bold text-white leading-[1.05] tracking-tight"
            >
              Empowering Change
              <br />
              <span className="text-gold">Through Verified</span>
              <br />
              Giving
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="text-xl text-white/70 max-w-xl leading-relaxed font-light"
            >
              Connecting your compassion with world-class transparency. We
              ensure every dollar you give reaches the hands that need it most.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="flex flex-wrap items-center gap-5 pt-4"
            >
              <a
                href="#programs"
                className="group inline-flex items-center gap-3 bg-gold text-navy-dark px-8 py-4 rounded-full font-bold text-lg hover:bg-gold-bright transition-all duration-300 hover:scale-[0.97] shadow-lg shadow-gold/20 cursor-pointer"
              >
                Start Your Donation
                <ArrowRight
                  size={20}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className="flex flex-wrap items-center gap-6 pt-8 border-t border-white/10"
            >
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <ShieldCheck size={18} className="text-teal-muted" />
                <span>256-bit Encryption</span>
              </div>
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <CheckCircle2 size={18} className="text-teal-muted" />
                <span>Flot Verified</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1.5 h-1.5 rounded-full bg-gold"
            />
          </div>
        </motion.div>
      </section>

      {/* ───── FLOT ADVANTAGE / TRANSPARENCY ───── */}
      <RevealSection className="py-28 lg:py-36 bg-surface" id="mission">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            {/* Text */}
            <div className="lg:w-1/2">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0}
              >
                <span className="inline-flex items-center gap-2 bg-teal-muted/30 text-teal font-bold text-xs tracking-widest uppercase px-4 py-2 rounded-full mb-8">
                  Powered by Flot Checkout
                </span>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={1}
                className="text-4xl lg:text-[3.25rem] font-serif font-bold text-navy leading-tight mb-8"
              >
                Accept Payments
                <br />
                <span className="text-teal">Globally. Instant Settlement.</span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={2}
                className="text-text-secondary text-lg leading-relaxed mb-10"
              >
                Every donation on Bridges of Hope is processed through{" "}
                <a
                  href="https://www.flotme.ai/business"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-teal hover:text-navy underline underline-offset-2 transition-colors duration-300"
                >
                  Flot Checkout
                </a>{" "}
                &ndash; a modern payment gateway built for African businesses.
                Accept Visa, Mastercard, Mobile Money, and more with PCI-DSS
                compliant security.
              </motion.p>

              <div className="space-y-8">
                {[
                  {
                    icon: ShieldCheck,
                    title: "Visa & Mastercard Acceptance",
                    desc: "Accept global payments securely via the world's most trusted networks across 150+ countries.",
                  },
                  {
                    icon: BarChart3,
                    title: "Mobile Money & Local Channels",
                    desc: "Orange Money, Afrimoney, Flot App, and WhatsApp payments — meet donors where they are.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={3 + i}
                    className="flex items-start gap-5"
                  >
                    <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center shrink-0">
                      <item.icon size={22} className="text-teal" />
                    </div>
                    <div>
                      <h4 className="font-bold text-navy text-lg mb-1">
                        {item.title}
                      </h4>
                      <p className="text-text-secondary leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Image Composition */}
            <motion.div
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:w-1/2 relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-ambient-lg rotate-2 hover:rotate-0 transition-transform duration-700">
                <img
                  src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=800&q=80"
                  alt="African man using his smartphone to make a mobile payment"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute -bottom-8 -left-4 lg:-left-8 bg-surface-card p-7 rounded-2xl shadow-ambient-lg max-w-[240px] -rotate-2"
              >
                <p className="font-serif font-bold text-4xl text-navy mb-1">
                  150+
                </p>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Countries supported with Visa, Mastercard &amp; Mobile Money.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </RevealSection>

      {/* ───── ACTIVE PROGRAMS — BENTO GRID ───── */}
      <RevealSection className="py-28 lg:py-36 bg-surface-dim" id="programs">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-16">
            <div>
              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-4xl lg:text-5xl font-serif font-bold text-navy mb-4"
              >
                Active Programs
              </motion.h2>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={1}
                className="text-text-secondary text-lg"
              >
                Choose a cause and make a verified impact in Sierra Leone.
              </motion.p>
            </div>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 auto-rows-[280px]">
            {allPrograms.map((program, i) => (
              <BentoCard
                key={program.title}
                title={program.title}
                description={program.description}
                raised={program.raised}
                goal={program.goal}
                percent={program.percent}
                imgSrc={program.imgSrc}
                imgAlt={program.imgAlt}
                delay={i}
                onDonate={openDonateModal}
                flotMerchant={program.flotMerchant}
                onClick={() => openCauseDetail(program)}
                className={program.className}
                featured={program.featured}
              />
            ))}
          </div>

        </div>
      </RevealSection>


      {/* ───── GET VERIFIED & JOIN ───── */}
      <section className="py-28 lg:py-36 bg-surface-dim" id="join">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="inline-flex items-center gap-2 bg-teal-muted/30 text-teal font-bold text-xs tracking-widest uppercase px-4 py-2 rounded-full mb-8">
              <Handshake size={14} />
              Partner With Us
            </span>
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-navy mb-5 leading-tight">
              Get Verified.
              <span className="text-teal"> Start Receiving Donations.</span>
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Whether you&apos;re a charity, NGO, social enterprise, or community organization &ndash;
              join Bridges of Hope to unlock verified donor trust and transparent fundraising.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left — Benefits & How It Works */}
            <div className="space-y-10">
              {/* Benefits */}
              <div className="space-y-6">
                {[
                  {
                    icon: BadgeCheck,
                    title: "Verified Trust Badge",
                    desc: "Earn the Bridges of Hope Verified badge on your cause page. Donors trust verified programs 4x more than unverified ones.",
                  },
                  {
                    icon: Globe,
                    title: "Global Donor Reach",
                    desc: "Tap into our network of international donors. Accept Visa, Mastercard, Mobile Money, and more through Flot Checkout.",
                  },
                  {
                    icon: BarChart3,
                    title: "Transparent Reporting Dashboard",
                    desc: "Track every donation in real time. Share verified milestones with your donors automatically through our platform.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Zero Platform Fees",
                    desc: "100% of every donation goes directly to your cause. We believe in impact, not intermediary costs.",
                  },
                ].map((benefit, i) => (
                  <motion.div
                    key={benefit.title}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i}
                    className="flex items-start gap-5 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center shrink-0 group-hover:bg-teal/20 transition-colors duration-300">
                      <benefit.icon size={22} className="text-teal" />
                    </div>
                    <div>
                      <h4 className="font-bold text-navy text-lg mb-1">{benefit.title}</h4>
                      <p className="text-text-secondary leading-relaxed text-sm">{benefit.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* How It Works Steps */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={4}
              >
                <h3 className="text-xl font-serif font-bold text-navy mb-6">How It Works</h3>
                <div className="flex flex-col gap-4">
                  {[
                    { step: "1", text: "Submit your organization details and cause information" },
                    { step: "2", text: "Our team reviews and verifies your mission and impact" },
                    { step: "3", text: "Get your Verified badge and start receiving donations" },
                  ].map((item) => (
                    <div key={item.step} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center shrink-0">
                        <span className="text-gold font-bold text-sm">{item.step}</span>
                      </div>
                      <p className="text-text-secondary font-medium">{item.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right — Contact / Application Card */}
            <motion.div
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-surface-card rounded-3xl shadow-ambient-lg p-8 md:p-10 relative overflow-hidden">
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-teal-muted/15 to-transparent rounded-tr-3xl" />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <Building2 size={24} className="text-teal" />
                    <h3 className="text-2xl font-serif font-bold text-navy">Apply to Join</h3>
                  </div>
                  <p className="text-text-muted text-sm mb-8">
                    Fill in your details and our partnerships team will reach out within 48 hours.
                  </p>

                  <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                    <div>
                      <label className="block text-navy font-semibold text-sm mb-2">Organization Name</label>
                      <input
                        type="text"
                        placeholder="e.g. AquaLife Foundation"
                        className="w-full px-4 py-3 bg-surface rounded-xl text-navy placeholder-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-navy font-semibold text-sm mb-2">Contact Email</label>
                      <input
                        type="email"
                        placeholder="you@organization.org"
                        className="w-full px-4 py-3 bg-surface rounded-xl text-navy placeholder-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-navy font-semibold text-sm mb-2">Organization Type</label>
                      <select className="w-full px-4 py-3 bg-surface rounded-xl text-navy text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 transition-all appearance-none cursor-pointer">
                        <option value="">Select your type</option>
                        <option value="charity">Registered Charity / NGO</option>
                        <option value="social-enterprise">Social Enterprise</option>
                        <option value="community">Community Organization</option>
                        <option value="religious">Faith-Based Organization</option>
                        <option value="school">School or Educational Institution</option>
                        <option value="health">Health Facility</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-navy font-semibold text-sm mb-2">Tell Us About Your Cause</label>
                      <textarea
                        rows={4}
                        placeholder="Describe your mission, the community you serve, and how donations will be used..."
                        className="w-full px-4 py-3 bg-surface rounded-xl text-navy placeholder-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 transition-all resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-4 bg-navy text-white rounded-xl font-bold text-lg hover:bg-navy-light transition-colors duration-300 cursor-pointer flex items-center justify-center gap-3"
                    >
                      <Send size={18} />
                      Submit Application
                    </button>
                  </form>

                  <div className="mt-6 pt-6 border-t border-outline/10 flex items-center gap-3">
                    <CheckCircle2 size={16} className="text-teal shrink-0" />
                    <p className="text-text-muted text-xs">
                      Applications are reviewed within 48 hours. Verification typically takes 5 &ndash; 7 business days.
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust Card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-6 bg-white p-5 rounded-2xl shadow-ambient-lg flex items-center gap-4"
              >
                <p className="font-serif font-bold text-3xl text-navy shrink-0">3</p>
                <p className="text-text-secondary text-xs leading-relaxed">
                  Verified organizations already receiving donations through our platform.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───── CTA BANNER ───── */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="hero-gradient rounded-[2rem] p-12 md:p-20 text-center relative overflow-hidden noise-overlay"
          >
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white mb-6 leading-tight">
                Join a Legacy of
                <span className="text-gold"> Verified Hope</span>
              </h2>
              <p className="text-white/60 text-lg max-w-xl mx-auto mb-10">
                Every contribution is tracked, verified, and celebrated. Be part
                of a movement that proves generosity works.
              </p>
              <div className="flex flex-wrap justify-center gap-5">
                <a
                  href="#programs"
                  className="inline-flex items-center gap-3 bg-gold text-navy-dark px-8 py-4 rounded-full font-bold text-lg hover:bg-gold-bright transition-all duration-300 hover:scale-[0.97] cursor-pointer"
                >
                  Make a Donation
                  <ArrowRight size={20} />
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 border-2 border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all duration-300 cursor-pointer"
                >
                  <Mail size={18} />
                  Stay Updated
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───── FOOTER ───── */}
      <footer className="bg-navy text-white/60 pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <Logo size={32} className="text-teal-muted" />
                <span className="text-xl font-serif font-bold text-white">
                  Bridges of Hope
                </span>
              </div>
              <p className="text-white/40 leading-relaxed text-sm mb-6">
                Connecting compassion with transparency. Every dollar tracked,
                every impact verified.
              </p>
              <div className="flex gap-4">
                {["X", "In", "Fb"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold/30 transition-all duration-300 text-xs font-bold cursor-pointer"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              {
                title: "Organization",
                links: [
                  "Our Mission",
                  "Annual Reports",
                  "Careers",
                ],
              },
              {
                title: "Support",
                links: [
                  "Contact Us",
                  "FAQ",
                  "Privacy Policy",
                  "Financial Transparency",
                ],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-bold text-white text-sm tracking-widest uppercase mb-6">
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      {link === "FAQ" ? (
                        <button
                          onClick={() => setFaqModalOpen(true)}
                          className="text-white/40 hover:text-gold text-sm transition-colors duration-300 cursor-pointer"
                        >
                          {link}
                        </button>
                      ) : (
                        <a
                          href="#"
                          className="text-white/40 hover:text-gold text-sm transition-colors duration-300 cursor-pointer"
                        >
                          {link}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/30 text-sm">
              &copy; 2026 Bridges of Hope. Verified by Flot. All rights
              reserved.
            </p>
            <p className="text-white/20 text-xs">
              A CSR of{" "}
              <a
                href="https://www.flotme.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-gold transition-colors duration-300 underline underline-offset-2"
              >
                Flot
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* ───── FAQ MODAL ───── */}
      <FaqModal
        isOpen={faqModalOpen}
        onClose={() => setFaqModalOpen(false)}
      />

      {/* ───── CAUSE DETAIL MODAL ───── */}
      <CauseDetailModal
        isOpen={causeDetailOpen}
        onClose={() => setCauseDetailOpen(false)}
        cause={selectedCause}
        onDonate={openDonateModal}
      />

      {/* ───── DONATE MODAL ───── */}
      <DonateModal
        isOpen={donateModalOpen}
        onClose={() => setDonateModalOpen(false)}
        causeName={donateCause}
        flotMerchant={donateMerchant}
      />
    </>
  );
}
