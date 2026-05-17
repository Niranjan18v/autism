import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Play, Sparkles, BookOpen, Award, Map as MapIcon, ChevronRight, Star, X, Camera, RefreshCcw, Heart, Zap, Target } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

// --- DATASETS ---
const EMOTIONS_DISCOVERY = [
  { id: 'happy', img: '😊', color: '#10B981', ta: 'மகிழ்ச்சி', desc: 'Feeling good!' },
  { id: 'sad', img: '😢', color: '#8B5CF6', ta: 'சோகம்', desc: 'Feeling blue.' },
  { id: 'angry', img: '😠', color: '#EF4444', ta: 'கோபம்', desc: 'Grrr! I am mad.' },
  { id: 'scared', img: '😨', color: '#F59E0B', ta: 'பயம்', desc: 'Oh no! Scared!' },
  { id: 'tired', img: '😴', color: '#38BDF8', ta: 'சோர்வு', desc: 'Time to sleep.' },
  { id: 'surprised', img: '😲', color: '#F472B6', ta: 'ஆச்சரியம்', desc: 'Wow! Surprise!' }
]

const MODELING_VIDEOS = [
  { id: 1, target: 'happy', url: "https://player.vimeo.com/video/146051515?autoplay=1" },
  { id: 2, target: 'sad', url: "https://player.vimeo.com/video/336214228?autoplay=1" },
  { id: 3, target: 'angry', url: "https://player.vimeo.com/video/146051515?autoplay=1" },
  { id: 4, target: 'scared', url: "https://player.vimeo.com/video/336214228?autoplay=1" },
  { id: 5, target: 'surprised', url: "https://player.vimeo.com/video/146051515?autoplay=1" },
  { id: 6, target: 'tired', url: "https://player.vimeo.com/video/336214228?autoplay=1" }
]

const STORY_SCENARIOS = [
  { id: 1, q: "Arjun lost his favorite toy.", taQ: "அர்ஜுன் தனது எனக்கு பிடித்த பொம்மையை இழந்துவிட்டார்.", target: 'sad', icon: '🧸' },
  { id: 2, q: "Arjun got a yummy cupcake!", taQ: "அர்ஜுனுக்கு ஒரு சுவையான கப்கேக் கிடைத்தது!", target: 'happy', icon: '🧁' },
  { id: 3, q: "A loud thunder went BOOM!", taQ: "பெரிய இடி சத்தம் கேட்டது!", target: 'scared', icon: '⚡' },
  { id: 4, q: "Someone took Arjun's turn.", taQ: "விளையாட்டில் யாரோ அர்ஜுனின் வாய்ப்பைப் பறித்தனர்.", target: 'angry', icon: '🎮' },
  { id: 5, q: "It is very late now.", taQ: "நேரம் ஆகிவிட்டது.", target: 'tired', icon: '🌙' },
  { id: 6, q: "A surprise party! Surprise!", taQ: "ஒரு ஆச்சரியமான விருந்து!", target: 'surprised', icon: '🎉' }
]

const ZONES_SORTING = [
  { id: 'happy', zone: 'green', name: 'Happy', ta: 'மகிழ்ச்சி' },
  { id: 'sad', zone: 'blue', name: 'Sad', ta: 'சோகம்' },
  { id: 'frustrated', zone: 'yellow', name: 'Frustrated', ta: 'ஏமாற்றம்' },
  { id: 'angry', zone: 'red', name: 'Angry', ta: 'கோபம்' },
  { id: 'calm', zone: 'green', name: 'Calm', ta: 'அமைதி' },
  { id: 'tired', zone: 'blue', name: 'Tired', ta: 'சோர்வு' }
]

const mapDetectedToEmoji = (exp) => {
  const map = { happy: '😊', sad: '😢', angry: '😠', fearful: '😨', neutral: '😐', disgusted: '🤢', surprised: '😲' };
  return map[exp] || '🤔';
}

const mapDetectedToName = (exp) => {
  const map = { happy: 'Happy', sad: 'Sad', angry: 'Angry', fearful: 'Scared', neutral: 'Calm/Neutral', disgusted: 'Disgusted', surprised: 'Surprised' };
  return map[exp] || exp.toUpperCase();
}

