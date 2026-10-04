import React, { useState, useEffect, useRef } from 'react';
import { User, MessageSquare } from 'lucide-react';
import API_BASE from '../api';

const DoctorChatTab = ({ user }) => {
  const [inbox, setInbox] = useState([]);
  const [activePatient, setActivePatient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const messagesEndRef = useRef(null);

  // Fetch inbox periodically
  useEffect(() => {
    const fetchInbox = () => {
      if (!user?._id) return;
      fetch(`${API_BASE}/api/messages/inbox/${user._id}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setInbox(data);
        })
        .catch(err => console.error("Error fetching inbox", err));
    };
    fetchInbox();
    const interval = setInterval(fetchInbox, 5000);
    return () => clearInterval(interval);
  }, [user]);

  // Fetch conversation when active patient changes
  useEffect(() => {
    if (!activePatient || !user?._id) return;
    const fetchMsgs = () => {
      fetch(`${API_BASE}/api/messages/conversation?userId=${user._id}&otherUserId=${activePatient.user._id}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setMessages(data);
        })
        .catch(err => console.error("Error fetching conversation", err));
    };
    fetchMsgs();
    const interval = setInterval(fetchMsgs, 3000);
    return () => clearInterval(interval);
  }, [activePatient, user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!chatInput.trim() || !activePatient || !user?._id) return;
    const text = chatInput.trim();
    setChatInput('');

    const tempMsg = {
      _id: Date.now(),
      sender: { _id: user._id, role: 'doctor' },
      text,
      createdAt: new Date().toISOString()
    };
    setMessages(prev => [...prev, tempMsg]);

    try {
      const res = await fetch(`${API_BASE}/api/messages/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senderId: user._id, receiverId: activePatient.user._id, text })
      });
      if (res.ok) {
        const savedMsg = await res.json();
        setMessages(prev => prev.map(m => m._id === tempMsg._id ? savedMsg : m));
      }
    } catch (e) {
      console.error("Failed to send message", e);
    }
  };

  return (
    <div className="animate-slide-up" style={{ display: 'flex', height: '75vh', gap: '20px' }}>
      
      {/* Sidebar: Inbox */}
      <div className="bento-card" style={{ width: '300px', background: 'white', border: '1px solid #E2E8F0', borderRadius: '16px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <h3 style={{ padding: '20px', margin: 0, borderBottom: '1px solid #E2E8F0', fontSize: '1.2rem', fontWeight: 800 }}>Consultations</h3>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {inbox.length === 0 && <p style={{ padding: '20px', color: '#94A3B8', textAlign: 'center', fontWeight: 600 }}>No messages yet.</p>}
          {inbox.map(item => (
            <div 
              key={item.user._id} 
              onClick={() => setActivePatient(item)}
              style={{ 
                padding: '16px 20px', 
                borderBottom: '1px solid #E2E8F0', 
                cursor: 'pointer',
                background: activePatient?.user._id === item.user._id ? '#F8FAFC' : 'white',
                borderLeft: activePatient?.user._id === item.user._id ? '4px solid #3B82F6' : '4px solid transparent'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ margin: 0, fontWeight: 700, color: '#0F172A', fontSize: '1rem' }}>{item.user.name}</p>
                {item.unread > 0 && <span style={{ background: '#EF4444', color: 'white', fontSize: '0.75rem', fontWeight: 800, padding: '2px 8px', borderRadius: '12px' }}>{item.unread}</span>}
              </div>
              <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {item.lastMessage}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="bento-card" style={{ flex: 1, background: 'white', border: '1px solid #E2E8F0', borderRadius: '16px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {!activePatient ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94A3B8' }}>
            <MessageSquare size={48} style={{ opacity: 0.2, marginBottom: '16px' }} />
            <h3 style={{ margin: 0, fontWeight: 700 }}>Select a consultation to start messaging</h3>
          </div>
        ) : (
          <>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '40px', height: '40px', background: '#DBEAFE', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6', fontWeight: 800 }}>
                {activePatient.user.name.charAt(0).toUpperCase()}
              </div>
              <h3 style={{ margin: 0, fontWeight: 800, color: '#0F172A', fontSize: '1.2rem' }}>{activePatient.user.name}</h3>
            </div>
            
            <div style={{ flex: 1, padding: '24px', overflowY: 'auto', background: '#F8FAFC', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {messages.length === 0 && <p style={{textAlign: 'center', color: '#94A3B8'}}>No messages in this conversation yet.</p>}
              {messages.map(msg => {
                const isMe = msg.sender?._id === user._id || msg.sender === user._id;
                return (
                  <div key={msg._id} style={{ alignSelf: isMe ? 'flex-end' : 'flex-start', maxWidth: '70%' }}>
                    <div style={{ background: isMe ? '#3B82F6' : 'white', color: isMe ? 'white' : '#0F172A', padding: '12px 16px', borderRadius: '12px', borderBottomRightRadius: isMe ? '4px' : '12px', borderBottomLeftRadius: !isMe ? '4px' : '12px', fontWeight: 600, fontSize: '0.95rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: isMe ? 'none' : '1px solid #E2E8F0' }}>
                      {msg.text}
                    </div>
                    <p style={{ fontSize: '0.7rem', color: '#94A3B8', marginTop: '4px', textAlign: isMe ? 'right' : 'left', fontWeight: 700 }}>
                      {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            <div style={{ padding: '16px 24px', background: 'white', borderTop: '1px solid #E2E8F0', display: 'flex', gap: '12px' }}>
              <input 
                type="text" 
                value={chatInput} 
                onChange={(e) => setChatInput(e.target.value)} 
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} 
                placeholder="Reply..." 
                style={{ flex: 1, padding: '12px 16px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '0.95rem', fontWeight: 600, outline: 'none' }} 
                onFocus={(e) => e.target.style.borderColor = '#3B82F6'} 
                onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
              />
              <button onClick={handleSendMessage} style={{ padding: '0 24px', background: '#3B82F6', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}>REPLY</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DoctorChatTab;
