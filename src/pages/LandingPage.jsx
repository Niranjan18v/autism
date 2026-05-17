import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Sparkles, Heart, Star, Shield, Play, Globe, 
  ArrowRight, CheckCircle2, Layout, Zap, Users, Activity,
  Quote, Mail, Phone, Share2, ChevronRight, ZapOff, ShieldCheck, Award, GraduationCap, Building
} from 'lucide-react'

const translations = {
  en: {
    brand: "AURA",
    heroTitle: "Empowering Autistic Minds to Shine Brighter",
    heroSub: "A clinically-backed sensory ecosystem combining pediatric telemetry with adaptive game pathways. Designed to foster vocabulary, active communication, and emotional regulation at a calm, predictable pace.",
    getStarted: "START THERAPY JOURNEY",
    login: "PARENT PORTAL",
    features: "How We Support You",
    about: "Meet Aura Buddy",
    contact: "Contact Us",
    whyChoose: "Why Families Trust Aura",
    bilingual: "Language of Comfort",
    bilingualDesc: "Fully localized in Tamil & English. Guided clinical tasks and synthesized speech instructions spoken in the language your child feels most secure hearing at home.",
    levels: "Sensory-Safe AI",
    levelsDesc: "Our intelligent engine adjusts color saturations, animation speed, and audio pitch settings dynamically. Tailored for both hypersensitive and hyposensitive sensory profiles.",
    mascot: "Aayu: The Joyful Sensory Companion",
    mascotDesc: "Aayu is more than a helper; he's a rhythmic, comforting buddy who celebrates every high-five and guides your child with warm encouragement.",
    tracking: "Clinical Transparency",
    trackingDesc: " HIPAA-compliant telemetry dashboards instantly shared with pediatricians, therapists, and school counselors. Continuous progress tracking with zero friction.",
    toggleLang: "தமிழ்",
    howItWorks: "Your Child's Growth Plan",
    step1: "Gentle Sensory Mapping",
    step1Desc: "A non-invasive, low-stimulus gameplay session to map your child's unique emotional and sensory boundaries.",
    step2: "Tailored Play Pathway",
    step2Desc: "We automatically construct a personalized learning level based on their initial interaction telemetry parameters.",
    step3: "Evidence-Based Growth",
    step3Desc: "Gamified, evidence-backed clinical exercises designed to nurture real-world daily vocabulary, motor skills, and turn-taking choices."
  },
  ta: {
    brand: "ஆரா",
    heroTitle: "ஆட்டிசம் கொண்ட குழந்தைகளின் திறன்களை ஒளிரச் செய்வோம்",
    heroSub: "ஆரா என்பது ஒரு நவீன ஊடாடும் சிகிச்சை தளமாகும். உங்கள் குழந்தை தகவல் தொடர்பு கொள்ளவும், உணர்ச்சி சமநிலையை அடையவும், மருத்துவ நிபுணத்துவத்தை சென்சரி-சேஃப் விளையாட்டுகளுடன் ஆரா இணைக்கிறது.",
    getStarted: "சிகிச்சை பயணத்தை தொடங்கு",
    login: "பெற்றோர் தளம்",
    features: "நாங்கள் உங்களுக்கு எப்படி ஆதரவளையும் செய்கிறோம்",
    about: "ஆயுவை சந்திக்க",
    contact: "தொடர்பு",
    whyChoose: "குடும்பங்கள் ஏன் ஆராவை நம்புகின்றன",
    bilingual: "ஆறுதல் தரும் மொழி",
    bilingualDesc: "தமிழ் மற்றும் ஆங்கிலத்தில் முழுமையான ஆதரவு. உங்கள் குழந்தை வீட்டில் பேசும் மொழியிலேயே உயர்தர சிகிச்சையினை வழங்குகிறோம்.",
    levels: "சென்சரி-சேஃப் AI",
    levelsDesc: "எங்கள் நவீன AI தொழில்நுட்பம் உங்கள் குழந்தையின் சென்சரி நிலைக்கு ஏற்ப ஒளிரும் தன்மை, நிறங்கள் மற்றும் ஒலியின் அளவை மாற்றியமைக்கிறது.",
    mascot: "ஆயு: புரிந்து கொள்ளும் ஒரு நண்பன்",
    mascotDesc: "ஆயு வெறும் ஒரு சின்னம் அல்ல; அவர் ஒவ்வொரு வெற்றியையும் கொண்டாடும் மற்றும் அமைதியான வழிகாட்டுதலை வழங்கும் ஒரு அன்பான நண்பர்.",
    tracking: "நிம்மதியான மருத்துவ கண்காணிப்பு",
    trackingDesc: "உங்கள் குழந்தையின் முன்னேற்றத்தை நிபுணர்களுடன் நேரடியாக ஒத்திசைக்கவும். தெளிவான மற்றும் செயல்படக்கூடிய மருத்துவத் தரவு.",
    toggleLang: "English",
    howItWorks: "முன்னேற்றத்திற்கான பாதை",
    step1: "மென்மையான மதிப்பீடு",
    step1Desc: "உங்கள் குழந்தையின் தனித்துவமான சென்சரி மற்றும் உணர்ச்சி உலகத்தைப் புரிந்துகொள்ள ஒரு மதிப்பீடு.",
    step2: "தனிப்பயனாக்கப்பட்ட வரைபடம்",
    step2Desc: "உங்கள் குழந்தையின் தற்போதைய திறன்களை மதிக்கும் வகையில் வடிவமைக்கப்பட்ட சிகிச்சை நிலை.",
    step3: "வலுவான வளர்ச்சி",
    step3Desc: "விளையாட்டு மூலம் நிஜ உலக தகவல் தொடர்புத் திறன்களை வளர்க்கும் சென்சரி கேம்களில் ஈடுபடுங்கள்."
  }
}

