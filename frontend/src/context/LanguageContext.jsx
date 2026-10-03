import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    // Shared
    loading: "Loading...",
    save: "Save",
    cancel: "Cancel",
    
    // Emotion Matching App
    emotionJourney: "Emotion Journey",
    followPath: "Follow the path to learn about feelings!",
    startLearn: "Start: Learn",
    basicFaces: "1. Basic Faces",
    storyTime: "2. Story Time",
    zones: "3. Zones",
    takeABreak: "Take a Break",
    myStickers: "My Stickers",
    exit: "Exit",
    map: "Map",
    faceClues: "Face Clues",
    bodyClues: "Body Clues",
    why: "Why?",
    watchVideo: "Watch Video",
    videoLesson: "Video Lesson",
    finishTutorial: "Finish Tutorial",
    nextFeeling: "Next Feeling",
    youDidIt: "You Did It!",
    amazingJob: "Amazing job finishing this level!",
    earnedSticker: "You earned a new sticker!",
    backToMap: "Back to Map",
    locked: "Locked",
    myStickerBook: "My Sticker Book",
    
    // Emotions
    happy: "Happy",
    calm: "Calm",
    sad: "Sad",
    tired: "Tired",
    silly: "Silly",
    frustrated: "Frustrated",
    angry: "Angry",
    scared: "Scared",
    
    // Zones
    blueZone: "Blue Zone",
    greenZone: "Green Zone",
    yellowZone: "Yellow Zone",
    redZone: "Red Zone",
    slow: "Slow",
    ready: "Ready",
    wiggly: "Wiggly",
    stop: "Stop",

    // Emotion Explanations (Targeting)
    teachingFaceHappy: "The corners of the mouth go UP into a big smile. The eyes get crinkly and bright!",
    teachingBodyHappy: "Your body feels light, bouncy, and full of warm energy. You might want to jump!",
    teachingContextHappy: "We feel happy when we play with our favorite toys or get a big hug.",

    teachingFaceCalm: "The face is relaxed. No tight muscles. The mouth is resting gently.",
    teachingBodyCalm: "Breathing is slow and steady. Your tummy feels peaceful and quiet.",
    teachingContextCalm: "We feel calm when we are reading a book, resting, or listening to soft music.",

    teachingFaceSad: "The corners of the mouth pull DOWN. Eyebrows pinch together. Tears might fall.",
    teachingBodySad: "Your body feels heavy, slow, and tired. Your chest might feel tight.",
    teachingContextSad: "We feel sad when we lose something we love, or when we fall and get hurt.",

    teachingFaceTired: "Eyes are half-closed or shutting. You might yawn and open your mouth wide.",
    teachingBodyTired: "Muscles feel like jelly. You move very slowly and have no energy.",
    teachingContextTired: "We feel tired after a long day of playing, or when it is past our bedtime.",

    teachingFaceSilly: "A huge, goofy smile! Maybe one eye winks, or the tongue sticks out.",
    teachingBodySilly: "You feel wiggly, giggly, and you can't stop moving around!",
    teachingContextSilly: "We feel silly when someone tells a funny joke or we are playing games.",

    teachingFaceFrustrated: "Teeth are squeezed together. Eyebrows pull down. The face might turn a little red.",
    teachingBodyFrustrated: "Your brain feels stuck. Your hands might want to squeeze something tight.",
    teachingContextFrustrated: "We feel frustrated when a puzzle is too hard, or we can't do something right away.",

    teachingFaceAngry: "Mouth might open wide to yell. Eyebrows point down sharply in a V shape.",
    teachingBodyAngry: "Your heart beats very fast! You feel hot, and your body wants to push or hit.",
    teachingContextAngry: "We feel angry when someone takes our toy, or things are very unfair.",

    teachingFaceScared: "Eyes are wide open so you can see! Mouth drops open in a little 'O'.",
    teachingBodyScared: "You might freeze like a statue, or your body might shake and want to run away.",
    teachingContextScared: "We feel scared when there is a sudden loud noise, or we see a scary shadow.",

    // Scenarios
    scenarioIceCream: "Aayu dropped his ice cream.",
    scenarioBirthday: "It's Aayu's birthday!",
    scenarioThunder: "A loud thunder crash happens.",
    scenarioTower: "The toy tower keeps falling.",
    scenarioPark: "Aayu played at the park all day.",
    
    // Stickers
    stickerSmartLearner: "Smart Learner",
    stickerFaceFinder: "Face Finder",
    stickerEmpathyHero: "Empathy Hero",
    stickerZoneMaster: "Zone Master",
    
    // Audio prompts
    promptClickClues: "Let's learn about {0}. Click the clues below!",
    promptFind: "Find {0}",
    promptWhereDoesItGo: "Where does {0} go?",
    promptAllClues: "Click all three clues to learn about this feeling!",
    promptYay: "Yay! {0}!",
    promptRightTheyFeel: "Right! They feel {0}.",
    promptGoesTo: "{0} goes to {1}!",
    promptFinishedLevel: "Amazing! You finished the level and earned the {0}!",
    
    // Breathing
    breatheIn: "Inhale...",
    breatheHold: "Hold...",
    breatheOut: "Exhale...",
    breatheDone: "Done! Feeling better?",
  },
  ta: {
    // Shared
    loading: "ஏற்றுகிறது...",
    save: "சேமி",
    cancel: "ரத்துசெய்",
    
    // Emotion Matching App
    emotionJourney: "உணர்ச்சி பயணம்",
    followPath: "உணர்வுகளைப் பற்றி அறிய பாதையைப் பின்பற்றுங்கள்!",
    startLearn: "தொடங்கு: கற்றுக்கொள்",
    basicFaces: "1. அடிப்படை முகங்கள்",
    storyTime: "2. கதை நேரம்",
    zones: "3. மண்டலங்கள்",
    takeABreak: "ஓய்வு எடு",
    myStickers: "என் ஸ்டிக்கர்கள்",
    exit: "வெளியேறு",
    map: "வரைபடம்",
    faceClues: "முகக் குறிப்புகள்",
    bodyClues: "உடல் குறிப்புகள்",
    why: "ஏன்?",
    watchVideo: "வீடியோ பாருங்கள்",
    videoLesson: "வீடியோ பாடம்",
    finishTutorial: "பயிற்சியை முடி",
    nextFeeling: "அடுத்த உணர்வு",
    youDidIt: "நீங்கள் சாதித்துவிட்டீர்கள்!",
    amazingJob: "இந்த நிலையை முடித்ததற்கு வாழ்த்துக்கள்!",
    earnedSticker: "நீங்கள் ஒரு புதிய ஸ்டிக்கரைப் பெற்றுள்ளீர்கள்!",
    backToMap: "வரைபடத்திற்குத் திரும்பு",
    locked: "பூட்டப்பட்டது",
    myStickerBook: "என் ஸ்டிக்கர் புத்தகம்",
    
    // Emotions
    happy: "மகிழ்ச்சி",
    calm: "அமைதி",
    sad: "சோகம்",
    tired: "சோர்வு",
    silly: "வேடிக்கை",
    frustrated: "விரக்தி",
    angry: "கோபம்",
    scared: "பயம்",
    
    // Zones
    blueZone: "நீல மண்டலம்",
    greenZone: "பச்சை மண்டலம்",
    yellowZone: "மஞ்சள் மண்டலம்",
    redZone: "சிவப்பு மண்டலம்",
    slow: "மெதுவான",
    ready: "தயார்",
    wiggly: "துறுதுறுப்பான",
    stop: "நிறுத்து",

    // Emotion Explanations
    teachingFaceHappy: "வாயின் மூலைகள் மேல்நோக்கி வளைந்து ஒரு பெரிய புன்னகை உருவாகிறது. கண்கள் சுருங்கி பிரகாசமாக இருக்கும்!",
    teachingBodyHappy: "உங்கள் உடல் லேசாகவும், துள்ளலாகவும், அரவணைப்பான ஆற்றலுடன் இருக்கும். நீங்கள் குதிக்க விரும்பலாம்!",
    teachingContextHappy: "நமக்கு பிடித்த பொம்மைகளுடன் விளையாடும் போது அல்லது ஒரு பெரிய அரவணைப்பு கிடைக்கும் போது நாம் மகிழ்ச்சியாக உணர்கிறோம்.",

    teachingFaceCalm: "முகம் நிதானமாக உள்ளது. தசைகள் இறுக்கமாக இல்லை. வாய் மென்மையாக உள்ளது.",
    teachingBodyCalm: "சுவாசம் மெதுவாகவும் சீராகவும் இருக்கிறது. உங்கள் வயிறு அமைதியாக உணர்கிறது.",
    teachingContextCalm: "நாம் ஒரு புத்தகம் படிக்கும் போது, ஓய்வெடுக்கும் போது அல்லது மென்மையான இசையை கேட்கும் போது அமைதியாக உணர்கிறோம்.",

    teachingFaceSad: "வாயின் மூலைகள் கீழ்நோக்கி இழுக்கப்படுகின்றன. புருவங்கள் சுருங்குகின்றன. கண்ணீர் வரலாம்.",
    teachingBodySad: "உங்கள் உடல் கனமாக, மெதுவாக மற்றும் சோர்வாக உணர்கிறது. உங்கள் மார்பு இறுக்கமாக உணரலாம்.",
    teachingContextSad: "நாம் நேசிக்கும் ஒன்றை இழக்கும்போது அல்லது கீழே விழுந்து அடிபடும்போது சோகமாக உணர்கிறோம்.",

    teachingFaceTired: "கண்கள் பாதி மூடியிருக்கும் அல்லது மூடும். நீங்கள் கொட்டாவி விடலாம்.",
    teachingBodyTired: "தசைகள் தளர்ந்து போகும். நீங்கள் மிகவும் மெதுவாக நகர்வீர்கள், ஆற்றல் இருக்காது.",
    teachingContextTired: "நீண்ட நேரம் விளையாடிய பிறகு அல்லது தூங்கும் நேரத்திற்குப் பிறகு நாம் சோர்வாக உணர்கிறோம்.",

    teachingFaceSilly: "ஒரு பெரிய வேடிக்கையான புன்னகை! ஒரு கண் சிமிட்டலாம் அல்லது நாக்கு வெளியே நீட்டப்படலாம்.",
    teachingBodySilly: "நீங்கள் துறுதுறுப்பாக உணர்வீர்கள், சிரிப்பு வரும், உங்களால் அசையாமல் இருக்க முடியாது!",
    teachingContextSilly: "யாராவது ஒரு வேடிக்கையான நகைச்சுவை சொல்லும் போது அல்லது நாம் விளையாடும் போது வேடிக்கையாக உணர்கிறோம்.",

    teachingFaceFrustrated: "பற்கள் இறுக்கமாக உள்ளன. புருவங்கள் கீழ்நோக்கி இழுக்கப்படுகின்றன. முகம் சிறிது சிவக்கலாம்.",
    teachingBodyFrustrated: "உங்கள் மூளை சிக்கிக்கொண்டது போல் உணர்கிறது. உங்கள் கைகள் எதையாவது இறுக்கமாகப் பிடிக்க விரும்பலாம்.",
    teachingContextFrustrated: "ஒரு புதிர் மிகவும் கடினமாக இருக்கும்போது அல்லது உடனே எதையாவது செய்ய முடியாதபோது நாம் விரக்தியடைகிறோம்.",

    teachingFaceAngry: "கத்துவதற்காக வாய் பெரிதாகத் திறக்கலாம். புருவங்கள் கூர்மையாக 'V' வடிவில் இருக்கும்.",
    teachingBodyAngry: "உங்கள் இதயம் மிக வேகமாக துடிக்கிறது! நீங்கள் சூடாக உணர்கிறீர்கள், உங்கள் உடல் யாரையாவது தள்ள அல்லது அடிக்க விரும்புகிறது.",
    teachingContextAngry: "யாராவது நமது பொம்மையை எடுக்கும்போது அல்லது விஷயங்கள் நியாயமற்றதாக இருக்கும்போது நாம் கோபப்படுகிறோம்.",

    teachingFaceScared: "கண்கள் அகலமாகத் திறக்கப்படுகின்றன! வாய் ஒரு சிறிய 'O' வடிவத்தில் திறக்கிறது.",
    teachingBodyScared: "நீங்கள் சிலை போல் உறையலாம் அல்லது உங்கள் உடல் நடுங்கி ஓட விரும்பலாம்.",
    teachingContextScared: "திடீர் பெரும் சத்தம் கேட்கும்போது அல்லது பயமுறுத்தும் நிழலைப் பார்க்கும்போது நாம் பயப்படுகிறோம்.",

    // Scenarios
    scenarioIceCream: "ஆயு தனது ஐஸ்கிரீமை கீழே போட்டுவிட்டான்.",
    scenarioBirthday: "இன்று ஆயுவின் பிறந்தநாள்!",
    scenarioThunder: "பெரிய இடி சத்தம் கேட்கிறது.",
    scenarioTower: "பொம்மை கோபுரம் மீண்டும் மீண்டும் விழுகிறது.",
    scenarioPark: "ஆயு நாள் முழுவதும் பூங்காவில் விளையாடினான்.",
    
    // Stickers
    stickerSmartLearner: "புத்திசாலி மாணவர்",
    stickerFaceFinder: "முகம் கண்டுபிடிப்பாளர்",
    stickerEmpathyHero: "அன்பான நாயகன்",
    stickerZoneMaster: "மண்டல மாஸ்டர்",
    
    // Audio prompts
    promptClickClues: "{0} பற்றி அறிவோம். கீழேயுள்ள குறிப்புகளைக் கிளிக் செய்யவும்!",
    promptFind: "{0} என்பதைக் கண்டுபிடி",
    promptWhereDoesItGo: "{0} எங்கே செல்லும்?",
    promptAllClues: "இந்த உணர்வைப் பற்றி அறிய மூன்று குறிப்புகளையும் கிளிக் செய்யவும்!",
    promptYay: "அற்புதம்! {0}!",
    promptRightTheyFeel: "சரி! அவர்கள் {0} உணர்கிறார்கள்.",
    promptGoesTo: "{0} {1}-க்குச் செல்கிறது!",
    promptFinishedLevel: "அற்புதம்! நீங்கள் இந்த நிலையை முடித்து {0} ஸ்டிக்கரைப் பெற்றீர்கள்!",
    
    // Breathing
    breatheIn: "மூச்சை உள்ளே இழுக்கவும்...",
    breatheHold: "நிறுத்தவும்...",
    breatheOut: "மூச்சை வெளியே விடவும்...",
    breatheDone: "முடிந்தது! இப்போது நன்றாக உணர்கிறீர்களா?",
  }
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('aura_language');
    return saved || 'en';
  });

  useEffect(() => {
    localStorage.setItem('aura_language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ta' : 'en');
  };

  const t = (key, ...args) => {
    let str = translations[language][key];
    if (!str) return key;
    
    // Handle string formatting like {0}, {1}
    if (args.length > 0) {
      args.forEach((arg, i) => {
        str = str.replace(`{${i}}`, arg);
      });
    }
    
    return str;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
