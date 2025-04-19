'use client'
import React, { useState } from "react";
import Link from "next/link"; // Import Link for navigation

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle mobile menu visibility
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white bg-opacity-5 p-4 sticky top-0 z-50 backdrop-blur-lg shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo or Title */}
        <div className="text-2xl font-bold text-blue-800 transition-all duration-300 hover:scale-105">
          <Link href="/">PIOS</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {[
            { href: "/", label: "Home" },
            { href: "/filieres", label: "Filières" },
            { href: "/universites", label: "Universités" },
            //{ href: "/blog", label: "Blog" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-800 transition-all duration-300 hover:text-blue-800"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-gray-800 w-8 h-8 relative focus:outline-none"
            aria-label="Toggle Menu"
          >
            <div className="block w-8 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span
                className={`block absolute h-0.5 w-8 bg-gray-800 transform transition duration-300 ease-in-out ${
                  isMenuOpen ? "rotate-45" : "-translate-y-2"
                }`}
              ></span>
              <span
                className={`block absolute h-0.5 bg-gray-800 transform transition duration-300 ease-in-out ${
                  isMenuOpen ? "opacity-0 w-0" : "w-8"
                }`}
              ></span>
              <span
                className={`block absolute h-0.5 w-8 bg-gray-800 transform transition duration-300 ease-in-out ${
                  isMenuOpen ? "-rotate-45" : "translate-y-2"
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute left-0 right-0 bg-blue-800 transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        } md:hidden`}
      >
        <div className="space-y-4 p-4">
          {[
            { href: "/", label: "Home" },
            { href: "/filieres", label: "Filières" },
            { href: "/universites", label: "Universités" },
            //{ href: "/blog", label: "Blog" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white block transition-all duration-300 hover:text-gray-200 hover:pl-2"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}