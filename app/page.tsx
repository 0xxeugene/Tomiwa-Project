"use client";

import React, { useState, useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";

import tomiwaImg from "../asset/tomiwa.jpg";
import img8432 from "../asset/IMG_8432.png";
import img8433 from "../asset/IMG_8433.png";
import img8434 from "../asset/IMG_8434.png";
import img8435 from "../asset/IMG_8435.png";
import img8436 from "../asset/IMG_8436.png";

type ThemeMode = "claude" | "openai";

interface LightboxState {
  src: StaticImageData;
  title: string;
}

const BIO_SEGMENTS = [
  {
    text: "Tomiwa designs across the spectrum of human trust—bridging enterprise scale and consumer nuance. During his tenure at ",
    underline: false,
  },
  { text: "Lotus Beta Analytics", underline: true },
  {
    text: ", he crafted complex digital solutions for telecommunications leaders ",
    underline: false,
  },
  { text: "MTN", underline: true },
  { text: " and ", underline: false },
  { text: "Airtel", underline: true },
  {
    text: ", as well as investment banking infrastructure at ",
    underline: false,
  },
  { text: "Alpha Morgan Capital", underline: true },
  {
    text: "—before taking the helm of research-driven product architecture at ",
    underline: false,
  },
  { text: "Klario Finance", underline: true },
  { text: ".", underline: false },
] as const;

const TOTAL_BIO_CHARS = BIO_SEGMENTS.reduce(
  (sum, seg) => sum + seg.text.length,
  0,
);

export default function PortfolioPage() {
  const [theme, setTheme] = useState<ThemeMode>("claude");
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const [copied, setCopied] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isRelationshipExpanded, setIsRelationshipExpanded] = useState(false);
  const [isMtnTravelExpanded, setIsMtnTravelExpanded] = useState(false);
  const [isMomoConfirmationExpanded, setIsMomoConfirmationExpanded] = useState(false);

  // Typewriter & Scroll-Lock State for Bio
  const bioRef = useRef<HTMLDivElement>(null);
  const [hasTriggeredTyping, setHasTriggeredTyping] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [isTypingDone, setIsTypingDone] = useState(false);

  const isDark = theme === "openai";

  // Scroll listener for bottom scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ESC key closes lightbox; any key or click during typing skips lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (hasTriggeredTyping && !isTypingDone) {
        setCharCount(TOTAL_BIO_CHARS);
        setIsTypingDone(true);
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hasTriggeredTyping, isTypingDone]);

  // Observer: triggers typewriter when bio scrolls into view
  useEffect(() => {
    const el = bioRef.current;
    if (!el || hasTriggeredTyping) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasTriggeredTyping) {
          setHasTriggeredTyping(true);
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasTriggeredTyping]);

  // Typewriter streaming and temporary scroll lock
  useEffect(() => {
    if (!hasTriggeredTyping || isTypingDone) return;

    // Smoothly lock user scroll during typing animation
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // Gentle auto-center into reading position
    bioRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

    const interval = setInterval(() => {
      setCharCount((prev) => {
        const next = prev + 3;
        if (next >= TOTAL_BIO_CHARS) {
          clearInterval(interval);
          setIsTypingDone(true);
          document.body.style.overflow = "";
          document.documentElement.style.overflow = "";
          return TOTAL_BIO_CHARS;
        }
        return next;
      });
    }, 20);

    // Guaranteed unlock safety timeout
    const safetyTimeout = setTimeout(() => {
      setIsTypingDone(true);
      setCharCount(TOTAL_BIO_CHARS);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }, 3200);

    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimeout);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [hasTriggeredTyping, isTypingDone]);

  const handleSkipTyping = () => {
    setCharCount(TOTAL_BIO_CHARS);
    setIsTypingDone(true);
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  };

  const copyEmail = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("awodokuntomiwa@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  let charsTracked = 0;
  const currentChars = hasTriggeredTyping ? charCount : 0;

  return (
    <div
      className={`min-h-screen transition-colors duration-700 ease-out font-sans ${
        isDark ? "bg-[#0A0A0A] text-[#EDEDED]" : "bg-[#FBFAF6] text-[#141413]"
      }`}
    >
      {/* Minimal Top Nav with Apple Glassmorphic Monochrome Switch */}
      <header className="px-6 sm:px-12 lg:px-20 pt-8 sm:pt-12 pb-6 animate-fade-in">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <a
            href="#top"
            className="text-sm font-medium tracking-tight hover:opacity-60 transition-opacity"
          >
            Oluwatomiwa Awodokun
          </a>

          <div className="flex items-center gap-4 sm:gap-6 text-xs">
            <a
              href="#philosophy"
              className="hidden sm:inline opacity-60 hover:opacity-100 transition-opacity"
            >
              Philosophy
            </a>
            <a
              href="mailto:awodokuntomiwa@gmail.com?subject=Let's%20discuss"
              className="hidden sm:inline opacity-60 hover:opacity-100 transition-opacity"
            >
              Inbox ↗
            </a>
            <a
              href="https://www.klario.finance/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline opacity-60 hover:opacity-100 transition-opacity"
            >
              Klario ↗
            </a>
            <a
              href="https://swiftlogwebsite.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline opacity-60 hover:opacity-100 transition-opacity"
            >
              SwiftLog ↗
            </a>

            {/* Apple Glassmorphic Minimalist Theme Switcher */}
            <button
              type="button"
              onClick={() => setTheme(isDark ? "claude" : "openai")}
              aria-label={
                isDark ? "Switch to light theme" : "Switch to dark theme"
              }
              className={`flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full backdrop-blur-2xl transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 shadow-sm ${
                isDark
                  ? "bg-white/[0.08] border border-white/[0.14] text-white hover:bg-white/[0.15] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]"
                  : "bg-black/[0.04] border border-black/[0.08] text-[#141413] hover:bg-black/[0.08] shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]"
              }`}
              title={isDark ? "Switch to Light mode" : "Switch to Dark mode"}
            >
              {isDark ? (
                <svg
                  className="w-4 h-4 transition-transform duration-300 rotate-0 hover:rotate-45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path
                    d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 transition-transform duration-300 -rotate-12 hover:rotate-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      <main id="top" className="px-6 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-6xl">
          {/* Hero Section — Clean Geist Typography with Tomiwa's Portrait */}
          <section className="pt-20 pb-20 sm:pt-28 sm:pb-28 lg:pt-36 lg:pb-36">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column: Introduction & CTAs */}
              <div className="lg:col-span-7 space-y-8 animate-fade-up">
                <span className="font-mono text-xs uppercase tracking-wider opacity-50 block">
                  Product Designer &amp; Researcher
                </span>

                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tighter leading-[1.05]">
                  Oluwatomiwa Awodokun.
                  <br />
                  <span className="font-normal opacity-60">
                    Quiet, high-trust digital systems.
                  </span>
                </h1>

                <p className="text-base sm:text-lg leading-relaxed font-normal opacity-80 max-w-xl">
                  Designing effortless human interfaces over deeply complex
                  infrastructure—from enterprise telecoms at{" "}
                  <strong className="font-medium text-current">
                    Lotus Beta Analytics
                  </strong>{" "}
                  to AI-driven open banking at{" "}
                  <strong className="font-medium text-current">
                    Klario Finance
                  </strong>
                  .
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3.5 text-xs font-mono">
                  <a
                    href="mailto:awodokuntomiwa@gmail.com?subject=Project%20Inquiry%20%E2%80%94%20Let's%20Discuss"
                    className={`rounded-full px-5 py-2.5 transition-all duration-300 hover:scale-[1.02] flex items-center gap-1.5 font-medium ${
                      isDark
                        ? "bg-[#EDEDED] text-[#0A0A0A] hover:bg-white"
                        : "bg-[#141413] text-[#FAF9F5] hover:bg-[#2B2B28]"
                    }`}
                  >
                    <span>Send me an inbox — let&apos;s discuss</span>
                    <span aria-hidden="true">↗</span>
                  </a>

                  <a
                    href="https://www.klario.finance/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`rounded-full border px-4 py-2.5 transition-all duration-300 hover:scale-[1.02] ${
                      isDark
                        ? "border-[#262624] hover:bg-[#1A1A18]"
                        : "border-[#E0DCD1] hover:bg-white"
                    }`}
                  >
                    klario.finance ↗
                  </a>

                  <a
                    href="https://swiftlogwebsite.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`rounded-full border px-4 py-2.5 transition-all duration-300 hover:scale-[1.02] ${
                      isDark
                        ? "border-[#262624] hover:bg-[#1A1A18]"
                        : "border-[#E0DCD1] hover:bg-white"
                    }`}
                  >
                    swiftlogwebsite.netlify.app ↗
                  </a>

                  <button
                    type="button"
                    onClick={copyEmail}
                    className="opacity-60 hover:opacity-100 transition-opacity px-2 py-2.5 cursor-pointer"
                  >
                    {copied ? "Copied ✓" : "Copy email"}
                  </button>
                </div>
              </div>

              {/* Right Column: Tomiwa's Portrait Image */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end animate-fade-up delay-1">
                <div
                  onClick={() =>
                    setLightbox({
                      src: tomiwaImg,
                      title:
                        "Oluwatomiwa Awodokun — Product Designer & Researcher",
                    })
                  }
                  className={`group relative overflow-hidden rounded-3xl border p-2 sm:p-2.5 transition-all duration-500 cursor-pointer hover:-translate-y-1 ${
                    isDark
                      ? "border-[#20201E] bg-[#121211] hover:border-[#383835] hover:shadow-2xl"
                      : "border-[#EAE7DC] bg-white hover:border-[#CCC7B8] hover:shadow-xl"
                  }`}
                >
                  <div className="overflow-hidden rounded-2xl relative w-[280px] sm:w-[320px] aspect-[3/4]">
                    <Image
                      src={tomiwaImg}
                      alt="Oluwatomiwa Awodokun — Product Designer & Researcher"
                      fill
                      sizes="(max-width: 768px) 280px, 320px"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      priority
                      placeholder="blur"
                    />
                  </div>

                  {/* Minimal subtle pill tag */}
                  <div className="pt-3 pb-1 px-2 flex items-center justify-between text-[11px] font-mono opacity-65">
                    <span>Oluwatomiwa Awodokun</span>
                    <span className="text-[10px] group-hover:translate-x-0.5 transition-transform">
                      View Full ↗
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================================
              ENTERPRISE BIO (MTN, Airtel, Alpha Morgan at Lotus Beta Analytics)
             ================================================================= */}
          <section
            ref={bioRef}
            onClick={
              hasTriggeredTyping && !isTypingDone ? handleSkipTyping : undefined
            }
            className="pb-32 sm:pb-44 lg:pb-56 max-w-4xl relative"
          >
            <div className="border-t border-current/10 pt-14 sm:pt-20">
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs uppercase tracking-wider opacity-50">
                  Background · Lotus Beta Analytics &amp; Enterprise Track
                </span>
                {hasTriggeredTyping && !isTypingDone && (
                  <button
                    type="button"
                    onClick={handleSkipTyping}
                    className="font-mono text-[10px] uppercase opacity-40 hover:opacity-100 transition-opacity cursor-pointer border border-current/20 rounded-full px-2.5 py-0.5"
                  >
                    Click to Skip ↵
                  </button>
                )}
              </div>

              {/* Dynamic Typewritten Text in Geist Typography */}
              <p className="text-xl sm:text-2xl lg:text-[28px] font-light leading-relaxed tracking-tight min-h-[140px]">
                {BIO_SEGMENTS.map((seg, idx) => {
                  const segStart = charsTracked;
                  charsTracked += seg.text.length;

                  if (currentChars <= segStart) {
                    return null;
                  }

                  const visibleSlice = seg.text.slice(
                    0,
                    currentChars - segStart,
                  );

                  if (seg.underline) {
                    return (
                      <span
                        key={idx}
                        className="font-normal underline decoration-current/30 underline-offset-4"
                      >
                        {visibleSlice}
                      </span>
                    );
                  }

                  return <span key={idx}>{visibleSlice}</span>;
                })}

                {/* Blinking insertion cursor while typing */}
                {hasTriggeredTyping && !isTypingDone && (
                  <span className="inline-block ml-0.5 animate-pulse text-[#D97757] font-sans font-bold">
                    ▍
                  </span>
                )}
              </p>

              {/* Enterprise Credentials Tags */}
              <div
                className={`mt-10 flex flex-wrap gap-2.5 text-xs font-mono transition-all duration-700 ${
                  isTypingDone
                    ? "opacity-65 translate-y-0"
                    : "opacity-0 translate-y-2 pointer-events-none"
                }`}
              >
                <span className="rounded-full border border-current/20 px-3 py-1 bg-current/5">
                  Lotus Beta Analytics (LBAN)
                </span>
                <span className="rounded-full border border-current/15 px-3 py-1">
                  MTN Enterprise
                </span>
                <span className="rounded-full border border-current/15 px-3 py-1">
                  Airtel Africa
                </span>
                <span className="rounded-full border border-current/15 px-3 py-1">
                  Alpha Morgan Capital
                </span>
                <span className="rounded-full border border-current/15 px-3 py-1">
                  Klario Finance
                </span>
                <span className="rounded-full border border-current/15 px-3 py-1">
                  SwiftLog
                </span>
              </div>
            </div>
          </section>

          {/* =========================================================
              WORKS & VISUAL ASSETS
             ========================================================= */}
          <div className="space-y-36 sm:space-y-48 lg:space-y-64 pb-36 sm:pb-48">
            {/* FEATURED CASE STUDY: AUTOMATION OF RELATIONSHIP LETTERS */}
            <section className="space-y-8">
              <div className="flex flex-wrap items-baseline justify-between gap-2 text-xs font-mono opacity-50">
                <span>01 / ENTERPRISE SYSTEM CASE STUDY</span>
                <span>FINTECH · ENTERPRISE UX · WORKFLOW AUTOMATION · INTERNAL BANKING SYSTEM</span>
              </div>

              <div
                className={`p-8 sm:p-12 lg:p-16 rounded-3xl border transition-all duration-500 ${
                  isDark
                    ? "border-[#20201E] bg-[#121211]"
                    : "border-[#EAE7DC] bg-white shadow-sm"
                }`}
              >
                {/* Executive Header & Immediate Hook */}
                <div className="max-w-4xl space-y-6">
                  <div className="inline-flex items-center gap-2 font-mono text-xs text-[#D97757]">
                    <span className="h-2 w-2 rounded-full bg-[#D97757]" />
                    <span>Internal Banking Infrastructure &amp; Core Banking Integration</span>
                  </div>

                  <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight leading-[1.12]">
                    Automation of Relationship Letters
                  </h2>

                  <p className="text-lg sm:text-xl font-normal leading-relaxed opacity-90 max-w-3xl">
                    I designed the experience strategy for an enterprise banking solution
                    that reimagines how customer relationship letters are requested, reviewed,
                    approved, and generated. By translating complex operational requirements
                    into structured, role-based workflows, the solution brings automation,
                    data integrity, and process transparency into a single centralized platform.
                  </p>

                  {/* 4 Quick Executive Scan Pillars */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                    <div
                      className={`p-4 rounded-2xl border text-xs ${
                        isDark ? "border-[#20201E] bg-[#171716]" : "border-[#EFECE4] bg-[#FAF9F5]"
                      }`}
                    >
                      <div className="font-mono text-[10px] uppercase opacity-50 mb-1">
                        01 / Core Integration
                      </div>
                      <div className="font-medium mb-1">Zero Manual Entry</div>
                      <div className="opacity-70 leading-relaxed text-[11px]">
                        Account numbers validate against core banking to auto-populate balances &amp; profiles.
                      </div>
                    </div>

                    <div
                      className={`p-4 rounded-2xl border text-xs ${
                        isDark ? "border-[#20201E] bg-[#171716]" : "border-[#EFECE4] bg-[#FAF9F5]"
                      }`}
                    >
                      <div className="font-mono text-[10px] uppercase opacity-50 mb-1">
                        02 / Governance
                      </div>
                      <div className="font-medium mb-1">Maker-Checker Routing</div>
                      <div className="opacity-70 leading-relaxed text-[11px]">
                        Dynamic multi-tier approvals with segregated authority and mandatory decision notes.
                      </div>
                    </div>

                    <div
                      className={`p-4 rounded-2xl border text-xs ${
                        isDark ? "border-[#20201E] bg-[#171716]" : "border-[#EFECE4] bg-[#FAF9F5]"
                      }`}
                    >
                      <div className="font-mono text-[10px] uppercase opacity-50 mb-1">
                        03 / Document Engine
                      </div>
                      <div className="font-medium mb-1">Automated PDF &amp; Seal</div>
                      <div className="opacity-70 leading-relaxed text-[11px]">
                        Instant debit validation, central signature repository, and automated letter generation.
                      </div>
                    </div>

                    <div
                      className={`p-4 rounded-2xl border text-xs ${
                        isDark ? "border-[#20201E] bg-[#171716]" : "border-[#EFECE4] bg-[#FAF9F5]"
                      }`}
                    >
                      <div className="font-mono text-[10px] uppercase opacity-50 mb-1">
                        04 / Compliance
                      </div>
                      <div className="font-medium mb-1">End-to-End Audit Trail</div>
                      <div className="opacity-70 leading-relaxed text-[11px]">
                        Complete request history, real-time SLA tracking, and immutable regulatory records.
                      </div>
                    </div>
                  </div>

                  {/* Interactive Accordion Trigger Button */}
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => setIsRelationshipExpanded(!isRelationshipExpanded)}
                      className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs font-mono transition-all duration-300 cursor-pointer ${
                        isDark
                          ? "bg-white/[0.08] border border-white/[0.14] text-white hover:bg-white/[0.16]"
                          : "bg-[#141413] text-[#FAF9F5] hover:bg-[#2B2B28]"
                      }`}
                    >
                      <span>
                        {isRelationshipExpanded
                          ? "Collapse Case Study ▴"
                          : "Read Full Enterprise Case Study (Problem · Approach · 6-Pillar Architecture · Impact) ▾"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* =========================================================
                    EXPANDABLE DEEP-DIVE (Progressive Disclosure)
                   ========================================================= */}
                {isRelationshipExpanded && (
                  <div className="mt-12 pt-12 border-t border-current/10 space-y-16 animate-fade-in text-sm leading-relaxed">
                    {/* SECTION 1: THE PROBLEM */}
                    <div className="space-y-6">
                      <div className="font-mono text-xs uppercase tracking-wider text-[#D97757]">
                        01 / The Operational Problem
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                        Manual Friction &amp; Operational Silos
                      </h3>
                      <p className="opacity-80 max-w-3xl">
                        The existing relationship letter process was heavily dependent on manual coordination,
                        making what should be a straightforward banking operation unnecessarily complex.
                        Customer Service Officers, reviewers, and approvers relied on fragmented email threads,
                        creating operational friction, compliance vulnerabilities, and zero audit visibility.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                        <div className={`p-5 rounded-2xl border ${isDark ? "border-[#20201E] bg-[#161615]" : "border-[#EFECE4] bg-[#FAF9F5]"}`}>
                          <div className="font-semibold mb-1">1. Fragmented Workflows</div>
                          <p className="text-xs opacity-75 leading-relaxed">
                            Requests initiated via informal emails, making it difficult to maintain standard SLAs or track pending bottlenecks.
                          </p>
                        </div>
                        <div className={`p-5 rounded-2xl border ${isDark ? "border-[#20201E] bg-[#161615]" : "border-[#EFECE4] bg-[#FAF9F5]"}`}>
                          <div className="font-semibold mb-1">2. Repetitive Manual Data Entry</div>
                          <p className="text-xs opacity-75 leading-relaxed">
                            Account numbers and balances manually retyped, introducing acute risk of erroneous financial figures on bank letterheads.
                          </p>
                        </div>
                        <div className={`p-5 rounded-2xl border ${isDark ? "border-[#20201E] bg-[#161615]" : "border-[#EFECE4] bg-[#FAF9F5]"}`}>
                          <div className="font-semibold mb-1">3. Zero Workflow Transparency</div>
                          <p className="text-xs opacity-75 leading-relaxed">
                            No central tracking. CSOs had zero visibility into whose desk held a request or why an authorization was delayed.
                          </p>
                        </div>
                        <div className={`p-5 rounded-2xl border ${isDark ? "border-[#20201E] bg-[#161615]" : "border-[#EFECE4] bg-[#FAF9F5]"}`}>
                          <div className="font-semibold mb-1">4. Complex Approval Dependencies</div>
                          <p className="text-xs opacity-75 leading-relaxed">
                            Different letter categories required different signing powers. Managing these routing matrices manually created heavy overhead.
                          </p>
                        </div>
                        <div className={`p-5 rounded-2xl border ${isDark ? "border-[#20201E] bg-[#161615]" : "border-[#EFECE4] bg-[#FAF9F5]"}`}>
                          <div className="font-semibold mb-1">5. Compliance &amp; Audit Risks</div>
                          <p className="text-xs opacity-75 leading-relaxed">
                            Absence of immutable audit logs and maker-checker validation created serious regulatory and accountability exposure.
                          </p>
                        </div>
                        <div className={`p-5 rounded-2xl border ${isDark ? "border-[#20201E] bg-[#161615]" : "border-[#EFECE4] bg-[#FAF9F5]"}`}>
                          <div className="font-semibold mb-1">6. Inefficient Document Lifecycle</div>
                          <p className="text-xs opacity-75 leading-relaxed">
                            Printing, physical signing, scanning, and distributing letters caused delays and inconsistent template outputs across branches.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* SECTION 2: THE DESIGN APPROACH */}
                    <div className="space-y-6">
                      <div className="font-mono text-xs uppercase tracking-wider text-[#10A37F]">
                        02 / The Design Approach
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                        Simplifying Complexity Without Compromising Governance
                      </h3>
                      <p className="opacity-80 max-w-3xl">
                        Rather than treating each function as an isolated feature, I approached the system as an
                        interconnected workflow ecosystem. Every user action, system response, and approval decision
                        fits into a predictable, zero-friction experience:
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div className="space-y-1.5 p-4 rounded-xl border border-current/10">
                          <span className="font-semibold text-xs uppercase tracking-wider opacity-60">Workflow Simplification</span>
                          <p className="text-xs opacity-80">Structured the full lifecycle into sequential, transparent stages: initiation, review, approval, generation, archiving.</p>
                        </div>
                        <div className="space-y-1.5 p-4 rounded-xl border border-current/10">
                          <span className="font-semibold text-xs uppercase tracking-wider opacity-60">Role-Based UX</span>
                          <p className="text-xs opacity-80">Custom workspaces tailored specifically for CSOs, Reviewers, Approvers, System Admins, and Internal Auditors.</p>
                        </div>
                        <div className="space-y-1.5 p-4 rounded-xl border border-current/10">
                          <span className="font-semibold text-xs uppercase tracking-wider opacity-60">Progressive Disclosure</span>
                          <p className="text-xs opacity-80">Presenting only fields relevant to the selected letter type, eliminating cognitive overload and misconfigurations.</p>
                        </div>
                        <div className="space-y-1.5 p-4 rounded-xl border border-current/10">
                          <span className="font-semibold text-xs uppercase tracking-wider opacity-60">Exception Handling</span>
                          <p className="text-xs opacity-80">Designed fail-safe states for frozen accounts, debit failures, invalid signatures, and returned requests with required context.</p>
                        </div>
                      </div>
                    </div>

                    {/* SECTION 3: THE 6-PILLAR SOLUTION ARCHITECTURE */}
                    <div className="space-y-6">
                      <div className="font-mono text-xs uppercase tracking-wider text-[#D97757]">
                        03 / The Solution Architecture
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                        6 Strategic Pillars of the Centralized Platform
                      </h3>

                      <div className="space-y-4 pt-2">
                        <div className={`p-6 rounded-2xl border ${isDark ? "border-[#20201E] bg-[#161615]" : "border-[#EFECE4] bg-[#FAF9F5]"}`}>
                          <div className="font-semibold text-base mb-1">1. Intelligent Request Initiation &amp; Core Bank Validation</div>
                          <p className="text-xs opacity-80 leading-relaxed">
                            CSOs enter only the customer account number. The platform validates against core banking services in real time, auto-retrieving account standing, currency, and balances, eliminating manual transcription.
                          </p>
                        </div>

                        <div className={`p-6 rounded-2xl border ${isDark ? "border-[#20201E] bg-[#161615]" : "border-[#EFECE4] bg-[#FAF9F5]"}`}>
                          <div className="font-semibold text-base mb-1">2. Structured Approval Routing &amp; Maker-Checker Integrity</div>
                          <p className="text-xs opacity-80 leading-relaxed">
                            Configurable routing ensures requests automatically find the appropriate authorities based on letter category and risk tier. Approvers can approve, reject, or return with mandatory contextual audit comments.
                          </p>
                        </div>

                        <div className={`p-6 rounded-2xl border ${isDark ? "border-[#20201E] bg-[#161615]" : "border-[#EFECE4] bg-[#FAF9F5]"}`}>
                          <div className="font-semibold text-base mb-1">3. Automated Document Engine &amp; Digital Signatures</div>
                          <p className="text-xs opacity-80 leading-relaxed">
                            Following successful fee debit and approval clearance, the system renders standardized, tamper-evident relationship letters. Pre-approved authorized officer signatures are retrieved from a secure cryptographic vault.
                          </p>
                        </div>

                        <div className={`p-6 rounded-2xl border ${isDark ? "border-[#20201E] bg-[#161615]" : "border-[#EFECE4] bg-[#FAF9F5]"}`}>
                          <div className="font-semibold text-base mb-1">4. Real-Time Workflow Visibility &amp; Telemetry</div>
                          <p className="text-xs opacity-80 leading-relaxed">
                            Automated status webhooks notify all stakeholders at every transition (submission, review, correction, release). Eliminates manual phone and email follow-ups across regional branches.
                          </p>
                        </div>

                        <div className={`p-6 rounded-2xl border ${isDark ? "border-[#20201E] bg-[#161615]" : "border-[#EFECE4] bg-[#FAF9F5]"}`}>
                          <div className="font-semibold text-base mb-1">5. Secure Administration &amp; Conflict Prevention</div>
                          <p className="text-xs opacity-80 leading-relaxed">
                            Strict segregation of duties enforced by software. Users cannot approve their own requests, and role promotions require dual administrative sign-off.
                          </p>
                        </div>

                        <div className={`p-6 rounded-2xl border ${isDark ? "border-[#20201E] bg-[#161615]" : "border-[#EFECE4] bg-[#FAF9F5]"}`}>
                          <div className="font-semibold text-base mb-1">6. Centralized Document Archiving &amp; Audit Logs</div>
                          <p className="text-xs opacity-80 leading-relaxed">
                            All generated documents, timestamped approval histories, and fee debits are archived in a secure, searchable vault for ongoing regulatory, audit, and operational compliance.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* SECTION 4: DESIGN IMPACT */}
                    <div className="space-y-6">
                      <div className="font-mono text-xs uppercase tracking-wider text-[#10A37F]">
                        04 / Enterprise Impact
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                        Tangible Operational &amp; Governance Outcomes
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div className="p-4 rounded-xl border border-current/10 text-xs space-y-1">
                          <span className="font-semibold">Vastly Reduced Turnaround Times</span>
                          <p className="opacity-75">Replaced days of asynchronous email ping-pong with structured real-time routing.</p>
                        </div>
                        <div className="p-4 rounded-xl border border-current/10 text-xs space-y-1">
                          <span className="font-semibold">Zero Transcription Errors</span>
                          <p className="opacity-75">Core banking automation guarantees 100% financial data accuracy on every letter.</p>
                        </div>
                        <div className="p-4 rounded-xl border border-current/10 text-xs space-y-1">
                          <span className="font-semibold">Watertight Internal Controls</span>
                          <p className="opacity-75">Enforced maker-checker segregation prevents unauthorized or conflicting actions.</p>
                        </div>
                        <div className="p-4 rounded-xl border border-current/10 text-xs space-y-1">
                          <span className="font-semibold">Auditable Compliance Peace of Mind</span>
                          <p className="opacity-75">Instant audit retrieval and verifiable signature logs satisfy stringent bank regulations.</p>
                        </div>
                      </div>

                      <div className="pt-6">
                        <button
                          type="button"
                          onClick={() => setIsRelationshipExpanded(false)}
                          className="font-mono text-xs text-[#D97757] hover:underline cursor-pointer"
                        >
                          Collapse Case Study ▴
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* FEATURED CASE STUDY 02: MTN TRAVEL SELF-SERVICE PLATFORM */}
            <section className="space-y-8">
              <div className="flex flex-wrap items-baseline justify-between gap-2 text-xs font-mono opacity-50">
                <span>02 / ENTERPRISE SYSTEM CASE STUDY</span>
                <span>ENTERPRISE UX · TRAVEL MANAGEMENT · AI-ASSISTED · WORKFLOW AUTOMATION</span>
              </div>

              <div
                className={`p-8 sm:p-12 lg:p-16 rounded-3xl border transition-all duration-500 ${
                  isDark
                    ? "border-[#20201E] bg-[#121211]"
                    : "border-[#EAE7DC] bg-white shadow-sm"
                }`}
              >
                {/* Executive Header & Immediate Hook */}
                <div className="max-w-4xl space-y-6">
                  <div className="inline-flex items-center gap-2 font-mono text-xs text-[#10A37F]">
                    <span className="h-2 w-2 rounded-full bg-[#10A37F]" />
                    <span>MTN Telecommunications · Lotus Beta Analytics</span>
                  </div>

                  <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight leading-[1.12]">
                    MTN Travel Self-Service (TSS) Platform
                  </h2>

                  <p className="text-xs font-mono uppercase tracking-wider opacity-60">
                    Reimagining Corporate Travel Through Intelligent Self-Service
                  </p>

                  <p className="text-lg sm:text-xl font-normal leading-relaxed opacity-90 max-w-3xl">
                    I designed the experience strategy for an enterprise travel management platform
                    that simplifies how employees plan, request, and manage business travel. The project
                    focused on transforming complex, approval-heavy administrative processes into a unified,
                    intelligent, and policy-driven digital experience. By combining AI-assisted travel
                    recommendations, dynamic request flows, automated approval orchestration, and real-time
                    operational dashboards, the solution bridges the gap between employee convenience and
                    enterprise governance.
                  </p>

                  {/* 4 Quick Executive Scan Pillars */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                    <div
                      className={`p-4 rounded-2xl border text-xs ${
                        isDark ? "border-[#20201E] bg-[#171716]" : "border-[#EFECE4] bg-[#FAF9F5]"
                      }`}
                    >
                      <div className="font-mono text-[10px] uppercase opacity-50 mb-1">
                        01 / AI Recommender
                      </div>
                      <div className="font-medium mb-1">Policy-Ranked Options</div>
                      <div className="opacity-70 leading-relaxed text-[11px]">
                        Flights and hotels auto-scored by duration, employee grade limits, and company budget.
                      </div>
                    </div>

                    <div
                      className={`p-4 rounded-2xl border text-xs ${
                        isDark ? "border-[#20201E] bg-[#171716]" : "border-[#EFECE4] bg-[#FAF9F5]"
                      }`}
                    >
                      <div className="font-mono text-[10px] uppercase opacity-50 mb-1">
                        02 / Conditional Forms
                      </div>
                      <div className="font-medium mb-1">Progressive Disclosure</div>
                      <div className="opacity-70 leading-relaxed text-[11px]">
                        Dynamic forms adapt to road trips, group travelers, trip extensions, and visa requests.
                      </div>
                    </div>

                    <div
                      className={`p-4 rounded-2xl border text-xs ${
                        isDark ? "border-[#20201E] bg-[#171716]" : "border-[#EFECE4] bg-[#FAF9F5]"
                      }`}
                    >
                      <div className="font-mono text-[10px] uppercase opacity-50 mb-1">
                        03 / Orchestration
                      </div>
                      <div className="font-medium mb-1">Hierarchy Workflows</div>
                      <div className="opacity-70 leading-relaxed text-[11px]">
                        Departmental and division-based routing with delegated sign-off and automated reminders.
                      </div>
                    </div>

                    <div
                      className={`p-4 rounded-2xl border text-xs ${
                        isDark ? "border-[#20201E] bg-[#171716]" : "border-[#EFECE4] bg-[#FAF9F5]"
                      }`}
                    >
                      <div className="font-mono text-[10px] uppercase opacity-50 mb-1">
                        04 / Safety Sync
                      </div>
                      <div className="font-medium mb-1">Control Room (CRMS)</div>
                      <div className="opacity-70 leading-relaxed text-[11px]">
                        Real-time transit awareness and security coordination for staff in transit or high-risk areas.
                      </div>
                    </div>
                  </div>

                  {/* Interactive Accordion Trigger Button */}
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => setIsMtnTravelExpanded(!isMtnTravelExpanded)}
                      className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs font-mono transition-all duration-300 cursor-pointer ${
                        isDark
                          ? "bg-white/[0.08] border border-white/[0.14] text-white hover:bg-white/[0.16]"
                          : "bg-[#141413] text-[#FAF9F5] hover:bg-[#2B2B28]"
                      }`}
                    >
                      <span>
                        {isMtnTravelExpanded
                          ? "Collapse Case Study ▴"
                          : "Read Full Enterprise Case Study (Problem · Strategy · 7-Pillar Architecture · Impact) ▾"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* =========================================================
                    EXPANDABLE DEEP-DIVE (MTN TRAVEL PLATFORM)
                   ========================================================= */}
                {isMtnTravelExpanded && (
                  <div className="mt-12 pt-12 border-t border-current/10 space-y-16 animate-fade-in text-sm leading-relaxed">
                    {/* SECTION 1: THE PROBLEM */}
                    <div className="space-y-6">
                      <div className="font-mono text-xs uppercase tracking-wider text-[#D97757]">
                        01 / The Operational Problem
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                        Administrative Bottlenecks in Corporate Mobility
                      </h3>
                      <p className="opacity-80 max-w-3xl">
                        Corporate travel across a telecommunications enterprise of MTN’s scale involves multiple
                        departments, approval hierarchies, strict policy restrictions, and security dependencies.
                        The legacy process suffered from seven major pain points:
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                        <div className={`p-5 rounded-2xl border ${isDark ? "border-[#20201E] bg-[#161615]" : "border-[#EFECE4] bg-[#FAF9F5]"}`}>
                          <div className="font-semibold mb-1">1. Fragmented Request Experience</div>
                          <p className="text-xs opacity-75 leading-relaxed">
                            Staff had to navigate disjointed administrative channels to book, modify, or track trips.
                          </p>
                        </div>
                        <div className={`p-5 rounded-2xl border ${isDark ? "border-[#20201E] bg-[#161615]" : "border-[#EFECE4] bg-[#FAF9F5]"}`}>
                          <div className="font-semibold mb-1">2. Complex Approval Dependencies</div>
                          <p className="text-xs opacity-75 leading-relaxed">
                            Approvals varied by division, department, and job grade, introducing manual approval gridlocks.
                          </p>
                        </div>
                        <div className={`p-5 rounded-2xl border ${isDark ? "border-[#20201E] bg-[#161615]" : "border-[#EFECE4] bg-[#FAF9F5]"}`}>
                          <div className="font-semibold mb-1">3. Zero Planning Intelligence</div>
                          <p className="text-xs opacity-75 leading-relaxed">
                            No central tool for discovering flights or comparing hotels against company policy limits.
                          </p>
                        </div>
                        <div className={`p-5 rounded-2xl border ${isDark ? "border-[#20201E] bg-[#161615]" : "border-[#EFECE4] bg-[#FAF9F5]"}`}>
                          <div className="font-semibold mb-1">4. Opaque Entitlements &amp; Per Diems</div>
                          <p className="text-xs opacity-75 leading-relaxed">
                            Per diems, accommodation caps, and daily allowances were not clearly visible at request time.
                          </p>
                        </div>
                        <div className={`p-5 rounded-2xl border ${isDark ? "border-[#20201E] bg-[#161615]" : "border-[#EFECE4] bg-[#FAF9F5]"}`}>
                          <div className="font-semibold mb-1">5. Administrative Inefficiencies</div>
                          <p className="text-xs opacity-75 leading-relaxed">
                            HR and Finance lacked tools to monitor live expenditure, divisional budgets, and trip allocations.
                          </p>
                        </div>
                        <div className={`p-5 rounded-2xl border ${isDark ? "border-[#20201E] bg-[#161615]" : "border-[#EFECE4] bg-[#FAF9F5]"}`}>
                          <div className="font-semibold mb-1">6. Staff Safety Coordination Risks</div>
                          <p className="text-xs opacity-75 leading-relaxed">
                            Control rooms lacked structured itinerary data for staff traveling through transit corridors or volatile regions.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* SECTION 2: THE DESIGN STRATEGY */}
                    <div className="space-y-6">
                      <div className="font-mono text-xs uppercase tracking-wider text-[#10A37F]">
                        02 / The Design Strategy
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                        Systems-Thinking Over Digital Forms
                      </h3>
                      <p className="opacity-80 max-w-3xl">
                        Rather than digitizing a static travel form, I designed the product as an interconnected
                        corporate mobility ecosystem:
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div className="space-y-1.5 p-4 rounded-xl border border-current/10">
                          <span className="font-semibold text-xs uppercase tracking-wider opacity-60">Workflow Stage Simplification</span>
                          <p className="text-xs opacity-80">Decomposed the trip journey into clear sequential phases: intent, smart discovery, policy validation, approval, and dispatch.</p>
                        </div>
                        <div className="space-y-1.5 p-4 rounded-xl border border-current/10">
                          <span className="font-semibold text-xs uppercase tracking-wider opacity-60">Embedded Policy by Design</span>
                          <p className="text-xs opacity-80">Enforced grade-based budget ceilings and allowable airlines directly inside the UI, eliminating policy guesswork.</p>
                        </div>
                        <div className="space-y-1.5 p-4 rounded-xl border border-current/10">
                          <span className="font-semibold text-xs uppercase tracking-wider opacity-60">Contextual Progressive Disclosure</span>
                          <p className="text-xs opacity-80">Only shows fields pertinent to the trip (e.g. selecting accommodation as N/A cleanly collapses lodging inputs).</p>
                        </div>
                        <div className="space-y-1.5 p-4 rounded-xl border border-current/10">
                          <span className="font-semibold text-xs uppercase tracking-wider opacity-60">Edge-Case Resiliency</span>
                          <p className="text-xs opacity-80">Native support for delegated executive assistants, group delegations, sudden trip extensions, and consular visa routing.</p>
                        </div>
                      </div>
                    </div>

                    {/* SECTION 3: THE 7-PILLAR SOLUTION ARCHITECTURE */}
                    <div className="space-y-6">
                      <div className="font-mono text-xs uppercase tracking-wider text-[#D97757]">
                        03 / The Solution Architecture
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                        7 Core Capabilities of the MTN TSS Ecosystem
                      </h3>

                      <div className="space-y-4 pt-2">
                        <div className={`p-6 rounded-2xl border ${isDark ? "border-[#20201E] bg-[#161615]" : "border-[#EFECE4] bg-[#FAF9F5]"}`}>
                          <div className="font-semibold text-base mb-1">1. Centralized Employee Self-Service</div>
                          <p className="text-xs opacity-80 leading-relaxed">
                            A single portal handling domestic flights, international journeys, road trips, accommodation-only bookings, trip extensions, and delegated requests on behalf of team members.
                          </p>
                        </div>

                        <div className={`p-6 rounded-2xl border ${isDark ? "border-[#20201E] bg-[#161615]" : "border-[#EFECE4] bg-[#FAF9F5]"}`}>
                          <div className="font-semibold text-base mb-1">2. AI-Powered Travel Recommendations</div>
                          <p className="text-xs opacity-80 leading-relaxed">
                            Flight options ranked dynamically by cost, travel duration, and corporate policy compliance. Features smart date shifting for cost savings, per-diem transparency, and clear badges for MTN-audited hotels.
                          </p>
                        </div>

                        <div className={`p-6 rounded-2xl border ${isDark ? "border-[#20201E] bg-[#161615]" : "border-[#EFECE4] bg-[#FAF9F5]"}`}>
                          <div className="font-semibold text-base mb-1">3. Dynamic &amp; Conditional Request Forms</div>
                          <p className="text-xs opacity-80 leading-relaxed">
                            Interactive form logic that responds to employee choices: international trips trigger passport upload modals; multi-traveler trips aggregate individual traveler allotments into a single master request.
                          </p>
                        </div>

                        <div className={`p-6 rounded-2xl border ${isDark ? "border-[#20201E] bg-[#161615]" : "border-[#EFECE4] bg-[#FAF9F5]"}`}>
                          <div className="font-semibold text-base mb-1">4. Automated Hierarchy-Based Approvals</div>
                          <p className="text-xs opacity-80 leading-relaxed">
                            Intelligent routing through departmental managers, divisional heads, and financial controllers with delegated approver support, mandatory decision comments, and SLA reminder webhooks.
                          </p>
                        </div>

                        <div className={`p-6 rounded-2xl border ${isDark ? "border-[#20201E] bg-[#161615]" : "border-[#EFECE4] bg-[#FAF9F5]"}`}>
                          <div className="font-semibold text-base mb-1">5. Administrative &amp; Financial Intelligence Dashboards</div>
                          <p className="text-xs opacity-80 leading-relaxed">
                            Real-time analytics for Finance and HR tracking divisional spend, per-diem distributions, top corporate corridors, and pending approvals with exportable Excel, CSV, and PDF reports.
                          </p>
                        </div>

                        <div className={`p-6 rounded-2xl border ${isDark ? "border-[#20201E] bg-[#161615]" : "border-[#EFECE4] bg-[#FAF9F5]"}`}>
                          <div className="font-semibold text-base mb-1">6. Travel Safety &amp; Control Room (CRMS) Integration</div>
                          <p className="text-xs opacity-80 leading-relaxed">
                            Synchronizes travel routes, transit dates, and emergency contacts with MTN’s Control Room Management System to provide operational security awareness without intrusive GPS monitoring.
                          </p>
                        </div>

                        <div className={`p-6 rounded-2xl border ${isDark ? "border-[#20201E] bg-[#161615]" : "border-[#EFECE4] bg-[#FAF9F5]"}`}>
                          <div className="font-semibold text-base mb-1">7. Integrated Visa &amp; Immigration Assistance</div>
                          <p className="text-xs opacity-80 leading-relaxed">
                            Integrated workflows for requesting business introduction letters, consular invitations, and immigration queries directly to immigration desks, unifying all cross-border preparations.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* SECTION 4: DESIGN IMPACT */}
                    <div className="space-y-6">
                      <div className="font-mono text-xs uppercase tracking-wider text-[#10A37F]">
                        04 / Enterprise Impact
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                        Transforming Corporate Mobility at Scale
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div className="p-4 rounded-xl border border-current/10 text-xs space-y-1">
                          <span className="font-semibold">Frictionless Employee Experience</span>
                          <p className="opacity-75">Compressed corporate booking times from days of back-and-forth emails into minutes.</p>
                        </div>
                        <div className="p-4 rounded-xl border border-current/10 text-xs space-y-1">
                          <span className="font-semibold">Automated Policy Enforcement</span>
                          <p className="opacity-75">Eliminated non-compliant out-of-policy bookings through automated grade validations.</p>
                        </div>
                        <div className="p-4 rounded-xl border border-current/10 text-xs space-y-1">
                          <span className="font-semibold">Real-Time Fiscal Oversight</span>
                          <p className="opacity-75">Enabled Finance &amp; HR to monitor divisional travel budgets and forecast quarterly costs.</p>
                        </div>
                        <div className="p-4 rounded-xl border border-current/10 text-xs space-y-1">
                          <span className="font-semibold">Elevated Duty of Care</span>
                          <p className="opacity-75">Security and Control Room teams maintain full operational awareness of traveling personnel.</p>
                        </div>
                      </div>

                      <div className="pt-6">
                        <button
                          type="button"
                          onClick={() => setIsMtnTravelExpanded(false)}
                          className="font-mono text-xs text-[#10A37F] hover:underline cursor-pointer"
                        >
                          Collapse Case Study ▴
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* FEATURED CASE STUDY 03: MOMOPSB EMPLOYEE CONFIRMATION */}
            <section className="space-y-8">
              <div className="flex flex-wrap items-baseline justify-between gap-2 text-xs font-mono opacity-50">
                <span>03 / ENTERPRISE SYSTEM CASE STUDY</span>
                <span>ENTERPRISE UX · HR TECHNOLOGY · WORKFLOW AUTOMATION</span>
              </div>

              <div
                className={`p-8 sm:p-12 lg:p-16 rounded-3xl border transition-all duration-500 ${
                  isDark
                    ? "border-[#20201E] bg-[#121211]"
                    : "border-[#EAE7DC] bg-white shadow-sm"
                }`}
              >
                {/* Executive Header & Immediate Hook */}
                <div className="max-w-4xl space-y-6">
                  <div className="inline-flex items-center gap-2 font-mono text-xs text-[#D97757]">
                    <span className="h-2 w-2 rounded-full bg-[#D97757]" />
                    <span>MoMo Payment Service Bank (MoMoPSB) · Lotus Beta Analytics</span>
                  </div>

                  <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight leading-[1.12]">
                    MoMoPSB Employee Confirmation
                  </h2>

                  <p className="text-xs font-mono uppercase tracking-wider opacity-60">
                    Digitizing the Employee Confirmation Lifecycle
                  </p>

                  <p className="text-lg sm:text-xl font-normal leading-relaxed opacity-90 max-w-3xl">
                    Digitizing employee performance evaluation through structured workflow design.
                    I designed the experience strategy for the MoMoPSB Employee Confirmation Workflow System,
                    transforming a complex, multi-stakeholder HR process into a centralized digital experience
                    that connects qualitative assessments, KPI evaluations, multi-level approvals, and final
                    employment decisions.
                  </p>

                  {/* 4 Quick Executive Scan Pillars */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                    <div
                      className={`p-4 rounded-2xl border text-xs ${
                        isDark ? "border-[#20201E] bg-[#171716]" : "border-[#EFECE4] bg-[#FAF9F5]"
                      }`}
                    >
                      <div className="font-mono text-[10px] uppercase opacity-50 mb-1">
                        01 / Automation
                      </div>
                      <div className="font-medium mb-1">Workflow Initiation</div>
                      <div className="opacity-70 leading-relaxed text-[11px]">
                        Probation timeline triggers automatically assign evaluations to line managers with due dates.
                      </div>
                    </div>

                    <div
                      className={`p-4 rounded-2xl border text-xs ${
                        isDark ? "border-[#20201E] bg-[#171716]" : "border-[#EFECE4] bg-[#FAF9F5]"
                      }`}
                    >
                      <div className="font-mono text-[10px] uppercase opacity-50 mb-1">
                        02 / Dual Scoring
                      </div>
                      <div className="font-medium mb-1">Part A &amp; Part B KPIs</div>
                      <div className="opacity-70 leading-relaxed text-[11px]">
                        Combines qualitative values alignment with weighted quantitative KPI metric uploads.
                      </div>
                    </div>

                    <div
                      className={`p-4 rounded-2xl border text-xs ${
                        isDark ? "border-[#20201E] bg-[#171716]" : "border-[#EFECE4] bg-[#FAF9F5]"
                      }`}
                    >
                      <div className="font-mono text-[10px] uppercase opacity-50 mb-1">
                        03 / Decisions
                      </div>
                      <div className="font-medium mb-1">Confirm, Defer or Exit</div>
                      <div className="opacity-70 leading-relaxed text-[11px]">
                        Structured sequential approvals with mandatory feedback notes and HR executive control.
                      </div>
                    </div>

                    <div
                      className={`p-4 rounded-2xl border text-xs ${
                        isDark ? "border-[#20201E] bg-[#171716]" : "border-[#EFECE4] bg-[#FAF9F5]"
                      }`}
                    >
                      <div className="font-mono text-[10px] uppercase opacity-50 mb-1">
                        04 / Governance
                      </div>
                      <div className="font-medium mb-1">SLA Reminders &amp; Audit</div>
                      <div className="opacity-70 leading-relaxed text-[11px]">
                        Automated escalations for stalled approvals and immutable timestamped decision logs.
                      </div>
                    </div>
                  </div>

                  {/* Interactive Accordion Trigger Button */}
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => setIsMomoConfirmationExpanded(!isMomoConfirmationExpanded)}
                      className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs font-mono transition-all duration-300 cursor-pointer ${
                        isDark
                          ? "bg-white/[0.08] border border-white/[0.14] text-white hover:bg-white/[0.16]"
                          : "bg-[#141413] text-[#FAF9F5] hover:bg-[#2B2B28]"
                      }`}
                    >
                      <span>
                        {isMomoConfirmationExpanded
                          ? "Collapse Case Study ▴"
                          : "Read Full Enterprise Case Study (Problem · Approach · 5 Capabilities · Impact) ▾"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* =========================================================
                    EXPANDABLE DEEP-DIVE (MOMOPSB EMPLOYEE CONFIRMATION)
                   ========================================================= */}
                {isMomoConfirmationExpanded && (
                  <div className="mt-12 pt-12 border-t border-current/10 space-y-16 animate-fade-in text-sm leading-relaxed">
                    {/* SECTION 1: THE PROBLEM */}
                    <div className="space-y-6">
                      <div className="font-mono text-xs uppercase tracking-wider text-[#D97757]">
                        01 / The Operational Problem
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                        Manual Probation Tracking &amp; Subjective Evaluation Risks
                      </h3>
                      <p className="opacity-80 max-w-3xl">
                        The existing employee probation-to-confirmation process was heavily dependent on manual tracking,
                        creating operational blindspots across the organization:
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                        <div className={`p-5 rounded-2xl border ${isDark ? "border-[#20201E] bg-[#161615]" : "border-[#EFECE4] bg-[#FAF9F5]"}`}>
                          <div className="font-semibold mb-1">1. Manual Deadline Tracking</div>
                          <p className="text-xs opacity-75 leading-relaxed">
                            Probation expiry dates were manually monitored, often resulting in overlooked confirmation milestones.
                          </p>
                        </div>
                        <div className={`p-5 rounded-2xl border ${isDark ? "border-[#20201E] bg-[#161615]" : "border-[#EFECE4] bg-[#FAF9F5]"}`}>
                          <div className="font-semibold mb-1">2. Repetitive Calculations</div>
                          <p className="text-xs opacity-75 leading-relaxed">
                            Managers calculated weighted performance scores manually, creating arithmetic discrepancies and evaluation friction.
                          </p>
                        </div>
                        <div className={`p-5 rounded-2xl border ${isDark ? "border-[#20201E] bg-[#161615]" : "border-[#EFECE4] bg-[#FAF9F5]"}`}>
                          <div className="font-semibold mb-1">3. Multi-Stakeholder Bottlenecks</div>
                          <p className="text-xs opacity-75 leading-relaxed">
                            Routing reviews between line managers, heads of department, and HR lacked a synchronized approval workflow.
                          </p>
                        </div>
                        <div className={`p-5 rounded-2xl border ${isDark ? "border-[#20201E] bg-[#161615]" : "border-[#EFECE4] bg-[#FAF9F5]"}`}>
                          <div className="font-semibold mb-1">4. Zero Process Visibility</div>
                          <p className="text-xs opacity-75 leading-relaxed">
                            HR and employees had no central dashboard to check current approval stages or reason for stalled reviews.
                          </p>
                        </div>
                        <div className={`p-5 rounded-2xl border ${isDark ? "border-[#20201E] bg-[#161615]" : "border-[#EFECE4] bg-[#FAF9F5]"}`}>
                          <div className="font-semibold mb-1">5. Inconsistent Policy Application</div>
                          <p className="text-xs opacity-75 leading-relaxed">
                            Different divisions applied probation criteria unevenly without embedded validation rules or scoring thresholds.
                          </p>
                        </div>
                        <div className={`p-5 rounded-2xl border ${isDark ? "border-[#20201E] bg-[#161615]" : "border-[#EFECE4] bg-[#FAF9F5]"}`}>
                          <div className="font-semibold mb-1">6. Audit &amp; Record Fragility</div>
                          <p className="text-xs opacity-75 leading-relaxed">
                            Maintaining complete, verifiable audit trails of manager feedback and employment decisions was difficult.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* SECTION 2: THE DESIGN APPROACH */}
                    <div className="space-y-6">
                      <div className="font-mono text-xs uppercase tracking-wider text-[#10A37F]">
                        02 / The Design Approach
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                        Translating Complex HR Policies Into Role-Based Workflows
                      </h3>
                      <p className="opacity-80 max-w-3xl">
                        My approach centered on structuring the complete confirmation lifecycle into an intuitive,
                        transparent enterprise experience:
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div className="space-y-1.5 p-4 rounded-xl border border-current/10">
                          <span className="font-semibold text-xs uppercase tracking-wider opacity-60">Workflow-First Design</span>
                          <p className="text-xs opacity-80">Sequenced the entire lifecycle from probation trigger to final sign-off into linear, predictable stages.</p>
                        </div>
                        <div className="space-y-1.5 p-4 rounded-xl border border-current/10">
                          <span className="font-semibold text-xs uppercase tracking-wider opacity-60">Role-Tailored Experiences</span>
                          <p className="text-xs opacity-80">Distinct, permissioned workspaces for Employees, Line Managers, Supervisors, HR Specialists, and Admins.</p>
                        </div>
                        <div className="space-y-1.5 p-4 rounded-xl border border-current/10">
                          <span className="font-semibold text-xs uppercase tracking-wider opacity-60">Policy-Driven Interactions</span>
                          <p className="text-xs opacity-80">Embedded mandatory passing thresholds, weighted scoring algorithms, and approval criteria directly into forms.</p>
                        </div>
                        <div className="space-y-1.5 p-4 rounded-xl border border-current/10">
                          <span className="font-semibold text-xs uppercase tracking-wider opacity-60">Exception &amp; Deferral Handling</span>
                          <p className="text-xs opacity-80">Designed clear error states, rejection flows with required rationale, and deferral limit enforcements.</p>
                        </div>
                      </div>
                    </div>

                    {/* SECTION 3: THE 5 CORE CAPABILITIES */}
                    <div className="space-y-6">
                      <div className="font-mono text-xs uppercase tracking-wider text-[#D97757]">
                        03 / The Solution
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                        5 Strategic Capabilities of the Platform
                      </h3>

                      <div className="space-y-4 pt-2">
                        <div className={`p-6 rounded-2xl border ${isDark ? "border-[#20201E] bg-[#161615]" : "border-[#EFECE4] bg-[#FAF9F5]"}`}>
                          <div className="font-semibold text-base mb-1">A. Automated Workflow Initiation</div>
                          <p className="text-xs opacity-80 leading-relaxed">
                            Integrates with internal HRIS databases to automatically identify employees nearing confirmation milestones, calculate review deadlines, and dispatch notification tasks to designated line managers.
                          </p>
                        </div>

                        <div className={`p-6 rounded-2xl border ${isDark ? "border-[#20201E] bg-[#161615]" : "border-[#EFECE4] bg-[#FAF9F5]"}`}>
                          <div className="font-semibold text-base mb-1">B. Qualitative Assessment (Part A)</div>
                          <p className="text-xs opacity-80 leading-relaxed">
                            Structured behavioral evaluation focusing on corporate values alignment, core competencies, and teamwork with conditional criteria for supervisory roles and automated score tallying.
                          </p>
                        </div>

                        <div className={`p-6 rounded-2xl border ${isDark ? "border-[#20201E] bg-[#161615]" : "border-[#EFECE4] bg-[#FAF9F5]"}`}>
                          <div className="font-semibold text-base mb-1">C. KPI Evaluation (Part B)</div>
                          <p className="text-xs opacity-80 leading-relaxed">
                            Allows managers to evaluate staff against predefined role KPIs or upload performance spreadsheets, with the system automatically computing weighted scores against confirmation thresholds.
                          </p>
                        </div>

                        <div className={`p-6 rounded-2xl border ${isDark ? "border-[#20201E] bg-[#161615]" : "border-[#EFECE4] bg-[#FAF9F5]"}`}>
                          <div className="font-semibold text-base mb-1">D. Approval &amp; Decision Management</div>
                          <p className="text-xs opacity-80 leading-relaxed">
                            Sequential approval gates requiring mandatory feedback comments, rejection handling, and HR executive authorization across three definitive decision pathways: <strong>Confirm</strong>, <strong>Defer</strong>, or <strong>Exit</strong>.
                          </p>
                        </div>

                        <div className={`p-6 rounded-2xl border ${isDark ? "border-[#20201E] bg-[#161615]" : "border-[#EFECE4] bg-[#FAF9F5]"}`}>
                          <div className="font-semibold text-base mb-1">E. Notifications, Reporting &amp; Governance</div>
                          <p className="text-xs opacity-80 leading-relaxed">
                            Automated SLA reminder pings, overdue escalation workflows, enterprise-wide status reports, role-based access restrictions, and immutable audit logging for full regulatory compliance.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* SECTION 4: EXPECTED IMPACT */}
                    <div className="space-y-6">
                      <div className="font-mono text-xs uppercase tracking-wider text-[#10A37F]">
                        04 / Measurable Impact
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                        Transforming HR Governance at MoMoPSB
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div className="p-4 rounded-xl border border-current/10 text-xs space-y-1">
                          <span className="font-semibold">Vastly Reduced HR Administrative Load</span>
                          <p className="opacity-75">Eliminated manual spreadsheet tracking and email chasing across all business units.</p>
                        </div>
                        <div className="p-4 rounded-xl border border-current/10 text-xs space-y-1">
                          <span className="font-semibold">Objective, Standardized Evaluations</span>
                          <p className="opacity-75">Embedded KPI weights and scoring thresholds ensure consistent evaluation standards.</p>
                        </div>
                        <div className="p-4 rounded-xl border border-current/10 text-xs space-y-1">
                          <span className="font-semibold">High Transparency &amp; SLA Accountability</span>
                          <p className="opacity-75">Automated escalations highlight delayed reviews before probation deadlines lapse.</p>
                        </div>
                        <div className="p-4 rounded-xl border border-current/10 text-xs space-y-1">
                          <span className="font-semibold">Audit-Ready Compliance Records</span>
                          <p className="opacity-75">Complete, tamper-evident records of every assessment, score, and decision note.</p>
                        </div>
                      </div>

                      <div className="pt-6">
                        <button
                          type="button"
                          onClick={() => setIsMomoConfirmationExpanded(false)}
                          className="font-mono text-xs text-[#D97757] hover:underline cursor-pointer"
                        >
                          Collapse Case Study ▴
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* WORK 04: ARRIVO — DIRECTION 01 */}
            <section className="space-y-8">
              <div className="flex items-baseline justify-between text-xs font-mono opacity-50">
                <span>04 / Arrivo — Relocation Card</span>
                <span>Desktop &amp; Mobile</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
                <div
                  onClick={() =>
                    setLightbox({
                      src: img8432,
                      title: "Arrivo — Desktop Hero",
                    })
                  }
                  className={`lg:col-span-8 p-4 sm:p-8 rounded-3xl border transition-all duration-500 cursor-pointer hover:-translate-y-1 ${
                    isDark
                      ? "border-[#20201E] bg-[#121211] hover:border-[#383835] hover:shadow-2xl"
                      : "border-[#EAE7DC] bg-white hover:border-[#CCC7B8] hover:shadow-xl"
                  }`}
                >
                  <Image
                    src={img8432}
                    alt="Arrivo Desktop"
                    className="w-full h-auto rounded-2xl object-cover"
                    placeholder="blur"
                    priority
                  />
                </div>

                <div
                  onClick={() =>
                    setLightbox({
                      src: img8434,
                      title: "Arrivo — Mobile Hero",
                    })
                  }
                  className={`lg:col-span-4 p-6 sm:p-10 rounded-3xl border flex items-center justify-center transition-all duration-500 cursor-pointer hover:-translate-y-1 ${
                    isDark
                      ? "border-[#20201E] bg-[#121211] hover:border-[#383835] hover:shadow-2xl"
                      : "border-[#EAE7DC] bg-white hover:border-[#CCC7B8] hover:shadow-xl"
                  }`}
                >
                  <Image
                    src={img8434}
                    alt="Arrivo Mobile"
                    className="w-full max-w-[280px] h-auto rounded-2xl object-contain"
                    placeholder="blur"
                  />
                </div>
              </div>
            </section>

            {/* WORK 05: ARRIVO — DIRECTION 02 */}
            <section className="space-y-8">
              <div className="flex items-baseline justify-between text-xs font-mono opacity-50">
                <span>05 / Arrivo — Editorial Reveal</span>
                <span>Desktop &amp; Mobile</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
                <div
                  onClick={() =>
                    setLightbox({
                      src: img8433,
                      title: "Arrivo — Editorial Reveal (Desktop)",
                    })
                  }
                  className={`lg:col-span-8 p-4 sm:p-8 rounded-3xl border transition-all duration-500 cursor-pointer hover:-translate-y-1 ${
                    isDark
                      ? "border-[#20201E] bg-[#121211] hover:border-[#383835] hover:shadow-2xl"
                      : "border-[#EAE7DC] bg-white hover:border-[#CCC7B8] hover:shadow-xl"
                  }`}
                >
                  <Image
                    src={img8433}
                    alt="Arrivo Editorial Desktop"
                    className="w-full h-auto rounded-2xl object-cover"
                    placeholder="blur"
                  />
                </div>

                <div
                  onClick={() =>
                    setLightbox({
                      src: img8435,
                      title: "Arrivo — Editorial Reveal (Mobile)",
                    })
                  }
                  className={`lg:col-span-4 p-6 sm:p-10 rounded-3xl border flex items-center justify-center transition-all duration-500 cursor-pointer hover:-translate-y-1 ${
                    isDark
                      ? "border-[#20201E] bg-[#121211] hover:border-[#383835] hover:shadow-2xl"
                      : "border-[#EAE7DC] bg-white hover:border-[#CCC7B8] hover:shadow-xl"
                  }`}
                >
                  <Image
                    src={img8435}
                    alt="Arrivo Editorial Mobile"
                    className="w-full max-w-[280px] h-auto rounded-2xl object-contain"
                    placeholder="blur"
                  />
                </div>
              </div>
            </section>

            {/* WORK 06: PRICING STUDY (8436) */}
            <section className="space-y-8">
              <div className="flex items-baseline justify-between text-xs font-mono opacity-50">
                <span>06 / Pricing Layout Study — A/B</span>
                <span>Toyota RAV4 · IMG_8436</span>
              </div>

              <div
                onClick={() =>
                  setLightbox({
                    src: img8436,
                    title: "Daily rate or total price?",
                  })
                }
                className={`p-6 sm:p-12 lg:p-16 rounded-3xl border transition-all duration-500 cursor-pointer hover:-translate-y-1 ${
                  isDark
                    ? "border-[#20201E] bg-[#121211] hover:border-[#383835] hover:shadow-2xl"
                    : "border-[#EAE7DC] bg-white hover:border-[#CCC7B8] hover:shadow-xl"
                }`}
              >
                <div className="max-w-4xl mx-auto">
                  <Image
                    src={img8436}
                    alt="Daily rate or total price?"
                    className="w-full h-auto rounded-2xl object-cover"
                    placeholder="blur"
                  />
                </div>
              </div>
            </section>

            {/* WORK 07 & 08: KLARIO & SWIFTLOG TILES */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
              <a
                href="https://www.klario.finance/"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-10 sm:p-14 lg:p-16 rounded-3xl border flex flex-col justify-between min-h-[300px] group transition-all duration-500 hover:-translate-y-1 ${
                  isDark
                    ? "border-[#20201E] bg-[#121211] hover:border-[#383835] hover:shadow-2xl"
                    : "border-[#EAE7DC] bg-white hover:border-[#CCC7B8] hover:shadow-xl"
                }`}
              >
                <div className="font-mono text-xs opacity-50">07 / FINTECH</div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                    Klario Finance
                  </h3>
                  <p className="mt-2 text-xs font-mono opacity-60">
                    AI Financial Intelligence · Open Banking
                  </p>
                </div>
                <div className="text-xs font-mono pt-4 group-hover:translate-x-1.5 transition-transform duration-300">
                  klario.finance ↗
                </div>
              </a>

              <a
                href="https://swiftlogwebsite.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-10 sm:p-14 lg:p-16 rounded-3xl border flex flex-col justify-between min-h-[300px] group transition-all duration-500 hover:-translate-y-1 ${
                  isDark
                    ? "border-[#20201E] bg-[#121211] hover:border-[#383835] hover:shadow-2xl"
                    : "border-[#EAE7DC] bg-white hover:border-[#CCC7B8] hover:shadow-xl"
                }`}
              >
                <div className="font-mono text-xs opacity-50">
                  08 / LOGISTICS
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                    SwiftLog
                  </h3>
                  <p className="mt-2 text-xs font-mono opacity-60">
                    Freight Telemetry &amp; Courier Dispatch
                  </p>
                </div>
                <div className="text-xs font-mono pt-4 group-hover:translate-x-1.5 transition-transform duration-300">
                  swiftlogwebsite.netlify.app ↗
                </div>
              </a>
            </section>
          </div>

          {/* =========================================================
              06 // DEDICATED DESIGN PHILOSOPHY SECTION
              (Jony Ive, Steve Jobs, and Subterranean Complexity)
             ========================================================= */}
          <section
            id="philosophy"
            className="pb-36 sm:pb-48 lg:pb-60 border-t border-current/10 pt-20 sm:pt-28"
          >
            <div className="space-y-16">
              {/* Header & Main Thesis Quote */}
              <div className="max-w-4xl space-y-6">
                <span className="font-mono text-xs uppercase tracking-wider opacity-50 block">
                  Design Philosophy · The Craft of Subterranean Complexity
                </span>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tighter leading-[1.12]">
                  “Simplicity is not merely the absence of clutter. It is the{" "}
                  <span className="font-normal opacity-70">
                    profound mastery
                  </span>{" "}
                  of complexity.”
                </h2>
              </div>

              {/* In-depth Narrative */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                <div className="lg:col-span-7 space-y-6 text-base sm:text-lg leading-relaxed font-light opacity-90">
                  <p>
                    Mentored from afar by the rigorous product philosophies of{" "}
                    <strong className="font-medium text-current">
                      Jony Ive
                    </strong>{" "}
                    and{" "}
                    <strong className="font-medium text-current">
                      Steve Jobs
                    </strong>
                    , Tomiwa treats design not as cosmetic decoration, but as an
                    act of radical empathy and structural reduction.
                  </p>
                  <p>
                    The systems that power modern society are violently complex
                    underneath. During his enterprise work at{" "}
                    <strong className="font-medium text-current">
                      Lotus Beta Analytics
                    </strong>
                    , he tackled high-scale distributed infrastructures for{" "}
                    <span className="underline decoration-current/30 underline-offset-4">
                      MTN
                    </span>{" "}
                    and{" "}
                    <span className="underline decoration-current/30 underline-offset-4">
                      Airtel
                    </span>
                    , alongside investment banking solutions at{" "}
                    <span className="underline decoration-current/30 underline-offset-4">
                      Alpha Morgan Capital
                    </span>
                    . At{" "}
                    <span className="underline decoration-current/30 underline-offset-4">
                      Klario Finance
                    </span>
                    , that same ethos drives multi-bank open banking ledgers,
                    CBN regulatory compliance, and automated savings vaults.
                  </p>
                  <p>
                    Tomiwa’s conviction is that the designer’s primary duty is
                    to absorb all that subterranean friction entirely—so that
                    what the human experiences on the surface feels inevitable,
                    calm, and effortlessly easy to navigate. When an interface
                    is truly right, it doesn’t broadcast how clever the system
                    is; it feels as natural as breathing.
                  </p>
                </div>

                {/* 3 Core Pillars */}
                <div className="lg:col-span-5 space-y-5">
                  <div
                    className={`p-6 sm:p-7 rounded-2xl border transition-colors ${
                      isDark
                        ? "border-[#20201E] bg-[#121211]"
                        : "border-[#EAE7DC] bg-white/70"
                    }`}
                  >
                    <div className="font-mono text-xs text-[#D97757] uppercase tracking-wider mb-2">
                      01 / The Subterranean Machine
                    </div>
                    <h3 className="text-sm font-medium tracking-tight mb-1.5">
                      Absorb Complexity Beneath the Surface
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed opacity-70">
                      Keep financial cryptography, API handshakes, and business
                      rules deep underground so the user carries zero cognitive
                      fatigue.
                    </p>
                  </div>

                  <div
                    className={`p-6 sm:p-7 rounded-2xl border transition-colors ${
                      isDark
                        ? "border-[#20201E] bg-[#121211]"
                        : "border-[#EAE7DC] bg-white/70"
                    }`}
                  >
                    <div className="font-mono text-xs text-[#10A37F] uppercase tracking-wider mb-2">
                      02 / The Ive-Jobs Standard
                    </div>
                    <h3 className="text-sm font-medium tracking-tight mb-1.5">
                      The Feeling of Inevitability
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed opacity-70">
                      Strip away every non-essential artifact until the design
                      feels like it was never designed, but simply existed as an
                      obvious truth.
                    </p>
                  </div>

                  <div
                    className={`p-6 sm:p-7 rounded-2xl border transition-colors ${
                      isDark
                        ? "border-[#20201E] bg-[#121211]"
                        : "border-[#EAE7DC] bg-white/70"
                    }`}
                  >
                    <div className="font-mono text-xs opacity-50 uppercase tracking-wider mb-2">
                      03 / Human Dignity
                    </div>
                    <h3 className="text-sm font-medium tracking-tight mb-1.5">
                      Clarity Over Frantic Engagement
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed opacity-70">
                      Honor human attention with quiet whitespace, honest price
                      anchoring, and transparent flows that build enduring
                      trust.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================
              LET'S DISCUSS — DIRECT INBOX CALL-TO-ACTION
             ========================================================= */}
          <section className="pb-36 sm:pb-48 border-t border-current/10 pt-20 sm:pt-28">
            <div className="max-w-3xl space-y-8">
              <div className="font-mono text-xs uppercase tracking-wider opacity-50">
                Available for Select Advisory, Product Roles &amp; Systems
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tighter leading-[1.12]">
                Have a complex problem? <br />
                <span className="font-normal opacity-70">
                  Let&apos;s build something clear.
                </span>
              </h2>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono">
                <a
                  href="mailto:awodokuntomiwa@gmail.com?subject=Project%20Inquiry%20%E2%80%94%20Let's%20Discuss"
                  className={`rounded-full px-6 py-3.5 transition-all duration-300 hover:scale-[1.02] flex items-center gap-2 text-sm font-sans font-medium ${
                    isDark
                      ? "bg-[#EDEDED] text-[#0A0A0A] hover:bg-white"
                      : "bg-[#141413] text-[#FAF9F5] hover:bg-[#2B2B28]"
                  }`}
                >
                  <span>Send me an inbox — let&apos;s discuss</span>
                  <span aria-hidden="true">↗</span>
                </a>

                <button
                  type="button"
                  onClick={copyEmail}
                  className="opacity-70 hover:opacity-100 transition-opacity px-4 py-3.5 cursor-pointer border border-current/20 rounded-full"
                >
                  {copied
                    ? "Copied awodokuntomiwa@gmail.com ✓"
                    : "Copy awodokuntomiwa@gmail.com"}
                </button>
              </div>
            </div>
          </section>

          {/* Minimal Static Footer */}
          <footer className="pt-16 pb-28 border-t border-current/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono opacity-60">
            <div className="flex items-center gap-4">
              <span>Oluwatomiwa Awodokun</span>
              <span className="opacity-30">·</span>
              <a
                href="https://www.linkedin.com/in/oluwatomiwa-daniel-1b1890245/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:opacity-100 transition-opacity"
                title="LinkedIn Profile"
              >
                <svg
                  className="w-3.5 h-3.5 fill-current opacity-80"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6z" />
                </svg>
                <span>LinkedIn</span>
                <span className="text-[10px] opacity-60">↗</span>
              </a>
            </div>

            <div className="flex items-center gap-6">
              <a
                href="mailto:awodokuntomiwa@gmail.com"
                className="hover:underline underline-offset-4"
              >
                awodokuntomiwa@gmail.com
              </a>
              <span className="opacity-30">·</span>
              <div>2026</div>
            </div>
          </footer>
        </div>
      </main>

      {/* Apple Glassmorphic Scroll to Top Button (Fixed Bottom-Right) */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
        className={`fixed bottom-8 right-6 sm:right-10 z-40 flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-2xl transition-all duration-500 cursor-pointer shadow-lg hover:scale-110 active:scale-95 ${
          showScrollTop
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        } ${
          isDark
            ? "bg-white/[0.08] border border-white/[0.16] text-white shadow-black/40 hover:bg-white/[0.18]"
            : "bg-white/80 border border-black/[0.08] text-[#141413] shadow-black/[0.06] hover:bg-white"
        }`}
        title="Back to top"
      >
        <span className="text-sm font-semibold leading-none">↑</span>
      </button>

      {/* Lightbox Modal */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6 sm:p-12 backdrop-blur-md cursor-pointer animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[90vh] overflow-hidden"
          >
            <Image
              src={lightbox.src}
              alt={lightbox.title}
              className="max-h-[85vh] w-auto object-contain rounded-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
