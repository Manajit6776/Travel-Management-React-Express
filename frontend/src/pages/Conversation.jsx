import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Conversation = () => {
  const { bookingId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { user } = useAuth();
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (user) {
      fetchMessages();
    }
  }, [bookingId, user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/messages/booking/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      await axios.post(
        'http://localhost:5000/api/messages',
        {
          booking_id: bookingId,
          message: newMessage
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setNewMessage('');
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message');
    }
  };

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-50 text-red-600">
          <i className="fa-solid fa-circle-exclamation text-2xl"></i>
        </span>
        <h3 className="text-lg font-bold text-zinc-950">Access Denied</h3>
        <p className="text-zinc-500 text-sm">Please login to view conversations.</p>
        <Link to="/login" className="inline-flex px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl">
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-6">
      
      {/* Header link */}
      <div className="flex items-center justify-between">
        <Link 
          to={user.is_admin ? "/admin/bookings" : "/my-bookings"} 
          className="inline-flex items-center text-sm font-semibold text-zinc-500 hover:text-emerald-600 transition-colors"
        >
          <i className="fa-solid fa-arrow-left mr-2"></i>Back to {user.is_admin ? "Manage Bookings" : "My Bookings"}
        </Link>
        <span className="text-xs text-zinc-400 font-medium">Booking ID: #{bookingId}</span>
      </div>

      <div className="bg-white border border-zinc-200/85 rounded-3xl overflow-hidden shadow-sm flex flex-col h-[550px]">
        {/* Chat Header */}
        <div className="bg-zinc-50 border-b border-zinc-150/80 px-6 py-4 flex items-center space-x-3 shrink-0">
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shadow-sm">
            <i className="fa-solid fa-headset text-sm"></i>
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 text-sm">Booking Support Chat</h3>
            <p className="text-emerald-600 text-[10px] font-semibold flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping mr-1"></span>Online Helpdesk
            </p>
          </div>
        </div>

        {/* Messages Body */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-6 bg-zinc-50/50 space-y-4"
        >
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-2 p-6">
              <span className="text-zinc-300 text-3xl"><i className="fa-solid fa-comments-dollar"></i></span>
              <p className="text-zinc-500 text-sm font-medium">No messages yet.</p>
              <p className="text-zinc-400 text-xs max-w-xs">Ask any questions about payments, schedule modifications, or itineraries here.</p>
            </div>
          ) : (
            messages.map((msg) => {
              // Check if the current message belongs to the active user (right side)
              // Wait, the message has is_admin. In user's view, user's messages are (is_admin === 0), and admin's are (is_admin === 1)
              // Let's check sender: if (msg.is_admin === 1), it's Admin. If the active logged in user is admin, they want their messages on the right (msg.is_admin === 1) and user's on left.
              // So, if (user.is_admin && msg.is_admin) -> Right. If (!user.is_admin && !msg.is_admin) -> Right. Else -> Left.
              const isOutgoing = (user.is_admin && msg.is_admin) || (!user.is_admin && !msg.is_admin);

              return (
                <div
                  key={msg.id}
                  className={`flex ${isOutgoing ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[75%] rounded-2xl p-4 shadow-sm space-y-1 ${
                    isOutgoing 
                      ? 'bg-emerald-600 text-white rounded-tr-none' 
                      : 'bg-white border border-zinc-200/60 text-zinc-900 rounded-tl-none'
                  }`}>
                    {/* Sender Name */}
                    <div className="flex justify-between items-center space-x-4">
                      <span className={`text-[10px] font-bold ${isOutgoing ? 'text-emerald-200' : 'text-zinc-500'}`}>
                        {msg.sender_name}
                      </span>
                    </div>
                    {/* Message content */}
                    <p className="text-sm font-light leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                    {/* Timestamp */}
                    <p className={`text-[9px] text-right ${isOutgoing ? 'text-emerald-200/80' : 'text-zinc-400'}`}>
                      {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Chat Input Footer */}
        <div className="bg-white border-t border-zinc-150/80 p-4 shrink-0">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
            <textarea
              className="flex-1 px-4 py-2.5 text-sm border border-zinc-200 rounded-2xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 bg-zinc-50/50 resize-none h-12 max-h-12 scrollbar-none"
              placeholder="Type a message to discuss your booking..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
            ></textarea>
            <button 
              type="submit"
              disabled={!newMessage.trim()}
              className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            >
              <i className="fa-solid fa-paper-plane text-sm"></i>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Conversation;
