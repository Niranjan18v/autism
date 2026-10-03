import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft, Mic, MicOff, Smile, Volume2, VolumeX, Sparkles, CheckCircle2,
  HelpCircle, ChevronRight, RotateCcw, Award, Play, BookOpen,
  MessageCircle, Heart, Star, Shield, ArrowRight, Check, AlertCircle,
  BarChart3, RefreshCw, Compass, HelpCircle as HelpIcon, Layers, Info,
  Flame, Zap, Trophy, ThumbsUp, Send, CheckCheck
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

/* =========================================================================
   SYNTHESIZED SOUND EFFECTS ENGINE
========================================================================= */
const playAudioTone = (type = 'pop') => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()
    const now = ctx.currentTime

    if (type === 'pop') {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(520, now)
      osc.frequency.exponentialRampToValueAtTime(980, now + 0.07)
      gain.gain.setValueAtTime(0.2, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.07)
    } else if (type === 'success') {
      const freqs = [523.25, 659.25, 783.99, 987.77, 1046.50]
      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(f, now + i * 0.07)
        gain.gain.setValueAtTime(0.22, now + i * 0.07)
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.35)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(now + i * 0.07)
        osc.stop(now + i * 0.07 + 0.35)
      })
    } else if (type === 'hint') {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(640, now)
      osc.frequency.exponentialRampToValueAtTime(420, now + 0.16)
      gain.gain.setValueAtTime(0.18, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.16)
    } else if (type === 'fanfare') {
      const fanfareChords = [
        [523.25, 659.25, 783.99],
        [587.33, 739.99, 880.00],
        [659.25, 830.61, 987.77],
        [1046.50, 1318.51, 1567.98]
      ]
      fanfareChords.forEach((chord, step) => {
        chord.forEach(freq => {
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.type = 'triangle'
          osc.frequency.setValueAtTime(freq, now + step * 0.14)
          gain.gain.setValueAtTime(0.12, now + step * 0.14)
          gain.gain.exponentialRampToValueAtTime(0.001, now + step * 0.14 + 0.45)
          osc.connect(gain)
          gain.connect(ctx.destination)
          osc.start(now + step * 0.14)
          osc.stop(now + step * 0.14 + 0.45)
        })
      })
    }
  } catch (e) {
    console.warn('Audio synth not ready:', e)
  }
}

