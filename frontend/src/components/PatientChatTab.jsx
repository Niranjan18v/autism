import React, { useState, useEffect, useRef } from 'react';
import { User } from 'lucide-react';

const PatientChatTab = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [doctorInfo, setDoctorInfo] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const userId = user?._id || user?.id;
    if (!userId) return;

    fetch(`/api/messages/doctor-for-patient/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (data.doctorUserId) {
          setDoctorInfo(data);
          fetch(`/api/messages/conversation?userId=${userId}&otherUserId=${data.doctorUserId}`)
            .then(res => res.json())
            .then(msgs => {
              if (Array.isArray(msgs)) setMessages(msgs);
            });
        }
      })
      .catch(err => console.error("Error fetching doctor/messages", err));
  }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!chatInput.trim() || !doctorInfo) return;
    const userId = user?._id || user?.id;
    const text = chatInput.trim();
    setChatInput(''); 

    const tempMsg = {
      _id: Date.now(),
      sender: { _id: userId, role: 'patient' },
      text,
      createdAt: new Date().toISOString()
    };
    setMessages(prev => [...prev, tempMsg]);

    try {
      const res = await fetch('/api/messages/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senderId: userId, receiverId: doctorInfo.doctorUserId, text })
      });
      if (res.ok) {
        const savedMsg = await res.json();
        setMessages(prev => prev.map(m => m._id === tempMsg._id ? savedMsg : m));
      }
    } catch (e) {
      console.error("Failed to send message", e);
    }
  };

  const userId = user?._id || user?.id;

  return (
    <div className="bento-card animate-slide-up" style={{ display: 'flex', flexDirection: 'column', height: '70vh', padding: 0, overflow: 'hidden', border: '1px solid #E2E8F0', borderRadius: '16px', background: 'white' }}>
      <div style={{ padding: '20px 32px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', background: '#DBEAFE', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6' }}><User size={24} /></div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
              {doctorInfo ? `Dr. ${doctorInfo.doctorName}` : 'Loading Doctor...'}
            </h3>
            <p style={{ color: '#64748B', fontWeight: 800, margin: 0, fontSize: '0.9rem' }}>
              {doctorInfo ? doctorInfo.specialization : 'Please wait'}
            </p>
          </div>
        </div>
      </div>
      
      <div style={{ flex: 1, padding: '32px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px', background: 'rgba(248, 250, 252, 0.5)' }}>
        {messages.length === 0 && <p style={{textAlign: 'center', color: '#94A3B8', marginTop: '40px'}}>No messages yet. Say hi!</p>}
        {messages.map(msg => {
          const isMe = msg.sender?._id === userId || msg.sender === userId;
          return (
            <div key={msg._id} style={{ alignSelf: isMe ? 'flex-end' : 'flex-start', maxWidth: '60%' }}>
              <div style={{ background: isMe ? '#3B82F6' : 'white', color: isMe ? 'white' : '#0F172A', padding: '16px 20px', borderRadius: '16px', borderBottomRightRadius: isMe ? '4px' : '16px', borderBottomLeftRadius: !isMe ? '4px' : '16px', fontWeight: 600, fontSize: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: isMe ? 'none' : '1px solid #E2E8F0' }}>
                {msg.text}
              </div>
              <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '6px', textAlign: isMe ? 'right' : 'left', fontWeight: 700 }}>
                {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </p>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ padding: '20px 32px', background: 'white', borderTop: '1px solid #E2E8F0', display: 'flex', gap: '16px' }}>
        <input 
          type="text" 
          value={chatInput} 
          onChange={(e) => setChatInput(e.target.value)} 
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} 
          placeholder="Type your message..." 
          disabled={!doctorInfo}
          style={{ flex: 1, padding: '12px 20px', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '1rem', fontWeight: 600, outline: 'none', transition: 'all 0.3s' }} 
          onFocus={(e) => e.target.style.borderColor = '#3B82F6'} 
          onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
        />
        <button onClick={handleSendMessage} disabled={!doctorInfo} style={{ padding: '0 32px', background: '#3B82F6', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 800, cursor: 'pointer' }}>SEND</button>
      </div>
    </div>
  );
};

export default PatientChatTab;
