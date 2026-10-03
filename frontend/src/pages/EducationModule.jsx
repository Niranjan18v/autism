import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, BookOpen, Map, Shapes, Hash, Type, Palette, Dog, ChevronRight, Star, Award, PlayCircle, Sparkles, Volume2, CheckCircle2, RotateCcw, Flame, Trophy, ThumbsUp } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'


// Web Audio Synth for rewarding educational chimes
const playAudioTone = (type = 'pop') => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    if (type === 'pop') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(540, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'success') {
      [523.25, 659.25, 783.99, 1046.50].forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, now + i * 0.08);
        gain.gain.setValueAtTime(0.2, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.3);
      });
    } else if (type === 'fanfare') {
      [440, 554.37, 659.25, 880, 1108.73].forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + i * 0.1);
        gain.gain.setValueAtTime(0.25, now + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.1);
        osc.stop(now + i * 0.1 + 0.4);
      });
    }
  } catch (e) {}
};

// --- PREMIUM AAYU TEACHER COMPONENT ---
const AayuTeacher = ({ isTalking, size = 250 }) => {
  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <style>{`
        @keyframes blink { 0%, 90%, 100% { transform: scaleY(1) } 95% { transform: scaleY(0.1) } }
        @keyframes talk { 0%, 100% { height: 10px; border-radius: 50% } 50% { height: 30px; border-radius: 15% } }
        @keyframes float-slow { 0%, 100% { transform: translateY(0) rotate(0deg) } 50% { transform: translateY(-20px) rotate(2deg) } }
        .aayu-premium { animation: float-slow 4s ease-in-out infinite; }
        .glow-aura { position: absolute; inset: -20px; background: radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%); border-radius: 50%; filter: blur(20px); }
      `}</style>
      <div className="glow-aura"></div>
      <div className="aayu-premium" style={{ width: '85%', height: '85%', background: 'white', borderRadius: '50%', border: '8px solid var(--slate-900)', boxShadow: '0 40px 80px rgba(0,0,0,0.15)', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 5 }}>
        {/* Academic Hat */}
        <div style={{ position: 'absolute', top: '-12%', width: '70%', height: '18%', background: 'var(--slate-800)', borderRadius: '8px', zIndex: 10, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}></div>
        <div style={{ position: 'absolute', top: '-20%', width: '95%', height: '28%', background: 'var(--slate-900)', borderRadius: '8px', transform: 'rotate(3deg)', zIndex: 9 }}>
           <div style={{ position: 'absolute', right: '8%', top: '40%', width: '6%', height: '80%', background: 'var(--s-500)', borderRadius: '4px' }}></div>
        </div>
        
        <div style={{ display: 'flex', gap: '22%', marginBottom: '8%', width: '100%', justifyContent: 'center' }}>
          <div style={{ width: '20%', aspectRatio: '1/1', background: 'var(--slate-900)', borderRadius: '50%', position: 'relative', animation: 'blink 4s infinite' }}><div style={{ width: '30%', height: '30%', background: 'white', borderRadius: '50%', position: 'absolute', top: '20%', left: '20%' }}></div></div>
          <div style={{ width: '20%', aspectRatio: '1/1', background: 'var(--slate-900)', borderRadius: '50%', position: 'relative', animation: 'blink 4s infinite' }}><div style={{ width: '30%', height: '30%', background: 'white', borderRadius: '50%', position: 'absolute', top: '20%', left: '20%' }}></div></div>
        </div>
        <div style={{ width: '12%', height: '7%', background: 'var(--slate-900)', borderRadius: '40%', marginBottom: '5%' }}></div>
        <div style={{ width: '28%', height: isTalking ? '18%' : '7%', background: isTalking ? '#F43F5E' : 'transparent', border: `${Math.max(3, size * 0.025)}px solid var(--slate-900)`, borderTop: isTalking ? `${Math.max(3, size * 0.025)}px solid var(--slate-900)` : 'none', borderRadius: isTalking ? '22px' : '0 0 28px 28px', transition: 'all 0.1s ease-in-out', animation: isTalking ? 'talk 0.25s infinite' : 'none', zIndex: 6 }}></div>
        <div style={{ position: 'absolute', width: '22%', height: '12%', background: '#FFE4E6', borderRadius: '50%', top: '60%', left: '12%', opacity: 0.8, zIndex: 5 }}></div>
        <div style={{ position: 'absolute', width: '22%', height: '12%', background: '#FFE4E6', borderRadius: '50%', top: '60%', right: '12%', opacity: 0.8, zIndex: 5 }}></div>
      </div>
    </div>
  )
}

