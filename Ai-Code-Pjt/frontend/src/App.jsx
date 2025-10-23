import { useState } from "react";
import Navbar from "./components/Navbar";
import FindBugs from "./pages/FindBugs";
import GenerateCode from "./pages/GenerateCode";
import GenerateDocs from "./pages/GenerateDocs";
import AiChat from "./pages/AiChat";

export default function App() {
  const [activeTab, setActiveTab] = useState("findBugs");

  const renderContent = () => {
    switch (activeTab) {
      case "findBugs":
        return <FindBugs />;
      case "generateCode":
        return <GenerateCode />;
      case "generateDocs":
        return <GenerateDocs />;
      case "aiChat":
        return <AiChat />;
      default:
        return <FindBugs />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex justify-center mt-6">
        <div className="flex gap-4 flex-wrap justify-center">
          <button
            onClick={() => setActiveTab("findBugs")}
            className={`px-5 py-2 rounded-full font-medium ${
              activeTab === "findBugs"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Find Bugs
          </button>

          <button
            onClick={() => setActiveTab("generateCode")}
            className={`px-5 py-2 rounded-full font-medium ${
              activeTab === "generateCode"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Generate Code
          </button>

          <button
            onClick={() => setActiveTab("generateDocs")}
            className={`px-5 py-2 rounded-full font-medium ${
              activeTab === "generateDocs"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Generate Docs
          </button>

          <button
            onClick={() => setActiveTab("aiChat")}
            className={`px-5 py-2 rounded-full font-medium ${
              activeTab === "aiChat"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            AI Chat
          </button>
        </div>
      </div>

      <div className="p-6">{renderContent()}</div>
    </div>
  );
}
