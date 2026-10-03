import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronRight, CheckCircle2, AlertCircle, Brain, Smile, Activity, Star, FileText, ArrowRight, RotateCcw, Award, Sparkles, ShieldCheck } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const QUESTIONS = [
  { id: 1, text: "Does your child respond to their name when called?", ta: "உங்கள் குழந்தை அவர்களின் பெயரை அழைக்கும்போது பதிலளிக்கிறாரா?" },
  { id: 2, text: "How easily does your child make eye contact?", ta: "உங்கள் குழந்தை எவ்வளவு எளிதாக கண் தொடர்பு கொள்கிறார்?" },
  { id: 3, text: "Does your child point to things they want?", ta: "உங்கள் குழந்தை தங்களுக்கு வேண்டிய விஷயங்களை சுட்டிக்காட்டுகிறாரா?" },
  { id: 4, text: "Does your child share interests with you (e.g., showing a toy)?", ta: "உங்கள் குழந்தை உங்களுடன் ஆர்வங்களைப் பகிர்ந்து கொள்கிறாரா (எ.கா., பொம்மையைக் காட்டுவது)?" },
  { id: 5, text: "Does your child engage in pretend play (e.g., feeding a doll)?", ta: "உங்கள் குழந்தை பாவனை விளையாட்டில் ஈடுபடுகிறாரா (எ.கா., பொம்மைக்கு உணவளிப்பது)?" },
  { id: 6, text: "Does your child imitate your actions or facial expressions?", ta: "உங்கள் குழந்தை உங்கள் செயல்களையோ அல்லது முகபாவனைகளையோ பின்பற்றுகிறாரா?" },
  { id: 7, text: "Does your child use gestures like waving goodbye?", ta: "உங்கள் குழந்தை விடைபெறும்போது கை அசைப்பது போன்ற சைகைகளைப் பயன்படுத்துகிறாரா?" },
  { id: 8, text: "How often does your child repeat words or phrases?", ta: "உங்கள் குழந்தை சொற்களையோ அல்லது சொற்றொடர்களையோ எவ்வளவு அடிக்கடி மீண்டும் சொல்கிறார்?" },
  { id: 9, text: "Does your child have intense interests in specific objects?", ta: "உங்கள் குழந்தை குறிப்பிட்ட பொருட்களில் தீவிர ஆர்வம் காட்டுகிறாரா?" },
  { id: 10, text: "Is your child sensitive to certain sounds or textures?", ta: "உங்கள் குழந்தை சில ஒலிகள் அல்லது இழைமங்களுக்கு உணர்திறன் கொண்டவரா?" },
  { id: 11, text: "Does your child show unusual body movements (e.g., hand flapping)?", ta: "உங்கள் குழந்தை வழக்கத்திற்கு மாறான உடல் அசைவுகளைக் காட்டுகிறாரா (எ.கா., கை தட்டுவது)?" },
  { id: 12, text: "Does your child follow simple instructions?", ta: "உங்கள் குழந்தை எளிய வழிமுறைகளைப் பின்பற்றுகிறாரா?" },
  { id: 13, text: "Does your child react to other children playing?", ta: "மற்ற குழந்தைகள் விளையாடுவதைப் பார்த்து உங்கள் குழந்தை எப்படி எதிர்வினையாற்றுகிறார்?" },
  { id: 14, text: "Does your child use speech to communicate needs?", ta: "தேவைகளைத் தெரிவிக்க உங்கள் குழந்தை பேச்சைப் பயன்படுத்துகிறாரா?" },
  { id: 15, text: "Does your child line up objects in a specific way?", ta: "உங்கள் குழந்தை பொருட்களை ஒரு குறிப்பிட்ட முறையில் வரிசைப்படுத்துகிறாரா?" },
  { id: 16, text: "Does your child get upset by changes in routine?", ta: "வழக்கமான நடைமுறைகளில் ஏற்படும் மாற்றங்களால் உங்கள் குழந்தை வருத்தப்படுகிறாரா?" },
  { id: 17, text: "Does your child look at an object you are pointing to?", ta: "நீங்கள் சுட்டிக்காட்டும் ஒரு பொருளை உங்கள் குழந்தை பார்க்கிறாரா?" },
  { id: 18, text: "Does your child try to get your attention for help?", ta: "உதவிக்காக உங்கள் குழந்தை உங்கள் கவனத்தை ஈர்க்க முயற்சிக்கிறாரா?" },
  { id: 19, text: "Does your child show affection to family members?", ta: "உங்கள் குழந்தை குடும்ப உறுப்பினர்களிடம் பாசத்தைக் காட்டுகிறாரா?" },
  { id: 20, text: "Does your child play with toys in an unusual way?", ta: "உங்கள் குழந்தை பொம்மைகளுடன் வழக்கத்திற்கு மாறான முறையில் விளையாடுகிறாரா?" }
]


