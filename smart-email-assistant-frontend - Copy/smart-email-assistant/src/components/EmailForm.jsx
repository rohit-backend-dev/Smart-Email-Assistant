import { useState, useEffect } from "react";

export default function EmailForm({ onGenerate, initialContent = "", initialTone = "formal" }) {
  const [content, setContent] = useState(initialContent);
  const [tone, setTone] = useState(initialTone);

  useEffect(() => {
    setContent(initialContent);
    setTone(initialTone);
  }, [initialContent, initialTone]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(content, tone);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-4 border rounded-lg h-60"
        placeholder="Describe your email scenario..."
      />
      <select
        value={tone}
        onChange={(e) => setTone(e.target.value)}
        className="w-full p-3 border rounded-lg"
      >
        <option value="formal">Formal</option>
        <option value="persuasive">Persuasive</option>
        <option value="friendly">Friendly</option>
        <option value="informal">Informal</option>
      </select>
      <button
        type="submit"
        className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
      >
        Generate Email
      </button>
    </form>
  );
}
