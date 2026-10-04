import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, User, Baby, Users, Heart, Phone, Building, Star, AlertCircle, Lock, Mail, ChevronRight, Sparkles, Shield } from 'lucide-react'
import API_BASE from '../api'

function PatientRegister() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)

  // Step 1: Child info
  const [childName, setChildName] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [clinic, setClinic] = useState('')

  // Step 2: Parent/guardian info & doctor choice
  const [parentName, setParentName] = useState('')
  const [contact, setContact] = useState('')
  const [relationship, setRelationship] = useState('')
  const [assignedDoctor, setAssignedDoctor] = useState('')

  // Step 3: Account credentials
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [doctorsList, setDoctorsList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  React.useEffect(() => {
    // Fetch available doctors based on selected clinic
    const url = clinic ? `${API_BASE}/api/doctor/list?clinic=${encodeURIComponent(clinic)}` : `${API_BASE}/api/doctor/list`
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setDoctorsList(data)
        }
      })
      .catch(err => console.error('Could not fetch doctors:', err))
  }, [clinic])

  const totalSteps = 3
  const stepLabels = ['Child Profile', 'Guardian & Doctor', 'Secure Account']

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
          name: childName,
          email,
          password,
          role: 'patient',
          childName,
          age,
          gender,
          clinic,
          parentName,
          relationship,
          contact,
          assignedDoctor: assignedDoctor || undefined,
        })
      })
      const data = await response.json()
      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data))
        navigate('/dashboard/patient')
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
    color: 'var(--p-400)',
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
        .pr-input:focus {
          border-color: var(--p-400) !important;
          background: white !important;
          box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.1) !important;
        }
        .pr-input::placeholder { color: var(--slate-400); font-weight: 500; }

        .step-dot {
          width: 40px; height: 40px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-weight: 800; font-size: 0.85rem;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border: 2px solid var(--slate-200);
          color: var(--slate-400); background: white;
        }
        .step-dot.active {
          background: var(--p-500); color: white;
          border-color: var(--p-500);
          box-shadow: 0 4px 16px rgba(139, 92, 246, 0.4);
        }
        .step-dot.done {
          background: var(--s-500); color: white;
          border-color: var(--s-500);
        }
        .step-connector {
          flex: 1; height: 3px; background: var(--slate-200);
          border-radius: 100px; transition: all 0.4s;
        }
        .step-connector.active { background: var(--p-500); }
        .step-connector.done { background: var(--s-500); }

        .pr-card {
          animation: prSlideUp 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        @keyframes prSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .gender-chip {
          padding: 12px 24px; border-radius: 100px;
          border: 2px solid var(--slate-200); background: white;
          font-weight: 700; cursor: pointer; transition: all 0.3s;
          color: var(--slate-600); font-size: 0.9rem;
        }
        .gender-chip:hover { border-color: var(--p-300); }
        .gender-chip.selected {
          background: var(--p-100); border-color: var(--p-500);
          color: var(--p-600);
        }

        @media (max-width: 900px) {
          .pr-layout { flex-direction: column !important; }
          .pr-sidebar { display: none !important; }
          .pr-main { padding: 32px 20px !important; }
        }
      `}</style>

      {/* Left sidebar illustration panel */}
      <div className="pr-sidebar" style={{
        width: '420px', minHeight: '100vh', background: 'linear-gradient(180deg, #7C3AED 0%, #5B21B6 100%)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        padding: '60px 40px', position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }}></div>
        <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}></div>
        <div style={{ position: 'absolute', top: '30%', left: '-20px', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }}></div>

        <div style={{ textAlign: 'center', zIndex: 2 }}>
          <div style={{ width: '100px', height: '100px', borderRadius: '28px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px', backdropFilter: 'blur(10px)' }}>
            <Baby size={48} color="white" />
          </div>
          <h2 style={{ color: 'white', fontSize: '1.8rem', fontWeight: 800, marginBottom: '16px', lineHeight: 1.3 }}>Begin Your Child's Journey</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1rem', lineHeight: 1.7, fontWeight: 500 }}>
            Create a personalized care profile to track milestones, connect with specialists, and unlock tailored activities.
          </p>

          <div style={{ marginTop: '48px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { icon: <Shield size={18} />, text: 'HIPAA-compliant data security' },
              { icon: <Sparkles size={18} />, text: 'AI-powered milestone tracking' },
              { icon: <Heart size={18} />, text: 'Personalized care plans' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', color: 'rgba(255,255,255,0.85)', fontWeight: 600, fontSize: '0.9rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.icon}</div>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main form area */}
      <div className="pr-main pr-layout" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 80px', maxWidth: '800px' }}>

        <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--slate-400)', fontWeight: 700, textDecoration: 'none', marginBottom: '40px', fontSize: '0.9rem' }}>
          <ArrowLeft size={16} /> Back to Login
        </Link>

        {/* Step indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginBottom: '48px' }}>
          {stepLabels.map((label, i) => (
            <React.Fragment key={i}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div className={`step-dot ${step > i + 1 ? 'done' : step === i + 1 ? 'active' : ''}`}>
                  {step > i + 1 ? '✓' : i + 1}
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: step >= i + 1 ? 'var(--p-600)' : 'var(--slate-400)', whiteSpace: 'nowrap' }}>{label}</span>
              </div>
              {i < stepLabels.length - 1 && (
                <div className={`step-connector ${step > i + 1 ? 'done' : step > i ? 'active' : ''}`} style={{ margin: '0 12px', marginBottom: '24px' }}></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step 1: Child Profile */}
        {step === 1 && (
          <form onSubmit={handleNext} className="pr-card" key="step1">
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '8px' }}>Child's Profile</h2>
            <p style={{ color: 'var(--slate-500)', fontWeight: 500, marginBottom: '36px', fontSize: '0.95rem' }}>Tell us about the little hero we'll be supporting.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={labelStyle}>Child's Full Name</label>
                  <div style={{ position: 'relative' }}>
                    <User size={18} style={iconStyle} />
                    <input type="text" className="pr-input" style={inputStyle} placeholder="e.g. Arjun Kumar" value={childName} onChange={e => setChildName(e.target.value)} required />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Age (years)</label>
                  <div style={{ position: 'relative' }}>
                    <Baby size={18} style={iconStyle} />
                    <input type="number" className="pr-input" style={inputStyle} placeholder="e.g. 5" min="1" max="18" value={age} onChange={e => setAge(e.target.value)} required />
                  </div>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Gender</label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {['Male', 'Female', 'Other'].map(g => (
                    <button type="button" key={g} className={`gender-chip ${gender === g ? 'selected' : ''}`} onClick={() => setGender(g)}>{g}</button>
                  ))}
                </div>
              </div>

              <div>
                <label style={labelStyle}>Primary Clinic / Hospital</label>
                <div style={{ position: 'relative' }}>
                  <Building size={18} style={iconStyle} />
                  <select className="pr-input" style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }} value={clinic} onChange={e => setClinic(e.target.value)} required>
                    <option value="">Select an institution...</option>
                    <option>Chennai South Autism Care</option>
                    <option>Madurai Rural Outreach</option>
                    <option>Apollo Child Development</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
            </div>

            <button type="submit" className="btn-neon" style={{ width: '100%', padding: '18px', fontSize: '1rem', marginTop: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              Continue <ChevronRight size={18} />
            </button>
          </form>
        )}

        {/* Step 2: Guardian Details */}
        {step === 2 && (
          <form onSubmit={handleNext} className="pr-card" key="step2">
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '8px' }}>Guardian Details</h2>
            <p style={{ color: 'var(--slate-500)', fontWeight: 500, marginBottom: '36px', fontSize: '0.95rem' }}>Information about the primary caregiver.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={labelStyle}>Parent / Guardian Name</label>
                  <div style={{ position: 'relative' }}>
                    <Users size={18} style={iconStyle} />
                    <input type="text" className="pr-input" style={inputStyle} placeholder="Mr. / Mrs. Kumar" value={parentName} onChange={e => setParentName(e.target.value)} required />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Relationship</label>
                  <div style={{ position: 'relative' }}>
                    <Heart size={18} style={iconStyle} />
                    <select className="pr-input" style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }} value={relationship} onChange={e => setRelationship(e.target.value)} required>
                      <option value="">Select...</option>
                      <option>Mother</option>
                      <option>Father</option>
                      <option>Guardian</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Contact Number</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={18} style={iconStyle} />
                  <input type="tel" className="pr-input" style={inputStyle} placeholder="+91 98XXX XXXXX" value={contact} onChange={e => setContact(e.target.value)} required />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Select Preferred Doctor (Optional)</label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={iconStyle} />
                  <select className="pr-input" style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }} value={assignedDoctor} onChange={e => setAssignedDoctor(e.target.value)}>
                    <option value="">Choose a doctor...</option>
                    {doctorsList.map(doc => (
                      <option key={doc._id} value={doc._id}>
                        {doc.fullName} ({doc.specialization} - {doc.clinic})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', marginTop: '36px' }}>
              <button type="button" onClick={handleBack} style={{ flex: '0 0 auto', padding: '18px 28px', borderRadius: '16px', border: '2px solid var(--slate-200)', background: 'white', fontWeight: 700, cursor: 'pointer', color: 'var(--slate-600)', transition: 'all 0.3s' }}>
                <ArrowLeft size={18} />
              </button>
              <button type="submit" className="btn-neon" style={{ flex: 1, padding: '18px', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                Continue <ChevronRight size={18} />
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Account Credentials */}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="pr-card" key="step3">
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '8px' }}>Create Account</h2>
            <p style={{ color: 'var(--slate-500)', fontWeight: 500, marginBottom: '36px', fontSize: '0.95rem' }}>Set up your login credentials to access the dashboard.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <label style={labelStyle}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={iconStyle} />
                  <input type="email" className="pr-input" style={inputStyle} placeholder="parent@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={labelStyle}>Password</label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={18} style={iconStyle} />
                    <input type="password" className="pr-input" style={inputStyle} placeholder="Min 6 characters" value={password} onChange={e => setPassword(e.target.value)} required />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Confirm Password</label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={18} style={iconStyle} />
                    <input type="password" className="pr-input" style={inputStyle} placeholder="Re-enter password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
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
              <button type="submit" className="btn-neon" style={{ flex: 1, padding: '18px', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} disabled={loading}>
                {loading ? '⏳ Creating Account...' : <>Create Account <Sparkles size={18} /></>}
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
            Are you a doctor? <Link to="/register/doctor" style={{ color: 'var(--p-600)', fontWeight: 800, textDecoration: 'none' }}>Register as Doctor →</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default PatientRegister
