import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, BookOpen, Map, Mic, MicOff, Smile, Users, ShieldAlert, Phone, CheckCircle2, XCircle, Mic as MicIcon, Video, MessageSquare, Hand, Heart, Info, Star, ChevronRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

// --- SIMPLE & HAPPY AAYU CHARACTER COMPONENT ---
const Aayu3D = ({ isTalking, size = 300, isListening }) => {
  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <style>{`
        @keyframes blink { 0%, 90%, 100% { transform: scaleY(1) } 95% { transform: scaleY(0.1) } }
        @keyframes talk { 0%, 100% { height: 10px; border-radius: 50% } 50% { height: 30px; border-radius: 15% } }
        @keyframes float { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-15px) } }
        .aayu-simple { animation: float 4s ease-in-out infinite; }
      `}</style>
      {isListening && <div style={{ position: 'absolute', inset: -40, borderRadius: '50%', background: 'var(--p-500)', opacity: 0.15, filter: 'blur(30px)', animation: 'pulse 1.5s infinite' }}></div>}
      <div className="aayu-simple" style={{ width: '85%', height: '85%', background: 'white', borderRadius: '50%', border: '8px solid var(--slate-900)', boxShadow: '0 30px 60px rgba(0,0,0,0.1)', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '5%', width: '35%', height: '35%', background: 'var(--slate-900)', borderRadius: '50%', zIndex: -1 }}></div>
        <div style={{ position: 'absolute', top: '-10%', right: '5%', width: '35%', height: '35%', background: 'var(--slate-900)', borderRadius: '50%', zIndex: -1 }}></div>
        <div style={{ display: 'flex', gap: '50px', marginBottom: '15px' }}>
          <div style={{ width: '40px', height: '40px', background: 'var(--slate-900)', borderRadius: '50%', position: 'relative', animation: 'blink 5s infinite' }}>
            <div style={{ width: '12px', height: '12px', background: 'white', borderRadius: '50%', position: 'absolute', top: '8px', left: '8px' }}></div>
          </div>
          <div style={{ width: '40px', height: '40px', background: 'var(--slate-900)', borderRadius: '50%', position: 'relative', animation: 'blink 5s infinite' }}>
            <div style={{ width: '12px', height: '12px', background: 'white', borderRadius: '50%', position: 'absolute', top: '8px', left: '8px' }}></div>
          </div>
        </div>
        <div style={{ width: '24px', height: '14px', background: 'var(--slate-900)', borderRadius: '40%', marginBottom: '12px' }}></div>
        <div style={{ width: '60px', height: isTalking ? '35px' : '15px', background: isTalking ? '#F43F5E' : 'transparent', border: '6px solid var(--slate-900)', borderTop: isTalking ? '6px solid var(--slate-900)' : 'none', borderRadius: isTalking ? '20px' : '0 0 30px 30px', transition: 'all 0.1s ease-in-out', animation: isTalking ? 'talk 0.25s infinite' : 'none' }}></div>
        <div style={{ position: 'absolute', width: '35px', height: '18px', background: '#FFE4E6', borderRadius: '50%', top: '65%', left: '15%' }}></div>
        <div style={{ position: 'absolute', width: '35px', height: '18px', background: '#FFE4E6', borderRadius: '50%', top: '65%', right: '15%' }}></div>
      </div>
    </div>
  )
}

