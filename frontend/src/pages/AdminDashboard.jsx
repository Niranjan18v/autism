import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Users, UserCog, Megaphone, LogOut,
  Search, Plus, Send, CheckCircle2, Trash2, Shield,
  Zap, UserPlus, FileText, ActivitySquare, Edit3, X, Eye, RefreshCw,
  TrendingUp, AlertTriangle, Clock, Filter, ChevronDown, ChevronUp,
  BarChart3, Activity, Star, Phone, Mail, MapPin, Calendar
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

/* ──────────────────────────────────────
   Small re-usable badge helper
────────────────────────────────────── */
const Badge = ({ label, color = '#10B981', bg = '#D1FAE5' }) => (
  <span style={{
    background: bg, color, padding: '3px 10px', borderRadius: '100px',
    fontWeight: 800, fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '4px'
  }}>
    {label}
  </span>
)

const Toast = ({ msg, type = 'success', onClose }) => {
  if (!msg) return null
  const colors = { success: { bg: '#D1FAE5', text: '#065F46', border: '#6EE7B7' }, error: { bg: '#FEE2E2', text: '#991B1B', border: '#FCA5A5' } }
  const c = colors[type] || colors.success
  return (
    <div style={{ position: 'fixed', top: '24px', right: '24px', zIndex: 9999, background: c.bg, color: c.text, border: `1px solid ${c.border}`, padding: '14px 20px', borderRadius: '12px', fontWeight: 800, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', animation: 'slideIn 0.3s ease' }}>
      <CheckCircle2 size={18} />
      {msg}
      <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: '8px', opacity: 0.7 }}><X size={16} /></button>
    </div>
  )
}

