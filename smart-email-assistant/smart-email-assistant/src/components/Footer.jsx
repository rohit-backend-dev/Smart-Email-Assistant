import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import Chatbot from "../chatbot/ChatBot";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Branding */}
        <p className="text-sm text-center md:text-left">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-indigo-400">SmartEmail</span>. All rights reserved.
        </p>

        {/* Navigation */}
        <div className="flex gap-6 text-sm">
          <a href="#home" className="hover:text-indigo-400 transition">Home</a>
          <a href="#about" className="hover:text-indigo-400 transition">About</a>
          <a href="#contact" className="hover:text-indigo-400 transition">Contact</a>
        </div>

        {/* Social Icons */}
        <div className="flex gap-5 text-4xl">
          <a
            href="https://github.com/rohit-backend-dev"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/rohit/backenddev"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-400 transition"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-sky-400 transition"
          >
            <FaTwitter />
          </a>
        </div>

          <div>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>Smart Email Assistant Chatbot</h1>
      <Chatbot />
    </div>
      </div>
    </footer>
  );
}