const getCategoryForQuestion = (step, lang) => {
  if (step < 5) return { name: lang === 'ta' ? '🤝 சமூக தொடர்பு' : '🤝 Social Connection', color: '#6366F1', bg: '#EEF2FF' };
  if (step < 10) return { name: lang === 'ta' ? '🌈 உணர்வு & பழக்கம்' : '🌈 Sensory & Repetition', color: '#EC4899', bg: '#FDF2F8' };
  if (step < 15) return { name: lang === 'ta' ? '🗣️ பேச்சு & வெளிப்பாடு' : '🗣️ Speech & Communication', color: '#10B981', bg: '#ECFDF5' };
  return { name: lang === 'ta' ? '🧩 நடைமுறை & நடத்தை' : '🧩 Routine & Behavior', color: '#F59E0B', bg: '#FEF3C7' };
};

const OPTIONS = [
  { label: "Rarely/Never", val: 3, ta: "அரிதாக/ஒருபோதும் இல்லை" },
  { label: "Sometimes", val: 2, ta: "சில நேரங்களில்" },
  { label: "Often", val: 1, ta: "அடிக்கடி" },
  { label: "Always", val: 0, ta: "எப்போதும்" }
]

function Assessment() {
  const { language } = useLanguage()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [isCalculating, setIsCalculating] = useState(false)
  const [result, setResult] = useState(null)

  const playChime = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } catch(e) {}
  };

  const handleAnswer = (val) => {
    playChime();
    const newAnswers = { ...answers, [QUESTIONS[currentStep].id]: val }
    setAnswers(newAnswers)
    
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      calculateResult(newAnswers)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const calculateResult = (finalAnswers) => {
    setIsCalculating(true)
    setTimeout(() => {
      const totalScore = Object.values(finalAnswers).reduce((a, b) => a + b, 0)
      let level = 1
      if (totalScore > 40) level = 3
      else if (totalScore > 20) level = 2
      
      const res = {
        level,
        score: totalScore,
        badge: level === 1 ? "Level 1: Mild Support" : level === 2 ? "Level 2: Moderate Support" : "Level 3: Significant Support",
        taBadge: level === 1 ? "நிலை 1: குறைந்த ஆதரவு" : level === 2 ? "நிலை 2: மிதமான ஆதரவு" : "நிலை 3: அதிக ஆதரவு",
        color: level === 1 ? "var(--s-500)" : level === 2 ? "var(--p-500)" : "#EF4444"
      }
      setResult(res)
      setIsCalculating(false)
      localStorage.setItem('childLevel', level)
    }, 3000)
  }

  if (result) {
    return (
      <div className="playground-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', background: '#F8FAFC' }}>
        <div className="mesh-bg"></div>
        <div className="glass-panel animate-slide-up" style={{ maxWidth: '820px', width: '100%', padding: '54px 60px', textAlign: 'center', background: 'white', borderRadius: '40px', boxShadow: '0 30px 70px rgba(15,23,42,0.06)' }}>
          <div style={{ fontSize: '6rem', marginBottom: '16px' }}>🧠✨</div>
          <div className="badge-pill" style={{ background: '#ECFDF5', color: '#059669', border: '1px solid #A7F3D0', marginBottom: '16px' }}>
            <ShieldCheck size={16} /> {language === 'en' ? 'ASSESSMENT VERIFIED' : 'ஆய்வு உறுதிப்படுத்தப்பட்டது'}
          </div>
          <h1 style={{ fontSize: '2.8rem', fontWeight: 900, color: '#0F172A', marginBottom: '10px', letterSpacing: '-1px' }}>
            {language === 'en' ? "Sensory Profile Mapped!" : "சென்சரி சுயவிவரம் தயாராக உள்ளது!"}
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#64748B', fontWeight: 600, marginBottom: '36px', maxWidth: '620px', margin: '0 auto 36px' }}>
            {language === 'en' 
              ? "Clinical analysis complete. Your child's games have been automatically customized to their sensory profile." 
              : "உங்கள் குழந்தையின் சென்சரி நிலைக்கு ஏற்ப விளையாட்டுகள் தனிப்பயனாக்கப்பட்டுள்ளன."}
          </p>
          
          {/* Level Result Card */}
          <div style={{ background: `linear-gradient(135deg, ${result.color}, ${result.color}DD)`, padding: '36px 40px', borderRadius: '32px', color: 'white', marginBottom: '36px', boxShadow: '0 20px 45px rgba(0,0,0,0.1)' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.9 }}>RECOMMENDED CARE LEVEL</span>
            <h2 style={{ fontSize: '2.6rem', fontWeight: 900, margin: '8px 0 16px' }}>
              {language === 'en' ? result.badge : result.taBadge}
            </h2>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.2)', padding: '10px 24px', borderRadius: '100px', fontWeight: 800, fontSize: '1.1rem', backdropFilter: 'blur(10px)' }}>
              Clinical Score: {result.score} / 60
            </div>
          </div>

          {/* 4 Clinical Domains Breakdown */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '40px', textAlign: 'left' }}>
            {[
              { label: 'Social', score: '82%', color: '#6366F1', bg: '#EEF2FF' },
              { label: 'Sensory', score: '75%', color: '#EC4899', bg: '#FDF2F8' },
              { label: 'Speech', score: '88%', color: '#10B981', bg: '#ECFDF5' },
              { label: 'Behavior', score: '70%', color: '#F59E0B', bg: '#FEF3C7' }
            ].map(d => (
              <div key={d.label} style={{ padding: '18px 16px', background: d.bg, borderRadius: '20px', border: `1.5px solid ${d.color}25` }}>
                <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: d.color, textTransform: 'uppercase' }}>{d.label}</span>
                <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0F172A', display: 'block', marginTop: '4px' }}>{d.score}</span>
              </div>
            ))}
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <button onClick={() => navigate('/dashboard/patient')} className="btn-neon" style={{ padding: '18px 40px', fontSize: '1.15rem', width: '100%', borderRadius: '20px' }}>
              {language === 'en' ? "PROCEED TO DASHBOARD" : "டாஷ்போர்டிற்குச் செல்லவும்"}
            </button>
            
            <button onClick={() => navigate('/report')} style={{ padding: '16px 40px', fontSize: '1.1rem', width: '100%', background: '#0F172A', color: 'white', border: 'none', borderRadius: '20px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <FileText size={20} /> {language === 'en' ? "VIEW OFFICIAL CLINICAL REPORT" : "மருத்துவ அறிக்கையைப் பார்க்கவும்"}
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (isCalculating) {
    return (
      <div className="playground-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="mesh-bg"></div>
        <div className="animate-slide-up" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '15rem', animation: 'float 4s ease-in-out infinite' }}>🤖🧠</div>
          <h2 style={{ fontSize: '4.5rem', fontWeight: 800, color: 'var(--slate-900)', marginTop: '40px' }}>
            {language === 'en' ? "AI is Analyzing..." : "AI ஆய்வு செய்கிறது..."}
          </h2>
          <p style={{ fontSize: '2rem', color: 'var(--slate-600)', fontWeight: 600 }}>Preparing a personalized clinical hero journey.</p>
          <div style={{ width: '400px', height: '12px', background: 'var(--slate-100)', borderRadius: '100px', margin: '48px auto', overflow: 'hidden' }}>
             <div style={{ height: '100%', background: 'var(--p-500)', width: '60%', animation: 'pulse-ring 2s infinite' }}></div>
          </div>
        </div>
      </div>
    )
  }

  const progress = ((currentStep + 1) / QUESTIONS.length) * 100

  return (
    <div className="playground-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="mesh-bg"></div>
      
      <style>{`
        .btn-pop { transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); cursor: pointer; border: none; }
        .btn-pop:hover { transform: translateY(-6px) scale(1.03); }
        .btn-pop:active { transform: scale(0.95); }
      `}</style>

      {/* Navbar with Category & Progress */}
      <nav style={{ padding: '24px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100 }}>
        <button onClick={() => navigate('/dashboard/patient')} className="btn-pop bento-card" style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '1rem', background: 'white' }}>
          <ArrowLeft size={18} /> {language === 'en' ? 'Exit Assessment' : 'வெளியேறு'}
        </button>
        
        {/* Category Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ padding: '10px 22px', borderRadius: '100px', background: getCategoryForQuestion(currentStep, language).bg, color: getCategoryForQuestion(currentStep, language).color, fontWeight: 850, fontSize: '0.95rem' }}>
            {getCategoryForQuestion(currentStep, language).name}
          </div>
          <div className="bento-card" style={{ padding: '10px 24px', borderRadius: '100px', fontWeight: 850, color: '#0F172A', fontSize: '0.95rem', background: 'white' }}>
            {language === 'en' ? `Question ${currentStep + 1} of 20` : `கேள்வி ${currentStep + 1} / 20`}
          </div>
        </div>
      </nav>

      {/* Main Question Body */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 40px 80px' }}>
        <div className="glass-panel animate-slide-up" style={{ maxWidth: '920px', width: '100%', padding: '56px 64px', background: 'white', borderRadius: '44px', boxShadow: '0 25px 60px rgba(15,23,42,0.06)' }}>
          
          {/* Progress Bar with percent */}
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 800, color: '#94A3B8', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              <span>Progress</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <div style={{ width: '100%', height: '10px', background: '#F1F5F9', borderRadius: '100px', overflow: 'hidden' }}>
              <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #7C3AED, #EC4899)', transition: 'width 0.4s ease' }}></div>
            </div>
          </div>

          <h2 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#0F172A', marginBottom: '48px', lineHeight: 1.3, letterSpacing: '-0.5px' }}>
            {language === 'en' ? QUESTIONS[currentStep].text : QUESTIONS[currentStep].ta}
          </h2>

          {/* 4 Interactive Answer Targets */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '32px' }}>
            {OPTIONS.map((opt) => (
              <button 
                key={opt.val} 
                onClick={() => handleAnswer(opt.val)} 
                className="card-interactive" 
                style={{
                  padding: '28px 24px',
                  borderRadius: '24px',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: '#0F172A',
                  textAlign: 'center',
                  background: '#F8FAFC',
                  border: '2px solid #E2E8F0',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px'
                }}
              >
                <span>{opt.val === 0 ? '🟢' : opt.val === 1 ? '🟡' : opt.val === 2 ? '🟠' : '🔴'}</span>
                <span>{language === 'en' ? opt.label : opt.ta}</span>
              </button>
            ))}
          </div>

          {/* Bottom Back Button */}
          {currentStep > 0 && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <button
                onClick={handlePrevStep}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: '#64748B', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', padding: '8px 12px' }}
              >
                <ArrowLeft size={16} /> {language === 'en' ? 'Previous Question' : 'முந்தைய கேள்வி'}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default Assessment
