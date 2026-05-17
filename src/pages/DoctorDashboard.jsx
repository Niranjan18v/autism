import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, Users, FileText, Activity, MessageSquare, LogOut, Bell, Search, 
  CheckCircle2, Clock, Plus, Video, ChevronRight, Filter, Send, MoreHorizontal, 
  Stethoscope, TrendingUp, UserPlus, Calendar, X, PieChart, ClipboardList, User, Settings, Sparkles
} from 'lucide-react'

function DoctorDashboard() {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('dashboard')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [directive, setDirective] = useState('')
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Review behavior log for Arjun', type: 'Clinical Review', time: '10:00 AM', done: false, color: '#8B5CF6' },
    { id: 2, text: 'Approve level upgrade for Diya', type: 'Assessment', time: '11:30 AM', done: false, color: '#10B981' },
    { id: 3, text: 'Reply to Mrs. Patel (Rohan)', type: 'Consultation', time: '02:00 PM', done: true, color: '#F472B6' }
  ])

  const stats = [
    { id: 'patients', label: 'Total Cases', value: '32', note: '18 Active Sessions', color: '#8B5CF6', icon: <Users size={24}/> },
    { id: 'tasks', label: "Clinical Tasks", value: tasks.filter(t => !t.done).length.toString(), note: 'Awaiting review', color: '#10B981', icon: <Activity size={24}/> },
    { id: 'messages', label: 'Consultations', value: '5', note: '2 New Requests', color: '#F472B6', icon: <MessageSquare size={24}/> },
    { id: 'progress', label: 'Digital Files', value: '14', note: 'Updated today', color: '#38BDF8', icon: <FileText size={24}/> }
  ]

  const patients = [
    { id: 1, name: 'Arjun Kumar', age: 6, level: 'Level 2', status: 'In Therapy', lastUpdate: '2 hrs ago', levelColor: '#F59E0B', hospital: 'Chennai South Clinic', diagnosis: 'Mild ASD', communication: 82, emotional: 64 },
    { id: 2, name: 'Diya Sharma', age: 4, level: 'Level 1', status: 'Monitoring', lastUpdate: '5 hrs ago', levelColor: '#10B981', hospital: 'Madurai Rural Clinic', diagnosis: 'Speech Delay', communication: 90, emotional: 85 },
    { id: 3, name: 'Rohan Patel', age: 7, level: 'Level 3', status: 'Critical Review', lastUpdate: '1 day ago', levelColor: '#EF4444', hospital: 'Chennai South Clinic', diagnosis: 'Moderate ASD', communication: 45, emotional: 30 },
    { id: 4, name: 'Kavita Singh', age: 5, level: 'Level 2', status: 'In Therapy', lastUpdate: '3 hrs ago', levelColor: '#F59E0B', hospital: 'Delhi Central', diagnosis: 'Sensory Processing', communication: 70, emotional: 55 }
  ]

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskType, setNewTaskType] = useState('Clinical Review');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    const colors = {
      'Clinical Review': '#8B5CF6',
      'Assessment': '#10B981',
      'Consultation': '#F472B6'
    };
    const newTask = {
      id: Date.now(),
      text: newTaskText,
      type: newTaskType,
      time: 'Just now',
      done: false,
      color: colors[newTaskType] || '#6366F1'
    };
    setTasks([newTask, ...tasks]);
    setNewTaskText('');
  };

  const renderDashboard = () => (
    <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Top Audited Metrics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
        {stats.map((stat, i) => (
          <div key={i} className="bento-card btn-pop" style={{ padding: '24px', background: 'white', borderRadius: '24px', border: '1px solid rgba(226, 232, 240, 0.8)', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.02)', display: 'flex', flexDirection: 'column', gap: '16px', transition: 'all 0.2s' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div style={{ color: stat.color, background: stat.color + '15', width: '48px', height: '48px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{stat.icon}</div>
               <TrendingUp size={16} style={{ color: '#94A3B8' }} />
            </div>
            <div>
               <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0F172A', margin: '0 0 2px 0', letterSpacing: '-0.5px' }}>{stat.value}</h3>
               <p style={{ color: '#64748B', fontWeight: 700, fontSize: '0.9rem', margin: 0 }}>{stat.label}</p>
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 850, padding: '6px 14px', borderRadius: '100px', color: stat.color, background: stat.color + '10', alignSelf: 'flex-start' }}>{stat.note}</span>
          </div>
        ))}
      </div>

      {/* Main Core Layout Panels */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1.3fr', gap: '32px', alignItems: 'flex-start' }}>
        
        {/* Left Card: Active Patient Monitor Flow */}
        <section className="bento-card" style={{ padding: '36px', background: 'white', border: '1px solid rgba(226, 232, 240, 0.8)', borderRadius: '32px', boxShadow: '0 20px 50px rgba(15, 23, 42, 0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
            <div>
               <h2 style={{ fontSize: '1.4rem', fontWeight: 900, margin: 0, color: '#0F172A', letterSpacing: '-0.3px' }}>Active Patient Flow</h2>
               <p style={{ color: '#64748B', fontSize: '0.85rem', fontWeight: 650, margin: '4px 0 0' }}>Real-time telemetry of clinical therapy states and synch status.</p>
            </div>
            <button onClick={() => setCurrentTab('patients')} className="btn-pop" style={{ padding: '10px 20px', background: '#0F172A', color: 'white', border: 'none', borderRadius: '100px', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer', boxShadow: '0 10px 20px rgba(15, 23, 42, 0.15)' }}>Full Registry</button>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#F8FAFC' }}>
                  <th style={{ textAlign: 'left', padding: '14px 18px', color: '#64748B', fontSize: '0.75rem', fontWeight: 850, textTransform: 'uppercase', letterSpacing: '0.5px', borderRadius: '12px 0 0 12px' }}>PATIENT PROFILE</th>
                  <th style={{ textAlign: 'left', padding: '14px 18px', color: '#64748B', fontSize: '0.75rem', fontWeight: 850, textTransform: 'uppercase', letterSpacing: '0.5px' }}>THERAPEUTIC STATUS</th>
                  <th style={{ textAlign: 'left', padding: '14px 18px', color: '#64748B', fontSize: '0.75rem', fontWeight: 850, textTransform: 'uppercase', letterSpacing: '0.5px' }}>LEVEL TIER</th>
                  <th style={{ textAlign: 'left', padding: '14px 18px', color: '#64748B', fontSize: '0.75rem', fontWeight: 850, textTransform: 'uppercase', letterSpacing: '0.5px', borderRadius: '0 12px 12px 0' }}>LAST PORTAL SYNC</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.slice(0, 4).map(p => {
                  const getStatusLabel = (status) => {
                    switch (status) {
                      case 'In Therapy':
                        return { bg: '#E0F2FE', text: '#0369A1', dot: '#0284C7' };
                      case 'Monitoring':
                        return { bg: '#E0F2FE', text: '#2563EB', dot: '#2563EB' }; // Using slate matching monitoring blue
                      case 'Critical Review':
                        return { bg: '#FEE2E2', text: '#991B1B', dot: '#EF4444' };
                      default:
                        return { bg: '#F1F5F9', text: '#475569', dot: '#64748B' };
                    }
                  };
                  const statusLabel = getStatusLabel(p.status);
                  const isSelected = selectedPatient && selectedPatient.id === p.id;
                  
                  return (
                    <tr 
                      key={p.id} 
                      style={{ 
                        cursor: 'pointer', 
                        borderBottom: '1px solid #F1F5F9', 
                        background: isSelected ? '#F5F3FF' : 'transparent',
                        transition: 'all 0.15s'
                      }} 
                      onClick={() => {
                        setSelectedPatient(p);
                        setCurrentTab('patients');
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#FAF5FF'}
                      onMouseLeave={(e) => e.currentTarget.style.background = isSelected ? '#F5F3FF' : 'transparent'}
                    >
                      <td style={{ padding: '16px 18px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                          <div style={{ 
                            width: '40px', 
                            height: '40px', 
                            background: p.levelColor + '15', 
                            color: p.levelColor, 
                            borderRadius: '12px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            fontWeight: 900, 
                            fontSize: '1rem' 
                          }}>
                            {p.name.charAt(0)}
                          </div>
                          <div>
                            <p style={{ fontWeight: 800, margin: 0, fontSize: '0.95rem', color: '#0F172A' }}>{p.name}</p>
                            <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)', fontWeight: 700 }}>{p.diagnosis}</span>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px 18px' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 900, background: statusLabel.bg, color: statusLabel.text }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: statusLabel.dot }}></span>
                          {p.status}
                        </div>
                      </td>
                      <td style={{ padding: '16px 18px' }}>
                        <span style={{ 
                          fontWeight: 900, 
                          fontSize: '0.75rem', 
                          background: p.levelColor + '10', 
                          color: p.levelColor, 
                          padding: '6px 14px', 
                          borderRadius: '100px',
                          border: '1px solid ' + p.levelColor + '20',
                          textTransform: 'uppercase'
                        }}>
                          {p.level}
                        </span>
                      </td>
                      <td style={{ padding: '16px 18px' }}><span style={{ color: 'var(--slate-400)', fontSize: '0.85rem', fontWeight: 700 }}>{p.lastUpdate}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Right Card: Clinical To-Do & Quick Task Input */}
        <section className="bento-card" style={{ padding: '36px', background: 'white', border: '1px solid rgba(226, 232, 240, 0.8)', borderRadius: '32px', boxShadow: '0 20px 50px rgba(15, 23, 42, 0.03)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 900, margin: '0 0 6px 0', color: '#0F172A', letterSpacing: '-0.3px' }}>Clinical To-Do</h2>
          <p style={{ color: '#64748B', fontSize: '0.85rem', fontWeight: 650, margin: '0 0 24px 0' }}>Daily clinical directives and task reviews.</p>
          
          {/* Custom Interactive Task List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {tasks.map(task => (
              <div 
                key={task.id} 
                className="btn-pop"
                style={{ 
                  display: 'flex', 
                  gap: '14px', 
                  padding: '16px 20px', 
                  background: task.done ? '#F8FAFC' : 'white', 
                  border: '1.5px solid #F1F5F9',
                  borderRadius: '20px', 
                  borderLeft: '5px solid ' + (task.done ? '#CBD5E1' : task.color),
                  boxShadow: '0 4px 12px rgba(15, 23, 42, 0.01)',
                  opacity: task.done ? 0.75 : 1,
                  transition: 'all 0.2s',
                  alignItems: 'center'
                }}
              >
                <div 
                  onClick={() => toggleTask(task.id)} 
                  style={{ 
                    cursor: 'pointer', 
                    width: '22px', 
                    height: '22px', 
                    borderRadius: '8px', 
                    border: '2px solid', 
                    borderColor: task.done ? '#10B981' : '#CBD5E1', 
                    background: task.done ? '#10B981' : 'transparent', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    flexShrink: 0,
                    transition: 'all 0.15s'
                  }}
                >
                  {task.done && <CheckCircle2 size={12} color="white" />}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 800, fontSize: '0.95rem', color: task.done ? '#94A3B8' : '#0F172A', textDecoration: task.done ? 'line-through' : 'none', margin: '0 0 4px 0', transition: 'all 0.15s' }}>{task.text}</p>
                  <div style={{ display: 'flex', gap: '10px', fontSize: '0.75rem', fontWeight: 800, alignItems: 'center' }}>
                    <span style={{ color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '4px' }}>🕒 {task.time}</span>
                    <span style={{ color: task.color, background: task.color + '10', padding: '2px 8px', borderRadius: '100px' }}>{task.type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Task Creation Console */}
          <form onSubmit={handleAddTask} style={{ marginTop: '28px', borderTop: '1px solid #F1F5F9', paddingTop: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
             <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Quick Directive Injector</h4>
             <div style={{ display: 'flex', gap: '8px' }}>
                <input 
                  type="text" 
                  placeholder="Inject new directive text..." 
                  value={newTaskText} 
                  onChange={(e) => setNewTaskText(e.target.value)} 
                  style={{ flex: 1, padding: '12px 18px', border: '2px solid #E2E8F0', borderRadius: '14px', outline: 'none', fontWeight: 600, fontSize: '0.9rem', transition: '0.2s' }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--p-500)'}
                  onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
                />
                <button type="submit" className="btn-pop" style={{ background: '#0F172A', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '14px', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer', transition: '0.2s' }}>
                  <Plus size={16} />
                </button>
             </div>
             
             <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94A3B8' }}>Category:</span>
                {['Clinical Review', 'Assessment', 'Consultation'].map((cat) => (
                  <button 
                    key={cat}
                    type="button"
                    onClick={() => setNewTaskType(cat)}
                    style={{ 
                      border: 'none',
                      background: newTaskType === cat ? '#F5F3FF' : 'transparent',
                      color: newTaskType === cat ? 'var(--p-500)' : '#64748B',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      border: newTaskType === cat ? '1px solid var(--p-200)' : '1px solid transparent',
                      transition: 'all 0.15s'
                    }}
                  >
                    {cat}
                  </button>
                ))}
             </div>
          </form>

        </section>
      </div>
    </div>
  );

  const renderPatients = () => (
    <div className="animate-slide-up" style={{ display: 'flex', gap: '32px', alignItems: 'flex-start', width: '100%' }}>
      {/* Patient List Card Container */}
      <div className="bento-card" style={{ flex: '1', padding: '36px', background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(20px)', borderRadius: '32px', border: '1px solid rgba(226, 232, 240, 0.8)', boxShadow: '0 20px 50px rgba(15, 23, 42, 0.04)', transition: 'all 0.3s' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 900, margin: 0, color: 'var(--slate-900)', letterSpacing: '-0.5px' }}>Patient Registry</h2>
            <p style={{ color: 'var(--slate-500)', fontWeight: 650, fontSize: '1rem', margin: '4px 0 0' }}>Full access to all Case IDs and therapy metrics.</p>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
             <button className="btn-pop" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '10px 20px', borderRadius: '100px', color: '#475569', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s' }}>
               <Filter size={15} /> 
               <span>Filters</span>
             </button>
             <button className="btn-pop" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '100px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', boxShadow: '0 10px 20px rgba(139, 92, 246, 0.25)', transition: 'all 0.2s' }}>
               <UserPlus size={15} /> 
               <span>Add Case</span>
             </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: selectedPatient ? '1fr' : 'repeat(2, 1fr)', gap: '24px', transition: 'all 0.3s' }}>
           {filteredPatients.map(p => {
             const avgProgress = Math.round((p.communication + p.emotional) / 2);
             const getStatusStyle = (status) => {
               switch (status) {
                 case 'In Therapy':
                   return { bg: 'rgba(124, 58, 237, 0.08)', text: '#7C3AED', icon: '💜' };
                 case 'Monitoring':
                   return { bg: 'rgba(37, 99, 235, 0.08)', text: '#2563EB', icon: '💙' };
                 case 'Critical Review':
                   return { bg: 'rgba(239, 68, 68, 0.08)', text: '#EF4444', icon: '❤️' };
                 default:
                   return { bg: '#F8FAFC', text: '#475569', icon: '✨' };
               }
             };
             const statusStyle = getStatusStyle(p.status);
             const isSelected = selectedPatient && selectedPatient.id === p.id;
             const cardBg = p.level === 'Level 1' 
               ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.02) 0%, rgba(255, 255, 255, 1) 100%)'
               : p.level === 'Level 2'
                 ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.02) 0%, rgba(255, 255, 255, 1) 100%)'
                 : 'linear-gradient(135deg, rgba(239, 68, 68, 0.02) 0%, rgba(255, 255, 255, 1) 100%)';
             const levelBadgeBg = p.level === 'Level 1' ? '#D1FAE5' : p.level === 'Level 2' ? '#FEF3C7' : '#FEE2E2';
             const levelBadgeText = p.level === 'Level 1' ? '#065F46' : p.level === 'Level 2' ? '#92400E' : '#991B1B';

             return (
               <div 
                 key={p.id} 
                 onClick={() => setSelectedPatient(p)} 
                 className="bento-card btn-pop" 
                 style={{ 
                   padding: '24px', 
                   cursor: 'pointer', 
                   background: cardBg, 
                   border: isSelected ? '2px solid #8B5CF6' : '1.5px solid #F1F5F9', 
                   borderLeft: isSelected ? '6px solid #8B5CF6' : `6px solid ${p.levelColor}`,
                   borderRadius: '24px',
                   boxShadow: isSelected ? '0 12px 30px rgba(139, 92, 246, 0.12)' : '0 10px 30px rgba(15, 23, 42, 0.02)',
                   display: 'flex',
                   flexDirection: 'column',
                   gap: '16px',
                   transition: 'all 0.3s'
                 }}
               >
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                     <div style={{ 
                       width: '64px', 
                       height: '64px', 
                       background: levelBadgeBg, 
                       color: p.levelColor, 
                       borderRadius: '18px', 
                       display: 'flex', 
                       alignItems: 'center', 
                       justifyContent: 'center', 
                       fontSize: '1.5rem', 
                       fontWeight: 900, 
                       flexShrink: 0,
                       position: 'relative'
                     }}>
                       {p.name.charAt(0)}
                       <span style={{ position: 'absolute', top: '-3px', right: '-3px', width: '12px', height: '12px', borderRadius: '50%', background: '#10B981', border: '2px solid white' }}></span>
                     </div>
                     
                     <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                           <h4 style={{ fontSize: '1.3rem', fontWeight: 900, margin: 0, color: '#0F172A', letterSpacing: '-0.3px' }}>{p.name}</h4>
                           <span style={{ 
                             fontWeight: 900, 
                             fontSize: '0.75rem', 
                             background: levelBadgeBg, 
                             color: levelBadgeText,
                             padding: '4px 12px',
                             borderRadius: '100px',
                             letterSpacing: '0.3px',
                             textTransform: 'uppercase'
                           }}>
                             {p.level}
                           </span>
                        </div>
                        
                        <p style={{ fontSize: '0.95rem', color: 'var(--slate-500)', fontWeight: 650, margin: '4px 0 8px' }}>
                          {p.diagnosis} • <span style={{ color: 'var(--slate-400)' }}>{p.hospital}</span>
                        </p>
                        
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          <span style={{ background: '#F1F5F9', color: '#475569', padding: '4px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 800 }}>
                            👶 Age {p.age}
                          </span>
                          <span style={{ background: statusStyle.bg, color: statusStyle.text, padding: '4px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 800 }}>
                            {statusStyle.icon} {p.status}
                          </span>
                        </div>
                     </div>
                  </div>

                  {/* Development Progress Inline Telemetry Bar */}
                  <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '14px', marginTop: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Activity size={12} color={p.levelColor} />
                        Development Score
                      </span>
                      <span style={{ fontSize: '0.8rem', fontWeight: 900, color: p.levelColor }}>
                        ✨ {avgProgress}% Average
                      </span>
                    </div>
                    <div style={{ height: '6px', background: '#F1F5F9', borderRadius: '100px', overflow: 'hidden' }}>
                      <div style={{ width: `${avgProgress}%`, height: '100%', background: `linear-gradient(90deg, ${p.levelColor}, #6366F1)`, borderRadius: '100px' }}></div>
                    </div>
                  </div>

               </div>
             );
           })}
        </div>
      </div>

      {/* Patient Record Detail Panel (Inline side-by-side) */}
      {selectedPatient && (
        <div className="bento-card animate-slide-up" style={{ flex: '1.2', padding: '36px', background: 'white', borderRadius: '32px', border: '1px solid rgba(226, 232, 240, 0.8)', boxShadow: '0 20px 50px rgba(15, 23, 42, 0.04)', display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative', transition: 'all 0.3s' }}>
          <button onClick={() => setSelectedPatient(null)} style={{ position: 'absolute', top: '24px', right: '24px', background: '#F8FAFC', border: 'none', padding: '10px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', color: '#64748B' }} onMouseEnter={e => e.currentTarget.style.background = '#E2E8F0'} onMouseLeave={e => e.currentTarget.style.background = '#F8FAFC'}><X size={18} /></button>
          
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
             <div style={{ 
               width: '80px', 
               height: '80px', 
               background: `${selectedPatient.levelColor}15`, 
               color: selectedPatient.levelColor, 
               borderRadius: '24px', 
               display: 'flex', 
               alignItems: 'center', 
               justifyContent: 'center', 
               fontSize: '2rem', 
               fontWeight: 900, 
               boxShadow: `0 10px 25px ${selectedPatient.levelColor}20`,
               flexShrink: 0 
             }}>
               {selectedPatient.name.charAt(0)}
             </div>
             <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <h3 style={{ fontSize: '1.8rem', fontWeight: 900, margin: 0, color: '#0F172A', letterSpacing: '-0.3px' }}>{selectedPatient.name}</h3>
                   <span style={{ 
                     background: `${selectedPatient.levelColor}15`, 
                     color: selectedPatient.levelColor, 
                     padding: '6px 16px', 
                     borderRadius: '100px', 
                     fontWeight: 900, 
                     fontSize: '0.75rem', 
                     letterSpacing: '0.5px', 
                     textTransform: 'uppercase', 
                     border: `1.5px solid ${selectedPatient.levelColor}30` 
                   }}>
                     {selectedPatient.level} Support
                   </span>
                </div>
                <p style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--slate-400)', margin: '4px 0 0' }}>CASE-ID: {selectedPatient.id}X9 • {selectedPatient.diagnosis}</p>
             </div>
          </div>

          {/* Metric boxes row */}
          <div style={{ display: 'flex', gap: '16px' }}>
             <div style={{ padding: '12px 20px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '16px', flex: 1 }}>
                <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--slate-400)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>PATIENT AGE</p>
                <p style={{ margin: '4px 0 0', fontWeight: 900, fontSize: '1.05rem', color: '#0F172A' }}>{selectedPatient.age} Years</p>
             </div>
             <div style={{ padding: '12px 20px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '16px', flex: 1.5 }}>
                <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--slate-400)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>CENTER LOCATION</p>
                <p style={{ margin: '4px 0 0', fontWeight: 900, fontSize: '1.05rem', color: '#0F172A' }}>{selectedPatient.hospital}</p>
             </div>
          </div>

          {/* Action buttons row */}
          <div style={{ display: 'flex', gap: '12px' }}>
             <button onClick={() => navigate('/report')} className="btn-pop" style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#0F172A', color: 'white', border: 'none', padding: '14px 20px', borderRadius: '16px', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s' }}><FileText size={15} /> Clinical Report</button>
             <button className="btn-pop" style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)', color: 'white', border: 'none', padding: '14px 20px', borderRadius: '16px', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 10px 20px rgba(139, 92, 246, 0.15)' }}><Video size={15} /> Tele-Consult</button>
          </div>

          {/* Therapeutic Metrics */}
          <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
             <h4 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '8px', color: '#0F172A' }}><Activity size={18} color="var(--p-500)"/> Therapeutic Metrics</h4>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontWeight: 800, fontSize: '0.9rem' }}><span>Social Communication</span><span style={{ color: 'var(--s-500)' }}>{selectedPatient.communication}%</span></div>
                   <div style={{ height: '8px', background: 'var(--slate-100)', borderRadius: '4px' }}><div style={{ width: `${selectedPatient.communication}%`, height: '100%', background: 'var(--s-500)', borderRadius: '4px' }}></div></div>
                </div>
                <div>
                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontWeight: 800, fontSize: '0.9rem' }}><span>Emotional Regulation</span><span style={{ color: 'var(--p-500)' }}>{selectedPatient.emotional}%</span></div>
                   <div style={{ height: '8px', background: 'var(--slate-100)', borderRadius: '4px' }}><div style={{ width: `${selectedPatient.emotional}%`, height: '100%', background: 'var(--p-500)', borderRadius: '4px' }}></div></div>
                </div>
             </div>

             <div style={{ padding: '20px', background: 'var(--slate-50)', border: '1px solid var(--slate-200)', borderRadius: '20px', marginTop: '4px' }}>
                <h5 style={{ fontWeight: 800, margin: '0 0 12px 0', fontSize: '1rem' }}>Current Activity Protocol</h5>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                   <span style={{ background: '#E0F2FE', color: '#0369A1', padding: '6px 12px', borderRadius: '100px', fontWeight: 700, fontSize: '0.8rem' }}>Emotion Matching</span>
                   <span style={{ background: '#DCFCE7', color: '#15803D', padding: '6px 12px', borderRadius: '100px', fontWeight: 700, fontSize: '0.8rem' }}>Bubble Sensory Pop</span>
                   <button className="btn-pop" style={{ padding: '4px 12px', fontSize: '0.75rem', background: 'white', color: 'var(--p-500)', border: '1.5px solid var(--p-500)', borderRadius: '100px', cursor: 'pointer', fontWeight: 800 }}><Plus size={12}/> Add Task</button>
                </div>
             </div>
          </div>

          {/* Directives Section */}
          <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
             <h4 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '8px', color: '#0F172A' }}><ClipboardList size={18} color="var(--p-500)"/> Directives</h4>
             <textarea 
               placeholder="Type clinical directives for the caregiver..." 
               value={directive}
               onChange={(e) => setDirective(e.target.value)}
               style={{ width: '100%', height: '120px', borderRadius: '20px', border: '2px solid var(--slate-200)', padding: '16px', fontWeight: 600, fontSize: '0.95rem', outline: 'none', resize: 'none', transition: '0.3s' }} 
               onFocus={(e) => e.target.style.borderColor = 'var(--p-500)'}
             />
             <button onClick={() => { alert('Directive issued successfully!'); setDirective(''); }} className="btn-pop" style={{ width: '100%', padding: '14px', background: 'var(--p-500)', color: 'white', border: 'none', borderRadius: '16px', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer', boxShadow: '0 10px 20px rgba(139, 92, 246, 0.15)', transition: 'all 0.2s' }}>SYNC DIRECTIVE TO PORTAL</button>
          </div>
        </div>
      )}
    </div>
  );

