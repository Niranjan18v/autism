import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Sparkles, Heart, Star, Shield, Play, Globe, 
  ArrowRight, CheckCircle2, Layout, Zap, Users, Activity,
  Quote, Mail, Phone, Share2, ChevronRight, ZapOff
} from 'lucide-react'

const translations = {
  en: {
    brand: "Autishta",
    heroTitle: "Turning Daily Challenges into Small Victories",
    heroSub: "Navigating autism shouldn't feel like a solo journey. Autishta combines neuro-clinical expertise with sensory-safe play to help your child bridge communication gaps and grow at their own perfect pace.",
    getStarted: "START YOUR JOURNEY",
    login: "PARENT PORTAL",
    features: "How We Support You",
    about: "Meet Aayu",
    contact: "Contact Us",
    whyChoose: "Designed for Neuro-Diverse Hearts",
    bilingual: "Language of Comfort",
    bilingualDesc: "Full support in Tamil and English. We believe quality therapy should speak the language your child hears at home.",
    levels: "Sensory-Safe AI",
    levelsDesc: "Our AI gently adapts to your child's sensory threshold, ensuring they are challenged but never overwhelmed.",
    mascot: "Aayu: A Companion Who Understands",
    mascotDesc: "Aayu isn't just a mascot; he's a sensory-friendly friend who celebrates every high-five and provides calm, rhythmic guidance.",
    tracking: "Clinical Peace of Mind",
    trackingDesc: "Directly sync your child's progress with specialists. No more guesswork—just clear, actionable clinical data.",
    toggleLang: "தமிழ்",
    howItWorks: "The Path to Progress",
    step1: "Gentle Discovery",
    step1Desc: "A low-stimulation assessment to understand your child's unique sensory and emotional world.",
    step2: "Personalized Roadmap",
    step2Desc: "We map your child to a tailored therapeutic level that respects their current abilities.",
    step3: "Empowered Growth",
    step3Desc: "Engage in evidence-based sensory games that build real-world communication skills through play."
  },
  ta: {
    brand: "ஆட்டிஷ்டா",
    heroTitle: "தினசரி சவால்களை சிறிய வெற்றிகளாக மாற்றுவோம்",
    heroSub: "ஆட்டிசம் என்பது ஒரு தனிமையான பயணமாக இருக்க வேண்டியதில்லை. உங்கள் குழந்தை தகவல் தொடர்பு இடைவெளிகளைக் குறைக்கவும், அவர்களின் சொந்த வேகத்தில் வளரவும் மருத்துவ நிபுணத்துவத்தை சென்சரி-சேஃப் விளையாட்டுடன் ஆட்டிஷ்டா இணைக்கிறது.",
    getStarted: "பயணத்தைத் தொடங்கு",
    login: "பெற்றோர் தளம்",
    features: "நாங்கள் உங்களுக்கு எப்படி ஆதரவளிக்கிறோம்",
    about: "ஆயுவை சந்திக்க",
    contact: "தொடர்பு",
    whyChoose: "தனித்துவமான குழந்தைகளுக்காக வடிவமைக்கப்பட்டது",
    bilingual: "ஆறுதல் தரும் மொழி",
    bilingualDesc: "தமிழ் மற்றும் ஆங்கிலத்தில் முழு ஆதரவு. தரமான சிகிச்சை உங்கள் குழந்தை வீட்டில் கேட்கும் மொழியில் இருக்க வேண்டும் என்று நாங்கள் நம்புகிறோம்.",
    levels: "சென்சரி-சேஃப் AI",
    levelsDesc: "எங்கள் AI உங்கள் குழந்தையின் சென்சரி நிலைக்கு ஏற்ப மெதுவாக மாறுகிறது, அவர்கள் சோர்வடையாமல் இருப்பதை உறுதி செய்கிறது.",
    mascot: "ஆயு: புரிந்து கொள்ளும் ஒரு நண்பன்",
    mascotDesc: "ஆயு வெறும் ஒரு சின்னம் அல்ல; அவர் ஒவ்வொரு வெற்றியையும் கொண்டாடும் மற்றும் அமைதியான வழிகாட்டுதலை வழங்கும் ஒரு நண்பர்.",
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
    <div className="playground-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="mesh-bg"></div>
      
      <style>{`
        .btn-pop { transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); cursor: pointer; border: none; }
        .btn-pop:hover { transform: translateY(-6px) scale(1.03); }
        .btn-pop:active { transform: scale(0.95); }
        .nav-glass { background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(25px); transition: all 0.4s ease; }
        .hero-img-mask { mask-image: linear-gradient(to bottom, black 80%, transparent); }
      `}</style>

      {/* Navbar */}
      <nav className="nav-glass" style={{ position: 'fixed', top: 0, left: 0, right: 0, padding: scrolled ? '16px 64px' : '32px 64px', zIndex: 1000, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: scrolled ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: 'var(--p-500)', padding: '10px', borderRadius: '15px' }}><Heart color="white" fill="white" size={28} /></div>
          <span style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--slate-900)', letterSpacing: '-1.5px' }}>{t.brand}</span>
        </div>

        <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
          <button onClick={toggleLanguage} className="btn-pop bento-card" style={{ padding: '10px 24px', fontWeight: 800, color: 'var(--slate-600)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Globe size={20} /> {t.toggleLang}
          </button>
          <Link to="/login" style={{ textDecoration: 'none', color: 'var(--slate-900)', fontWeight: 800, fontSize: '1.2rem' }}>{t.login}</Link>
          <Link to="/login" className="btn-neon" style={{ padding: '14px 40px', fontSize: '1.1rem' }}>GET STARTED</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ paddingTop: '220px', paddingBottom: '120px', paddingLeft: '64px', paddingRight: '64px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '80px', alignItems: 'center' }}>
          <div className="animate-slide-up">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: 'var(--p-100)', color: 'var(--p-500)', padding: '12px 24px', borderRadius: '100px', fontWeight: 800, fontSize: '1rem', marginBottom: '40px' }}>
              <Shield size={20} fill="var(--p-500)" /> PEDIATRICIAN TRUSTED • CLINICALLY PROVEN
            </div>
            <h1 style={{ fontSize: '5.5rem', fontWeight: 800, lineHeight: 1, color: 'var(--slate-900)', marginBottom: '32px', letterSpacing: '-3px' }}>
              {t.heroTitle}
            </h1>
            <p style={{ fontSize: '1.6rem', lineHeight: 1.5, color: 'var(--slate-600)', fontWeight: 600, marginBottom: '64px', maxWidth: '700px' }}>
              {t.heroSub}
            </p>
            <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
              <Link to="/login" className="btn-neon" style={{ padding: '24px 64px', fontSize: '1.4rem' }}>
                {t.getStarted} <ArrowRight size={24} />
              </Link>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                 <div style={{ display: 'flex' }}>
                    {[1,2,3].map(i => <div key={i} style={{ width: '50px', height: '50px', borderRadius: '50%', border: '4px solid white', marginLeft: '-15px', background: 'var(--slate-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 800 }}>U{i}</div>)}
                 </div>
                 <span style={{ fontWeight: 800, color: 'var(--slate-400)', fontSize: '1.1rem' }}>Trusted by <span style={{ color: 'var(--slate-900)' }}>12,000+</span> Families</span>
              </div>
            </div>
          </div>
          
          <div style={{ position: 'relative' }} className="animate-slide-up">
             <div className="bento-card hero-img-mask" style={{ padding: 0, overflow: 'hidden', borderRadius: '60px', boxShadow: '0 60px 100px rgba(139, 92, 246, 0.2)' }}>
                <img src={HERO_IMAGE} alt="Autishta" style={{ width: '100%', height: 'auto', display: 'block' }} />
             </div>
          </div>
        </div>
      </section>

      {/* Trust & Collaboration */}
      <section style={{ padding: '80px 64px', background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(20px)' }}>
         <div style={{ maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontWeight: 800, color: 'var(--slate-400)', textTransform: 'uppercase', letterSpacing: '4px', fontSize: '1rem', marginBottom: '64px' }}>Academic & Clinical Partners</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '100px', opacity: 0.6, flexWrap: 'wrap' }}>
               {['Apollo Rural', 'TN Govt Health', 'NIMHANS', 'ChildCare Inst.'].map(l => (
                 <div key={l} style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '1.8rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                   <Layout size={40} /> {l}
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Core Features */}
      <section style={{ padding: '160px 64px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '100px' }}>
            <h2 style={{ fontSize: '4.5rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '24px', letterSpacing: '-2px' }}>{t.whyChoose}</h2>
            <p style={{ fontSize: '1.8rem', color: 'var(--slate-600)', fontWeight: 600 }}>Masterfully built to support neuro-diverse learning paths.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '48px' }}>
            <div className="bento-card btn-pop" style={{ padding: '60px', background: 'white' }}>
              <div style={{ background: 'var(--p-100)', width: '80px', height: '80px', borderRadius: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}>
                <Globe size={40} color="var(--p-500)" />
              </div>
              <h3 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '16px' }}>{t.bilingual}</h3>
              <p style={{ color: 'var(--slate-600)', lineHeight: 1.6, fontWeight: 600, fontSize: '1.2rem' }}>{t.bilingualDesc}</p>
            </div>
            <div className="bento-card btn-pop" style={{ padding: '60px', background: 'white' }}>
              <div style={{ background: 'var(--s-100)', width: '80px', height: '80px', borderRadius: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}>
                <Activity size={40} color="var(--s-500)" />
              </div>
              <h3 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '16px' }}>{t.levels}</h3>
              <p style={{ color: 'var(--slate-600)', lineHeight: 1.6, fontWeight: 600, fontSize: '1.2rem' }}>{t.levelsDesc}</p>
            </div>
            <div className="bento-card btn-pop" style={{ padding: '60px', background: 'white' }}>
              <div style={{ background: '#FEE2E2', width: '80px', height: '80px', borderRadius: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}>
                <Users size={40} color="#EF4444" />
              </div>
              <h3 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '16px' }}>{t.tracking}</h3>
              <p style={{ color: 'var(--slate-600)', lineHeight: 1.6, fontWeight: 600, fontSize: '1.2rem' }}>{t.trackingDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section style={{ padding: '220px 64px', background: 'var(--slate-900)', borderRadius: '120px 120px 0 0', color: 'white' }}>
         <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '120px', alignItems: 'center' }}>
               <div className="animate-slide-up">
                  <h2 style={{ fontSize: '5rem', fontWeight: 900, marginBottom: '80px', letterSpacing: '-3px' }}>{t.howItWorks}</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
                     {[
                       { step: '01', title: t.step1, desc: t.step1Desc },
                       { step: '02', title: t.step2, desc: t.step2Desc },
                       { step: '03', title: t.step3, desc: t.step3Desc }
                     ].map(s => (
                       <div key={s.step} style={{ display: 'flex', gap: '48px', alignItems: 'flex-start' }}>
                          <div style={{ flexShrink: 0, width: '90px', height: '90px', background: 'rgba(255,255,255,0.08)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.4rem', fontWeight: 900, color: 'var(--p-400)', border: '2px solid rgba(255,255,255,0.05)' }}>{s.step}</div>
                          <div style={{ paddingTop: '8px' }}>
                             <h4 style={{ fontSize: '2.6rem', fontWeight: 900, marginBottom: '14px', letterSpacing: '-1px' }}>{s.title}</h4>
                             <p style={{ fontSize: '1.4rem', color: 'rgba(255,255,255,0.6)', fontWeight: 600, lineHeight: 1.6, maxWidth: '600px' }}>{s.desc}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
               
               <div className="animate-slide-up" style={{ position: 'relative' }}>
                  <div className="bento-card" style={{ background: 'var(--s-500)', display: 'flex', justifyContent: 'center', padding: '100px 40px', borderRadius: '60px', border: 'none' }}>
                     <img src={MASCOT_IMAGE} alt="Aayu Mascot" style={{ width: '100%', height: 'auto', maxWidth: '350px', filter: 'drop-shadow(0 40px 60px rgba(0,0,0,0.2))' }} />
                  </div>
                  <div className="bento-card" style={{ position: 'absolute', bottom: '-40px', left: '-40px', right: '40px', padding: '48px', background: 'white', color: 'var(--slate-900)', borderRadius: '40px', boxShadow: '0 40px 80px rgba(0,0,0,0.2)', border: 'none' }}>
                     <Quote size={48} color="var(--p-500)" fill="var(--p-500)" style={{ marginBottom: '24px', opacity: 0.15 }} />
                     <p style={{ fontWeight: 800, fontSize: '1.6rem', fontStyle: 'italic', lineHeight: 1.5, margin: 0 }}>"Autishta has transformed our daily routine. My son finally looks forward to learning."</p>
                     <p style={{ color: 'var(--slate-400)', fontWeight: 800, marginTop: '24px', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px' }}>— Dr. Priya Raman, Child Psychologist</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer style={{ background: 'var(--slate-900)', color: 'white', padding: '120px 64px 64px' }}>
         <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1.5fr', gap: '100px', marginBottom: '100px' }}>
               <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                    <div style={{ background: 'var(--p-500)', padding: '10px', borderRadius: '15px' }}><Heart color="white" fill="white" size={24} /></div>
                    <span style={{ fontSize: '2.4rem', fontWeight: 900, letterSpacing: '-1.5px' }}>Autishta</span>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 600, lineHeight: 1.6, fontSize: '1.2rem' }}>Bringing world-class clinical sensory therapy to every rural home in India. Designed with love and high-fidelity precision.</p>
               </div>
               <div>
                  <h4 style={{ fontWeight: 800, marginBottom: '32px', fontSize: '1.4rem' }}>Platform</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: 'rgba(255,255,255,0.5)', fontWeight: 800, fontSize: '1.1rem' }}>
                    <span>Learning Hub</span>
                    <span>Game Center</span>
                    <span>AI Adaptive</span>
                    <span>Parent Portal</span>
                  </div>
               </div>
               <div>
                  <h4 style={{ fontWeight: 800, marginBottom: '32px', fontSize: '1.4rem' }}>Company</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: 'rgba(255,255,255,0.5)', fontWeight: 800, fontSize: '1.1rem' }}>
                    <span>About Aayu</span>
                    <span>Clinical Team</span>
                    <span>Rural Outreach</span>
                    <span>Privacy HQ</span>
                  </div>
               </div>
               <div>
                  <h4 style={{ fontWeight: 800, marginBottom: '32px', fontSize: '1.4rem' }}>HQ Connect</h4>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 600, marginBottom: '32px', fontSize: '1.1rem' }}>Join the ecosystem for therapy insights.</p>
                  <div style={{ display: 'flex', gap: '20px' }}>
                    {[Mail, Phone, Share2].map((Ico, i) => (
                      <div key={i} className="btn-pop" style={{ width: '60px', height: '60px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Ico size={24} />
                      </div>
                    ))}
                  </div>
               </div>
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '48px', display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.3)', fontWeight: 800 }}>
               <span>© 2026 Autishta Care Ecosystem. All rights reserved.</span>
               <div style={{ display: 'flex', gap: '48px' }}>
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

export default LandingPage
