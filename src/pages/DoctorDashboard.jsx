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

  const renderDashboard = () => (
    <div className="animate-slide-up">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '40px' }}>
        {stats.map((stat, i) => (
          <div key={i} className="bento-card" style={{ padding: '24px', borderLeft: `8px solid ${stat.color}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
               <div style={{ color: stat.color, background: `${stat.color}15`, padding: '10px', borderRadius: '12px' }}>{stat.icon}</div>
               <TrendingUp size={16} color="var(--slate-400)" />
            </div>
            <h3 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '4px' }}>{stat.value}</h3>
            <p style={{ color: 'var(--slate-600)', fontWeight: 600, fontSize: '1rem', marginBottom: '12px' }}>{stat.label}</p>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, padding: '4px 12px', borderRadius: '100px', color: stat.color, background: `${stat.color}10` }}>{stat.note}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '32px' }}>
        <section className="bento-card" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Active Patient Flow</h2>
            <button onClick={() => setCurrentTab('patients')} className="btn-neon" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>Full Registry</button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '16px', color: 'var(--slate-400)', borderBottom: '1px solid var(--slate-200)' }}>PATIENT</th>
                  <th style={{ textAlign: 'left', padding: '16px', color: 'var(--slate-400)', borderBottom: '1px solid var(--slate-200)' }}>STATUS</th>
                  <th style={{ textAlign: 'left', padding: '16px', color: 'var(--slate-400)', borderBottom: '1px solid var(--slate-200)' }}>LEVEL</th>
                  <th style={{ textAlign: 'left', padding: '16px', color: 'var(--slate-400)', borderBottom: '1px solid var(--slate-200)' }}>LAST SYNC</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.slice(0, 4).map(p => (
                  <tr key={p.id} style={{ cursor: 'pointer', borderBottom: '1px solid var(--slate-100)' }} onClick={() => setSelectedPatient(p)}>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', background: 'var(--slate-100)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{p.name.charAt(0)}</div>
                        <div>
                          <p style={{ fontWeight: 800, margin: 0 }}>{p.name}</p>
                          <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)', fontWeight: 600 }}>{p.diagnosis}</span>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span style={{ padding: '4px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 800, background: p.status === 'Critical Review' ? '#FEE2E2' : '#D1FAE5', color: p.status === 'Critical Review' ? '#EF4444' : '#10B981' }}>{p.status}</span>
                    </td>
                    <td style={{ padding: '16px' }}><span style={{ fontWeight: 700, color: p.levelColor }}>{p.level}</span></td>
                    <td style={{ padding: '16px' }}><span style={{ color: 'var(--slate-400)', fontSize: '0.85rem', fontWeight: 600 }}>{p.lastUpdate}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bento-card" style={{ padding: '32px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '32px' }}>Clinical To-Do</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {tasks.map(task => (
              <div key={task.id} style={{ display: 'flex', gap: '16px', padding: '20px', background: 'var(--slate-50)', borderRadius: '20px', borderLeft: `6px solid ${task.done ? 'var(--slate-200)' : task.color}` }}>
                <div onClick={() => toggleTask(task.id)} style={{ cursor: 'pointer', width: '24px', height: '24px', borderRadius: '6px', border: '2px solid', borderColor: task.done ? 'var(--s-500)' : 'var(--slate-300)', background: task.done ? 'var(--s-500)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {task.done && <CheckCircle2 size={16} color="white" />}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 800, fontSize: '1.1rem', color: task.done ? 'var(--slate-400)' : 'var(--slate-900)', textDecoration: task.done ? 'line-through' : 'none', marginBottom: '4px' }}>{task.text}</p>
                  <div style={{ display: 'flex', gap: '12px', fontSize: '0.8rem', fontWeight: 700 }}>
                    <span style={{ color: 'var(--slate-400)' }}>🕒 {task.time}</span>
                    <span style={{ color: task.color }}>{task.type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );

  const renderPatients = () => (
    <div className="animate-slide-up">
      <div className="bento-card" style={{ padding: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '8px' }}>Patient Registry</h2>
            <p style={{ color: 'var(--slate-600)', fontWeight: 600 }}>Full access to all Case IDs and therapy metrics.</p>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
             <button className="btn-neon" style={{ background: 'var(--slate-100)', color: 'var(--slate-900)', boxShadow: 'none' }}><Filter size={18} /> Filters</button>
             <button className="btn-neon"><UserPlus size={18} /> Add New Case</button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
           {filteredPatients.map(p => (
             <div key={p.id} onClick={() => setSelectedPatient(p)} className="bento-card" style={{ padding: '32px', cursor: 'pointer', background: 'white' }}>
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                   <div style={{ width: '80px', height: '80px', background: 'var(--slate-100)', borderRadius: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 800 }}>{p.name.charAt(0)}</div>
                   <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                         <h4 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{p.name}</h4>
                         <span style={{ fontWeight: 800, fontSize: '0.9rem', color: p.levelColor }}>{p.level}</span>
                      </div>
                      <p style={{ fontSize: '1rem', color: 'var(--slate-600)', fontWeight: 600, margin: '4px 0 12px' }}>{p.diagnosis} • {p.hospital}</p>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <span style={{ background: 'var(--slate-50)', padding: '6px 14px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 800 }}>Age {p.age}</span>
                        <span style={{ background: 'var(--slate-50)', padding: '6px 14px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 800 }}>{p.status}</span>
                      </div>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="animate-slide-up">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }}>
        <div className="bento-card" style={{ padding: '40px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '24px' }}>Case Breakdown</h2>
          <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--slate-50)', borderRadius: '25px', margin: '20px 0' }}>
            <div style={{ textAlign: 'center' }}>
              <PieChart size={120} color="var(--p-500)" strokeWidth={1} />
              <div style={{ display: 'flex', gap: '20px', marginTop: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}><div style={{ width: '12px', height: '12px', background: '#10B981', borderRadius: '50%' }}></div> Level 1 (5)</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}><div style={{ width: '12px', height: '12px', background: '#F59E0B', borderRadius: '50%' }}></div> Level 2 (3)</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}><div style={{ width: '12px', height: '12px', background: '#EF4444', borderRadius: '50%' }}></div> Level 3 (2)</div>
              </div>
            </div>
          </div>
        </div>
        <div className="bento-card" style={{ padding: '40px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '24px' }}>Therapy Adherence</h2>
          <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--slate-50)', borderRadius: '25px', margin: '20px 0' }}>
            <Activity size={120} color="var(--s-500)" strokeWidth={1} />
          </div>
          <p style={{ textAlign: 'center', fontWeight: 800, color: 'var(--slate-600)', fontSize: '1.2rem' }}>85% Participation Index</p>
        </div>
      </div>
    </div>
  );

  const renderConsultations = () => (
    <div className="animate-slide-up">
      <div className="bento-card" style={{ padding: '40px' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '32px' }}>Parent Consultations</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {patients.slice(0, 3).map(p => (
            <div key={p.id} className="bento-card" style={{ padding: '24px', display: 'flex', gap: '24px', alignItems: 'center', background: 'white' }}>
               <div style={{ width: '60px', height: '60px', background: 'var(--slate-100)', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 800 }}>{p.name.charAt(0)}</div>
               <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 800, fontSize: '1.2rem', margin: 0 }}>{p.name} <span style={{ color: 'var(--slate-400)', fontWeight: 600 }}>(Parent: Mrs. {p.name.split(' ')[1]})</span></p>
                  <p style={{ fontSize: '1rem', color: 'var(--slate-600)', fontWeight: 600 }}>"The speech module is a bit difficult for him..."</p>
               </div>
               <button className="btn-neon" style={{ padding: '12px 32px' }}><MessageSquare size={18}/> Reply</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="animate-slide-up" style={{ maxWidth: '850px', margin: '0 auto' }}>
      <div className="bento-card" style={{ padding: '60px', textAlign: 'center' }}>
        <div style={{ width: '150px', height: '150px', background: 'var(--p-500)', borderRadius: '45px', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', fontWeight: 800, color: 'white', boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)' }}>P</div>
        <h2 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '8px' }}>Dr. Priya Raman</h2>
        <p style={{ color: 'var(--p-600)', fontWeight: 800, fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Clinical Director • Senior Psychiatrist</p>
        
        <div style={{ marginTop: '60px', display: 'grid', gridTemplateColumns: '1fr', gap: '24px', textAlign: 'left' }}>
          {[
            { label: 'Hospital Affiliations', value: 'Chennai South Clinic, Apollo Rural Outreach' },
            { label: 'Primary Specialization', value: 'Child Development & Neurodiversity' },
            { label: 'Clinical License ID', value: 'MMC-89241' }
          ].map((info, idx) => (
            <div key={idx}>
              <label style={{ fontWeight: 800, color: 'var(--slate-400)', display: 'block', marginBottom: '10px', fontSize: '1rem' }}>{info.label}</label>
              <div style={{ width: '100%', padding: '24px', borderRadius: '20px', background: 'white', border: '2px solid var(--slate-100)', fontSize: '1.3rem', fontWeight: 800 }}>{info.value}</div>
            </div>
          ))}
        </div>
        <button className="btn-neon" style={{ width: '100%', marginTop: '48px', padding: '20px' }}>EDIT PROFESSIONAL CREDENTIALS</button>
      </div>
    </div>
  );

  return (
    <div className="playground-container" style={{ minHeight: '100vh', display: 'flex' }}>
      <div className="mesh-bg"></div>
      
      <style>{`
        .btn-pop { transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); cursor: pointer; border: none; }
        .btn-pop:hover { transform: translateY(-6px) scale(1.03); }
        .btn-pop:active { transform: scale(0.95); }
      `}</style>
      
      {/* Sidebar Navigation */}
      <aside className="bento-card" style={{ width: '360px', margin: '32px', borderRadius: '40px', display: 'flex', flexDirection: 'column', padding: '50px', position: 'sticky', top: '32px', height: 'calc(100vh - 64px)', background: 'rgba(255,255,255,0.85)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '60px' }}>
          <div style={{ width: '54px', height: '54px', background: 'var(--p-500)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 15px 30px rgba(139, 92, 246, 0.4)' }}><Stethoscope color="white" size={32} /></div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--slate-900)', margin: 0, letterSpacing: '-1.5px' }}>Autishta</h1>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Command Center' },
            { id: 'patients', icon: Users, label: 'Patient Registry' },
            { id: 'analytics', icon: PieChart, label: 'Case Analytics' },
            { id: 'messages', icon: MessageSquare, label: 'Consultations' },
            { id: 'profile', icon: User, label: 'My Profile' }
          ].map(tab => (
            <div key={tab.id} onClick={() => setCurrentTab(tab.id)} className={`sidebar-item ${currentTab === tab.id ? 'active' : ''}`}>
               <div className="icon-glow"><tab.icon size={26} strokeWidth={currentTab === tab.id ? 2.5 : 2} /></div>
               <span style={{ fontSize: '1.4rem' }}>{tab.label}</span>
            </div>
          ))}
        </nav>
        
        <button onClick={() => navigate('/')} className="btn-pop" style={{ display: 'flex', alignItems: 'center', gap: '14px', background: '#FEE2E2', color: '#EF4444', padding: '24px', borderRadius: '25px', fontWeight: 800, fontSize: '1.4rem', justifyContent: 'center', border: '2px solid #FECACA' }}><LogOut size={26} /> LOGOUT</button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '32px 64px 64px 32px', overflowY: 'auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px', paddingTop: '15px' }}>
          <div>
            <p style={{ color: 'var(--p-500)', fontWeight: 800, fontSize: '1.3rem', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '2px' }}>Clinical Monitoring Platform ✨</p>
            <h2 style={{ fontSize: '3.2rem', fontWeight: 800 }}>
               {currentTab === 'dashboard' && 'Clinical Command Center'}
               {currentTab === 'patients' && 'Patient Registry'}
               {currentTab === 'analytics' && 'Case Insights'}
               {currentTab === 'messages' && 'Consultations'}
               {currentTab === 'profile' && 'Professional Profile'}
            </h2>
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
             <div style={{ position: 'relative' }}>
                <Search size={22} style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', color: 'var(--slate-400)' }} />
                <input type="text" placeholder="Search Patient ID..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ padding: '18px 24px 18px 64px', borderRadius: '100px', border: '2px solid var(--slate-200)', background: 'white', fontWeight: 700, width: '350px', outline: 'none', transition: '0.3s' }} onFocus={(e) => e.target.style.borderColor = 'var(--p-500)'} />
             </div>
             <div className="bento-card" style={{ width: '60px', height: '60px', borderRadius: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, background: 'white' }}><Bell color="var(--slate-400)" size={28} /></div>
          </div>
        </header>

        {currentTab === 'dashboard' && renderDashboard()}
        {currentTab === 'patients' && renderPatients()}
        {currentTab === 'analytics' && renderAnalytics()}
        {currentTab === 'messages' && renderConsultations()}
        {currentTab === 'profile' && renderProfile()}
      </main>

      {/* Patient Record Modal */}
      {selectedPatient && (
        <div className="overlay" onClick={() => setSelectedPatient(null)}>
          <div className="bento-card animate-slide-up" onClick={e => e.stopPropagation()} style={{ maxWidth: '1100px', width: '100%', padding: '60px', position: 'relative', maxHeight: '90vh', overflowY: 'auto', background: 'white' }}>
            <button onClick={() => setSelectedPatient(null)} style={{ position: 'absolute', top: '30px', right: '30px', background: 'var(--slate-50)', border: 'none', padding: '12px', borderRadius: '50%', cursor: 'pointer' }}><X size={28} /></button>
            
            <div style={{ display: 'flex', gap: '48px', marginBottom: '48px', borderBottom: '2px solid var(--slate-100)', paddingBottom: '48px' }}>
              <div style={{ width: '120px', height: '120px', background: 'var(--slate-100)', borderRadius: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', fontWeight: 800 }}>{selectedPatient.name.charAt(0)}</div>
              <div style={{ flex: 1 }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h2 style={{ fontSize: '3rem', fontWeight: 800, margin: 0 }}>{selectedPatient.name}</h2>
                      <p style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--slate-400)', margin: '8px 0' }}>CASE-ID: {selectedPatient.id}X9 • {selectedPatient.diagnosis}</p>
                    </div>
                    <span style={{ background: selectedPatient.levelColor, color: 'white', padding: '10px 24px', borderRadius: '100px', fontWeight: 800, fontSize: '1.1rem' }}>{selectedPatient.level} Support</span>
                 </div>
                 <div style={{ display: 'flex', gap: '24px', marginTop: '32px' }}>
                    <div style={{ padding: '14px 28px', background: 'var(--slate-50)', borderRadius: '20px' }}>
                       <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--slate-400)', fontWeight: 800 }}>PATIENT AGE</p>
                       <p style={{ margin: 0, fontWeight: 800, fontSize: '1.2rem' }}>{selectedPatient.age} Years</p>
                    </div>
                    <div style={{ padding: '14px 28px', background: 'var(--slate-50)', borderRadius: '20px' }}>
                       <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--slate-400)', fontWeight: 800 }}>CENTER LOCATION</p>
                       <p style={{ margin: 0, fontWeight: 800, fontSize: '1.2rem' }}>{selectedPatient.hospital}</p>
                    </div>
                    <button onClick={() => navigate('/report')} className="btn-neon" style={{ background: 'var(--slate-900)', border: 'none', height: 'fit-content', alignSelf: 'center' }}><FileText size={20} /> Clinical Report</button>
                    <button className="btn-neon" style={{ background: 'var(--p-500)', border: 'none', height: 'fit-content', alignSelf: 'center' }}><Video size={20} /> Tele-Consult</button>
                 </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '60px' }}>
              <div>
                 <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}><Activity size={28} color="var(--p-500)"/> Therapeutic Metrics</h3>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    <div>
                       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontWeight: 800, fontSize: '1.1rem' }}><span>Social Communication</span><span style={{ color: 'var(--s-500)' }}>{selectedPatient.communication}%</span></div>
                       <div style={{ height: '12px', background: 'var(--slate-100)', borderRadius: '6px' }}><div style={{ width: `${selectedPatient.communication}%`, height: '100%', background: 'var(--s-500)', borderRadius: '6px' }}></div></div>
                    </div>
                    <div>
                       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontWeight: 800, fontSize: '1.1rem' }}><span>Emotional Regulation</span><span style={{ color: 'var(--p-500)' }}>{selectedPatient.emotional}%</span></div>
                       <div style={{ height: '12px', background: 'var(--slate-100)', borderRadius: '6px' }}><div style={{ width: `${selectedPatient.emotional}%`, height: '100%', background: 'var(--p-500)', borderRadius: '6px' }}></div></div>
                    </div>
                    <div className="bento-card" style={{ padding: '32px', background: 'var(--slate-50)', border: '1px solid var(--slate-200)' }}>
                       <h4 style={{ fontWeight: 800, marginBottom: '16px', fontSize: '1.2rem' }}>Current Activity Protocol</h4>
                       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                          <span style={{ background: '#E0F2FE', color: '#0369A1', padding: '8px 16px', borderRadius: '100px', fontWeight: 700, fontSize: '0.9rem' }}>Emotion Matching</span>
                          <span style={{ background: '#DCFCE7', color: '#15803D', padding: '8px 16px', borderRadius: '100px', fontWeight: 700, fontSize: '0.9rem' }}>Bubble Sensory Pop</span>
                          <button className="btn-neon" style={{ padding: '6px 16px', fontSize: '0.8rem', background: 'white', color: 'var(--p-500)', border: '2px solid var(--p-500)', boxShadow: 'none' }}><Plus size={14}/> Add Task</button>
                       </div>
                    </div>
                 </div>
              </div>
              <div style={{ borderLeft: '2px solid var(--slate-100)', paddingLeft: '60px' }}>
                 <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}><ClipboardList size={28} color="var(--p-500)"/> Directives</h3>
                 <p style={{ fontSize: '1.1rem', color: 'var(--slate-600)', fontWeight: 700, marginBottom: '24px' }}>Digital directives are synced to Parent Portals in real-time.</p>
                 <textarea 
                   placeholder="Type clinical directives for the caregiver..." 
                   value={directive}
                   onChange={(e) => setDirective(e.target.value)}
                   style={{ width: '100%', height: '220px', borderRadius: '25px', border: '3px solid var(--slate-200)', padding: '24px', fontWeight: 600, fontSize: '1.2rem', outline: 'none', resize: 'none', transition: '0.3s' }} 
                   onFocus={(e) => e.target.style.borderColor = 'var(--p-500)'}
                 />
                 <button onClick={() => { alert('Directive issued successfully!'); setDirective(''); }} className="btn-neon" style={{ width: '100%', marginTop: '32px', padding: '20px' }}>SYNC DIRECTIVE TO PORTAL</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DoctorDashboard
