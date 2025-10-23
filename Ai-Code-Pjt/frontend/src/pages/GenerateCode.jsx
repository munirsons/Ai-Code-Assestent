import { useState } from "react";
import EditorCard from "../components/EditorCard";

export default function GenerateCode() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("No code generated yet...");

  const handleGenerate = async () => {
    if (!prompt.trim()) return alert("Please enter a description first!");

    setOutput("⏳ Generating code...");

    try {
      const res = await fetch("http://localhost:5000/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: `Generate code for: ${prompt}` }),
      });

      const data = await res.json();
      setOutput(data.result || "⚠️ No code generated.");
    } catch (error) {
      console.error(error);
      setOutput("❌ Error connecting to backend.");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <EditorCard title="Code Request">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full h-80 p-2 border rounded-md font-mono text-sm"
          placeholder="Describe the code you want to generate..."
        />
        <button
          onClick={handleGenerate}
          className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Generate Code
        </button>
      </EditorCard>

      <EditorCard title="Generated Code">
  <div className="h-80 p-2 border rounded-md font-mono text-sm whitespace-pre-wrap bg-gray-50 overflow-y-auto overflow-x-auto">
    {output}
  </div>
</EditorCard>

    </div>
  );
}
