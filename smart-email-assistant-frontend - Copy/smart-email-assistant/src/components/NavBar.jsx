import React, { useState } from "react";
import { FiMenu, FiX, FiHome, FiMail, FiInfo } from "react-icons/fi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "/", icon: <FiHome /> },
    { name: "Generate", href: "#generate", icon: <FiMail /> },
    { name: "About", href: "#about", icon: <FiInfo /> },
  ];

  return (
    <nav className="w-full bg-white/90 backdrop-blur-md shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-700">SmartEmail ✉️</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-4">
          {menuItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-sm hover:bg-gray-300 transition"
              >
                {item.icon} {item.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl text-gray-700"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Smart Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-2xl text-white"
          >
            <FiX />
          </button>
        </div>

        <ul className="flex flex-col gap-4 mt-6 px-4">
          {menuItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-4 py-3 bg-gray-700 text-white rounded-sm hover:bg-gray-600 transition"
              >
                {item.icon} {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
}
