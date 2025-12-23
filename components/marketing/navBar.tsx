"use client";

import Link from "next/link";
import React, { useState } from "react";

interface NavbarProps {
  theme?: "light" | "dark";
}

export default function NavBar({ theme = "dark" }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isLight = theme === "light";

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isLight
          ? "bg-white/90 backdrop-blur-md border-b border-gray-100"
          : "bg-[#142948]/90 backdrop-blur-md border-b border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <Link
              href="/"
              className={`text-xl md:text-2xl tracking-[0.15em] font-light uppercase transition-colors duration-500 ${
                isLight ? "text-[#142948]" : "text-white"
              }`}
            >
              PIOS
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#hero"
              className={`text-sm transition-colors duration-500 ${
                isLight
                  ? "text-gray-600 hover:text-blue-600"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Accueil
            </a>
            <Link
              href="/filieres"
              className={`text-sm transition-colors duration-500 ${
                isLight
                  ? "text-gray-600 hover:text-blue-600"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Filières
            </Link>
            <Link
              href="/universites"
              className={`text-sm transition-colors duration-500 ${
                isLight
                  ? "text-gray-600 hover:text-blue-600"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Universités
            </Link>
            <Link
              href="/bourses"
              className={`text-sm transition-colors duration-500 ${
                isLight
                  ? "text-gray-600 hover:text-blue-600"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Bourses
            </Link>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <Link
              href="/chat"
              className={`hidden sm:inline-flex px-6 py-2 text-sm border rounded-full transition-all duration-500 ${
                isLight
                  ? "border-gray-200 text-gray-700 hover:bg-gray-50"
                  : "border-white/20 text-white hover:bg-white/5"
              }`}
            >
              Chat IA
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className={`md:hidden relative w-10 h-10 flex flex-col items-center justify-center rounded-lg transition-colors focus:outline-none ${
                isLight ? "hover:bg-gray-100" : "hover:bg-white/10"
              }`}
              aria-label="Toggle menu"
            >
              <div className="w-5 h-4 relative flex flex-col justify-between overflow-hidden">
                <span
                  className={`block h-0.5 w-full transition-all duration-300 transform origin-left ${
                    isLight ? "bg-gray-600" : "bg-white"
                  } ${isMobileMenuOpen ? "rotate-45 translate-x-1" : ""}`}
                />
                <span
                  className={`block h-0.5 w-full transition-all duration-300 ${
                    isLight ? "bg-gray-600" : "bg-white"
                  } ${
                    isMobileMenuOpen
                      ? "-translate-x-full opacity-0"
                      : "opacity-100"
                  }`}
                />
                <span
                  className={`block h-0.5 w-full transition-all duration-300 transform origin-left ${
                    isLight ? "bg-gray-600" : "bg-white"
                  } ${isMobileMenuOpen ? "-rotate-45 translate-x-1" : ""}`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${
          isMobileMenuOpen
            ? "max-h-[350px] opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        } ${isLight ? "bg-white" : "bg-[#142948]"} border-t border-white/5`}
      >
        <div className="px-4 py-8 space-y-6">
          <div className="flex flex-col space-y-4">
            <a
              href="#hero"
              className={`text-lg transition-colors ${
                isLight ? "text-gray-600" : "text-gray-300"
              }`}
              onClick={closeMobileMenu}
            >
              Accueil
            </a>
            <Link
              href="/filieres"
              className={`text-lg transition-colors ${
                isLight ? "text-gray-600" : "text-gray-300"
              }`}
              onClick={closeMobileMenu}
            >
              Filières
            </Link>
            <Link
              href="/universites"
              className={`text-lg transition-colors ${
                isLight ? "text-gray-600" : "text-gray-300"
              }`}
              onClick={closeMobileMenu}
            >
              Universités
            </Link>
            <Link
              href="/bourses"
              className={`text-lg transition-colors ${
                isLight ? "text-gray-600" : "text-gray-300"
              }`}
              onClick={closeMobileMenu}
            >
              Bourses
            </Link>
          </div>
          <Link
            href="/chat"
            className="inline-flex justify-center items-center w-full py-4 bg-blue-600 text-white rounded-2xl text-base shadow-lg shadow-blue-900/10 active:scale-[0.98] transition-transform"
            onClick={closeMobileMenu}
          >
            Chat IA
          </Link>
        </div>
      </div>
    </nav>
  );
}