// --- DATASETS ---
const ALPHABET_DATA = [
  { id: 'A', letter: 'A', taLetter: 'அ', word: 'Apple', taWord: 'ஆப்பிள்', img: '🍎', color: '#EF4444' },
  { id: 'B', letter: 'B', taLetter: 'ஆ', word: 'Ball', taWord: 'பந்து', img: '⚽', color: '#8B5CF6' },
  { id: 'C', letter: 'C', taLetter: 'இ', word: 'Cat', taWord: 'பூனை', img: '🐱', color: '#F59E0B' },
  { id: 'D', letter: 'D', taLetter: 'ஈ', word: 'Dog', taWord: 'நாய்', img: '🐶', color: '#10B981' },
  { id: 'E', letter: 'E', taLetter: 'உ', word: 'Elephant', taWord: 'யானை', img: '🐘', color: '#38BDF8' },
  { id: 'F', letter: 'F', taLetter: 'ஊ', word: 'Fish', taWord: 'மீன்', img: '🐟', color: '#F472B6' }
]

const NUMBER_DATA = [
  { id: '1', num: '1', taNum: '௧', word: 'One', taWord: 'ஒன்று', img: '🍦', color: '#10B981' },
  { id: '2', num: '2', taNum: '௨', word: 'Two', taWord: 'இரண்டு', img: '🍒', color: '#F43F5E' },
  { id: '3', num: '3', taNum: '௩', word: 'Three', taWord: 'மூன்று', img: '🦖', color: '#8B5CF6' },
  { id: '4', num: '4', taNum: '௪', word: 'Four', taWord: 'நான்கு', img: '🍀', color: '#F59E0B' },
  { id: '5', num: '5', taNum: '௫', word: 'Five', taWord: 'ஐந்து', img: '⭐', color: '#38BDF8' },
  { id: '6', num: '6', taNum: '௬', word: 'Six', taWord: 'ஆறு', img: '🎲', color: '#F472B6' }
]

const COLOR_DATA = [
  { id: 'red', name: 'Red', taName: 'சிவப்பு', hex: '#EF4444' },
  { id: 'blue', name: 'Blue', taName: 'நீலம்', hex: '#3B82F6' },
  { id: 'green', name: 'Green', taName: 'பச்சை', hex: '#10B981' },
  { id: 'yellow', name: 'Yellow', taName: 'மஞ்சள்', hex: '#F59E0B' },
  { id: 'orange', name: 'Orange', taName: 'ஆரஞ்சு', hex: '#F97316' },
  { id: 'purple', name: 'Purple', taName: 'ஊதா', hex: '#8B5CF6' }
]

const ANIMAL_DATA = [
  { id: 'lion', name: 'Lion', taName: 'சிங்கம்', img: '🦁', sound: 'Roar!' },
  { id: 'elephant', name: 'Elephant', taName: 'யானை', img: '🐘', sound: 'Trumpet!' },
  { id: 'monkey', name: 'Monkey', taName: 'குரங்கு', img: '🐒', sound: 'Ooh Aah!' },
  { id: 'dog', name: 'Dog', taName: 'நாய்', img: '🐶', sound: 'Woof Woof!' },
  { id: 'cat', name: 'Cat', taName: 'பூனை', img: '🐱', sound: 'Meow!' },
  { id: 'bird', name: 'Bird', taName: 'பறவை', img: '🐦', sound: 'Tweet!' }
]

