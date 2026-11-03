"use client";

import React, { useState, useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";

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
  { text: "Tomiwa designs across the spectrum of human trust—bridging enterprise scale and consumer nuance. He has crafted complex digital solutions for telecommunications leaders ", underline: false },
  { text: "MTN", underline: true },
  { text: " and ", underline: false },
  { text: "Airtel", underline: true },
  { text: ", investment banking infrastructure at ", underline: false },
  { text: "Alpha Morgan Capital", underline: true },
  { text: ", and leads research-driven product architecture at ", underline: false },
  { text: "Klario Finance", underline: true },
  { text: ".", underline: false },
] as const;

const TOTAL_BIO_CHARS = BIO_SEGMENTS.reduce((sum, seg) => sum + seg.text.length, 0);

export default function PortfolioPage() {
  const [theme, setTheme] = useState<ThemeMode>("claude");
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const [copied, setCopied] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

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
      { threshold: 0.35 }
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
      navigator.clipboard.writeText("oluwatomiwa.awodokun@klario.finance");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  let charsTracked = 0;
  const currentChars = hasTriggeredTyping ? charCount : 0;

  return (
    <div
      className={`min-h-screen transition-colors duration-700 ease-out ${
        isDark
          ? "bg-[#0A0A0A] text-[#EDEDED]"
          : "bg-[#FBFAF6] text-[#141413]"
      }`}
    >
      {/* Minimal Top Nav with Apple Glassmorphic Emoji Theme Toggle */}
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

            {/* Apple Glassmorphic Light / Dark Toggle */}
            <div
              role="group"
              aria-label="Theme mode"
              className={`flex items-center rounded-full p-1 backdrop-blur-2xl transition-all duration-300 shadow-sm ${
                isDark
                  ? "bg-white/[0.07] border border-white/[0.14] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]"
                  : "bg-black/[0.04] border border-black/[0.08] shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]"
              }`}
            >
              <button
                type="button"
                onClick={() => setTheme("claude")}
                aria-pressed={!isDark}
                className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs transition-all duration-300 cursor-pointer ${
                  !isDark
                    ? "bg-white/90 text-[#141413] shadow-xs backdrop-blur-md font-medium"
                    : "text-white/60 hover:text-white"
                }`}
                title="Switch to Light Theme"
              >
                <span className="text-xs">☀️</span>
                <span className="font-mono text-[11px]">Light</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme("openai")}
                aria-pressed={isDark}
                className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs transition-all duration-300 cursor-pointer ${
                  isDark
                    ? "bg-[#222220]/90 text-white shadow-xs backdrop-blur-md font-medium border border-white/10"
                    : "text-black/60 hover:text-black"
                }`}
                title="Switch to Dark Theme"
              >
                <span className="text-xs">🌙</span>
                <span className="font-mono text-[11px]">Dark</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main id="top" className="px-6 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-6xl">
          {/* Hero Section */}
          <section className="pt-24 pb-24 sm:pt-36 sm:pb-32 lg:pt-44 lg:pb-40">
            <div className="animate-fade-up">
              <span className="font-mono text-xs uppercase tracking-wider opacity-50 block mb-6">
                Product Designer &amp; Researcher
              </span>
              <h1
                className="text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.08] max-w-4xl"
                style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
              >
                Oluwatomiwa Awodokun.
                <br />
                <span className="italic font-normal opacity-75">
                  Quiet, high-trust digital systems.
                </span>
              </h1>
            </div>

            <div className="mt-12 sm:mt-16 flex flex-wrap items-center gap-4 text-xs font-mono animate-fade-up delay-1">
              <a
                href="https://www.klario.finance/"
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-full px-5 py-2.5 transition-all duration-300 hover:scale-[1.02] ${
                  isDark
                    ? "bg-[#EDEDED] text-[#0A0A0A] hover:bg-white"
                    : "bg-[#141413] text-[#FAF9F5] hover:bg-[#2B2B28]"
                }`}
              >
                klario.finance ↗
              </a>
              <a
                href="https://swiftlogwebsite.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-full border px-5 py-2.5 transition-all duration-300 hover:scale-[1.02] ${
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
                {copied ? "Copied email ✓" : "Copy email"}
              </button>
            </div>
          </section>

          {/* Enterprise Bio with Typewriter Streaming & Momentary Scroll Lock */}
          <section
            ref={bioRef}
            onClick={hasTriggeredTyping && !isTypingDone ? handleSkipTyping : undefined}
            className="pb-32 sm:pb-44 lg:pb-56 max-w-3xl relative"
          >
            <div className="border-t border-current/10 pt-14 sm:pt-20">
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs uppercase tracking-wider opacity-50">
                  Background &amp; Enterprise Track
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

              {/* Dynamic Typewritten Text */}
              <p
                className="text-xl sm:text-2xl lg:text-[28px] font-light leading-relaxed tracking-tight min-h-[120px]"
                style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
              >
                {BIO_SEGMENTS.map((seg, idx) => {
                  const segStart = charsTracked;
                  charsTracked += seg.text.length;

                  if (currentChars <= segStart) {
                    return null;
                  }

                  const visibleSlice = seg.text.slice(0, currentChars - segStart);

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
            {/* WORK 01: ARRIVO — DIRECTION 01 */}
            <section className="space-y-8">
              <div className="flex items-baseline justify-between text-xs font-mono opacity-50">
                <span>01 / Arrivo — Relocation Card</span>
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

            {/* WORK 02: ARRIVO — DIRECTION 02 */}
            <section className="space-y-8">
              <div className="flex items-baseline justify-between text-xs font-mono opacity-50">
                <span>02 / Arrivo — Editorial Reveal</span>
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

            {/* WORK 03: PRICING STUDY (8436) */}
            <section className="space-y-8">
              <div className="flex items-baseline justify-between text-xs font-mono opacity-50">
                <span>03 / Pricing Layout Study — A/B</span>
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

            {/* WORK 04 & 05: KLARIO & SWIFTLOG TILES */}
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
                <div className="font-mono text-xs opacity-50">04 / FINTECH</div>
                <div>
                  <h3
                    className="text-3xl sm:text-4xl tracking-tight"
                    style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
                  >
                    Klario Finance
                  </h3>
                  <p className="mt-3 text-xs font-mono opacity-60">
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
                <div className="font-mono text-xs opacity-50">05 / LOGISTICS</div>
                <div>
                  <h3
                    className="text-3xl sm:text-4xl tracking-tight"
                    style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
                  >
                    SwiftLog
                  </h3>
                  <p className="mt-3 text-xs font-mono opacity-60">
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
                <h2
                  className="text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.12]"
                  style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
                >
                  “Simplicity is not merely the absence of clutter. It is the{" "}
                  <span className="italic font-normal">profound mastery</span> of
                  complexity.”
                </h2>
              </div>

              {/* In-depth Narrative */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                <div className="lg:col-span-7 space-y-6 text-base sm:text-lg leading-relaxed font-light opacity-90">
                  <p>
                    Mentored from afar by the rigorous product philosophies of{" "}
                    <strong className="font-medium text-current">Jony Ive</strong>{" "}
                    and{" "}
                    <strong className="font-medium text-current">Steve Jobs</strong>,
                    Tomiwa treats design not as cosmetic decoration, but as an
                    act of radical empathy and structural reduction.
                  </p>
                  <p>
                    The systems that power modern society are violently complex
                    underneath. At{" "}
                    <span className="underline decoration-current/30 underline-offset-4">
                      Klario Finance
                    </span>
                    , it is multi-bank open banking ledgers, CBN regulatory
                    compliance, automated savings vaults, and Naira inflation
                    hedges. In cross-border mobility with{" "}
                    <span className="underline decoration-current/30 underline-offset-4">
                      Arrivo
                    </span>
                    , it is multi-currency settlement rails and instantaneous
                    card issuance. At enterprise telecom scale with{" "}
                    <span className="underline decoration-current/30 underline-offset-4">
                      MTN
                    </span>{" "}
                    and{" "}
                    <span className="underline decoration-current/30 underline-offset-4">
                      Airtel
                    </span>
                    , it is massive distributed infrastructure.
                  </p>
                  <p>
                    Tomiwa’s conviction is that the designer’s primary duty is to
                    absorb all that subterranean friction entirely—so that what
                    the human experiences on the surface feels inevitable, calm,
                    and effortlessly easy to navigate. When an interface is truly
                    right, it doesn’t broadcast how clever the system is; it feels
                    as natural as breathing.
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
                      anchoring, and transparent flows that build enduring trust.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Minimal Static Footer */}
          <footer className="pt-20 pb-32 border-t border-current/10 flex flex-col sm:flex-row items-baseline justify-between gap-6 text-xs font-mono opacity-50">
            <div>Oluwatomiwa Awodokun</div>
            <div>2026</div>
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
