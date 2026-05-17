import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  FileText, ArrowLeft, Printer, Share2, ShieldCheck, 
  Calendar, User, Activity, Award, CheckCircle2, 
  Download, Mail, Sparkles, Heart
} from 'lucide-react'

function ClinicalReport() {
  const navigate = useNavigate()
  const childLevel = localStorage.getItem('childLevel') || 1
  const reportDate = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  const reportId = Math.floor(Math.random() * 90000) + 10000

  const levelData = {
    1: { label: "Level 1: Mild Support", color: "#10B981", desc: "Patient shows strengths in basic communication but requires guidance in complex social nuances." },
    2: { label: "Level 2: Moderate Support", color: "#8B5CF6", desc: "Patient requires substantial support for social communication and restricted, repetitive behaviors." },
    3: { label: "Level 3: Significant Support", color: "#EF4444", desc: "Patient requires very substantial support for all daily communication and social interactions." }
  }

  const currentLevel = levelData[childLevel]

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="playground-container" style={{ minHeight: '100vh', background: '#F8FAFC', padding: '40px' }}>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .playground-container { padding: 0 !important; background: white !important; }
          .bento-card { border: none !important; box-shadow: none !important; background: white !important; }
          body { background: white !important; }
        }
        .report-label { font-size: 0.85rem; font-weight: 800; color: #94A3B8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
        .report-value { font-size: 1.1rem; font-weight: 700; color: #1E293B; }
      `}</style>

      {/* Navigation Header */}
      <div className="no-print" style={{ maxWidth: '1000px', margin: '0 auto 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'white', border: 'none', padding: '12px 24px', borderRadius: '15px', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
          <ArrowLeft size={20} /> Back to Dashboard
        </button>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button onClick={handlePrint} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--slate-900)', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '15px', fontWeight: 800, cursor: 'pointer' }}>
            <Printer size={20} /> Print Official Report
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--p-500)', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '15px', fontWeight: 800, cursor: 'pointer' }}>
            <Share2 size={20} /> Share with Doctor
          </button>
        </div>
      </div>

      {/* Main Report Document */}
      <div className="bento-card" style={{ maxWidth: '1000px', margin: '0 auto', background: 'white', padding: '80px', position: 'relative', minHeight: '1200px' }}>
        
        {/* Document Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #F1F5F9', paddingBottom: '40px', marginBottom: '60px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ background: 'var(--p-500)', padding: '8px', borderRadius: '10px' }}><Heart size={24} color="white" fill="white" /></div>
              <h1 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--slate-900)', letterSpacing: '-1px', margin: 0 }}>Autishta Care</h1>
            </div>
            <p style={{ color: '#64748B', fontWeight: 600 }}>Neuro-Clinical Digital Therapeutics Platform</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '4px' }}>Clinical Progress Report</h2>
            <p style={{ color: '#64748B', fontWeight: 700 }}>REPORT ID: #ATH-{reportId}</p>
          </div>
        </div>

        {/* Patient Info Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', marginBottom: '60px', background: '#F8FAFC', padding: '32px', borderRadius: '25px' }}>
          <div>
            <p className="report-label">Patient Name</p>
            <p className="report-value">Arjun Ramakrishnan</p>
          </div>
          <div>
            <p className="report-label">Age</p>
            <p className="report-value">6 Years Old</p>
          </div>
          <div>
            <p className="report-label">Assessment Date</p>
            <p className="report-value">{reportDate}</p>
          </div>
          <div>
            <p className="report-label">Primary Caregiver</p>
            <p className="report-value">Rahul Ramakrishnan</p>
          </div>
          <div>
            <p className="report-label">Assessing System</p>
            <p className="report-value">Autishta Clinical AI v4.2</p>
          </div>
          <div>
            <p className="report-label">Status</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10B981', fontWeight: 800 }}><CheckCircle2 size={16} /> Verified</div>
          </div>
        </div>

        {/* Diagnosis / Level Section */}
        <section style={{ marginBottom: '60px' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Award size={24} color="var(--p-500)" /> Clinical Support Mapping
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '40px', alignItems: 'center' }}>
            <div style={{ background: currentLevel.color, color: 'white', padding: '40px', borderRadius: '30px', textAlign: 'center' }}>
              <p style={{ fontSize: '0.9rem', fontWeight: 800, opacity: 0.9, marginBottom: '8px' }}>MAPPED LEVEL</p>
              <h4 style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0 }}>{childLevel}</h4>
              <p style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '10px' }}>SUPPORT GRADE</p>
            </div>
            <div>
              <h5 style={{ fontSize: '1.4rem', fontWeight: 800, color: currentLevel.color, marginBottom: '12px' }}>{currentLevel.label}</h5>
              <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.6, fontWeight: 500 }}>{currentLevel.desc}</p>
            </div>
          </div>
        </section>

        {/* Metric Breakdown */}
        <section style={{ marginBottom: '60px' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Activity size={24} color="var(--p-500)" /> Therapeutic Performance Index
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              { label: 'Social Communication', score: 82, color: '#8B5CF6' },
              { label: 'Emotional Regulation', score: 64, color: '#10B981' },
              { label: 'Sensory Processing', score: 75, color: '#F472B6' },
              { label: 'Vocabulary Growth', score: 90, color: '#38BDF8' }
            ].map((metric, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontWeight: 800, fontSize: '1rem' }}>
                  <span>{metric.label}</span>
                  <span>{metric.score}% Proficiency</span>
                </div>
                <div style={{ height: '12px', background: '#F1F5F9', borderRadius: '6px', overflow: 'hidden' }}>
                  <div style={{ width: `${metric.score}%`, height: '100%', background: metric.color, borderRadius: '6px' }}></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Clinical Summary */}
        <section style={{ marginBottom: '60px' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={24} color="var(--p-500)" /> AI Practitioner's Observation
          </h3>
          <div style={{ padding: '32px', background: '#F8FAFC', borderRadius: '25px', borderLeft: '8px solid var(--p-500)' }}>
            <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.8, fontWeight: 500, margin: 0, fontStyle: 'italic' }}>
              "Patient demonstrates high engagement in visual-sensory activities (Puzzle Mastery). Social communication is improving, particularly in 'Emotion Matching' levels. Recommendation: Increase frequency of 'Word Lab' to bridge communication gaps. Continue Level {childLevel} support protocols for another 30 days."
            </p>
          </div>
        </section>

        {/* Verification Footer */}
        <div style={{ marginTop: 'auto', borderTop: '2px solid #F1F5F9', paddingTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
             <div style={{ width: '150px', height: '60px', borderBottom: '2px solid #CBD5E1', marginBottom: '8px' }}></div>
             <p style={{ margin: 0, fontWeight: 800, color: '#1E293B' }}>Dr. Priya Raman</p>
             <p style={{ margin: 0, fontWeight: 700, color: '#64748B', fontSize: '0.9rem' }}>Digital Clinical Supervisor</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--p-500)', fontWeight: 900, marginBottom: '8px' }}>
              <ShieldCheck size={24} /> SECURE REPORT
            </div>
            <p style={{ margin: 0, color: '#94A3B8', fontSize: '0.8rem', fontWeight: 700 }}>VERIFIED BY BLOCKCHAIN HASH: 8f2b...3a1c</p>
          </div>
        </div>

        {/* Report Watermark */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(-45deg)', fontSize: '10rem', fontWeight: 900, color: 'rgba(139, 92, 246, 0.03)', pointerEvents: 'none', whiteSpace: 'nowrap' }}>
          OFFICIAL CLINICAL
        </div>
      </div>
    </div>
  )
}

export default ClinicalReport
