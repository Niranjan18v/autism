import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, Users, UserCog, Video, Activity, BarChart3, Settings, LogOut, 
  Bell, Search, Plus, ShieldCheck, Megaphone, Globe, Star, ChevronRight, Send, 
  CheckCircle2, PieChart, Building2, Trash2, ShieldAlert, Sparkles, Command, Shield, 
  Zap, Database, Globe2, Briefcase, UserPlus, FileText, ActivitySquare
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

function AdminDashboard() {
  const navigate = useNavigate()
  const { language } = useLanguage()
  const [currentTab, setCurrentTab] = useState('overview')
  const [alertSent, setAlertSent] = useState(null)
  
  const kpis = [
    { id: 'patients', label: 'Registered Patients', value: '1,247', icon: Users, color: '#3B82F6', trend: '+12% this month' },
    { id: 'doctors', label: 'Medical Specialists', value: '46', icon: UserCog, color: '#10B981', trend: '4 Pending Approval' },
    { id: 'activities', label: 'Sessions Conducted', value: '9,842', icon: ActivitySquare, color: '#8B5CF6', trend: '99.8% Uptime' },
    { id: 'levels', label: 'Clinical Reports', value: '894', icon: FileText, color: '#F59E0B', trend: 'Instant Sync Enabled' }
  ]

  const usersList = [
    { id: 1, name: 'Dr. Priya Raman', role: 'Senior Clinical Lead', location: 'Chennai South', status: 'Online', patientCount: 32, grad: 'AIIMS' },
    { id: 2, name: 'Dr. Sanjay Gupta', role: 'Pediatric Specialist', location: 'Mumbai North', status: 'Offline', patientCount: 28, grad: 'KMC' },
    { id: 3, name: 'Dr. Smitha Verma', role: 'Occupational Therapist', location: 'Delhi Central', status: 'Online', patientCount: 15, grad: 'SRMC' },
    { id: 4, name: 'Dr. Rahul Bose', role: 'Behavioral Analyst', location: 'Madurai Rural', status: 'Online', patientCount: 42, grad: 'MMC' }
  ]

  const patients = [
    { id: 101, name: 'Arjun Kumar', hospital: 'Chennai South', level: 'Mild (L1)', parent: 'Kumar S.', code: 'ATH-2940', lastActive: '2 hours ago' },
    { id: 102, name: 'Diya Sharma', hospital: 'Madurai Rural', level: 'Moderate (L2)', parent: 'Sharma V.', code: 'ATH-1102', lastActive: 'Yesterday' },
    { id: 103, name: 'Rohan Patel', hospital: 'Chennai South', level: 'Severe (L3)', parent: 'Patel M.', code: 'ATH-8839', lastActive: '5 hours ago' },
    { id: 104, name: 'Kavita Singh', hospital: 'Delhi Central', level: 'Moderate (L2)', parent: 'Singh J.', code: 'ATH-4401', lastActive: '10 mins ago' }
  ]

  const schemes = [
    { id: 1, title: 'TN Education Grant #42', target: 'Level 2 Patients', sentTo: '120 Families', date: '2026-05-15', status: 'PUBLISHED' },
    { id: 2, title: 'Rural Telehealth Subsidy', target: 'Low-income Rural', sentTo: '450 Families', date: '2026-05-10', status: 'PUBLISHED' },
    { id: 3, title: 'Free Sensory Kit Program', target: 'Level 3 Patients', sentTo: '85 Families', date: '2026-05-16', status: 'ACTIVE' }
  ]

  const handleSendAlert = (id) => {
    setAlertSent(id)
    setTimeout(() => setAlertSent(null), 3000)
  }

  const renderOverview = () => (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
        {kpis.map((kpi, i) => (
          <div key={i} style={{ padding: '28px', background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
               <p style={{ color: '#64748B', fontWeight: 600, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>{kpi.label}</p>
               <div style={{ background: `${kpi.color}15`, padding: '10px', borderRadius: '10px', color: kpi.color }}><kpi.icon size={24} /></div>
            </div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#0F172A', margin: '0 0 12px 0', lineHeight: 1 }}>{kpi.value}</h2>
            <p style={{ fontWeight: 500, color: '#10B981', margin: 0, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
               <Zap size={16} /> {kpi.trend}
            </p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
        <section style={{ padding: '32px', background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
             <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#0F172A', margin: 0 }}>Recent Clinical Activity</h3>
             <button onClick={() => setCurrentTab('doctors')} style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '1rem', fontWeight: 500, background: 'white', color: '#0F172A', cursor: 'pointer' }}>View All</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {usersList.slice(0, 3).map((u, i) => (
              <div key={u.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 0', borderBottom: i !== 2 ? '1px solid #F1F5F9' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ width: '48px', height: '48px', background: '#F1F5F9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', fontWeight: 600, fontSize: '1.1rem' }}>
                    {u.name.split(' ')[1][0]}{u.name.split(' ')[2]?.[0]}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '0 0 4px 0', color: '#0F172A' }}>{u.name}</h4>
                    <span style={{ color: '#64748B', fontSize: '1rem' }}>{u.role}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                   <div style={{ fontWeight: 600, fontSize: '1.1rem', color: '#0F172A' }}>{u.patientCount} Active Cases</div>
                   <div style={{ fontSize: '0.95rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end', marginTop: '4px' }}>
                     <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }}></span> Online
                   </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ padding: '32px', background: '#0F172A', border: '1px solid #1E293B', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', color: 'white' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'white', margin: '0 0 12px 0' }}>Broadcast Center</h3>
          <p style={{ color: '#94A3B8', fontSize: '1rem', margin: '0 0 32px 0', lineHeight: 1.5 }}>Push priority directives across the clinical network.</p>
          
          <div style={{ background: '#1E293B', padding: '24px', borderRadius: '8px', border: '1px solid #334155', marginBottom: '20px' }}>
            <h4 style={{ fontWeight: 600, fontSize: '1.1rem', margin: '0 0 8px 0', color: 'white' }}>TN Education Scheme #42</h4>
            <p style={{ margin: '0 0 20px 0', color: '#94A3B8', fontSize: '0.95rem' }}>Target: L2 families in 12 rural districts.</p>
            <button 
              onClick={() => handleSendAlert(1)} 
              style={{ width: '100%', background: alertSent === 1 ? '#10B981' : '#3B82F6', color: 'white', padding: '12px', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', transition: 'all 0.2s' }}
            >
              {alertSent === 1 ? <><CheckCircle2 size={18} /> Dispatched</> : <><Send size={18} /> Broadcast</>}
            </button>
          </div>
          
          <button onClick={() => setCurrentTab('schemes')} style={{ width: '100%', background: 'transparent', border: '2px dashed #475569', color: '#94A3B8', padding: '14px', borderRadius: '8px', fontSize: '1rem', fontWeight: 500, cursor: 'pointer' }}>
             + Create New Directive
          </button>
        </section>
      </div>
    </div>
  );

  const renderPatients = () => (
    <div className="animate-fade-in" style={{ background: 'white', border: '1px solid rgba(226, 232, 240, 0.8)', borderRadius: '24px', boxShadow: '0 20px 50px rgba(15, 23, 42, 0.03)', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '36px', borderBottom: '1px solid #F1F5F9' }}>
         <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0F172A', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>Patient Registry</h2>
            <p style={{ color: '#64748B', fontWeight: 650, fontSize: '1rem', margin: 0 }}>Managing {patients.length} active patient profiles across the network.</p>
         </div>
         <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ position: 'relative' }}>
               <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} size={18} />
               <input type="text" placeholder="Search ID or Name" style={{ padding: '12px 16px 12px 44px', borderRadius: '100px', border: '1px solid #E2E8F0', fontSize: '0.95rem', width: '280px', background: '#F8FAFC', fontWeight: 600, outline: 'none' }} />
            </div>
            <button onClick={() => navigate('/register')} style={{ padding: '12px 24px', background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)', color: 'white', border: 'none', borderRadius: '100px', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 10px 20px rgba(59, 130, 246, 0.2)' }}>
              <Plus size={18} /> Add Patient
            </button>
         </div>
      </div>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#F8FAFC', borderBottom: '1.5px solid #F1F5F9' }}>
              <th style={{ padding: '18px 36px', color: '#475569', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Patient ID</th>
              <th style={{ padding: '18px 36px', color: '#475569', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Name</th>
              <th style={{ padding: '18px 36px', color: '#475569', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Clinical Tier</th>
              <th style={{ padding: '18px 36px', color: '#475569', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Primary Clinic</th>
              <th style={{ padding: '18px 36px', color: '#475569', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p, i) => {
              const getBadgeStyle = (lvl) => {
                if (lvl.includes('L1')) return { bg: '#D1FAE5', text: '#065F46', indicator: '#10B981' };
                if (lvl.includes('L2')) return { bg: '#FEF3C7', text: '#92400E', indicator: '#F59E0B' };
                return { bg: '#FEE2E2', text: '#991B1B', indicator: '#EF4444' };
              };
              const badge = getBadgeStyle(p.level);

              return (
                <tr key={p.id} style={{ borderBottom: i === patients.length - 1 ? 'none' : '1px solid #F1F5F9', transition: 'background 0.2s' }}>
                  <td style={{ padding: '20px 36px' }}>
                    <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '0.9rem', color: '#475569', background: '#F1F5F9', padding: '6px 12px', borderRadius: '8px' }}>
                      {p.code}
                    </span>
                  </td>
                  <td style={{ padding: '20px 36px' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: badge.bg, color: badge.indicator, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.1rem' }}>
                          {p.name.charAt(0)}
                        </div>
                        <div>
                           <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '1.05rem' }}>{p.name}</div>
                           <div style={{ color: '#94A3B8', fontSize: '0.85rem', fontWeight: 650, marginTop: '2px' }}>Parent: {p.parent}</div>
                        </div>
                     </div>
                  </td>
                  <td style={{ padding: '20px 36px' }}>
                    <span style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 14px', 
                      borderRadius: '100px', 
                      background: badge.bg, 
                      color: badge.text, 
                      fontSize: '0.85rem', 
                      fontWeight: 800 
                    }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: badge.indicator }}></span>
                      {p.level}
                    </span>
                  </td>
                  <td style={{ padding: '20px 36px', fontSize: '1rem', color: '#475569', fontWeight: 650 }}>{p.hospital}</td>
                  <td style={{ padding: '20px 36px', textAlign: 'right' }}>
                     <button onClick={() => navigate('/report')} className="btn-pop" style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)', color: 'white', border: 'none', padding: '8px 18px', borderRadius: '100px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)' }}>
                       View Profile
                     </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderDoctors = () => (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
             <h2 style={{ fontSize: '1.8rem', fontWeight: 600, color: '#0F172A', margin: '0 0 8px 0' }}>Clinical Command</h2>
             <p style={{ color: '#64748B', fontSize: '1.1rem', margin: 0 }}>Managing 46 active clinicians across the network.</p>
          </div>
          <button onClick={() => navigate('/register')} style={{ padding: '12px 24px', background: '#3B82F6', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <UserPlus size={20} /> Invite Clinician
          </button>
       </div>
       
       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
          {usersList.map(d => (
            <div key={d.id} style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px' }}>
                  <div style={{ width: '60px', height: '60px', background: '#F1F5F9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569', fontWeight: 600, fontSize: '1.3rem' }}>
                    {d.name.split(' ')[1][0]}{d.name.split(' ')[2]?.[0]}
                  </div>
                  <div>
                     <h4 style={{ fontSize: '1.2rem', fontWeight: 600, margin: '0 0 6px 0', color: '#0F172A' }}>{d.name}</h4>
                     <p style={{ color: '#64748B', fontSize: '1rem', margin: 0 }}>{d.role}</p>
                  </div>
               </div>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px' }}>
                  <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                     <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0F172A' }}>{d.patientCount}</div>
                     <div style={{ fontSize: '0.9rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>Active Cases</div>
                  </div>
                  <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                     <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0F172A' }}>98%</div>
                     <div style={{ fontSize: '0.9rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>Report Score</div>
                  </div>
               </div>
               <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={() => navigate('/dashboard/doctor')} style={{ flex: 1, background: '#F1F5F9', color: '#0F172A', border: '1px solid #E2E8F0', padding: '12px', borderRadius: '8px', fontSize: '1rem', fontWeight: 500, cursor: 'pointer' }}>Case Log</button>
                  <button style={{ padding: '12px', background: 'white', border: '1px solid #E2E8F0', borderRadius: '8px', color: '#64748B', cursor: 'pointer' }}><Settings size={20} /></button>
               </div>
            </div>
          ))}
       </div>
    </div>
  );

  const renderSchemes = () => (
    <div className="animate-fade-in" style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      <div style={{ padding: '32px', borderBottom: '1px solid #E2E8F0' }}>
         <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#0F172A', margin: '0 0 8px 0' }}>Governance Registry</h2>
         <p style={{ color: '#64748B', fontSize: '1rem', margin: 0 }}>Manage integrated state and central health schemes.</p>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
            <th style={{ padding: '16px 32px', color: '#64748B', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Scheme Name</th>
            <th style={{ padding: '16px 32px', color: '#64748B', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Target Cohort</th>
            <th style={{ padding: '16px 32px', color: '#64748B', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
            <th style={{ padding: '16px 32px', color: '#64748B', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Last Synced</th>
            <th style={{ padding: '16px 32px', color: '#64748B', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {schemes.map((s, i) => (
            <tr key={s.id} style={{ borderBottom: i === schemes.length - 1 ? 'none' : '1px solid #E2E8F0' }}>
              <td style={{ padding: '24px 32px' }}>
                 <div style={{ fontWeight: 500, color: '#0F172A', fontSize: '1.1rem' }}>{s.title}</div>
              </td>
              <td style={{ padding: '24px 32px', fontSize: '1.1rem', color: '#475569' }}>{s.target}</td>
              <td style={{ padding: '24px 32px' }}>
                <span style={{ display: 'inline-block', padding: '6px 12px', borderRadius: '6px', background: s.status === 'PUBLISHED' ? '#DCFCE7' : '#FEF3C7', color: s.status === 'PUBLISHED' ? '#15803D' : '#B45309', fontSize: '0.9rem', fontWeight: 600 }}>
                  {s.status}
                </span>
              </td>
              <td style={{ padding: '24px 32px', fontSize: '1.1rem', color: '#475569' }}>{s.date}</td>
              <td style={{ padding: '24px 32px', textAlign: 'right' }}>
                 <button style={{ background: 'none', border: 'none', color: '#3B82F6', cursor: 'pointer', fontWeight: 500, fontSize: '1.1rem' }}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderAnalytics = () => (
    <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
       <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontWeight: 600, fontSize: '1.3rem', color: '#0F172A', margin: '0 0 32px 0' }}>Clinical Distribution</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
             {[
               { label: 'Mild Support (L1)', val: '45%', color: '#3B82F6' },
               { label: 'Moderate Support (L2)', val: '35%', color: '#10B981' },
               { label: 'Intensive Support (L3)', val: '20%', color: '#F472B6' }
             ].map((item, i) => (
               <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '1rem', fontWeight: 500, color: '#475569' }}>
                     <span>{item.label}</span>
                     <span style={{ color: '#0F172A', fontWeight: 600 }}>{item.val}</span>
                  </div>
                  <div style={{ height: '10px', background: '#F1F5F9', borderRadius: '5px', overflow: 'hidden' }}>
                     <div style={{ width: item.val, height: '100%', background: item.color }}></div>
                  </div>
               </div>
             ))}
          </div>
       </div>

       <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontWeight: 600, fontSize: '1.3rem', color: '#0F172A', margin: '0 0 32px 0' }}>Regional Saturation</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
             {['Chennai South', 'Madurai Rural', 'Delhi Central', 'Mumbai North'].map((loc, i) => (
               <div key={i} style={{ background: '#F8FAFC', padding: '24px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                  <Building2 size={24} color="#64748B" style={{ marginBottom: '12px' }} />
                  <p style={{ fontWeight: 600, margin: '0 0 6px 0', fontSize: '1.1rem', color: '#0F172A' }}>{loc}</p>
                  <p style={{ fontWeight: 500, color: '#10B981', margin: 0, fontSize: '0.95rem' }}>92% Accuracy</p>
               </div>
             ))}
          </div>
       </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFC', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* Strict Enterprise Sidebar */}
      <aside style={{ width: '300px', background: 'white', borderRight: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 10 }}>
        <div style={{ padding: '32px 24px', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: '#0F172A', padding: '10px', borderRadius: '10px', color: 'white' }}><Shield size={24} /></div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>HQ Center</h1>
        </div>

        <nav style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px', paddingLeft: '12px' }}>Network Operations</div>
          {[
            { id: 'overview', icon: LayoutDashboard, label: 'Ecosystem Hub' },
            { id: 'patients', icon: Users, label: 'Patient Registry' },
            { id: 'doctors', icon: UserCog, label: 'Clinical Team' },
            { id: 'schemes', icon: Globe2, label: 'Govt Schemes' }
          ].map(tab => (
            <div 
              key={tab.id} 
              onClick={() => setCurrentTab(tab.id)} 
              style={{ 
                display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 16px', borderRadius: '8px', cursor: 'pointer',
                background: currentTab === tab.id ? '#EFF6FF' : 'transparent',
                color: currentTab === tab.id ? '#2563EB' : '#475569',
                fontWeight: currentTab === tab.id ? 600 : 500,
                fontSize: '1rem',
                transition: 'all 0.15s'
              }}
            >
               <tab.icon size={20} />
               <span>{tab.label}</span>
            </div>
          ))}

          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '32px', marginBottom: '12px', paddingLeft: '12px' }}>System</div>
          {[
            { id: 'analytics', icon: BarChart3, label: 'Analytics' }
          ].map(tab => (
            <div 
              key={tab.id} 
              onClick={() => setCurrentTab(tab.id)} 
              style={{ 
                display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 16px', borderRadius: '8px', cursor: 'pointer',
                background: currentTab === tab.id ? '#EFF6FF' : 'transparent',
                color: currentTab === tab.id ? '#2563EB' : '#475569',
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
           <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div style={{ width: '44px', height: '44px', background: '#F1F5F9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569', fontWeight: 600, fontSize: '1.1rem' }}>SA</div>
              <div>
                 <div style={{ fontSize: '1rem', fontWeight: 600, color: '#0F172A' }}>System Admin</div>
                 <div style={{ fontSize: '0.85rem', color: '#64748B' }}>v4.2.0-Aurora</div>
              </div>
           </div>
           <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#DC2626', textDecoration: 'none', fontSize: '1rem', fontWeight: 500, padding: '10px', borderRadius: '8px', transition: 'background 0.15s' }}>
             <LogOut size={18} /> Terminate Session
           </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ marginLeft: '300px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Header */}
        <header style={{ height: '80px', background: 'white', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', position: 'sticky', top: 0, zIndex: 5 }}>
           <div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#0F172A', margin: 0, textTransform: 'capitalize' }}>
                 {currentTab === 'overview' && 'Ecosystem Hub'}
                 {currentTab === 'patients' && 'Patient Registry'}
                 {currentTab === 'doctors' && 'Clinical Team'}
                 {currentTab === 'schemes' && 'Government Schemes'}
                 {currentTab === 'analytics' && 'Analytics'}
              </h2>
           </div>
           <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ position: 'relative' }}>
                 <Search style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} size={18} />
                 <input type="text" placeholder="Global search..." style={{ padding: '10px 16px 10px 40px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '1rem', width: '250px', background: '#F8FAFC' }} />
              </div>
              <button style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', position: 'relative', padding: '8px' }}>
                 <Bell size={24} />
                 <span style={{ position: 'absolute', top: '4px', right: '4px', width: '10px', height: '10px', background: '#EF4444', borderRadius: '50%' }}></span>
              </button>
           </div>
        </header>

        {/* Dynamic Content */}
        <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
          <style>{`
            .animate-fade-in { animation: fadeIn 0.3s ease-out; }
            @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
            input:focus, button:focus { outline: 2px solid #3B82F6; outline-offset: 2px; }
          `}</style>
          {currentTab === 'overview' && renderOverview()}
          {currentTab === 'patients' && renderPatients()}
          {currentTab === 'doctors' && renderDoctors()}
          {currentTab === 'schemes' && renderSchemes()}
          {currentTab === 'analytics' && renderAnalytics()}
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard
