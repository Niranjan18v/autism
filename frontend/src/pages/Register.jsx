import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, User, ShieldPlus, Baby, Users, Heart, Clipboard, Phone, Building, ChevronRight, Star, AlertCircle } from 'lucide-react'

function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('patient');

  // Form fields
  const [childName, setChildName] = useState('');
  const [age, setAge] = useState('');
  const [clinic, setClinic] = useState('');
  const [parentName, setParentName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (step < 2) {
      setStep(step + 1)
      return
    }
    // Final step – register user
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          role === 'patient'
            ? {
                name: childName,
                email: email || `${parentName.replace(/\s+/g, '').toLowerCase()}@example.com`,
                password: 'password123', // temporary default password
                role: 'patient',
                childName,
                age,
                clinic,
                parentName,
                contact,
              }
            : {
                name: fullName,
                email: email || `${fullName.replace(/\s+/g, '').toLowerCase()}@example.com`,
                password: 'password123', // temporary default password
                role: 'doctor',
                fullName,
                specialization,
                clinic,
                contact,
              }
        )
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data));
        navigate(role === 'patient' ? '/dashboard/patient' : '/dashboard/doctor');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="playground-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px' }}>
      <div className="mesh-bg"></div>
      
      <style>{`
        .btn-pop { transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); cursor: pointer; border: none; }
        .btn-pop:hover { transform: translateY(-6px) scale(1.03); }
        .btn-pop:active { transform: scale(0.95); }
        
        .register-input {
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
        .register-input:focus {
          border-color: var(--p-300);
          background: white;
          box-shadow: 0 15px 30px rgba(139, 92, 246, 0.1);
        }
        
        .step-pill { height: 12px; flex: 1; border-radius: 100px; background: var(--slate-100); transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
        .step-pill.active { background: var(--p-500); }
      `}</style>

      <div className="bento-card animate-slide-up" style={{ width: '100%', maxWidth: '800px', padding: '80px', background: 'white' }}>
        <Link to="/dashboard/admin" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--slate-400)', fontWeight: 800, textDecoration: 'none', marginBottom: '56px', fontSize: '1.1rem' }} className="btn-pop">
          <ArrowLeft size={20} /> Back to Command Center
        </Link>

        <div style={{ marginBottom: '64px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
             <div style={{ background: 'var(--s-100)', padding: '12px', borderRadius: '15px' }}><Star fill="var(--s-500)" color="var(--s-500)" size={24} /></div>
             <span style={{ color: 'var(--s-500)', fontWeight: 800, fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '2px' }}>New Hero Enrollment</span>
          </div>
           <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '12px', letterSpacing: '-2px' }}>{`Register ${role.charAt(0).toUpperCase()+role.slice(1)}`}</h1>
           <p style={{ color: 'var(--slate-600)', fontWeight: 600, fontSize: '1.4rem' }}>Initialize the clinical journey.</p>
           <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
               <button type="button" className={`btn-neon ${role==='patient' ? 'active' : ''}`} onClick={() => setRole('patient')}>Patient</button>
               <button type="button" className={`btn-neon ${role==='doctor' ? 'active' : ''}`} onClick={() => setRole('doctor')}>Doctor</button>
           </div>
        </div>

        {role === 'patient' && (
          <>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '64px' }}>
              <div className={`step-pill ${step >= 1 ? 'active' : ''}`}></div>
              <div className={`step-pill ${step >= 2 ? 'active' : ''}`}></div>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
              {step === 1 ? (
                <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
                    <div style={{ position: 'relative' }}>
                      <label style={{ display: 'block', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '12px', fontSize: '1.1rem' }}>Child's Full Name</label>
                      <div style={{ position: 'relative' }}>
                        <User style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', color: 'var(--p-500)' }} />
                        <input type="text" className="register-input" placeholder="Arjun Kumar" value={childName} onChange={(e) => setChildName(e.target.value)} required />
                      </div>
                    </div>
                    <div style={{ position: 'relative' }}>
                      <label style={{ display: 'block', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '12px', fontSize: '1.1rem' }}>Age</label>
                      <div style={{ position: 'relative' }}>
                        <Baby style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', color: 'var(--p-500)' }} />
                        <input type="number" className="register-input" placeholder="6" value={age} onChange={(e) => setAge(e.target.value)} required />
                      </div>
                    </div>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <label style={{ display: 'block', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '12px', fontSize: '1.1rem' }}>Primary Clinic / Hospital</label>
                    <div style={{ position: 'relative' }}>
                      <Building style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', color: 'var(--p-500)', pointerEvents: 'none' }} />
                      <select className="register-input" required style={{ appearance: 'none', cursor: 'pointer' }} value={clinic} onChange={(e) => setClinic(e.target.value)}>
                        <option value="">Select an institution...</option>
                        <option>Chennai South Autism Care</option>
                        <option>Madurai Rural Outreach</option>
                        <option>Apollo Child Development</option>
                      </select>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  <div style={{ position: 'relative' }}>
                    <label style={{ display: 'block', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '12px', fontSize: '1.1rem' }}>Parent / Guardian Name</label>
                    <div style={{ position: 'relative' }}>
                      <Users style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', color: 'var(--p-500)' }} />
                      <input type="text" className="register-input" placeholder="Mr./Mrs. Kumar" value={parentName} onChange={(e) => setParentName(e.target.value)} required />
                    </div>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <label style={{ display: 'block', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '12px', fontSize: '1.1rem' }}>Primary Contact (Emergency)</label>
                    <div style={{ position: 'relative' }}>
                      <Phone style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', color: 'var(--p-500)' }} />
                      <input type="tel" className="register-input" placeholder="+91 98XXX XXXX" value={contact} onChange={(e) => setContact(e.target.value)} required />
                    </div>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <label style={{ display: 'block', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '12px', fontSize: '1.1rem' }}>Caregiver Email (Optional)</label>
                    <div style={{ position: 'relative' }}>
                      <Heart style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', color: 'var(--p-500)' }} />
                      <input type="email" className="register-input" placeholder="parent@care.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                  </div>
                </div>
              )}
              <button type="submit" className="btn-neon" style={{ padding: '24px', fontSize: '1.5rem', marginTop: '16px' }} disabled={loading}>
                {loading ? <>⏳ Registering...</> : step === 1 ? 'PROCEED TO CAREGIVER DETAILS' : 'FINALIZE HERO ENROLLMENT'}
              </button>
              {error && (
                <div style={{ marginTop: '12px', color: '#DC2626', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertCircle size={16} /> {error}
                </div>
              )}
            </form>
          </>
        )}
        {role === 'doctor' && (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            <div style={{ position: 'relative' }}>
              <label style={{ display: 'block', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '12px', fontSize: '1.1rem' }}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <User style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', color: 'var(--p-500)' }} />
                <input type="text" className="register-input" placeholder="Dr. Priya Sharma" value={fullName} onChange={e => setFullName(e.target.value)} required />
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <label style={{ display: 'block', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '12px', fontSize: '1.1rem' }}>Specialization</label>
              <div style={{ position: 'relative' }}>
                <ShieldPlus style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', color: 'var(--p-500)' }} />
                <input type="text" className="register-input" placeholder="Child Neurodevelopment" value={specialization} onChange={e => setSpecialization(e.target.value)} required />
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <label style={{ display: 'block', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '12px', fontSize: '1.1rem' }}>Primary Clinic / Hospital</label>
              <div style={{ position: 'relative' }}>
                <Building style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', color: 'var(--p-500)', pointerEvents: 'none' }} />
                <select className="register-input" required style={{ appearance: 'none', cursor: 'pointer' }} value={clinic} onChange={e => setClinic(e.target.value)}>
                  <option value="">Select an institution...</option>
                  <option>Chennai South Autism Care</option>
                  <option>Madurai Rural Outreach</option>
                  <option>Apollo Child Development</option>
                </select>
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <label style={{ display: 'block', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '12px', fontSize: '1.1rem' }}>Contact Number</label>
              <div style={{ position: 'relative' }}>
                <Phone style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', color: 'var(--p-500)' }} />
                <input type="tel" className="register-input" placeholder="+91 98XXX XXXX" value={contact} onChange={e => setContact(e.target.value)} required />
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <label style={{ display: 'block', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '12px', fontSize: '1.1rem' }}>Email (Optional)</label>
              <div style={{ position: 'relative' }}>
                <Heart style={{ position: 'absolute', left: '24px', top: '50%', color: 'var(--p-500)' }} />
                <input type="email" className="register-input" placeholder="doctor@clinic.com" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
            </div>
            <button type="submit" className="btn-neon" style={{ padding: '24px', fontSize: '1.5rem', marginTop: '16px' }} disabled={loading}>
              {loading ? <>⏳ Registering...</> : 'REGISTER DOCTOR'}
            </button>
            {error && (
              <div style={{ marginTop: '12px', color: '#DC2626', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertCircle size={16} /> {error}
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  )
}

export default Register
