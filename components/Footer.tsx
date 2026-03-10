"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const currentYear = new Date().getFullYear();

  useGSAP(
    () => {
      // Animate Footer Columns
      gsap.fromTo(
        ".footer-col",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            once: true,
          },
        },
      );

      // Animate Bottom Bar
      gsap.fromTo(
        ".footer-bottom",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          delay: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            once: true,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  const footerLinks = {
    company: [
      // { href: "#about", label: "What We Do" },
      { href: "/team", label: "Team" },
      { href: "/opportunities", label: "Investment Opportunity" },
      { href: "/contact", label: "Contact" },
    ],
    solutions: [
      { href: "/opportunity", label: "Investment Opportunities" },
      // { href: "#sectors", label: "Sectors" },
      // { href: "#", label: "Investor Portal" },
    ],
    legal: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms-of-service", label: "Terms of Service" },
      { href: "/disclaimer", label: "Disclaimer" },
    ],
  };
  return (
    <footer ref={sectionRef} className="bg-secondary text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1 footer-col opacity-0">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-20 h-20 rounded-lg  flex items-center justify-center">
                <span className="text-white font-bold text-2xl">
                  <Image
                    src="/logo-white.png"
                    alt="Footer Logo"
                    width={80}
                    height={80}
                  />
                </span>
              </div>
              {/* <span className="text-2xl font-bold text-white">All Terra</span> */}
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Structured Private Credit Financing for African Markets. Deploying
              capital into asset-backed, high-yield opportunities.
            </p>
            {/* Social Links */}
            {/* <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1C5244] transition-colors"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1C5244] transition-colors"
                aria-label="Twitter"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div> */}
          </div>

          {/* Company Links */}
          <div className="footer-col opacity-0 lg:mx-auto">
            <h4 className="text-lg font-semibold mb-6 text-[#F8AB1D]">
              Company
            </h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    scroll={true}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions Links */}
          {/* <div className="footer-col opacity-0">
            <h4 className="text-lg font-semibold mb-6 text-[#F8AB1D]">
              Solutions
            </h4>
            <ul className="space-y-4">
              {footerLinks.solutions.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Contact Column */}
          <div className="footer-col opacity-0 lg:ml-auto">
            <h4 className="text-lg font-semibold mb-6 text-[#F8AB1D]">
              Get in Touch
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-[#1C5244] mt-1 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-gray-400 text-sm">
                  Dubai, UAE
                  <br />
                  Harare, Zimbabwe
                  <br />
                  New York, USA
                  <br />
                  Mumbai, India
                </span>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-[#1C5244] shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:investments@allterraglobal.com"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  investments@allterraglobal.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 footer-bottom opacity-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} All Terra Global. All rights reserved.
            </p>
            <div className="flex gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-gray-500 hover:text-white transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            {/* <p className="text-gray-500 text-xs">CONFIDENTIAL & PROPRIETARY</p> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
