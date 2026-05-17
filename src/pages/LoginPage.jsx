import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, User, Stethoscope, Shield, Heart, Lock, Mail, Phone, Star, TrendingUp, Sparkles } from 'lucide-react'

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
    <div style={{ minHeight: '100vh', display: 'flex', background: '#F8FAFC', fontFamily: 'system-ui, -apple-system, sans-serif', overflow: 'hidden' }}>
      
      {styleTag}

      {/* Left Column: Premium Visual Showcase */}
      <div className="login-showcase-column" style={{ 
        flex: '0 0 45%', 
        background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #EC4899 100%)', 
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '60px',
        color: 'white',
        overflow: 'hidden'
      }}>
        {/* Decorative Grid overlay */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.08, pointerEvents: 'none', background: 'radial-gradient(circle, #FFF 1px, transparent 1px) 0 0/24px 24px' }}></div>
        
        {/* Floating Aura Bubble Glows */}
        <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.06)', filter: 'blur(80px)' }}></div>
        <div style={{ position: 'absolute', bottom: '-5%', right: '-5%', width: '350px', height: '350px', borderRadius: '50%', background: 'rgba(244, 114, 182, 0.12)', filter: 'blur(80px)' }}></div>

        {/* Top Branding Section */}
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.15)', padding: '10px', borderRadius: '12px', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>
            <Sparkles color="white" size={24} />
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.02em' }}>AURA</span>
        </div>

        {/* Middle Interactive Showcases */}
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '28px', margin: '40px 0' }}>
          
          <h2 style={{ fontSize: '2.8rem', fontWeight: 900, lineHeight: 1.2, letterSpacing: '-0.5px', color: 'white', margin: 0 }}>
            Empowering <br/>
            neurodiverse care.
          </h2>
          
          <p style={{ fontSize: '1.2rem', opacity: 0.9, fontWeight: 550, lineHeight: 1.6, margin: 0, maxWidth: '440px' }}>
            A personalized, calm, and predictive digital ecosystem bridging clinical goals with daily therapeutic play.
          </p>

          {/* Interactive Floating Card 1: Star progression */}
          <div className="frosted-showcase-card" style={{ 
            background: 'rgba(255, 255, 255, 0.1)', 
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '20px',
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
            transform: 'rotate(-1deg)',
            maxWidth: '380px'
          }}>
            <div style={{ width: '48px', height: '48px', background: 'rgba(253, 224, 71, 0.2)', border: '1.5px solid #FBBF24', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FBBF24' }}>
              <Star fill="#FBBF24" color="#FBBF24" size={22} />
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>DAILY SUCCESS</span>
              <span style={{ fontSize: '1.15rem', fontWeight: 900, color: 'white', display: 'block', marginTop: '2px' }}>Arjun completed 4 Missions!</span>
            </div>
          </div>

          {/* Interactive Floating Card 2: Skill Mastery progression */}
          <div className="frosted-showcase-card" style={{ 
            background: 'rgba(255, 255, 255, 0.1)', 
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '20px',
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
            transform: 'rotate(1.5deg)',
            maxWidth: '380px',
            marginLeft: '40px'
          }}>
            <div style={{ width: '48px', height: '48px', background: 'rgba(16, 185, 129, 0.2)', border: '1.5px solid #34D399', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#34D399' }}>
              <TrendingUp size={22} />
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>WEEKLY REPORT</span>
              <span style={{ fontSize: '1.15rem', fontWeight: 900, color: 'white', display: 'block', marginTop: '2px' }}>+15% Growth in Social Skill</span>
            </div>
          </div>

        </div>

        {/* Bottom Tagline */}
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: 700, opacity: 0.8 }}>
          <Heart size={16} fill="currentColor" />
          <span>Made for predictive pediatric wellness</span>
        </div>

      </div>

      {/* Right Column: Sleek Form Column */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        padding: '80px 100px',
        background: 'white',
        overflowY: 'auto'
      }} className="login-form-column">
        
        <div style={{ maxWidth: '480px', width: '100%', margin: '0 auto' }}>
          
          {/* Back Home Button */}
          <Link to="/" style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            color: 'var(--slate-400)', 
            fontWeight: 800, 
            textDecoration: 'none', 
            marginBottom: '36px', 
            fontSize: '0.95rem',
            transition: 'color 0.2s'
          }} className="hover-slate-600">
            <ArrowLeft size={16} /> Back to Home
          </Link>

          {/* Welcome Text */}
          <div style={{ marginBottom: '40px' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--slate-900)', marginBottom: '8px', letterSpacing: '-0.8px', marginTop: 0 }}>
              Welcome back
            </h1>
            <p style={{ color: 'var(--slate-500)', fontWeight: 600, fontSize: '1.05rem', margin: 0, lineHeight: 1.4 }}>
              Access your personalized care ecosystem.
            </p>
          </div>

          {/* Frosted Role Selection Tabs */}
          <div style={{ display: 'flex', padding: '6px', background: '#F1F5F9', borderRadius: '16px', marginBottom: '36px' }}>
            {[
              { id: 'patient', label: 'Parent', icon: Heart, activeColor: '#EF4444' },
              { id: 'doctor', label: 'Doctor', icon: Stethoscope, activeColor: '#10B981' },
              { id: 'admin', label: 'Admin', icon: Shield, activeColor: '#8B5CF6' }
            ].map(role => (
              <button 
                key={role.id} 
                type="button"
                onClick={() => setActiveTab(role.id)} 
                className="btn-pop" 
                style={{ 
                  flex: 1, 
                  padding: '12px 8px', 
                  borderRadius: '12px', 
                  background: activeTab === role.id ? 'white' : 'transparent', 
                  color: activeTab === role.id ? 'var(--slate-900)' : 'var(--slate-400)', 
                  fontWeight: 800, 
                  fontSize: '0.95rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '6px', 
                  boxShadow: activeTab === role.id ? '0 4px 12px rgba(0,0,0,0.04)' : 'none'
                }}
              >
                <role.icon size={16} color={activeTab === role.id ? role.activeColor : 'currentColor'} /> 
                <span>{role.label}</span>
              </button>
            ))}
          </div>

          {/* Interactive Form */}
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Input 1: Contact Identifier */}
            <div style={{ position: 'relative' }}>
              <label style={{ display: 'block', fontWeight: 800, color: 'var(--slate-800)', marginBottom: '8px', fontSize: '0.95rem' }}>
                {activeTab === 'patient' ? 'Phone Number' : 'Clinical Email'}
              </label>
              <div style={{ position: 'relative' }}>
                {activeTab === 'patient' 
                  ? <Phone size={18} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#6366F1', zIndex: 5 }} /> 
                  : <Mail size={18} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#10B981', zIndex: 5 }} />
                }
                <input 
                  type="text" 
                  className="login-input" 
                  placeholder={activeTab === 'patient' ? "+91 98XXX XXXX" : "name@hospital.com"} 
                  required 
                  style={{
                    width: '100%',
                    padding: '16px 16px 16px 52px',
                    borderRadius: '14px',
                    border: '1.5px solid #E2E8F0',
                    background: 'white',
                    fontWeight: 700,
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                />
              </div>
            </div>

            {/* Input 2: Password */}
            <div style={{ position: 'relative' }}>
              <label style={{ display: 'block', fontWeight: 800, color: 'var(--slate-800)', marginBottom: '8px', fontSize: '0.95rem' }}>
                Secure Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#EF4444', zIndex: 5 }} />
                <input 
                  type="password" 
                  className="login-input" 
                  placeholder="••••••••" 
                  required 
                  style={{
                    width: '100%',
                    padding: '16px 16px 16px 52px',
                    borderRadius: '14px',
                    border: '1.5px solid #E2E8F0',
                    background: 'white',
                    fontWeight: 700,
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                />
              </div>
            </div>

            {/* Remember & Forgot options */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--slate-500)', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}>
                  <input type="checkbox" style={{ width: '18px', height: '18px', accentColor: '#7C3AED' }} /> Remember me
               </label>
               <span style={{ color: '#7C3AED', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer' }} className="hover-underline">
                 Forgot?
               </span>
            </div>

            {/* Action Submit Button */}
            <button 
              type="submit" 
              className="btn-neon" 
              style={{ 
                background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
                padding: '16px', 
                fontSize: '1.1rem', 
                fontWeight: 900,
                borderRadius: '14px',
                marginTop: '10px',
                width: '100%',
                boxShadow: '0 10px 20px -5px rgba(124, 58, 237, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <span>CONTINUE TO DASHBOARD</span>
              <span style={{ fontSize: '1.25rem' }}>⮕</span>
            </button>
          </form>

          {/* Footer clinical registrar link */}
          <div style={{ marginTop: '40px', textAlign: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '28px' }}>
            <p style={{ fontWeight: 700, color: 'var(--slate-400)', fontSize: '0.95rem', margin: 0 }}>
              New to AURA? <span style={{ color: '#7C3AED', fontWeight: 800, cursor: 'pointer' }} className="hover-underline">Register via Clinic</span>
            </p>
          </div>

        </div>

      </div>

    </div>
  )
}

const styleTag = (
  <style>{`
    .btn-pop { transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); cursor: pointer; border: none; }
    .btn-pop:hover { transform: translateY(-2px) scale(1.02); }
    .btn-pop:active { transform: scale(0.96); }
    
    .login-input:focus {
      border-color: #7C3AED !important;
      background: white !important;
      box-shadow: 0 8px 20px rgba(124, 58, 237, 0.08) !important;
    }
    .hover-slate-600:hover {
      color: var(--slate-700) !important;
    }
    .hover-underline:hover {
      text-decoration: underline;
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(-1deg); }
      50% { transform: translateY(-8px) rotate(1deg); }
    }
    
    .frosted-showcase-card {
      animation: float 6s ease-in-out infinite;
    }
    
    @media (max-width: 960px) {
      .login-showcase-column {
        display: none !important;
      }
      .login-form-column {
        padding: 40px !important;
      }
    }
  `}</style>
);

export default LoginPage
