'use client'
import isAuth from '@/components/isAuth';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Chat = () => {
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
  const [input, setInput] = useState('');
  const [htmlPreview, setHtmlPreview] = useState<string>('<html><h5>Search Something</h5></html>');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;
    if(messages.length>9)
    return toast.info("Cannot keep more than 10 chats. Please Reload")

    setMessages((prev) => [...prev, { user: input, bot: '' }]);
    setInput('');
    setLoading(true); 
    let prompt=""
    messages.forEach((el)=>prompt+=el.user+"#")
    prompt+=input
    try {
    
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt }),
      });

      const data = await res.json();
      if (!data.error) {
        const html = data.htmlCss.replace("```html\n", "").replace("```", "");
        setHtmlPreview(html);
      }
    } catch (err) {
      console.log("Error generating HTML/CSS"+err);
    } finally {
      setLoading(false); 
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([htmlPreview], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = 'generated.html';
    document.body.appendChild(element); 
    element.click(); 
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-teal-100 flex flex-col items-center justify-center p-4 relative">
      <button
        onClick={handleSignOut}
        className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-600 transition"
      >
        Sign Out
      </button>
      
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-5xl flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">Chat with our Bot</h1>
          <div className="messages space-y-4 mb-6 overflow-y-auto h-96 custom-scrollbar">
            {messages.map((msg, index) => (
              <div key={index} className="message flex flex-col space-y-2">
                <div className="user-message p-4 bg-indigo-500 text-white rounded-lg max-w-xs self-start">
                  <strong>User:</strong> {msg.user}
                </div>
                {msg.bot && (
                  <div className="bot-message p-4 bg-gray-300 text-gray-800 rounded-lg max-w-xs self-end">
                    <strong>Bot:</strong> {msg.bot}
                  </div>
                )}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your HTML/CSS prompt..."
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            />
            <button
              type="submit"
              className="w-full p-3 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 transition"
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Send'}
            </button>
          </form>
        </div>

        <div className="w-full md:w-1/2 bg-gray-100 p-6 rounded-xl shadow-xl mt-8 md:mt-0">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Live Preview</h2>
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="spinner border-t-4 border-b-4 border-teal-500 rounded-full w-16 h-16 animate-spin"></div>
            </div>
          ) : (
            <>
            <iframe
              title="Live Preview"
              srcDoc={htmlPreview}
              className="w-full h-full border p-4 bg-white rounded-lg overflow-auto max-h-[400px] box-border"
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
            <button
            onClick={handleDownload}
            className="mt-4 p-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition w-full"
          >
            Download HTML
          </button></>
          )}
         
        </div>
      </div>
    </div>
  );
};

export default isAuth(Chat);
