/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll } from 'motion/react';
import { 
  Sun, 
  Moon, 
  Github, 
  Linkedin, 
  Instagram, 
  Mail, 
  Phone, 
  ExternalLink, 
  Eye, 
  X, 
  ChevronLeft, 
  ChevronRight,
  ChevronDown,
  Menu,
  Send,
  MapPin,
  Clock,
  Star,
  Quote,
  Code2
} from 'lucide-react';
import { 
  PROJECTS, 
  TESTIMONIALS, 
  SPECIALTIES, 
  JOAO_PHOTOS, 
  INSTAGRAM_POSTS,
  Project,
  Testimonial
} from './constants';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [currentProjectImageIndex, setCurrentProjectImageIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedProjectType, setSelectedProjectType] = useState('Landing Page');
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Theme colors
  const bgColor = isDark ? 'bg-[#000D1A]' : 'bg-[#001B3D]';
  const secondaryBgColor = isDark ? 'bg-[#001529]' : 'bg-[#002855]';
  const textColor = 'text-white';
  const secondaryTextColor = 'text-gray-300';
  const borderColor = 'border-white/10';
  const accentColor = 'text-[#C5A059]';
  const accentBg = 'bg-[#C5A059]';
  const accentHoverBg = 'hover:bg-[#B38F4D]';

  const toggleTheme = () => setIsDark(!isDark);

  const nextPhoto = () => setCurrentPhotoIndex((prev) => (prev + 1) % JOAO_PHOTOS.length);
  const prevPhoto = () => setCurrentPhotoIndex((prev) => (prev - 1 + JOAO_PHOTOS.length) % JOAO_PHOTOS.length);

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setCurrentProjectImageIndex(0);
  };

  const filteredProjects = activeFilter === 'Todos' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeFilter);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      instagram: formData.get('instagram'),
      projectType: formData.get('projectType'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setFormStatus('success');
        form.reset();
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const navLinks = [
    { name: 'Sobre', href: '#sobre' },
    { name: 'Projetos', href: '#projetos' },
    { name: 'Feedbacks', href: '#feedbacks' },
    { name: 'Contato', href: '#contato' },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${bgColor} ${textColor} font-sans selection:bg-[#C5A059]/30 selection:text-white`}>
      
      {/* SCROLL PROGRESS */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#C5A059] z-[100] origin-left"
        style={{ scaleX: useScroll().scrollXProgress }}
      />
      
      {/* HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-50 border-b ${borderColor} backdrop-blur-md ${isDark ? 'bg-[#000D1A]/80' : 'bg-[#001B3D]/80'} transition-all`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div 
              animate={{ 
                y: [0, -5, 0],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className={`w-10 h-10 ${accentBg} rounded-lg flex items-center justify-center text-white font-cursive text-2xl pt-1 shadow-lg shadow-[#C5A059]/20`}
            >
              JC
            </motion.div>
            <span className="text-xl font-medium tracking-tight hidden sm:block">João Cardoso</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className={`text-sm font-medium hover:${accentColor} transition-colors`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <motion.a 
              href="#contato"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`hidden sm:flex items-center gap-2 px-5 py-2.5 ${accentBg} ${accentHoverBg} text-white rounded-lg text-sm font-semibold transition-all shadow-lg shadow-[#C5A059]/20`}
            >
              Iniciar Projeto
            </motion.a>
            
            <button 
              onClick={toggleTheme}
              className={`p-2.5 rounded-full border ${borderColor} hover:bg-white/5 transition-all`}
              aria-label={isDark ? "Mudar para modo claro" : "Mudar para modo escuro"}
            >
              {isDark ? <Sun size={20} className="text-[#FFD700]" /> : <Moon size={20} className="text-[#C5A059]" />}
            </button>

            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`md:hidden absolute top-20 left-0 right-0 ${bgColor} border-b ${borderColor} p-6 flex flex-col gap-4 shadow-xl`}
            >
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-medium py-2 border-b border-transparent hover:border-[#C5A059] transition-all"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contato"
                onClick={() => setIsMenuOpen(false)}
                className={`w-full py-4 ${accentBg} text-white rounded-lg font-semibold mt-4 text-center`}
              >
                Iniciar Projeto
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="pt-20">
        
        {/* HERO SECTION */}
        <section id="sobre" className="py-16 lg:py-24 overflow-hidden relative">
          <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.2
                    }
                  }
                }}
              >
                <motion.span 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  className={`inline-block px-4 py-1.5 rounded-lg ${isDark ? 'bg-[#C5A059]/20 text-[#C5A059]' : 'bg-[#C5A059]/10 text-[#C5A059]'} text-sm font-semibold mb-6`}
                >
                  Freelancer Full-Stack
                </motion.span>
                <motion.h1 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  className="text-5xl lg:text-7xl font-semibold tracking-tight mb-6 leading-tight"
                >
                  João Cardoso
                </motion.h1>
                <motion.p 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  className="text-xl lg:text-2xl font-medium text-[#C5A059] mb-8"
                >
                  Especialista em sites que convertem!
                </motion.p>
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  className={`space-y-4 ${secondaryTextColor} text-lg mb-10`}
                >
                  <p>
                    Já ajudei negócios a crescerem online com sites que realmente trabalham — atraindo clientes, passando credibilidade e fechando vendas no automático.
                  </p>
                  <p>
                    Não entrego só código bonito. Entrego resultado: mais contatos, mais vendas, mais autoridade para o seu negócio.
                  </p>
                </motion.div>

                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  className="grid sm:grid-cols-2 gap-4 mb-10"
                >
                  {SPECIALTIES.slice(0, 4).map((spec, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3 group cursor-default"
                    >
                      <div className={`p-2 rounded-lg ${isDark ? 'bg-[#C5A059]/10' : 'bg-[#C5A059]/5'} text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-white transition-colors duration-300`}>
                        <spec.icon size={20} />
                      </div>
                      <span className="font-semibold text-sm">{spec.title}</span>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  className="flex flex-wrap gap-4"
                >
                  <a href="#projetos" className={`px-8 py-4 ${accentBg} ${accentHoverBg} text-white rounded-lg font-semibold transition-all flex items-center gap-2 shadow-xl shadow-[#C5A059]/20 hover:-translate-y-1`}>
                    Ver Meus Projetos <ChevronRight size={20} />
                  </a>
                  <a href="#" className={`px-8 py-4 border-2 border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-white rounded-lg font-semibold transition-all hover:-translate-y-1`}>
                    Baixar CV
                  </a>
                  <a href="#contato" className={`px-8 py-4 border-2 border-white/20 text-white hover:bg-white hover:text-[#001B3D] rounded-lg font-semibold transition-all hover:-translate-y-1`}>
                    Entrar em Contato
                  </a>
                </motion.div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative"
              >
                {/* Main Photo Display */}
                <motion.div 
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-2xl group cursor-pointer" onClick={() => setSelectedPhoto(JOAO_PHOTOS[currentPhotoIndex])}
                >
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={currentPhotoIndex}
                      src={JOAO_PHOTOS[currentPhotoIndex]}
                      alt="João Cardoso"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Eye className="text-white" size={48} />
                  </div>
                </motion.div>

                {/* Carousel Controls */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-[#001B3D]/90 backdrop-blur-md p-3 rounded-xl shadow-xl border border-white/10">
                  <button onClick={prevPhoto} className="p-2 hover:bg-white/10 rounded-lg transition-all" aria-label="Foto anterior">
                    <ChevronLeft size={24} />
                  </button>
                  <div className="flex gap-2">
                    {JOAO_PHOTOS.map((_, i) => (
                      <button 
                        key={i} 
                        onClick={() => setCurrentPhotoIndex(i)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${currentPhotoIndex === i ? 'bg-[#C5A059] w-6' : 'bg-white/20'}`}
                        aria-label={`Ir para foto ${i + 1}`}
                      />
                    ))}
                  </div>
                  <button onClick={nextPhoto} className="p-2 hover:bg-white/10 rounded-lg transition-all" aria-label="Próxima foto">
                    <ChevronRight size={24} />
                  </button>
                </div>

                {/* Decorative Elements */}
                <motion.div 
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-10 -right-10 w-40 h-40 bg-[#C5A059]/10 rounded-full blur-3xl -z-10" 
                />
                <motion.div 
                  animate={{ 
                    y: [0, 20, 0],
                    rotate: [0, -5, 0]
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#C5A059]/5 rounded-full blur-3xl -z-10" 
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projetos" className={`py-24 ${secondaryBgColor} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-texture-dots opacity-30" />
          <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#C5A059]/5 to-transparent opacity-50" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#C5A059]/10 blur-[100px] -z-10 rounded-full" />
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl lg:text-5xl font-medium mb-4"
              >
                Projetos que Geraram Resultado
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className={`text-xl ${secondaryTextColor} max-w-2xl mx-auto`}
              >
                Resultados reais de quem apostou em um site feito para vender.
              </motion.p>
            </div>

            {/* Filters */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-3 mb-12"
            >
              {['Todos', 'Landing Page', 'E-commerce', 'Site'].map((filter) => (
                <motion.button
                  key={filter}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                    activeFilter === filter 
                      ? `${accentBg} text-white shadow-lg shadow-[#C5A059]/30` 
                      : `bg-white/5 text-gray-300 border ${borderColor} hover:border-[#C5A059]`
                  }`}
                >
                  {filter}
                </motion.button>
              ))}
            </motion.div>

            {/* Project Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className={`group relative ${isDark ? 'bg-[#001529]' : 'bg-[#002855]'} rounded-xl overflow-hidden border ${borderColor} hover:shadow-2xl hover:shadow-[#C5A059]/10 transition-all duration-500`}
                  >
                    <div className="aspect-video overflow-hidden relative">
                      <img 
                        src={project.imageUrl} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-[#001B3D]/90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-6 text-center">
                        <h3 className="text-white text-2xl font-medium mb-2">{project.title}</h3>
                        <div className="flex flex-wrap justify-center gap-2 mb-6">
                          {project.technologies.slice(0, 3).map((tech, i) => (
                            <span key={i} className="bg-white/20 text-white text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-4">
                          <button 
                            onClick={() => openProjectModal(project)}
                            className="w-12 h-12 bg-white text-[#001B3D] rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                          >
                            <Eye size={20} />
                          </button>
                          <a 
                            href={project.link}
                            className="w-12 h-12 bg-white text-[#001B3D] rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                          >
                            <ExternalLink size={20} />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-xs font-semibold text-[#C5A059] uppercase tracking-widest">{project.category}</span>
                      </div>
                      <h3 className="text-xl font-medium mb-2 group-hover:text-[#C5A059] transition-colors">{project.title}</h3>
                      <p className={`${secondaryTextColor} text-sm line-clamp-2`}>{project.shortDescription}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section id="feedbacks" className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-4xl lg:text-5xl font-medium mb-4">O Que Meus Clientes Dizem</h2>
                <p className={`text-xl ${secondaryTextColor}`}>
                  A satisfação de quem já confiou no meu trabalho é o meu maior cartão de visitas.
                </p>
              </div>
              <div className="flex gap-4">
                <div className={`p-4 rounded-lg border ${borderColor} flex items-center gap-3`}>
                  <div className="flex text-[#FFD700]">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <span className="font-semibold">5.0 / 5.0</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {TESTIMONIALS.map((testimonial, i) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-8 rounded-xl ${secondaryBgColor} border ${borderColor} relative group hover:shadow-xl transition-all`}
                >
                  <Quote className="absolute top-8 right-8 text-[#C5A059]/10 group-hover:text-[#C5A059]/20 transition-colors" size={60} />
                  <div className="flex text-[#FFD700] mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <p className={`text-lg italic mb-8 relative z-10 ${isDark ? 'text-gray-300' : 'text-gray-200'}`}>
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-4">
                    <img 
                      src={testimonial.avatarUrl} 
                      alt={testimonial.name} 
                      className="w-14 h-14 rounded-full object-cover border-2 border-[#C5A059]"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className={`text-xs ${secondaryTextColor}`}>{testimonial.role} - {testimonial.company}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contato" className={`py-24 ${secondaryBgColor} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16">
              
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl lg:text-5xl font-medium mb-6">Vamos Trabalhar Juntos?</h2>
                <p className={`text-xl ${secondaryTextColor} mb-12`}>
                  Me conta o seu projeto hoje. Em até 24h você recebe um retorno com ideias e próximos passos, sem compromisso.
                </p>

                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1
                      }
                    }
                  }}
                  className="space-y-8"
                >
                  <motion.div 
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    className="flex items-start gap-6"
                  >
                    <div className={`w-14 h-14 rounded-lg ${accentBg} flex items-center justify-center text-white shadow-lg shadow-[#C5A059]/20`}>
                      <Mail size={28} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">E-mail</h4>
                      <p className={secondaryTextColor}>joaopedrocardosods@gmail.com</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    className="flex items-start gap-6"
                  >
                    <div className={`w-14 h-14 rounded-lg ${accentBg} flex items-center justify-center text-white shadow-lg shadow-[#C5A059]/20`}>
                      <Phone size={28} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">WhatsApp</h4>
                      <p className={secondaryTextColor}>+55 (37) 99821-1490</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    className="flex items-start gap-6"
                  >
                    <div className={`w-14 h-14 rounded-lg ${accentBg} flex items-center justify-center text-white shadow-lg shadow-[#C5A059]/20`}>
                      <MapPin size={28} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Localização</h4>
                      <p className={secondaryTextColor}>São Paulo, SP - Brasil</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    className="flex items-start gap-6"
                  >
                    <div className={`w-14 h-14 rounded-lg ${accentBg} flex items-center justify-center text-white shadow-lg shadow-[#C5A059]/20`}>
                      <Clock size={28} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Atendimento</h4>
                      <p className={secondaryTextColor}>Segunda a Sexta, 09h às 18h</p>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`${bgColor} p-8 lg:p-12 rounded-2xl border ${borderColor} shadow-2xl`}
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold uppercase tracking-widest opacity-60">Nome</label>
                      <input 
                        required
                        name="name"
                        type="text" 
                        placeholder="Seu nome"
                        className={`w-full px-6 py-4 rounded-lg border ${borderColor} ${isDark ? 'bg-white/5' : 'bg-white/10'} focus:ring-2 focus:ring-[#C5A059] outline-none transition-all`}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold uppercase tracking-widest opacity-60">E-mail</label>
                      <input 
                        required
                        name="email"
                        type="email" 
                        placeholder="seu@email.com"
                        className={`w-full px-6 py-4 rounded-lg border ${borderColor} ${isDark ? 'bg-white/5' : 'bg-white/10'} focus:ring-2 focus:ring-[#C5A059] outline-none transition-all`}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold uppercase tracking-widest opacity-60">WhatsApp / Telefone</label>
                      <input 
                        required
                        name="phone"
                        type="tel" 
                        placeholder="(00) 00000-0000"
                        className={`w-full px-6 py-4 rounded-lg border ${borderColor} ${isDark ? 'bg-white/5' : 'bg-white/10'} focus:ring-2 focus:ring-[#C5A059] outline-none transition-all`}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold uppercase tracking-widest opacity-60">Instagram</label>
                      <input 
                        name="instagram"
                        type="text" 
                        placeholder="@seuusuario"
                        className={`w-full px-6 py-4 rounded-lg border ${borderColor} ${isDark ? 'bg-white/5' : 'bg-white/10'} focus:ring-2 focus:ring-[#C5A059] outline-none transition-all`}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 relative">
                    <label className="text-sm font-semibold uppercase tracking-widest opacity-60">Tipo de Projeto</label>
                    <div className="relative">
                      <button 
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`w-full px-6 py-4 rounded-lg border ${borderColor} ${isDark ? 'bg-white/5' : 'bg-white/10'} focus:ring-2 focus:ring-[#C5A059] outline-none transition-all flex items-center justify-between group`}
                      >
                        <span className={selectedProjectType ? 'text-white' : 'text-gray-400'}>
                          {selectedProjectType || 'Selecione o tipo'}
                        </span>
                        <ChevronDown 
                          size={20} 
                          className={`text-[#C5A059] transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                        />
                      </button>

                      <AnimatePresence>
                        {isDropdownOpen && (
                          <>
                            {/* Backdrop to close dropdown */}
                            <div 
                              className="fixed inset-0 z-10" 
                              onClick={() => setIsDropdownOpen(false)}
                            />
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                              className={`absolute top-full left-0 right-0 mt-2 z-20 ${isDark ? 'bg-[#001529]' : 'bg-[#002855]'} border ${borderColor} rounded-xl shadow-2xl overflow-hidden`}
                            >
                              {['Landing Page', 'E-commerce', 'Site Institucional', 'Outro'].map((option) => (
                                <button
                                  key={option}
                                  type="button"
                                  onClick={() => {
                                    setSelectedProjectType(option);
                                    setIsDropdownOpen(false);
                                  }}
                                  className={`w-full px-6 py-4 text-left hover:bg-[#C5A059] hover:text-white transition-colors flex items-center justify-between group ${selectedProjectType === option ? 'bg-[#C5A059]/10 text-[#C5A059]' : ''}`}
                                >
                                  <span>{option}</span>
                                  {selectedProjectType === option && <div className="w-2 h-2 rounded-full bg-[#C5A059]" />}
                                </button>
                              ))}
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>
                    {/* Hidden input to keep form submission working with FormData */}
                    <input type="hidden" name="projectType" value={selectedProjectType} />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold uppercase tracking-widest opacity-60">Mensagem</label>
                    <textarea 
                      required
                      name="message"
                      rows={5}
                      placeholder="Conte-me um pouco sobre seu projeto..."
                      className={`w-full px-6 py-4 rounded-lg border ${borderColor} ${isDark ? 'bg-white/5' : 'bg-white/10'} focus:ring-2 focus:ring-[#C5A059] outline-none transition-all resize-none`}
                    ></textarea>
                  </div>

                  <motion.button 
                    disabled={isSubmitting || formStatus === 'success'}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-5 ${formStatus === 'success' ? 'bg-emerald-500' : accentBg} ${formStatus === 'success' ? 'hover:bg-emerald-600' : accentHoverBg} text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#C5A059]/20 disabled:opacity-70`}
                  >
                    {isSubmitting ? 'Enviando...' : (
                      formStatus === 'success' ? (
                        <>Mensagem Enviada!</>
                      ) : (
                        <>Quero Iniciar Meu Projeto →</>
                      )
                    )}
                  </motion.button>
                  {formStatus === 'error' && (
                    <p className="text-red-400 text-sm text-center mt-2">Ocorreu um erro ao enviar. Tente novamente.</p>
                  )}
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SOCIAL & INSTAGRAM SECTION */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-medium mb-4">Conecte-se Comigo</h2>
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                className="flex justify-center gap-6 mb-16"
              >
                {[
                  { icon: Instagram, href: "https://www.instagram.com/ojoaocds/?hl=pt-br", label: "Instagram" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/ojoaocds/", label: "LinkedIn" },
                  { icon: Github, href: "https://github.com/ojoaocds", label: "GitHub" },
                  { icon: Mail, href: "mailto:joaopedrocardosods@gmail.com", label: "E-mail" }
                ].map((social, i) => (
                  <motion.a 
                    key={i}
                    href={social.href}
                    variants={{
                      hidden: { opacity: 0, scale: 0.5 },
                      visible: { opacity: 1, scale: 1 }
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-16 h-16 rounded-lg border ${borderColor} flex items-center justify-center text-[#C5A059] hover:${accentBg} hover:text-white transition-all duration-300 shadow-lg hover:shadow-[#C5A059]/20`}
                    aria-label={social.label}
                  >
                    <social.icon size={28} />
                  </motion.a>
                ))}
              </motion.div>

              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-medium">Últimas do Instagram <span className="text-[#C5A059]">@ojoaocds</span></h3>
                <motion.a 
                  href="https://www.instagram.com/ojoaocds/?hl=pt-br" 
                  whileHover={{ x: 5 }}
                  className="text-[#C5A059] font-semibold hover:underline flex items-center gap-2"
                >
                  Seguir no Instagram <ExternalLink size={18} />
                </motion.a>
              </div>

              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.05
                    }
                  }
                }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
              >
                {INSTAGRAM_POSTS.map((post, i) => (
                  <motion.a
                    key={i}
                    href="https://www.instagram.com/ojoaocds/?hl=pt-br"
                    variants={{
                      hidden: { opacity: 0, scale: 0.8 },
                      visible: { opacity: 1, scale: 1 }
                    }}
                    whileHover={{ scale: 1.05, zIndex: 10 }}
                    className="aspect-square rounded-lg overflow-hidden relative group shadow-md"
                  >
                    <img 
                      src={post} 
                      alt={`Instagram post ${i + 1}`} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-[#C5A059]/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                      <Instagram className="text-white" size={32} />
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className={`${isDark ? 'bg-[#000814]' : 'bg-[#000D1A]'} text-white py-16 border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <motion.div 
                  animate={{ 
                    y: [0, -5, 0],
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className={`w-10 h-10 ${accentBg} rounded-lg flex items-center justify-center text-white font-cursive text-2xl pt-1 shadow-lg shadow-[#C5A059]/20`}
                >
                  JC
                </motion.div>
                <span className="text-xl font-medium tracking-tight">João Cardoso</span>
              </div>
              <p className="text-gray-400 max-w-xs">
                Transformando ideias em experiências digitais de alto impacto. Especialista em Landing Pages e E-commerce.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-6">Links Rápidos</h4>
              <ul className="space-y-4 text-gray-400">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <motion.a 
                      href={link.href} 
                      whileHover={{ x: 5, color: '#C5A059' }}
                      className="transition-colors block"
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-6">Redes Sociais</h4>
              <div className="flex gap-4">
                <motion.a 
                  href="https://www.instagram.com/ojoaocds/?hl=pt-br" 
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-[#C5A059] transition-all"
                >
                  <Instagram size={20} />
                </motion.a>
                <motion.a 
                  href="https://www.linkedin.com/in/ojoaocds/" 
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-[#C5A059] transition-all"
                >
                  <Linkedin size={20} />
                </motion.a>
                <motion.a 
                  href="https://github.com/ojoaocds" 
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-[#C5A059] transition-all"
                >
                  <Github size={20} />
                </motion.a>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} João Cardoso. Todos os direitos reservados.</p>
            <div className="flex items-center gap-2">
              Desenvolvido com <Code2 size={16} className="text-[#C5A059]" /> por João Cardoso
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacidade</a>
              <a href="#" className="hover:text-white transition-colors">Termos</a>
            </div>
          </div>
        </div>
      </footer>

      {/* PHOTO MODAL / LIGHTBOX */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <button 
              className="absolute top-8 right-8 text-white hover:text-[#C5A059] transition-colors"
              onClick={() => setSelectedPhoto(null)}
            >
              <X size={40} />
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedPhoto} 
              alt="João Cardoso" 
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* PROJECT MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className={`${bgColor} w-full max-w-5xl rounded-[40px] overflow-hidden shadow-2xl relative`}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className={`absolute top-6 right-6 z-10 p-3 rounded-full ${isDark ? 'bg-white/10 text-white' : 'bg-white/20 text-white'} backdrop-blur-md shadow-lg hover:scale-110 transition-transform`}
                onClick={() => setSelectedProject(null)}
              >
                <X size={24} />
              </button>

              <div className="grid lg:grid-cols-2">
                <div className="p-8 lg:p-12">
                  <span className="text-xs font-semibold text-[#C5A059] uppercase tracking-widest mb-4 block">{selectedProject.category}</span>
                  <h2 className="text-4xl font-medium mb-6">{selectedProject.title}</h2>
                  <div className="space-y-6 mb-10">
                    <p className={`text-lg ${secondaryTextColor}`}>{selectedProject.fullDescription}</p>
                    <div>
                      <h4 className="font-semibold mb-3">Tecnologias Utilizadas:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech, i) => (
                          <span key={i} className={`px-4 py-1.5 rounded-full text-xs font-bold ${isDark ? 'bg-[#C5A059]/20 text-[#C5A059]' : 'bg-[#C5A059]/10 text-[#C5A059]'}`}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <motion.a 
                      href={selectedProject.link}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-8 py-4 ${accentBg} text-white rounded-lg font-semibold flex items-center gap-2 ${accentHoverBg} transition-all`}
                    >
                      Visitar Site <ExternalLink size={20} />
                    </motion.a>
                  </div>
                </div>

                <div className="bg-[#000D1A] p-8 lg:p-12 flex flex-col justify-center">
                  <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg group">
                    <AnimatePresence mode="wait">
                      <motion.img 
                        key={currentProjectImageIndex}
                        src={[selectedProject.imageUrl, ...selectedProject.additionalImages][currentProjectImageIndex]} 
                        alt={`${selectedProject.title} view ${currentProjectImageIndex + 1}`} 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </AnimatePresence>
                    
                    {/* Carousel Controls */}
                    <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => setCurrentProjectImageIndex((prev) => (prev - 1 + [selectedProject.imageUrl, ...selectedProject.additionalImages].length) % [selectedProject.imageUrl, ...selectedProject.additionalImages].length)}
                        className="p-2 bg-[#001B3D]/90 backdrop-blur-md rounded-full shadow-lg hover:bg-[#C5A059] hover:text-white transition-all"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button 
                        onClick={() => setCurrentProjectImageIndex((prev) => (prev + 1) % [selectedProject.imageUrl, ...selectedProject.additionalImages].length)}
                        className="p-2 bg-[#001B3D]/90 backdrop-blur-md rounded-full shadow-lg hover:bg-[#C5A059] hover:text-white transition-all"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </div>

                    {/* Indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {[selectedProject.imageUrl, ...selectedProject.additionalImages].map((_, i) => (
                        <button 
                          key={i}
                          onClick={() => setCurrentProjectImageIndex(i)}
                          className={`w-2 h-2 rounded-full transition-all ${currentProjectImageIndex === i ? 'bg-[#C5A059] w-4' : 'bg-white/50'}`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Thumbnails */}
                  <div className="grid grid-cols-4 gap-4 mt-6">
                    {[selectedProject.imageUrl, ...selectedProject.additionalImages].map((img, i) => (
                      <button 
                        key={i}
                        onClick={() => setCurrentProjectImageIndex(i)}
                        className={`aspect-video rounded-xl overflow-hidden border-2 transition-all ${currentProjectImageIndex === i ? 'border-[#C5A059] scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'}`}
                      >
                        <img src={img} alt="thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