// --- DATASETS ---
const SOCIAL_STORIES = [
  { id: 'sharing', title: 'Sharing', taTitle: 'பகிர்வு', color: '#8B5CF6', videoUrl: "https://player.vimeo.com/video/146051515?autoplay=1", type: 'vimeo', steps: [{ img: '🧸', text: 'Friend wants toy.', taText: 'நண்பர் பொம்மை வேண்டும்.' }, { img: '🤝', text: 'I give the toy.', taText: 'நான் கொடுக்கிறேன்.' }, { img: '😊', text: 'Both are happy!', taText: 'இருவரும் மகிழ்ச்சி!' }], checkQuestion: 'Is this sharing?', taCheckQuestion: 'இது பகிர்தலா?', correctAnswer: true },
  { id: 'greeting', title: 'Greetings', taTitle: 'வாழ்த்துக்கள்', color: '#10B981', videoUrl: "https://player.vimeo.com/video/336214228?autoplay=1", type: 'vimeo', steps: [{ img: '👋', text: 'See a new friend.', taText: 'புதிய நண்பரைப் பார்க்கவும்.' }, { img: '😊', text: 'Smile at them.', taText: 'அவர்களைப் பார்த்து புன்னகைக்கவும்.' }, { img: '🗣️', text: 'Say Hello!', taText: 'வணக்கம் சொல்லுங்கள்!' }], checkQuestion: 'Is it good to say Hello?', taCheckQuestion: 'வணக்கம் சொல்வது நல்லதா?', correctAnswer: true },
  { id: 'help', title: 'Asking Help', taTitle: 'உதவி கேட்பது', color: '#F472B6', videoUrl: "https://www.youtube-nocookie.com/embed/8-W75Lly9nQ", type: 'youtube', steps: [{ img: '🆘', text: 'I need help.', taText: 'எனக்கு உதவி தேவை.' }, { img: '🗣️', text: 'I use my words.', taText: 'நான் என் வார்த்தைகளைப் பயன்படுத்துகிறேன்.' }, { img: '🙌', text: 'Help is here!', taText: 'உதவி கிடைத்துவிட்டது!' }], checkQuestion: 'Should we ask for help?', taCheckQuestion: 'நாம் உதவி கேட்க வேண்டுமா?', correctAnswer: true },
  { id: 'listening', title: 'Listening', taTitle: 'கவனித்தல்', color: '#38BDF8', videoUrl: "https://www.youtube-nocookie.com/embed/fA_Z6H00W4A", type: 'youtube', steps: [{ img: '👂', text: 'Teacher is talking.', taText: 'ஆசிரியர் பேசுகிறார்.' }, { img: '🤫', text: 'I stay quiet.', taText: 'நான் அமைதியாக இருக்கிறேன்.' }, { img: '🧠', text: 'I understand.', taText: 'எனக்குப் புரிகிறது.' }], checkQuestion: 'Is it good to listen?', taCheckQuestion: 'கவனிப்பது நல்லதா?', correctAnswer: true },
  { id: 'turns', title: 'Taking Turns', taTitle: 'முறை எடுப்பது', color: '#F59E0B', videoUrl: "https://www.youtube-nocookie.com/embed/mH_M8T7BwZg", type: 'youtube', steps: [{ img: '⏳', text: 'Waiting for my turn.', taText: 'எனது முறைக்காக காத்திருக்கிறேன்.' }, { img: '🎲', text: 'Now it is my turn!', taText: 'இப்போது எனது முறை!' }, { img: '😄', text: 'Fair play!', taText: 'நேர்மையான விளையாட்டு!' }], checkQuestion: 'Is waiting important?', taCheckQuestion: 'காத்திருப்பது முக்கியமா?', correctAnswer: true },
  { id: 'manners', title: 'Manners', taTitle: 'மரியாதை', color: '#8B5CF6', videoUrl: "https://www.youtube-nocookie.com/embed/6pGf_tE_yOk", type: 'youtube', steps: [{ img: '🍪', text: 'I want a cookie.', taText: 'எனக்கு ஒரு குக்கீ வேண்டும்.' }, { img: '🙏', text: 'I say Please.', taText: 'நான் தயவுசெய்து என்று சொல்கிறேன்.' }, { img: '😋', text: 'I say Thank You.', taText: 'நான் நன்றி சொல்கிறேன்.' }], checkQuestion: 'Are manners good?', taCheckQuestion: 'மரியாதை நல்லதா?', correctAnswer: true }
]

const PLAYGROUND_SCENARIOS = [
  { q: "Your friend is sad. What should you do?", taQ: "உங்கள் நண்பர் சோகமாக இருக்கிறார். நீங்கள் என்ன செய்ய வேண்டும்?", options: [{ t: "Give a Hug", ta: "கட்டிப்பிடிக்கவும்", icon: '🫂' }, { t: "Say Hello", ta: "வணக்கம் சொல்லுங்கள்", icon: '👋' }] },
  { q: "A friend wants to play with your ball. What do you say?", taQ: "ஒரு நண்பர் உங்கள் பந்துடன் விளையாட விரும்புகிறார். நீங்கள் என்ன சொல்கிறீர்கள்?", options: [{ t: "Let's share!", ta: "பகிர்ந்து கொள்வோம்!", icon: '⚽' }, { t: "No way", ta: "வாய்ப்பே இல்லை", icon: '❌' }] }
]