/* ──────────────────────────────────────
   MAIN COMPONENT
────────────────────────────────────── */
function AdminDashboard() {
  const navigate = useNavigate()
  const { language } = useLanguage()
  const [currentTab, setCurrentTab] = useState('overview')
  const [adminData, setAdminData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [toast, setToast] = useState({ msg: '', type: 'success' })
  const [alertSent, setAlertSent] = useState(null)
  const [sortField, setSortField] = useState('')
  const [sortDir, setSortDir] = useState('asc')

  // Modals
  const [editingPatient, setEditingPatient] = useState(null)
  const [editingDoctor, setEditingDoctor] = useState(null)
  const [previewingUser, setPreviewingUser] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null) // { userId, name }

  // Forms
  const [patientForm, setPatientForm] = useState({ childName: '', age: '', gender: 'Male', clinic: '', parentName: '', contact: '', assignedDoctor: '' })
  const [doctorForm, setDoctorForm] = useState({ fullName: '', specialization: '', qualification: '', experience: '', clinic: '', contact: '' })

  /* ── helpers ── */
  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast({ msg: '', type: 'success' }), 3500)
  }

  const getInitials = (name) => {
    if (!name) return '?'
    const p = name.trim().split(/\s+/)
    return p.length === 1 ? p[0].slice(0, 2).toUpperCase() : (p[0][0] + (p[1]?.[0] || '')).toUpperCase()
  }

  const avatarColor = (name) => {
    const colors = ['#4F46E5', '#059669', '#DB2777', '#D97706', '#0891B2', '#7C3AED']
    let h = 0; for (let c of (name || 'A')) h = (h * 31 + c.charCodeAt(0)) % colors.length
    return colors[h]
  }

  /* ── data fetch ── */
  const fetchAdminData = () => {
    setLoading(true)
    fetch('/api/admin/data')
      .then(r => r.json())
      .then(d => { if (d && !d.message) setAdminData(d) })
      .catch(() => showToast('Network error – could not load data', 'error'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchAdminData() }, [])

  /* ── derived data ── */
  const rawPatients = adminData?.patients || []
  const rawDoctors  = adminData?.doctors  || []

  const filtered = (list, nameKey) => list.filter(x => {
    const q = searchQuery.toLowerCase()
    return !q
      || (x[nameKey] || x.user?.name || '').toLowerCase().includes(q)
      || (x.clinic || '').toLowerCase().includes(q)
      || (x.specialization || x.parentName || '').toLowerCase().includes(q)
  })

  const filteredPatients = filtered(rawPatients, 'childName')
  const filteredDoctors  = filtered(rawDoctors,  'fullName')

  /* ── KPIs ── */
  const kpis = [
    { label: 'Registered Patients', value: adminData?.stats?.totalPatients ?? '—', icon: Users,         color: '#3B82F6', bg: '#EFF6FF', sub: 'Live DB Sync',          tab: 'patients' },
    { label: 'Medical Specialists', value: adminData?.stats?.totalDoctors  ?? '—', icon: UserCog,       color: '#10B981', bg: '#F0FDF4', sub: 'Verified Clinicians',    tab: 'doctors'  },
    { label: 'Registered Users',    value: adminData?.stats?.totalUsers    ?? '—', icon: ActivitySquare, color: '#8B5CF6', bg: '#F5F3FF', sub: 'All Roles',             tab: null       },
    { label: 'Partner Clinics',     value: adminData?.stats?.totalClinics  ?? '—', icon: FileText,      color: '#F59E0B', bg: '#FFFBEB', sub: 'Geographically Active', tab: null       },
  ]

  /* ── CRUD ── */
  const handleOpenEditPatient = p => {
    setEditingPatient(p)
    setPatientForm({
      childName: p.childName || p.user?.name || '', age: p.age || '',
      gender: p.gender || 'Male', clinic: p.clinic || '',
      parentName: p.parentName || '', contact: p.contact || '',
      assignedDoctor: p.assignedDoctor?._id || p.assignedDoctor || ''
    })
  }

  const handleSavePatient = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`/api/admin/patient/${editingPatient._id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patientForm)
      })
      if (res.ok) { showToast('Patient updated ✓'); setEditingPatient(null); fetchAdminData() }
      else { const d = await res.json(); showToast(d.message || 'Update failed', 'error') }
    } catch { showToast('Network error', 'error') }
  }

  const handleOpenEditDoctor = d => {
    setEditingDoctor(d)
    setDoctorForm({
      fullName: d.fullName || d.user?.name || '', specialization: d.specialization || '',
      qualification: d.qualification || '', experience: d.experience || '',
      clinic: d.clinic || '', contact: d.contact || ''
    })
  }

  const handleSaveDoctor = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`/api/admin/doctor/${editingDoctor._id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(doctorForm)
      })
      if (res.ok) { showToast('Doctor updated ✓'); setEditingDoctor(null); fetchAdminData() }
      else { const d = await res.json(); showToast(d.message || 'Update failed', 'error') }
    } catch { showToast('Network error', 'error') }
  }

  const handleConfirmDelete = async () => {
    if (!confirmDelete) return
    try {
      const res = await fetch(`/api/admin/user/${confirmDelete.userId}`, { method: 'DELETE' })
      if (res.ok) { showToast(`${confirmDelete.name} removed from system`); setConfirmDelete(null); fetchAdminData() }
      else showToast('Delete failed', 'error')
    } catch { showToast('Network error', 'error') }
  }

  /* ────────────────────────────────────
     RENDER TABS
  ──────────────────────────────────── */

  const renderOverview = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* KPI Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {kpis.map((k, i) => (
          <div
            key={i}
            onClick={() => k.tab && setCurrentTab(k.tab)}
            style={{ padding: '24px', background: 'white', border: '1px solid #E2E8F0', borderRadius: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', cursor: k.tab ? 'pointer' : 'default', transition: 'transform 0.15s, box-shadow 0.15s', position: 'relative', overflow: 'hidden' }}
            onMouseEnter={e => { if (k.tab) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)' }}}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)' }}
          >
            <div style={{ position: 'absolute', top: 0, right: 0, width: '80px', height: '80px', background: k.bg, borderRadius: '0 16px 0 80px', opacity: 0.6 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <p style={{ color: '#64748B', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>{k.label}</p>
              <div style={{ background: k.bg, padding: '8px', borderRadius: '10px', color: k.color }}><k.icon size={20} /></div>
            </div>
            <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#0F172A', lineHeight: 1, marginBottom: '8px' }}>
              {loading ? <span style={{ opacity: 0.3 }}>—</span> : k.value}
            </div>
            <p style={{ color: k.color, fontWeight: 700, fontSize: '0.82rem', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Zap size={13} /> {k.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Patient + Doctor Roster side by side */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Patients */}
        <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ margin: 0, fontWeight: 800, fontSize: '1.1rem', color: '#0F172A' }}>Active Patients</h3>
              <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>{filteredPatients.length} enrolled</span>
            </div>
            <button onClick={() => setCurrentTab('patients')} style={{ padding: '6px 14px', background: '#EFF6FF', color: '#2563EB', border: 'none', borderRadius: '100px', fontWeight: 800, fontSize: '0.82rem', cursor: 'pointer' }}>View All →</button>
          </div>
          <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '280px', overflowY: 'auto' }}>
            {filteredPatients.slice(0, 5).map(p => {
              const name = p.childName || p.user?.name || 'Patient'
              const ac = avatarColor(name)
              return (
                <div key={p._id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '10px', background: '#F8FAFC' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: ac + '20', color: ac, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.85rem', flexShrink: 0 }}>{getInitials(name)}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600 }}>{p.clinic || 'General'} • {p.age ? `Age ${p.age}` : 'Enrolled'}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button onClick={() => handleOpenEditPatient(p)} style={{ padding: '5px 8px', background: '#F1F5F9', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', color: '#0F172A' }}>Edit</button>
                    <button onClick={() => setPreviewingUser({ role: 'patient', data: p })} style={{ padding: '5px 10px', background: '#2563EB', color: 'white', border: 'none', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800, cursor: 'pointer' }}>View</button>
                  </div>
                </div>
              )
            })}
            {filteredPatients.length === 0 && <p style={{ textAlign: 'center', color: '#94A3B8', padding: '20px', fontWeight: 600 }}>No patients found</p>}
          </div>
        </div>

        {/* Doctors */}
        <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ margin: 0, fontWeight: 800, fontSize: '1.1rem', color: '#0F172A' }}>Active Doctors</h3>
              <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>{filteredDoctors.length} specialists</span>
            </div>
            <button onClick={() => setCurrentTab('doctors')} style={{ padding: '6px 14px', background: '#F0FDF4', color: '#059669', border: 'none', borderRadius: '100px', fontWeight: 800, fontSize: '0.82rem', cursor: 'pointer' }}>Manage →</button>
          </div>
          <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '280px', overflowY: 'auto' }}>
            {filteredDoctors.slice(0, 5).map(d => {
              const name = d.fullName || d.user?.name || 'Doctor'
              const ac = avatarColor(name)
              return (
                <div key={d._id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '10px', background: '#F8FAFC' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: ac + '20', color: ac, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.85rem', flexShrink: 0 }}>{getInitials(name)}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600 }}>{d.specialization || 'Clinical Lead'} • {d.patientCount || 0} cases</div>
                  </div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button onClick={() => handleOpenEditDoctor(d)} style={{ padding: '5px 8px', background: '#F1F5F9', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', color: '#0F172A' }}>Edit</button>
                    <button onClick={() => setPreviewingUser({ role: 'doctor', data: d })} style={{ padding: '5px 10px', background: '#059669', color: 'white', border: 'none', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800, cursor: 'pointer' }}>View</button>
                  </div>
                </div>
              )
            })}
            {filteredDoctors.length === 0 && <p style={{ textAlign: 'center', color: '#94A3B8', padding: '20px', fontWeight: 600 }}>No doctors found</p>}
          </div>
        </div>
      </div>

      {/* Broadcast + Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px' }}>
        {/* Broadcast */}
        <div style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', borderRadius: '16px', padding: '28px', color: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <Megaphone size={20} color="#38BDF8" />
            <h3 style={{ margin: 0, fontWeight: 900, fontSize: '1.15rem' }}>Broadcast Center</h3>
          </div>
          <p style={{ color: '#94A3B8', fontSize: '0.88rem', marginBottom: '20px', lineHeight: 1.5 }}>Push system-wide alerts, policy directives, and health scheme updates to families and doctors.</p>
          {[
            { id: 1, title: 'TN Education Scheme #42', desc: 'L2 families in 12 rural districts', color: '#3B82F6' },
            { id: 2, title: 'Rural Telehealth Subsidy', desc: 'Low-income families – 450 eligible', color: '#8B5CF6' }
          ].map(s => (
            <div key={s.id} style={{ background: '#1E293B', padding: '14px 18px', borderRadius: '12px', border: '1px solid #334155', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'white' }}>{s.title}</div>
                <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '2px' }}>{s.desc}</div>
              </div>
              <button
                onClick={() => { setAlertSent(s.id); setTimeout(() => setAlertSent(null), 3000) }}
                style={{ padding: '8px 16px', background: alertSent === s.id ? '#10B981' : s.color, color: 'white', border: 'none', borderRadius: '8px', fontWeight: 800, fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap', flexShrink: 0 }}
              >
                {alertSent === s.id ? <><CheckCircle2 size={14} /> Sent!</> : <><Send size={14} /> Broadcast</>}
              </button>
            </div>
          ))}
          <button onClick={() => setCurrentTab('schemes')} style={{ width: '100%', background: 'transparent', border: '2px dashed #475569', color: '#94A3B8', padding: '10px', borderRadius: '10px', fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer' }}>
            + Create New Directive
          </button>
        </div>

        {/* Quick Actions */}
        <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <h3 style={{ margin: '0 0 20px 0', fontWeight: 800, fontSize: '1.1rem', color: '#0F172A' }}>Quick Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { icon: UserPlus, label: 'Register New Patient', color: '#2563EB', bg: '#EFF6FF', action: () => navigate('/register/patient') },
              { icon: UserCog,  label: 'Add Doctor / Specialist', color: '#059669', bg: '#F0FDF4', action: () => navigate('/register/doctor') },
              { icon: BarChart3, label: 'View Clinical Reports', color: '#7C3AED', bg: '#F5F3FF', action: () => navigate('/report') },
              { icon: RefreshCw, label: 'Refresh System Data', color: '#D97706', bg: '#FFFBEB', action: fetchAdminData },
            ].map((qa, i) => (
              <button key={i} onClick={qa.action} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', background: qa.bg, border: 'none', borderRadius: '12px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: qa.color + '20', color: qa.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <qa.icon size={18} />
                </div>
                <span style={{ fontWeight: 800, color: '#0F172A', fontSize: '0.9rem' }}>{qa.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  /* ── Patients Tab ── */
  const renderPatients = () => (
    <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
      <div style={{ padding: '24px 28px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ margin: '0 0 4px 0', fontWeight: 900, fontSize: '1.4rem', color: '#0F172A' }}>Patient Registry</h2>
          <p style={{ margin: 0, color: '#64748B', fontWeight: 600, fontSize: '0.9rem' }}>{filteredPatients.length} patients • Full edit & oversight control</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} size={15} />
            <input type="text" placeholder="Search name, clinic, parent..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ padding: '9px 14px 9px 36px', borderRadius: '100px', border: '1px solid #E2E8F0', fontSize: '0.88rem', width: '220px', fontWeight: 600, outline: 'none', background: '#F8FAFC' }} />
          </div>
          <button onClick={() => navigate('/register/patient')} style={{ padding: '9px 18px', background: '#2563EB', color: 'white', border: 'none', borderRadius: '100px', fontSize: '0.88rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Plus size={15} /> Add Patient
          </button>
        </div>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#F8FAFC' }}>
              {['Patient', 'Age & Gender', 'Clinic & Parent', 'Assigned Doctor', 'Contact', 'Actions'].map((h, i) => (
                <th key={i} style={{ padding: '14px 22px', color: '#475569', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: i === 5 ? 'right' : 'left', borderBottom: '1px solid #F1F5F9' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((p, i) => {
              const name = p.childName || p.user?.name || 'Patient'
              const docName = p.assignedDoctor?.fullName || p.assignedDoctor?.user?.name || 'Unassigned'
              const ac = avatarColor(name)
              return (
                <tr key={p._id} style={{ borderBottom: i < filteredPatients.length - 1 ? '1px solid #F8FAFC' : 'none' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#FAFBFF'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '16px 22px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: ac + '20', color: ac, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.9rem', flexShrink: 0 }}>{getInitials(name)}</div>
                      <div>
                        <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '0.92rem' }}>{name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600 }}>{p.user?.email || 'No email'}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px 22px', fontWeight: 700, color: '#334155', fontSize: '0.88rem' }}>
                    {p.age ? `${p.age} yrs` : '—'} • {p.gender || 'N/A'}
                  </td>
                  <td style={{ padding: '16px 22px' }}>
                    <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.88rem' }}>{p.clinic || 'General Clinic'}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Parent: {p.parentName || '—'}</div>
                  </td>
                  <td style={{ padding: '16px 22px' }}>
                    <Badge label={docName} color={docName === 'Unassigned' ? '#DC2626' : '#059669'} bg={docName === 'Unassigned' ? '#FEF2F2' : '#F0FDF4'} />
                  </td>
                  <td style={{ padding: '16px 22px', color: '#64748B', fontSize: '0.85rem', fontWeight: 600 }}>
                    {p.contact || '—'}
                  </td>
                  <td style={{ padding: '16px 22px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                      <button onClick={() => handleOpenEditPatient(p)} style={{ padding: '6px 12px', background: '#F1F5F9', border: '1px solid #CBD5E1', borderRadius: '8px', color: '#0F172A', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Edit3 size={13} /> Edit
                      </button>
                      <button onClick={() => setPreviewingUser({ role: 'patient', data: p })} style={{ padding: '6px 12px', background: '#2563EB', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Eye size={13} /> Preview
                      </button>
                      {p.user && (
                        <button onClick={() => setConfirmDelete({ userId: p.user._id || p.user, name: name })} style={{ padding: '6px 8px', background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '8px', color: '#DC2626', cursor: 'pointer' }}>
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {filteredPatients.length === 0 && (
          <div style={{ padding: '60px', textAlign: 'center', color: '#94A3B8' }}>
            <Users size={48} style={{ opacity: 0.3, marginBottom: '12px' }} />
            <p style={{ fontWeight: 700, margin: 0 }}>No patients match your search</p>
          </div>
        )}
      </div>
    </div>
  )

  /* ── Doctors Tab ── */
  const renderDoctors = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ margin: '0 0 4px 0', fontWeight: 900, fontSize: '1.4rem', color: '#0F172A' }}>Doctor Command</h2>
          <p style={{ margin: 0, color: '#64748B', fontWeight: 600, fontSize: '0.9rem' }}>{filteredDoctors.length} clinicians • Full credential management</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} size={15} />
            <input type="text" placeholder="Search name, specialization..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ padding: '9px 14px 9px 36px', borderRadius: '100px', border: '1px solid #E2E8F0', fontSize: '0.88rem', width: '220px', fontWeight: 600, outline: 'none', background: '#F8FAFC' }} />
          </div>
          <button onClick={() => navigate('/register/doctor')} style={{ padding: '9px 18px', background: '#059669', color: 'white', border: 'none', borderRadius: '100px', fontSize: '0.88rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <UserPlus size={15} /> Add Doctor
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {filteredDoctors.map(d => {
          const name = d.fullName || d.user?.name || 'Doctor'
          const ac = avatarColor(name)
          return (
            <div key={d._id} style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
              <div style={{ background: `linear-gradient(135deg, ${ac}15 0%, ${ac}08 100%)`, padding: '20px 20px 0', borderBottom: '1px solid #F1F5F9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: ac + '25', color: ac, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.1rem', border: `2px solid ${ac}40` }}>
                    {getInitials(name)}
                  </div>
                  <div>
                    <h3 style={{ margin: '0 0 2px 0', fontWeight: 900, fontSize: '1rem', color: '#0F172A' }}>{name}</h3>
                    <span style={{ fontSize: '0.82rem', color: ac, fontWeight: 700 }}>{d.specialization || 'Pediatric Specialist'}</span>
                  </div>
                </div>
              </div>
              <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div style={{ background: '#F8FAFC', padding: '10px 12px', borderRadius: '10px', border: '1px solid #F1F5F9' }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0F172A' }}>{d.patientCount || 0}</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Active Cases</div>
                  </div>
                  <div style={{ background: '#F8FAFC', padding: '10px 12px', borderRadius: '10px', border: '1px solid #F1F5F9' }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0F172A' }}>{d.experience ? `${d.experience}y` : '—'}</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Experience</div>
                  </div>
                </div>
                {d.clinic && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748B', fontSize: '0.82rem', fontWeight: 600 }}>
                    <MapPin size={13} /> {d.clinic}
                  </div>
                )}
                {d.qualification && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748B', fontSize: '0.82rem', fontWeight: 600 }}>
                    <Star size={13} color="#F59E0B" /> {d.qualification}
                  </div>
                )}
                {d.user?.email && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748B', fontSize: '0.82rem', fontWeight: 600 }}>
                    <Mail size={13} /> {d.user.email}
                  </div>
                )}
                <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                  <button onClick={() => handleOpenEditDoctor(d)} style={{ flex: 1, padding: '9px', background: '#4F46E5', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <Edit3 size={14} /> Edit Profile
                  </button>
                  <button onClick={() => setPreviewingUser({ role: 'doctor', data: d })} style={{ padding: '9px 14px', background: '#F1F5F9', border: '1px solid #CBD5E1', borderRadius: '10px', color: '#0F172A', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Eye size={14} /> View
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {filteredDoctors.length === 0 && (
        <div style={{ padding: '80px', textAlign: 'center', color: '#94A3B8', background: 'white', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
          <UserCog size={48} style={{ opacity: 0.3, marginBottom: '12px' }} />
          <p style={{ fontWeight: 700, margin: 0 }}>No doctors match your search</p>
        </div>
      )}
    </div>
  )

  /* ── Schemes Tab ── */
  const schemes = [
    { id: 1, title: 'TN Education Grant #42', target: 'Level 2 Patients', families: '120 Families', date: '2026-05-15', status: 'PUBLISHED', color: '#3B82F6' },
    { id: 2, title: 'Rural Telehealth Subsidy', target: 'Low-income Rural', families: '450 Families', date: '2026-05-10', status: 'PUBLISHED', color: '#8B5CF6' },
    { id: 3, title: 'Free Sensory Kit Program', target: 'Level 3 Patients', families: '85 Families', date: '2026-05-16', status: 'ACTIVE', color: '#10B981' },
    { id: 4, title: 'Niramaya Health Insurance', target: 'All Patients', families: '230 Families', date: '2026-06-01', status: 'ACTIVE', color: '#F59E0B' },
  ]
  const renderSchemes = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: '0 0 4px 0', fontWeight: 900, fontSize: '1.4rem', color: '#0F172A' }}>Governance & Directives</h2>
          <p style={{ margin: 0, color: '#64748B', fontWeight: 600, fontSize: '0.9rem' }}>Broadcast government health schemes to enrolled families</p>
        </div>
        <button style={{ padding: '9px 18px', background: '#8B5CF6', color: 'white', border: 'none', borderRadius: '100px', fontSize: '0.88rem', fontWeight: 800, cursor: 'pointer' }}>
          + Create Directive
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
        {schemes.map(s => (
          <div key={s.id} style={{ background: 'white', border: `1px solid ${s.color}30`, borderRadius: '16px', padding: '22px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', borderLeft: `4px solid ${s.color}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <h3 style={{ margin: 0, fontWeight: 800, fontSize: '1rem', color: '#0F172A', lineHeight: 1.3 }}>{s.title}</h3>
              <Badge label={s.status} color={s.status === 'ACTIVE' ? '#059669' : '#2563EB'} bg={s.status === 'ACTIVE' ? '#F0FDF4' : '#EFF6FF'} />
            </div>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
              <div><div style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '2px' }}>Target</div><div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#334155' }}>{s.target}</div></div>
              <div><div style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '2px' }}>Reach</div><div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#334155' }}>{s.families}</div></div>
              <div><div style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '2px' }}>Date</div><div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#334155' }}>{s.date}</div></div>
            </div>
            <button onClick={() => { setAlertSent(s.id); showToast(`Broadcast sent for "${s.title}"`); setTimeout(() => setAlertSent(null), 3000) }} style={{ width: '100%', padding: '10px', background: alertSent === s.id ? '#10B981' : s.color, color: 'white', border: 'none', borderRadius: '10px', fontWeight: 800, fontSize: '0.88rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', transition: 'all 0.2s' }}>
              {alertSent === s.id ? <><CheckCircle2 size={16} /> Dispatched!</> : <><Send size={16} /> Broadcast</>}
            </button>
          </div>
        ))}
      </div>
    </div>
  )

  /* ────────────────────────────────────
     MODALS
  ──────────────────────────────────── */
  const ModalShell = ({ children, onClose, title, subtitle }) => (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.65)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
      <div style={{ background: 'white', borderRadius: '20px', padding: '32px', maxWidth: '520px', width: '100%', boxShadow: '0 24px 60px rgba(0,0,0,0.25)', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
        <button onClick={onClose} style={{ position: 'absolute', right: '20px', top: '20px', border: 'none', background: '#F1F5F9', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><X size={16} /></button>
        <h2 style={{ margin: '0 0 4px 0', fontWeight: 900, fontSize: '1.3rem', color: '#0F172A' }}>{title}</h2>
        <p style={{ margin: '0 0 24px 0', color: '#64748B', fontSize: '0.85rem', fontWeight: 600 }}>{subtitle}</p>
        {children}
      </div>
    </div>
  )

  const FormInput = ({ label, value, onChange, type = 'text', required = false, min, max }) => (
    <div>
      <label style={{ display: 'block', fontWeight: 800, fontSize: '0.82rem', color: '#334155', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.03em' }}>{label}</label>
      <input type={type} value={value} onChange={onChange} required={required} min={min} max={max} style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E2E8F0', fontWeight: 700, fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }} onFocus={e => e.target.style.borderColor = '#6366F1'} onBlur={e => e.target.style.borderColor = '#E2E8F0'} />
    </div>
  )

  const FormSelect = ({ label, value, onChange, children }) => (
    <div>
      <label style={{ display: 'block', fontWeight: 800, fontSize: '0.82rem', color: '#334155', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.03em' }}>{label}</label>
      <select value={value} onChange={onChange} style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E2E8F0', fontWeight: 700, fontSize: '0.95rem', outline: 'none', background: 'white', boxSizing: 'border-box' }}>
        {children}
      </select>
    </div>
  )

  /* ────────────────────────────────────
     MAIN LAYOUT
  ──────────────────────────────────── */
  const navItems = [
    { id: 'overview', label: 'Ecosystem Hub',     icon: LayoutDashboard },
    { id: 'patients', label: 'Patient Registry',  icon: Users            },
    { id: 'doctors',  label: 'Doctor Command',    icon: UserCog          },
    { id: 'schemes',  label: 'Directives',        icon: Megaphone        },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
        * { font-family: 'Inter', system-ui, sans-serif; }
        @keyframes slideIn { from { transform: translateX(40px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #F1F5F9; border-radius: 3px; }
        ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 3px; }
      `}</style>

      <Toast msg={toast.msg} type={toast.type} onClose={() => setToast({ msg: '', type: 'success' })} />

      <div style={{ display: 'flex', minHeight: '100vh', background: '#F1F5F9' }}>

        {/* ── Sidebar ── */}
        <aside style={{ width: '240px', background: '#0F172A', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '20px 12px', flexShrink: 0 }}>
          <div>
            {/* Brand */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px 24px', borderBottom: '1px solid #1E293B', marginBottom: '16px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Shield size={18} color="white" />
              </div>
              <div>
                <div style={{ fontWeight: 900, fontSize: '1.1rem', color: 'white', letterSpacing: '-0.5px' }}>AURA</div>
                <div style={{ fontSize: '0.68rem', color: '#475569', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Admin Console</div>
              </div>
            </div>

            {/* Nav */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {navItems.map(item => {
                const active = currentTab === item.id
                return (
                  <button key={item.id} onClick={() => setCurrentTab(item.id)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '11px 14px', borderRadius: '10px', background: active ? 'rgba(99,102,241,0.15)' : 'transparent', color: active ? '#818CF8' : '#64748B', border: active ? '1px solid rgba(99,102,241,0.25)' : '1px solid transparent', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.15s', textAlign: 'left' }}>
                    <item.icon size={17} />
                    <span>{item.label}</span>
                    {active && <div style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', background: '#818CF8' }} />}
                  </button>
                )
              })}
            </nav>

            {/* Stats mini */}
            <div style={{ marginTop: '24px', padding: '14px', background: '#1E293B', borderRadius: '12px', border: '1px solid #334155' }}>
              <div style={{ fontSize: '0.72rem', color: '#475569', fontWeight: 800, textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.06em' }}>System Stats</div>
              {[
                { label: 'Patients', value: adminData?.stats?.totalPatients ?? '—', color: '#60A5FA' },
                { label: 'Doctors',  value: adminData?.stats?.totalDoctors  ?? '—', color: '#34D399' },
                { label: 'Clinics',  value: adminData?.stats?.totalClinics  ?? '—', color: '#FBBF24' },
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0', borderTop: i > 0 ? '1px solid #334155' : 'none' }}>
                  <span style={{ fontSize: '0.82rem', color: '#94A3B8', fontWeight: 600 }}>{s.label}</span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 900, color: s.color }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* User / Sign Out */}
          <div style={{ borderTop: '1px solid #1E293B', paddingTop: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0 8px 12px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#7C3AED', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.85rem', flexShrink: 0 }}>AD</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>System Admin</div>
                <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>admin@aura.com</div>
              </div>
            </div>
            <button onClick={() => navigate('/login')} style={{ width: '100%', background: '#1E293B', color: '#F87171', border: '1px solid #334155', padding: '9px', borderRadius: '10px', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <LogOut size={15} /> Sign Out
            </button>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

          {/* Header */}
          <header style={{ background: 'white', borderBottom: '1px solid #E2E8F0', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
            <div>
              <h1 style={{ margin: 0, fontWeight: 900, fontSize: '1.25rem', color: '#0F172A' }}>
                {navItems.find(n => n.id === currentTab)?.label || 'Dashboard'}
              </h1>
              <p style={{ margin: 0, color: '#94A3B8', fontSize: '0.8rem', fontWeight: 600 }}>
                {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button onClick={fetchAdminData} disabled={loading} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '100px', fontWeight: 700, fontSize: '0.82rem', color: '#475569', cursor: 'pointer' }}>
                <RefreshCw size={13} style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} />
                {loading ? 'Syncing…' : 'Sync DB'}
              </button>
              <div style={{ padding: '8px 14px', background: '#D1FAE5', color: '#065F46', borderRadius: '100px', fontWeight: 800, fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10B981' }} />
                System Online
              </div>
            </div>
          </header>

          {/* Body */}
          <main style={{ flex: 1, padding: '28px 32px', overflowY: 'auto' }}>
            {currentTab === 'overview' && renderOverview()}
            {currentTab === 'patients' && renderPatients()}
            {currentTab === 'doctors'  && renderDoctors()}
            {currentTab === 'schemes'  && renderSchemes()}
          </main>
        </div>
      </div>

      {/* ── Edit Patient Modal ── */}
      {editingPatient && (
        <ModalShell onClose={() => setEditingPatient(null)} title="Edit Patient Profile" subtitle="Update child details, clinic assignment & doctor link">
          <form onSubmit={handleSavePatient} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <FormInput label="Child Name" value={patientForm.childName} onChange={e => setPatientForm({...patientForm, childName: e.target.value})} required />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <FormInput label="Age (Years)" type="number" value={patientForm.age} onChange={e => setPatientForm({...patientForm, age: e.target.value})} min="0" max="20" />
              <FormSelect label="Gender" value={patientForm.gender} onChange={e => setPatientForm({...patientForm, gender: e.target.value})}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </FormSelect>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <FormInput label="Clinic Branch" value={patientForm.clinic} onChange={e => setPatientForm({...patientForm, clinic: e.target.value})} />
              <FormInput label="Parent Name" value={patientForm.parentName} onChange={e => setPatientForm({...patientForm, parentName: e.target.value})} />
            </div>
            <FormInput label="Contact Number" value={patientForm.contact} onChange={e => setPatientForm({...patientForm, contact: e.target.value})} />
            <FormSelect label="Assign Doctor" value={patientForm.assignedDoctor} onChange={e => setPatientForm({...patientForm, assignedDoctor: e.target.value})}>
              <option value="">— Unassigned —</option>
              {rawDoctors.map(d => (
                <option key={d._id} value={d._id}>{d.fullName || d.user?.name} ({d.specialization || 'Doctor'})</option>
              ))}
            </FormSelect>
            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
              <button type="button" onClick={() => setEditingPatient(null)} style={{ flex: 1, padding: '11px', background: '#F1F5F9', border: 'none', borderRadius: '10px', fontWeight: 800, cursor: 'pointer' }}>Cancel</button>
              <button type="submit" style={{ flex: 1, padding: '11px', background: 'linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 800, cursor: 'pointer' }}>Save Changes</button>
            </div>
          </form>
        </ModalShell>
      )}

      {/* ── Edit Doctor Modal ── */}
      {editingDoctor && (
        <ModalShell onClose={() => setEditingDoctor(null)} title="Edit Doctor Profile" subtitle="Update credentials, specialization & clinic details">
          <form onSubmit={handleSaveDoctor} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <FormInput label="Full Name" value={doctorForm.fullName} onChange={e => setDoctorForm({...doctorForm, fullName: e.target.value})} required />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <FormInput label="Specialization" value={doctorForm.specialization} onChange={e => setDoctorForm({...doctorForm, specialization: e.target.value})} />
              <FormInput label="Qualification" value={doctorForm.qualification} onChange={e => setDoctorForm({...doctorForm, qualification: e.target.value})} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <FormInput label="Experience (Years)" type="number" value={doctorForm.experience} onChange={e => setDoctorForm({...doctorForm, experience: e.target.value})} min="0" />
              <FormInput label="Contact" value={doctorForm.contact} onChange={e => setDoctorForm({...doctorForm, contact: e.target.value})} />
            </div>
            <FormInput label="Clinic Center" value={doctorForm.clinic} onChange={e => setDoctorForm({...doctorForm, clinic: e.target.value})} />
            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
              <button type="button" onClick={() => setEditingDoctor(null)} style={{ flex: 1, padding: '11px', background: '#F1F5F9', border: 'none', borderRadius: '10px', fontWeight: 800, cursor: 'pointer' }}>Cancel</button>
              <button type="submit" style={{ flex: 1, padding: '11px', background: 'linear-gradient(135deg, #059669 0%, #4F46E5 100%)', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 800, cursor: 'pointer' }}>Update Doctor</button>
            </div>
          </form>
        </ModalShell>
      )}

      {/* ── Confirm Delete Modal ── */}
      {confirmDelete && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '32px', maxWidth: '400px', width: '90%', textAlign: 'center', boxShadow: '0 24px 60px rgba(0,0,0,0.25)' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#FEE2E2', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Trash2 size={24} color="#DC2626" />
            </div>
            <h2 style={{ margin: '0 0 8px 0', fontWeight: 900, fontSize: '1.2rem', color: '#0F172A' }}>Delete Account</h2>
            <p style={{ color: '#64748B', fontWeight: 600, fontSize: '0.9rem', marginBottom: '24px' }}>
              Are you sure you want to permanently delete <strong>{confirmDelete.name}</strong>? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setConfirmDelete(null)} style={{ flex: 1, padding: '11px', background: '#F1F5F9', border: 'none', borderRadius: '10px', fontWeight: 800, cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleConfirmDelete} style={{ flex: 1, padding: '11px', background: '#DC2626', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 800, cursor: 'pointer' }}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Preview / Impersonate Modal ── */}
      {previewingUser && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.7)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: 'white', borderRadius: '24px', width: '100%', maxWidth: '640px', padding: '32px', boxShadow: '0 24px 60px rgba(0,0,0,0.25)', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
            <button onClick={() => setPreviewingUser(null)} style={{ position: 'absolute', right: '20px', top: '20px', border: 'none', background: '#F1F5F9', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><X size={16} /></button>

            {/* Header */}
            {(() => {
              const d = previewingUser.data
              const isPatient = previewingUser.role === 'patient'
              const name = isPatient ? (d.childName || d.user?.name) : (d.fullName || d.user?.name)
              const ac = avatarColor(name || 'A')
              return (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: ac + '25', color: ac, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.2rem', border: `2px solid ${ac}40` }}>{getInitials(name)}</div>
                    <div>
                      <div style={{ fontSize: '0.72rem', fontWeight: 900, textTransform: 'uppercase', color: ac, letterSpacing: '0.06em', marginBottom: '2px' }}>Admin Preview · {previewingUser.role.toUpperCase()}</div>
                      <h2 style={{ margin: 0, fontWeight: 900, fontSize: '1.35rem', color: '#0F172A' }}>{name || 'Unknown'}</h2>
                      <div style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: 600 }}>{d.user?.email}</div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
                    {isPatient ? [
                      { label: 'Age', value: d.age ? `${d.age} yrs` : 'N/A' },
                      { label: 'Gender', value: d.gender || 'N/A' },
                      { label: 'Clinic', value: d.clinic || 'General' },
                      { label: 'Parent', value: d.parentName || '—' },
                      { label: 'Contact', value: d.contact || '—' },
                      { label: 'Doctor', value: d.assignedDoctor?.fullName || d.assignedDoctor?.user?.name || 'Unassigned' },
                    ] : [
                      { label: 'Specialization', value: d.specialization || 'N/A' },
                      { label: 'Qualification', value: d.qualification || 'N/A' },
                      { label: 'Clinic', value: d.clinic || 'General' },
                      { label: 'Experience', value: d.experience ? `${d.experience} yrs` : 'N/A' },
                      { label: 'Active Cases', value: d.patientCount ?? 0 },
                      { label: 'Contact', value: d.contact || '—' },
                    ].map((item, i) => (
                      <div key={i} style={{ background: '#F8FAFC', padding: '12px 14px', borderRadius: '12px', border: '1px solid #F1F5F9' }}>
                        <div style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>{item.label}</div>
                        <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '0.9rem' }}>{item.value}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => { setPreviewingUser(null); navigate(isPatient ? '/dashboard/patient' : '/dashboard/doctor') }} style={{ flex: 1, padding: '13px', background: `linear-gradient(135deg, ${ac} 0%, #4F46E5 100%)`, color: 'white', border: 'none', borderRadius: '12px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.95rem' }}>
                      <Eye size={16} /> Open Full {previewingUser.role.charAt(0).toUpperCase() + previewingUser.role.slice(1)} Portal
                    </button>
                  </div>
                </>
              )
            })()}
          </div>
        </div>
      )}
    </>
  )
}

export default AdminDashboard
