import React from "react";
import { User, Bot } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export default function ChatMessage({
  role,
  content,
  timestamp,
}: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={`flex w-full gap-3 ${
        isUser ? "flex-row-reverse" : "flex-row"
      } animate-in fade-in slide-in-from-bottom-2 duration-300 group`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border shadow-xs ${
          isUser
            ? "bg-indigo-100 border-indigo-200 text-indigo-700"
            : "bg-blue-100 border-blue-200 text-blue-700"
        }`}
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>

      <div
        className={`flex flex-col max-w-[80%] ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        {/* Name Label */}
        <span className="text-[10px] text-gray-400 px-1 mb-1 font-medium opactiy-0 group-hover:opacity-100 transition-opacity">
          {isUser ? "You" : "Assistant"}
        </span>

        <div
          className={`px-4 py-2.5 rounded-2xl shadow-sm text-sm leading-relaxed border ${
            isUser
              ? "bg-indigo-600 text-white border-indigo-600 rounded-tr-none"
              : "bg-white text-gray-800 border-gray-100 rounded-tl-none"
          }`}
        >
          <div className="whitespace-pre-wrap wrap-break-word">{content}</div>
        </div>

        <div
          className={`text-[10px] mt-1 font-medium px-1 opacity-70 ${
            isUser ? "text-right" : "text-left"
          }`}
        >
          {timestamp}
        </div>
      </div>
    </div>
  );
}