const HERO_IMAGE = "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=2070";
const MASCOT_IMAGE = "https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?auto=format&fit=crop&q=80&w=2070";

function LandingPage() {
  const navigate = useNavigate();
  const [lang, setLang] = useState('en')
  const [scrolled, setScrolled] = useState(false)
  const t = translations[lang]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleLanguage = () => setLang(prev => prev === 'en' ? 'ta' : 'en')

  return (
    <div className="playground-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#F8FAFC' }}>
      <div className="mesh-bg"></div>
      
      {styleTag}

      {/* Navbar */}
      <nav className="nav-glass" style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        padding: scrolled ? '12px 40px' : '24px 40px', 
        zIndex: 1000, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        borderBottom: scrolled ? '1px solid rgba(226, 232, 240, 0.8)' : 'none',
        boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.02)' : 'none'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)', padding: '8px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(124, 58, 237, 0.2)' }}>
            <Heart color="white" fill="white" size={22} />
          </div>
          <span style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--slate-900)', letterSpacing: '-1px' }}>{t.brand}</span>
        </div>

        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <button onClick={toggleLanguage} className="btn-pop bento-card" style={{ padding: '8px 18px', fontWeight: 800, color: 'var(--slate-600)', display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid #E2E8F0', borderRadius: '100px', background: 'white' }}>
            <Globe size={16} /> {t.toggleLang}
          </button>
          <Link to="/login" style={{ textDecoration: 'none', color: 'var(--slate-700)', fontWeight: 800, fontSize: '0.95rem' }} className="hover-slate-900">{t.login}</Link>
          <Link to="/login" className="btn-neon" style={{ padding: '10px 24px', fontSize: '0.95rem', borderRadius: '100px' }}>GET STARTED</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ paddingTop: '180px', paddingBottom: '100px', paddingLeft: '40px', paddingRight: '40px' }}>
        <div className="hero-grid" style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.25fr 0.95fr', gap: '64px', alignItems: 'center' }}>
          
          {/* Left Column: Hero Text Content */}
          <div className="hero-left animate-slide-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(99, 102, 241, 0.08)', color: '#4F46E5', border: '1px solid rgba(99, 102, 241, 0.15)', padding: '8px 20px', borderRadius: '100px', fontWeight: 800, fontSize: '0.85rem', marginBottom: '28px' }}>
              <ShieldCheck size={16} fill="#4F46E5" color="white" /> 
              <span>PEDIATRICIAN TRUSTED • CLINICALLY PROVEN</span>
            </div>
            
            <h1 style={{ fontSize: '4.2rem', fontWeight: 900, lineHeight: 1.1, color: 'var(--slate-900)', marginBottom: '24px', letterSpacing: '-2px' }}>
              {t.heroTitle}
            </h1>
            
            <p style={{ fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--slate-500)', fontWeight: 650, marginBottom: '40px', maxWidth: '720px' }}>
              {t.heroSub}
            </p>
            
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
              <Link to="/login" className="btn-neon" style={{ padding: '16px 40px', fontSize: '1.1rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>{t.getStarted}</span> 
                <ArrowRight size={20} />
              </Link>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                 <div style={{ display: 'flex', paddingLeft: '10px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '3px solid white', marginLeft: '-10px', background: 'linear-gradient(135deg, #EC4899, #7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 900, color: 'white' }}>JD</div>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '3px solid white', marginLeft: '-10px', background: 'linear-gradient(135deg, #10B981, #3B82F6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 900, color: 'white' }}>AM</div>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '3px solid white', marginLeft: '-10px', background: 'linear-gradient(135deg, #F59E0B, #EF4444)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 900, color: 'white' }}>SK</div>
                 </div>
                 <span style={{ fontWeight: 800, color: 'var(--slate-400)', fontSize: '0.95rem' }}>Trusted by <span style={{ color: 'var(--slate-900)' }}>12,000+</span> Families</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Custom Vector Illustration (Img 1) */}
          <div className="hero-right animate-slide-up" style={{ position: 'relative', width: '100%', height: '440px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             
             {/* Backdrop Bubble */}
             <div className="hero-right-circle" style={{ 
                width: '380px', 
                height: '380px', 
                background: 'linear-gradient(135deg, #FFE4E6 0%, #FAF5FF 50%, #EEF2FF 100%)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                position: 'relative',
                boxShadow: '0 30px 60px rgba(124, 58, 237, 0.08)',
                border: '8px solid white'
             }}>
                
                {/* SVG Stick Characters communicating */}
                <svg className="hero-right-svg" width="280" height="240" viewBox="0 0 280 240" style={{ overflow: 'visible' }}>
                   {/* Dotted path of communication */}
                   <path d="M 90 110 Q 140 130 190 110" fill="none" stroke="#8B5CF6" strokeWidth="3" strokeDasharray="6 6" />
                   
                   {/* Left child icon */}
                   <g transform="translate(60, 90)">
                      <circle cx="0" cy="0" r="14" fill="#A78BFA" />
                      <path d="M -10 18 L 10 18 L 14 44 L -14 44 Z" fill="#A78BFA" />
                      {/* Speech prompt red sign */}
                      <path d="M 12 -4 L 20 -4 L 20 4 L 14 4 L 10 8 Z" fill="#EF4444" />
                   </g>
                   
                   {/* Right helper icon */}
                   <g transform="translate(220, 90)">
                      <circle cx="0" cy="0" r="16" fill="#8B5CF6" />
                      <path d="M -12 20 L 12 20 L 16 50 L -16 50 Z" fill="#8B5CF6" />
                   </g>

                   {/* Underneath smile line */}
                   <path d="M 60 170 Q 140 210 220 170" fill="none" stroke="#F472B6" strokeWidth="6" strokeLinecap="round" />
                </svg>

                {/* Sparkling gold stars */}
                <div style={{ position: 'absolute', top: '15%', right: '15%', color: '#F59E0B' }}><Star size={24} fill="#F59E0B" color="#F59E0B" /></div>
                <div style={{ position: 'absolute', bottom: '25%', left: '10%', color: '#F59E0B' }}><Star size={18} fill="#F59E0B" color="#F59E0B" /></div>
                <div style={{ position: 'absolute', bottom: '20%', right: '20%', color: '#F59E0B' }}><Star size={20} fill="#F59E0B" color="#F59E0B" /></div>
             </div>

             {/* Floating Badge 1: Top Right */}
             <div className="bento-card btn-pop" style={{ 
                position: 'absolute', 
                top: '10px', 
                right: '10px', 
                padding: '16px 20px', 
                background: 'white', 
                borderRadius: '20px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
                border: '1.5px solid #F1F5F9'
             }}>
                <div style={{ background: '#FCE7F3', color: '#DB2777', padding: '8px', borderRadius: '10px' }}><Heart size={18} fill="#DB2777" color="#DB2777" /></div>
                <div>
                   <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--slate-400)', textTransform: 'uppercase' }}>Community</div>
                   <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#0F172A' }}>2,500+ Members</div>
                </div>
             </div>

             {/* Floating Badge 2: Bottom Left */}
             <div className="bento-card btn-pop" style={{ 
                position: 'absolute', 
                bottom: '10px', 
                left: '10px', 
                padding: '16px 20px', 
                background: 'white', 
                borderRadius: '20px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
                border: '1.5px solid #F1F5F9'
             }}>
                <div style={{ background: '#E0F2FE', color: '#0284C7', padding: '8px', borderRadius: '10px' }}><GraduationCap size={18} color="#0284C7" /></div>
                <div>
                   <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--slate-400)', textTransform: 'uppercase' }}>Resources</div>
                   <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#0F172A' }}>500+ Guides</div>
                </div>
             </div>

          </div>

        </div>
      </section>

      {/* Trust & Collaboration (Clinical Partners) */}
      <section style={{ padding: '60px 40px', background: 'white', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
         <div style={{ maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontWeight: 800, color: 'var(--slate-400)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', marginBottom: '28px' }}>
              Academic & Clinical Partners
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap' }}>
               {[
                 { name: 'Apollo Rural Health', icon: ShieldCheck, color: '#10B981', bg: '#ECFDF5' },
                 { name: 'TN Govt Health Dept', icon: Award, color: '#F59E0B', bg: '#FEF3C7' },
                 { name: 'NIMHANS Research', icon: GraduationCap, color: '#3B82F6', bg: '#EFF6FF' },
                 { name: 'ChildCare International', icon: Building, color: '#8B5CF6', bg: '#F5F3FF' }
               ].map((partner, idx) => (
                 <div 
                   key={idx} 
                   style={{ 
                     display: 'flex', 
                     alignItems: 'center', 
                     gap: '10px', 
                     padding: '10px 24px', 
                     borderRadius: '100px', 
                     background: partner.bg,
                     border: `1.5px solid ${partner.color}20`,
                     fontSize: '1rem', 
                     fontWeight: 800, 
                     color: 'var(--slate-800)',
                     boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                   }}
                 >
                   <partner.icon size={18} color={partner.color} />
                   <span>{partner.name}</span>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Understanding Autism Section */}
      <section style={{ padding: '100px 40px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
         <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 1.05fr', gap: '64px', alignItems: 'center' }}>
           {/* Left side text */}
           <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <span style={{ color: 'var(--p-600)', fontSize: '0.9rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} color="var(--p-500)" /> Clinical Education
              </span>
              <h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#0F172A', letterSpacing: '-1.5px', margin: 0, lineHeight: 1.15 }}>
                 Understanding Autism
              </h2>
              <p style={{ fontSize: '1.25rem', lineHeight: '1.6', color: 'var(--slate-500)', fontWeight: 650, margin: 0 }}>
                 Watch this educational video created by professionals to understand autism, awareness, and how we can support individuals with care and respect.
              </p>
              <div style={{ borderLeft: '4px solid var(--p-500)', paddingLeft: '20px', margin: '10px 0' }}>
                 <p style={{ fontStyle: 'italic', fontSize: '1.15rem', color: 'var(--slate-500)', fontWeight: 800, margin: 0, lineHeight: 1.5 }}>
                    "Awareness leads to acceptance. Acceptance leads to inclusion."
                 </p>
              </div>
           </div>
           {/* Right side player container */}
           <div>
              <div className="bento-card" style={{ padding: 0, overflow: 'hidden', borderRadius: '32px', boxShadow: '0 30px 60px rgba(139, 92, 246, 0.12)', border: 'none', background: '#0F172A' }}>
                 <iframe 
                   width="100%" 
                   height="360" 
                   src="https://www.youtube.com/embed/dB0JP4wuUn0?rel=0&modestbranding=1" 
                   title="Understanding Autism Video" 
                   frameBorder="0" 
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                   allowFullScreen
                   style={{ display: 'block', border: 'none' }}
                 ></iframe>
              </div>
           </div>
         </div>
      </section>

      {/* Key Features 3x2 Grid Section */}
      <section style={{ padding: '120px 40px', background: 'linear-gradient(to bottom, #F5F3FF 0%, #FFF 100%)', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#0F172A', marginBottom: '16px', letterSpacing: '-1.5px', marginTop: 0 }}>
              Key Features
            </h2>
            <p style={{ fontSize: '1.25rem', color: 'var(--slate-500)', fontWeight: 650, margin: '0 auto', maxWidth: '800px', lineHeight: 1.5 }}>
              Digital tools designed to support learning, communication, and daily development for individuals on the autism spectrum.
            </p>
          </div>

          <div className="bento-grid-features" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
            {[
              { title: 'Emotion Understanding', icon: Heart, iconColor: '#EC4899', iconBg: '#FCE7F3', desc: 'Helps identify and understand emotions using simple visual tools and guidance.', glow: 'glow-card-pink' },
              { title: 'Progress Tracker', icon: Activity, iconColor: '#8B5CF6', iconBg: '#F5F3FF', desc: 'Track daily improvements in behavior, learning, and communication skills.', glow: 'glow-card-purple' },
              { title: 'Communication Support', icon: Globe, iconColor: '#3B82F6', iconBg: '#EFF6FF', desc: 'Interactive tools to improve speech, expression, and social communication.', glow: 'glow-card-purple' },
              { title: 'Traditional Games', icon: Play, iconColor: '#10B981', iconBg: '#ECFDF5', desc: 'Simple games that improve focus, memory, and engagement in a fun way.', glow: 'glow-card-mint' },
              { title: 'Schemes & Opportunities', icon: Award, iconColor: '#F59E0B', iconBg: '#FEF3C7', desc: 'Information about government schemes, benefits, and support programs.', glow: 'glow-card-mint' },
              { title: 'Behavior Tracking', icon: Zap, iconColor: '#6366F1', iconBg: '#EEF2FF', desc: 'Monitor behavior patterns to better understand needs and improvements.', glow: 'glow-card-pink' }
            ].map((feat, idx) => (
              <div 
                key={idx} 
                className={`bento-card ${feat.glow} btn-pop`} 
                style={{ 
                  padding: '40px', 
                  background: 'white', 
                  border: '1.5px solid #F1F5F9', 
                  borderRadius: '24px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '20px',
                  boxShadow: '0 10px 30px rgba(139, 92, 246, 0.02)'
                }}
              >
                <div style={{ color: feat.iconColor, width: '60px', height: '60px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: feat.iconBg }}>
                  <feat.icon size={26} fill={feat.iconColor === '#EC4899' ? feat.iconColor : 'none'} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '8px', color: '#0F172A', marginTop: 0 }}>
                    {feat.title}
                  </h3>
                  <p style={{ color: 'var(--slate-500)', lineHeight: 1.6, fontWeight: 650, fontSize: '1.05rem', margin: 0 }}>
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Your Child's Growth Plan timeline workflow */}
      <section style={{ padding: '160px 40px', background: '#0F172A', borderRadius: '80px 80px 0 0', color: 'white', position: 'relative' }}>
         <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '80px', alignItems: 'center' }}>
               
               {/* Left steps list with dynamic connecting timeline path */}
               <div className="animate-slide-up" style={{ position: 'relative' }}>
                  <h2 style={{ fontSize: '3.6rem', fontWeight: 900, marginBottom: '60px', letterSpacing: '-2px', color: 'white', marginTop: 0 }}>
                    {t.howItWorks}
                  </h2>
                  
                  {/* Visual timeline connector line */}
                  <div style={{ 
                    position: 'absolute', 
                    left: '36px', 
                    top: '110px', 
                    bottom: '50px', 
                    width: '4px', 
                    background: 'linear-gradient(to bottom, #8B5CF6 0%, #38BDF8 50%, #10B981 100%)', 
                    opacity: 0.15, 
                    zIndex: 1 
                  }}></div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '60px', position: 'relative' }}>
                     {[
                       { step: '01', title: t.step1, desc: t.step1Desc, color: '#8B5CF6' },
                       { step: '02', title: t.step2, desc: t.step2Desc, color: '#38BDF8' },
                       { step: '03', title: t.step3, desc: t.step3Desc, color: '#10B981' }
                     ].map(s => (
                       <div key={s.step} style={{ display: 'flex', gap: '36px', alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
                          
                          {/* Timeline Gem Badge */}
                          <div style={{ 
                            flexShrink: 0, 
                            width: '76px', 
                            height: '76px', 
                            background: 'rgba(15, 23, 42, 0.95)', 
                            border: `3px solid ${s.color}`, 
                            borderRadius: '50%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            fontSize: '1.8rem', 
                            fontWeight: 900, 
                            color: s.color,
                            boxShadow: `0 0 20px -5px ${s.color}`
                          }}>{s.step}</div>
                          
                          <div style={{ paddingTop: '6px' }}>
                             <h4 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '10px', letterSpacing: '-0.5px', color: 'white', margin: 0 }}>{s.title}</h4>
                             <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.6)', fontWeight: 600, lineHeight: 1.6, maxWidth: '580px', margin: 0 }}>{s.desc}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
               
               {/* Right visual Mascot & Frosted Doctor Quote */}
               <div className="animate-slide-up" style={{ position: 'relative' }}>
                  <div className="bento-card" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)', border: '1px solid rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(30px)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 40px 100px', borderRadius: '48px', position: 'relative', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.2)' }}>
                     {/* Ambient circular highlights inside the card */}
                     <div style={{ position: 'absolute', top: '-20%', right: '-20%', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', filter: 'blur(30px)' }}></div>
                     
                     <img 
                       src={MASCOT_IMAGE} 
                       alt="Aayu Mascot" 
                       style={{ 
                         width: '100%', 
                         height: '240px', 
                         objectFit: 'cover', 
                         borderRadius: '28px', 
                         filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))',
                         border: '4px solid rgba(255,255,255,0.25)',
                         display: 'block'
                       }} 
                     />
                  </div>
                  
                  {/* Premium Frosted Speech Bubble */}
                  <div className="bento-card" style={{ 
                    position: 'absolute', 
                    bottom: '-40px', 
                    left: '-20px', 
                    right: '20px', 
                    padding: '36px', 
                    background: 'rgba(255, 255, 255, 0.95)', 
                    backdropFilter: 'blur(20px)',
                    color: 'var(--slate-900)', 
                    borderRadius: '32px', 
                    boxShadow: '0 40px 80px rgba(0,0,0,0.18)', 
                    border: '1px solid rgba(255, 255, 255, 0.8)' 
                  }}>
                     {/* Golden Stars Rating Block */}
                     <div style={{ display: 'flex', gap: '4px', marginBottom: '16px', color: '#FBBF24' }}>
                       {[...Array(5)].map((_, idx) => (
                         <Star key={idx} fill="#FBBF24" color="#FBBF24" size={16} />
                       ))}
                     </div>

                     <Quote size={32} color="#8B5CF6" fill="#8B5CF6" style={{ position: 'absolute', top: '36px', right: '36px', opacity: 0.12 }} />
                     
                     <p style={{ fontWeight: 800, fontSize: '1.25rem', fontStyle: 'italic', lineHeight: 1.5, margin: 0, color: '#1E293B', paddingRight: '20px' }}>
                       "AURA has transformed our daily routine. My son finally looks forward to active cognitive learning."
                     </p>
                     
                     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginTop: '20px' }}>
                       <span style={{ color: '#475569', fontWeight: 800, fontSize: '0.95rem' }}>— Dr. Priya Raman</span>
                       <span style={{ background: '#ECFDF5', color: '#059669', padding: '4px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 900, border: '1px solid rgba(16, 185, 129, 0.15)' }}>
                         🩺 VERIFIED EXPERT
                       </span>
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#0F172A', color: 'white', padding: '120px 40px 48px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
         <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1.5fr', gap: '80px', marginBottom: '80px' }}>
               <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                    <div style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', padding: '8px', borderRadius: '10px' }}><Heart color="white" fill="white" size={20} /></div>
                    <span style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-1px' }}>AURA</span>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 600, lineHeight: 1.6, fontSize: '1.05rem', margin: 0 }}>
                    Bringing world-class adaptive sensory therapy to every rural home in India. Designed with love and clinical precision.
                  </p>
               </div>
               <div>
                  <h4 style={{ fontWeight: 800, marginBottom: '24px', fontSize: '1.15rem', color: 'white', marginTop: 0 }}>Platform</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'rgba(255,255,255,0.5)', fontWeight: 800, fontSize: '0.95rem' }}>
                    <span>Learning Hub</span>
                    <span>Game Center</span>
                    <span>AI Adaptive</span>
                    <span>Parent Portal</span>
                  </div>
               </div>
               <div>
                  <h4 style={{ fontWeight: 800, marginBottom: '24px', fontSize: '1.15rem', color: 'white', marginTop: 0 }}>Company</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'rgba(255,255,255,0.5)', fontWeight: 800, fontSize: '0.95rem' }}>
                    <span>About Aayu</span>
                    <span>Clinical Team</span>
                    <span>Rural Outreach</span>
                    <span>Privacy HQ</span>
                  </div>
               </div>
               <div>
                  <h4 style={{ fontWeight: 800, marginBottom: '24px', fontSize: '1.15rem', color: 'white', marginTop: 0 }}>HQ Connect</h4>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 600, marginBottom: '24px', fontSize: '0.95rem', marginTop: 0 }}>Join the ecosystem for therapy insights.</p>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    {[Mail, Phone, Share2].map((Ico, i) => (
                      <div key={i} className="btn-pop" style={{ width: '48px', height: '48px', background: 'rgba(255,255,255,0.05)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <Ico size={20} />
                      </div>
                    ))}
                  </div>
               </div>
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '40px', display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.3)', fontWeight: 800, fontSize: '0.95rem', flexWrap: 'wrap', gap: '20px' }}>
               <span>© 2026 AURA Care Ecosystem. All rights reserved.</span>
               <div style={{ display: 'flex', gap: '32px' }}>
                  <span>Security</span>
                  <span>Terms</span>
                  <span>Ethics</span>
               </div>
            </div>
         </div>
      </footer>
    </div>
  )
}

const styleTag = (
  <style>{`
    .btn-pop { transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); cursor: pointer; border: none; }
    .btn-pop:hover { transform: translateY(-4px) scale(1.02); }
    .btn-pop:active { transform: scale(0.96); }
    
    .nav-glass { background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(25px); transition: all 0.4s ease; }
    .hover-slate-900:hover { color: var(--slate-900) !important; }
    
    .glow-card-purple:hover {
      border-color: #8B5CF6 !important;
      box-shadow: 0 20px 40px rgba(139, 92, 246, 0.1) !important;
    }
    
    .glow-card-mint:hover {
      border-color: #10B981 !important;
      box-shadow: 0 20px 40px rgba(16, 185, 129, 0.1) !important;
    }
    
    .glow-card-pink:hover {
      border-color: #F472B6 !important;
      box-shadow: 0 20px 40px rgba(244, 114, 182, 0.1) !important;
    }

    @media (max-width: 1024px) {
      .hero-grid {
        grid-template-columns: 1fr !important;
        gap: 48px !important;
        text-align: center !important;
        padding-top: 130px !important;
      }
      .hero-left {
        align-items: center !important;
        text-align: center !important;
      }
      .hero-left h1 {
        font-size: 3rem !important;
      }
      .hero-right {
        height: auto !important;
        margin-top: 20px !important;
      }
      .hero-right-circle {
        width: 300px !important;
        height: 300px !important;
      }
      .hero-right-svg {
        width: 220px !important;
        height: 180px !important;
      }
      .bento-grid-features {
        grid-template-columns: 1fr !important;
      }
    }
  `}</style>
);

export default LandingPage