/* =========================================================================
   5-WEEK STRUCTURED & PERFECTLY MATCHED COMMUNICATION CURRICULUM
========================================================================= */
const CURRICULUM = [
  {
    week: 1,
    day: 1,
    title: 'Find & Name Objects',
    taTitle: 'பொருட்களைக் கண்டுபிடித்து பெயரிடுங்கள்',
    goal: 'Identify everyday objects, fruits, sounds, and tools using descriptive clues.',
    taGoal: 'விளக்கக் குறிப்புகள் மூலம் தினசரி பொருட்கள், பழங்கள் மற்றும் விலங்கு ஒலிகளை அறிந்துகொள்ளுங்கள்.',
    color: '#0284C7',
    gradient: 'linear-gradient(135deg, #0284C7 0%, #38BDF8 100%)',
    bg: '#E0F2FE',
    border: '#7DD3FC',
    targetAccuracy: '70% Correct',
    targetHints: '4 Fun Activities • Easy hints',
    activitiesSummary: 'Listen to clues, find objects, identify fruits, match animal sounds, and daily tools.',
    progressionStage: '1. Foundations',
    tasks: [
      {
        id: 'w1_1',
        prompt: 'Which toy is round and bounces high when you kick and play with it?',
        taPrompt: 'உதைத்து விளையாடும் போது உயரமாக குதிக்கும் வட்டமான பொம்மை எது?',
        targetWord: 'ball',
        taTargetWord: 'பந்து',
        simplified: 'Find the round toy that bounces high!',
        taSimplified: 'குதிக்கும் வட்டமான பொம்மையை தொடுங்கள்!',
        options: [
          { label: 'Ball', taLabel: 'பந்து', icon: '⚽', isCorrect: true },
          { label: 'Teddy Bear', taLabel: 'கரடி பொம்மை', icon: '🧸', isCorrect: false },
          { label: 'Toy Car', taLabel: 'பொம்மை கார்', icon: '🚗', isCorrect: false },
          { label: 'Building Block', taLabel: 'கட்டடம் பொம்மை', icon: '🧱', isCorrect: false }
        ],
        modelAnswer: 'Great! You found the bouncy ball! ⚽'
      },
      {
        id: 'w1_2',
        prompt: 'Which sweet and crunchy fruit is red and grows on trees?',
        taPrompt: 'மரங்களில் காய்க்கும் இனிப்பான சிவப்பு பழம் எது?',
        targetWord: 'apple',
        taTargetWord: 'ஆப்பிள்',
        simplified: 'Find the crunchy red fruit!',
        taSimplified: 'சுவையான சிவப்பு பழத்தை கண்டுபிடி!',
        options: [
          { label: 'Apple', taLabel: 'ஆப்பிள்', icon: '🍎', isCorrect: true },
          { label: 'Banana', taLabel: 'வாழைப்பழம்', icon: '🍌', isCorrect: false },
          { label: 'Orange', taLabel: 'ஆரஞ்சு', icon: '🍊', isCorrect: false },
          { label: 'Grapes', taLabel: 'திராட்சை', icon: '🍇', isCorrect: false }
        ],
        modelAnswer: 'Yummy! You found the crisp red apple! 🍎'
      },
      {
        id: 'w1_3',
        prompt: 'Which road vehicle has 4 wheels and drives with a beep-beep sound?',
        taPrompt: 'நான்கு சக்கரங்களுடன் சாலையில் செல்லும் வாகனம் எது?',
        targetWord: 'car',
        taTargetWord: 'கார்',
        simplified: 'Find the 4-wheeled vehicle that goes beep-beep!',
        taSimplified: 'சாலையில் செல்லும் வாகனத்தை தொடுங்கள்!',
        options: [
          { label: 'Car', taLabel: 'கார்', icon: '🚗', isCorrect: true },
          { label: 'Bus', taLabel: 'பேருந்து', icon: '🚌', isCorrect: false },
          { label: 'Bicycle', taLabel: 'மிதிவண்டி', icon: '🚲', isCorrect: false },
          { label: 'Train', taLabel: 'ரயில்', icon: '🚂', isCorrect: false }
        ],
        modelAnswer: 'Beep beep! You found the car! 🚗'
      },
      {
        id: 'w1_4',
        prompt: 'Which long yellow fruit is sweet, soft, and easy to peel?',
        taPrompt: 'மஞ்சள் நிறத்தில், எளிதாக தோல் உரித்து சாப்பிடும் பழம் எது?',
        targetWord: 'banana',
        taTargetWord: 'வாழைப்பழம்',
        simplified: 'Find the sweet yellow fruit you peel to eat!',
        taSimplified: 'உரித்து சாப்பிடும் மஞ்சள் பழத்தை தொடுங்கள்!',
        options: [
          { label: 'Banana', taLabel: 'வாழைப்பழம்', icon: '🍌', isCorrect: true },
          { label: 'Mango', taLabel: 'மாம்பழம்', icon: '🥭', isCorrect: false },
          { label: 'Strawberry', taLabel: 'ஸ்ட்ராபெரி', icon: '🍓', isCorrect: false },
          { label: 'Orange', taLabel: 'ஆரஞ்சு', icon: '🍊', isCorrect: false }
        ],
        modelAnswer: 'Yes! It is a sweet yellow banana! 🍌'
      },
      {
        id: 'w1_5',
        prompt: 'What color is a ripe, juicy strawberry?',
        taPrompt: 'பழுத்த ஸ்ட்ராபெரி பழம் என்ன நிறத்தில் இருக்கும்?',
        targetWord: 'red',
        taTargetWord: 'சிவப்பு',
        simplified: 'Choose the color of a strawberry:',
        taSimplified: 'ஸ்ட்ராபெரியின் நிறத்தை தேர்ந்தெடுங்கள்:',
        options: [
          { label: 'Red', taLabel: 'சிவப்பு', icon: '🔴', isCorrect: true },
          { label: 'Blue', taLabel: 'நீலம்', icon: '🔵', isCorrect: false },
          { label: 'Yellow', taLabel: 'மஞ்சள்', icon: '🟡', isCorrect: false },
          { label: 'Green', taLabel: 'பச்சை', icon: '🟢', isCorrect: false }
        ],
        modelAnswer: 'Nice! Strawberries are bright Red! 🔴'
      },
      {
        id: 'w1_6',
        prompt: 'Which gentle farm animal gives fresh milk and says "Moo Moo"?',
        taPrompt: 'பால் தந்து "மூ மூ" என்று குரல் எழுப்பும் பண்ணை விலங்கு எது?',
        targetWord: 'cow',
        taTargetWord: 'பசு',
        simplified: 'Which farm animal makes the "Moo Moo" sound?',
        taSimplified: '"மூ மூ" என்று சத்தம் போடும் விலங்கு எது?',
        options: [
          { label: 'Cow', taLabel: 'பசு மாடு', icon: '🐄', isCorrect: true },
          { label: 'Sheep', taLabel: 'செம்மறியாடு', icon: '🐑', isCorrect: false },
          { label: 'Horse', taLabel: 'குதிரை', icon: '🐴', isCorrect: false },
          { label: 'Duck', taLabel: 'வாத்து', icon: '🦆', isCorrect: false }
        ],
        modelAnswer: 'Good job! The Cow says moo! 🐄'
      },
      {
        id: 'w1_7',
        prompt: 'Which playful pet wags its tail and barks "Woof Woof"?',
        taPrompt: 'வாலை ஆட்டி "வள் வள்" என்று குரைக்கும் செல்லப் பிராணி எது?',
        targetWord: 'dog',
        taTargetWord: 'நாய்',
        simplified: 'Which animal barks "Woof Woof"?',
        taSimplified: '"வள் வள்" என்று குரைக்கும் பிராணி எது?',
        options: [
          { label: 'Dog', taLabel: 'நாய்', icon: '🐶', isCorrect: true },
          { label: 'Cat', taLabel: 'பூனை', icon: '🐱', isCorrect: false },
          { label: 'Rabbit', taLabel: 'முயல்', icon: '🐰', isCorrect: false },
          { label: 'Parrot', taLabel: 'கிளி', icon: '🦜', isCorrect: false }
        ],
        modelAnswer: 'Woof woof! You found the friendly puppy! 🐶'
      },
      {
        id: 'w1_8',
        prompt: 'Which cute furry pet drinks milk and purrs "Meow Meow"?',
        taPrompt: 'பால் குடித்து "மியாவ் மியாவ்" என்று சத்தம் போடும் செல்லப் பிராணி எது?',
        targetWord: 'cat',
        taTargetWord: 'பூனை',
        simplified: 'Which pet says "Meow Meow"?',
        taSimplified: '"மியாவ் மியாவ்" என்று சத்தம் போடும் பிராணி எது?',
        options: [
          { label: 'Cat', taLabel: 'பூனை', icon: '🐱', isCorrect: true },
          { label: 'Duck', taLabel: 'வாத்து', icon: '🦆', isCorrect: false },
          { label: 'Bird', taLabel: 'பறவை', icon: '🐦', isCorrect: false },
          { label: 'Frog', taLabel: 'தவளை', icon: '🐸', isCorrect: false }
        ],
        modelAnswer: 'Meow! The cute kitty is happy! 🐱'
      },
      {
        id: 'w1_9',
        prompt: 'What kitchen item do we fill with clean water so we can drink it?',
        taPrompt: 'தண்ணீர் ஊற்றி குடிக்க நாம் எந்த பொருளை பயன்படுத்துகிறோம்?',
        targetWord: 'cup',
        taTargetWord: 'கிண்ணம்',
        simplified: 'Find what we use to drink water!',
        taSimplified: 'தண்ணீர் குடிக்க பயன்படும் பொருளை தொடுங்கள்!',
        options: [
          { label: 'Cup / Glass', taLabel: 'கிண்ணம் / டம்ளர்', icon: '🥛', isCorrect: true },
          { label: 'Plate', taLabel: 'தட்டு', icon: '🍽️', isCorrect: false },
          { label: 'Spoon', taLabel: 'கரண்டி', icon: '🥄', isCorrect: false },
          { label: 'Fork', taLabel: 'முட்கரண்டி', icon: '🍴', isCorrect: false }
        ],
        modelAnswer: 'Refreshing! We drink water from a cup or glass 🥛'
      },
      {
        id: 'w1_10',
        prompt: 'What pointed tool do we hold in our hand to write and draw on paper?',
        taPrompt: 'எழுதவும் படங்கள் வரையவும் நாம் கையில் பிடிக்கும் கருவி எது?',
        targetWord: 'pencil',
        taTargetWord: 'பென்சில்',
        simplified: 'Find the tool used for writing and drawing!',
        taSimplified: 'எழுதவும் வரையவும் பயன்படும் கருவியை தொடுங்கள்!',
        options: [
          { label: 'Pencil', taLabel: 'பென்சில்', icon: '✏️', isCorrect: true },
          { label: 'Scissors', taLabel: 'கத்தரிக்கோல்', icon: '✂️', isCorrect: false },
          { label: 'Eraser', taLabel: 'அழிப்பான்', icon: '🧼', isCorrect: false },
          { label: 'Ruler', taLabel: 'அளவுகோல்', icon: '📏', isCorrect: false }
        ],
        modelAnswer: 'Super! We write and draw with a pencil ✏️'
      }
    ]
  },
  {
    week: 2,
    day: 2,
    title: 'Say What You Want',
    taTitle: 'எனக்கு வேண்டும் (தேவைகள்)',
    goal: 'Ask for food, water, bathroom, rest, and help with confidence.',
    taGoal: 'தண்ணீர், உணவு, கழிப்பறை, ஓய்வு மற்றும் உதவி கேளுங்கள்.',
    color: '#D97706',
    gradient: 'linear-gradient(135deg, #D97706 0%, #FBBF24 100%)',
    bg: '#FEF3C7',
    border: '#FCD34D',
    targetAccuracy: '70% Correct',
    targetHints: '2-3 words • Clear requests',
    activitiesSummary: 'Say "I want water", "I want biscuit", "Help please", "Bathroom please".',
    progressionStage: '2. Express Needs',
    tasks: [
      {
        id: 'w2_1',
        prompt: 'You feel thirsty after playing. What do you say?',
        taPrompt: 'விளையாடிய பிறகு தாகமாக உள்ளது. என்ன சொல்வீர்கள்?',
        targetWord: 'i want water',
        taTargetWord: 'எனக்கு தண்ணீர் வேண்டும்',
        simplified: 'Say: "I want water please" 🥛',
        taSimplified: '"எனக்கு தண்ணீர் வேண்டும்" என்று சொல்லுங்கள் 🥛',
        options: [
          { label: 'I want water please 🥛', taLabel: 'எனக்கு தண்ணீர் வேண்டும் 🥛', icon: '🥛', isCorrect: true },
          { label: 'I want cold juice 🧃', taLabel: 'எனக்கு பழச்சாறு வேண்டும் 🧃', icon: '🧃', isCorrect: false },
          { label: 'I want warm milk 🥛', taLabel: 'எனக்கு பால் வேண்டும் 🥛', icon: '🥛', isCorrect: false }
        ],
        modelAnswer: 'Awesome! "I want water please" 🥛'
      },
      {
        id: 'w2_2',
        prompt: 'It is snack time! What do you want to eat?',
        taPrompt: 'சிற்றுண்டி நேரம்! என்ன சாப்பிட வேண்டும்?',
        targetWord: 'i want biscuit',
        taTargetWord: 'எனக்கு பிஸ்கட் வேண்டும்',
        simplified: 'Say: "I want a biscuit please" 🍪',
        taSimplified: '"எனக்கு பிஸ்கட் வேண்டும்" என்று சொல்லுங்கள் 🍪',
        options: [
          { label: 'I want a biscuit please 🍪', taLabel: 'எனக்கு பிஸ்கட் வேண்டும் 🍪', icon: '🍪', isCorrect: true },
          { label: 'I want apple slices 🍎', taLabel: 'எனக்கு ஆப்பிள் வேண்டும் 🍎', icon: '🍎', isCorrect: false },
          { label: 'I want a banana 🍌', taLabel: 'எனக்கு வாழைப்பழம் வேண்டும் 🍌', icon: '🍌', isCorrect: false }
        ],
        modelAnswer: 'Great! "I want a biscuit please" 🍪'
      },
      {
        id: 'w2_3',
        prompt: 'The toy box is stuck tight! What do you say?',
        taPrompt: 'பொம்மை பெட்டி திறக்கவில்லை! என்ன சொல்வீர்கள்?',
        targetWord: 'help please',
        taTargetWord: 'உதவி செய்யுங்கள்',
        simplified: 'Say: "Help me please!" 🤝',
        taSimplified: '"உதவி செய்யுங்கள்" என்று சொல்லுங்கள் 🤝',
        options: [
          { label: 'Help me please! 🤝', taLabel: 'உதவி செய்யுங்கள்! 🤝', icon: '🤝', isCorrect: true },
          { label: 'Can you open this please? 📦', taLabel: 'இதை திறக்க முடியுமா? 📦', icon: '📦', isCorrect: false },
          { label: 'Look at this box please 👀', taLabel: 'இதைப் பாருங்கள் 👀', icon: '👀', isCorrect: false }
        ],
        modelAnswer: 'Well done! "Help me please!" 🤝'
      },
      {
        id: 'w2_4',
        prompt: 'You need to use the washroom. What do you say to teacher or parent?',
        taPrompt: 'கழிப்பறை செல்ல வேண்டும். ஆசிரியரிடம் அல்லது அம்மாவிடம் என்ன சொல்வீர்கள்?',
        targetWord: 'bathroom please',
        taTargetWord: 'கழிப்பறை செல்ல வேண்டும்',
        simplified: 'Say: "Bathroom please" 🚻',
        taSimplified: '"கழிப்பறை போக வேண்டும்" என்று சொல்லுங்கள் 🚻',
        options: [
          { label: 'Bathroom please 🚻', taLabel: 'கழிப்பறை போக வேண்டும் 🚻', icon: '🚻', isCorrect: true },
          { label: 'Wash hands please 🧼', taLabel: 'கை கழுவ வேண்டும் 🧼', icon: '🧼', isCorrect: false },
          { label: 'Water break please 💧', taLabel: 'தண்ணீர் குடிக்க வேண்டும் 💧', icon: '💧', isCorrect: false }
        ],
        modelAnswer: 'Wonderful communication! "Bathroom please" 🚻'
      },
      {
        id: 'w2_5',
        prompt: 'The room is noisy and you feel tired. What can you politely ask for?',
        taPrompt: 'சத்தமாக உள்ளது, ஓய்வு வேண்டும். அன்பாக என்ன கேட்கலாம்?',
        targetWord: 'i want a break please',
        taTargetWord: 'எனக்கு ஓய்வு வேண்டும்',
        simplified: 'Say: "I want a break please" 🧸',
        taSimplified: '"எனக்கு ஓய்வு வேண்டும்" என்று சொல்லுங்கள் 🧸',
        options: [
          { label: 'I want a break please 🧸', taLabel: 'எனக்கு ஓய்வு வேண்டும் 🧸', icon: '🧸', isCorrect: true },
          { label: 'Can I listen to calm music? 🎧', taLabel: 'அமைதியான இசை கேட்கலாமா? 🎧', icon: '🎧', isCorrect: false },
          { label: 'Can I sit quietly please? 🛋️', taLabel: 'அமைதியாக உட்காரலாமா? 🛋️', icon: '🛋️', isCorrect: false }
        ],
        modelAnswer: 'So proud of you! "I want a break please" 🧸'
      }
    ]
  },
  {
    week: 3,
    day: 3,
    title: 'My Favorites & Feelings',
    taTitle: 'எனக்கு பிடித்தவை & உணர்வுகள்',
    goal: 'Share things you like, favorite games, and how you feel inside.',
    taGoal: 'உங்களுக்கு பிடித்த உணவு, விளையாட்டு மற்றும் உணர்வுகளை சொல்லுங்கள்.',
    color: '#7C3AED',
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
    bg: '#EDE9FE',
    border: '#C4B5FD',
    targetAccuracy: 'Easy choices',
    targetHints: 'Pick what you like • Express emotions',
    activitiesSummary: 'Pick favorite foods, fun activities, colors, and express daily feelings.',
    progressionStage: '3. Favorites & Choices',
    tasks: [
      {
        id: 'w3_1',
        prompt: 'What yummy food do you enjoy the most?',
        taPrompt: 'உங்களுக்கு எந்த உணவு மிகவும் பிடிக்கும்?',
        targetWord: 'pizza',
        taTargetWord: 'பீட்சா',
        simplified: 'Pick your favorite meal!',
        taSimplified: 'பிடித்த உணவை தொடுங்கள்!',
        options: [
          { label: 'Yummy Warm Pizza 🍕', taLabel: 'சூடான பீட்சா 🍕', icon: '🍕', isCorrect: true },
          { label: 'Steamed Rice & Veggies 🍚', taLabel: 'சாதம் & காய்கறிகள் 🍚', icon: '🍚', isCorrect: true },
          { label: 'Sweet Juicy Mango 🥭', taLabel: 'இனிப்பு மாம்பழம் 🥭', icon: '🥭', isCorrect: true }
        ],
        modelAnswer: 'Yum! That is such a delicious choice!'
      },
      {
        id: 'w3_2',
        prompt: 'Do you want to play a puzzle game right now?',
        taPrompt: 'இப்போது புதிர்கள் விளையாடலாமா?',
        targetWord: 'yes',
        taTargetWord: 'ஆம்',
        simplified: 'Say yes or no politely!',
        taSimplified: 'ஆம் அல்லது இல்லை என்று சொல்லுங்கள்!',
        options: [
          { label: 'Yes, let\'s play together! 🎉', taLabel: 'ஆம், விளையாடுவோம்! 🎉', icon: '🎉', isCorrect: true },
          { label: 'No thank you, maybe later 🛑', taLabel: 'இப்போது வேண்டாம், பிறகு விளையாடலாம் 🛑', icon: '🛑', isCorrect: true }
        ],
        modelAnswer: 'Yay! Thank you for sharing your choice!'
      },
      {
        id: 'w3_3',
        prompt: 'Which color makes you feel happy?',
        taPrompt: 'எந்த நிறம் உங்களுக்கு மகிழ்ச்சி தருகிறது?',
        targetWord: 'yellow',
        taTargetWord: 'மஞ்சள்',
        simplified: 'Pick a bright color you love!',
        taSimplified: 'பிடித்த நிறத்தை தொடுங்கள்!',
        options: [
          { label: 'Sunny Bright Yellow 💛', taLabel: 'சூரிய மஞ்சள் 💛', icon: '💛', isCorrect: true },
          { label: 'Ocean Calm Blue 💙', taLabel: 'கடல் நீலம் 💙', icon: '💙', isCorrect: true },
          { label: 'Fresh Nature Green 💚', taLabel: 'இயற்கை பச்சை 💚', icon: '💚', isCorrect: true }
        ],
        modelAnswer: 'What a beautiful and cheerful color!'
      },
      {
        id: 'w3_4',
        prompt: 'How does your heart feel today?',
        taPrompt: 'இன்று மனம் எப்படி உணர்கிறது?',
        targetWord: 'happy',
        taTargetWord: 'மகிழ்ச்சி',
        simplified: 'Show Panda your feeling!',
        taSimplified: 'உங்கள் உணர்வை காட்டுங்கள்!',
        options: [
          { label: 'Happy & Smiling 😊', taLabel: 'மகிழ்ச்சி & சிரிப்பு 😊', icon: '😊', isCorrect: true },
          { label: 'Calm & Peaceful 😌', taLabel: 'அமைதி & நிம்மதி 😌', icon: '😌', isCorrect: true },
          { label: 'Sleepy & Cozy 😴', taLabel: 'தூக்கம் & ஓய்வு 😴', icon: '😴', isCorrect: true }
        ],
        modelAnswer: 'Thank you for sharing your feeling with Panda! ❤️'
      },
      {
        id: 'w3_5',
        prompt: 'What fun activity would you like to do with Panda?',
        taPrompt: 'பாண்டாவுடன் அடுத்து என்ன செய்ய விரும்புகிறீர்கள்?',
        targetWord: 'music',
        taTargetWord: 'இசை',
        simplified: 'Pick what to do next!',
        taSimplified: 'அடுத்து என்ன செய்யலாம்?',
        options: [
          { label: 'Sing Music & Rhymes 🎶', taLabel: 'பாட்டு பாடலாம் 🎶', icon: '🎶', isCorrect: true },
          { label: 'Build Towers with Blocks 🧱', taLabel: 'பொம்மைகள் அடுக்கலாம் 🧱', icon: '🧱', isCorrect: true },
          { label: 'Color and Draw Pictures 🎨', taLabel: 'வண்ணம் தீட்டலாம் 🎨', icon: '🎨', isCorrect: true }
        ],
        modelAnswer: 'That sounds like so much fun! 🌟'
      }
    ]
  },
  {
    week: 4,
    day: 4,
    title: 'Make Sentences',
    taTitle: 'வாக்கியம் அமைத்தல்',
    goal: 'Put 3 to 5 words together to talk in complete sentences.',
    taGoal: '3 முதல் 5 வார்த்தைகளை சேர்த்து முழு வாக்கியமாக பேசுங்கள்.',
    color: '#DB2777',
    gradient: 'linear-gradient(135deg, #DB2777 0%, #F472B6 100%)',
    bg: '#FCE7F3',
    border: '#FBCFE8',
    targetAccuracy: '3-5 words',
    targetHints: 'Sentence Ladder • Full sentence',
    activitiesSummary: 'Build full sentences: "I want the red ball", "May I have cold water please".',
    progressionStage: '4. Sentences',
    tasks: [
      {
        id: 'w4_1',
        prompt: 'Build the full sentence: "I want the red ball" 🔴⚽',
        taPrompt: 'முழு வாக்கியம் சொல்லுங்கள்: "எனக்கு சிவப்பு பந்து வேண்டும்" 🔴⚽',
        targetWord: 'i want the red ball',
        taTargetWord: 'எனக்கு சிவப்பு பந்து வேண்டும்',
        ladderSteps: ['Ball ⚽', 'Red ball 🔴', 'Want red ball 🤲', 'I want the red ball 🔴⚽'],
        taLadderSteps: ['பந்து ⚽', 'சிவப்பு பந்து 🔴', 'பந்து வேண்டும் 🤲', 'எனக்கு சிவப்பு பந்து வேண்டும் 🔴⚽'],
        simplified: 'Pick the complete 4-word sentence:',
        taSimplified: 'முழு வாக்கியத்தை தொடுங்கள்:',
        options: [
          { label: 'I want the red ball 🔴⚽', taLabel: 'எனக்கு சிவப்பு பந்து வேண்டும் 🔴⚽', icon: '🔴⚽', isCorrect: true },
          { label: 'Red ball 🔴', taLabel: 'சிவப்பு பந்து 🔴', icon: '🔴', isCorrect: false },
          { label: 'Ball ⚽', taLabel: 'பந்து ⚽', icon: '⚽', isCorrect: false }
        ],
        modelAnswer: '"I want the red ball." Great full sentence! 🌟'
      },
      {
        id: 'w4_2',
        prompt: 'Build the full sentence: "I see the big yellow sun" ☀️',
        taPrompt: 'முழு வாக்கியம் சொல்லுங்கள்: "நான் பெரிய மஞ்சள் சூரியனை பார்க்கிறேன்" ☀️',
        targetWord: 'i see the big yellow sun',
        taTargetWord: 'பெரிய மஞ்சள் சூரியன்',
        ladderSteps: ['Sun ☀️', 'Yellow sun 💛', 'Big yellow sun 🟡', 'I see the big yellow sun ☀️✨'],
        taLadderSteps: ['சூரியன் ☀️', 'மஞ்சள் சூரியன் 💛', 'பெரிய சூரியன் 🟡', 'நான் பெரிய சூரியனை பார்க்கிறேன் ☀️✨'],
        simplified: 'Pick the complete descriptive sentence:',
        taSimplified: 'முழு வாக்கியத்தை தொடுங்கள்:',
        options: [
          { label: 'I see the big yellow sun ☀️', taLabel: 'நான் பெரிய மஞ்சள் சூரியனை பார்க்கிறேன் ☀️', icon: '☀️', isCorrect: true },
          { label: 'I see the sun 🌅', taLabel: 'நான் சூரியனை பார்க்கிறேன் 🌅', icon: '🌅', isCorrect: false },
          { label: 'Yellow sun 🟡', taLabel: 'மஞ்சள் சூரியன் 🟡', icon: '🟡', isCorrect: false }
        ],
        modelAnswer: '"I see the big yellow sun!" Perfect descriptive speech!'
      },
      {
        id: 'w4_3',
        prompt: 'Build the polite sentence: "May I have cold water please" 🥛',
        taPrompt: 'பணிவான வாக்கியம் சொல்லுங்கள்: "எனக்கு குளிர் தண்ணீர் கிடைக்குமா" 🥛',
        targetWord: 'may i have cold water please',
        taTargetWord: 'எனக்கு குளிர் தண்ணீர் கிடைக்குமா',
        ladderSteps: ['Water 🥛', 'Cold water 🧊', 'Want water please 🤲', 'May I have cold water please 🥛✨'],
        taLadderSteps: ['தண்ணீர் 🥛', 'குளிர் தண்ணீர் 🧊', 'தண்ணீர் வேண்டும் 🤲', 'எனக்கு குளிர் தண்ணீர் கிடைக்குமா 🥛✨'],
        simplified: 'Pick the most polite full request:',
        taSimplified: 'பணிவான முழு வாக்கியத்தை தொடுங்கள்:',
        options: [
          { label: 'May I have cold water please 🥛', taLabel: 'எனக்கு குளிர் தண்ணீர் கிடைக்குமா 🥛', icon: '🥛', isCorrect: true },
          { label: 'I want water 🤲', taLabel: 'தண்ணீர் வேண்டும் 🤲', icon: '💧', isCorrect: false },
          { label: 'Cold water 🧊', taLabel: 'குளிர் தண்ணீர் 🧊', icon: '🧊', isCorrect: false }
        ],
        modelAnswer: '"May I have cold water please." Wonderful and polite! 🌟'
      },
      {
        id: 'w4_4',
        prompt: 'Build the full sentence: "Look at the puppy playing with the ball" 🐶',
        taPrompt: 'முழு வாக்கியம் சொல்லுங்கள்: "குட்டி நாய் பந்துடன் விளையாடுவதைப் பாருங்கள்" 🐶',
        targetWord: 'look at the puppy playing with the ball',
        taTargetWord: 'குட்டி நாய் விளையாடுவதைப் பாருங்கள்',
        ladderSteps: ['Puppy 🐶', 'Playful puppy 🐕', 'Puppy playing 🎾', 'Look at the puppy playing with the ball 🐶⚽'],
        taLadderSteps: ['நாய் 🐶', 'குட்டி நாய் 🐕', 'நாய் விளையாடுகிறது 🎾', 'குட்டி நாய் பந்துடன் விளையாடுவதைப் பாருங்கள் 🐶⚽'],
        simplified: 'Pick the full active sentence:',
        taSimplified: 'முழு வாக்கியத்தை தொடுங்கள்:',
        options: [
          { label: 'Look at the puppy playing with the ball 🐶⚽', taLabel: 'குட்டி நாய் பந்துடன் விளையாடுவதைப் பாருங்கள் 🐶⚽', icon: '🐶', isCorrect: true },
          { label: 'The puppy is playing 🐕', taLabel: 'நாய் விளையாடுகிறது 🐕', icon: '🐕', isCorrect: false },
          { label: 'Puppy ball 🎾', taLabel: 'நாய் பந்து 🎾', icon: '🎾', isCorrect: false }
        ],
        modelAnswer: '"Look at the puppy playing with the ball!" Super sentence building! 🏆'
      }
    ]
  },
  {
    week: 5,
    day: 5,
    title: 'Situations & Social Problem-Solving',
    taTitle: 'சூழ்நிலைகள் & சமூகத் தீர்வுகள்',
    goal: 'Learn what to do in real-life situations: lost items, stuck bottles, feeling sick, and staying safe.',
    taGoal: 'பொருட்கள் தொலைதல், உதவி கேட்டல், மற்றும் பாதுகாப்பு சூழ்நிலைகளில் என்ன செய்ய வேண்டும் என்பதை கற்றுக்கொள்ளுங்கள்.',
    color: '#0891B2',
    gradient: 'linear-gradient(135deg, #0891B2 0%, #22D3EE 100%)',
    bg: '#CFFAFE',
    border: '#A5F3FC',
    targetAccuracy: 'Real practice',
    targetHints: 'Real Situations • Problem Solving',
    activitiesSummary: 'Solve 6 real situations: lost pen, stuck bottle, feeling sick, stuck toy, playground turn, store safety.',
    progressionStage: '5. Social Champion',
    tasks: [
      {
        id: 'w5_1',
        prompt: 'If you lost your pen at school, what should you do?',
        taPrompt: 'பள்ளியில் உங்கள் பேனா தொலைந்துவிட்டால் என்ன செய்ய வேண்டும்?',
        targetWord: 'borrow a pen please',
        taTargetWord: 'பேனா உதவி கேட்க வேண்டும்',
        simplified: 'What should you do if your pen is lost?',
        taSimplified: 'பேனா தொலைந்தால் என்ன செய்ய வேண்டும்?',
        options: [
          { label: 'Politely ask teacher or a friend to borrow one ✏️', taLabel: 'ஆசிரியர் அல்லது நண்பரிடம் பணிவாக பேனா கேட்க வேண்டும் ✏️', icon: '✏️', isCorrect: true },
          { label: 'Cry loudly and tear the notebook 😭', taLabel: 'சத்தமாக அழுது நோட்டுப் புத்தகத்தை கிழிப்பது 😭', icon: '😭', isCorrect: false },
          { label: 'Take someone\'s pen without asking 🎒', taLabel: 'கேட்காமல் மற்றவர் பையிலிருந்து எடுப்பது 🎒', icon: '🎒', isCorrect: false }
        ],
        modelAnswer: 'Great choice! Always ask politely: "May I please borrow a pen?" 🌟'
      },
      {
        id: 'w5_2',
        prompt: 'If your water bottle lid is stuck tight and you cannot open it, what should you do?',
        taPrompt: 'தண்ணீர் பாட்டிலைத் திறக்க முடியவில்லை என்றால் என்ன செய்ய வேண்டும்?',
        targetWord: 'please help me open this',
        taTargetWord: 'திறக்க உதவ முடியுமா',
        simplified: 'What should you do if you cannot open the bottle?',
        taSimplified: 'பாட்டிலைத் திறக்க முடியவில்லை என்றால் என்ன செய்ய வேண்டும்?',
        options: [
          { label: 'Ask an adult: "Could you please help me open this?" 🥛', taLabel: 'பெரியவர்களிடம்: "இதைத் திறக்க உதவ முடியுமா?" எனக் கேட்க வேண்டும் 🥛', icon: '🥛', isCorrect: true },
          { label: 'Throw the bottle on the floor angrily 😡', taLabel: 'கோபமாக பாட்டிலை கீழே வீசுவது 😡', icon: '😡', isCorrect: false },
          { label: 'Stay thirsty and say nothing all day 🤐', taLabel: 'தாகத்தோடு யாரிடமும் பேசாமல் இருப்பது 🤐', icon: '🤐', isCorrect: false }
        ],
        modelAnswer: 'Wonderful! Asking for help with polite words solves the problem! 🌟'
      },
      {
        id: 'w5_3',
        prompt: 'If you feel sick or your tummy hurts during class, what should you do?',
        taPrompt: 'வகுப்பில் இருக்கும் போது உடல் நலம் சரியில்லை என்றால் என்ன செய்ய வேண்டும்?',
        targetWord: 'teacher i feel sick',
        taTargetWord: 'உடல் நலம் சரியில்லை',
        simplified: 'What should you do if you feel sick?',
        taSimplified: 'உடல் நலம் சரியில்லை என்றால் என்ன செய்ய வேண்டும்?',
        options: [
          { label: 'Raise your hand and tell the teacher: "I am not feeling well" 🩺', taLabel: 'கையை உயர்த்தி ஆசிரியரிடம்: "எனக்கு உடல் நலம் சரியில்லை" என்று சொல்ல வேண்டும் 🩺', icon: '🩺', isCorrect: true },
          { label: 'Hide under the desk and cry in secret 🙈', taLabel: 'மேசைக்கு அடியில் ஒளிந்து கொண்டு அழுவது 🙈', icon: '🙈', isCorrect: false },
          { label: 'Run outside into the playground alone 🏃', taLabel: 'யாரிடமும் சொல்லாமல் மைதானத்திற்கு ஓடுவது 🏃', icon: '🏃', isCorrect: false }
        ],
        modelAnswer: 'Very good! Always tell your teacher right away when you feel unwell 🩺'
      },
      {
        id: 'w5_4',
        prompt: 'If your favorite toy rolls under heavy furniture at home, what should you do?',
        taPrompt: 'உங்கள் பொம்மை கனமான சோபாவுக்கு அடியில் மாட்டிக்கொண்டால் என்ன செய்ய வேண்டும்?',
        targetWord: 'mom please help me reach it',
        taTargetWord: 'பொம்மை எடுக்க உதவ முடியுமா',
        simplified: 'What should you do if your toy is stuck?',
        taSimplified: 'பொம்மை மாட்டிக்கொண்டால் என்ன செய்ய வேண்டும்?',
        options: [
          { label: 'Ask mom or dad: "Could you please help me reach my toy?" 🧩', taLabel: 'அம்மா அல்லது அப்பாவிடம்: "பொம்மையை எடுக்க உதவ முடியுமா?" எனக் கேட்க வேண்டும் 🧩', icon: '🧩', isCorrect: true },
          { label: 'Kick the furniture hard and scream 😭', taLabel: 'சோபாவை காலால் உதைத்து கத்துவது 😭', icon: '😭', isCorrect: false },
          { label: 'Try to climb under alone and get hurt ⚠️', taLabel: 'தனியாக அடியில் நுழைந்து காயம் ஏற்படுத்திக் கொள்வது ⚠️', icon: '⚠️', isCorrect: false }
        ],
        modelAnswer: 'Awesome teamwork! Asking family for help keeps you safe! 🏆'
      },
      {
        id: 'w5_5',
        prompt: 'If another child is playing on the swing you want at the playground, what should you do?',
        taPrompt: 'நீங்கள் விரும்பும் ஊஞ்சலில் மற்றொரு குழந்தை ஆடினால் என்ன செய்ய வேண்டும்?',
        targetWord: 'can i have a turn please',
        taTargetWord: 'முறை கேட்க வேண்டும்',
        simplified: 'What should you do when the swing is busy?',
        taSimplified: 'ஊஞ்சலில் மற்றொருவர் இருந்தால் என்ன செய்ய வேண்டும்?',
        options: [
          { label: 'Wait patiently and ask: "Can I take a turn when you finish, please?" 🛝', taLabel: 'பொறுமையாக காத்திருந்து: "நீங்கள் முடித்ததும் நான் ஆடலாமா?" எனக் கேட்க வேண்டும் 🛝', icon: '🛝', isCorrect: true },
          { label: 'Push the child off the swing 😡', taLabel: 'குழந்தையை ஊஞ்சலிலிருந்து தள்ளிவிடுவது 😡', icon: '😡', isCorrect: false },
          { label: 'Throw sand at other children 🏖️', taLabel: 'மற்ற குழந்தைகள் மீது மணலை வீசுவது 🏖️', icon: '🏖️', isCorrect: false }
        ],
        modelAnswer: 'Super social skill! Waiting your turn and asking politely makes everyone happy! 🤝'
      },
      {
        id: 'w5_6',
        prompt: 'If you get separated from your family in a big shop or store, what should you do?',
        taPrompt: 'கடையில் குடும்பத்தினரை விட்டு பிரிந்துவிட்டால் என்ன செய்ய வேண்டும்?',
        targetWord: 'tell store staff or guard',
        taTargetWord: 'காவலாளியிடம் உதவி கேட்க வேண்டும்',
        simplified: 'What should you do if you are lost in a shop?',
        taSimplified: 'கடையில் தொலைந்துவிட்டால் என்ன செய்ய வேண்டும்?',
        options: [
          { label: 'Stay where you are and tell a store staff member or security guard 🏬', taLabel: 'அங்கேயே நின்று கடை ஊழியர் அல்லது காவலாளியிடம் உதவி கேட்க வேண்டும் 🏬', icon: '🏬', isCorrect: true },
          { label: 'Run outside into the busy road 🚗', taLabel: 'சாலைக்கு வேகமாக ஓடுவது 🚗', icon: '🚗', isCorrect: false },
          { label: 'Follow a stranger who walks away 🚶', taLabel: 'தெரியாத நபருடன் செல்வது 🚶', icon: '🚶', isCorrect: false }
        ],
        modelAnswer: 'Brilliant safety rule! Staying in one safe spot and telling staff keeps you safe! 🌟🛡️'
      }
    ]
  }
];

