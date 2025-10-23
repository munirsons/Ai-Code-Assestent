import { useState } from "react";
import EditorCard from "../components/EditorCard";

export default function GenerateDocs() {
  const [code, setCode] = useState("");
  const [docs, setDocs] = useState("No documentation generated yet...");

  const handleGenerateDocs = async () => {
    if (!code.trim()) return alert("Please enter your project code!");

    setDocs("⏳ Generating documentation...");

    try {
      const res = await fetch("http://localhost:5000/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: `Generate documentation for: ${code}` }),
      });

      const data = await res.json();
      setDocs(data.result || "⚠️ No documentation generated.");
    } catch (error) {
      console.error(error);
      setDocs("❌ Error connecting to backend.");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <EditorCard title="Project Code">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-80 p-2 border rounded-md font-mono text-sm"
          placeholder="Paste your project code to generate docs..."
        />
        <button
          onClick={handleGenerateDocs}
          className="mt-3 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          Generate Docs
        </button>
      </EditorCard>

      <EditorCard title="Generated Documentation">
  <div className="h-80 p-2 border rounded-md font-mono text-sm whitespace-pre-wrap bg-gray-50 overflow-y-auto overflow-x-auto">
    {docs}
  </div>
</EditorCard>

    </div>
  );
}
