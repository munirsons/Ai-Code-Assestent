// import { useState } from "react";
// import EditorCard from "../components/EditorCard";

// export default function AiChat() {
//   const [messages, setMessages] = useState([
//     { sender: "ai", text: "Hello! How can I assist you today?" },
//   ]);
//   const [input, setInput] = useState("");

//   const sendMessage = () => {
//     if (!input.trim()) return;
//     setMessages([...messages, { sender: "user", text: input }]);
//     setInput("");
//   };

//   return (
//     <EditorCard title="AI Chat">
//       <div className="h-80 p-2 border rounded-md bg-gray-50 overflow-y-auto overflow-x-auto">
//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             className={`mb-2 ${
//               msg.sender === "user" ? "text-right" : "text-left"
//             }`}
//           >
//             <span
//               className={`inline-block px-3 py-2 rounded-lg break-words max-w-full ${
//                 msg.sender === "user"
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-200 text-gray-800"
//               }`}
//             >
//               {msg.text}
//             </span>
//           </div>
//         ))}
//       </div>

//       <div className="mt-3 flex gap-2">
//         <textarea
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type your message..."
//           className="flex-1 border p-2 rounded-md resize-none overflow-y-auto max-h-32"
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//         >
//           Send
//         </button>
//       </div>
//     </EditorCard>
//   );
// }


import { useState } from "react";
import axios from "axios";
import EditorCard from "../components/EditorCard";

export default function AiChat() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/ai/chat", {
        prompt: input,
      });

      const aiMessage = {
        sender: "ai",
        text: response.data.reply || "No response from AI.",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error calling AI service:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "⚠️ Error connecting to AI service." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <EditorCard title="AI Chat">
      <div className="h-80 p-2 border rounded-md bg-gray-50 overflow-y-auto overflow-x-auto">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-2 ${
              msg.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block px-3 py-2 rounded-lg break-words max-w-full ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}

        {loading && (
          <div className="text-left text-gray-500 italic">AI is typing...</div>
        )}
      </div>

      <div className="mt-3 flex gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border p-2 rounded-md resize-none overflow-y-auto max-h-32"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </EditorCard>
  );
}
