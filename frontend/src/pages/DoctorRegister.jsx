import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, User, Stethoscope, Phone, Building, AlertCircle, Lock, Mail, ChevronRight, Sparkles, Shield, Award, BookOpen } from 'lucide-react'
import API_BASE from '../api'

function DoctorRegister() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)

  // Step 1: Professional info
  const [fullName, setFullName] = useState('')
  const [specialization, setSpecialization] = useState('')
  const [qualification, setQualification] = useState('')
  const [experience, setExperience] = useState('')

  // Step 2: Practice details
  const [clinic, setClinic] = useState('')
  const [contact, setContact] = useState('')
  const [licenseNumber, setLicenseNumber] = useState('')

  // Step 3: Account credentials
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const totalSteps = 3
  const stepLabels = ['Professional Info', 'Practice Details', 'Secure Account']

  const handleNext = (e) => {
    e.preventDefault()
    setError('')
    setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    setLoading(true)
    setError('')
    try {
      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName,
          email,
          password,
          role: 'doctor',
          fullName,
          specialization,
          qualification,
          experience,
          clinic,
          contact,
          licenseNumber,
        })
      })
      const data = await response.json()
      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data))
        navigate('/dashboard/doctor')
      } else {
        setError(data.message || 'Registration failed')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '18px 18px 18px 56px',
    borderRadius: '16px',
    border: '2px solid var(--slate-200)',
    background: 'var(--slate-50)',
    fontWeight: 600,
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    outline: 'none',
    color: 'var(--slate-900)',
  }

  const iconStyle = {
    position: 'absolute',
    left: '18px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#0D9488',
    pointerEvents: 'none',
  }

  const labelStyle = {
    display: 'block',
    fontWeight: 700,
    color: 'var(--slate-800)',
    marginBottom: '10px',
    fontSize: '0.95rem',
    letterSpacing: '0.3px',
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--slate-50)' }}>
      <div className="mesh-bg"></div>

      <style>{`
        .dr-input:focus {
          border-color: #0D9488 !important;
          background: white !important;
          box-shadow: 0 0 0 4px rgba(13, 148, 136, 0.1) !important;
        }
        .dr-input::placeholder { color: var(--slate-400); font-weight: 500; }

        .dr-step-dot {
          width: 40px; height: 40px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-weight: 800; font-size: 0.85rem;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border: 2px solid var(--slate-200);
          color: var(--slate-400); background: white;
        }
        .dr-step-dot.active {
          background: #0D9488; color: white;
          border-color: #0D9488;
          box-shadow: 0 4px 16px rgba(13, 148, 136, 0.4);
        }
        .dr-step-dot.done {
          background: var(--p-500); color: white;
          border-color: var(--p-500);
        }
        .dr-connector {
          flex: 1; height: 3px; background: var(--slate-200);
          border-radius: 100px; transition: all 0.4s;
        }
        .dr-connector.active { background: #0D9488; }
        .dr-connector.done { background: var(--p-500); }

        .dr-card {
          animation: drSlideUp 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        @keyframes drSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .dr-btn-primary {
          background: linear-gradient(135deg, #0D9488 0%, #0F766E 100%);
          color: white; padding: 14px 28px; border-radius: 16px;
          font-weight: 700; border: none; cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 10px 20px -5px rgba(13, 148, 136, 0.4);
        }
        .dr-btn-primary:hover {
          box-shadow: 0 15px 30px -5px rgba(13, 148, 136, 0.6);
          transform: translateY(-1px);
        }
        .dr-btn-primary:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }

        .spec-chip {
          padding: 10px 20px; border-radius: 100px;
          border: 2px solid var(--slate-200); background: white;
          font-weight: 600; cursor: pointer; transition: all 0.3s;
          color: var(--slate-600); font-size: 0.85rem;
        }
        .spec-chip:hover { border-color: #99F6E4; }
        .spec-chip.selected {
          background: #F0FDFA; border-color: #0D9488; color: #0D9488;
        }

        @media (max-width: 900px) {
          .dr-sidebar { display: none !important; }
          .dr-main { padding: 32px 20px !important; }
        }
      `}</style>

      {/* Left sidebar */}
      <div className="dr-sidebar" style={{
        width: '420px', minHeight: '100vh',
        background: 'linear-gradient(180deg, #0F766E 0%, #134E4A 100%)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        padding: '60px 40px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }}></div>
        <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }}></div>
        <div style={{ position: 'absolute', top: '40%', right: '10%', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}></div>

        <div style={{ textAlign: 'center', zIndex: 2 }}>
          <div style={{ width: '100px', height: '100px', borderRadius: '28px', background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px', backdropFilter: 'blur(10px)' }}>
            <Stethoscope size={48} color="white" />
          </div>
          <h2 style={{ color: 'white', fontSize: '1.8rem', fontWeight: 800, marginBottom: '16px', lineHeight: 1.3 }}>Join Our Clinical Network</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: 1.7, fontWeight: 500 }}>
            Connect with families, access AI-driven assessments, and manage your patient caseload from one unified platform.
          </p>

          <div style={{ marginTop: '48px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { icon: <Award size={18} />, text: 'Verified clinical credentials' },
              { icon: <BookOpen size={18} />, text: 'AI assessment reports' },
              { icon: <Stethoscope size={18} />, text: 'Full patient management' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', color: 'rgba(255,255,255,0.8)', fontWeight: 600, fontSize: '0.9rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.icon}</div>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main form */}
      <div className="dr-main" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 80px', maxWidth: '800px' }}>

        <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--slate-400)', fontWeight: 700, textDecoration: 'none', marginBottom: '40px', fontSize: '0.9rem' }}>
          <ArrowLeft size={16} /> Back to Login
        </Link>

        {/* Step indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginBottom: '48px' }}>
          {stepLabels.map((label, i) => (
            <React.Fragment key={i}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div className={`dr-step-dot ${step > i + 1 ? 'done' : step === i + 1 ? 'active' : ''}`}>
                  {step > i + 1 ? '✓' : i + 1}
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: step >= i + 1 ? '#0D9488' : 'var(--slate-400)', whiteSpace: 'nowrap' }}>{label}</span>
              </div>
              {i < stepLabels.length - 1 && (
                <div className={`dr-connector ${step > i + 1 ? 'done' : step > i ? 'active' : ''}`} style={{ margin: '0 12px', marginBottom: '24px' }}></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step 1: Professional Info */}
        {step === 1 && (
          <form onSubmit={handleNext} className="dr-card" key="step1">
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '8px' }}>Professional Information</h2>
            <p style={{ color: 'var(--slate-500)', fontWeight: 500, marginBottom: '36px', fontSize: '0.95rem' }}>Your qualifications and area of expertise.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <label style={labelStyle}>Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={iconStyle} />
                  <input type="text" className="dr-input" style={inputStyle} placeholder="Dr. Priya Sharma" value={fullName} onChange={e => setFullName(e.target.value)} required />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Specialization</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {['Pediatric Neurology', 'Child Psychology', 'Speech Therapy', 'Occupational Therapy', 'Behavioral Therapy', 'Other'].map(s => (
                    <button type="button" key={s} className={`spec-chip ${specialization === s ? 'selected' : ''}`} onClick={() => setSpecialization(s)}>{s}</button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={labelStyle}>Qualification</label>
                  <div style={{ position: 'relative' }}>
                    <Award size={18} style={iconStyle} />
                    <input type="text" className="dr-input" style={inputStyle} placeholder="MBBS, MD" value={qualification} onChange={e => setQualification(e.target.value)} required />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Years of Experience</label>
                  <div style={{ position: 'relative' }}>
                    <BookOpen size={18} style={iconStyle} />
                    <input type="number" className="dr-input" style={inputStyle} placeholder="e.g. 8" min="0" value={experience} onChange={e => setExperience(e.target.value)} required />
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" className="dr-btn-primary" style={{ width: '100%', padding: '18px', fontSize: '1rem', marginTop: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              Continue <ChevronRight size={18} />
            </button>
          </form>
        )}

        {/* Step 2: Practice Details */}
        {step === 2 && (
          <form onSubmit={handleNext} className="dr-card" key="step2">
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '8px' }}>Practice Details</h2>
            <p style={{ color: 'var(--slate-500)', fontWeight: 500, marginBottom: '36px', fontSize: '0.95rem' }}>Where you practice and how patients can reach you.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <label style={labelStyle}>Primary Clinic / Hospital</label>
                <div style={{ position: 'relative' }}>
                  <Building size={18} style={iconStyle} />
                  <select className="dr-input" style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }} value={clinic} onChange={e => setClinic(e.target.value)} required>
                    <option value="">Select an institution...</option>
                    <option>Chennai South Autism Care</option>
                    <option>Madurai Rural Outreach</option>
                    <option>Apollo Child Development</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={labelStyle}>Contact Number</label>
                  <div style={{ position: 'relative' }}>
                    <Phone size={18} style={iconStyle} />
                    <input type="tel" className="dr-input" style={inputStyle} placeholder="+91 98XXX XXXXX" value={contact} onChange={e => setContact(e.target.value)} required />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Medical License No.</label>
                  <div style={{ position: 'relative' }}>
                    <Shield size={18} style={iconStyle} />
                    <input type="text" className="dr-input" style={inputStyle} placeholder="MCI-XXXXX" value={licenseNumber} onChange={e => setLicenseNumber(e.target.value)} required />
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', marginTop: '36px' }}>
              <button type="button" onClick={handleBack} style={{ flex: '0 0 auto', padding: '18px 28px', borderRadius: '16px', border: '2px solid var(--slate-200)', background: 'white', fontWeight: 700, cursor: 'pointer', color: 'var(--slate-600)', transition: 'all 0.3s' }}>
                <ArrowLeft size={18} />
              </button>
              <button type="submit" className="dr-btn-primary" style={{ flex: 1, padding: '18px', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                Continue <ChevronRight size={18} />
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Account Credentials */}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="dr-card" key="step3">
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '8px' }}>Create Account</h2>
            <p style={{ color: 'var(--slate-500)', fontWeight: 500, marginBottom: '36px', fontSize: '0.95rem' }}>Set up your login credentials to access the clinical portal.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <label style={labelStyle}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={iconStyle} />
                  <input type="email" className="dr-input" style={inputStyle} placeholder="doctor@hospital.com" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={labelStyle}>Password</label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={18} style={iconStyle} />
                    <input type="password" className="dr-input" style={inputStyle} placeholder="Min 6 characters" value={password} onChange={e => setPassword(e.target.value)} required />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Confirm Password</label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={18} style={iconStyle} />
                    <input type="password" className="dr-input" style={inputStyle} placeholder="Re-enter password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div style={{ marginTop: '16px', padding: '14px 18px', borderRadius: '12px', background: '#FEF2F2', color: '#DC2626', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}>
                <AlertCircle size={16} /> {error}
              </div>
            )}

            <div style={{ display: 'flex', gap: '16px', marginTop: '36px' }}>
              <button type="button" onClick={handleBack} style={{ flex: '0 0 auto', padding: '18px 28px', borderRadius: '16px', border: '2px solid var(--slate-200)', background: 'white', fontWeight: 700, cursor: 'pointer', color: 'var(--slate-600)', transition: 'all 0.3s' }}>
                <ArrowLeft size={18} />
              </button>
              <button type="submit" className="dr-btn-primary" style={{ flex: 1, padding: '18px', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} disabled={loading}>
                {loading ? '⏳ Creating Account...' : <>Create Doctor Account <Sparkles size={18} /></>}
              </button>
            </div>

            <p style={{ marginTop: '24px', textAlign: 'center', color: 'var(--slate-400)', fontSize: '0.8rem', fontWeight: 500 }}>
              By registering you agree to our Terms of Service and Privacy Policy.
            </p>
          </form>
        )}

        {/* Footer link */}
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <p style={{ color: 'var(--slate-400)', fontWeight: 600, fontSize: '0.9rem' }}>
            Are you a parent? <Link to="/register/patient" style={{ color: 'var(--p-600)', fontWeight: 800, textDecoration: 'none' }}>Register as Patient →</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default DoctorRegister
