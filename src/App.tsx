import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  Cpu, 
  GraduationCap, 
  BarChart3, 
  Globe, 
  Users, 
  ChevronRight, 
  Volume2, 
  Play,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
  MessageCircle,
  Facebook,
  Instagram,
  Twitter
} from 'lucide-react';
import { cn } from './lib/utils';
import { generateSpeech } from './services/gemini';

// --- Components ---

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1920",
      title: "Human Resources Excellence",
      desc: "Strategic HR solutions to build high-performance teams."
    },
    {
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1920",
      title: "Strategic Accounting",
      desc: "Precision in finance and accounting for sustainable growth."
    },
    {
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1920",
      title: "Ideal Contrivance",
      desc: "Your partner in IT, HR, and Digital Transformation."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img 
            src={slides[current].image} 
            alt={slides[current].title} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 via-transparent to-transparent" />
          <div className="absolute bottom-12 left-12 right-12">
            <motion.h4 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-serif font-bold text-white mb-2"
            >
              {slides[current].title}
            </motion.h4>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-slate-200 text-lg"
            >
              {slides[current].desc}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>
      
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              current === idx ? "bg-brand-accent w-8" : "bg-white/50"
            )}
          />
        ))}
      </div>
    </div>
  );
};

const SuccessModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white rounded-[2.5rem] p-10 max-w-lg w-full shadow-2xl text-center border border-slate-100"
          >
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mx-auto mb-8">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="text-3xl font-serif font-bold text-slate-900 mb-4">Request Received</h3>
            <div className="space-y-4 text-slate-600">
              <p className="text-lg font-medium text-slate-900">Thank you for Contacting Ideal Contrivance</p>
              <p>We will Review your Enquiry and Call you back within 24 Hours</p>
            </div>
            <button
              onClick={onClose}
              className="mt-10 w-full bg-brand-primary text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg"
            >
              Got it, thanks!
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ApplicationModal = ({ isOpen, onClose, onSuccess }: { isOpen: boolean; onClose: () => void; onSuccess: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    enquiryFor: 'IT Consulting'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://formspree.io/f/xkoqaepl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormData({ name: '', mobile: '', email: '', enquiryFor: 'IT Consulting' });
        onClose();
        onSuccess();
      } else {
        alert('Oops! There was a problem submitting your form. Please try again.');
      }
    } catch (error) {
      console.error('Formspree error:', error);
      alert('Oops! There was a problem submitting your form. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100"
          >
            <div className="p-8 sm:p-12">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-3xl font-serif font-bold text-brand-primary mb-2">Enquiry Form</h3>
                  <p className="text-slate-500 text-sm">Fill in the details below to get started.</p>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all" 
                    placeholder="Your Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Mobile</label>
                  <input 
                    required
                    type="tel" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all" 
                    placeholder="Your Mobile Number"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Email id</label>
                  <input 
                    required
                    type="email" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all" 
                    placeholder="yourname@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Enquiry For</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all"
                    value={formData.enquiryFor}
                    onChange={(e) => setFormData({ ...formData, enquiryFor: e.target.value })}
                  >
                    <option>IT Consulting</option>
                    <option>HR Consulting</option>
                    <option>Advance HRM Training</option>
                    <option>Accounting Tally Training</option>
                    <option>Digital Marketing Training</option>
                    <option>Back Office / Admin Training</option>
                    <option>HR Internship</option>
                    <option>IT Internship</option>
                    <option>Accounting Internship</option>
                    <option>Finance Internship</option>
                  </select>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 mt-4"
                >
                  Submit Enquiry
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Navbar = ({ onGetStarted }: { onGetStarted: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Services', href: '#services' },
    { name: 'Training', href: '#training' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <div className="flex items-center">
            <div className="flex flex-col">
              <span className="text-2xl font-serif font-bold tracking-tight text-brand-primary leading-tight">Ideal Contrivance</span>
              <span className="text-[10px] font-sans font-bold tracking-[0.2em] text-slate-400 uppercase leading-none">HR • IT • GRAPHIC • DIGITAL</span>
            </div>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-brand-accent transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={onGetStarted}
              className="bg-brand-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-600">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-4 text-base font-medium text-slate-600 hover:text-brand-accent hover:bg-slate-50 rounded-lg transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4">
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    onGetStarted();
                  }}
                  className="w-full bg-brand-primary text-white px-6 py-3 rounded-xl font-semibold"
                >
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ServiceCard = ({ icon: Icon, title, description, items, accent = "brand-accent" }: any) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = async () => {
    if (isSpeaking) return;
    setIsSpeaking(true);
    const textToSpeak = `${title}. ${description}. Key features include: ${items.join(', ')}`;
    const audioUrl = await generateSpeech(textToSpeak);
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.onended = () => setIsSpeaking(false);
      audio.play();
    } else {
      setIsSpeaking(false);
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
    >
      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors", `bg-${accent}/10 text-${accent}`)}>
        <Icon size={28} />
      </div>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-2xl font-serif font-bold text-slate-900">{title}</h3>
        <button 
          onClick={handleSpeak}
          disabled={isSpeaking}
          className={cn(
            "p-2 rounded-full transition-all",
            isSpeaking ? "bg-brand-accent text-white animate-pulse" : "bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-brand-accent"
          )}
          title="Listen to description"
        >
          <Volume2 size={18} />
        </button>
      </div>
      <p className="text-slate-600 mb-6 leading-relaxed">
        {description}
      </p>
      <ul className="space-y-3">
        {items.map((item: string, idx: number) => (
          <li key={idx} className="flex items-center gap-3 text-sm text-slate-700">
            <CheckCircle2 size={16} className="text-brand-accent shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <button className="mt-8 flex items-center gap-2 text-sm font-bold text-brand-primary group-hover:text-brand-accent transition-colors">
        Learn More <ChevronRight size={16} />
      </button>
    </motion.div>
  );
};

const TrainingCard = ({ title, category, duration, level, image }: any) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden group hover:shadow-2xl transition-all duration-500">
      <div className="aspect-video overflow-hidden relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-brand-primary">
            {category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h4 className="text-xl font-serif font-bold text-slate-900 mb-4 group-hover:text-brand-accent transition-colors">
          {title}
        </h4>
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-1">
            <Play size={12} className="text-brand-accent" />
            {duration}
          </div>
          <div className="px-2 py-0.5 bg-slate-100 rounded text-slate-600">
            {level}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-brand-accent/30">
      <Navbar onGetStarted={() => setIsModalOpen(true)} />
      
      <ApplicationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={() => setIsSuccessModalOpen(true)}
      />

      <SuccessModal 
        isOpen={isSuccessModalOpen} 
        onClose={() => setIsSuccessModalOpen(false)} 
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#0f172a_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/10 text-brand-accent text-sm font-bold mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
                </span>
                Trusted by 500+ Global Enterprises
              </div>
              <h1 className="text-5xl lg:text-7xl font-serif font-bold text-brand-primary leading-[1.1] mb-8">
                Empowering <span className="italic text-brand-accent">Excellence</span> in IT & HR Consulting
              </h1>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
                We bridge the gap between technology and talent. Ideal Contrivance provides world-class IT solutions and strategic HR consulting to drive your business forward.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#services"
                  className="bg-brand-primary text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 inline-block"
                >
                  Explore Services
                </a>
                <a 
                  href="#training"
                  className="bg-white text-brand-primary border border-slate-200 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all inline-block"
                >
                  Our Training Programs
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-[500px] lg:h-[600px]"
            >
              <HeroSlider />
              
              {/* Floating Stats */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 hidden sm:block"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                    <BarChart3 size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">98%</div>
                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Success Rate</div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 hidden sm:block"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
                    <Users size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">15k+</div>
                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Trained Professionals</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Consulting Services */}
      <section id="services" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-sm font-bold text-brand-accent uppercase tracking-[0.2em] mb-4">Our Expertise</h2>
            <h3 className="text-4xl lg:text-5xl font-serif font-bold text-brand-primary mb-6">Strategic Consulting Solutions</h3>
            <p className="text-lg text-slate-600">
              We provide tailored consulting services designed to solve complex business challenges and drive sustainable growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <ServiceCard 
              icon={Cpu}
              title="IT Consulting Services"
              description="Transform your digital landscape with our cutting-edge IT strategies and implementation services."
              items={[
                "Digital Marketing Strategy",
                "Website Development",
                "E-Commerce Website",
                "Enterprise Software Solutions",
                "Digital Setup & Compliance"
              ]}
              accent="brand-accent"
            />
            <ServiceCard 
              icon={Briefcase}
              title="HR Consulting Services"
              description="Optimize your human capital with strategic HR solutions that foster a high-performance culture."
              items={[
                "Talent Acquisition Strategy",
                "Organizational Development",
                "Performance Management Systems",
                "HR Policy & Compliance",
                "Leadership Development"
              ]}
              accent="indigo-500"
            />
          </div>
        </div>
      </section>

      {/* Training Programs */}
      <section id="training" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold text-brand-accent uppercase tracking-[0.2em] mb-4">Training & Development</h2>
              <h3 className="text-4xl lg:text-5xl font-serif font-bold text-brand-primary">Professional Certification Programs</h3>
            </div>
            <button className="inline-flex items-center gap-2 text-brand-primary font-bold hover:text-brand-accent transition-colors">
              View All Courses <ChevronRight size={20} />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <TrainingCard 
              title="Advanced HRM Training"
              category="Human Resources"
              duration="60 Days"
              level="Expert"
              image="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800"
            />
            <TrainingCard 
              title="Strategic Accounting & Finance"
              category="Accounting"
              duration="45 Days"
              level="Intermediate"
              image="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800"
            />
            <TrainingCard 
              title="Digital Marketing Mastery"
              category="Marketing"
              duration="60 Days"
              level="All Levels"
              image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
            />
            <TrainingCard 
              title="Back Office Cum Admin Training"
              category="Administration"
              duration="45 Days"
              level="All Levels"
              image="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      {/* Why Us Section */}
      <section id="about" className="py-24 lg:py-32 bg-brand-primary text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-accent/10 skew-x-12 translate-x-1/4" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-sm font-bold text-brand-accent uppercase tracking-[0.2em] mb-6">Why Ideal Contrivance?</h2>
              <h3 className="text-4xl lg:text-6xl font-serif font-bold mb-10 leading-tight">
                We don't just consult, we <span className="italic text-brand-accent">partner</span> for your success.
              </h3>
              
              <div className="space-y-8">
                {[
                  { icon: Globe, title: "Global Perspective", desc: "Our consultants bring insights from diverse industries across the globe." },
                  { icon: GraduationCap, title: "Expert Educators", desc: "Learn from industry veterans with decades of practical experience." },
                  { icon: Users, title: "Client-Centric Approach", desc: "Your goals are our priority. We tailor every solution to your needs." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                      <item.icon size={24} className="text-brand-accent" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem]">
                <div className="text-center mb-10">
                  <div className="text-5xl font-serif font-bold mb-2 text-brand-accent">20+</div>
                  <div className="text-slate-400 uppercase tracking-widest text-sm">Years of Excellence</div>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">500+</div>
                    <div className="text-xs text-slate-500 uppercase">Clients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">100+</div>
                    <div className="text-xs text-slate-500 uppercase">Experts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">50+</div>
                    <div className="text-xs text-slate-500 uppercase">Awards</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">100%</div>
                    <div className="text-xs text-slate-500 uppercase">Commitment</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Identity Section */}
      <section className="py-24 lg:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[3rem] p-12 lg:p-20 shadow-xl border border-slate-100 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-sm font-bold text-brand-accent uppercase tracking-[0.2em] mb-6">Our Identity</h2>
                <h3 className="text-4xl lg:text-5xl font-serif font-bold text-brand-primary mb-8">Ideal Contrivance</h3>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  At Ideal Contrivance, we believe in the power of strategic alignment. Our identity is built on the pillars of HR, IT, Graphic Design, and Digital Transformation. We are dedicated to providing innovative solutions that empower businesses and individuals to reach their full potential.
                </p>
                <div className="flex flex-wrap gap-4">
                  {['HR Consulting', 'IT Solutions', 'Graphic Design', 'Digital Marketing'].map((tag) => (
                    <span key={tag} className="px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-sm font-bold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-brand-accent/20 rounded-3xl blur-2xl group-hover:bg-brand-accent/30 transition-all" />
                <div className="relative bg-white p-8 rounded-3xl border border-slate-100 shadow-2xl flex items-center justify-center min-h-[300px]">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-brand-primary rounded-3xl flex items-center justify-center text-white font-serif text-6xl font-bold mb-6 mx-auto overflow-hidden shadow-xl">
                      <img 
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400" 
                        alt="Ideal Contrivance Logo" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="text-3xl font-serif font-bold text-brand-primary tracking-tight">IDEAL CONTRIVANCE</div>
                    <div className="text-sm font-bold text-slate-400 mt-2 tracking-[0.3em] uppercase">HR • IT • GRAPHIC • DIGITAL</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
            <div className="grid lg:grid-cols-2">
              <div className="p-12 lg:p-20">
                <h3 className="text-4xl font-serif font-bold text-brand-primary mb-6">Let's build something great together.</h3>
                <p className="text-slate-600 mb-10">
                  Ready to transform your business or career? Reach out to our team of experts today.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-slate-700">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-brand-accent">
                      <Mail size={20} />
                    </div>
                    <span>idealway2success@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-700">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-brand-accent">
                      <Phone size={20} />
                    </div>
                    <span>9265009622, 9721775242, 7016301443</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-700">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-brand-accent">
                      <MapPin size={20} />
                    </div>
                    <span>801, 8th Floor, Blue Chip Complex, Sayajigunj, Vadodara, 390020, Gujarat</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                    <a 
                      href="https://www.linkedin.com/company/ideal-contrivance/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 text-slate-700 hover:text-brand-accent transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent/10 transition-colors">
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </div>
                      <span className="font-medium">Connect on LinkedIn</span>
                    </a>
                    <a 
                      href="https://www.facebook.com/profile.php?id=61552216473394" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 text-slate-700 hover:text-brand-accent transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent/10 transition-colors">
                        <Facebook size={20} />
                      </div>
                      <span className="font-medium">Follow on Facebook</span>
                    </a>
                    <a 
                      href="https://www.instagram.com/ideal_contrivance?igsh=MWV6end1NWZ1MHhleQ%3D%3D&utm_source=qr" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 text-slate-700 hover:text-brand-accent transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent/10 transition-colors">
                        <Instagram size={20} />
                      </div>
                      <span className="font-medium">Follow on Instagram</span>
                    </a>
                    <a 
                      href="https://x.com/Ideal_HR" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 text-slate-700 hover:text-brand-accent transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent/10 transition-colors">
                        <Twitter size={20} />
                      </div>
                      <span className="font-medium">Follow on X (Twitter)</span>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-50 p-12 lg:p-20">
                <form 
                  className="space-y-6"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const formData = {
                      name: (form.elements.namedItem('name') as HTMLInputElement).value,
                      email: (form.elements.namedItem('email') as HTMLInputElement).value,
                      service: (form.elements.namedItem('service') as HTMLSelectElement).value,
                      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
                    };

                    try {
                      const response = await fetch('https://formspree.io/f/xkoqaepl', {
                        method: 'POST',
                        headers: { 
                          'Content-Type': 'application/json',
                          'Accept': 'application/json'
                        },
                        body: JSON.stringify(formData),
                      });
                      
                      if (response.ok) {
                        setIsSuccessModalOpen(true);
                        form.reset();
                      } else {
                        alert('Oops! There was a problem submitting your form. Please try again.');
                      }
                    } catch (error) {
                      console.error('Formspree error:', error);
                      alert('Oops! There was a problem submitting your form. Please try again.');
                    }
                  }}
                >
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Full Name</label>
                      <input name="name" required type="text" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Email Address</label>
                      <input name="email" required type="email" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Service Interested In</label>
                    <select name="service" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all">
                      <option>IT Consulting</option>
                      <option>HR Consulting</option>
                      <option>Advance HRM Training</option>
                      <option>Accounting Tally Training</option>
                      <option>Digital Marketing Training</option>
                      <option>Back Office / Admin Training</option>
                      <option>HR Internship</option>
                      <option>IT Internship</option>
                      <option>Accounting Internship</option>
                      <option>Finance Internship</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Message</label>
                    <textarea name="message" required rows={4} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all" placeholder="How can we help you?"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8 md:gap-12 mb-16">
            <div>
              <h4 className="font-bold text-slate-900 mb-6">Services</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href="#" className="hover:text-brand-accent transition-colors">IT Strategy</a></li>
                <li><a href="#" className="hover:text-brand-accent transition-colors">HR Solutions</a></li>
                <li><a href="#" className="hover:text-brand-accent transition-colors">Digital Transformation</a></li>
                <li><a href="#" className="hover:text-brand-accent transition-colors">Talent Management</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 mb-6">Training</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href="#" className="hover:text-brand-accent transition-colors">HRM Certification</a></li>
                <li><a href="#" className="hover:text-brand-accent transition-colors">Accounting Pro</a></li>
                <li><a href="#" className="hover:text-brand-accent transition-colors">Digital Marketing</a></li>
                <li><a href="#" className="hover:text-brand-accent transition-colors">Back Office Cum Admin Training</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6">Internship</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href="#" className="hover:text-brand-accent transition-colors">HR Internship</a></li>
                <li><a href="#" className="hover:text-brand-accent transition-colors">IT Internship</a></li>
                <li><a href="#" className="hover:text-brand-accent transition-colors">Accounting Internship</a></li>
                <li><a href="#" className="hover:text-brand-accent transition-colors">Finance Internship</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-xs">
              © 2018 Ideal Contrivance. All rights reserved.
            </p>
            <div className="flex gap-6">
              {[
                { name: 'Twitter', url: 'https://x.com/Ideal_HR' },
                { name: 'LinkedIn', url: 'https://www.linkedin.com/company/ideal-contrivance/' },
                { name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61552216473394' },
                { name: 'Instagram', url: 'https://www.instagram.com/ideal_contrivance?igsh=MWV6end1NWZ1MHhleQ%3D%3D&utm_source=qr' }
              ].map(social => (
                <a 
                  key={social.name} 
                  href={social.url} 
                  target={social.url !== '#' ? "_blank" : undefined}
                  rel={social.url !== '#' ? "noopener noreferrer" : undefined}
                  className="text-slate-400 hover:text-brand-accent text-xs font-medium transition-colors"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919265009622"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={28} className="fill-current" />
        <span className="absolute right-full mr-4 bg-white text-slate-900 px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-slate-100 pointer-events-none">
          Chat with us
        </span>
      </a>
    </div>
  );
}