const SHAPE_DATA = [
  { id: 'circle', name: 'Circle', taName: 'வட்டம்', icon: '⭕' },
  { id: 'square', name: 'Square', taName: 'சதுரம்', icon: '⬜' },
  { id: 'triangle', name: 'Triangle', taName: 'முக்கோணம்', icon: '📐' },
  { id: 'star', name: 'Star', taName: 'நட்சத்திரம்', icon: '⭐' },
  { id: 'heart', name: 'Heart', taName: 'இதயம்', icon: '❤️' },
  { id: 'diamond', name: 'Diamond', taName: 'வைரம்', icon: '💎' }
]

function EducationModule() {
  const navigate = useNavigate();
  const { language, toggleLanguage } = useLanguage()
  const [currentLevel, setCurrentLevel] = useState(null)
  const [targetItem, setTargetItem] = useState(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [queue, setQueue] = useState([])
  const [levelComplete, setLevelComplete] = useState(false)
  const [isTalking, setIsTalking] = useState(false)
  const [stars, setStars] = useState(120)
  const [answeredCorrect, setAnsweredCorrect] = useState(false)
  const [quizOptions, setQuizOptions] = useState([])

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

  const startLevel = (level) => {
    setCurrentLevel(level)
    setLevelComplete(false)
    let initialQueue = []
    if (level === 1) initialQueue = [...ALPHABET_DATA]
    else if (level === 2) initialQueue = [...NUMBER_DATA]
    else if (level === 3) initialQueue = [...COLOR_DATA]
    else if (level === 4) initialQueue = [...ANIMAL_DATA]
    else if (level === 5) initialQueue = [...SHAPE_DATA]
    setQueue(initialQueue)
    generateRound(initialQueue, level)
  }

  const generateRound = (currentQueue, level) => {
    if (currentQueue.length === 0) {
      setLevelComplete(true);
      playAudioTone('fanfare');
      return;
    }
    const target = currentQueue[0]
    setTargetItem(target)
    setAnsweredCorrect(false)
    playAudioTone('pop');
    
    // Pick 2 random distractors for 3-choice interactive quiz
    const allItems = level === 1 ? ALPHABET_DATA : level === 2 ? NUMBER_DATA : level === 3 ? COLOR_DATA : level === 4 ? ANIMAL_DATA : SHAPE_DATA;
    const others = allItems.filter(i => (i.id || i.name) !== (target.id || target.name));
    const shuffledOthers = [...others].sort(() => 0.5 - Math.random()).slice(0, 2);
    const choices = [target, ...shuffledOthers].sort(() => 0.5 - Math.random());
    setQuizOptions(choices);

    let text = ""
    const currentLvl = level || currentLevel
    if (language === 'ta') {
      if (currentLvl === 1) text = `${target.taLetter} என்றால் ${target.taWord}`
      else if (currentLvl === 2) text = `இது எண் ${target.taNum}. ${target.taWord}`
      else if (currentLvl === 3) text = `இது ${target.taName} நிறம்`
      else if (currentLvl === 4) text = `இது ${target.taName}`
      else if (currentLvl === 5) text = `இது ${target.taName}`
    } else {
      if (currentLvl === 1) text = `${target.letter} is for ${target.word}`
      else if (currentLvl === 2) text = `This is number ${target.num}. ${target.word}`
      else if (currentLvl === 3) text = `This is the color ${target.name}`
      else if (currentLvl === 4) text = `This is a ${target.name}. It goes ${target.sound}`
      else if (currentLvl === 5) text = `This shape is a ${target.name}`
    }
    
    speak(text)
  }

  const handleChoiceClick = (choice) => {
    const isMatch = (choice.id || choice.name) === (targetItem.id || targetItem.name);
    if (isMatch) {
      playAudioTone('success');
      setStars(s => s + 10);
      setAnsweredCorrect(true);
      speak(language === 'ta' ? 'அருமை! மிகச் சரி!' : 'Super job! That is correct!');
    } else {
      playAudioTone('pop');
      speak(language === 'ta' ? 'மீண்டும் முயற்சிக்கவும்!' : 'Try again hero!');
    }
  };

  const handleNext = () => {
    const next = queue.slice(1)
    setQueue(next)
    if (next.length > 0) generateRound(next)
    else setLevelComplete(true)
  }

  return (
    <div className="playground-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="mesh-bg"></div>
      
      <style>{`
        .btn-pop { transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); cursor: pointer; border: none; }
        .btn-pop:hover { transform: translateY(-6px) scale(1.03); }
        .btn-pop:active { transform: scale(0.95); }
        .academy-card { background: white; border-radius: 45px; transition: all 0.4s ease; border: 2px solid transparent; }
        .academy-card:hover { border-color: currentColor; box-shadow: 0 40px 80px rgba(0,0,0,0.1); }
        @keyframes float-slow { 0%, 100% { transform: translateY(0) rotate(0deg) } 50% { transform: translateY(-20px) rotate(2deg) } }
      `}</style>

      {/* Header with Star Badge */}
      <header style={{ padding: '24px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100 }}>
        <button onClick={() => navigate('/dashboard/patient')} className="btn-pop bento-card" style={{ padding: '12px 28px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 800, fontSize: '1.05rem', background: 'white' }}>
          <ArrowLeft size={20} /> {language === 'en' ? 'Exit Academy' : 'வெளியேறு'}
        </button>
        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          {/* Star Counter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 22px', borderRadius: '100px', background: '#FEF3C7', color: '#B45309', border: '1.5px solid #FDE68A', fontWeight: 900, fontSize: '1.1rem' }}>
            <Star size={20} fill="#F59E0B" color="#F59E0B" /> {stars} {language === 'en' ? 'Stars' : 'நட்சத்திரங்கள்'}
          </div>
          <button onClick={toggleLanguage} className="btn-pop bento-card" style={{ padding: '12px 28px', fontWeight: 800, fontSize: '1.05rem', background: 'white' }}>
            {language === 'en' ? 'தமிழ்' : 'English'}
          </button>
          <button onClick={() => setCurrentLevel(null)} className="btn-pop bento-card" style={{ padding: '12px 20px', background: 'white' }} title="Classes Map">
            <Map size={20} />
          </button>
        </div>
      </header>

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 64px 100px' }}>
        {currentLevel === null ? (
          <div className="animate-slide-up" style={{ textAlign: 'center', width: '100%', maxWidth: '1000px' }}>
            <h1 style={{ fontSize: '3.6rem', fontWeight: 900, color: 'var(--slate-900)', marginBottom: '50px', letterSpacing: '-1.5px' }}>Smart Hero Academy 🏫</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {[
                { lvl: 1, icon: Type, t: 'Alphabet', c: '#8B5CF6', bg: 'linear-gradient(135deg, #8B5CF6, #C084FC)' },
                { lvl: 2, icon: Hash, t: 'Numbers', c: '#10B981', bg: 'linear-gradient(135deg, #10B981, #34D399)' },
                { lvl: 3, icon: Palette, t: 'Colors', c: '#F59E0B', bg: 'linear-gradient(135deg, #F59E0B, #FBBF24)' },
                { lvl: 4, icon: Dog, t: 'Animals', c: '#F472B6', bg: 'linear-gradient(135deg, #F472B6, #FB923C)' },
                { lvl: 5, icon: Shapes, t: 'Shapes', c: '#38BDF8', bg: 'linear-gradient(135deg, #38BDF8, #818CF8)' }
              ].map(s => (
                <button key={s.lvl} onClick={() => startLevel(s.lvl)} className="btn-pop academy-card" style={{ padding: '32px', color: s.c, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', borderRadius: '32px' }}>
                  <div style={{ width: '90px', height: '90px', borderRadius: '28px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: `0 15px 30px ${s.c}30` }}>
                    <s.icon size={44} strokeWidth={2.5} />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <span style={{ fontWeight: 900, fontSize: '1.8rem', color: 'var(--slate-900)', display: 'block', marginBottom: '4px' }}>{s.t}</span>
                    <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--slate-400)', textTransform: 'uppercase', letterSpacing: '1px' }}>Mission Ready</span>
                  </div>
                </button>
              ))}
              <div className="bento-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.4)', border: '4px dashed var(--slate-200)', borderRadius: '32px' }}>
                 <Award size={50} color="var(--slate-300)" />
                 <p style={{ fontWeight: 800, color: 'var(--slate-400)', marginTop: '16px', fontSize: '1.2rem' }}>More Classes Coming!</p>
              </div>
            </div>
          </div>
        ) : levelComplete ? (
          <div className="bento-card animate-slide-up" style={{ padding: '100px', textAlign: 'center', maxWidth: '800px', background: 'white' }}>
            <div style={{ fontSize: '18rem', marginBottom: '40px', animation: 'float-slow 4s infinite' }}>🏆</div>
            <h1 style={{ fontSize: '5rem', fontWeight: 900, color: 'var(--slate-900)', letterSpacing: '-2px' }}>ACADEMY MASTER!</h1>
            <p style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--slate-600)', marginBottom: '80px', lineHeight: 1.5 }}>Incredible work, Hero! You've completed every mission in this lesson. Your brain power has increased! 🧠✨</p>
            <button onClick={() => setCurrentLevel(null)} className="btn-neon" style={{ padding: '24px 120px', fontSize: '2rem' }}>BACK TO CLASSES</button>
          </div>
        ) : (
          <div className="animate-slide-up" style={{ width: '100%', maxWidth: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '60px' }}>
            <div style={{ display: 'flex', gap: '32px', width: '100%', justifyContent: 'center' }}>
               <div className="bento-card" style={{ padding: '20px 60px', borderRadius: '100px', background: 'var(--slate-900)', color: 'white', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                  <Award fill="var(--s-500)" color="var(--s-500)" size={32} />
                  <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>{["Alphabet", "Numbers", "Colors", "Animals", "Shapes"][currentLevel-1]}</h2>
               </div>
               <div className="bento-card" style={{ padding: '20px 40px', borderRadius: '100px', background: 'white', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <PlayCircle size={28} color="var(--p-500)" />
                  <span style={{ fontWeight: 800, fontSize: '1.4rem', color: 'var(--slate-600)' }}>Lesson 0{currentStep + 1}</span>
               </div>
            </div>
            
            <div className="bento-card" style={{ width: '100%', padding: '50px 60px', borderRadius: '60px', background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px', position: 'relative' }}>
               <div style={{ position: 'absolute', top: '30px', right: '30px' }}><Sparkles size={36} color="var(--p-200)" /></div>
               
               <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', gap: '80px' }}>
                  <AayuTeacher isTalking={isTalking} size={220} />
                  
                  <div key={targetItem?.id} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                     <div style={{ fontSize: '10rem', lineHeight: 1, filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))', animation: 'float-slow 6s infinite' }}>{targetItem?.img || targetItem?.icon || targetItem?.letter || targetItem?.num}</div>
                     
                     {currentLevel === 3 && (
                       <div style={{ width: '100px', height: '100px', borderRadius: '30px', background: targetItem.hex, border: '8px solid white', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', marginTop: '-10px', zIndex: 10 }}></div>
                     )}

                     <div className="bento-card" style={{ padding: '16px 48px', background: 'var(--slate-50)', border: '4px solid var(--slate-100)', borderRadius: '30px' }}>
                        <h2 style={{ fontSize: '3rem', fontWeight: 900, margin: 0, color: 'var(--slate-900)', letterSpacing: '-1px' }}>{language === 'ta' ? (targetItem?.taWord || targetItem?.taName || targetItem?.taLetter || targetItem?.taNum) : (targetItem?.word || targetItem?.name || targetItem?.letter || targetItem?.num)}</h2>
                     </div>
                  </div>
               </div>

               <button onClick={handleNext} className="btn-neon" style={{ background: ["#8B5CF6", "#10B981", "#F59E0B", "#F472B6", "#38BDF8"][currentLevel-1], padding: '18px 80px', fontSize: '1.4rem', borderRadius: '25px', marginTop: '10px' }}>NEXT LESSON ➔</button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default EducationModule
