import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, User, Stethoscope, Shield, Heart, Lock, Mail, Phone, ChevronRight } from 'lucide-react'

function LoginPage() {
  const [activeTab, setActiveTab] = useState('patient')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    if (activeTab === 'patient') navigate('/dashboard/patient')
    else if (activeTab === 'doctor') navigate('/dashboard/doctor')
    else navigate('/dashboard/admin')
  }

  return (
    <div className="playground-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px' }}>
      <div className="mesh-bg"></div>
      
      <style>{`
        .btn-pop { transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); cursor: pointer; border: none; }
        .btn-pop:hover { transform: translateY(-6px) scale(1.03); }
        .btn-pop:active { transform: scale(0.95); }
        
        .login-input {
          width: 100%;
          padding: 24px 24px 24px 64px;
          border-radius: 20px;
          border: 4px solid var(--slate-50);
          background: var(--slate-50);
          font-weight: 700;
          font-size: 1.2rem;
          transition: all 0.3s;
          outline: none;
        }
        .login-input:focus {
          border-color: var(--p-300);
          background: white;
          box-shadow: 0 15px 30px rgba(139, 92, 246, 0.1);
        }
      `}</style>

      <div className="bento-card animate-slide-up" style={{ width: '100%', maxWidth: '550px', padding: '64px', background: 'white' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--slate-400)', fontWeight: 800, textDecoration: 'none', marginBottom: '48px', fontSize: '1.1rem' }} className="btn-pop">
          <ArrowLeft size={20} /> Back to Home
        </Link>

        <div style={{ marginBottom: '56px' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '12px', letterSpacing: '-2px' }}>Welcome back</h1>
          <p style={{ color: 'var(--slate-600)', fontWeight: 600, fontSize: '1.4rem' }}>Access your personalized care ecosystem.</p>
        </div>

        <div className="bento-card" style={{ display: 'flex', padding: '8px', background: 'var(--slate-50)', marginBottom: '48px', border: 'none' }}>
          {[
            { id: 'patient', label: 'Parent', icon: Heart },
            { id: 'doctor', label: 'Doctor', icon: Stethoscope },
            { id: 'admin', label: 'Admin', icon: Shield }
          ].map(role => (
            <button key={role.id} onClick={() => setActiveTab(role.id)} className="btn-pop" style={{ flex: 1, padding: '16px', borderRadius: '15px', background: activeTab === role.id ? 'white' : 'transparent', color: activeTab === role.id ? 'var(--slate-900)' : 'var(--slate-400)', fontWeight: 800, fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: activeTab === role.id ? '0 10px 20px rgba(0,0,0,0.05)' : 'none' }}>
              <role.icon size={20} /> {role.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div style={{ position: 'relative' }}>
            <label style={{ display: 'block', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '12px', fontSize: '1.1rem' }}>{activeTab === 'patient' ? 'Phone Number' : 'Clinical Email'}</label>
            <div style={{ position: 'relative' }}>
              {activeTab === 'patient' ? <Phone style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', color: 'var(--p-500)' }} /> : <Mail style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', color: 'var(--p-500)' }} />}
              <input type="text" className="login-input" placeholder={activeTab === 'patient' ? "+91 98XXX XXXX" : "name@hospital.com"} required />
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <label style={{ display: 'block', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '12px', fontSize: '1.1rem' }}>Secure Password</label>
            <div style={{ position: 'relative' }}>
              <Lock style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', color: 'var(--p-500)' }} />
              <input type="password" className="login-input" placeholder="••••••••" required />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 8px' }}>
             <label style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--slate-600)', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer' }}>
                <input type="checkbox" style={{ width: '22px', height: '22px', accentColor: 'var(--p-500)' }} /> Remember me
             </label>
             <span style={{ color: 'var(--p-500)', fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer' }}>Forgot?</span>
          </div>

          <button type="submit" className="btn-neon" style={{ padding: '24px', fontSize: '1.4rem', marginTop: '16px' }}>
            CONTINUE TO DASHBOARD
          </button>
        </form>

        <div style={{ marginTop: '56px', textAlign: 'center', borderTop: '4px solid var(--slate-50)', paddingTop: '40px' }}>
          <p style={{ fontWeight: 700, color: 'var(--slate-400)', fontSize: '1.2rem' }}>
            New to Autishta? <span style={{ color: 'var(--p-500)', fontWeight: 800, cursor: 'pointer' }}>Register via Clinic</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