function EmotionMatching() {
  const navigate = useNavigate();
  const { language, toggleLanguage } = useLanguage()
  const [currentStage, setCurrentStage] = useState(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [stickers, setStickers] = useState([])
  const [isTalking, setIsTalking] = useState(false)
  const [showReward, setShowReward] = useState(false)
  const [showMap, setShowMap] = useState(true)
  const [confetti, setConfetti] = useState(false)
  
  // Real AI States
  const [analyzing, setAnalyzing] = useState(false)
  const [cameraActive, setCameraActive] = useState(false)
  const [aiPercent, setAiPercent] = useState(0)
  const [countdown, setCountdown] = useState(null)
  const [isWrong, setIsWrong] = useState(false)
  const [detectedEmo, setDetectedEmo] = useState(null)
  const [modelsLoaded, setModelsLoaded] = useState(false)
  
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const realAnalysisResultRef = useRef(null)
  const detectionTriggeredRef = useRef(false)

  useEffect(() => {
    const startCamera = async () => {
      if (currentStage === 5 && !cameraActive) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true })
          streamRef.current = stream
          if (videoRef.current) videoRef.current.srcObject = stream
          setCameraActive(true)
        } catch (err) {
          console.error("Camera error:", err)
        }
      }
    }
    const stopCamera = () => {
      if (currentStage !== 5 && streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
        streamRef.current = null
        if (videoRef.current) videoRef.current.srcObject = null
        setCameraActive(false)
      }
    }
    if (currentStage === 5) startCamera()
    else stopCamera()
    return () => stopCamera()
  }, [currentStage])

  useEffect(() => {
    if (currentStage === 5 && cameraActive && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current
    }
  }, [currentStage, cameraActive, aiPercent])

  useEffect(() => {
    const loadFaceApi = async () => {
      if (!document.getElementById('face-api-script')) {
        const script = document.createElement('script')
        script.id = 'face-api-script'
        script.src = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api@1.7.12/dist/face-api.min.js'
        script.onload = async () => {
          try {
             const MODEL_URL = 'https://vladmandic.github.io/face-api/model/'
             await window.faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL)
             await window.faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
             setModelsLoaded(true)
          } catch(e) {
             console.error("Failed to load AI models", e)
          }
        }
        document.head.appendChild(script)
      } else if (window.faceapi && window.faceapi.nets.tinyFaceDetector.isLoaded) {
        setModelsLoaded(true)
      }
    }
    if (currentStage === 5) loadFaceApi()
  }, [currentStage])

  useEffect(() => {
    if (!analyzing) {
       detectionTriggeredRef.current = false
       realAnalysisResultRef.current = null
    }
  }, [analyzing])

  useEffect(() => {
    let interval;
    if (analyzing && aiPercent < 100) {
      if (aiPercent >= 90 && !detectionTriggeredRef.current) {
         detectionTriggeredRef.current = true;
         const runRealDetection = async () => {
            if (videoRef.current && videoRef.current.readyState >= 2 && videoRef.current.videoWidth > 0 && window.faceapi && modelsLoaded) {
               try {
                  const detections = await window.faceapi.detectSingleFace(
                     videoRef.current, 
                     new window.faceapi.TinyFaceDetectorOptions({ inputSize: 160, scoreThreshold: 0.3 })
                  ).withFaceExpressions()
                  realAnalysisResultRef.current = detections || 'NO_FACE'
               } catch (e) {
                  console.error("AI Detection Error:", e)
                  realAnalysisResultRef.current = 'ERROR'
               }
            } else {
               const debugState = videoRef.current ? `readyState:${videoRef.current.readyState}` : 'No Video';
               console.warn("AI Detection skipped:", debugState);
               realAnalysisResultRef.current = 'NOT_READY'
            }
            setAiPercent(100);
         }
         runRealDetection()
      }

      interval = setInterval(() => {
        setAiPercent(p => {
           if (p >= 90) return 90;
           return Math.min(p + 4, 100);
        })
      }, 70)
    }
    return () => clearInterval(interval)
  }, [analyzing, aiPercent, modelsLoaded])

  useEffect(() => {
    if (currentStage === 5 && cameraActive && modelsLoaded && !analyzing && countdown === null && aiPercent === 0 && !isWrong) {
       const q = language === 'ta' ? `அர்ஜுன், உங்கள் ${EMOTIONS_DISCOVERY[currentStep].ta} முகத்தைக் காட்டுங்கள்!` : `Arjun, show me your ${EMOTIONS_DISCOVERY[currentStep].id.toUpperCase()} face!`;
       speak(q, () => setCountdown(3));
    }
  }, [currentStage, cameraActive, analyzing, countdown, aiPercent, isWrong, currentStep, language, modelsLoaded]);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    } else if (countdown === 0) {
      setAnalyzing(true);
      setCountdown(null);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  useEffect(() => {
    let timer;
    if (aiPercent === 100) {
      const evaluateRealResult = () => {
         const res = realAnalysisResultRef.current;
         const targetExp = EMOTIONS_DISCOVERY[currentStep].id;
         const mappedTarget = targetExp === 'scared' ? 'fearful' : targetExp === 'tired' ? 'neutral' : targetExp;

         if (res === 'NOT_READY' || res === 'ERROR' || !modelsLoaded) {
            setIsWrong(true);
            setDetectedEmo({ id: 'none', img: '⏳', name: 'Loading AI' });
            speak(language === 'ta' ? "AI தயாராகி வருகிறது..." : "AI is warming up, let's try again!", () => {
               setTimeout(() => { setIsWrong(false); setAiPercent(0); setAnalyzing(false); setCountdown(3); }, 3000);
            });
         } else if (res === 'NO_FACE' || !res) {
            setIsWrong(true);
            setDetectedEmo({ id: 'none', img: '❓', name: 'No Face Found' });
            speak(language === 'ta' ? "உங்களை என்னால் பார்க்க முடியவில்லை! கேமராவைப் பாருங்கள்!" : "I can't see your face! Please look right at me!", () => {
               setTimeout(() => { setIsWrong(false); setAiPercent(0); setAnalyzing(false); setCountdown(3); }, 4000);
            });
         } else {
            const exps = res.expressions;
            const topExp = Object.keys(exps).reduce((a, b) => exps[a] > exps[b] ? a : b);

            if (topExp === mappedTarget) {
               speak(language === 'ta' ? "அற்புதம்! சரியான முகம்!" : "Perfect match! Great job!");
               timer = setTimeout(() => {
                  if (currentStep < 5) {
                     setCurrentStep(s => s + 1);
                     setAnalyzing(false);
                     setAiPercent(0);
                     setCountdown(null);
                     setIsWrong(false);
                  } else {
                     triggerCelebration();
                  }
               }, 6000);
            } else {
               setIsWrong(true);
               setDetectedEmo({ id: topExp, img: mapDetectedToEmoji(topExp), name: mapDetectedToName(topExp) });
               const msg = language === 'ta' 
                  ? `நான் ${mapDetectedToName(topExp)} முகத்தைப் பார்க்கிறேன். மீண்டும் முயற்சிப்போம்!` 
                  : `I see a ${mapDetectedToName(topExp)} face. Let's try ${EMOTIONS_DISCOVERY[currentStep].id.toUpperCase()} again!`;
               speak(msg, () => {
                  setTimeout(() => { setIsWrong(false); setAiPercent(0); setAnalyzing(false); setCountdown(3); }, 6000);
               });
            }
         }
      };
      evaluateRealResult();
    }
    return () => clearTimeout(timer);
  }, [aiPercent, currentStep, language, modelsLoaded]);

  const speak = (text, onComplete) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = language === 'ta' ? 'ta-IN' : 'en-US'
      utterance.onend = () => { setIsTalking(false); if (onComplete) onComplete(); }
      setIsTalking(true)
      window.speechSynthesis.speak(utterance)
    }
  }

  const startStage = (id) => {
    setCurrentStage(id)
    setCurrentStep(0)
    setShowMap(false)
    setShowReward(false)
    setAnalyzing(false)
    setAiPercent(0)
    setCountdown(null)
    setIsWrong(false)
    speak(language === 'ta' ? "தொடங்குவோம்!" : "Let's go!")
  }

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(s => s + 1)
      speak(language === 'ta' ? "மிக நன்று!" : "Good job!")
    } else {
      triggerCelebration()
    }
  }

  const triggerCelebration = () => {
    setConfetti(true)
    const icons = ["🎬", "🐻", "🦁", "🐼", "🦊", "🐯"]
    const newSticker = icons[currentStage] || "🌟"
    if (!stickers.includes(newSticker)) setStickers([...stickers, newSticker])
    
    if (streamRef.current) {
       streamRef.current.getTracks().forEach(t => t.stop())
       streamRef.current = null;
       setCameraActive(false)
    }

    setTimeout(() => {
      setConfetti(false)
      setShowReward(true)
      speak(language === 'ta' ? "அற்புதம்! உங்களுக்கு ஒரு ஸ்டிக்கர் கிடைத்துள்ளது!" : "Amazing! You earned a sticker!")
    }, 2000)
  }

  return (
    <div className="playground-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="mesh-bg"></div>
      
      <style>{`
        .btn-pop { transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); cursor: pointer; border: none; }
        .btn-pop:hover { transform: translateY(-6px) scale(1.03); }
        .btn-pop:active { transform: scale(0.95); }
        
        @keyframes dash {
          to {
            stroke-dashoffset: -40;
          }
        }

        @keyframes float-island {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }

        .journey-node { 
          z-index: 2; 
          position: relative; 
          background: white;
          border-radius: 50%;
          padding: 10px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.06);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          animation: float-island 6s ease-in-out infinite;
        }

        .journey-node:hover {
          transform: scale(1.1) rotate(2deg);
          box-shadow: 0 25px 45px rgba(0,0,0,0.12);
        }

        .node-inner {
          width: 130px;
          height: 130px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--slate-50);
          border: 4px solid var(--slate-100);
        }

        .node-label {
          position: absolute;
          bottom: -55px;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          padding: 8px 24px;
          border-radius: 100px;
          font-weight: 800;
          font-size: 1rem;
          color: var(--slate-900);
          box-shadow: 0 8px 16px rgba(0,0,0,0.04);
          white-space: nowrap;
          border: 2px solid var(--slate-100);
        }
      `}</style>

      {confetti && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(15px)' }}>
           <div className="animate-slide-up" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '18rem', animation: 'float-slow 2s infinite' }}>⭐</div>
              <h2 style={{ fontSize: '6rem', fontWeight: 900, color: 'white', letterSpacing: '-2px' }}>STAGE MASTERED!</h2>
              <p style={{ color: 'var(--p-300)', fontSize: '2rem', fontWeight: 800 }}>Incredible Journey, Hero!</p>
           </div>
        </div>
      )}

      {/* Header */}
      <header style={{ padding: '32px 64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100 }}>
        <button onClick={() => navigate('/dashboard/patient')} className="btn-pop bento-card" style={{ padding: '16px 40px', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 800, fontSize: '1.2rem', color: 'var(--slate-900)' }}>
          <ArrowLeft size={24} /> EXIT JOURNEY
        </button>
        <div style={{ display: 'flex', gap: '20px' }}>
          <div className="bento-card" style={{ padding: '14px 40px', borderRadius: '100px', display: 'flex', gap: '15px', alignItems: 'center', background: 'white' }}>
             {stickers.map((s, i) => <span key={i} style={{ fontSize: '2.4rem' }}>{s}</span>)}
             {stickers.length === 0 && <span style={{ color: 'var(--slate-400)', fontWeight: 800, fontSize: '1.2rem' }}>NO STICKERS YET</span>}
          </div>
          <button onClick={toggleLanguage} className="btn-pop bento-card" style={{ padding: '16px 40px', borderRadius: '100px', fontWeight: 800, fontSize: '1.2rem' }}>{language === 'en' ? 'தமிழ்' : 'English'}</button>
        </div>
      </header>

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 64px 150px' }}>
        {showMap ? (
          <div className="animate-slide-up" style={{ width: '100%', maxWidth: '1200px', textAlign: 'center', position: 'relative' }}>
            <h1 style={{ fontSize: '4.5rem', fontWeight: 900, color: 'var(--slate-900)', marginBottom: '80px', letterSpacing: '-2px' }}>
              The Emotion Journey <span style={{ animation: 'bounce 2s infinite', display: 'inline-block' }}>🌈</span>
            </h1>
            
            <div style={{ position: 'relative', minHeight: '1100px', display: 'flex', flexDirection: 'column', padding: '100px 0' }}>
              
              {/* Dynamic Winding SVG Path */}
              <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} viewBox="0 0 1000 1100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="20%" stopColor="#10B981" />
                    <stop offset="40%" stopColor="#38BDF8" />
                    <stop offset="60%" stopColor="#F472B6" />
                    <stop offset="80%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                <path 
                  d="M 250,100 C 600,100 600,280 750,280 C 600,280 600,460 250,460 C 600,460 600,640 750,640 C 600,640 600,820 250,820 C 600,820 600,1000 750,1000" 
                  fill="none" 
                  stroke="url(#pathGradient)" 
                  strokeWidth="14" 
                  strokeLinecap="round"
                  strokeDasharray="20, 12"
                  filter="url(#glow)"
                  style={{ animation: 'dash 20s linear infinite' }}
                />
              </svg>

              {/* Animated Floating Clouds & Stars */}
              <div style={{ position: 'absolute', top: '10%', left: '5%', fontSize: '3rem', animation: 'float-slow 6s infinite', opacity: 0.6 }}>☁️</div>
              <div style={{ position: 'absolute', top: '40%', right: '8%', fontSize: '4rem', animation: 'float-slow 8s infinite', opacity: 0.5 }}>✨</div>
              <div style={{ position: 'absolute', top: '70%', left: '10%', fontSize: '3rem', animation: 'float-slow 7s infinite', opacity: 0.6 }}>☁️</div>
              <div style={{ position: 'absolute', top: '85%', right: '12%', fontSize: '3.5rem', animation: 'float-slow 5s infinite', opacity: 0.7 }}>🌟</div>

              {[
                { id: 0, name: 'Meet Emotions', icon: Play, color: '#F59E0B', x: '25%', y: '100px' },
                { id: 1, name: 'Discovery', icon: Sparkles, color: '#10B981', x: '75%', y: '280px' },
                { id: 2, name: 'Modeling', icon: Play, color: '#38BDF8', x: '25%', y: '460px' },
                { id: 3, name: 'Story Time', icon: BookOpen, color: '#F472B6', x: '75%', y: '640px' },
                { id: 4, name: 'Zones', icon: MapIcon, color: '#10B981', x: '25%', y: '820px' },
                { id: 5, name: 'AI Mirror Match', icon: Award, color: '#8B5CF6', x: '75%', y: '1000px' }
              ].map((s, i) => (
                <div 
                  key={i} 
                  style={{ 
                    position: 'absolute', 
                    left: s.x, 
                    top: s.y, 
                    transform: 'translate(-50%, -50%)',
                    zIndex: 2,
                    animationDelay: `${i * 0.5}s`
                  }}
                >
                  <div className="journey-node" style={{ border: `4px solid ${s.color}`, animationDelay: `${i * 0.6}s` }}>
                    <button 
                      onClick={() => startStage(s.id)} 
                      className="node-inner btn-pop" 
                      style={{ background: `${s.color}08` }}
                    >
                      <s.icon size={70} color={s.color} fill={stickers.includes(["🎬", "🐻", "🦁", "🐼", "🦊", "🐯"][s.id]) ? s.color : 'none'} strokeWidth={2.5} />
                      {stickers.includes(["🎬", "🐻", "🦁", "🐼", "🦊", "🐯"][s.id]) && (
                        <div style={{ position: 'absolute', top: -10, right: -10, background: '#10B981', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid white', fontSize: '1.1rem', fontWeight: 900, boxShadow: '0 8px 16px rgba(16,185,129,0.3)' }}>✓</div>
                      )}
                    </button>
                    <div className="node-label" style={{ borderTop: `4px solid ${s.color}` }}>
                      <span style={{ fontSize: '0.75rem', color: s.color, fontWeight: 800, display: 'block', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2px' }}>Stage {s.id}</span>
                      {s.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : showReward ? (
          <div className="bento-card animate-slide-up" style={{ padding: '100px', textAlign: 'center', maxWidth: '800px', background: 'white' }}>
            <div style={{ fontSize: '18rem', marginBottom: '40px', animation: 'float-slow 3s infinite' }}>🏆</div>
            <h1 style={{ fontSize: '5rem', fontWeight: 900, color: 'var(--slate-900)', letterSpacing: '-2px' }}>AMAZING JOB!</h1>
            <p style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--slate-600)', marginBottom: '80px', lineHeight: 1.5 }}>You earned the {stickers[stickers.length - 1]} sticker! Your understanding of feelings is growing every day.</p>
            <button onClick={() => setShowMap(true)} className="btn-neon" style={{ padding: '24px 120px', fontSize: '2rem' }}>GO BACK TO MAP</button>
          </div>
        ) : (
          <div className="bento-card animate-slide-up" style={{ width: '100%', maxWidth: '1200px', minHeight: '850px', padding: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'white', borderRadius: '80px' }}>
             
             <div style={{ width: '100%', maxWidth: '1000px', marginBottom: '80px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontWeight: 900, color: 'var(--slate-400)', fontSize: '1.3rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Zap size={24} fill="var(--p-500)" color="var(--p-500)" />
                      <span>{currentStage === 0 ? "STORY MASTERCLASS" : `MISSION ${currentStep + 1} / 6`}</span>
                   </div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Target size={24} color="var(--s-500)" />
                      <span>STAGE {currentStage}</span>
                   </div>
                </div>
                <div style={{ height: '24px', background: 'var(--slate-100)', borderRadius: '100px', overflow: 'hidden', border: '6px solid var(--slate-50)' }}>
                   <div style={{ height: '100%', background: 'linear-gradient(90deg, var(--p-400), var(--p-600))', width: currentStage === 0 ? '100%' : `${((currentStep + 1) / 6) * 100}%`, transition: 'width 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}></div>
                </div>
             </div>

             <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                {currentStage === 0 && (
                  <div className="animate-slide-up" style={{ textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                     <h2 style={{ fontSize: '4rem', fontWeight: 900, color: 'var(--slate-900)', marginBottom: '50px', letterSpacing: '-1.5px' }}>{language === 'ta' ? "உணர்வுகளை அறிந்து கொள்ளுங்கள்!" : "Let's Learn the Emotions!"}</h2>
                     <div className="bento-card" style={{ width: '100%', maxWidth: '800px', padding: '80px', borderRadius: '60px', background: 'var(--slate-50)', border: '4px solid var(--slate-100)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px' }}>
                        <div style={{ fontSize: '12rem', animation: 'float-slow 4s infinite' }}>🧠</div>
                        <p style={{ fontSize: '2.2rem', color: 'var(--slate-600)', fontWeight: 700, lineHeight: 1.6 }}>{language === 'ta' ? "நாம் எப்படி உணர்கிறோம் என்பதைப் புரிந்துகொள்வது முக்கியம். வெவ்வேறு உணர்வுகளைப் பற்றி இன்று கற்போம்!" : "Understanding our feelings is a superpower! Today, we will learn about different emotions and how to express them."}</p>
                     </div>
                     <button onClick={() => triggerCelebration()} className="btn-neon" style={{ marginTop: '60px', padding: '28px 150px', fontSize: '2.2rem', borderRadius: '30px' }}>{language === 'ta' ? "தொடங்குவோம்! ➔" : "START MISSION ➔"}</button>
                  </div>
                )}

                {currentStage === 1 && (
                  <div className="animate-slide-up" style={{ textAlign: 'center', width: '100%' }}>
                     <div style={{ fontSize: '24rem', marginBottom: '40px', filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.15))', animation: 'float-slow 4s infinite' }}>{EMOTIONS_DISCOVERY[currentStep].img}</div>
                     <div className="bento-card" style={{ padding: '40px 100px', display: 'inline-block', background: 'var(--slate-50)', borderRadius: '40px', border: '4px solid var(--slate-100)' }}>
                        <h2 style={{ fontSize: '6rem', fontWeight: 900, color: 'var(--slate-900)', margin: 0, letterSpacing: '-2px' }}>{language === 'ta' ? EMOTIONS_DISCOVERY[currentStep].ta : EMOTIONS_DISCOVERY[currentStep].id.toUpperCase()}</h2>
                        <p style={{ fontSize: '2.4rem', color: 'var(--slate-600)', fontWeight: 700, marginTop: '16px' }}>{EMOTIONS_DISCOVERY[currentStep].desc}</p>
                     </div>
                     <div style={{ marginTop: '80px' }}>
                        <button onClick={nextStep} className="btn-neon" style={{ padding: '28px 150px', fontSize: '2.2rem', borderRadius: '30px' }}>{currentStep < 5 ? "GOT IT!" : "COMPLETE STAGE"}</button>
                     </div>
                  </div>
                )}

                {currentStage === 2 && (
                  <div className="animate-slide-up" style={{ textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                     <div className="bento-card" style={{ width: '100%', maxWidth: '800px', padding: '60px', borderRadius: '40px', background: 'var(--slate-50)', marginBottom: '50px', border: '4px solid var(--slate-100)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                        <h3 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--slate-900)' }}>{language === 'ta' ? "இந்த உணர்வின் பெயர் என்ன?" : "How is this person feeling?"}</h3>
                        <div style={{ fontSize: '10rem', animation: 'float-slow 4s infinite' }}>{EMOTIONS_DISCOVERY.find(e => e.id === MODELING_VIDEOS[currentStep].target).img}</div>
                        <p style={{ fontSize: '1.8rem', color: 'var(--slate-500)', fontWeight: 700 }}>{EMOTIONS_DISCOVERY.find(e => e.id === MODELING_VIDEOS[currentStep].target).desc}</p>
                     </div>
                     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', width: '100%', maxWidth: '900px' }}>
                        {[MODELING_VIDEOS[currentStep].target, ...EMOTIONS_DISCOVERY.map(e => e.id).filter(id => id !== MODELING_VIDEOS[currentStep].target).sort(() => 0.5 - Math.random()).slice(0, 2)].sort(() => 0.5 - Math.random()).map(emoId => {
                          const emoData = EMOTIONS_DISCOVERY.find(e => e.id === emoId);
                          return (
                           <button key={emoId} onClick={() => { if(emoId === MODELING_VIDEOS[currentStep].target) nextStep(); else speak("Try again!"); }} className="btn-pop bento-card" style={{ padding: '24px', fontWeight: 900, fontSize: '1.6rem', display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'center', borderRadius: '24px' }}>
                              <span style={{ fontSize: '2.5rem' }}>{emoData.img}</span>
                              {language === 'ta' ? emoData.ta : emoId.toUpperCase()}
                           </button>
                          )
                        })}
                     </div>
                  </div>
                )}

                {currentStage === 3 && (
                  <div className="animate-slide-up" style={{ textAlign: 'center', width: '100%' }}>
                    <div style={{ fontSize: '18rem', marginBottom: '50px', animation: 'float-slow 3s infinite' }}>{STORY_SCENARIOS[currentStep].icon}</div>
                    <div className="bento-card" style={{ padding: '60px', background: 'var(--slate-50)', borderRadius: '60px', marginBottom: '80px' }}>
                       <h2 style={{ fontSize: '4rem', fontWeight: 900, color: 'var(--slate-900)', margin: 0, letterSpacing: '-1.5px' }}>{language === 'ta' ? STORY_SCENARIOS[currentStep].taQ : STORY_SCENARIOS[currentStep].q}</h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
                       {['happy', 'sad', 'angry', 'scared', 'tired', 'surprised'].map(emo => (
                         <button key={emo} onClick={() => { if(emo === STORY_SCENARIOS[currentStep].target) nextStep(); else speak("Try again!"); }} className="btn-pop bento-card" style={{ padding: '40px', fontWeight: 900, fontSize: '1.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{emo}</button>
                       ))}
                    </div>
                  </div>
                )}

                {currentStage === 4 && (
                  <div className="animate-slide-up" style={{ textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '3.5rem', fontWeight: 900, color: 'var(--slate-900)', marginBottom: '50px', letterSpacing: '-1.5px' }}>Where does <span style={{ color: 'var(--p-500)' }}>{language==='ta'?ZONES_SORTING[currentStep].ta:ZONES_SORTING[currentStep].name}</span> go?</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', width: '100%', maxWidth: '800px' }}>
                       {[
                         { id: 'green', color: '#10B981', name: 'Green Zone', icon: '😊' },
                         { id: 'blue', color: '#3B82F6', name: 'Blue Zone', icon: '😢' },
                         { id: 'yellow', color: '#F59E0B', name: 'Yellow Zone', icon: '😕' },
                         { id: 'red', color: '#EF4444', name: 'Red Zone', icon: '😠' }
                       ].map(z => (
                         <button key={z.id} onClick={() => { if(z.id === ZONES_SORTING[currentStep].zone) nextStep(); else speak("Try again!"); }} className="btn-pop bento-card" style={{ padding: '30px', borderBottom: `12px solid ${z.color}`, fontSize: '2.2rem', fontWeight: 900, borderRadius: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                            <div style={{ fontSize: '4.5rem', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))' }}>{z.icon}</div>
                            {z.name}
                         </button>
                       ))}
                    </div>
                  </div>
                )}

                {currentStage === 5 && (
                  <div className="animate-slide-up" style={{ textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                     {aiPercent < 100 ? (
                        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '40px', height: '450px', width: '100%', maxWidth: '900px' }}>
                           <div className="bento-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--slate-50)', borderRadius: '40px' }}>
                              <div style={{ fontSize: '12rem', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))', animation: 'float-slow 4s infinite' }}>{EMOTIONS_DISCOVERY[currentStep].img}</div>
                              <h2 style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--slate-900)', letterSpacing: '-1.5px', marginTop: '16px' }}>{language === 'ta' ? EMOTIONS_DISCOVERY[currentStep].ta : EMOTIONS_DISCOVERY[currentStep].id.toUpperCase()}</h2>
                           </div>
                           <div className="bento-card" style={{ overflow: 'hidden', position: 'relative', background: 'black', border: '12px solid var(--slate-900)', borderRadius: '40px' }}>
                              <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} />
                              {countdown !== null && (
                                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.4)', zIndex: 100, backdropFilter: 'blur(10px)' }}>
                                   <div style={{ fontSize: '10rem', fontWeight: 900, color: 'white', filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.4))' }}>{countdown}</div>
                                </div>
                              )}
                              {analyzing && (
                                <div style={{ position: 'absolute', inset: 0, zIndex: 110 }}>
                                   <div style={{ position: 'absolute', top: `${aiPercent}%`, left: 0, right: 0, height: '15px', background: 'var(--p-500)', boxShadow: '0 0 100px var(--p-500)' }}></div>
                                   <div style={{ position: 'absolute', top: '20px', left: '20px', background: 'var(--p-500)', color: 'white', padding: '12px 32px', borderRadius: '100px', fontWeight: 900, fontSize: '1rem', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>AI ANALYZING: {aiPercent}%</div>
                                </div>
                              )}
                           </div>
                        </div>
                     ) : (
                        <div className="animate-slide-up" style={{ width: '100%', maxWidth: '1000px' }}>
                           {!isWrong ? (
                             <div className="bento-card" style={{ padding: '60px', border: '12px solid var(--s-500)', display: 'flex', gap: '60px', alignItems: 'center', borderRadius: '50px' }}>
                                <div style={{ width: '350px', height: '450px', borderRadius: '30px', overflow: 'hidden', border: '8px solid var(--slate-100)', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                                   <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} />
                                </div>
                                <div style={{ textAlign: 'left', flex: 1 }}>
                                   <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                                      <div style={{ background: 'var(--s-500)', color: 'white', padding: '10px 24px', borderRadius: '100px', fontWeight: 900, fontSize: '1rem' }}>AI MATCH FOUND</div>
                                   </div>
                                   <h1 style={{ fontSize: '4.5rem', fontWeight: 900, color: 'var(--s-500)', letterSpacing: '-2px', margin: '0 0 20px 0' }}>PERFECT! ✅</h1>
                                   <p style={{ fontSize: '2rem', color: 'var(--slate-600)', fontWeight: 700, margin: '0 0 40px 0', lineHeight: 1.4 }}>Your {EMOTIONS_DISCOVERY[currentStep].id.toUpperCase()} expression is a 100% clinical match. You're an emotion expert!</p>
                                   <div style={{ height: '16px', background: 'var(--slate-100)', borderRadius: '100px', overflow: 'hidden', border: '4px solid var(--slate-50)' }}>
                                      <div style={{ height: '100%', background: 'var(--s-500)', width: '100%', transition: 'width 5s linear' }}></div>
                                   </div>
                                </div>
                             </div>
                           ) : (
                             <div className="bento-card" style={{ padding: '60px', border: '12px solid #F59E0B', textAlign: 'center', borderRadius: '60px', maxWidth: '900px', margin: '0 auto' }}>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '60px', marginBottom: '60px' }}>
                                   <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                      <div style={{ fontSize: '10rem', lineHeight: 1, filter: 'grayscale(1) opacity(0.5)' }}>{EMOTIONS_DISCOVERY[currentStep].img}</div>
                                      <p style={{ fontWeight: 900, marginTop: '16px', fontSize: '1.5rem', letterSpacing: '1px' }}>GOAL</p>
                                   </div>
                                   <div style={{ fontSize: '4rem', fontWeight: 900, color: 'var(--slate-200)' }}>VS</div>
                                   <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                      <div style={{ fontSize: '10rem', lineHeight: 1, animation: 'float-slow 2s infinite' }}>{detectedEmo?.img || '❓'}</div>
                                      <p style={{ fontWeight: 900, marginTop: '16px', fontSize: '1.5rem', color: '#F59E0B', letterSpacing: '1px' }}>AI SAW: {detectedEmo?.name}</p>
                                   </div>
                                </div>
                                <h2 style={{ fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-1.5px', margin: 0 }}>Let's try that again, Hero!</h2>
                                <p style={{ fontSize: '1.8rem', color: 'var(--slate-600)', fontWeight: 700, marginTop: '16px' }}>We're returning to the AI Mirror in 6 seconds...</p>
                             </div>
                           )}
                        </div>
                     )}
                  </div>
                )}
             </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default EmotionMatching
