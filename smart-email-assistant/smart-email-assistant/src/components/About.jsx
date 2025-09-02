import React from "react";
import { FaMagic, FaClock, FaUserTie, FaRocket } from "react-icons/fa";

const About = () => {
  return (
    <section id="about" className="bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Main About Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 mb-12">
          {/* Image / Illustration */}
          <div className="flex-1">
            <img
              src="image.png"
              alt="About SmartEmail"
              className="rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Text Section */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              About <span className="text-indigo-500">SmartEmail</span>
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              SmartEmail is your AI-powered assistant for writing clear,
              professional, and effective emails in seconds. Whether you’re
              drafting work emails, follow-ups, or personal messages, SmartEmail
              saves time and ensures impact.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Built with cutting-edge AI technology, SmartEmail adapts to your
              style and helps you communicate with confidence. 🚀
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-center hover:shadow-xl transition">
            <FaMagic className="text-indigo-500 text-3xl mb-3" />
            <h3 className="font-semibold text-lg text-gray-800 mb-2">AI-Powered</h3>
            <p className="text-gray-600 text-sm">
              Generate professional emails instantly using advanced AI models.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-center hover:shadow-xl transition">
            <FaClock className="text-indigo-500 text-3xl mb-3" />
            <h3 className="font-semibold text-lg text-gray-800 mb-2">Save Time</h3>
            <p className="text-gray-600 text-sm">
              Draft emails in seconds and focus on what really matters.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-center hover:shadow-xl transition">
            <FaUserTie className="text-indigo-500 text-3xl mb-3" />
            <h3 className="font-semibold text-lg text-gray-800 mb-2">Professional Tone</h3>
            <p className="text-gray-600 text-sm">
              Maintain clarity and confidence in every email you send.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-center hover:shadow-xl transition">
            <FaRocket className="text-indigo-500 text-3xl mb-3" />
            <h3 className="font-semibold text-lg text-gray-800 mb-2">Boost Productivity</h3>
            <p className="text-gray-600 text-sm">
              Streamline your communication workflow with ease and speed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
