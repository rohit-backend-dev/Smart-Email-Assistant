import { useState } from "react";
import EmailForm from "./EmailForm";
import EmailOutput from "./EmailOutput";
import GoProButton from "./payment/GoProButton";
import About from "./About";

export default function Home() {
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [editingEmail, setEditingEmail] = useState("");
  const [editingTone, setEditingTone] = useState("formal"); // track tone too

  const handleGenerate = async (emailContent, tone) => {
    try {
      const response = await fetch("http://localhost:8080/api/email/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailContent, tone }),
      });

      const text = await response.text();
      setGeneratedEmail(text);
      setEditingEmail("");
      setEditingTone("formal");
    } catch (err) {
      console.error(err);
      setGeneratedEmail("❌ Error generating email. Check backend.");
    }
  };

  const handleEdit = (email, tone) => {
    setEditingEmail(email);
    setEditingTone(tone);
  };

  return (
    <div
      id="home"
      className="pt-24 min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-100 scroll-smooth"
    >
      {/* Hero Section */}
      <section className="relative text-center px-6 py-16 md:py-32 bg-gradient-to-br from-blue-500 to-purple-600 text-white overflow-hidden">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
          Write Emails Effortlessly 🚀
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow-md">
          Automate your emails, get intelligent drafts, and save hours every day
          with AI-powered assistance.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a
            href="#generate"
            className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition shadow-lg"
          >
            Try It Now
          </a>
          <GoProButton />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12 text-gray-800">Features</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-3 hover:scale-105 duration-300">
              <div className="text-5xl mb-4 animate-bounce">✍️</div>
              <h3 className="text-2xl font-bold mb-2">AI Drafts</h3>
              <p>Create professional email drafts in seconds without typing a word.</p>
            </div>
            <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-3 hover:scale-105 duration-300">
              <div className="text-5xl mb-4 animate-bounce">💬</div>
              <h3 className="text-2xl font-bold mb-2">Smart Replies</h3>
              <p>Respond intelligently to emails with AI-generated suggestions.</p>
            </div>
            <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-3 hover:scale-105 duration-300">
              <div className="text-5xl mb-4 animate-bounce">📂</div>
              <h3 className="text-2xl font-bold mb-2">Organized Inbox</h3>
              <p>Keep your emails neat, categorized, and easy to manage daily.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Generator Section */}
      <section
        id="generate"
        className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12"
      >
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Enter Your Scenario ✍️
          </h2>
          <EmailForm
            onGenerate={handleGenerate}
            initialContent={editingEmail}
            initialTone={editingTone}
          />
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Your Email 📩
          </h2>
          {generatedEmail ? (
            <EmailOutput email={generatedEmail} onEdit={(email) => handleEdit(email, editingTone)} />
          ) : (
            <div className="h-[400px] flex items-center justify-center text-gray-400 border-2 border-dashed rounded-xl">
              Generated email will appear here ✨
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <About />
    </div>
  );
}
