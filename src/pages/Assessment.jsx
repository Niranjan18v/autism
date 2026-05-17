import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronRight, CheckCircle2, AlertCircle, Brain, Smile, Activity, Star } from 'lucide-react'
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

  const handleAnswer = (val) => {
    const newAnswers = { ...answers, [QUESTIONS[currentStep].id]: val }
    setAnswers(newAnswers)
    
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      calculateResult(newAnswers)
    }
  }

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
      <div className="playground-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="mesh-bg"></div>
        <div className="bento-card animate-slide-up" style={{ maxWidth: '700px', width: '100%', padding: '80px', textAlign: 'center', background: 'white' }}>
          <div style={{ fontSize: '10rem', marginBottom: '40px' }}>🧠✨</div>
          <h1 style={{ fontSize: '4rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '16px' }}>
            {language === 'en' ? "Analysis Complete!" : "ஆய்வு முடிந்தது!"}
          </h1>
          <p style={{ fontSize: '1.8rem', color: 'var(--slate-600)', fontWeight: 600, marginBottom: '60px' }}>
            {language === 'en' ? "Our clinical AI has evaluated your child's developmental profile." : "எங்கள் AI உங்கள் குழந்தையின் சுயவிவரத்தை ஆய்வு செய்துள்ளது."}
          </p>
          
          <div style={{ background: result.color, padding: '48px', borderRadius: '40px', color: 'white', marginBottom: '60px', boxShadow: '0 25px 50px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '3.5rem', fontWeight: 800, margin: 0 }}>
              {language === 'en' ? result.badge : result.taBadge}
            </h2>
            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '12px 32px', borderRadius: '100px', display: 'inline-block', marginTop: '24px', fontWeight: 800, fontSize: '1.4rem' }}>Clinical Score: {result.score} / 60</div>
          </div>

          <button onClick={() => navigate('/dashboard/patient')} className="btn-neon" style={{ padding: '24px 80px', fontSize: '1.8rem', width: '100%', marginBottom: '16px' }}>
            {language === 'en' ? "PROCEED TO DASHBOARD" : "டாஷ்போர்டிற்குச் செல்லவும்"}
          </button>
          
          <button onClick={() => navigate('/report')} className="btn-neon" style={{ padding: '24px 80px', fontSize: '1.8rem', width: '100%', background: 'var(--slate-900)' }}>
            <FileText style={{ marginRight: '12px' }} /> {language === 'en' ? "GENERATE CLINICAL REPORT" : "மருத்துவ அறிக்கையை உருவாக்கவும்"}
          </button>
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

      <nav style={{ padding: '32px 64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100 }}>
        <button onClick={() => navigate('/dashboard/patient')} className="btn-pop bento-card" style={{ padding: '16px 40px', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 800, fontSize: '1.2rem' }}>
          <ArrowLeft size={24} /> CANCEL ASSESSMENT
        </button>
        <div className="bento-card" style={{ padding: '14px 40px', borderRadius: '100px', fontWeight: 800, color: 'var(--p-500)', fontSize: '1.3rem' }}>
          QUESTION {currentStep + 1} OF 20
        </div>
      </nav>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 64px 100px' }}>
        <div className="bento-card animate-slide-up" style={{ maxWidth: '1000px', width: '100%', padding: '80px', background: 'white' }}>
          <div style={{ width: '100%', height: '16px', background: 'var(--slate-50)', borderRadius: '100px', marginBottom: '64px', overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: 'var(--p-500)', transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}></div>
          </div>

          <h2 style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '80px', lineHeight: 1.2 }}>
            {language === 'en' ? QUESTIONS[currentStep].text : QUESTIONS[currentStep].ta}
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            {OPTIONS.map((opt) => (
              <button 
                key={opt.val} 
                onClick={() => handleAnswer(opt.val)} 
                className="btn-pop bento-card" 
                style={{ padding: '48px', borderRadius: '35px', fontSize: '2rem', fontWeight: 800, color: 'var(--slate-900)', textAlign: 'center', background: 'var(--slate-50)', border: '4px solid var(--slate-100)' }}
              >
                {language === 'en' ? opt.label : opt.ta}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Assessment
