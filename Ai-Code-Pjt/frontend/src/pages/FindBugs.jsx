import { useState } from "react";
import EditorCard from "../components/EditorCard";

export default function FindBugs() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("No output yet...");

  const handleFindBugs = async () => {
    if (!code.trim()) return alert("Please enter some code first!");

    setOutput("⏳ Analyzing code for bugs...");

    try {
      const res = await fetch("http://localhost:5000/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();
      setOutput(data.result || "⚠️ No result returned from AI.");
    } catch (error) {
      console.error(error);
      setOutput("❌ Error connecting to the backend.");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <EditorCard title="Code Editor">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-80 p-2 border rounded-md font-mono text-sm"
          placeholder="Write or paste your code here..."
        />
        <button
          onClick={handleFindBugs}
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Find Bugs
        </button>
      </EditorCard>

      <EditorCard title="Output">
  <div className="h-80 p-2 border rounded-md font-mono text-sm whitespace-pre-wrap bg-gray-50 overflow-y-auto overflow-x-auto">
    {output}
  </div>
</EditorCard>

    </div>
  );
}