const SURVIVAL_STEPS = [
  { q: "If you are lost, who do you find?", taQ: "நீங்கள் வழிதவறிவிட்டால், யாரைக் கண்டுபிடிப்பீர்கள்?", options: [{ t: "Police/Security", ta: "போலீஸ்/பாதுகாப்பு", icon: '👮' }, { t: "A Dog", ta: "ஒரு நாய்", icon: '🐕' }] },
  { q: "What is your emergency phone number?", taQ: "உங்கள் அவசர தொலைபேசி எண் என்ன?", options: [{ t: "100 / Parents", ta: "100 / பெற்றோர்கள்", icon: '📞' }, { t: "1234", ta: "1234", icon: '🔢' }] }
]

const VOICE_BUDDY_STEPS = [
  { id: '1', q: "Hello! I am Aayu. What is your name?", taQ: "வணக்கம்! நான் ஆயு. உங்கள் பெயர் என்ன?", response: "What a nice name!" },
  { id: '2', q: "How are you feeling today?", taQ: "இன்று நீங்கள் எப்படி உணர்கிறீர்கள்?", response: "I am happy to hear that!" },
  { id: '3', q: "What is your favorite color?", taQ: "உங்களுக்கு பிடித்த நிறம் எது?", response: "That's a beautiful color!" },
  { id: '4', q: "Cool! Do you like animals?", taQ: "அற்புதம்! உங்களுக்கு விலங்குகள் பிடிக்குமா?", response: "Animals are so friendly!" },
  { id: '5', q: "Which animal is your favorite?", taQ: "உங்களுக்கு பிடித்த விலங்கு எது?", response: "Wow! I love that animal too!" },
  { id: '6', q: "Can we be best friends?", taQ: "நாம் சிறந்த நண்பர்களாக இருக்கலாமா?", response: "Yay! Best friends forever!" },
  { id: '7', q: "Thank you for chatting! See you soon!", taQ: "பேசியதற்கு நன்றி! விரைவில் சந்திப்போம்!", response: "Goodbye friend!" }
]

