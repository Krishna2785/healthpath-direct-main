import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { useSymptomCheck } from "@/hooks/useSymptomCheck";

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
}

const botResponses = [
  "Based on your symptoms, I'd recommend consulting a General Physician first. Would you like me to help you find one nearby?",
  "That's a common concern. It could be related to several factors. Can you tell me how long you've been experiencing this?",
  "I understand. For your symptoms, I'd suggest seeing a specialist. Would you like to browse available doctors in that specialty?",
  "It's important to stay hydrated and rest. If symptoms persist for more than 3 days, please visit a doctor. Shall I help you book an appointment?",
  "I can help you find the right specialist. Based on what you've described, a dermatologist or general physician would be a good starting point.",
];

const Chatbot = () => {
  const { mutate: runSymptomCheck, isPending } = useSymptomCheck();
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "bot", content: "Hello! I'm your HealthPath AI assistant. I can help you understand your symptoms and find the right doctor. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || isPending) return;

    const trimmed = input.trim();
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    runSymptomCheck(trimmed, {
      onSuccess: (data) => {
        const specialty = data.specialty;
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: "bot",
          content: `Based on your symptoms, the most appropriate medical specialty may be: ${specialty}. This is not a diagnosis. Please consult a qualified doctor for medical advice.`,
        };
        setMessages((prev) => [...prev, botMsg]);
      },
      onError: () => {
        const botMsg: Message = {
          id: (Date.now() + 2).toString(),
          role: "bot",
          content:
            "I'm having trouble reaching the AI symptom checker right now. Please try again in a moment or contact a doctor directly if this is urgent.",
        };
        setMessages((prev) => [...prev, botMsg]);
      },
    });
  };

  return (
    <div className="flex h-screen flex-col bg-background">
      <Navbar />

      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto max-w-2xl py-6 px-4 space-y-4">
          {/* Disclaimer */}
          <div className="flex items-start gap-2 rounded-xl bg-health-orange-light p-3 text-sm">
            <AlertTriangle className="h-4 w-4 text-health-orange mt-0.5 shrink-0" />
            <span className="text-foreground/80">
              This AI assistant does not provide medical diagnosis. Always consult a qualified doctor for medical advice.
            </span>
          </div>

          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
              {msg.role === "bot" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-card border border-border text-foreground rounded-bl-md"
                }`}
              >
                {msg.content}
              </div>
              {msg.role === "user" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary">
                  <User className="h-4 w-4 text-secondary-foreground" />
                </div>
              )}
            </div>
          ))}
          <div ref={endRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-border bg-card p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="container mx-auto max-w-2xl flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your symptoms (at least a few words)..."
            className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
            disabled={isPending}
          />
          <Button
            type="submit"
            size="icon"
            className="rounded-xl h-11 w-11 shrink-0"
            disabled={isPending || !input.trim()}
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