const renderAnalytics = () => (
    <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Overview Analytics Banner */}
      <div className="bento-card" style={{ padding: '36px', background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', color: 'white', borderRadius: '32px', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)' }}>
         <div>
            <span style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '6px 14px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Clinical Telemetry Dashboard</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 900, margin: '14px 0 6px 0', letterSpacing: '-0.5px', color: 'white' }}>Enterprise Case Insights</h2>
            <p style={{ color: 'var(--slate-400)', fontWeight: 600, fontSize: '1rem', margin: 0 }}>Real-time developmental trends, therapist saturation levels, and clinical compliance trackers.</p>
         </div>
         <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ textAlign: 'right', borderRight: '2px solid rgba(255,255,255,0.1)', paddingRight: '24px' }}>
               <span style={{ fontSize: '0.8rem', color: 'var(--slate-400)', fontWeight: 700, textTransform: 'uppercase' }}>Active Cases</span>
               <h3 style={{ fontSize: '2rem', fontWeight: 900, margin: '4px 0 0', color: '#10B981' }}>10 Patients</h3>
            </div>
            <div style={{ textAlign: 'right' }}>
               <span style={{ fontSize: '0.8rem', color: 'var(--slate-400)', fontWeight: 700, textTransform: 'uppercase' }}>Avg Engagement</span>
               <h3 style={{ fontSize: '2rem', fontWeight: 900, margin: '4px 0 0', color: '#8B5CF6' }}>92.4% Adherence</h3>
            </div>
         </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '32px' }}>
        
        {/* Left Card: Case Breakdown Donut Chart */}
        <div className="bento-card" style={{ padding: '36px', background: 'white', border: '1px solid rgba(226, 232, 240, 0.8)', borderRadius: '32px', boxShadow: '0 20px 50px rgba(15, 23, 42, 0.03)' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 900, margin: '0 0 24px 0', color: '#0F172A', letterSpacing: '-0.3px' }}>Case Severity Breakdown</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px' }}>
            {/* SVG Donut Chart */}
            <div style={{ position: 'relative', width: '180px', height: '180px' }}>
               <svg width="100%" height="100%" viewBox="0 0 200 200">
                  {/* Outer circle background track */}
                  <circle cx="100" cy="100" r="70" fill="transparent" stroke="#F1F5F9" strokeWidth="24" />
                  
                  {/* Segment 1: Level 1 (50%) -> Length: 220, Offset: 0 */}
                  <circle cx="100" cy="100" r="70" fill="transparent" stroke="#10B981" strokeWidth="24" 
                          strokeDasharray="220 440" strokeDashoffset="0" transform="rotate(-90 100 100)" />
                  
                  {/* Segment 2: Level 2 (30%) -> Length: 132, Offset: -220 */}
                  <circle cx="100" cy="100" r="70" fill="transparent" stroke="#F59E0B" strokeWidth="24" 
                          strokeDasharray="132 440" strokeDashoffset="-220" transform="rotate(-90 100 100)" />
                  
                  {/* Segment 3: Level 3 (20%) -> Length: 88, Offset: -352 */}
                  <circle cx="100" cy="100" r="70" fill="transparent" stroke="#EF4444" strokeWidth="24" 
                          strokeDasharray="88 440" strokeDashoffset="-352" transform="rotate(-90 100 100)" />
                          
                  {/* Inner cut-out to form Donut */}
                  <circle cx="100" cy="100" r="54" fill="white" />
               </svg>
               {/* Center text overlay */}
               <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translateY(-50%) translateX(-50%)', textAlign: 'center' }}>
                  <span style={{ fontSize: '2rem', fontWeight: 900, color: '#0F172A', display: 'block', lineHeight: 1 }}>10</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--slate-400)', textTransform: 'uppercase', display: 'block', marginTop: '4px' }}>Total Cases</span>
               </div>
            </div>

            {/* Custom Interactive Legend Row */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
               {[
                 { label: 'Mild Support (L1)', value: '5 Patients', color: '#10B981', pct: 50 },
                 { label: 'Moderate Support (L2)', value: '3 Patients', color: '#F59E0B', pct: 30 },
                 { label: 'Severe Support (L3)', value: '2 Patients', color: '#EF4444', pct: 20 }
               ].map((item, idx) => (
                 <div key={idx}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                       <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569' }}>
                         <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: item.color }}></span>
                         {item.label}
                       </span>
                       <span style={{ color: '#0F172A' }}>{item.value} ({item.pct}%)</span>
                    </div>
                    <div style={{ height: '4px', background: '#F1F5F9', borderRadius: '100px', overflow: 'hidden' }}>
                      <div style={{ width: item.pct + '%', height: '100%', background: item.color, borderRadius: '100px' }}></div>
                    </div>
                 </div>
               ))}
            </div>
          </div>
          
          <div style={{ marginTop: '28px', borderTop: '1px solid #F1F5F9', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#64748B' }}>Development Index</span>
             <span style={{ fontSize: '0.9rem', fontWeight: 900, color: '#10B981', background: 'rgba(16, 185, 129, 0.08)', padding: '4px 12px', borderRadius: '100px' }}>⚡ 85% Healthy Compliance</span>
          </div>
        </div>

        {/* Right Card: Therapy Adherence Sparkline Area Chart */}
        <div className="bento-card" style={{ padding: '36px', background: 'white', border: '1px solid rgba(226, 232, 240, 0.8)', borderRadius: '32px', boxShadow: '0 20px 50px rgba(15, 23, 42, 0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
               <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 900, margin: 0, color: '#0F172A', letterSpacing: '-0.3px' }}>Therapy Compliance</h3>
                  <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: 'var(--slate-400)', fontWeight: 650 }}>Daily active therapy engagement trends</p>
               </div>
               <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#8B5CF6', background: 'rgba(139, 92, 246, 0.08)', padding: '6px 16px', borderRadius: '100px' }}>+4.2% Growth</span>
            </div>

            {/* Glowing SVG Area Line Chart */}
            <div style={{ width: '100%', background: '#FAF5FF', border: '1px solid #F3E8FF', borderRadius: '24px', padding: '16px', boxSizing: 'border-box' }}>
               <svg viewBox="0 0 500 200" width="100%" height="200" style={{ overflow: 'visible' }}>
                  <defs>
                     <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.0" />
                     </linearGradient>
                  </defs>
                  
                  {/* Grid lines */}
                  <line x1="40" y1="30" x2="480" y2="30" stroke="#F3E8FF" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="40" y1="80" x2="480" y2="80" stroke="#F3E8FF" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="40" y1="130" x2="480" y2="130" stroke="#F3E8FF" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="40" y1="170" x2="480" y2="170" stroke="#E9D5FF" strokeWidth="1.5" />
                  
                  {/* Area gradient fill */}
                  <path d="M 40,170 L 40,60 Q 113,85 113,90 T 186,40 T 260,75 T 333,25 T 406,68 T 480,45 L 480,170 Z" fill="url(#chartGrad)" />
                  
                  {/* Main Line path */}
                  <path d="M 40,60 Q 113,85 113,90 T 186,40 T 260,75 T 333,25 T 406,68 T 480,45" fill="none" stroke="#8B5CF6" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                  
                  {/* Glowing Data Dots */}
                  <circle cx="40" cy="60" r="6" fill="#8B5CF6" stroke="white" strokeWidth="2.5" />
                  <circle cx="113" cy="90" r="6" fill="#8B5CF6" stroke="white" strokeWidth="2.5" />
                  <circle cx="186" cy="40" r="6" fill="#8B5CF6" stroke="white" strokeWidth="2.5" />
                  <circle cx="260" cy="75" r="6" fill="#8B5CF6" stroke="white" strokeWidth="2.5" />
                  <circle cx="333" cy="25" r="8" fill="#10B981" stroke="white" strokeWidth="3" style={{ filter: 'drop-shadow(0 2px 8px rgba(16,185,129,0.4))' }} /> {/* Highlight peak */}
                  <circle cx="406" cy="68" r="6" fill="#8B5CF6" stroke="white" strokeWidth="2.5" />
                  <circle cx="480" cy="45" r="6" fill="#8B5CF6" stroke="white" strokeWidth="2.5" />
                  
                  {/* Peak Label bubble overlay */}
                  <rect x="303" y="-8" width="60" height="20" rx="6" fill="#10B981" style={{ filter: 'drop-shadow(0 4px 10px rgba(16,185,129,0.25))' }} />
                  <text x="333" y="6" fill="white" fontSize="9" fontWeight="950" textAnchor="middle">Peak 96%</text>
                  
                  {/* Axis labels */}
                  <text x="40" y="192" fill="#94A3B8" fontSize="10" fontWeight="700" textAnchor="middle">Mon</text>
                  <text x="113" y="192" fill="#94A3B8" fontSize="10" fontWeight="700" textAnchor="middle">Tue</text>
                  <text x="186" y="192" fill="#94A3B8" fontSize="10" fontWeight="700" textAnchor="middle">Wed</text>
                  <text x="260" y="192" fill="#94A3B8" fontSize="10" fontWeight="700" textAnchor="middle">Thu</text>
                  <text x="333" y="192" fill="#94A3B8" fontSize="10" fontWeight="700" textAnchor="middle">Fri</text>
                  <text x="406" y="192" fill="#94A3B8" fontSize="10" fontWeight="700" textAnchor="middle">Sat</text>
                  <text x="480" y="192" fill="#94A3B8" fontSize="10" fontWeight="700" textAnchor="middle">Sun</text>
               </svg>
            </div>
          </div>

          <div style={{ marginTop: '24px', padding: '16px 20px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
             <div style={{ fontSize: '1.25rem' }}>💡</div>
             <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569', fontWeight: 650, lineHeight: 1.4 }}>
               <strong style={{ color: '#0F172A' }}>Clinical Insights:</strong> Adherence surged on Friday following the launch of the new gamified <span style={{ color: '#8B5CF6', fontWeight: 800 }}>"Bubble Sensory Pop"</span> routine.
             </p>
          </div>
        </div>

      </div>
    </div>
  );

const renderConsultations = () => (
    <div className="animate-slide-up">
      <div className="bento-card" style={{ padding: '24px', background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '20px', margin: 0 }}>Parent Consultations</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {patients.slice(0, 3).map(p => (
            <div key={p.id} className="bento-card" style={{ padding: '16px', display: 'flex', gap: '16px', alignItems: 'center', background: 'white', border: '1px solid #F1F5F9', borderRadius: '8px' }}>
               <div style={{ width: '44px', height: '44px', background: 'var(--slate-100)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.15rem', fontWeight: 800 }}>{p.name.charAt(0)}</div>
               <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 800, fontSize: '1rem', margin: 0, color: '#0F172A' }}>{p.name} <span style={{ color: 'var(--slate-400)', fontWeight: 600, fontSize: '0.85rem' }}>(Parent: Mrs. {p.name.split(' ')[1]})</span></p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--slate-500)', fontWeight: 600, margin: '2px 0 0' }}>"The speech module is a bit difficult for him..."</p>
               </div>
               <button className="btn-neon" style={{ padding: '8px 16px', fontSize: '0.85rem' }}><MessageSquare size={14}/> Reply</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="animate-slide-up" style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '32px', maxWidth: '1250px', margin: '0 auto', width: '100%' }}>
      
      {/* Left Column: Avatar, Status & Verified Badges */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
         {/* Bio Card */}
         <div className="bento-card" style={{ padding: '40px 32px', textAlign: 'center', background: 'white', border: '1px solid rgba(226, 232, 240, 0.8)', borderRadius: '32px', boxShadow: '0 20px 50px rgba(15, 23, 42, 0.03)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ position: 'relative', marginBottom: '24px' }}>
               <div style={{ 
                 width: '110px', 
                 height: '110px', 
                 background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)', 
                 borderRadius: '36px', 
                 display: 'flex', 
                 alignItems: 'center', 
                 justifyContent: 'center', 
                 fontSize: '3rem', 
                 fontWeight: 900, 
                 color: 'white', 
                 boxShadow: '0 15px 35px rgba(124, 92, 237, 0.3)' 
               }}>
                 P
               </div>
               {/* Verified Badge */}
               <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', background: '#10B981', border: '4px solid white', padding: '6px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  <CheckCircle2 size={16} />
               </div>
            </div>

            <h2 style={{ fontSize: '1.75rem', fontWeight: 900, margin: '0 0 6px 0', color: '#0F172A', letterSpacing: '-0.5px' }}>Dr. Priya Raman</h2>
            <p style={{ color: 'var(--p-600)', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 16px 0' }}>Clinical Director • Senior Psychiatrist</p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '28px' }}>
               <span style={{ background: '#F1F5F9', color: '#475569', padding: '6px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 800 }}>⭐ Board Certified</span>
               <span style={{ background: '#E0F2FE', color: '#0369A1', padding: '6px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 800 }}>⚡ 12+ Yrs Exp</span>
            </div>

            <div style={{ width: '100%', borderTop: '1px solid #F1F5F9', paddingTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#475569', fontSize: '0.9rem', fontWeight: 650 }}>
                  <Stethoscope size={16} color="var(--p-500)" />
                  <span>ClinicalHQ Operator</span>
               </div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#475569', fontSize: '0.9rem', fontWeight: 650 }}>
                  <Clock size={16} color="var(--p-500)" />
                  <span>Duty Hours: Mon-Fri (9AM - 5PM)</span>
               </div>
            </div>
         </div>

         {/* Operational Status Card */}
         <div className="bento-card" style={{ padding: '24px 32px', background: 'white', border: '1px solid rgba(226, 232, 240, 0.8)', borderRadius: '24px', boxShadow: '0 20px 50px rgba(15, 23, 42, 0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div>
                  <span style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Telehealth Gateway</span>
                  <h4 style={{ fontSize: '1rem', fontWeight: 900, margin: '4px 0 0', color: '#0F172A' }}>Gateway Status</h4>
               </div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#DCFCE7', color: '#15803D', padding: '6px 14px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 850 }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', display: 'inline-block', boxShadow: '0 0 10px #10B981' }}></span>
                  ACTIVE
               </div>
            </div>
         </div>
      </div>

      {/* Right Column: Profile details & Form Card */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
         
         {/* Details Card */}
         <div className="bento-card" style={{ padding: '40px', background: 'white', border: '1px solid rgba(226, 232, 240, 0.8)', borderRadius: '32px', boxShadow: '0 20px 50px rgba(15, 23, 42, 0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', borderBottom: '1px solid #F1F5F9', paddingBottom: '20px' }}>
               <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 900, margin: 0, color: '#0F172A', letterSpacing: '-0.3px' }}>Professional Credentials</h3>
                  <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: 'var(--slate-400)', fontWeight: 650 }}>Officially audited and validated medical license details.</p>
               </div>
               <button className="btn-pop" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '10px 20px', borderRadius: '100px', color: '#475569', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>Print Log</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
              {[
                { label: 'Hospital Affiliations', value: 'Chennai South Clinic, Apollo Rural Outreach', icon: Stethoscope },
                { label: 'Primary Specialization', value: 'Child Development & Neurodiversity', icon: Activity },
                { label: 'Clinical License ID', value: 'MMC-89241', icon: ClipboardList }
              ].map((info, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '16px', background: '#F8FAFC', padding: '20px 24px', borderRadius: '20px', border: '1px solid #E2E8F0', alignItems: 'center' }}>
                   <div style={{ background: 'rgba(124, 92, 237, 0.08)', padding: '12px', borderRadius: '14px', color: 'var(--p-500)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <info.icon size={20} />
                   </div>
                   <div style={{ flex: 1 }}>
                      <label style={{ fontWeight: 800, color: 'var(--slate-400)', display: 'block', marginBottom: '4px', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{info.label}</label>
                      <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A' }}>{info.value}</div>
                   </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '16px', marginTop: '36px' }}>
               <button className="btn-pop" style={{ flex: 1.5, background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)', color: 'white', border: 'none', padding: '16px 24px', borderRadius: '20px', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', boxShadow: '0 10px 25px rgba(124, 92, 237, 0.25)', transition: 'all 0.2s' }}>
                 EDIT PROFESSIONAL CREDENTIALS
               </button>
               <button className="btn-pop" style={{ flex: 1, background: '#0F172A', color: 'white', border: 'none', padding: '16px 24px', borderRadius: '20px', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', transition: 'all 0.2s' }}>
                 REQUEST AUDIT
               </button>
            </div>
         </div>

         {/* Clinical Performance KPI Metrics */}
         <div className="bento-card" style={{ padding: '36px', background: 'white', border: '1px solid rgba(226, 232, 240, 0.8)', borderRadius: '32px', boxShadow: '0 20px 50px rgba(15, 23, 42, 0.03)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 900, margin: '0 0 24px 0', color: '#0F172A', letterSpacing: '-0.3px' }}>Clinical Session Performance</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
               {[
                 { val: '1,420+', label: 'Active Sessions', desc: 'Clinical care hours' },
                 { val: '98%', label: 'Compliance', desc: 'Patient therapy sync' },
                 { val: '150+', label: 'Active Audits', desc: 'Case directories reviewed' }
               ].map((kpi, idx) => (
                 <div key={idx} style={{ background: '#FAF5FF', border: '1px solid #F3E8FF', padding: '20px', borderRadius: '20px', textAlign: 'center' }}>
                    <h4 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--p-500)', margin: '0 0 4px 0' }}>{kpi.val}</h4>
                    <span style={{ fontSize: '0.8rem', fontWeight: 850, color: '#0F172A', display: 'block', textTransform: 'uppercase' }}>{kpi.label}</span>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.75rem', color: 'var(--slate-400)', fontWeight: 650 }}>{kpi.desc}</p>
                 </div>
               ))}
            </div>
         </div>

      </div>

    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFC', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* Strict Enterprise Sidebar */}
      <aside style={{ width: '300px', background: 'white', borderRight: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 10 }}>
        <div style={{ padding: '32px 24px', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: '#7C3AED', padding: '10px', borderRadius: '10px', color: 'white' }}><Stethoscope size={24} /></div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>Clinical HQ</h1>
        </div>

        <nav style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px', paddingLeft: '12px' }}>Clinical Desk</div>
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Command Center' },
            { id: 'patients', icon: Users, label: 'Patient Registry' },
            { id: 'analytics', icon: PieChart, label: 'Case Analytics' },
            { id: 'messages', icon: MessageSquare, label: 'Consultations' },
            { id: 'profile', icon: User, label: 'My Profile' }
          ].map(tab => (
            <div 
              key={tab.id} 
              onClick={() => setCurrentTab(tab.id)} 
              style={{ 
                display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 16px', borderRadius: '8px', cursor: 'pointer',
                background: currentTab === tab.id ? '#F5F3FF' : 'transparent',
                color: currentTab === tab.id ? '#7C3AED' : '#475569',
                fontWeight: currentTab === tab.id ? 600 : 500,
                fontSize: '1rem',
                transition: 'all 0.15s'
              }}
            >
               <tab.icon size={20} />
               <span>{tab.label}</span>
            </div>
          ))}
        </nav>

        <div style={{ padding: '24px', borderTop: '1px solid #E2E8F0' }}>
          <button 
            onClick={() => navigate('/')} 
            style={{ 
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              background: '#FEE2E2', color: '#EF4444', padding: '12px', borderRadius: '8px',
              fontWeight: 600, fontSize: '0.95rem', border: '1px solid #FCA5A5', cursor: 'pointer',
              transition: 'all 0.15s'
            }}
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, marginLeft: '300px', minHeight: '100vh', background: '#F8FAFC', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <header style={{ height: '80px', borderBottom: '1px solid #E2E8F0', background: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 40px', position: 'sticky', top: 0, zIndex: 5 }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0F172A', margin: 0 }}>
               {currentTab === 'dashboard' && 'Clinical Command Center'}
               {currentTab === 'patients' && 'Patient Registry'}
               {currentTab === 'analytics' && 'Case Insights'}
               {currentTab === 'messages' && 'Consultations'}
               {currentTab === 'profile' && 'Professional Profile'}
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
             <div style={{ position: 'relative' }}>
                <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                <input 
                  type="text" 
                  placeholder="Search Patient ID..." 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  style={{ padding: '10px 16px 10px 40px', borderRadius: '8px', border: '1px solid #E2E8F0', background: '#F8FAFC', fontWeight: 500, width: '280px', outline: 'none', fontSize: '0.95rem' }} 
                />
             </div>
             <div style={{ width: '40px', height: '40px', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white', cursor: 'pointer', color: '#64748B' }}>
               <Bell size={20} />
             </div>
          </div>
        </header>

        {/* Content Container */}
        <div style={{ padding: '40px', flex: 1 }}>
          {currentTab === 'dashboard' && renderDashboard()}
          {currentTab === 'patients' && renderPatients()}
          {currentTab === 'analytics' && renderAnalytics()}
          {currentTab === 'messages' && renderConsultations()}
          {currentTab === 'profile' && renderProfile()}
        </div>
      </main>

      {/* Patient Record Modal removed to render inline side-by-side */}
    </div>
  )
}

export default DoctorDashboard