function CommunicationModule() {
  const navigate = useNavigate();
  const { language, toggleLanguage } = useLanguage()
  const [currentLevel, setCurrentLevel] = useState(null)
  const [targetItem, setTargetItem] = useState(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [isChecking, setIsChecking] = useState(false)
  const [queue, setQueue] = useState([])
  const [levelComplete, setLevelComplete] = useState(false)
  const [isTalking, setIsTalking] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [userName, setUserName] = useState('')
  const [showVideo, setShowVideo] = useState(false)
  const recognitionRef = useRef(null)

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.lang = language === 'ta' ? 'ta-IN' : 'en-US'
      recognitionRef.current.onresult = (event) => {
        const result = event.results[0][0].transcript
        setTranscript(result)
        handleVoiceInput(result)
      }
      recognitionRef.current.onend = () => setIsListening(false)
    }
  }, [language, currentLevel, currentStep, queue, userName])

  const speak = (text, onComplete) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = language === 'ta' ? 'ta-IN' : 'en-US'
      utterance.rate = 1.0
      utterance.onstart = () => setIsTalking(true)
      utterance.onend = () => { setIsTalking(false); if (onComplete) onComplete(); }
      window.speechSynthesis.speak(utterance)
    }
  }

  const handleVoiceInput = (text) => {
    if (currentLevel === 5) {
      if (currentStep === 0) setUserName(text)
      const currentTarget = queue[currentStep]
      speak(language === 'ta' ? `அற்புதம்! ${currentTarget.response}` : `Awesome! ${currentTarget.response}`, () => {
        if (currentStep < queue.length - 1) {
          const nextStep = currentStep + 1
          setCurrentStep(nextStep)
          setTargetItem(queue[nextStep])
          setTranscript('')
          const personalPrefix = userName && nextStep > 0 ? (language === 'ta' ? `${userName}, ` : `${userName}, `) : ''
          speak(personalPrefix + (language === 'ta' ? queue[nextStep].taQ : queue[nextStep].q))
        } else { setLevelComplete(true) }
      })
    }
  }

  const startLevel = (level) => {
    setCurrentLevel(level)
    setLevelComplete(false)
    setIsChecking(false)
    setShowVideo(false)
    setCurrentStep(0)
    let initialQueue = []
    if (level === 1) initialQueue = [...SOCIAL_STORIES]
    else if (level === 2) initialQueue = [...PLAYGROUND_SCENARIOS]
    else if (level === 3) initialQueue = [...SURVIVAL_STEPS]
    else if (level === 4) initialQueue = [{ q: "Let's practice a video call! Can you smile at the camera?", taQ: "வீடியோ அழைப்பைப் பயிற்சி செய்வோம்! கேமராவைப் பார்த்து புன்னகைக்க முடியுமா?" }]
    else if (level === 5) initialQueue = [...VOICE_BUDDY_STEPS]
    setQueue(initialQueue)
    setTargetItem(initialQueue[0])
    speak(language === 'ta' ? (initialQueue[0].taQ || initialQueue[0].steps?.[0]?.taText) : (initialQueue[0].q || initialQueue[0].steps?.[0]?.text))
  }

  const nextRound = () => {
    const next = queue.slice(1)
    if (next.length > 0) {
      setQueue(next)
      setTargetItem(next[0])
      setCurrentStep(0)
      setIsChecking(false)
      setShowVideo(false)
      speak(language === 'ta' ? (next[0].taQ || next[0].steps?.[0]?.taText) : (next[0].q || next[0].steps?.[0]?.text))
    } else { setLevelComplete(true) }
  }

  const renderGame = () => {
    if (currentLevel === 1) return (
      <div className="animate-slide-up" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px', width: '100%' }}>
         {!isChecking ? (
           <>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
              <button onClick={() => setShowVideo(false)} className="btn-pop bento-card" style={{ padding: '12px 32px', background: !showVideo ? 'var(--p-500)' : 'white', color: !showVideo ? 'white' : 'var(--slate-600)', fontWeight: 800 }}>STORY MODE</button>
              <button onClick={() => { setShowVideo(true); speak(language === 'ta' ? "கார்ட்டூன் பாடத்தைப் பாருங்கள்!" : "Watch the cartoon lesson!"); }} className="btn-pop bento-card" style={{ padding: '12px 32px', background: showVideo ? 'var(--s-500)' : 'white', color: showVideo ? 'white' : 'var(--slate-600)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}><Video size={20} /> WATCH LESSON</button>
            </div>
            
            {showVideo ? (
              <div style={{ width: '100%', height: '450px', borderRadius: '40px', overflow: 'hidden', border: '12px solid var(--p-400)', boxShadow: '0 40px 80px rgba(0,0,0,0.1)' }}>
                <iframe width="100%" height="100%" src={targetItem.videoUrl} title="Cartoon Lesson" frameBorder="0" allow="autoplay; fullscreen" allowFullScreen></iframe>
              </div>
            ) : (
              <div style={{ fontSize: '15rem' }}>{targetItem.steps[currentStep].img}</div>
            )}

            <div className="bento-card" style={{ padding: '32px 64px', background: 'white', width: '100%' }}>
              <h2 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--slate-900)' }}>{language === 'ta' ? targetItem.steps[currentStep].taText : targetItem.steps[currentStep].text}</h2>
            </div>
            
            <button onClick={() => { if (currentStep < targetItem.steps.length - 1) { setCurrentStep(prev => prev + 1); speak(language === 'ta' ? targetItem.steps[currentStep+1].taText : targetItem.steps[currentStep+1].text); } else { setIsChecking(true); speak(language === 'ta' ? targetItem.taCheckQuestion : targetItem.checkQuestion); } }} className="btn-neon" style={{ background: targetItem.color, padding: '24px 100px', fontSize: '2rem' }}>NEXT STEP ➔</button>
           </>
         ) : (
           <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '48px' }}>
            <Aayu3D isTalking={isTalking} size={350} />
            <h2 style={{ fontSize: '3.5rem', fontWeight: 800 }}>{language === 'ta' ? targetItem.taCheckQuestion : targetItem.checkQuestion}</h2>
            <div style={{ display: 'flex', gap: '32px' }}>
               <button onClick={() => { speak("Perfect!"); setTimeout(nextRound, 1500); }} className="btn-pop bento-card" style={{ padding: '48px 80px', background: 'var(--s-100)', border: '6px solid var(--s-500)', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}><Smile size={80} color="var(--s-500)" /><span style={{ fontWeight: 800, fontSize: '2rem', color: 'var(--s-500)' }}>YES</span></button>
               <button onClick={() => { speak("Try again!"); setIsChecking(false); setCurrentStep(0); }} className="btn-pop bento-card" style={{ padding: '48px 80px', background: '#FEE2E2', border: '6px solid #EF4444', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}><XCircle size={80} color="#EF4444" /><span style={{ fontWeight: 800, fontSize: '2rem', color: '#EF4444' }}>NO</span></button>
            </div>
           </div>
         )}
      </div>
    )

    if (currentLevel === 2 || currentLevel === 3) return (
      <div className="animate-slide-up" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '64px', width: '100%' }}>
        <Aayu3D isTalking={isTalking} size={300} />
        <h2 style={{ fontSize: '3.2rem', fontWeight: 800 }}>{language === 'ta' ? targetItem.taQ : targetItem.q}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', width: '100%' }}>
          {targetItem.options.map((opt, i) => (
            <button key={i} onClick={() => { speak(language === 'ta' ? `அற்புதம்! ${opt.ta}` : `Great! ${opt.t}`); setTimeout(nextRound, 2000); }} className="btn-pop bento-card" style={{ padding: '64px', background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              <span style={{ fontSize: '6rem' }}>{opt.icon}</span>
              <span style={{ fontWeight: 800, fontSize: '2rem' }}>{language === 'ta' ? opt.ta : opt.t}</span>
            </button>
          ))}
        </div>
      </div>
    )

    if (currentLevel === 4) return (
      <div className="animate-slide-up" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '64px', width: '100%' }}>
        <div className="bento-card" style={{ width: '100%', height: '500px', background: 'black', position: 'relative', overflow: 'hidden', border: '16px solid var(--p-500)' }}>
          <div style={{ position: 'absolute', top: '30px', right: '30px', width: '150px', height: '200px', background: '#111', borderRadius: '30px', border: '4px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', zIndex: 10 }}>SELF</div>
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Aayu3D isTalking={isTalking} size={400} /></div>
        </div>
        <h2 style={{ fontSize: '3rem', fontWeight: 800 }}>{language === 'ta' ? targetItem.taQ : targetItem.q}</h2>
        <button onClick={() => { speak("I see you! You have a great smile."); setTimeout(() => setLevelComplete(true), 3000); }} className="btn-neon" style={{ padding: '24px 100px', fontSize: '2rem' }}>I SMILED! 😊</button>
      </div>
    )

    if (currentLevel === 5) return (
      <div className="animate-slide-up" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '64px', width: '100%' }}>
        <Aayu3D isTalking={isTalking} isListening={isListening} size={350} />
        <div className="bento-card" style={{ padding: '48px', background: 'white', width: '100%', border: '8px solid var(--p-500)' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--slate-900)' }}>{userName && currentStep > 0 ? `${userName}, ` : ''}{language === 'ta' ? targetItem.taQ : targetItem.q}</h2>
        </div>
        {transcript && <div className="animate-slide-up" style={{ padding: '24px 60px', background: 'var(--s-100)', borderRadius: '100px', color: 'var(--s-500)', fontWeight: 800, fontSize: '2rem' }}>" {transcript} "</div>}
        <button onClick={() => { setTranscript(''); setIsListening(true); recognitionRef.current.start(); }} disabled={isListening || isTalking} className="btn-pop" style={{ width: '140px', height: '140px', borderRadius: '50%', background: isListening ? '#F43F5E' : 'var(--p-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: `0 20px 40px ${isListening ? 'rgba(244,63,94,0.4)' : 'rgba(139,92,246,0.4)'}` }}>
          {isListening ? <MicOff size={60} /> : <MicIcon size={60} />}
        </button>
      </div>
    )
  }

  return (
    <div className="playground-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="mesh-bg"></div>
      
      <style>{`
        .btn-pop { transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); cursor: pointer; border: none; }
        .btn-pop:hover { transform: translateY(-6px) scale(1.03); }
        .btn-pop:active { transform: scale(0.95); }
        .path-line { position: absolute; width: 12px; background: rgba(0,0,0,0.03); left: 50%; top: 0; bottom: 0; transform: translateX(-50%); z-index: 0; }
      `}</style>

      {/* Header */}
      <header style={{ padding: '32px 64px', display: 'flex', justifyContent: 'space-between', zIndex: 100 }}>
        <button onClick={() => navigate('/dashboard/patient')} className="btn-pop bento-card" style={{ padding: '16px 40px', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 800, fontSize: '1.2rem' }}>
          <ArrowLeft size={24} /> EXIT MODULE
        </button>
        <div style={{ display: 'flex', gap: '20px' }}>
          <button onClick={toggleLanguage} className="btn-pop bento-card" style={{ padding: '16px 40px', fontWeight: 800, fontSize: '1.2rem' }}>{language === 'en' ? 'தமிழ்' : 'English'}</button>
          <button onClick={() => setCurrentLevel(null)} className="btn-pop bento-card" style={{ padding: '16px 40px' }}><Map size={24} /></button>
        </div>
      </header>

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 64px 100px' }}>
        {currentLevel === null ? (
          <div className="animate-slide-up" style={{ textAlign: 'center', width: '100%', maxWidth: '1000px' }}>
            <h1 style={{ fontSize: '4.5rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '100px' }}>Communication Hero 🗣️</h1>
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '100px', alignItems: 'center' }}>
              <div className="path-line"></div>
              {[
                { lvl: 1, icon: BookOpen, title: 'Social Stories', color: '#8B5CF6' },
                { lvl: 2, icon: Smile, title: 'Playground Fun', color: '#10B981' },
                { lvl: 3, icon: ShieldAlert, title: 'Survival Skills', color: '#F472B6' },
                { lvl: 4, icon: Video, title: 'Live Video Call', color: '#F59E0B' },
                { lvl: 5, icon: MicIcon, title: 'Voice Buddy AI', color: '#38BDF8' }
              ].map((s, i) => (
                <div key={s.lvl} style={{ zIndex: 1, position: 'relative', transform: `translateX(${i % 2 === 0 ? '-220px' : '220px'})` }}>
                  <button onClick={() => startLevel(s.lvl)} className="btn-pop bento-card" style={{ width: '180px', height: '180px', borderRadius: '50px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <s.icon size={80} color={s.color} />
                  </button>
                  <div className="bento-card" style={{ position: 'absolute', top: '200px', left: '50%', transform: 'translateX(-50%)', padding: '12px 32px', fontWeight: 800, color: 'var(--slate-600)', whiteSpace: 'nowrap', background: 'white', borderRadius: '100px' }}>LEVEL {s.lvl}: {s.title}</div>
                </div>
              ))}
            </div>
          </div>
        ) : levelComplete ? (
          <div className="bento-card animate-slide-up" style={{ padding: '80px', textAlign: 'center', maxWidth: '700px' }}>
            <div style={{ fontSize: '15rem', marginBottom: '40px' }}>🏅</div>
            <h1 style={{ fontSize: '4.5rem', fontWeight: 800 }}>MODULE MASTER!</h1>
            <p style={{ fontSize: '1.8rem', fontWeight: 600, color: 'var(--slate-600)', marginBottom: '60px' }}>You are a communication superhero! You've learned how to talk, share, and play with friends.</p>
            <button onClick={() => setCurrentLevel(null)} className="btn-neon" style={{ padding: '24px 100px', fontSize: '1.8rem' }}>BACK TO WORLD MAP</button>
          </div>
        ) : (
          <div className="bento-card animate-slide-up" style={{ width: '100%', maxWidth: '1200px', padding: '80px', minHeight: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'white' }}>
            {renderGame()}
          </div>
        )}
      </main>
    </div>
  )
}

export default CommunicationModule
