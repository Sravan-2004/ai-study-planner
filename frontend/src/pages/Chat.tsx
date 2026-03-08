import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Message {
  id: string;
  message: string;
  response: string;
  timestamp: string;
}

const Chat: React.FC = () => {
  const { user } = useAuthStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [subject, setSubject] = useState('Mathematics');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch chat history
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/api/chat/${user?.id}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [user]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post('/api/chat/message', {
        userId: user?.id,
        message: input,
        subject,
      });

      setMessages([...messages, { id: response.data.chatId, message: input, response: response.data.message, timestamp: new Date().toISOString() }]);
      setInput('');
      toast.success('Message sent!');
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">💬 Study Buddy Chat</h1>

      <select
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="mb-6 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
      >
        <option>Mathematics</option>
        <option>Physics</option>
        <option>Chemistry</option>
        <option>Biology</option>
        <option>History</option>
      </select>

      <div className="bg-white rounded-lg shadow-lg p-6 h-96 overflow-y-auto mb-4">
        {messages.map((msg) => (
          <div key={msg.id} className="mb-4">
            <div className="flex justify-end mb-2">
              <div className="bg-indigo-600 text-white p-3 rounded-lg max-w-xs">
                {msg.message}
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-800 p-3 rounded-lg max-w-xs">
                {msg.response}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Ask your study buddy..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
        <button
          onClick={handleSendMessage}
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default Chat;