"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import ScrollProgressBar from "./ScrollProgressBar";

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    // { href: "/about", label: "About" },
    { href: "/opportunities", label: "Investments" },
    { href: "/team", label: "Team" },
    { href: "/contact", label: "Contact" },
  ];
  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
    >
      {/* Scroll Progress Bar */}
      {/* <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white/10">
        <div className="scroll-progress h-full bg-[#F8AB1D] origin-left scale-x-0" />
      </div> */}
      <ScrollProgressBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">
                <Image
                  src={`${isScrolled ? "/logo-transparent.png" : "/logo-white.png"}`}
                  alt="All Terra Logo"
                  width={100}
                  height={100}
                  priority
                />
              </span>
            </div>
            <span
              className={`text-2xl font-bold transition-colors ${isScrolled ? "text-secondary" : "text-white"
                }`}
            >
              {/* All Terra */}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors relative group ${isActive
                      ? "text-[#F8AB1D]"
                      : isScrolled
                        ? "text-secondary hover:text-[#F8AB1D]"
                        : "text-white hover:text-[#F8AB1D]"
                    }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-[#F8AB1D] transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                  />
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="bg-[#F8AB1D] text-secondary px-6 py-2.5 rounded-lg font-semibold hover:bg-accent-dark transition-all hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
            >
              Start Investing
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            <svg
              className={`w-6 h-6 transition-colors ${isScrolled ? "text-secondary" : "text-white"
                }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white rounded-b-2xl shadow-xl pb-6">
            <nav className="flex flex-col gap-4 px-4 pt-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`font-medium py-2 pl-3 border-l-2 transition-all ${isActive
                        ? "text-[#F8AB1D] border-[#F8AB1D]"
                        : "text-secondary border-transparent hover:text-[#1C5244] hover:border-[#1C5244]"
                      }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/contact"
                className="bg-[#F8AB1D] text-secondary px-6 py-3 rounded-lg font-semibold text-center hover:bg-accent-dark transition-all mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Start Investing
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