/* =========================================================================
   ANIMATED 3D PANDA COMPANION AVATAR
========================================================================= */
const PandaAvatar = ({ isTalking, isListening, size = 210 }) => {
  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <style>{`
        @keyframes floatPanda { 
          0%, 100% { transform: translateY(0px) rotate(0deg); } 
          50% { transform: translateY(-12px) rotate(1.5deg); } 
        }
        @keyframes glowRingPanda { 
          0%, 100% { opacity: 0.3; transform: scale(0.94); } 
          50% { opacity: 0.85; transform: scale(1.22); } 
        }
        @keyframes pandaEyeBlink { 
          0%, 90%, 100% { transform: scaleY(1); } 
          95% { transform: scaleY(0.08); } 
        }
        @keyframes pandaMouthTalk {
          0%, 100% { height: 8px; border-radius: 0 0 16px 16px; }
          50% { height: 22px; border-radius: 12px 12px 20px 20px; background: #F43F5E; }
        }
        @keyframes pandaEarWiggle {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-5deg); }
        }
        @keyframes orbitPandaStar {
          0% { transform: rotate(0deg) translateX(110px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(110px) rotate(-360deg); }
        }
        .panda-body-anim { animation: floatPanda 3.8s ease-in-out infinite; }
      `}</style>

      {/* Holographic Glowing Base Ring */}
      <div style={{
        position: 'absolute', bottom: '-12px', width: '70%', height: '16px',
        background: 'radial-gradient(ellipse, rgba(56,189,248,0.5) 0%, transparent 70%)',
        borderRadius: '50%', filter: 'blur(6px)'
      }} />

      {/* Orbiting Sparkle Star Particle */}
      <div style={{
        position: 'absolute', width: '12px', height: '12px',
        background: '#F59E0B', borderRadius: '50%',
        boxShadow: '0 0 14px #F59E0B',
        animation: 'orbitPandaStar 6s linear infinite',
        pointerEvents: 'none'
      }} />

      {/* Dynamic Listening / Talking Aura */}
      {isListening && (
        <div style={{ position: 'absolute', inset: -24, borderRadius: '50%', background: 'radial-gradient(circle, rgba(239,68,68,0.35) 0%, transparent 70%)', animation: 'glowRingPanda 1.1s infinite' }} />
      )}
      {isTalking && (
        <div style={{ position: 'absolute', inset: -20, borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.35) 0%, transparent 70%)', animation: 'glowRingPanda 0.8s infinite' }} />
      )}

      {/* Main Panda Character Container */}
      <div className="panda-body-anim" style={{
        position: 'relative', width: '88%', height: '88%',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
      }}>
        {/* Left Fluffy Panda Ear */}
        <div style={{
          position: 'absolute', top: '-10px', left: '10px',
          width: '52px', height: '52px',
          background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
          borderRadius: '50%',
          border: '4px solid #0F172A',
          boxShadow: '0 6px 14px rgba(15,23,42,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1,
          animation: 'pandaEarWiggle 4s ease-in-out infinite'
        }}>
          <div style={{ width: '24px', height: '24px', background: '#FDA4AF', borderRadius: '50%', opacity: 0.8 }} />
        </div>

        {/* Right Fluffy Panda Ear */}
        <div style={{
          position: 'absolute', top: '-10px', right: '10px',
          width: '52px', height: '52px',
          background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
          borderRadius: '50%',
          border: '4px solid #0F172A',
          boxShadow: '0 6px 14px rgba(15,23,42,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1,
          animation: 'pandaEarWiggle 4s ease-in-out infinite reverse'
        }}>
          <div style={{ width: '24px', height: '24px', background: '#FDA4AF', borderRadius: '50%', opacity: 0.8 }} />
        </div>

        {/* Panda Head */}
        <div style={{
          width: '100%', height: '90%',
          background: 'linear-gradient(145deg, #FFFFFF 0%, #F8FAFC 60%, #F1F5F9 100%)',
          borderRadius: '50% 50% 48% 48% / 55% 55% 45% 45%',
          border: '5px solid #0F172A',
          boxShadow: '0 20px 45px rgba(15,23,42,0.14), inset 0 3px 6px rgba(255,255,255,0.9)',
          position: 'relative',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          zIndex: 2,
          padding: '12px'
        }}>
          {/* Eyes with Angled Panda Patches */}
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center', marginTop: '4px', marginBottom: '8px' }}>
            {/* Left Eye Patch */}
            <div style={{
              width: '42px', height: '48px',
              background: 'linear-gradient(145deg, #1E293B 0%, #0F172A 100%)',
              borderRadius: '50% 45% 50% 50%',
              transform: 'rotate(-14deg)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
            }}>
              <div style={{
                width: '20px', height: '24px',
                background: isListening ? '#F87171' : '#38BDF8',
                borderRadius: '50%',
                position: 'relative',
                animation: 'pandaEyeBlink 4.2s infinite',
                boxShadow: `0 0 12px ${isListening ? '#F87171' : '#38BDF8'}`
              }}>
                <div style={{ position: 'absolute', top: '3px', right: '4px', width: '7px', height: '7px', background: 'white', borderRadius: '50%' }} />
                <div style={{ position: 'absolute', bottom: '4px', left: '4px', width: '3px', height: '3px', background: 'white', borderRadius: '50%' }} />
              </div>
            </div>

            {/* Right Eye Patch */}
            <div style={{
              width: '42px', height: '48px',
              background: 'linear-gradient(145deg, #1E293B 0%, #0F172A 100%)',
              borderRadius: '45% 50% 50% 50%',
              transform: 'rotate(14deg)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
            }}>
              <div style={{
                width: '20px', height: '24px',
                background: isListening ? '#F87171' : '#38BDF8',
                borderRadius: '50%',
                position: 'relative',
                animation: 'pandaEyeBlink 4.2s infinite',
                boxShadow: `0 0 12px ${isListening ? '#F87171' : '#38BDF8'}`
              }}>
                <div style={{ position: 'absolute', top: '3px', right: '4px', width: '7px', height: '7px', background: 'white', borderRadius: '50%' }} />
                <div style={{ position: 'absolute', bottom: '4px', left: '4px', width: '3px', height: '3px', background: 'white', borderRadius: '50%' }} />
              </div>
            </div>
          </div>

          {/* Cute Muzzle & Nose */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-4px' }}>
            <div style={{
              width: '16px', height: '11px',
              background: '#0F172A',
              borderRadius: '50% 50% 40% 40%',
              marginBottom: '4px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }} />

            <div style={{
              width: isTalking ? '22px' : '20px',
              height: isTalking ? '16px' : '8px',
              background: isTalking ? '#F43F5E' : '#0F172A',
              borderRadius: isTalking ? '10px 10px 18px 18px' : '0 0 16px 16px',
              animation: isTalking ? 'pandaMouthTalk 0.35s infinite alternate' : 'none',
              transition: 'all 0.15s ease',
              border: isTalking ? '2px solid #0F172A' : 'none'
            }} />
          </div>

          {/* Rosy Blush Cheeks */}
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '84%', position: 'absolute', bottom: '20%' }}>
            <div style={{ width: '18px', height: '10px', background: '#FDA4AF', borderRadius: '50%', opacity: 0.9, filter: 'blur(0.5px)' }} />
            <div style={{ width: '18px', height: '10px', background: '#FDA4AF', borderRadius: '50%', opacity: 0.9, filter: 'blur(0.5px)' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

/* =========================================================================
   MAIN COMMUNICATION MODULE COMPONENT
========================================================================= */
export default function CommunicationModule() {
  const navigate = useNavigate()
  const { language, toggleLanguage } = useLanguage()

  // Navigation & Session State
  const [activeDayIndex, setActiveDayIndex] = useState(null)
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0)
  const [ladderLevel, setLadderLevel] = useState(1)
  const [completedDays, setCompletedDays] = useState([1])
  const [dayAccuracy, setDayAccuracy] = useState({})
  const [hintsUsedInSession, setHintsUsedInSession] = useState(0)
  const [turnsCompleted, setTurnsCompleted] = useState(0)
  const [sessionXP, setSessionXP] = useState(250)
  const [showOverviewModal, setShowOverviewModal] = useState(false)
  const [celebrationModal, setCelebrationModal] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)

  // Voice & Interaction State
  const [isTalking, setIsTalking] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [feedbackState, setFeedbackState] = useState(null)
  const [feedbackText, setFeedbackText] = useState('')

  const recognitionRef = useRef(null)

  // Get current patient info from localStorage
  const currentUserId = (() => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      return user?._id || user?.id || 'demo_user'
    } catch {
      return 'demo_user'
    }
  })()

  // Load backend stats
  useEffect(() => {
    if (currentUserId && currentUserId !== 'demo_user') {
      fetch(`/api/patient/communication-progress/${currentUserId}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.completedDays) {
            setCompletedDays(data.completedDays.length > 0 ? data.completedDays : [1])
            const accMap = {}
            data.dayStats?.forEach(s => {
              accMap[s.day] = s.accuracy
            })
            setDayAccuracy(accMap)
          }
        })
        .catch(err => console.log('Communication progress load:', err))
    }
  }, [currentUserId])

  // Setup Web Speech Recognition
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.lang = language === 'ta' ? 'ta-IN' : 'en-US'
      recognitionRef.current.onresult = (event) => {
        const text = event.results[0][0].transcript
        setTranscript(text)
        handleVerbalResponse(text)
      }
      recognitionRef.current.onerror = () => {
        setIsListening(false)
      }
      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }
  }, [language, activeDayIndex, currentTaskIndex, ladderLevel])

  // Speech Synthesis
  const speak = (text, onComplete) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = language === 'ta' ? 'ta-IN' : 'en-US'
      utterance.rate = 0.90
      utterance.pitch = 1.15
      utterance.onstart = () => setIsTalking(true)
      utterance.onend = () => {
        setIsTalking(false)
        if (onComplete) onComplete()
      }
      window.speechSynthesis.speak(utterance)
    } else {
      if (onComplete) onComplete()
    }
  }

  // Start Day Session
  const startDaySession = (dayIdx) => {
    if (soundEnabled) playAudioTone('pop')
    setActiveDayIndex(dayIdx)
    setCurrentTaskIndex(0)
    setLadderLevel(1)
    setHintsUsedInSession(0)
    setTurnsCompleted(0)
    setFeedbackState(null)
    setTranscript('')

    const dayData = CURRICULUM[dayIdx]
    const initialTask = dayData.tasks[0]
    const promptText = language === 'ta' ? (initialTask.taPrompt || initialTask.prompt) : initialTask.prompt

    setTimeout(() => {
      speak(promptText)
    }, 450)
  }

  // Hint Support Ladder
  const escalateLadder = () => {
    if (soundEnabled) playAudioTone('hint')
    setHintsUsedInSession(prev => prev + 1)
    const nextLevel = Math.min(ladderLevel + 1, 5)
    setLadderLevel(nextLevel)

    const dayData = CURRICULUM[activeDayIndex]
    const currentTask = dayData.tasks[currentTaskIndex]

    if (nextLevel === 2) {
      const hintMsg = language === 'ta' ? (currentTask.taSimplified || currentTask.simplified) : currentTask.simplified
      setFeedbackText(hintMsg)
      setFeedbackState('hint')
      speak(hintMsg)
    } else if (nextLevel === 3 || nextLevel === 4) {
      const choiceMsg = language === 'ta' ? 'படங்களில் ஒன்றை தொடுங்கள்!' : 'Touch one of the pictures on screen!'
      setFeedbackText(choiceMsg)
      setFeedbackState('hint')
      speak(choiceMsg)
    } else if (nextLevel === 5) {
      const modelMsg = language === 'ta' ? `ஒன்றாகச் சொல்வோம்: ${currentTask.taTargetWord || currentTask.targetWord}` : `Let's say together: ${currentTask.targetWord}`
      setFeedbackText(modelMsg)
      setFeedbackState('model')
      speak(modelMsg)
    }
  }

  // Answer Select
  const handleAnswerSelect = (option) => {
    const dayData = CURRICULUM[activeDayIndex]
    const currentTask = dayData.tasks[currentTaskIndex]

    if (option.isCorrect) {
      if (soundEnabled) playAudioTone('success')
      setFeedbackState('correct')
      setTurnsCompleted(prev => prev + 1)
      setSessionXP(prev => prev + 50)
      const praiseMsg = language === 'ta' ? 'மிக நன்று! சரியான பதில்! 🌟' : (currentTask.modelAnswer || 'Great job! You got it! 🌟')
      setFeedbackText(praiseMsg)
      speak(praiseMsg, () => {
        setTimeout(() => {
          advanceToNextTask()
        }, 1200)
      })
    } else {
      if (soundEnabled) playAudioTone('hint')
      setFeedbackState('hint')
      const retryMsg = language === 'ta' ? 'நல்ல முயற்சி! மீண்டும் ஒருமுறை பார்ப்போம்.' : 'Good try! Let\'s look again.'
      setFeedbackText(retryMsg)
      speak(retryMsg, () => {
        escalateLadder()
      })
    }
  }

  // Verbal Input
  const handleVerbalResponse = (heardText) => {
    const dayData = CURRICULUM[activeDayIndex]
    const currentTask = dayData.tasks[currentTaskIndex]
    const cleanHeard = heardText.toLowerCase().trim()
    const cleanTarget = (currentTask.targetWord || '').toLowerCase().trim()

    if (cleanHeard.includes(cleanTarget) || cleanHeard.length > 2) {
      handleAnswerSelect({ isCorrect: true })
    } else {
      escalateLadder()
    }
  }

  // Advance Task
  const advanceToNextTask = () => {
    const dayData = CURRICULUM[activeDayIndex]
    if (currentTaskIndex < dayData.tasks.length - 1) {
      const nextIdx = currentTaskIndex + 1
      setCurrentTaskIndex(nextIdx)
      setLadderLevel(1)
      setFeedbackState(null)
      setTranscript('')
      const nextTask = dayData.tasks[nextIdx]
      const promptText = language === 'ta' ? (nextTask.taPrompt || nextTask.prompt) : nextTask.prompt
      speak(promptText)
    } else {
      finishDay()
    }
  }

  // Finish Day
  const finishDay = () => {
    if (soundEnabled) playAudioTone('fanfare')
    const dayNum = activeDayIndex + 1
    const finalAccuracy = Math.max(100 - (hintsUsedInSession * 10), 70)

    if (!completedDays.includes(dayNum)) {
      setCompletedDays(prev => [...prev, dayNum])
    }
    setDayAccuracy(prev => ({ ...prev, [dayNum]: finalAccuracy }))
    setCelebrationModal(true)

    if (currentUserId && currentUserId !== 'demo_user') {
      fetch(`/api/patient/communication-progress/${currentUserId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          day: dayNum,
          accuracy: finalAccuracy,
          hintsUsed: hintsUsedInSession,
          turnsCount: turnsCompleted + 1
        })
      }).catch(err => console.log('Error saving progress:', err))
    }

    const celebAudio = language === 'ta' ? `அற்புதம்! வாரம் ${dayNum} முடிந்தது! நீங்கள் சிறந்த வீரர்!` : `Hooray! Week ${dayNum} Completed! You did a wonderful job!`
    speak(celebAudio)
  }

  /* =========================================================================
     RENDER: SIMPLE 6 RULES MODAL
  ========================================================================= */
  const renderPrinciplesModal = () => (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.78)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
      <div style={{ background: 'white', borderRadius: '36px', maxWidth: '820px', width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '40px', boxShadow: '0 32px 70px -12px rgba(15,23,42,0.35)', position: 'relative' }}>
        <button onClick={() => setShowOverviewModal(false)} style={{ position: 'absolute', top: '24px', right: '24px', background: '#F1F5F9', border: 'none', borderRadius: '50%', width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontWeight: 900, fontSize: '1.2rem' }}>✕</button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '24px' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '20px', background: 'linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 24px rgba(59,130,246,0.35)' }}>
            <Sparkles size={30} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontWeight: 900, fontSize: '1.5rem', color: '#0F172A' }}>How Panda Helps Your Child Talk</h2>
            <p style={{ margin: '4px 0 0', color: '#64748B', fontWeight: 600, fontSize: '0.95rem' }}>Simple, stress-free ways we practice speech every day</p>
          </div>
        </div>

        {/* 6 Simple Rules */}
        <div style={{ background: '#F8FAFC', borderRadius: '28px', padding: '24px', border: '1px solid #E2E8F0', marginBottom: '24px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', fontWeight: 900, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Shield size={22} color="#2563EB" /> 6 Simple Rules
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            {[
              { num: '1', text: 'Go at your child\'s own pace' },
              { num: '2', text: 'First understand, then speak words' },
              { num: '3', text: 'Use clear pictures and real-life examples' },
              { num: '4', text: 'Words, pointing, and pictures all count' },
              { num: '5', text: 'Cheer and praise every single attempt' },
              { num: '6', text: 'Make questions easier whenever needed' }
            ].map(p => (
              <div key={p.num} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', background: 'white', padding: '14px 18px', borderRadius: '18px', border: '1px solid #F1F5F9', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                <span style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'linear-gradient(135deg, #2563EB, #4F46E5)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.82rem', fontWeight: 900, flexShrink: 0, boxShadow: '0 2px 6px rgba(37,99,235,0.3)' }}>{p.num}</span>
                <span style={{ fontSize: '0.92rem', fontWeight: 700, color: '#334155', lineHeight: 1.45 }}>{p.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 5 Support Steps */}
        <div style={{ marginBottom: '28px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', fontWeight: 900, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Layers size={22} color="#7C3AED" /> 5 Ways Panda Helps When Stuck
          </h3>
          <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
            {[
              { step: '1', label: 'Ask Normally', desc: 'Friendly spoken question', color: '#3B82F6', bg: '#EFF6FF' },
              { step: '2', label: 'Make It Simpler', desc: 'Shorter and clearer cue', color: '#10B981', bg: '#F0FDF4' },
              { step: '3', label: 'Show Choices', desc: '2 or 3 picture buttons', color: '#F59E0B', bg: '#FEF3C7' },
              { step: '4', label: 'Show Picture', desc: 'Big clear picture card', color: '#8B5CF6', bg: '#F5F3FF' },
              { step: '5', label: 'Say Together', desc: 'Panda models the answer', color: '#EC4899', bg: '#FCE7F3' }
            ].map(l => (
              <div key={l.step} style={{ flex: 1, minWidth: '135px', background: l.bg, border: `1.5px solid ${l.color}45`, borderRadius: '20px', padding: '16px 12px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 900, color: l.color, textTransform: 'uppercase', marginBottom: '4px' }}>Step {l.step}</div>
                <div style={{ fontWeight: 900, fontSize: '0.92rem', color: '#0F172A', marginBottom: '4px' }}>{l.label}</div>
                <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>{l.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <button onClick={() => setShowOverviewModal(false)} style={{ width: '100%', padding: '16px', background: 'linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)', color: 'white', border: 'none', borderRadius: '18px', fontWeight: 900, fontSize: '1.05rem', cursor: 'pointer', boxShadow: '0 10px 28px rgba(37,99,235,0.3)' }}>
          Let's Play Now 🚀
        </button>
      </div>
    </div>
  )

  /* =========================================================================
     RENDER: 7-DAY ROADMAP VIEW
  ========================================================================= */
  const renderRoadmapView = () => (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px 90px' }}>

      {/* Hero Banner with Clean Simple English */}
      <div style={{
        background: 'linear-gradient(135deg, #0B0F19 0%, #1E1B4B 40%, #1E293B 100%)',
        borderRadius: '36px',
        padding: '48px 54px',
        color: 'white',
        marginBottom: '40px',
        boxShadow: '0 28px 70px rgba(15,23,42,0.25)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '32px',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.12)'
      }}>
        {/* Glow ambient background lights */}
        <div style={{ position: 'absolute', top: '-80px', right: '-60px', width: '340px', height: '340px', background: 'radial-gradient(circle, rgba(56,189,248,0.3) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '15%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(168,85,247,0.25) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '680px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(56,189,248,0.18)', border: '1px solid rgba(56,189,248,0.4)', padding: '8px 18px', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 900, color: '#38BDF8', marginBottom: '18px', backdropFilter: 'blur(10px)' }}>
            <Sparkles size={16} /> AURA AI Communication
          </div>
          <h1 style={{ margin: '0 0 12px 0', fontSize: '2.8rem', fontWeight: 900, letterSpacing: '-1px', lineHeight: 1.15 }}>
            Learn to Talk with Panda! 🐼
          </h1>
          <p style={{ margin: 0, color: '#94A3B8', fontSize: '1.1rem', lineHeight: 1.6, fontWeight: 600 }}>
            Fun, easy daily games to help your child listen, talk, and share thoughts step by step.
          </p>

          <div style={{ display: 'flex', gap: '16px', marginTop: '30px', flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              onClick={() => startDaySession(0)}
              style={{
                padding: '16px 32px',
                background: 'linear-gradient(135deg, #38BDF8 0%, #2563EB 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '18px',
                fontWeight: 900,
                fontSize: '1.05rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 10px 30px rgba(56,189,248,0.4)',
                transition: 'transform 0.15s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <Play size={20} fill="white" /> Start Learning Journey
            </button>

            <button
              onClick={() => setShowOverviewModal(true)}
              style={{
                padding: '16px 24px',
                background: 'rgba(255,255,255,0.08)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.22)',
                borderRadius: '18px',
                fontWeight: 800,
                fontSize: '0.98rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backdropFilter: 'blur(10px)'
              }}
            >
              <Info size={18} /> How It Works
            </button>

            {/* Live XP Level Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(245,158,11,0.18)', border: '1px solid rgba(245,158,11,0.35)', padding: '10px 20px', borderRadius: '100px', color: '#FCD34D', fontWeight: 900, fontSize: '0.95rem' }}>
              <Flame size={20} color="#F59E0B" fill="#F59E0B" /> {sessionXP} Star Points
            </div>
          </div>
        </div>

        {/* Panda Avatar Centerpiece */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2 }}>
          <PandaAvatar isTalking={false} isListening={false} size={195} />
          <div style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', padding: '8px 22px', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 900, color: '#F1F5F9', marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', backdropFilter: 'blur(8px)' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px #10B981' }} /> AURA Panda Ready 🐼
          </div>
        </div>
      </div>

      {/* 6 Step Learning Path Strip */}
      <div style={{ background: 'white', borderRadius: '28px', padding: '30px 36px', border: '1.5px solid #E2E8F0', marginBottom: '40px', boxShadow: '0 6px 24px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ margin: 0, fontWeight: 900, fontSize: '1.2rem', color: '#0F172A' }}>5-Week Communication Master Path</h3>
            <span style={{ fontSize: '0.88rem', color: '#64748B', fontWeight: 600 }}>From listening to chatting with friends</span>
          </div>
          <span style={{ fontSize: '0.9rem', fontWeight: 900, color: '#2563EB', background: '#EFF6FF', padding: '8px 20px', borderRadius: '100px', border: '1px solid #BFDBFE' }}>
            {completedDays.length} / {CURRICULUM.length} Weeks Complete
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '14px' }}>
          {[
            { step: 'W1', title: 'Foundations', desc: 'objects & sounds', color: '#0284C7', bg: '#E0F2FE' },
            { step: 'W2', title: 'Needs & Help', desc: 'ask for things', color: '#D97706', bg: '#FEF3C7' },
            { step: 'W3', title: 'Favorites', desc: 'likes & feelings', color: '#7C3AED', bg: '#EDE9FE' },
            { step: 'W4', title: 'Sentences', desc: '3-5 word sentences', color: '#DB2777', bg: '#FCE7F3' },
            { step: 'W5', title: 'Champions', desc: 'real-life chat', color: '#0891B2', bg: '#CFFAFE' }
          ].map((s, idx) => (
            <div key={idx} style={{ background: s.bg, border: `1.5px solid ${s.color}35`, borderRadius: '20px', padding: '16px 12px', textAlign: 'center', transition: 'all 0.15s' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: s.color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.82rem', fontWeight: 900, margin: '0 auto 8px', boxShadow: `0 4px 10px ${s.color}40` }}>{s.step}</div>
              <div style={{ fontWeight: 900, fontSize: '0.9rem', color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.title}</div>
              <div style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: 700, marginTop: '2px' }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 7-Day Plan Grid */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.55rem', fontWeight: 900, color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Award size={26} color="#2563EB" /> 5 Weeks of Communication Games
          </h2>
          <p style={{ margin: '4px 0 0', color: '#64748B', fontSize: '0.92rem', fontWeight: 600 }}>Start with Week 1 and progress through weekly communication milestones</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '26px' }}>
        {CURRICULUM.map((dayData, idx) => {
          const isCompleted = completedDays.includes(dayData.day)
          const isUnlocked = idx === 0 || completedDays.includes(dayData.day - 1)
          const accuracy = dayAccuracy[dayData.day]

          return (
            <div
              key={dayData.day}
              style={{
                background: 'white',
                border: `2px solid ${isCompleted ? '#10B981' : isUnlocked ? dayData.border : '#E2E8F0'}`,
                borderRadius: '30px',
                padding: '30px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: isUnlocked ? '0 10px 30px rgba(0,0,0,0.05)' : 'none',
                opacity: isUnlocked ? 1 : 0.65,
                position: 'relative',
                transition: 'all 0.2s ease',
                overflow: 'hidden'
              }}
            >
              {/* Corner Soft Color Accent */}
              <div style={{ position: 'absolute', top: 0, right: 0, width: '90px', height: '90px', background: dayData.bg, borderRadius: '0 30px 0 90px', opacity: 0.75, pointerEvents: 'none' }} />

              {/* Day Header */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ background: dayData.bg, color: dayData.color, fontWeight: 900, fontSize: '0.88rem', padding: '6px 16px', borderRadius: '100px', border: `1.5px solid ${dayData.border}` }}>
                      WEEK {dayData.week || dayData.day}
                    </span>
                    <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#64748B' }}>{dayData.progressionStage}</span>
                  </div>
                  {isCompleted ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#D1FAE5', color: '#065F46', padding: '5px 14px', borderRadius: '100px', fontWeight: 900, fontSize: '0.82rem' }}>
                      <CheckCircle2 size={15} /> {accuracy ? `${accuracy}%` : 'Done'}
                    </span>
                  ) : isUnlocked ? (
                    <span style={{ background: '#EFF6FF', color: '#2563EB', padding: '5px 14px', borderRadius: '100px', fontWeight: 900, fontSize: '0.82rem' }}>
                      Ready
                    </span>
                  ) : (
                    <span style={{ background: '#F1F5F9', color: '#94A3B8', padding: '5px 14px', borderRadius: '100px', fontWeight: 900, fontSize: '0.82rem' }}>
                      Locked
                    </span>
                  )}
                </div>

                {/* Title & Goal */}
                <h3 style={{ margin: '0 0 8px 0', fontSize: '1.25rem', fontWeight: 900, color: '#0F172A', lineHeight: 1.3 }}>
                  {language === 'ta' ? dayData.taTitle : dayData.title}
                </h3>
                <p style={{ margin: '0 0 18px 0', fontSize: '0.92rem', color: '#64748B', fontWeight: 600, lineHeight: 1.55 }}>
                  {language === 'ta' ? dayData.taGoal : dayData.goal}
                </p>

                {/* Targets Box */}
                <div style={{ background: '#F8FAFC', borderRadius: '18px', padding: '14px 16px', marginBottom: '24px', border: '1px solid #F1F5F9' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#94A3B8', textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '0.04em' }}>What We Practice</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#334155', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Zap size={16} color="#F59E0B" fill="#F59E0B" /> {dayData.targetAccuracy} • {dayData.targetHints}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => isUnlocked && startDaySession(idx)}
                disabled={!isUnlocked}
                style={{
                  width: '100%',
                  padding: '16px',
                  background: isCompleted ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)' : isUnlocked ? dayData.gradient : '#CBD5E1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '18px',
                  fontWeight: 900,
                  fontSize: '1rem',
                  cursor: isUnlocked ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: isUnlocked ? '0 8px 22px rgba(0,0,0,0.12)' : 'none',
                  transition: 'transform 0.15s ease'
                }}
                onMouseEnter={e => { if (isUnlocked) e.currentTarget.style.transform = 'translateY(-3px)' }}
                onMouseLeave={e => { if (isUnlocked) e.currentTarget.style.transform = 'translateY(0)' }}
              >
                {isCompleted ? (
                  <><RotateCcw size={18} /> Play Again</>
                ) : isUnlocked ? (
                  <><Play size={18} fill="white" /> Start Week {dayData.week || dayData.day}</>
                ) : (
                  <>Finish Week {(dayData.week || dayData.day) - 1} First</>
                )}
              </button>
            </div>
          )
        })}
      </div>

      {/* Footer Banner */}
      <div style={{ marginTop: '50px', background: 'linear-gradient(135deg, #EFF6FF 0%, #F5F3FF 100%)', borderRadius: '28px', padding: '30px', border: '1.5px solid #DBEAFE', textAlign: 'center', boxShadow: '0 4px 18px rgba(0,0,0,0.02)' }}>
        <p style={{ margin: 0, fontWeight: 800, color: '#334155', fontSize: '1.05rem', lineHeight: 1.5 }}>
          💙 "Every child communicates in their own special way. Panda is here to help you grow!"
        </p>
      </div>
    </div>
  )

  /* =========================================================================
     RENDER: INTERACTIVE PRACTICE STAGE
  ========================================================================= */
  const renderPracticeStage = () => {
    const dayData = CURRICULUM[activeDayIndex]
    const currentTask = dayData.tasks[currentTaskIndex]
    const promptText = language === 'ta' ? (currentTask.taPrompt || currentTask.prompt) : currentTask.prompt

    return (
      <div style={{ maxWidth: '980px', margin: '0 auto', padding: '0 24px 90px' }}>

        {/* Practice Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <button
            onClick={() => {
              if (soundEnabled) playAudioTone('pop')
              setActiveDayIndex(null)
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: 'white', border: '1.5px solid #E2E8F0', borderRadius: '100px', fontWeight: 900, fontSize: '0.92rem', color: '#334155', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}
          >
            <ArrowLeft size={18} /> Back to Games
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontWeight: 900, fontSize: '0.95rem', color: dayData.color, background: dayData.bg, padding: '10px 22px', borderRadius: '100px', border: `1.5px solid ${dayData.border}` }}>
              Week {dayData.week || dayData.day}: {language === 'ta' ? dayData.taTitle : dayData.title}
            </span>
            <span style={{ fontSize: '0.92rem', fontWeight: 900, color: '#64748B', background: 'white', padding: '10px 22px', borderRadius: '100px', border: '1.5px solid #E2E8F0' }}>
              Question {currentTaskIndex + 1} of {dayData.tasks.length}
            </span>
          </div>
        </div>

        {/* Support Ladder Indicator */}
        <div style={{ background: 'white', borderRadius: '24px', padding: '16px 26px', border: '1.5px solid #E2E8F0', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', boxShadow: '0 4px 14px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Layers size={20} color="#7C3AED" />
            <span style={{ fontWeight: 900, fontSize: '0.95rem', color: '#0F172A' }}>Help Level</span>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {[
              { lvl: 1, label: 'Question' },
              { lvl: 2, label: 'Easier' },
              { lvl: 3, label: 'Choices' },
              { lvl: 4, label: 'Picture' },
              { lvl: 5, label: 'Together' }
            ].map(l => (
              <span
                key={l.lvl}
                style={{
                  padding: '6px 14px',
                  borderRadius: '100px',
                  fontSize: '0.82rem',
                  fontWeight: 900,
                  background: ladderLevel >= l.lvl ? (l.lvl === 5 ? '#FCE7F3' : '#EDE9FE') : '#F1F5F9',
                  color: ladderLevel >= l.lvl ? (l.lvl === 5 ? '#DB2777' : '#7C3AED') : '#94A3B8',
                  border: ladderLevel === l.lvl ? '2px solid #7C3AED' : '1px solid transparent',
                  boxShadow: ladderLevel === l.lvl ? '0 0 10px rgba(124,58,237,0.3)' : 'none'
                }}
              >
                {l.lvl}. {l.label}
              </span>
            ))}
          </div>
        </div>

        {/* Central Panda & Question Card */}
        <div style={{
          background: 'white',
          borderRadius: '36px',
          padding: '44px 40px',
          border: '1.5px solid #E2E8F0',
          boxShadow: '0 16px 44px rgba(15,23,42,0.07)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          marginBottom: '28px',
          position: 'relative'
        }}>

          {/* Panda Avatar */}
          <div style={{ marginBottom: '24px' }}>
            <PandaAvatar isTalking={isTalking} isListening={isListening} size={200} />
          </div>

          {/* Display Visual Flashcard (if available, e.g. 🍎 or 🐄) */}
          {currentTask.displayVisual && (
            <div style={{ fontSize: '5.5rem', marginBottom: '16px' }}>
              {currentTask.displayVisual}
            </div>
          )}

          {/* Question Prompt Bubble */}
          <div style={{
            background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
            border: '2px solid #CBD5E1',
            borderRadius: '28px',
            padding: '24px 36px',
            maxWidth: '720px',
            width: '100%',
            marginBottom: '18px',
            boxShadow: '0 6px 16px rgba(0,0,0,0.02)'
          }}>
            <h2 style={{ margin: 0, fontSize: '1.65rem', fontWeight: 900, color: '#0F172A', lineHeight: 1.35 }}>
              "{promptText}"
            </h2>
          </div>

          {/* Listen Again Replay Button */}
          <button
            onClick={() => {
              if (soundEnabled) playAudioTone('pop')
              speak(promptText)
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#EFF6FF',
              border: '1.5px solid #BFDBFE',
              color: '#2563EB',
              padding: '10px 22px',
              borderRadius: '100px',
              fontSize: '0.9rem',
              fontWeight: 900,
              cursor: 'pointer',
              marginBottom: '26px'
            }}
          >
            <Volume2 size={18} /> Listen Again
          </button>

          {/* Sentence Building Steps (For Day 5) */}
          {currentTask.ladderSteps && (
            <div style={{ width: '100%', maxWidth: '660px', background: '#FDF2F8', borderRadius: '24px', padding: '18px 24px', border: '2px solid #FBCFE8', marginBottom: '26px' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 900, color: '#DB2777', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.05em' }}>Sentence Steps</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
                {(language === 'ta' ? currentTask.taLadderSteps : currentTask.ladderSteps)?.map((step, sIdx) => (
                  <div key={sIdx} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1rem', fontWeight: 900, color: '#0F172A', background: 'white', padding: '10px 18px', borderRadius: '16px', width: '100%', border: '1px solid #FCE7F3', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
                    <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#DB2777', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 900 }}>{sIdx + 1}</span>
                    {step}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Feedback Display Banner */}
          {feedbackState && (
            <div style={{
              width: '100%', maxWidth: '680px',
              padding: '18px 28px', borderRadius: '20px',
              background: feedbackState === 'correct' ? '#D1FAE5' : feedbackState === 'model' ? '#EDE9FE' : '#FEF3C7',
              border: `2px solid ${feedbackState === 'correct' ? '#34D399' : feedbackState === 'model' ? '#A78BFA' : '#FBBF24'}`,
              color: feedbackState === 'correct' ? '#065F46' : feedbackState === 'model' ? '#5B21B6' : '#92400E',
              fontWeight: 900, fontSize: '1.05rem', marginBottom: '26px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
              boxShadow: '0 6px 18px rgba(0,0,0,0.04)'
            }}>
              {feedbackState === 'correct' ? <CheckCircle2 size={24} color="#059669" /> : <Sparkles size={24} />}
              {feedbackText}
            </div>
          )}

          {/* Spoken Speech Transcript */}
          {transcript && (
            <div style={{ background: '#F1F5F9', borderRadius: '100px', padding: '12px 28px', fontSize: '1rem', fontWeight: 900, color: '#334155', marginBottom: '22px', border: '1.5px solid #CBD5E1' }}>
              🎤 Panda Heard: "{transcript}"
            </div>
          )}

          {/* Large Picture Buttons */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: currentTask.options?.length > 2 ? 'repeat(auto-fit, minmax(200px, 1fr))' : '1fr 1fr',
            gap: '18px',
            width: '100%',
            maxWidth: '720px',
            marginBottom: '32px'
          }}>
            {currentTask.options?.map((opt, oIdx) => (
              <button
                key={oIdx}
                onClick={() => handleAnswerSelect(opt)}
                style={{
                  background: 'white',
                  border: '2.5px solid #E2E8F0',
                  borderRadius: '24px',
                  padding: '24px 18px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.18s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  boxShadow: '0 6px 16px rgba(15,23,42,0.03)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#3B82F6'
                  e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)'
                  e.currentTarget.style.boxShadow = '0 14px 30px rgba(59,130,246,0.15)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#E2E8F0'
                  e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(15,23,42,0.03)'
                }}
              >
                <span style={{ fontSize: '3.2rem' }}>{opt.icon}</span>
                <span style={{ fontWeight: 900, fontSize: '1.08rem', color: '#0F172A' }}>
                  {language === 'ta' ? opt.taLabel : opt.label}
                </span>
              </button>
            ))}
          </div>

          {/* Microphone & Hint Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <button
              onClick={() => {
                if (recognitionRef.current) {
                  setTranscript('')
                  setIsListening(true)
                  try { recognitionRef.current.start() } catch { setIsListening(false) }
                } else {
                  speak('Microphone ready. Say your answer!')
                }
              }}
              disabled={isListening || isTalking}
              style={{
                width: '74px', height: '74px', borderRadius: '50%',
                background: isListening ? '#EF4444' : 'linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)',
                color: 'white', border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: isListening ? '0 0 32px rgba(239,68,68,0.6)' : '0 10px 28px rgba(37,99,235,0.4)',
                transition: 'all 0.2s'
              }}
            >
              {isListening ? <MicOff size={34} /> : <Mic size={34} />}
            </button>

            <button
              onClick={escalateLadder}
              style={{
                padding: '16px 26px',
                background: '#F8FAFC',
                border: '1.5px solid #CBD5E1',
                borderRadius: '18px',
                fontWeight: 900,
                fontSize: '0.96rem',
                color: '#475569',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'background 0.15s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#F1F5F9'}
              onMouseLeave={e => e.currentTarget.style.background = '#F8FAFC'}
            >
              <HelpIcon size={20} /> Help Me
            </button>
          </div>
          <div style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: 800, marginTop: '14px' }}>
            {isListening ? '🎤 Panda is listening... Speak now!' : 'Touch any picture above or press mic to speak'}
          </div>
        </div>
      </div>
    )
  }

  /* =========================================================================
     RENDER: CELEBRATION MODAL
  ========================================================================= */
  const renderCelebrationModal = () => (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.82)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
      <div style={{ background: 'white', borderRadius: '36px', maxWidth: '560px', width: '100%', padding: '48px 40px', textAlign: 'center', boxShadow: '0 32px 80px rgba(0,0,0,0.4)' }}>
        <div style={{ fontSize: '6rem', marginBottom: '18px' }}>🏆</div>
        <span style={{ background: '#D1FAE5', color: '#065F46', fontWeight: 900, fontSize: '0.9rem', padding: '6px 18px', borderRadius: '100px', display: 'inline-block', marginBottom: '16px', border: '1px solid #6EE7B7' }}>
          WEEK {activeDayIndex + 1} COMPLETE!
        </span>
        <h2 style={{ margin: '0 0 12px 0', fontSize: '2.2rem', fontWeight: 900, color: '#0F172A' }}>
          Super Job! 🌟
        </h2>
        <p style={{ color: '#64748B', fontWeight: 600, fontSize: '1.05rem', lineHeight: 1.55, marginBottom: '32px' }}>
          You did a wonderful job talking and playing with Panda today!
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '36px' }}>
          <div style={{ background: '#F8FAFC', padding: '18px', borderRadius: '20px', border: '1.5px solid #E2E8F0' }}>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#10B981' }}>{dayAccuracy[activeDayIndex + 1] || 95}%</div>
            <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 900, textTransform: 'uppercase', marginTop: '2px' }}>Score</div>
          </div>
          <div style={{ background: '#F8FAFC', padding: '18px', borderRadius: '20px', border: '1.5px solid #E2E8F0' }}>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#2563EB' }}>+100</div>
            <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 900, textTransform: 'uppercase', marginTop: '2px' }}>Star Points</div>
          </div>
        </div>

        <button
          onClick={() => {
            setCelebrationModal(false)
            setActiveDayIndex(null)
          }}
          style={{ width: '100%', padding: '18px', background: 'linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)', color: 'white', border: 'none', borderRadius: '20px', fontWeight: 900, fontSize: '1.05rem', cursor: 'pointer', boxShadow: '0 10px 28px rgba(37,99,235,0.35)' }}
        >
          Back to Games 🌟
        </button>
      </div>
    </div>
  )

  /* =========================================================================
     MAIN SHELL
  ========================================================================= */
  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', display: 'flex', flexDirection: 'column' }}>

      {/* Navigation Top Header */}
      <header style={{ background: 'white', borderBottom: '1px solid #E2E8F0', padding: '18px 44px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
        <button
          onClick={() => navigate('/dashboard/patient')}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 22px', background: '#F1F5F9', border: 'none', borderRadius: '100px', fontWeight: 900, fontSize: '0.92rem', color: '#334155', cursor: 'pointer', transition: 'background 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.background = '#E2E8F0'}
          onMouseLeave={e => e.currentTarget.style.background = '#F1F5F9'}
        >
          <ArrowLeft size={18} /> Back to Dashboard
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            style={{ padding: '11px 16px', background: soundEnabled ? '#EFF6FF' : '#F1F5F9', border: soundEnabled ? '1.5px solid #BFDBFE' : '1.5px solid #CBD5E1', borderRadius: '100px', color: soundEnabled ? '#2563EB' : '#94A3B8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 900, fontSize: '0.88rem' }}
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            {soundEnabled ? 'Sound On' : 'Muted'}
          </button>

          <button
            onClick={() => setShowOverviewModal(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '11px 20px', background: '#F8FAFC', border: '1.5px solid #CBD5E1', borderRadius: '100px', fontWeight: 900, fontSize: '0.9rem', color: '#475569', cursor: 'pointer' }}
          >
            <Info size={16} /> How It Works
          </button>

          <button
            onClick={toggleLanguage}
            style={{ padding: '11px 22px', background: '#EFF6FF', border: '1.5px solid #BFDBFE', borderRadius: '100px', fontWeight: 900, fontSize: '0.92rem', color: '#2563EB', cursor: 'pointer' }}
          >
            {language === 'en' ? 'தமிழ்' : 'English'}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '44px 0' }}>
        {activeDayIndex === null ? renderRoadmapView() : renderPracticeStage()}
      </main>

      {/* Modals */}
      {showOverviewModal && renderPrinciplesModal()}
      {celebrationModal && renderCelebrationModal()}
    </div>
  )
}
