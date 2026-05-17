import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, Smile, MessageCircle, Gamepad2, Award, Star, Rocket, Sparkles,
  User, ClipboardList, CheckCircle, Video, Play, Phone, ArrowLeft, X, Check, Trophy, MousePointer2, RefreshCcw, ImageIcon,LayoutDashboard, Settings, LogOut, ChevronRight, Calendar, ShieldCheck, Heart
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [sparkles, setSparkles] = useState([]);
  const [starsEarned, setStarsEarned] = useState(120);
  const [childLevel, setChildLevel] = useState(localStorage.getItem('childLevel') || 1);
  const [activeGame, setActiveGame] = useState(null);
  const [gameScore, setGameScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Game Specific State
  const [bubbles, setBubbles] = useState([]);
  const [fallingItems, setFallingItems] = useState([]);
  const [mascotPos, setMascotPos] = useState(50); 
  const [gameTimer, setGameTimer] = useState(30);
  const [isGameRunning, setIsGameRunning] = useState(false);

  // Multi-Image Jigsaw Puzzle State
  const [puzzleBoard, setPuzzleBoard] = useState([]); 
  const [puzzleTray, setPuzzleTray] = useState([]); 
  const [heldPiece, setHeldPiece] = useState(null);
  const [puzzleImageIndex, setPuzzleImageIndex] = useState(0);
  
  const puzzleImages = [
    "/elephant_clean.png", 
    "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=1000"
  ];

  const jigsawShape = "polygon(0% 20%, 40% 20%, 40% 0%, 60% 0%, 60% 20%, 100% 20%, 100% 40%, 120% 40%, 120% 60%, 100% 60%, 100% 100%, 60% 100%, 60% 120%, 40% 120%, 40% 100%, 0% 100%, 0% 60%, -20% 60%, -20% 40%, 0% 40%)";

  const [behaviorLogs, setBehaviorLogs] = useState([
    { id: 1, text: 'Slept Well', ta: 'நன்றாக உறங்கினார்', done: false, icon: '😴' },
    { id: 2, text: 'Ate Healthy Food', ta: 'சத்தான உணவு உண்டார்', done: false, icon: '🍎' },
    { id: 3, text: 'Expressed Emotions', ta: 'உணர்ச்சிகளை வெளிப்படுத்தினார்', done: false, icon: '😊' },
    { id: 4, text: 'Followed Routine', ta: 'வழக்கமான முறையைப் பின்பற்றினார்', done: false, icon: '🕒' }
  ]);

  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'doctor', text: 'Hello! How is Arjun doing with the emotion game today?', time: '09:00 AM' }
  ]);

  const [plannerTasks, setPlannerTasks] = useState([
    { id: 1, time: '09:00 AM', mission: 'Emotion Match', ta: 'உணர்ச்சி பொருத்தம்', category: 'Social', done: true, icon: '🎭' },
    { id: 2, time: '11:30 AM', mission: 'Alphabet Academy', ta: 'அகரவரிசை அகாடமி', category: 'Education', done: false, icon: '📚' },
    { id: 3, time: '04:00 PM', mission: 'Sensory Bubble Pop', ta: 'சென்சரி குமிழி பாப்', category: 'Sensory', done: false, icon: '🧼' },
    { id: 4, time: '07:30 PM', mission: 'Voice Buddy AI', ta: 'வாய்ஸ் படி AI', category: 'Communication', done: false, icon: '🗣️' }
  ]);

  const togglePlannerTask = (id) => {
    setPlannerTasks(prev => prev.map(t => {
      if (t.id === id) {
        if (!t.done) {
          setStarsEarned(s => s + 25);
          setSparkles(p => [...p, { id: Date.now(), x: window.innerWidth/2, y: window.innerHeight/2, color: 'var(--s-500)', size: 40 }]);
        }
        return { ...t, done: !t.done };
      }
      return t;
    }));
  };

  // Game Loops
  useEffect(() => {
    let interval;
    if (isGameRunning && (activeGame === 'sensory' || activeGame === 'emotion' || activeGame === 'word')) {
      interval = setInterval(() => {
        if (activeGame === 'sensory') {
          setBubbles(prev => {
            const newBubbles = prev.map(b => ({
              ...b,
              top: b.top - b.speed,
              left: b.left + Math.sin(b.top / 20) * 2
            })).filter(b => b.top > -50);
            
            if (newBubbles.length < 8 && Math.random() > 0.7) {
              newBubbles.push({
                id: Date.now(),
                left: Math.random() * 80 + 10,
                top: 100,
                speed: Math.random() * 1 + 0.5,
                size: Math.random() * 40 + 60,
                color: `hsl(${Math.random() * 360}, 70%, 70%)`,
                char: ['A', 'B', 'C', '1', '2', '3', '⭐', '🎈'][Math.floor(Math.random() * 8)]
              });
            }
            return newBubbles;
          });
        } else {
          setFallingItems(prev => {
            const newItems = prev.map(item => ({
              ...item,
              top: item.top + item.speed
            })).filter(item => {
              if (item.top > 80 && Math.abs(item.left - mascotPos) < 15) {
                setGameScore(s => s + (item.isGood ? 1 : -1));
                setStarsEarned(s => s + (item.isGood ? 2 : 0));
                return false;
              }
              return item.top < 100;
            });

            if (newItems.length < 5 && Math.random() > 0.8) {
              const isGood = Math.random() > 0.3;
              newItems.push({
                id: Date.now(),
                left: Math.random() * 90 + 5,
                top: -10,
                speed: Math.random() * 1 + 1,
                isGood,
                img: isGood ? ['😊', '🍎', '⭐', '🎈'][Math.floor(Math.random() * 4)] : ['😢', '🥦', '💣', '🌧️'][Math.floor(Math.random() * 4)]
              });
            }
            return newItems;
          });
        }

        setGameTimer(prev => {
          if (prev <= 1) {
            setIsGameRunning(false);
            setShowSuccess(true);
            return 0;
          }
          return prev - 0.1;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isGameRunning, activeGame, mascotPos]);

  // Magic Star Trail
  const handleMouseMove = (e) => {
    if (Math.random() > 0.8) {
      const newSparkle = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        color: ['#8B5CF6', '#10B981', '#F472B6', '#38BDF8', '#FFF'][Math.floor(Math.random() * 5)],
        size: Math.random() * 10 + 10
      };
      setSparkles(prev => [...prev.slice(-15), newSparkle]);
      setTimeout(() => setSparkles(prev => prev.filter(s => s.id !== newSparkle.id)), 600);
    }
    if (activeGame === 'emotion' || activeGame === 'word') {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      setMascotPos(Math.max(5, Math.min(95, x)));
    }
  };

  const startLevelGame = (gameId, forceImgIndex = null) => {
    setActiveGame(gameId);
    setGameScore(0);
    setGameTimer(30);
    setIsGameRunning(gameId !== 'puzzle');
    setShowSuccess(false);
    setBubbles([]);
    setFallingItems([]);

    if (gameId === 'puzzle') {
      if (forceImgIndex !== null) setPuzzleImageIndex(forceImgIndex);
      const allPieces = [];
      for (let i = 0; i < 9; i++) {
        allPieces.push({ id: i, correctSlot: i });
      }
      const missingIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8].sort(() => Math.random() - 0.5).slice(0, 4);
      const board = allPieces.map(p => ({
        ...p,
        isFilled: !missingIndices.includes(p.id),
        pieceId: missingIndices.includes(p.id) ? null : p.id
      }));
      const tray = missingIndices.map(id => ({ id, correctSlot: id, rotation: Math.random() * 30 - 15 })).sort(() => Math.random() - 0.5);
      setPuzzleBoard(board);
      setPuzzleTray(tray);
      setHeldPiece(null);
    }
  };

  const handleTrayClick = (piece) => {
    setHeldPiece(piece);
  };

  const handleSlotClick = (slotIndex) => {
    if (!heldPiece) return;
    if (puzzleBoard[slotIndex].id === heldPiece.id) {
      const newBoard = [...puzzleBoard];
      newBoard[slotIndex].isFilled = true;
      newBoard[slotIndex].pieceId = heldPiece.id;
      setPuzzleBoard(newBoard);
      setPuzzleTray(prev => prev.filter(p => p.id !== heldPiece.id));
      setHeldPiece(null);
      setStarsEarned(s => s + 30);
      if (newBoard.every(s => s.isFilled)) {
        setTimeout(() => setShowSuccess(true), 800);
      }
    } else {
      setHeldPiece(null); 
    }
  };

  const popBubble = (id) => {
    setBubbles(prev => prev.filter(b => b.id !== id));
    setGameScore(s => s + 1);
    setStarsEarned(s => s + 2);
  };

  const toggleBehavior = (id) => {
    setBehaviorLogs(prev => prev.map(log => {
      if (log.id === id) {
        if (!log.done) setStarsEarned(prev => prev + 10);
        else setStarsEarned(prev => prev - 10);
        return { ...log, done: !log.done };
      }
      return log;
    }));
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: 'parent', text: chatInput, time: 'Now' }]);
    setChatInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'doctor', text: 'Thanks for the update! Keep up the work.', time: 'Now' }]);
    }, 1500);
  };

  const renderDashboard = () => (
    <div className="animate-slide-up">
      <div style={{ background: 'linear-gradient(135deg, #8B5CF6, #EC4899)', borderRadius: '40px', padding: '60px', color: 'white', marginBottom: '40px', position: 'relative', overflow: 'hidden', boxShadow: '0 30px 60px rgba(139, 92, 246, 0.3)' }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
           <h2 style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '12px', color: 'white' }}>{language === 'en' ? "Welcome Back, Hero! 🚀" : "மீண்டும் வருக, ஹீரோ! 🚀"}</h2>
           <p style={{ fontSize: '1.6rem', opacity: 0.9, fontWeight: 500 }}>{language === 'en' ? "You have 120 stars today. Ready for a new mission?" : "உங்களிடம் இன்று 120 நட்சத்திரங்கள் உள்ளன. புதிய பணிக்குத் தயாரா?"}</p>
        </div>
        <div style={{ position: 'absolute', right: '-40px', bottom: '-40px', fontSize: '18rem', opacity: 0.15, transform: 'rotate(-10deg)' }}>👦</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }}>
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '2.2rem', fontWeight: 800 }}>{language === 'en' ? "Learning Worlds" : "கற்றல் உலகங்கள்"}</h3>
            <button className="btn-neon" style={{ padding: '10px 24px', fontSize: '1.1rem' }}>View Map <ChevronRight size={18} /></button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            {[
              { id: 1, title: language === 'en' ? 'Smart Hero Academy' : 'ஸ்மார்ட் ஹீரோ அகாடமி', desc: 'Master Letters & Numbers!', icon: BookOpen, color: '#8B5CF6', path: '/activity/education', img: '🏫' },
              { id: 2, title: language === 'en' ? 'Emotion Explorer' : 'உணர்ச்சி ஆய்வாளர்', desc: 'Express Your Feelings!', icon: Smile, color: '#10B981', path: '/activity/emotion-matching', img: '🌈' },
              { id: 3, title: language === 'en' ? 'Communication Hero' : 'தொடர்பு ஹீரோ', desc: 'Talk & Play Together!', icon: MessageCircle, color: '#F472B6', path: '/activity/communication', img: '💬' }
            ].map(w => (
              <div key={w.id} onClick={() => navigate(w.path)} className="bento-card btn-pop" style={{ display: 'flex', alignItems: 'center', gap: '32px', padding: '32px' }}>
                <div style={{ width: '90px', height: '90px', background: `${w.color}15`, borderRadius: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: w.color }}>
                  <w.icon size={44} strokeWidth={2.5} />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '6px' }}>{w.title}</h4>
                  <p style={{ fontSize: '1.2rem', color: 'var(--slate-600)', fontWeight: 600 }}>{w.desc}</p>
                </div>
                <div style={{ fontSize: '5rem', opacity: 0.15, transform: 'rotate(15deg)' }}>{w.img}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );

  const renderGames = () => (
    <div className="animate-slide-up">
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
         <h2 style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '20px' }}>The Skills Universe 🌌</h2>
         <p style={{ fontSize: '1.6rem', color: 'var(--slate-600)', fontWeight: 600 }}>Explore interactive missions and earn exclusive hero stars!</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '48px' }}>
        {[
          { id: 'emotion', title: 'Aayu’s Emotion Catch', desc: 'Catch the happy clouds and build your mood!', img: '🎭', color: '#8B5CF6' },
          { id: 'sensory', title: 'Magic Bubble Pop', desc: 'Calming sensory popping with relaxing sounds.', img: '🧼', color: '#10B981' },
          { id: 'puzzle', title: 'Interlocking Jigsaw', desc: 'The professional tray-and-slot solving challenge.', img: '🧩', color: '#F472B6' },
          { id: 'word', title: 'Picture Word Lab', desc: 'Link images to words in this high-speed mission.', img: '🏷️', color: '#38BDF8' }
        ].map((game, i) => (
          <div key={i} className="bento-card btn-pop" style={{ padding: '60px', textAlign: 'center', position: 'relative' }}>
            <div style={{ width: '130px', height: '130px', background: `${game.color}15`, borderRadius: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '6rem', margin: '0 auto 40px' }}>{game.img}</div>
            <h3 style={{ fontSize: '2.6rem', fontWeight: 800, marginBottom: '16px' }}>{game.title}</h3>
            <p style={{ fontSize: '1.3rem', color: 'var(--slate-600)', fontWeight: 600, marginBottom: '40px', lineHeight: 1.6 }}>{game.desc}</p>
            <button onClick={() => startLevelGame(game.id)} className="btn-neon" style={{ background: game.color, padding: '18px 60px', fontSize: '1.3rem' }}>ENTER MISSION</button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGameOverlay = () => {
    if (!activeGame) return null;
    if (showSuccess) {
      return (
        <div className="overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.95)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px', backdropFilter: 'blur(30px)' }}>
          <div className="bento-card animate-slide-up" style={{ maxWidth: '700px', width: '100%', padding: '80px', textAlign: 'center', border: 'none' }}>
             <div style={{ fontSize: '12rem', marginBottom: '40px' }}>🎖️</div>
             <h2 style={{ fontSize: '4.5rem', fontWeight: 800, marginBottom: '20px', color: 'var(--p-500)' }}>FANTASTIC!</h2>
             <p style={{ fontSize: '1.8rem', fontWeight: 600, color: 'var(--slate-900)', marginBottom: '60px', lineHeight: 1.4 }}>Mission Accomplished! You are a true Hero! 🌟 <br/> Stars Earned: +50 ⭐</p>
             <button onClick={() => {
               if (activeGame === 'puzzle' && puzzleImageIndex < puzzleImages.length - 1) {
                 startLevelGame('puzzle', puzzleImageIndex + 1);
               } else {
                 setActiveGame(null);
               }
             }} className="btn-neon" style={{ padding: '24px 100px', borderRadius: '25px', fontSize: '1.8rem' }}>
               {activeGame === 'puzzle' && puzzleImageIndex < puzzleImages.length - 1 ? 'NEXT MISSION ⮕' : 'CLAIM STARS'}
             </button>
          </div>
        </div>
      );
    }

    return (
      <div className="overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.8)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px', backdropFilter: 'blur(15px)' }}>
        <div className="bento-card animate-slide-up" style={{ maxWidth: '1000px', width: '100%', height: '80vh', background: 'white', position: 'relative', overflow: 'hidden', padding: 0 }}>
          
          <div style={{ position: 'absolute', top: 30, left: 40, right: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100 }}>
            <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
               <div style={{ background: 'var(--slate-900)', color: 'white', padding: '14px 28px', borderRadius: '100px', fontWeight: 800, fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '14px', boxShadow: '0 15px 30px rgba(0,0,0,0.2)' }}>
                 <Star fill="var(--p-400)" color="var(--p-400)" size={28} /> {starsEarned} STARS
               </div>
               {activeGame === 'puzzle' && (
                  <button onClick={() => startLevelGame('puzzle', (puzzleImageIndex + 1) % puzzleImages.length)} className="btn-neon" style={{ background: 'var(--slate-100)', color: 'var(--p-600)', border: '2px solid var(--p-400)', boxShadow: 'none' }}>
                    <ImageIcon size={24} /> NEXT LEVEL
                  </button>
               )}
            </div>
            <button onClick={() => setActiveGame(null)} style={{ background: '#FEE2E2', border: 'none', padding: '18px', borderRadius: '50%', color: '#EF4444', cursor: 'pointer' }} className="btn-pop"><X size={32} /></button>
          </div>

          <div 
             style={{ height: 'calc(100% - 100px)', marginTop: '100px' }} 
             onMouseMove={handleMouseMove} 
             onTouchMove={(e) => handleMouseMove({ clientX: e.touches[0].clientX, currentTarget: e.currentTarget })}
          >
            {activeGame === 'puzzle' && (
              <div style={{ width: '100%', height: '100%', background: 'linear-gradient(to bottom, #38BDF8, #86EFAC)', borderRadius: '30px', padding: '24px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                {/* Background Decorative Elements */}
                <div style={{ position: 'absolute', bottom: -40, left: -40, fontSize: '20rem', opacity: 0.3 }}>🌳</div>
                <div style={{ position: 'absolute', bottom: -40, right: -40, fontSize: '20rem', opacity: 0.3 }}>🌲</div>
                <div style={{ position: 'absolute', top: 40, left: 100, fontSize: '8rem', opacity: 0.4 }}>☁️</div>
                <div style={{ position: 'absolute', top: 20, right: 150, fontSize: '10rem', opacity: 0.4 }}>☁️</div>
                
                {/* Top Header */}
                <div style={{ textAlign: 'center', zIndex: 10 }}>
                   <h2 style={{ fontSize: '3rem', fontWeight: 900, color: 'white', textShadow: '0 4px 0 #0284C7, 0 0 20px rgba(0,0,0,0.3)', margin: 0, letterSpacing: '3px', WebkitTextStroke: '2px #0369A1' }}>FUN JIGSAW: THE PARK</h2>
                   <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', margin: '16px 0 24px', fontWeight: 900, color: '#FEF08A', textShadow: '0 2px 0 #A16207', fontSize: '1.5rem' }}>
                      <span>SCORE: {gameScore * 150} PTS</span>
                      <span>{puzzleBoard.filter(p => p.isFilled).length}/9 PIECES</span>
                      <span>LEVEL: 3-1</span>
                   </div>
                </div>

                {/* Game Area */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '40px', flex: 1, zIndex: 10 }}>
                   
                   {/* Left Mascot */}
                   <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', alignSelf: 'flex-end', paddingBottom: '20px' }}>
                      <div style={{ fontSize: '12rem', animation: 'float-slow 3s infinite', filter: 'drop-shadow(0 20px 20px rgba(0,0,0,0.2))' }}>🦁</div>
                      <div style={{ background: '#FDE047', color: '#A16207', fontWeight: 900, padding: '8px 24px', borderRadius: '100px', border: '4px solid #CA8A04', fontSize: '1.2rem', marginTop: '-20px', zIndex: 2, boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}>LION</div>
                   </div>

                   {/* Puzzle Board */}
                   <div style={{ background: '#854D0E', border: '16px solid #713F12', borderRadius: '24px', padding: '8px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', position: 'relative' }}>
                      <div style={{ position: 'absolute', top: -30, left: '50%', transform: 'translateX(-50%)', background: '#FDE047', color: '#A16207', fontWeight: 900, padding: '8px 36px', borderRadius: '100px', border: '4px solid #CA8A04', fontSize: '1.5rem', boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}>PUZZLE</div>
                      <div style={{ 
                        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(3, 1fr)', width: '360px', height: '360px', background: 'rgba(0,0,0,0.5)', borderRadius: '8px', overflow: 'hidden'
                      }}>
                        {puzzleBoard.map((slot, i) => {
                          const x = (slot.id % 3) * -120;
                          const y = Math.floor(slot.id / 3) * -120;
                          return (
                            <div 
                              key={i}
                              onClick={() => handleSlotClick(i)}
                              style={{
                                background: slot.isFilled ? `url(${puzzleImages[puzzleImageIndex]})` : 'transparent',
                                backgroundSize: '360px 360px',
                                backgroundPosition: `${x}px ${y}px`,
                                border: '1px solid rgba(255,255,255,0.15)',
                                boxShadow: heldPiece && heldPiece.id === slot.id ? 'inset 0 0 0 6px #FDE047' : 'none',
                                cursor: slot.isFilled ? 'default' : 'pointer',
                                transition: 'all 0.2s',
                              }}
                            />
                          );
                        })}
                      </div>
                      <svg width="360" height="360" style={{ position: 'absolute', top: 8, left: 8, pointerEvents: 'none', zIndex: 10 }}>
                         <path d="M 0,120 L 45,120 C 35,145 85,145 75,120 L 165,120 C 155,95 205,95 195,120 L 285,120 C 275,145 325,145 315,120 L 360,120 M 0,240 L 45,240 C 35,215 85,215 75,240 L 165,240 C 155,265 205,265 195,240 L 285,240 C 275,215 325,215 315,240 L 360,240 M 120,0 L 120,45 C 145,35 145,85 120,75 L 120,165 C 95,155 95,205 120,195 L 120,285 C 145,275 145,325 120,315 L 120,360 M 240,0 L 240,45 C 215,35 215,85 240,75 L 240,165 C 265,155 265,205 240,195 L 240,285 C 215,275 215,325 240,315 L 240,360" fill="none" stroke="rgba(0,0,0,0.6)" strokeWidth="3" />
                         <path d="M 0,120 L 45,120 C 35,145 85,145 75,120 L 165,120 C 155,95 205,95 195,120 L 285,120 C 275,145 325,145 315,120 L 360,120 M 0,240 L 45,240 C 35,215 85,215 75,240 L 165,240 C 155,265 205,265 195,240 L 285,240 C 275,215 325,215 315,240 L 360,240 M 120,0 L 120,45 C 145,35 145,85 120,75 L 120,165 C 95,155 95,205 120,195 L 120,285 C 145,275 145,325 120,315 L 120,360 M 240,0 L 240,45 C 215,35 215,85 240,75 L 240,165 C 265,155 265,205 240,195 L 240,285 C 215,275 215,325 240,315 L 240,360" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" transform="translate(-1, -1)" />
                      </svg>
                   </div>

                   {/* Tray */}
                   <div style={{ background: '#854D0E', border: '16px solid #713F12', borderRadius: '24px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '408px', width: '160px', overflowY: 'auto', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', position: 'relative' }}>
                      <div style={{ position: 'absolute', top: -30, left: '50%', transform: 'translateX(-50%)', background: '#FDE047', color: '#A16207', fontWeight: 900, padding: '8px 36px', borderRadius: '100px', border: '4px solid #CA8A04', fontSize: '1.5rem', boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}>TRAY</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px', width: '100%', alignItems: 'center', paddingBottom: '16px' }}>
                        {puzzleTray.map((piece, i) => {
                          const x = (piece.id % 3) * -90;
                          const y = Math.floor(piece.id / 3) * -90;
                          return (
                            <div 
                              key={i}
                              onClick={() => handleTrayClick(piece)}
                              className="btn-pop"
                              style={{
                                width: '90px', height: '90px',
                                backgroundImage: `url(/elephant_clean.png)`,
                                backgroundSize: '270px 270px',
                                backgroundPosition: `${x}px ${y}px`,
                                border: heldPiece && heldPiece.id === piece.id ? '6px solid #FDE047' : '4px solid #38BDF8',
                                borderRadius: '16px',
                                cursor: 'pointer',
                                boxShadow: '0 10px 20px rgba(0,0,0,0.5)',
                                transform: heldPiece && heldPiece.id === piece.id ? 'scale(1.1)' : 'scale(1)',
                              }}
                            />
                          );
                        })}
                      </div>
                   </div>
                </div>

                {/* Bottom Buttons */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', zIndex: 10, paddingBottom: '16px' }}>
                   <button style={{ background: '#3B82F6', color: 'white', fontWeight: 900, fontSize: '1.6rem', padding: '12px 40px', borderRadius: '100px', border: '6px solid #1D4ED8', textShadow: '0 2px 0 #1E3A8A', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }} className="btn-pop"><span>❓</span> HELP</button>
                   <button onClick={() => setActiveGame(null)} style={{ background: '#EF4444', color: 'white', fontWeight: 900, fontSize: '1.6rem', padding: '12px 40px', borderRadius: '100px', border: '6px solid #B91C1C', textShadow: '0 2px 0 #7F1D1D', cursor: 'pointer' }} className="btn-pop">EXIT</button>
                   <button style={{ background: '#F59E0B', color: 'white', fontWeight: 900, fontSize: '1.6rem', padding: '12px 40px', borderRadius: '100px', border: '6px solid #B45309', textShadow: '0 2px 0 #78350F', cursor: 'pointer' }} className="btn-pop">PAUSE</button>
                   <button style={{ background: '#06B6D4', color: 'white', fontWeight: 900, fontSize: '1.6rem', padding: '12px 40px', borderRadius: '100px', border: '6px solid #0E7490', textShadow: '0 2px 0 #164E63', cursor: 'pointer' }} className="btn-pop">HINT</button>
                </div>
              </div>
            )}

            {activeGame === 'sensory' && (
              <div style={{ width: '100%', height: '100%', background: 'linear-gradient(to bottom, #ECFDF5, #D1FAE5)', position: 'relative' }}>
                 {bubbles.map(b => (
                  <div key={b.id} onClick={() => popBubble(b.id)} className="btn-pop" style={{ position: 'absolute', left: `${b.left}%`, top: `${b.top}%`, width: b.size, height: b.size, background: b.color, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: b.size / 2, boxShadow: 'inset -8px -8px 20px rgba(0,0,0,0.1), 0 20px 40px rgba(0,0,0,0.2)', border: '8px solid white', color: 'white', fontWeight: 800, opacity: 0.9, cursor: 'pointer' }}>{b.char}</div>
                ))}
              </div>
            )}
            {activeGame === 'emotion' && (
               <div style={{ width: '100%', height: '100%', background: 'linear-gradient(to bottom, #FFF7ED, #FFEDD5)', position: 'relative', overflow: 'hidden', borderRadius: '30px' }}>
                  <div style={{ position: 'absolute', top: '20px', left: '20px', fontSize: '1.5rem', fontWeight: 800, color: '#EA580C' }}>
                     Catch the Happy & Healthy things! Avoid the Sad & Bad things!
                  </div>
                  {fallingItems.map(item => (<div key={item.id} style={{ position: 'absolute', left: `${item.left}%`, top: `${item.top}%`, fontSize: '6rem', transition: 'top 0.05s linear' }}>{item.img}</div>))}
                  {/* Floor */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40px', background: '#FDBA74', borderTop: '6px solid #FB923C' }}></div>
                  {/* Catcher */}
                  <div style={{ position: 'absolute', left: `${mascotPos}%`, bottom: '20px', transform: 'translateX(-50%)', fontSize: '9rem', transition: 'left 0.1s ease-out', filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.2))' }}>👦</div>
               </div>
            )}
          </div>
        </div>
      </div>
    );
  };



  const renderPlanner = () => (
    <div className="animate-slide-up">
      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '40px' }}>
        <div className="bento-card" style={{ padding: '48px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
             <div>
               <h2 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '8px' }}>Hero Mission Planner 📅</h2>
               <p style={{ color: 'var(--slate-600)', fontWeight: 600, fontSize: '1.2rem' }}>Follow the path to earn the Mega Hero Badge!</p>
             </div>
             <div style={{ background: 'var(--s-100)', color: 'var(--s-500)', padding: '12px 32px', borderRadius: '100px', fontWeight: 900, fontSize: '1.2rem' }}>7 DAY STREAK! 🔥</div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {plannerTasks.map(task => (
              <div key={task.id} className="bento-card btn-pop" style={{ padding: '32px', background: task.done ? 'var(--s-50)' : 'white', display: 'flex', alignItems: 'center', gap: '32px', border: task.done ? '3px solid var(--s-500)' : '3px solid var(--slate-100)' }}>
                 <div style={{ fontSize: '3.5rem', opacity: task.done ? 0.5 : 1 }}>{task.icon}</div>
                 <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '4px' }}>
                       <span style={{ color: 'var(--slate-400)', fontWeight: 800, fontSize: '1.1rem' }}>🕒 {task.time}</span>
                       <span style={{ background: 'var(--p-100)', color: 'var(--p-500)', padding: '4px 12px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 800 }}>{task.category}</span>
                    </div>
                    <h4 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0, textDecoration: task.done ? 'line-through' : 'none', color: task.done ? 'var(--slate-400)' : 'var(--slate-900)' }}>{language === 'en' ? task.mission : task.ta}</h4>
                 </div>
                 <button onClick={() => togglePlannerTask(task.id)} className="btn-neon" style={{ background: task.done ? 'var(--s-500)' : 'var(--slate-900)', padding: '14px 32px', fontSize: '1.1rem' }}>
                    {task.done ? <><CheckCircle size={20} /> COMPLETED</> : 'START MISSION'}
                 </button>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
           <div className="bento-card" style={{ padding: '40px', background: 'var(--p-500)', color: 'white' }}>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '16px' }}>Mission Advice 🦉</h3>
              <p style={{ fontSize: '1.2rem', fontWeight: 600, lineHeight: 1.6, opacity: 0.9 }}>"Arjun, today's focus is on social greetings. Try to complete the 'Alphabet Academy' mission before lunch to unlock a new sticker!"</p>
              <div style={{ marginTop: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                 <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Star size={20} fill="white" /></div>
                 <span style={{ fontWeight: 800 }}>Reward: +100 Hero Stars</span>
              </div>
           </div>

           <div className="bento-card" style={{ padding: '40px', background: 'white' }}>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '24px' }}>Journey Roadmap</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                 {[
                   { label: 'Morning Ritual', done: true },
                   { label: 'School / Therapy', done: true },
                   { label: 'Playtime Hub', done: false },
                   { label: 'Evening Calm', done: false }
                 ].map((r, i) => (
                   <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ width: '12px', height: '12px', background: r.done ? 'var(--s-500)' : 'var(--slate-200)', borderRadius: '50%' }}></div>
                      <span style={{ fontWeight: 800, color: r.done ? 'var(--slate-900)' : 'var(--slate-400)', fontSize: '1.2rem' }}>{r.label}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="animate-slide-up" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div className="bento-card" style={{ padding: '80px', textAlign: 'center', background: 'white' }}>
        <div style={{ position: 'relative', width: '220px', height: '220px', margin: '0 auto 48px' }}>
          <div style={{ position: 'absolute', inset: -15, background: 'linear-gradient(135deg, var(--p-500), var(--s-500))', borderRadius: '80px', opacity: 0.15, filter: 'blur(20px)' }}></div>
          <div style={{ width: '100%', height: '100%', background: 'var(--slate-900)', borderRadius: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8rem', color: 'white', position: 'relative', zIndex: 2, boxShadow: '0 30px 60px rgba(0,0,0,0.1)' }}>
            <User size={100} strokeWidth={1.5} />
          </div>
          <div style={{ position: 'absolute', bottom: -10, right: -10, background: 'var(--s-500)', color: 'white', padding: '12px 24px', borderRadius: '100px', fontWeight: 900, fontSize: '1.1rem', zIndex: 10, border: '6px solid white' }}>VERIFIED</div>
        </div>

        <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '16px', color: 'var(--slate-900)', letterSpacing: '-1.5px' }}>Patient Clinical Profile</h2>
        <p style={{ fontSize: '1.4rem', color: 'var(--slate-400)', fontWeight: 700, marginBottom: '48px', textTransform: 'uppercase', letterSpacing: '2px' }}>Reference ID: #ATH-29401</p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '80px' }}>
           <div style={{ background: 'var(--s-50)', color: 'var(--s-500)', padding: '16px 40px', borderRadius: '100px', fontWeight: 800, fontSize: '1.2rem', border: '2px solid var(--s-500)' }}>CLINICAL GRADE: {childLevel === '1' ? 'A' : childLevel === '2' ? 'B' : 'C'}</div>
           <div style={{ background: 'var(--p-50)', color: 'var(--p-500)', padding: '16px 40px', borderRadius: '100px', fontWeight: 800, fontSize: '1.2rem', border: '2px solid var(--p-500)' }}>170 ACTIVITY CREDITS</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', textAlign: 'left' }}>
          {[
            { label: 'Legal Full Name', value: 'Arjun Ramakrishnan', icon: User },
            { label: 'Patient Age (DOB)', value: '6 Years Old (12/05/2018)', icon: Calendar },
            { label: 'Primary Caregiver', value: 'Rahul Ramakrishnan', icon: Heart },
            { label: 'Assigned Specialist', value: 'Dr. Smitha (Apollo Clinical)', icon: ShieldCheck }
          ].map((info, idx) => (
            <div key={idx} className="bento-card" style={{ padding: '32px', background: 'var(--slate-50)', border: '2px solid var(--slate-100)', boxShadow: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <info.icon size={18} color="var(--slate-400)" />
                <label style={{ fontWeight: 800, color: 'var(--slate-400)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{info.label}</label>
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--slate-900)' }}>{info.value}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '60px', padding: '40px', background: 'var(--slate-900)', borderRadius: '40px', color: 'white', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <div>
             <h4 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 800 }}>Clinical Data Export</h4>
             <p style={{ margin: '8px 0 0', opacity: 0.7, fontWeight: 600 }}>Download the full history and medical progression of the patient.</p>
           </div>
           <button onClick={() => navigate('/report')} className="btn-neon" style={{ background: 'white', color: 'var(--slate-900)', padding: '16px 48px', fontSize: '1.2rem' }}>GENERATE PDF</button>
        </div>
      </div>
    </div>
  );

  const renderChat = () => (
    <div className="bento-card animate-slide-up" style={{ display: 'flex', flexDirection: 'column', height: '80vh', padding: 0, overflow: 'hidden' }}>
      <div style={{ padding: '32px 50px', borderBottom: '1px solid var(--slate-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ width: '80px', height: '80px', background: 'var(--p-100)', borderRadius: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--p-500)', fontSize: '3rem' }}>👩‍⚕️</div>
          <div><h3 style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>Dr. Smitha</h3><p style={{ color: 'var(--s-500)', fontWeight: 800, margin: 0, fontSize: '1.1rem' }}>● Online & Helping</p></div>
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
           <button className="btn-neon" style={{ background: 'var(--slate-100)', color: 'var(--slate-900)', boxShadow: 'none' }}><Phone size={24} /></button>
           <button className="btn-neon"><Video size={24} /> START VIDEO CALL</button>
        </div>
      </div>
      <div style={{ flex: 1, padding: '50px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '32px', background: 'rgba(248, 250, 252, 0.5)' }}>
        {messages.map(msg => (
          <div key={msg.id} style={{ alignSelf: msg.sender === 'parent' ? 'flex-end' : 'flex-start', maxWidth: '60%' }}>
            <div style={{ background: msg.sender === 'parent' ? 'var(--p-500)' : 'white', color: msg.sender === 'parent' ? 'white' : 'var(--slate-900)', padding: '28px', borderRadius: '30px', borderBottomRightRadius: msg.sender === 'parent' ? '4px' : '30px', borderBottomLeftRadius: msg.sender === 'doctor' ? '4px' : '30px', fontWeight: 600, fontSize: '1.4rem', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>{msg.text}</div>
            <p style={{ fontSize: '1rem', color: 'var(--slate-400)', marginTop: '12px', textAlign: msg.sender === 'parent' ? 'right' : 'left', fontWeight: 800 }}>{msg.time}</p>
          </div>
        ))}
      </div>
      <div style={{ padding: '32px 50px', background: 'white', borderTop: '1px solid var(--slate-200)', display: 'flex', gap: '24px' }}>
        <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="Type your message hero..." style={{ flex: 1, padding: '24px 32px', borderRadius: '20px', border: '3px solid var(--slate-200)', fontSize: '1.4rem', fontWeight: 600, outline: 'none', transition: 'all 0.3s' }} onFocus={(e) => e.target.style.borderColor = 'var(--p-500)'} />
        <button onClick={handleSendMessage} className="btn-neon" style={{ padding: '0 60px' }}>SEND</button>
      </div>
    </div>
  );

  return (
    <div className="playground-container" onMouseMove={handleMouseMove} style={{ minHeight: '100vh', display: 'flex' }}>
      <div className="mesh-bg"></div>
      
      <style>{`
        .btn-pop { transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); cursor: pointer; border: none; }
        .btn-pop:hover { transform: translateY(-6px) scale(1.03); }
        .btn-pop:active { transform: scale(0.95); }
        .magic-sparkle { position: fixed; pointer-events: none; z-index: 999; animation: sparkle-pop 0.7s forwards ease-out; }
        @keyframes sparkle-pop { 0% { transform: scale(0) rotate(0deg); opacity: 1; } 100% { transform: scale(2.5) rotate(90deg); opacity: 0; } }
      `}</style>
      
      {sparkles.map(s => (
        <div key={s.id} className="magic-sparkle" style={{ left: s.x, top: s.y, color: s.color }}><Sparkles size={s.size} fill="currentColor" /></div>
      ))}
      
      {renderGameOverlay()}
      
      <aside className="bento-card" style={{ width: '380px', margin: '32px', borderRadius: '40px', display: 'flex', flexDirection: 'column', padding: '50px', position: 'sticky', top: '32px', height: 'calc(100vh - 64px)', background: 'rgba(255,255,255,0.85)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '80px' }}>
          <div style={{ width: '64px', height: '64px', background: 'var(--p-500)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 15px 30px rgba(139, 92, 246, 0.4)' }}><Rocket color="white" size={36} /></div>
          <h1 style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--slate-900)', margin: 0, letterSpacing: '-1.5px' }}>Autishta</h1>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Hero Base' },
            { id: 'planner', icon: Calendar, label: 'Mission Planner' },
            { id: 'games', icon: Gamepad2, label: 'Skills Galaxy' },
            { id: 'chat', icon: MessageCircle, label: 'Doctor Hub' },
            { id: 'profile', icon: User, label: 'Super Profile' }
          ].map(tab => (
            <div key={tab.id} onClick={() => setCurrentTab(tab.id)} className={`sidebar-item ${currentTab === tab.id ? 'active' : ''}`}>
               <div className="icon-glow"><tab.icon size={26} strokeWidth={currentTab === tab.id ? 2.5 : 2} /></div>
               <span style={{ fontSize: '1.4rem' }}>{tab.label}</span>
            </div>
          ))}
        </nav>
        
        <button onClick={() => navigate('/')} className="btn-pop" style={{ display: 'flex', alignItems: 'center', gap: '14px', background: '#FEE2E2', color: '#EF4444', padding: '24px', borderRadius: '25px', fontWeight: 800, fontSize: '1.4rem', justifyContent: 'center', border: '2px solid #FECACA' }}><LogOut size={26} /> LOGOUT</button>
      </aside>

      <main style={{ flex: 1, padding: '32px 64px 64px 32px', overflowY: 'auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px', paddingTop: '15px' }}>
          <div>
            <p style={{ color: 'var(--p-500)', fontWeight: 800, fontSize: '1.3rem', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '2px' }}>Hero Mission Dashboard ✨</p>
            <h2 style={{ fontSize: '3.2rem', fontWeight: 800 }}>{currentTab === 'dashboard' && 'Welcome, Arjun! 👋'}{currentTab === 'games' && 'The Skills Galaxy'}{currentTab === 'chat' && 'Doctor Consult'}{currentTab === 'profile' && 'Hero Stats'}</h2>
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
             <div className="bento-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 36px', borderRadius: '100px', border: '2px solid var(--p-400)' }}>
                <Star fill="var(--p-400)" color="var(--p-400)" size={32} />
                <span style={{ fontWeight: 900, fontSize: '1.8rem' }}>{starsEarned} <span style={{ color: 'var(--slate-400)', fontSize: '1.2rem' }}>STARS</span></span>
             </div>
             <div className="bento-card" style={{ width: '70px', height: '70px', borderRadius: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}><Award color="var(--p-500)" size={36} /></div>
          </div>
        </header>

        {currentTab === 'dashboard' && renderDashboard()}
        {currentTab === 'planner' && renderPlanner()}
        {currentTab === 'games' && renderGames()}
        {currentTab === 'profile' && renderProfile()}
        {currentTab === 'chat' && renderChat()}
      </main>
    </div>
  );
};

export default PatientDashboard;
