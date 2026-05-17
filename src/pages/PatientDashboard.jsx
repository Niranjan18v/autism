import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, Smile, MessageCircle, Gamepad2, Award, Star, Rocket, Sparkles, Bot,
  User, ClipboardList, CheckCircle, Video, Play, Phone, ArrowLeft, X, Check, Trophy, MousePointer2, RefreshCcw, ImageIcon, LayoutDashboard, Settings, LogOut, ChevronRight, Calendar, ShieldCheck, Heart, Clock
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [sparkles, setSparkles] = useState([]);
  const [starsEarned, setStarsEarned] = useState(120);
  const [appliedSchemes, setAppliedSchemes] = useState(() => {
    return JSON.parse(localStorage.getItem('appliedSchemes')) || [];
  });
  const [childLevel, setChildLevel] = useState(localStorage.getItem('childLevel') || 1);
  const [activeFrame, setActiveFrame] = useState('explorer');
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

  // Autism-Friendly Calm Mode & Game States
  const [calmSettings, setCalmSettings] = useState({
    level: 'beginner',
    sound: true,
    speed: 'normal'
  });
  const [shapeTarget, setShapeTarget] = useState(null);
  const [shapeChoices, setShapeChoices] = useState([]);
  const [memoryCards, setMemoryCards] = useState([]);
  const [flippedCardIndices, setFlippedCardIndices] = useState([]);
  const [foodItem, setFoodItem] = useState(null);
  const [sortScore, setSortScore] = useState(0);
  const [routineCards, setRoutineCards] = useState([]);
  
  const puzzleImages = [
    "/elephant_clean.png", 
    "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=1000"
  ];

  const jigsawShape = "polygon(0% 20%, 40% 20%, 40% 0%, 60% 0%, 60% 20%, 100% 20%, 100% 40%, 120% 40%, 120% 60%, 100% 60%, 100% 100%, 60% 100%, 60% 120%, 40% 120%, 40% 100%, 0% 100%, 0% 60%, -20% 60%, -20% 40%, 0% 40%)";

  const [behaviorLogs, setBehaviorLogs] = useState([
    { id: 1, text: 'Slept Well', ta: 'நன்றாக உறங்கினார்', done: false, icon: '' },
    { id: 2, text: 'Ate Healthy Food', ta: 'சத்தான உணவு உண்டார்', done: false, icon: '' },
    { id: 3, text: 'Expressed Emotions', ta: 'உணர்ச்சிகளை வெளிப்படுத்தினார்', done: false, icon: '' },
    { id: 4, text: 'Followed Routine', ta: 'வழக்கமான முறையைப் பின்பற்றினார்', done: false, icon: '' }
  ]);

  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'doctor', text: 'Hello! How is Arjun doing with the emotion game today?', time: '09:00 AM' }
  ]);

  const [plannerTasks, setPlannerTasks] = useState([
    { id: 1, time: '09:00 AM', mission: 'Emotion Match', ta: 'உணர்ச்சி பொருத்தம்', category: 'Social', done: true, icon: '' },
    { id: 2, time: '11:30 AM', mission: 'Alphabet Academy', ta: 'அகரவரிசை அகாடமி', category: 'Education', done: false, icon: '' },
    { id: 3, time: '04:00 PM', mission: 'Sensory Bubble Pop', ta: 'சென்சரி குமிழி பாப்', category: 'Sensory', done: false, icon: '' },
    { id: 4, time: '07:30 PM', mission: 'Voice Buddy AI', ta: 'வாய்ஸ் படி AI', category: 'Communication', done: false, icon: '' }
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
                char: ['A', 'B', 'C', '1', '2', '3', 'H', 'P'][Math.floor(Math.random() * 8)]
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
                img: isGood ? ['Good', 'Healthy', 'Happy', 'Fun'][Math.floor(Math.random() * 4)] : ['Sad', 'Bad', 'Angry', 'Harmful'][Math.floor(Math.random() * 4)]
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
    if (Math.random() > 0.4) {
      const newSparkle = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        color: ['#8B5CF6', '#10B981', '#F472B6', '#38BDF8', '#FBBF24', '#FF6B00', '#FFF'][Math.floor(Math.random() * 7)],
        size: Math.random() * 12 + 12
      };
      setSparkles(prev => [...prev.slice(-25), newSparkle]);
      setTimeout(() => setSparkles(prev => prev.filter(s => s.id !== newSparkle.id)), 700);
    }
    if (activeGame === 'emotion' || activeGame === 'word') {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      setMascotPos(Math.max(5, Math.min(95, x)));
    }
  };

  // Text-To-Speech (TTS) Voice Support
  const speakText = (text) => {
    if (!calmSettings.sound) return;
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language === 'en' ? 'en-US' : 'ta-IN';
        utterance.rate = calmSettings.speed === 'normal' ? 0.95 : 0.7; // Gentle, slower rate for calm mode
        utterance.volume = 0.85;
        window.speechSynthesis.speak(utterance);
      }
    } catch (e) {
      console.warn("Speech synthesis failed", e);
    }
  };

  // Pure HTML5 Web Audio Synthesizer for Calm Positive Feedback Cues
  const playWebAudioSound = (type) => {
    if (!calmSettings.sound) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      if (type === 'success') {
        // Beautiful soft ascending pentatonic harp chord
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(523.25, now); // C5
        osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.15); // E5

        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(659.25, now + 0.1); // E5
        osc2.frequency.exponentialRampToValueAtTime(783.99, now + 0.3); // G5

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.005, now + 0.5);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc1.stop(now + 0.5);
        osc2.start(now + 0.1);
        osc2.stop(now + 0.5);
      } else if (type === 'click') {
        // Soft bubble click
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(700, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.08);

        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.002, now + 0.08);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.08);
      }
    } catch (e) {
      console.warn("Web Audio Synthesis failed", e);
    }
  };

  const startLevelGame = (gameId, forceImgIndex = null) => {
    setActiveGame(gameId);
    setGameScore(0);
    setGameTimer(30);
    setIsGameRunning(false);
    setShowSuccess(false);
    setBubbles([]);
    setFallingItems([]);

    if (gameId === 'match_shape') {
      const shapes = [
        { name: 'Circle', label: language === 'en' ? 'Circle' : 'வட்டம்', emoji: '🔴', color: '#EF4444' },
        { name: 'Square', label: language === 'en' ? 'Square' : 'சதுரம்', emoji: '🟦', color: '#3B82F6' },
        { name: 'Triangle', label: language === 'en' ? 'Triangle' : 'முக்கோணம்', emoji: '🔺', color: '#10B981' },
        { name: 'Star', label: language === 'en' ? 'Star' : 'நட்சத்திரம்', emoji: '⭐', color: '#F59E0B' }
      ];
      const target = shapes[Math.floor(Math.random() * shapes.length)];
      setShapeTarget(target);
      setShapeChoices([...shapes].sort(() => Math.random() - 0.5));
      
      // Gentle voice introduction
      setTimeout(() => {
        speakText(language === 'en' ? `Find the matching shape: ${target.name}` : `பொருத்தமான வடிவம்: ${target.label}`);
      }, 100);
    }

    if (gameId === 'memory_pair') {
      const icons = ['🐶', '🐱', '🐹', '🐻'];
      const pairCount = calmSettings.level === 'beginner' ? 2 : calmSettings.level === 'medium' ? 3 : 4;
      const gameIcons = icons.slice(0, pairCount);
      const cardsData = [...gameIcons, ...gameIcons]
        .map((icon, idx) => ({ id: idx, icon, matched: false, flipped: false }))
        .sort(() => Math.random() - 0.5);
      setMemoryCards(cardsData);
      setFlippedCardIndices([]);
      
      setTimeout(() => {
        speakText(language === 'en' ? 'Find all matching animal pairs!' : 'விலங்கு ஜோடிகளைக் கண்டுபிடி!');
      }, 100);
    }

    if (gameId === 'sort_food') {
      const foods = [
        { name: language === 'en' ? '🥦 Broccoli' : '🥦 முட்டைக்கோஸ்', isHealthy: true },
        { name: language === 'en' ? '🍎 Apple' : '🍎 ஆப்பிள்', isHealthy: true },
        { name: language === 'en' ? '🍌 Banana' : '🍌 வாழைப்பழம்', isHealthy: true },
        { name: language === 'en' ? '🥕 Carrot' : '🥕 கேரட்', isHealthy: true },
        { name: language === 'en' ? '🍩 Donut' : '🍩 டோனட்', isHealthy: false },
        { name: language === 'en' ? '🍕 Pizza' : '🍕 பீட்சா', isHealthy: false },
        { name: language === 'en' ? '🍨 Ice Cream' : '🍨 ஐஸ்கிரீம்', isHealthy: false },
        { name: language === 'en' ? '🍟 Fries' : '🍟 உருளைக்கிழங்கு வறுவல்', isHealthy: false }
      ];
      const selected = foods[Math.floor(Math.random() * foods.length)];
      setFoodItem(selected);
      setSortScore(0);
      
      setTimeout(() => {
        speakText(language === 'en' ? `Classify: ${selected.name.split(' ').slice(1).join(' ')}` : `உணவை வகைப்படுத்துங்கள்: ${selected.name.split(' ').slice(1).join(' ')}`);
      }, 100);
    }

    if (gameId === 'sequence_routine') {
      const steps = [
        { step: 1, text: language === 'en' ? '🪥 Brush Teeth' : '🪥 பல் துலக்குங்கள்', color: '#38BDF8' },
        { step: 2, text: language === 'en' ? '🍳 Eat Breakfast' : '🍳 காலை உணவு உண்ணுங்கள்', color: '#F472B6' },
        { step: 3, text: language === 'en' ? '🎒 Pack School Bag' : '🎒 பள்ளிப் பையை தயார் செய்யுங்க', color: '#FBBF24' },
        { step: 4, text: language === 'en' ? '🚌 Go to School' : '🚌 பள்ளிக்குச் செல்லுங்கள்', color: '#10B981' }
      ];
      setRoutineCards([...steps].sort(() => Math.random() - 0.5));
      
      setTimeout(() => {
        speakText(language === 'en' ? 'Order the routine cards from first to last!' : 'காலை வழக்க அட்டைகளை வரிசைப்படுத்தவும்!');
      }, 100);
    }
  };

  const handleMatchShape = (choice) => {
    playWebAudioSound('click');
    if (choice.name === shapeTarget.name) {
      playWebAudioSound('success');
      setGameScore(s => {
        const nextScore = s + 1;
        const targetGoal = calmSettings.level === 'beginner' ? 2 : calmSettings.level === 'medium' ? 3 : 4;
        if (nextScore >= targetGoal) {
          setTimeout(() => {
            setShowSuccess(true);
            setStarsEarned(stars => stars + 50);
            speakText(language === 'en' ? 'Awesome job! Challenge complete!' : 'அற்புதம்! பணி முடிந்தது!');
          }, 300);
        } else {
          const shapes = [
            { name: 'Circle', label: language === 'en' ? 'Circle' : 'வட்டம்', emoji: '🔴', color: '#EF4444' },
            { name: 'Square', label: language === 'en' ? 'Square' : 'சதுரம்', emoji: '🟦', color: '#3B82F6' },
            { name: 'Triangle', label: language === 'en' ? 'Triangle' : 'முக்கோணம்', emoji: '🔺', color: '#10B981' },
            { name: 'Star', label: language === 'en' ? 'Star' : 'நட்சத்திரம்', emoji: '⭐', color: '#F59E0B' }
          ];
          const target = shapes[Math.floor(Math.random() * shapes.length)];
          setShapeTarget(target);
          setShapeChoices([...shapes].sort(() => Math.random() - 0.5));
          speakText(language === 'en' ? `Correct! Next: ${target.name}` : `சரி! அடுத்து: ${target.label}`);
        }
        return nextScore;
      });
    } else {
      speakText(language === 'en' ? 'Try another shape!' : 'மற்றொரு வடிவத்தை முயலவும்!');
    }
  };

  const handleMemoryFlip = (index) => {
    playWebAudioSound('click');
    if (flippedCardIndices.length >= 2 || memoryCards[index].matched || flippedCardIndices.includes(index)) return;
    
    const updated = [...memoryCards];
    updated[index].flipped = true;
    setMemoryCards(updated);
    
    const newFlipped = [...flippedCardIndices, index];
    setFlippedCardIndices(newFlipped);
    
    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (memoryCards[first].icon === memoryCards[second].icon) {
        playWebAudioSound('success');
        speakText(language === 'en' ? 'You found a match!' : 'ஜோடி கிடைத்தது!');
        setTimeout(() => {
          const matchedCards = updated.map((c, i) => {
            if (i === first || i === second) {
              return { ...c, matched: true };
            }
            return c;
          });
          setMemoryCards(matchedCards);
          setFlippedCardIndices([]);
          
          if (matchedCards.every(c => c.matched)) {
            setTimeout(() => {
              setShowSuccess(true);
              setStarsEarned(stars => stars + 50);
              speakText(language === 'en' ? 'Fantastic memory match complete!' : 'அற்புதம்! பணி முடிந்தது!');
            }, 500);
          }
        }, 400);
      } else {
        setTimeout(() => {
          const resetCards = [...updated];
          resetCards[first].flipped = false;
          resetCards[second].flipped = false;
          setMemoryCards(resetCards);
          setFlippedCardIndices([]);
        }, 1000);
      }
    }
  };

  const handleSortFood = (isHealthyChoice) => {
    playWebAudioSound('click');
    if (foodItem.isHealthy === isHealthyChoice) {
      playWebAudioSound('success');
      setSortScore(s => {
        const nextScore = s + 1;
        const targetGoal = calmSettings.level === 'beginner' ? 3 : calmSettings.level === 'medium' ? 5 : 7;
        if (nextScore >= targetGoal) {
          setTimeout(() => {
            setShowSuccess(true);
            setStarsEarned(stars => stars + 50);
            speakText(language === 'en' ? 'Vibrant food sorting complete!' : 'அற்புதம்! பணி முடிந்தது!');
          }, 300);
        } else {
          const foods = [
            { name: language === 'en' ? '🥦 Broccoli' : '🥦 முட்டைக்கோஸ்', isHealthy: true },
            { name: language === 'en' ? '🍎 Apple' : '🍎 ஆப்பிள்', isHealthy: true },
            { name: language === 'en' ? '🍌 Banana' : '🍌 வாழைப்பழம்', isHealthy: true },
            { name: language === 'en' ? '🥕 Carrot' : '🥕 கேரட்', isHealthy: true },
            { name: language === 'en' ? '🍩 Donut' : '🍩 டோனட்', isHealthy: false },
            { name: language === 'en' ? '🍕 Pizza' : '🍕 பீட்சா', isHealthy: false },
            { name: language === 'en' ? '🍨 Ice Cream' : '🍨 ஐஸ்கிரீம்', isHealthy: false },
            { name: language === 'en' ? '🍟 Fries' : '🍟 உருளைக்கிழங்கு வறுவல்', isHealthy: false }
          ];
          const selected = foods[Math.floor(Math.random() * foods.length)];
          setFoodItem(selected);
          speakText(language === 'en' ? `Correct! Next: ${selected.name.split(' ').slice(1).join(' ')}` : `சரி! அடுத்து: ${selected.name.split(' ').slice(1).join(' ')}`);
        }
        return nextScore;
      });
    } else {
      speakText(language === 'en' ? 'Try classifying again!' : 'மீண்டும் முயற்சிக்கவும்!');
    }
  };

  const handleMoveRoutineCard = (fromIndex, toIndex) => {
    playWebAudioSound('click');
    if (toIndex < 0 || toIndex >= routineCards.length) return;
    const scrambled = [...routineCards];
    const [moved] = scrambled.splice(fromIndex, 1);
    scrambled.splice(toIndex, 0, moved);
    setRoutineCards(scrambled);
    
    const isPerfect = scrambled.every((card, idx) => card.step === idx + 1);
    if (isPerfect) {
      playWebAudioSound('success');
      setTimeout(() => {
        setShowSuccess(true);
        setStarsEarned(stars => stars + 50);
        speakText(language === 'en' ? 'Perfect routine sequencing complete!' : 'அற்புதம்! பணி முடிந்தது!');
      }, 500);
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

  const popBubble = (id) => {
    setBubbles(prev => prev.filter(b => b.id !== id));
    setGameScore(s => s + 1);
    setStarsEarned(s => s + 2);
  };

  const renderDashboard = () => (
    <div className="animate-slide-up">
      {/* Premium Hero Banner */}
      <div style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #EC4899 100%)', borderRadius: '28px', padding: '32px 40px', color: 'white', marginBottom: '32px', position: 'relative', overflow: 'hidden', boxShadow: '0 25px 50px rgba(124, 58, 237, 0.15)' }}>
        
        {/* Ambient Grid overlay */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%', opacity: 0.05, pointerEvents: 'none', background: 'radial-gradient(circle, #FFF 1px, transparent 1px) 0 0/18px 18px' }}></div>
        
        <div style={{ position: 'relative', zIndex: 2 }}>
           {/* Tag Badge */}
           <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 255, 255, 0.15)', border: '1px solid rgba(255, 255, 255, 0.25)', padding: '6px 16px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '20px' }}>
             🚀 {language === 'en' ? 'MISSION STATION' : 'மிஷன் நிலையம்'}
           </div>

           <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '8px', color: 'white', letterSpacing: '-0.02em', textShadow: '0 2px 10px rgba(0,0,0,0.15)', marginTop: 0 }}>
             {language === 'en' ? "Welcome Back, Hero!" : "மீண்டும் வருக, ஹீரோ!"}
           </h2>
           <p style={{ fontSize: '1.25rem', opacity: 0.95, fontWeight: 600, textShadow: '0 2px 10px rgba(0,0,0,0.15)', margin: '0 0 32px' }}>
             {language === 'en' ? "Ready to conquer your daily activities and unlock new super powers?" : "உங்களது தினசரி செயல்பாடுகளை முடித்து புதிய சூப்பர் பவர்களைப் பெறத் தயாரா?"}
           </p>

           {/* Banner Badge Pills */}
           <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
             <div style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '14px', padding: '10px 20px', textAlign: 'left', minWidth: '150px' }}>
               <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'rgba(255, 255, 255, 0.6)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>RANK</span>
               <span style={{ fontSize: '1.05rem', fontWeight: 900, color: 'white', display: 'block', marginTop: '2px' }}>LEVEL {childLevel} EXPLORER</span>
             </div>
             <div style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '14px', padding: '10px 20px', textAlign: 'left', minWidth: '150px' }}>
               <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'rgba(255, 255, 255, 0.6)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>DAILY STREAK</span>
               <span style={{ fontSize: '1.05rem', fontWeight: 900, color: '#FDE047', display: 'block', marginTop: '2px' }}>🔥 7 DAYS ACTIVE</span>
             </div>
             <div style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '14px', padding: '10px 20px', textAlign: 'left', minWidth: '150px' }}>
               <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'rgba(255, 255, 255, 0.6)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>BONUS XP</span>
               <span style={{ fontSize: '1.05rem', fontWeight: 900, color: '#4ADE80', display: 'block', marginTop: '2px' }}>⭐ +250 XP READY</span>
             </div>
           </div>
        </div>

        <div style={{ position: 'absolute', right: '30px', bottom: '-20px', opacity: 0.12, pointerEvents: 'none', zIndex: 1 }}>
          <Rocket size={180} style={{ transform: 'rotate(45deg)' }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }}>
        
        {/* Learning Worlds Portal Section */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '28px' }}>
            <div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 900, margin: 0, color: '#0F172A', letterSpacing: '-0.5px' }}>
                {language === 'en' ? "Learning Worlds Portal" : "கற்றல் உலகங்கள் போர்டல்"}
              </h3>
              <p style={{ fontSize: '1.05rem', color: 'var(--slate-500)', fontWeight: 600, margin: '6px 0 0' }}>
                {language === 'en' ? "Select a gamified galaxy to master special communication & sensory goals." : "தொடர்பு மற்றும் உணர்வுசார் இலக்குகளை வெல்ல ஒரு கேமிஃபைட் கேலக்ஸியைத் தேர்ந்தெடுக்கவும்."}
              </p>
            </div>
            <button className="btn-neon" style={{ background: '#7C3AED', padding: '12px 28px', fontSize: '0.95rem', fontWeight: 800, borderRadius: '100px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              {language === 'en' ? 'View Cosmos Map' : 'விண்வெளி வரைபடம்'} <ChevronRight size={16} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
            {[
              { id: 1, title: language === 'en' ? 'Smart Hero Academy' : 'ஸ்மார்ட் ஹீரோ அகாடமி', tag: language === 'en' ? 'ACADEMY' : 'அகாடமி', tagBg: '#F3E8FF', tagColor: '#8B5CF6', desc: language === 'en' ? 'Master Letters & Numbers!' : 'எழுத்துக்கள் & எண்களைக் கற்றுக்கொள்ளுங்கள்!', icon: BookOpen, color: '#8B5CF6', mastery: 85, path: '/activity/education' },
              { id: 2, title: language === 'en' ? 'Emotion Explorer' : 'உணர்ச்சி ஆய்வாளர்', tag: language === 'en' ? 'SOCIAL' : 'சமூகவியல்', tagBg: '#ECFDF5', tagColor: '#10B981', desc: language === 'en' ? 'Express Your Feelings!' : 'உங்கள் உணர்ச்சிகளை வெளிப்படுத்துங்கள்!', icon: Smile, color: '#10B981', mastery: 60, path: '/activity/emotion-matching' },
              { id: 3, title: language === 'en' ? 'Communication Hero' : 'தொடர்பு ஹீரோ', tag: language === 'en' ? 'DIALOGUE' : 'உரையாடல்', tagBg: '#FDF2F8', tagColor: '#EC4899', desc: language === 'en' ? 'Talk & Play Together!' : 'ஒன்றாகப் பேசி விளையாடுங்கள்!', icon: MessageCircle, color: '#F472B6', mastery: 90, path: '/activity/communication' }
            ].map(w => (
              <div key={w.id} onClick={() => navigate(w.path)} className="bento-card btn-pop" style={{ padding: '32px', border: '1px solid #E2E8F0', borderRadius: '24px', cursor: 'pointer', background: 'white', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                
                {/* Category Tag Badge */}
                <div style={{ position: 'absolute', top: '24px', right: '24px', background: w.tagBg, color: w.tagColor, padding: '4px 14px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {w.tag}
                </div>

                <div>
                  <div style={{ width: '64px', height: '64px', background: 'var(--slate-50)', border: '1px solid var(--slate-100)', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: w.color, marginBottom: '24px', flexShrink: 0 }}>
                    <w.icon size={30} strokeWidth={2.5} />
                  </div>
                  <h4 style={{ fontSize: '1.35rem', fontWeight: 900, marginBottom: '6px', color: '#0F172A', marginTop: 0, letterSpacing: '-0.3px' }}>{w.title}</h4>
                  <p style={{ fontSize: '0.95rem', color: 'var(--slate-500)', fontWeight: 650, margin: 0, lineHeight: 1.4 }}>{w.desc}</p>
                </div>

                {/* Integrated Progress Bar */}
                <div style={{ marginTop: '24px', borderTop: '1px solid var(--slate-100)', paddingTop: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 800, color: 'var(--slate-400)', marginBottom: '8px' }}>
                    <span>SECTOR PROGRESS</span>
                    <span style={{ color: w.color, fontWeight: 900 }}>{w.mastery}% Mastery</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'var(--slate-100)', borderRadius: '10px', overflow: 'hidden' }}>
                    <div style={{ width: `${w.mastery}%`, height: '100%', background: w.color, borderRadius: '10px' }}></div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* Brand New Rich Content: Today's Hero Progress & Habit Tracker */}
        <section style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: '32px', alignItems: 'stretch' }}>
          
          {/* Habits Grid Column */}
          <div className="bento-card" style={{ padding: '36px', background: 'white', border: '1px solid #E2E8F0', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginTop: 0, marginBottom: 0, color: '#0F172A', letterSpacing: '-0.5px' }}>
                  {language === 'en' ? "Today's Hero Habits" : "இன்றைய ஹீரோ பழக்கங்கள்"}
                </h3>
                <div style={{ background: '#F3E8FF', color: '#7C3AED', padding: '6px 14px', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 900 }}>
                  {behaviorLogs.filter(b => b.done).length}/{behaviorLogs.length} {language === 'en' ? 'COMPLETED' : 'முடிந்தது'}
                </div>
              </div>
              <p style={{ fontSize: '1rem', color: 'var(--slate-500)', fontWeight: 600, marginBottom: '28px', marginTop: 0 }}>
                {language === 'en' ? "Complete all habits to unlock a secret daily treasure box!" : "ரகசிய தினசரி புதையல் பெட்டியைத் திறக்க அனைத்து பழக்கங்களையும் முடிக்கவும்!"}
              </p>

              {/* Dynamic Habit Streak Progress Bar */}
              <div style={{ background: 'var(--slate-50)', border: '1px solid var(--slate-100)', borderRadius: '16px', padding: '20px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 800, color: 'var(--slate-500)', marginBottom: '8px' }}>
                  <span>DAILY HABIT STREAK BAR</span>
                  <span style={{ color: '#7C3AED', fontWeight: 900 }}>
                    {Math.round((behaviorLogs.filter(b => b.done).length / behaviorLogs.length) * 100)}% DONE
                  </span>
                </div>
                <div style={{ width: '100%', height: '10px', background: 'var(--slate-200)', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ width: `${(behaviorLogs.filter(b => b.done).length / behaviorLogs.length) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #3B82F6, #7C3AED)', borderRadius: '10px', transition: 'all 0.3s ease' }}></div>
                </div>
              </div>

              {/* Habit grid logs */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {behaviorLogs.map(log => (
                  <div 
                    key={log.id} 
                    onClick={() => toggleBehavior(log.id)} 
                    className="btn-pop"
                    style={{ 
                      display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 20px', borderRadius: '12px', 
                      background: log.done ? '#ECFDF5' : '#F8FAFC', 
                      border: log.done ? '2px solid #34D399' : '2px solid #E2E8F0', 
                      cursor: 'pointer', transition: 'all 0.2s', 
                      boxShadow: log.done ? '0 6px 16px rgba(52, 211, 153, 0.12)' : 'none'
                    }}
                  >
                    <span style={{ fontWeight: 800, fontSize: '0.95rem', color: log.done ? '#065F46' : '#475569' }}>
                      {language === 'en' ? log.text : log.ta}
                    </span>
                    {log.done && <span style={{ color: '#10B981', fontWeight: 900, fontSize: '1.1rem', marginLeft: '4px' }}>✓</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Robot Buddy speech Column */}
          <div className="bento-card" style={{ padding: '36px', background: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)', color: 'white', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 40px rgba(37, 99, 235, 0.15)' }}>
            
            {/* Soft decorative background circles */}
            <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }}></div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', zIndex: 2 }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Bot size={60} style={{ animation: 'float 3s ease-in-out infinite', filter: 'drop-shadow(0 12px 20px rgba(0,0,0,0.15))' }} />
                <div style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', padding: '4px 14px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.5px' }}>
                  {language === 'en' ? 'ONLINE COMPANION' : 'ஆன்லைன் துணை'}
                </div>
              </div>

              <div>
                <h4 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 850, letterSpacing: '-0.01em' }}>
                  {language === 'en' ? "Aayu's Daily Guide" : "ஆயுவின் தினசரி வழிகாட்டி"}
                </h4>
                <p style={{ margin: '10px 0 0', fontSize: '1.05rem', opacity: 0.95, lineHeight: 1.5, fontWeight: 600 }}>
                  {language === 'en' 
                    ? "Hey Arjun! Pop some bubbles in the Fun Games section today to unlock your daily Super Badge! Let's grow together!"
                    : "ஹே அர்ஜுன்! இன்று இரட்டை நட்சத்திர வெகுமதியைப் பெற சென்சரி குமிழ்களை பாப் செய்யுங்கள்! ஒன்றாக வளர்வோம்!"}
                </p>
              </div>

            </div>
          </div>

        </section>
      </div>
    </div>
  );

  const renderGames = () => (
    <div className="animate-slide-up">
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
         <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '10px', color: '#0F172A', letterSpacing: '-0.5px' }}>
           {language === 'en' ? 'Calm Skills Universe' : 'அமைதியான திறன் பிரபஞ்சம்'}
         </h2>
         <p style={{ fontSize: '1.15rem', color: 'var(--slate-500)', fontWeight: 650, margin: 0 }}>
           {language === 'en' ? 'Predictable, calm, and delightful matches to boost learning!' : 'கற்றலை மேம்படுத்த கணிக்கக்கூடிய, அமைதியான மற்றும் மகிழ்ச்சியான விளையாட்டுகள்!'}
         </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }}>
        {[
          { 
            id: 'match_shape', 
            title: language === 'en' ? 'Shape & Color Matcher' : 'வடிவம் மற்றும் வண்ணப் பொருத்தம்', 
            desc: language === 'en' ? 'Calmly match target shapes & colors at your own comfortable pace.' : 'வடிவங்கள் மற்றும் வண்ணங்களை உங்கள் சொந்த வேகத்தில் அமைதியாகப் பொருத்துங்கள்.', 
            badge: '🔴 🟦 🔺 ⭐', 
            badgeBg: '#F5F3FF',
            color: '#8B5CF6',
            glowColor: 'rgba(139, 92, 246, 0.15)'
          },
          { 
            id: 'memory_pair', 
            title: language === 'en' ? 'Animal Memory: Find the Pair' : 'விலங்கு நினைவகம்: ஜோடியைக் கண்டுபிடி', 
            desc: language === 'en' ? 'Flip cute animal cards and discover matched pairs with soothing feedback.' : 'அழகான விலங்கு அட்டைகளைத் திருப்பி, ஜோடிகளைக் கண்டறியவும்.', 
            badge: '🐶 🐱 🐹 🐻', 
            badgeBg: '#ECFDF5',
            color: '#10B981',
            glowColor: 'rgba(16, 185, 129, 0.15)'
          },
          { 
            id: 'sort_food', 
            title: language === 'en' ? 'Healthy Food Sorter' : 'சத்தான உணவு பிரிப்பான்', 
            desc: language === 'en' ? 'Classify yummy treats versus healthy items into corresponding baskets.' : 'அருமையான இனிப்புகள் மற்றும் சத்தான உணவுகளை கூடைகளில் வகைப்படுத்தவும்.', 
            badge: '🥦 🍎 🍩 🍕', 
            badgeBg: '#FDF2F8',
            color: '#F472B6',
            glowColor: 'rgba(244, 114, 182, 0.15)'
          },
          { 
            id: 'sequence_routine', 
            title: language === 'en' ? "Hero's Morning Routine" : 'ஹீரோவின் காலை வழக்கம்', 
            desc: language === 'en' ? 'Arrange essential scrambled steps for starting a successful day.' : 'ஒரு வெற்றிகரமான நாளைத் தொடங்க தேவையான காலை நடவடிக்கைகளை வரிசைப்படுத்தவும்.', 
            badge: '🪥 🍳 🎒 🚌', 
            badgeBg: '#F0F9FF',
            color: '#38BDF8',
            glowColor: 'rgba(56, 189, 248, 0.15)'
          }
        ].map((game, i) => (
          <div 
            key={i} 
            className="bento-card btn-pop" 
            style={{ 
              padding: '40px 36px', 
              textAlign: 'center', 
              position: 'relative', 
              border: '2px solid #E2E8F0', 
              borderRadius: '28px', 
              background: `radial-gradient(circle at 50% 10%, ${game.badgeBg} 0%, white 90%)`, 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between', 
              boxShadow: `0 16px 36px ${game.glowColor}`,
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            {/* Top Star Reward Badge */}
            <div style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(253, 224, 71, 0.15)', border: '1.5px solid #F59E0B', color: '#B45309', padding: '6px 14px', borderRadius: '100px', fontWeight: 900, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Star fill="#F59E0B" color="#F59E0B" size={14} />
              <span>+50 STARS</span>
            </div>

            <div>
              {/* Vibrant Illustrated Badge display */}
              <div style={{ 
                width: '110px', 
                height: '80px', 
                background: 'white', 
                borderRadius: '20px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '1.8rem',
                letterSpacing: '-6px',
                margin: '10px auto 28px', 
                boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                border: '1px solid rgba(226, 232, 240, 0.8)'
              }}>
                <span style={{ paddingLeft: '8px' }}>{game.badge}</span>
              </div>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '12px', color: '#0F172A', letterSpacing: '-0.3px' }}>{game.title}</h3>
              <p style={{ fontSize: '1.05rem', color: 'var(--slate-500)', fontWeight: 600, marginBottom: '32px', lineHeight: 1.6 }}>{game.desc}</p>
            </div>

            <button 
              onClick={() => startLevelGame(game.id)} 
              className="btn-neon" 
              style={{ 
                background: `linear-gradient(135deg, ${game.color} 0%, ${game.color}dd 100%)`, 
                padding: '14px 36px', 
                fontSize: '1rem', 
                fontWeight: 900,
                borderRadius: '16px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: `0 10px 24px -5px ${game.glowColor}`
              }}
            >
              <span>{language === 'en' ? 'ENTER MISSION' : 'மிஷனில் நுழை'}</span>
              <span style={{ fontSize: '1.2rem' }}>⮕</span>
            </button>
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
          <div className="bento-card animate-slide-up" style={{ maxWidth: '700px', width: '100%', padding: '60px', textAlign: 'center', border: 'none', background: 'white', borderRadius: '28px' }}>
             <div style={{ display: 'flex', justifyContent: 'center', color: '#FBBF24', marginBottom: '30px', animation: 'float 3s infinite' }}><Trophy size={110} /></div>
             <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '20px', color: '#10B981' }}>
               {language === 'en' ? 'AWESOME!' : 'அற்புதம்!'}
             </h2>
             <p style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--slate-800)', marginBottom: '40px', lineHeight: 1.5 }}>
               {language === 'en' ? 'Mission completed with gentle focus!' : 'அமைதியான கவனத்துடன் பணி வெற்றிகரமாக முடிந்தது!'}<br/>
               <span style={{ color: '#F59E0B', fontSize: '1.8rem', fontWeight: 900 }}>★ +50 STARS ⭐</span>
             </p>
             <button onClick={() => {
               setActiveGame(null);
               setShowSuccess(false);
             }} className="btn-neon" style={{ padding: '16px 80px', borderRadius: '100px', fontSize: '1.3rem', background: '#10B981', border: 'none' }}>
               {language === 'en' ? 'CLAIM REWARD' : 'நட்சத்திரங்களைப் பெறு'}
             </button>
          </div>
        </div>
      );
    }

    return (
      <div className="overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.75)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', backdropFilter: 'blur(12px)' }}>
        <div className="bento-card animate-slide-up" style={{ maxWidth: '900px', width: '100%', height: '85vh', background: 'white', position: 'relative', overflow: 'hidden', padding: 0, border: 'none', borderRadius: '28px', display: 'flex', flexDirection: 'column' }}>
          
          {/* Header & Score display */}
          <div style={{ padding: '24px 40px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', zIndex: 10 }}>
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 900, margin: 0, color: '#0F172A' }}>
                {activeGame === 'match_shape' && (language === 'en' ? 'Shape & Color Matcher' : 'வடிவப் பொருத்தம்')}
                {activeGame === 'memory_pair' && (language === 'en' ? 'Animal Memory: Find the Pair' : 'விலங்கு நினைவகம்')}
                {activeGame === 'sort_food' && (language === 'en' ? 'Healthy Food Sorter' : 'உணவு வகைப்படுத்துதல்')}
                {activeGame === 'sequence_routine' && (language === 'en' ? "Hero's Morning Routine" : 'காலை வழக்க வரிசை')}
              </h3>
              <p style={{ margin: '4px 0 0', color: '#64748B', fontSize: '0.9rem', fontWeight: 600 }}>
                {language === 'en' ? 'Calm Mode is active. Play at your own comfortable pace.' : 'அமைதியான முறை செயல்பாட்டில் உள்ளது. உங்கள் சொந்த வேகத்தில் விளையாடுங்கள்.'}
              </p>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ background: '#F8FAFC', border: '1.5px solid #E2E8F0', padding: '8px 20px', borderRadius: '100px', fontWeight: 900, fontSize: '1rem', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Star fill="#F59E0B" color="#F59E0B" size={18} />
                <span>+50 STAR CHALLENGE</span>
              </div>
              <button 
                onClick={() => {
                  setActiveGame(null);
                  setShowSuccess(false);
                }} 
                style={{ background: '#FEE2E2', border: 'none', width: '44px', height: '44px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EF4444', cursor: 'pointer' }}
                className="btn-pop"
              >
                <X size={22} />
              </button>
            </div>
          </div>

          {/* Autism Quiet & Calm Control Bar */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '16px', padding: '16px 40px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', zIndex: 10 }}>
            {/* Level selection */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontWeight: 800, color: '#64748B', fontSize: '0.85rem' }}>{language === 'en' ? 'LEVEL:' : 'நிலை:'}</span>
              {['beginner', 'medium', 'advanced'].map(l => (
                <button 
                  key={l}
                  onClick={() => {
                    setCalmSettings(prev => ({ ...prev, level: l }));
                    setTimeout(() => startLevelGame(activeGame), 50);
                  }}
                  style={{
                    background: calmSettings.level === l ? '#2563EB' : 'white',
                    color: calmSettings.level === l ? 'white' : '#475569',
                    border: '1.5px solid #E2E8F0',
                    padding: '6px 14px',
                    borderRadius: '100px',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Quiet features */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={() => setCalmSettings(prev => ({ ...prev, sound: !prev.sound }))}
                style={{
                  background: 'white',
                  color: '#475569',
                  border: '1.5px solid #E2E8F0',
                  padding: '6px 14px',
                  borderRadius: '100px',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {calmSettings.sound ? '🔊 SOUND: ACTIVE' : '🔇 SOUND: MUTED'}
              </button>
              <button 
                onClick={() => setCalmSettings(prev => ({ ...prev, speed: prev.speed === 'normal' ? 'slow' : 'normal' }))}
                style={{
                  background: 'white',
                  color: '#475569',
                  border: '1.5px solid #E2E8F0',
                  padding: '6px 14px',
                  borderRadius: '100px',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}
              >
                🐢 {calmSettings.speed === 'normal' ? 'SPEED: NORMAL' : 'SPEED: CALM (SLOW)'}
              </button>
            </div>
          </div>

          {/* Central Interactive Playground Area */}
          <div style={{ flex: 1, position: 'relative', overflowY: 'auto', background: '#F8FAFC', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
            
            {/* Game 1: Shape Matcher */}
            {activeGame === 'match_shape' && shapeTarget && (
              <div style={{ width: '100%', maxWidth: '600px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
                <div style={{ background: '#FAF5FF', border: '2px solid #E9D5FF', padding: '24px 40px', borderRadius: '24px', width: '100%', boxShadow: '0 4px 12px rgba(139, 92, 246, 0.05)' }}>
                  <p style={{ color: '#6B21A8', fontWeight: 800, fontSize: '1.15rem', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 12px' }}>
                    {language === 'en' ? 'FIND THE MATCHING SHAPE' : 'பொருத்தமான வடிவத்தைக் கண்டறியவும்'}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '6rem', lineHeight: 1 }}>{shapeTarget.emoji}</span>
                    <span style={{ fontSize: '1.8rem', fontWeight: 900, color: '#3B0764' }}>{shapeTarget.label}</span>
                  </div>
                </div>

                {/* Score indicators */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[...Array(calmSettings.level === 'beginner' ? 2 : calmSettings.level === 'medium' ? 3 : 4)].map((_, idx) => (
                    <div 
                      key={idx} 
                      style={{ 
                        width: '24px', 
                        height: '24px', 
                        borderRadius: '50%', 
                        background: idx < gameScore ? '#10B981' : '#E2E8F0',
                        border: idx < gameScore ? '2px solid #059669' : '2px solid #CBD5E1',
                        transition: 'all 0.3s' 
                      }} 
                    />
                  ))}
                </div>

                {/* Choice Buttons */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', width: '100%' }}>
                  {shapeChoices.map((choice, idx) => (
                    <button 
                      key={idx}
                      onClick={() => handleMatchShape(choice)}
                      className="btn-pop"
                      style={{
                        background: 'white',
                        border: '2px solid #E2E8F0',
                        borderRadius: '16px',
                        padding: '16px',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: '0 6px 16px rgba(0,0,0,0.02)',
                        transition: 'all 0.2s'
                      }}
                    >
                      <span style={{ fontSize: '2.2rem' }}>{choice.emoji}</span>
                      <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1E293B' }}>{choice.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Game 2: Find the Pair */}
            {activeGame === 'memory_pair' && (
              <div style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ color: '#065F46', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 8px' }}>
                    {language === 'en' ? 'FIND ALL MATCHING ANIMAL PAIRS!' : 'அனைத்து விலங்கு ஜோடிகளையும் கண்டுபிடி!'}
                  </p>
                </div>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: calmSettings.level === 'beginner' ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', 
                  gap: '14px', 
                  width: '100%' 
                }}>
                  {memoryCards.map((card, idx) => (
                    <div 
                      key={card.id}
                      onClick={() => handleMemoryFlip(idx)}
                      className="btn-pop"
                      style={{
                        height: '100px',
                        background: card.matched ? '#ECFDF5' : card.flipped ? '#F8FAFC' : 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
                        border: card.matched ? '3px solid #10B981' : card.flipped ? '3px solid #3B82F6' : '3px solid white',
                        borderRadius: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: card.matched ? 'default' : 'pointer',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.04)',
                        transition: 'all 0.3s transform'
                      }}
                    >
                      {(card.flipped || card.matched) ? (
                        <span style={{ fontSize: '2.2rem' }}>{card.icon}</span>
                      ) : (
                        <Star size={30} color="white" fill="white" style={{ opacity: 0.7 }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Game 3: Healthy Food Sorter */}
            {activeGame === 'sort_food' && foodItem && (
              <div style={{ width: '100%', maxWidth: '600px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
                <div>
                  <p style={{ color: '#9D174D', fontWeight: 800, fontSize: '0.95rem', letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 10px' }}>
                    {language === 'en' ? 'CLASSIFY THIS FOOD ITEM' : 'இந்த உணவை வகைப்படுத்துங்கள்'}
                  </p>
                  
                  <div style={{ background: '#FFF5F5', border: '2px solid #FECDD3', padding: '20px', borderRadius: '24px', display: 'inline-block', minWidth: '180px', boxShadow: '0 10px 20px rgba(244,114,182,0.05)' }}>
                    <span style={{ fontSize: '4.5rem', lineHeight: 1 }}>{foodItem.name.split(' ')[0]}</span>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#4C0519', margin: '8px 0 0' }}>{foodItem.name.split(' ').slice(1).join(' ')}</h2>
                  </div>
                </div>

                {/* Score Indicator */}
                <div style={{ display: 'flex', gap: '6px' }}>
                  {[...Array(calmSettings.level === 'beginner' ? 3 : calmSettings.level === 'medium' ? 5 : 7)].map((_, idx) => (
                    <div 
                      key={idx} 
                      style={{ 
                        width: '16px', 
                        height: '16px', 
                        borderRadius: '50%', 
                        background: idx < sortScore ? '#F472B6' : '#E2E8F0',
                        border: idx < sortScore ? '2px solid #DB2777' : '2px solid #CBD5E1',
                        transition: 'all 0.3s' 
                      }} 
                    />
                  ))}
                </div>

                {/* Targets */}
                <div style={{ display: 'flex', gap: '16px', width: '100%' }}>
                  <button 
                    onClick={() => handleSortFood(true)}
                    className="btn-pop animate-pulse"
                    style={{
                      flex: 1,
                      background: '#ECFDF5',
                      border: '2.5px solid #10B981',
                      borderRadius: '16px',
                      padding: '16px',
                      fontSize: '1rem',
                      fontWeight: 900,
                      color: '#065F46',
                      cursor: 'pointer',
                      boxShadow: '0 10px 20px rgba(16,185,129,0.08)'
                    }}
                  >
                    🍎 {language === 'en' ? 'HEALTHY FRUIT/VEGGIE' : 'சத்தான உணவு'}
                  </button>

                  <button 
                    onClick={() => handleSortFood(false)}
                    className="btn-pop"
                    style={{
                      flex: 1,
                      background: '#FFF7ED',
                      border: '2.5px solid #F97316',
                      borderRadius: '16px',
                      padding: '16px',
                      fontSize: '1rem',
                      fontWeight: 900,
                      color: '#9A3412',
                      cursor: 'pointer',
                      boxShadow: '0 10px 20px rgba(249,115,22,0.08)'
                    }}
                  >
                    🍕 {language === 'en' ? 'SWEET TREAT / SNACK' : 'இனிப்பு / தின்பண்டம்'}
                  </button>
                </div>
              </div>
            )}

            {/* Game 4: Morning Routine Sequence */}
            {activeGame === 'sequence_routine' && (
              <div style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ color: '#075985', fontWeight: 800, fontSize: '0.95rem', letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 6px' }}>
                    {language === 'en' ? 'ORDER ROUTINE CARDS FROM FIRST TO LAST' : 'காலை வழக்க அட்டைகளை வரிசைப்படுத்தவும்!'}
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
                  {routineCards.map((card, idx) => (
                    <div 
                      key={card.step}
                      style={{
                        background: 'white',
                        border: '2px solid #E2E8F0',
                        borderRadius: '16px',
                        padding: '12px 20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        boxShadow: '0 6px 12px rgba(0,0,0,0.02)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '32px', height: '32px', background: `${card.color}15`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: card.color, fontWeight: 900, fontSize: '1.05rem' }}>
                          {idx + 1}
                        </div>
                        <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1E293B' }}>{card.text}</span>
                      </div>

                      {/* Direction Shift Controls */}
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button 
                          disabled={idx === 0}
                          onClick={() => handleMoveRoutineCard(idx, idx - 1)}
                          style={{
                            background: '#F1F5F9',
                            border: 'none',
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: idx === 0 ? 'default' : 'pointer',
                            opacity: idx === 0 ? 0.3 : 1,
                            fontSize: '0.8rem'
                          }}
                        >
                          ▲
                        </button>
                        
                        <button 
                          disabled={idx === routineCards.length - 1}
                          onClick={() => handleMoveRoutineCard(idx, idx + 1)}
                          style={{
                            background: '#F1F5F9',
                            border: 'none',
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: idx === routineCards.length - 1 ? 'default' : 'pointer',
                            opacity: idx === routineCards.length - 1 ? 0.3 : 1,
                            fontSize: '0.8rem'
                          }}
                        >
                          ▼
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Simple Bottom Safety Exit Bar */}
          <div style={{ padding: '24px 40px', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'center', background: 'white' }}>
            <button 
              onClick={() => {
                setActiveGame(null);
                setShowSuccess(false);
              }} 
              style={{ background: '#94A3B8', color: 'white', fontWeight: 800, fontSize: '1.1rem', padding: '12px 60px', borderRadius: '100px', border: 'none', cursor: 'pointer' }}
              className="btn-pop"
            >
              {language === 'en' ? 'LEAVE GAME' : 'விளையாட்டை விட்டு வெளியேறு'}
            </button>
          </div>

        </div>
      </div>
    );
  };

  const renderPlanner = () => {
    const getCategoryIcon = (cat) => {
      if (cat === 'Social') return <Smile size={24} />;
      if (cat === 'Education') return <BookOpen size={24} />;
      if (cat === 'Sensory') return <Sparkles size={24} />;
      if (cat === 'Communication') return <MessageCircle size={24} />;
      return <Award size={24} />;
    };

    const getCategoryColors = (cat) => {
      if (cat === 'Social') return { bg: '#EEF2FF', color: '#6366F1' };
      if (cat === 'Education') return { bg: '#F5F3FF', color: '#8B5CF6' };
      if (cat === 'Sensory') return { bg: '#ECFDF5', color: '#10B981' };
      if (cat === 'Communication') return { bg: '#FDF2F8', color: '#EC4899' };
      return { bg: '#F1F5F9', color: '#475569' };
    };

    return (
      <div className="animate-slide-up">
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: '32px', alignItems: 'stretch' }}>
          
          {/* Main Planner Grid Column */}
          <div className="bento-card" style={{ padding: '40px', border: '1px solid #E2E8F0', borderRadius: '24px', background: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 12px 36px rgba(0,0,0,0.02)' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '36px' }}>
                 <div>
                   <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '6px', color: '#0F172A', letterSpacing: '-0.5px', marginTop: 0 }}>
                     {language === 'en' ? 'Hero Mission Planner' : 'ஹீரோ மிஷன் பிளானர்'}
                   </h2>
                   <p style={{ color: 'var(--slate-500)', fontWeight: 650, fontSize: '1.05rem', margin: 0 }}>
                     {language === 'en' ? 'Follow the path to earn the Mega Hero Badge!' : 'மெகா ஹீரோ பேட்ஜைப் பெற பாதையைப் பின்பற்றுங்கள்!'}
                   </p>
                 </div>
                 <div style={{ background: '#D1FAE5', color: '#065F46', padding: '8px 18px', borderRadius: '100px', fontWeight: 900, fontSize: '0.85rem', letterSpacing: '0.5px' }}>
                   🚀 {language === 'en' ? '7 DAY STREAK!' : '7 நாட்கள் தொடர் சவால்!'}
                 </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {plannerTasks.map(task => {
                  const colors = getCategoryColors(task.category);
                  return (
                    <div 
                      key={task.id} 
                      className="bento-card btn-pop" 
                      style={{ 
                        padding: '16px 24px', 
                        background: task.done ? '#ECFDF5' : 'white', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '16px', 
                        border: task.done ? '2px solid #10B981' : '2px solid #E2E8F0', 
                        borderRadius: '16px',
                        boxShadow: task.done ? '0 10px 24px rgba(16, 185, 129, 0.05)' : 'none',
                        transition: 'all 0.2s ease'
                      }}
                    >
                       <div style={{ color: task.done ? '#10B981' : '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         {getCategoryIcon(task.category)}
                       </div>
                       
                       <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                             <span style={{ color: 'var(--slate-400)', fontWeight: 800, fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                               <Clock size={14} /> {task.time}
                             </span>
                             <span style={{ background: colors.bg, color: colors.color, padding: '2px 10px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                               {task.category}
                             </span>
                          </div>
                          <h4 style={{ 
                            fontSize: '1.05rem', 
                            fontWeight: 850, 
                            margin: 0, 
                            textDecoration: task.done ? 'line-through' : 'none', 
                            color: task.done ? '#94A3B8' : '#0F172A',
                            letterSpacing: '-0.3px'
                          }}>
                            {language === 'en' ? task.mission : task.ta}
                          </h4>
                       </div>

                       <button 
                         onClick={() => togglePlannerTask(task.id)} 
                         className="btn-pop" 
                         style={{ 
                           background: task.done ? '#10B981' : '#0F172A', 
                           color: 'white',
                           border: 'none',
                           borderRadius: '100px',
                           padding: '10px 20px', 
                           fontSize: '0.8rem',
                           fontWeight: 900,
                           cursor: 'pointer',
                           display: 'inline-flex',
                           alignItems: 'center',
                           gap: '6px',
                           boxShadow: task.done ? 'none' : '0 6px 16px rgba(15,23,42,0.15)',
                           transition: 'all 0.2s ease'
                         }}
                       >
                          {task.done ? (
                            <>
                              <CheckCircle size={14} strokeWidth={3} /> 
                              <span>{language === 'en' ? 'COMPLETED' : 'முடிந்தது'}</span>
                            </>
                          ) : (
                            <span>{language === 'en' ? 'START MISSION' : 'பணியைத் தொடங்கு'}</span>
                          )}
                       </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Sidebar Columns */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
             
             {/* Mission Advice Glowing Card */}
             <div className="bento-card" style={{ padding: '32px', background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)', color: 'white', borderRadius: '24px', boxShadow: '0 20px 40px rgba(109, 40, 217, 0.15)' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '12px', color: 'white', letterSpacing: '-0.3px', marginTop: 0 }}>
                  {language === 'en' ? 'Mission Advice' : 'மிஷன் ஆலோசனை'}
                </h3>
                <p style={{ fontSize: '1.05rem', fontWeight: 650, lineHeight: 1.6, opacity: 0.95, margin: 0 }}>
                  {language === 'en' 
                    ? '"Arjun, today\'s focus is on social greetings. Try to complete the \'Alphabet Academy\' mission before lunch to unlock a new sticker!"'
                    : '"அர்ஜுன், இன்றைய கவனம் சமூக வாழ்த்துக்கள் மீது உள்ளது. மதிய உணவுக்கு முன் \'அகரவரிசை அகாடமி\' மிஷனை முடிக்க முயற்சித்து புதிய ஸ்டிக்கரைத் திறக்கவும்!"'}
                </p>
                <div style={{ marginTop: '28px', display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '20px' }}>
                   <div style={{ width: '38px', height: '38px', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <Star size={18} fill="white" color="white" />
                   </div>
                   <span style={{ fontWeight: 900, fontSize: '1rem', letterSpacing: '0.3px' }}>
                     {language === 'en' ? 'Reward: +100 Hero Stars' : 'வெகுமதி: +100 ஹீரோ நட்சத்திரங்கள்'}
                   </span>
                </div>
             </div>

             {/* Journey Roadmap Progress Timeline */}
             <div className="bento-card" style={{ padding: '32px', background: 'white', border: '1px solid #E2E8F0', borderRadius: '24px' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '24px', color: '#0F172A', letterSpacing: '-0.3px', marginTop: 0 }}>
                  {language === 'en' ? 'Journey Roadmap' : 'பயண வழிகாட்டி'}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                   {[
                     { label: language === 'en' ? 'Morning Ritual' : 'காலை சடங்கு', done: true },
                     { label: language === 'en' ? 'School / Therapy' : 'பள்ளி / சிகிச்சை', done: true },
                     { label: language === 'en' ? 'Playtime Hub' : 'விளையாட்டு மையம்', done: false },
                     { label: language === 'en' ? 'Evening Calm' : 'மாலை அமைதி', done: false }
                   ].map((r, i) => (
                     <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ 
                          width: '10px', 
                          height: '10px', 
                          background: r.done ? '#10B981' : '#CBD5E1', 
                          borderRadius: '50%',
                          boxShadow: r.done ? '0 0 8px rgba(16, 185, 129, 0.5)' : 'none'
                        }}></div>
                        <span style={{ 
                          fontWeight: 800, 
                          color: r.done ? '#0F172A' : '#94A3B8', 
                          fontSize: '1.05rem' 
                        }}>
                          {r.label}
                        </span>
                     </div>
                   ))}
                </div>
             </div>

          </div>
        </div>
      </div>
    );
  };

  const handleApplyScheme = (schemeId) => {
    if (appliedSchemes.includes(schemeId)) return;
    const newApplied = [...appliedSchemes, schemeId];
    setAppliedSchemes(newApplied);
    localStorage.setItem('appliedSchemes', JSON.stringify(newApplied));
    setStarsEarned(s => s + 50);
    setSparkles(p => [...p, { id: Date.now(), x: window.innerWidth/2, y: window.innerHeight/2, color: '#10B981', size: 50 }]);
  };

  const renderSchemes = () => {
    const governmentSchemes = [
      {
        id: 'niramaya',
        title: language === 'en' ? 'Niramaya Health Insurance' : 'நிராமயா காப்பீட்டுத் திட்டம்',
        desc: language === 'en' ? '₹1,00,000 health insurance covering clinical therapy, hospital checkups, and diagnostics without pre-medical tests.' : 'ஆட்டிசம் கொண்ட குழந்தைகளுக்கு ₹1,00,000 வரையிலான மருத்துவ சிகிச்சை மற்றும் காப்பீட்டுத் திட்டம்.',
        benefit: language === 'en' ? '₹1,00,000 Annual Cover' : '₹1,00,000 வருடாந்திர காப்பீடு',
        premium: language === 'en' ? '₹250 - ₹500 / year' : 'ஆண்டுக்கு ₹250 - ₹500',
        color: '#8B5CF6',
        icon: ShieldCheck
      },
      {
        id: 'disha',
        title: language === 'en' ? 'Disha Early Intervention' : 'திஷா ஆரம்பகால சிகிச்சை',
        desc: language === 'en' ? 'Early intervention, pediatric evaluation, school readiness facilities and diagnostic support for children aged 0-10 years.' : '0 முதல் 10 வயது வரை உள்ள குழந்தைகளுக்கு ஆரம்பகட்ட சிகிச்சை, மதிப்பீடு மற்றும் பள்ளி ஆயத்த பயிற்சி வழங்கும் திட்டம்.',
        benefit: language === 'en' ? 'Free Diagnostic Services' : 'இலவச ஆரம்ப சிகிச்சை',
        premium: language === 'en' ? '100% Govt Funded' : '100% அரசு நிதியுதவி',
        color: '#10B981',
        icon: BookOpen
      },
      {
        id: 'gyanprabha',
        title: language === 'en' ? 'Gyan Prabha Scholarship' : 'ஞான பிரபா கல்வி உதவித்தொகை',
        desc: language === 'en' ? 'Financial support for pursuing educational and professional vocational training courses at certified institutions.' : 'சான்றளிக்கப்பட்ட நிறுவனங்களில் தொழிற்பயிற்சி மற்றும் கல்வி கற்க நிதியுதவி வழங்கும் உதவித்தொகை திட்டம்.',
        benefit: language === 'en' ? '₹1,00,000 Annual Cover' : '₹1,00,000 வருடாந்திர காப்பீடு',
        benefit: language === 'en' ? '₹1,000 / month support' : 'மாதம் ₹1,000 நிதியுதவி',
        premium: language === 'en' ? 'Direct Bank Transfer' : 'நேரடி வங்கி பரிமாற்றம்',
        color: '#F472B6',
        icon: Award
      },
      {
        id: 'udid',
        title: language === 'en' ? 'UDID Disability ID Card' : 'UDID அடையாள அட்டை',
        desc: language === 'en' ? 'Universal disability card for digital record tracking, healthcare benefits, travel subsidies, and state allowances.' : 'அரசு நலத்திட்டங்கள், சலுகைகள் மற்றும் மாற்றுத்திறனாளி நிதியுதவி பெற தேவையான உலகளாவிய அடையாள அட்டை.',
        benefit: language === 'en' ? 'Lifetime Card Validity' : 'ஆயுட்கால செல்லுபடி',
        premium: language === 'en' ? 'Free Registration' : 'இலவச பதிவு',
        color: '#38BDF8',
        icon: Calendar
      }
    ];

    return (
      <div className="animate-slide-up">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
          {governmentSchemes.map(s => {
            const isApplied = appliedSchemes.includes(s.id);
            const Icon = s.icon;
            return (
              <div key={s.id} className="bento-card btn-pop" style={{ padding: '24px', position: 'relative', overflow: 'hidden', border: isApplied ? `1px solid ${s.color}` : '1px solid var(--slate-200)', borderRadius: '16px', background: 'white' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <div style={{ width: '60px', height: '60px', background: `${s.color}15`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color }}>
                    <Icon size={28} />
                  </div>
                  <span style={{ background: isApplied ? '#D1FAE5' : '#F1F5F9', color: isApplied ? '#065F46' : '#475569', padding: '6px 16px', borderRadius: '100px', fontWeight: 800, fontSize: '0.9rem' }}>
                    {isApplied ? (language === 'en' ? '● Active Benefit' : '● செயல்பாட்டில் உள்ளது') : (language === 'en' ? 'Not Applied' : 'விண்ணப்பிக்கவில்லை')}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.3rem', fontWeight: 900, marginBottom: '8px', color: 'var(--slate-900)' }}>{s.title}</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--slate-500)', fontWeight: 600, lineHeight: 1.5, marginBottom: '20px' }}>{s.desc}</p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', padding: '16px', background: 'var(--slate-50)', borderRadius: '12px', marginBottom: '24px' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--slate-400)', fontWeight: 800, textTransform: 'uppercase' }}>{language === 'en' ? 'CORE BENEFIT' : 'முக்கிய பலன்'}</span>
                    <p style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--slate-800)', margin: '4px 0 0' }}>{s.benefit}</p>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--slate-400)', fontWeight: 800, textTransform: 'uppercase' }}>{language === 'en' ? 'PREMIUM / COST' : 'காப்பீட்டு கட்டணம்'}</span>
                    <p style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--slate-800)', margin: '4px 0 0' }}>{s.premium}</p>
                  </div>
                </div>

                <button 
                  onClick={() => handleApplyScheme(s.id)}
                  disabled={isApplied}
                  className="btn-neon" 
                  style={{ 
                    background: isApplied ? '#059669' : s.color, 
                    width: '100%', 
                    padding: '12px', 
                    fontSize: '0.95rem', 
                    fontWeight: 800,
                    cursor: isApplied ? 'default' : 'pointer'
                  }}
                >
                  {isApplied ? (language === 'en' ? '✓ CLAIMED & APPLIED (+50 ⭐)' : '✓ விண்ணப்பிக்கப்பட்டது (+50 ⭐)') : (language === 'en' ? 'APPLY NOW ⮕' : 'இப்போதே விண்ணப்பி ⮕')}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderProfile = () => {
    const frameGradients = {
      explorer: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
      ranger: 'linear-gradient(135deg, #10B981, #059669)',
      guardian: 'linear-gradient(135deg, #06B6D4, #3B82F6)'
    };

    const frameNames = {
      explorer: language === 'en' ? 'Space Explorer' : 'விண்வெளி ஆய்வாளர்',
      ranger: language === 'en' ? 'Jungle Ranger' : 'காட்டு பாதுகாவலர்',
      guardian: language === 'en' ? 'Ocean Guardian' : 'கடல் காவலர்'
    };

    const skills = [
      { name: language === 'en' ? 'Communication Skills' : 'தொடர்பு திறன்', value: 90, grade: 'A', icon: MessageCircle, color: '#3B82F6' },
      { name: language === 'en' ? 'Cognitive Skills' : 'அறிவாற்றல் திறன்', value: 80, grade: 'B', icon: BookOpen, color: '#8B5CF6' },
      { name: language === 'en' ? 'Sensory Adaptation' : 'உணர்வுசார் தழுவல்', value: 75, grade: 'B', icon: Sparkles, color: '#10B981' },
      { name: language === 'en' ? 'Social Interaction' : 'சமூக தொடர்பு', value: 60, grade: 'C', icon: Smile, color: '#F59E0B' }
    ];

    const records = [
      { name: language === 'en' ? 'First Diagnostic Report' : 'முதல் கண்டறிதல் அறிக்கை', date: '12/06/2024', size: '2.4 MB' },
      { name: language === 'en' ? 'Sensory Progress Log' : 'உணர்வுசார் முன்னேற்றப் பதிவு', date: '04/05/2026', size: '1.8 MB' }
    ];

    return (
      <div className="animate-slide-up" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* Top Row: Passport Card & Credentials (Equal Height Grid) */}
        <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '32px', alignItems: 'stretch' }}>
          
          {/* Left Column: Hero Passport Card */}
          <div className="bento-card" style={{ padding: '40px 32px', background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '28px', textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
            
            {/* Ambient Tech Grid Overlay Decor */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%', opacity: 0.03, pointerEvents: 'none', background: 'radial-gradient(circle, #FFF 1px, transparent 1px) 0 0/20px 20px' }}></div>
            
            <div style={{ position: 'relative', zIndex: 2 }}>
              {/* Premium Circular Holographic Avatar Frame */}
              <div style={{ position: 'relative', width: '150px', height: '150px', margin: '0 auto 24px' }}>
                <div style={{ position: 'absolute', inset: -8, background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', borderRadius: '54px', opacity: 0.22, filter: 'blur(8px)' }}></div>
                <div style={{ position: 'absolute', inset: -3, background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', borderRadius: '50px', padding: '3px' }}>
                  <div style={{ width: '100%', height: '100%', background: '#0F172A', borderRadius: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60A5FA' }}>
                    <User size={68} strokeWidth={1.5} />
                  </div>
                </div>
                <div style={{ position: 'absolute', bottom: -4, right: -4, background: '#10B981', color: 'white', padding: '5px 14px', borderRadius: '100px', fontWeight: 900, fontSize: '0.8rem', border: '3px solid #0F172A', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>VERIFIED</div>
              </div>

              {/* Title & Level Info */}
              <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'white', margin: '0 0 6px', letterSpacing: '-0.5px' }}>Arjun Ramakrishnan</h3>
              <p style={{ fontSize: '1rem', color: '#64748B', fontWeight: 800, margin: '0 0 16px', letterSpacing: '0.8px' }}>REF: #ATH-29401</p>
              
              <span style={{ display: 'inline-block', background: 'rgba(59, 130, 246, 0.1)', color: '#60A5FA', padding: '6px 20px', borderRadius: '100px', fontWeight: 900, fontSize: '0.9rem', border: '1px solid rgba(59, 130, 246, 0.2)', marginBottom: '24px' }}>
                LEVEL {childLevel} EXPLORER
              </span>

              {/* Rank Progress Bar */}
              <div style={{ textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 800, color: '#94A3B8', marginBottom: '8px' }}>
                  <span>RANK PROGRESS</span>
                  <span style={{ color: '#60A5FA' }}>170 / 250 XP</span>
                </div>
                <div style={{ width: '100%', height: '12px', background: 'rgba(255,255,255,0.08)', borderRadius: '10px', overflow: 'hidden', position: 'relative' }}>
                  <div style={{ width: '68%', height: '100%', background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)', borderRadius: '10px', transition: 'all 0.4s ease' }}></div>
                </div>
              </div>
            </div>

            {/* Premium Tech Barcode & Secure Token Footer */}
            <div style={{ marginTop: '24px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 2 }}>
              <div style={{ textAlign: 'left' }}>
                <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>SECURE TRANSMISSION</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 900, color: '#94A3B8', fontFamily: 'monospace' }}>AURA AUTH // CL-940</span>
              </div>
              {/* Clinical Barcode Graphics */}
              <div style={{ display: 'flex', gap: '3px', height: '24px', opacity: 0.4, alignItems: 'flex-end' }}>
                {[4, 8, 2, 7, 5, 1, 9, 3, 6, 4].map((h, i) => (
                  <div key={i} style={{ width: i % 3 === 0 ? '3px' : '1.5px', height: `${h * 10}%`, background: 'white', borderRadius: '1px' }}></div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Identity Grid Section */}
          <div className="bento-card" style={{ padding: '40px', background: 'white', border: '1px solid #E2E8F0', borderRadius: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--slate-900)', marginBottom: '32px' }}>
              {language === 'en' ? 'Guardian & Clinical Credentials' : 'பாதுகாவலர் & மருத்துவ சான்றிதழ்கள்'}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              {[
                { label: language === 'en' ? 'Legal Full Name' : 'சட்டப்பூர்வ முழு பெயர்', value: 'Arjun Ramakrishnan', icon: User, color: 'var(--p-500)' },
                { label: language === 'en' ? 'Child Age (DOB)' : 'வயது (பிறந்த தேதி)', value: '6 Years Old (12/05/2018)', icon: Calendar, color: 'var(--s-500)' },
                { label: language === 'en' ? 'Primary Caregiver' : 'முதன்மை பராமரிப்பாளர்', value: 'Rahul Ramakrishnan', icon: Heart, color: '#EF4444' },
                { label: language === 'en' ? 'Assigned Specialist' : 'நியமிக்கப்பட்ட நிபுணர்', value: 'Dr. Smitha (Apollo Clinical)', icon: ShieldCheck, color: '#10B981' }
              ].map((info, idx) => (
                <div key={idx} style={{ padding: '24px', background: 'var(--slate-50)', border: '1px solid var(--slate-100)', borderRadius: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                    <div style={{ width: '36px', height: '36px', background: `${info.color}15`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: info.color }}>
                      <info.icon size={20} />
                    </div>
                    <span style={{ fontWeight: 800, color: 'var(--slate-400)', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{info.label}</span>
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)', paddingLeft: '48px' }}>{info.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row: Skills Metrics & Documents Vault (Equal Height Grid) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px', alignItems: 'stretch' }}>
          
          {/* Left Column: Skill Metrics Panel */}
          <div className="bento-card" style={{ padding: '40px', background: 'white', border: '1px solid #E2E8F0', borderRadius: '28px' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--slate-900)', marginBottom: '32px' }}>
              {language === 'en' ? 'Active Skill Progression Metrics' : 'செயலில் உள்ள திறன் முன்னேற்ற அளவீடுகள்'}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {skills.map((skill, index) => {
                const SkillIcon = skill.icon;
                return (
                  <div key={index} style={{ padding: '16px 20px', background: 'var(--slate-50)', borderRadius: '16px', border: '1px solid var(--slate-100)', display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '20px', alignItems: 'center' }}>
                    <div style={{ width: '44px', height: '44px', background: `${skill.color}15`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: skill.color }}>
                      <SkillIcon size={22} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontWeight: 800, color: 'var(--slate-800)', fontSize: '1.05rem' }}>{skill.name}</span>
                        <span style={{ fontWeight: 800, color: skill.color, fontSize: '1rem' }}>{skill.value}% Mastery</span>
                      </div>
                      <div style={{ width: '100%', height: '10px', background: 'var(--slate-200)', borderRadius: '10px', overflow: 'hidden' }}>
                        <div style={{ width: `${skill.value}%`, height: '100%', background: skill.color, borderRadius: '10px' }}></div>
                      </div>
                    </div>
                    <div style={{ background: `${skill.color}15`, color: skill.color, fontWeight: 900, fontSize: '1.2rem', width: '42px', height: '42px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${skill.color}` }}>
                      {skill.grade}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Documents Vault */}
          <div className="bento-card" style={{ padding: '40px', background: 'white', border: '1px solid #E2E8F0', borderRadius: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--slate-900)', marginBottom: '32px' }}>
                {language === 'en' ? 'Medical & Progress Reports' : 'மருத்துவ & முன்னேற்ற அறிக்கைகள்'}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {records.map((rec, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', border: '1px solid var(--slate-150)', borderRadius: '16px', background: 'var(--slate-50)' }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: 'var(--slate-800)' }}>{rec.name}</h4>
                      <span style={{ fontSize: '0.9rem', color: 'var(--slate-400)', fontWeight: 800, display: 'block', marginTop: '4px' }}>{rec.date} • {rec.size}</span>
                    </div>
                    <button 
                      onClick={() => navigate('/report')}
                      className="btn-neon" 
                      style={{ 
                        background: 'white', 
                        color: 'var(--slate-700)', 
                        border: '1px solid var(--slate-200)', 
                        padding: '8px 20px', 
                        fontSize: '0.95rem', 
                        fontWeight: 800,
                        boxShadow: 'none'
                      }}
                    >
                      VIEW RECORD
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Global Export Section */}
        <div style={{ padding: '40px 48px', background: 'var(--slate-900)', borderRadius: '28px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 20px 40px rgba(15,23,42,0.15)' }}>
           <div>
             <h4 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 900, letterSpacing: '-0.3px' }}>
               {language === 'en' ? 'Comprehensive Clinical PDF Export' : 'விரிவான மருத்துவ PDF ஏற்றுமதி'}
             </h4>
             <p style={{ margin: '8px 0 0', opacity: 0.7, fontWeight: 600, fontSize: '1.1rem', lineHeight: 1.5 }}>
               {language === 'en' ? 'Compile and download the absolute history, game scoring progression, and specialist signoffs.' : 'முழுமையான வரலாறு, விளையாட்டின் மதிப்பெண் முன்னேற்றம் மற்றும் நிபுணர்களின் ஒப்புதல்களைப் பதிவிறக்கவும்.'}
             </p>
           </div>
           <button onClick={() => navigate('/report')} className="btn-neon" style={{ background: 'white', color: 'var(--slate-900)', padding: '18px 44px', fontSize: '1.15rem', fontWeight: 900 }}>
             {language === 'en' ? 'GENERATE FULL REPORT' : 'முழு அறிக்கையை உருவாக்கு'}
           </button>
        </div>

      </div>
    );
  };

  const renderChat = () => (
    <div className="bento-card animate-slide-up" style={{ display: 'flex', flexDirection: 'column', height: '70vh', padding: 0, overflow: 'hidden', border: '1px solid #E2E8F0', borderRadius: '16px', background: 'white' }}>
      <div style={{ padding: '20px 32px', borderBottom: '1px solid var(--slate-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', background: 'var(--p-100)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--p-500)' }}><User size={24} /></div>
          <div><h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Dr. Smitha</h3><p style={{ color: 'var(--s-500)', fontWeight: 800, margin: 0, fontSize: '0.9rem' }}>● Online & Helping</p></div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
           <button className="btn-neon" style={{ background: 'var(--slate-100)', color: 'var(--slate-900)', boxShadow: 'none', padding: '8px 16px' }}><Phone size={18} /></button>
           <button className="btn-neon" style={{ padding: '8px 20px' }}><Video size={18} /> START VIDEO CALL</button>
        </div>
      </div>
      <div style={{ flex: 1, padding: '32px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px', background: 'rgba(248, 250, 252, 0.5)' }}>
        {messages.map(msg => (
          <div key={msg.id} style={{ alignSelf: msg.sender === 'parent' ? 'flex-end' : 'flex-start', maxWidth: '60%' }}>
            <div style={{ background: msg.sender === 'parent' ? 'var(--p-500)' : 'white', color: msg.sender === 'parent' ? 'white' : 'var(--slate-900)', padding: '16px 20px', borderRadius: '16px', borderBottomRightRadius: msg.sender === 'parent' ? '4px' : '16px', borderBottomLeftRadius: msg.sender === 'doctor' ? '4px' : '16px', fontWeight: 600, fontSize: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: msg.sender === 'parent' ? 'none' : '1px solid #E2E8F0' }}>{msg.text}</div>
            <p style={{ fontSize: '0.85rem', color: 'var(--slate-400)', marginTop: '6px', textAlign: msg.sender === 'parent' ? 'right' : 'left', fontWeight: 800 }}>{msg.time}</p>
          </div>
        ))}
      </div>
      <div style={{ padding: '20px 32px', background: 'white', borderTop: '1px solid var(--slate-200)', display: 'flex', gap: '16px' }}>
        <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="Type your message hero..." style={{ flex: 1, padding: '12px 20px', borderRadius: '12px', border: '1px solid var(--slate-200)', fontSize: '1rem', fontWeight: 600, outline: 'none', transition: 'all 0.3s' }} onFocus={(e) => e.target.style.borderColor = 'var(--p-500)'} />
        <button onClick={handleSendMessage} className="btn-neon" style={{ padding: '0 32px' }}>SEND</button>
      </div>
    </div>
  );

  return (
    <div onMouseMove={handleMouseMove} style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFC', fontFamily: 'system-ui, -apple-system, sans-serif', position: 'relative' }}>
      
      <style>{`
        @keyframes sparkle-pop {
          0% {
            transform: translate(-50%, -50%) scale(0.2) rotate(0deg);
            opacity: 1;
            filter: drop-shadow(0 0 4px currentColor);
          }
          50% {
            opacity: 1;
            filter: drop-shadow(0 0 12px currentColor);
          }
          100% {
            transform: translate(-50%, -50%) scale(1.4) rotate(180deg);
            opacity: 0;
          }
        }
        .magic-sparkle {
          pointer-events: none;
          position: fixed;
          z-index: 99999;
          mix-blend-mode: screen;
          transform: translate(-50%, -50%);
        }
      `}</style>

      {sparkles.map(s => (
        <div key={s.id} className="magic-sparkle" style={{ left: s.x, top: s.y, color: s.color, animation: 'sparkle-pop 0.7s forwards ease-out' }}>
          <Sparkles size={s.size} fill="currentColor" />
        </div>
      ))}
      
      {renderGameOverlay()}
      
      {/* Strict Enterprise Sidebar */}
      <aside style={{ width: '260px', background: 'white', borderRight: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 10 }}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: '#2563EB', padding: '8px', borderRadius: '8px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Rocket color="white" size={20} /></div>
          <h1 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>AURA Child</h1>
        </div>

        <nav style={{ padding: '20px 12px', display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px', paddingLeft: '10px' }}>Hero Station</div>
          {(language === 'en' ? [
            { id: 'dashboard', icon: LayoutDashboard, label: 'My Home' },
            { id: 'planner', icon: Calendar, label: 'Daily Missions' },
            { id: 'games', icon: Gamepad2, label: 'Fun Games' },
            { id: 'schemes', icon: ShieldCheck, label: 'Govt Schemes' },
            { id: 'chat', icon: MessageCircle, label: 'Doctor Chat' },
            { id: 'profile', icon: User, label: 'My Profile' }
          ] : [
            { id: 'dashboard', icon: LayoutDashboard, label: 'என் வீடு' },
            { id: 'planner', icon: Calendar, label: 'தினசரி பணிகள்' },
            { id: 'games', icon: Gamepad2, label: 'விளையாட்டு உலகம்' },
            { id: 'schemes', icon: ShieldCheck, label: 'அரசு திட்டங்கள்' },
            { id: 'chat', icon: MessageCircle, label: 'மருத்துவர் அரட்டை' },
            { id: 'profile', icon: User, label: 'எனது சுயவிவரம்' }
          ]).map(tab => (
            <div 
              key={tab.id} 
              onClick={() => setCurrentTab(tab.id)} 
              style={{ 
                display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', borderRadius: '8px', cursor: 'pointer',
                background: currentTab === tab.id ? '#EFF6FF' : 'transparent',
                color: currentTab === tab.id ? '#2563EB' : '#475569',
                fontWeight: currentTab === tab.id ? 700 : 600,
                fontSize: '0.95rem',
                transition: 'all 0.15s'
              }}
            >
               <tab.icon size={18} />
               <span>{tab.label}</span>
            </div>
          ))}
        </nav>

        <div style={{ padding: '20px', borderTop: '1px solid #E2E8F0' }}>
          <button 
            onClick={() => navigate('/')} 
            style={{ 
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              background: '#FEE2E2', color: '#EF4444', padding: '10px', borderRadius: '8px',
              fontWeight: 700, fontSize: '0.9rem', border: '1px solid #FCA5A5', cursor: 'pointer',
              transition: 'all 0.15s'
            }}
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, marginLeft: '260px', minHeight: '100vh', background: '#F8FAFC', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <header style={{ height: '72px', borderBottom: '1px solid #E2E8F0', background: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 32px', position: 'sticky', top: 0, zIndex: 5 }}>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', margin: 0, letterSpacing: '-0.3px' }}>
              {currentTab === 'dashboard' && (language === 'en' ? 'Welcome, Arjun!' : 'வரவேற்கிறோம், அர்ஜுன்!')}
              {currentTab === 'planner' && (language === 'en' ? 'Daily Growth Missions' : 'தினசரி வளர்ச்சிப் பணிகள்')}
              {currentTab === 'games' && (language === 'en' ? 'Skills Universe' : 'திறன் விளையாட்டு உலகம்')}
              {currentTab === 'schemes' && (language === 'en' ? 'Government Support Schemes' : 'அரசு நலத்திட்டங்கள்')}
              {currentTab === 'chat' && (language === 'en' ? 'Doctor Consult' : 'மருத்துவர் அரட்டை')}
              {currentTab === 'profile' && (language === 'en' ? 'Super Hero Profile' : 'சுயவிவரம்')}
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', background: 'white' }}>
                <Star fill="#F59E0B" color="#F59E0B" size={16} />
                <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0F172A' }}>{starsEarned} <span style={{ color: '#64748B', fontSize: '0.75rem', fontWeight: 600 }}>STARS</span></span>
             </div>
             <div style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white', color: '#64748B' }}><Award size={18} /></div>
          </div>
        </header>

        {/* Content Container */}
        <div style={{ padding: '32px', flex: 1 }}>
          {currentTab === 'dashboard' && renderDashboard()}
          {currentTab === 'planner' && renderPlanner()}
          {currentTab === 'games' && renderGames()}
          {currentTab === 'schemes' && renderSchemes()}
          {currentTab === 'profile' && renderProfile()}
          {currentTab === 'chat' && renderChat()}
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;
