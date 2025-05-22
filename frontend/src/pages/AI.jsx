import React, { useState } from 'react';
import Hero from '../components/Hero';

const AI = () => {
  const [userMessage, setUserMessage] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [sentiment, setSentiment] = useState(null); // NEW

  const extractSentiment = (text) => {
    const match = text.match(/Sentiment:\s*(\w+)/i);
    return match ? match[1] : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAiResponse('');
    setSentiment(null); // Reset sentiment

    const formData = new FormData();
    formData.append("message", userMessage);

    try {
      const response = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      const finalResponse = data.response || data.error || 'No response';
      setAiResponse(finalResponse);

      const extracted = extractSentiment(finalResponse);
      if (extracted) {
        setSentiment(extracted);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setAiResponse("Failed to fetch response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      {/* Hero */}
      <header className="bg-gradient-to-br from-indigo-700 to-purple-800 py-16 px-6 text-center shadow-lg">
        <div className="flex justify-center items-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-300 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            <path d="M5 3v4" />
            <path d="M19 17v4" />
            <path d="M3 5h4" />
            <path d="M17 19h4" />
          </svg>
          <h1 className="text-4xl font-extrabold ml-3 tracking-wide">NexusAI</h1>
        </div>
        <p className="text-lg max-w-2xl mx-auto text-gray-200">
          Experience the power of advanced artificial intelligence. Ask anything and get intelligent responses instantly.
        </p>
      </header>

      {/* Loader */}
      {loading && (
        <div className="flex justify-center mt-12">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* AI Response and Sentiment */}
      {!loading && aiResponse && (
        <div className="max-w-6xl mx-auto mt-10 grid md:grid-cols-4 gap-6 px-4">
          <div className="md:col-span-3 bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-2">NexusAI Response</h2>
            <pre className="bg-black/50 p-4 rounded text-green-300 overflow-x-auto whitespace-pre-wrap">
              {aiResponse}
            </pre>
          </div>

          {sentiment && (
            <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-purple-500">
              <h3 className="text-lg font-bold text-purple-400 mb-3">Sentiment Analysis</h3>
              <p className="text-white text-xl font-semibold">{sentiment}</p>
            </div>
          )}
        </div>
      )}

      {/* Search Form */}
      <main className="max-w-3xl mx-auto px-6 mt-12">
        <form onSubmit={handleSubmit} className="flex items-center gap-4 bg-gray-900 p-4 rounded-xl shadow-xl transition-all duration-300 focus-within:ring-2 focus-within:ring-purple-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            name="message"
            className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
            placeholder="Ask me anything..."
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            required
          />
          <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="m22 2-7 20-4-9-9-4Z" />
              <path d="M22 2 11 13" />
            </svg>
            Send
          </button>
        </form>
      </main>

      {/* Footer */}
      <footer className="text-center mt-16 mb-4 text-gray-500 text-sm">
        © 2025 NexusAI. All rights reserved.
      </footer>
    </div>
  );
};

export default AI;
