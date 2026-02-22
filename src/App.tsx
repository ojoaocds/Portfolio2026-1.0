/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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

  // Theme colors
  const bgColor = isDark ? 'bg-[#0a0a0a]' : 'bg-white';
  const secondaryBgColor = isDark ? 'bg-[#111827]' : 'bg-[#F8F9FA]';
  const textColor = isDark ? 'text-white' : 'text-[#1a1a1a]';
  const secondaryTextColor = isDark ? 'text-gray-400' : 'text-gray-600';
  const borderColor = isDark ? 'border-gray-800' : 'border-gray-200';
  const accentColor = 'text-blue-600';
  const accentBg = 'bg-blue-600';

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
        alert('Mensagem enviada com sucesso! João entrará em contato em breve.');
        form.reset();
      } else {
        const errorData = await response.json();
        alert(`Erro: ${errorData.error || 'Falha ao enviar mensagem.'}`);
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      alert('Erro de conexão. Tente novamente mais tarde.');
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
    <div className={`min-h-screen transition-colors duration-500 ${bgColor} ${textColor} font-sans selection:bg-blue-200 selection:text-blue-900`}>
      
      {/* HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-50 border-b ${borderColor} backdrop-blur-md ${isDark ? 'bg-black/80' : 'bg-white/80'} transition-all`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-10 h-10 ${accentBg} rounded-lg flex items-center justify-center text-white font-bold text-xl`}>J</div>
            <span className="text-xl font-bold tracking-tight hidden sm:block">João Cardoso</span>
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
            <a 
              href="#contato"
              className={`hidden sm:flex items-center gap-2 px-5 py-2.5 ${accentBg} hover:bg-blue-700 text-white rounded-full text-sm font-semibold transition-all shadow-lg shadow-blue-500/20`}
            >
              Iniciar Projeto
            </a>
            
            <button 
              onClick={toggleTheme}
              className={`p-2.5 rounded-full border ${borderColor} hover:bg-gray-100 dark:hover:bg-gray-800 transition-all`}
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-blue-600" />}
            </button>

            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
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
                  className="text-lg font-medium py-2 border-b border-transparent hover:border-blue-600 transition-all"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contato"
                onClick={() => setIsMenuOpen(false)}
                className={`w-full py-4 ${accentBg} text-white rounded-xl font-bold mt-4 text-center`}
              >
                Iniciar Projeto
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="pt-20">
        
        {/* HERO SECTION */}
        <section id="sobre" className="py-16 lg:py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className={`inline-block px-4 py-1.5 rounded-full ${isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-600'} text-sm font-bold mb-6`}>
                  Freelancer Full-Stack
                </span>
                <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
                  João Cardoso
                </h1>
                <p className="text-xl lg:text-2xl font-medium text-blue-600 mb-8">
                  Especialista em sites que convertem!
                </p>
                <div className={`space-y-4 ${secondaryTextColor} text-lg mb-10`}>
                  <p>
                    Já ajudei negócios a crescerem online com sites que realmente trabalham — atraindo clientes, passando credibilidade e fechando vendas no automático.
                  </p>
                  <p>
                    Não entrego só código bonito. Entrego resultado: mais contatos, mais vendas, mais autoridade para o seu negócio.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-10">
                  {SPECIALTIES.slice(0, 4).map((spec, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isDark ? 'bg-blue-900/20' : 'bg-blue-50'} text-blue-600`}>
                        <spec.icon size={20} />
                      </div>
                      <span className="font-semibold text-sm">{spec.title}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <a href="#projetos" className={`px-8 py-4 ${accentBg} hover:bg-blue-700 text-white rounded-xl font-bold transition-all flex items-center gap-2 shadow-xl shadow-blue-500/20`}>
                    Ver Meus Projetos <ChevronRight size={20} />
                  </a>
                  <a href="#contato" className={`px-8 py-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl font-bold transition-all`}>
                    Entrar em Contato
                  </a>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                {/* Main Photo Display */}
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl group cursor-pointer" onClick={() => setSelectedPhoto(JOAO_PHOTOS[currentPhotoIndex])}>
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
                </div>

                {/* Carousel Controls */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                  <button onClick={prevPhoto} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all">
                    <ChevronLeft size={24} />
                  </button>
                  <div className="flex gap-2">
                    {JOAO_PHOTOS.map((_, i) => (
                      <button 
                        key={i} 
                        onClick={() => setCurrentPhotoIndex(i)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${currentPhotoIndex === i ? 'bg-blue-600 w-6' : 'bg-gray-300 dark:bg-gray-600'}`}
                      />
                    ))}
                  </div>
                  <button onClick={nextPhoto} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all">
                    <ChevronRight size={24} />
                  </button>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl -z-10" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl -z-10" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projetos" className={`py-24 ${secondaryBgColor}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl lg:text-5xl font-bold mb-4"
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
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {['Todos', 'Landing Page', 'E-commerce', 'Site'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                    activeFilter === filter 
                      ? `${accentBg} text-white shadow-lg shadow-blue-500/30` 
                      : `${isDark ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-600'} border ${borderColor} hover:border-blue-600`
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Project Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className={`group relative ${isDark ? 'bg-gray-900' : 'bg-white'} rounded-3xl overflow-hidden border ${borderColor} hover:shadow-2xl transition-all duration-500`}
                  >
                    <div className="aspect-video overflow-hidden relative">
                      <img 
                        src={project.imageUrl} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-blue-600/90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-6 text-center">
                        <h3 className="text-white text-2xl font-bold mb-2">{project.title}</h3>
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
                            className="w-12 h-12 bg-white text-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                          >
                            <Eye size={20} />
                          </button>
                          <a 
                            href={project.link}
                            className="w-12 h-12 bg-white text-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                          >
                            <ExternalLink size={20} />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{project.category}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">{project.title}</h3>
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
                <h2 className="text-4xl lg:text-5xl font-bold mb-4">O Que Meus Clientes Dizem</h2>
                <p className={`text-xl ${secondaryTextColor}`}>
                  A satisfação de quem já confiou no meu trabalho é o meu maior cartão de visitas.
                </p>
              </div>
              <div className="flex gap-4">
                <div className={`p-4 rounded-2xl border ${borderColor} flex items-center gap-3`}>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <span className="font-bold">5.0 / 5.0</span>
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
                  className={`p-8 rounded-3xl ${secondaryBgColor} border ${borderColor} relative group hover:shadow-xl transition-all`}
                >
                  <Quote className="absolute top-8 right-8 text-blue-600/10 group-hover:text-blue-600/20 transition-colors" size={60} />
                  <div className="flex text-yellow-400 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <p className={`text-lg italic mb-8 relative z-10 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-4">
                    <img 
                      src={testimonial.avatarUrl} 
                      alt={testimonial.name} 
                      className="w-14 h-14 rounded-full object-cover border-2 border-blue-600"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className={`text-xs ${secondaryTextColor}`}>{testimonial.role} - {testimonial.company}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contato" className={`py-24 ${secondaryBgColor}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">Vamos Trabalhar Juntos?</h2>
                <p className={`text-xl ${secondaryTextColor} mb-12`}>
                  Me conta o seu projeto hoje. Em até 24h você recebe um retorno com ideias e próximos passos, sem compromisso.
                </p>

                <div className="space-y-8">
                  <div className="flex items-start gap-6">
                    <div className={`w-14 h-14 rounded-2xl ${accentBg} flex items-center justify-center text-white shadow-lg shadow-blue-500/20`}>
                      <Mail size={28} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">E-mail</h4>
                      <p className={secondaryTextColor}>joaopedrocardosods@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6">
                    <div className={`w-14 h-14 rounded-2xl ${accentBg} flex items-center justify-center text-white shadow-lg shadow-blue-500/20`}>
                      <Phone size={28} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">WhatsApp</h4>
                      <p className={secondaryTextColor}>+55 (37) 99821-1490</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6">
                    <div className={`w-14 h-14 rounded-2xl ${accentBg} flex items-center justify-center text-white shadow-lg shadow-blue-500/20`}>
                      <MapPin size={28} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Localização</h4>
                      <p className={secondaryTextColor}>São Paulo, SP - Brasil</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6">
                    <div className={`w-14 h-14 rounded-2xl ${accentBg} flex items-center justify-center text-white shadow-lg shadow-blue-500/20`}>
                      <Clock size={28} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Atendimento</h4>
                      <p className={secondaryTextColor}>Segunda a Sexta, 09h às 18h</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`${bgColor} p-8 lg:p-12 rounded-[40px] border ${borderColor} shadow-2xl`}
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-widest opacity-60">Nome</label>
                      <input 
                        required
                        name="name"
                        type="text" 
                        placeholder="Seu nome"
                        className={`w-full px-6 py-4 rounded-2xl border ${borderColor} ${isDark ? 'bg-gray-800' : 'bg-gray-50'} focus:ring-2 focus:ring-blue-600 outline-none transition-all`}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-widest opacity-60">E-mail</label>
                      <input 
                        required
                        name="email"
                        type="email" 
                        placeholder="seu@email.com"
                        className={`w-full px-6 py-4 rounded-2xl border ${borderColor} ${isDark ? 'bg-gray-800' : 'bg-gray-50'} focus:ring-2 focus:ring-blue-600 outline-none transition-all`}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-widest opacity-60">WhatsApp / Telefone</label>
                      <input 
                        required
                        name="phone"
                        type="tel" 
                        placeholder="(00) 00000-0000"
                        className={`w-full px-6 py-4 rounded-2xl border ${borderColor} ${isDark ? 'bg-gray-800' : 'bg-gray-50'} focus:ring-2 focus:ring-blue-600 outline-none transition-all`}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-widest opacity-60">Instagram</label>
                      <input 
                        name="instagram"
                        type="text" 
                        placeholder="@seuusuario"
                        className={`w-full px-6 py-4 rounded-2xl border ${borderColor} ${isDark ? 'bg-gray-800' : 'bg-gray-50'} focus:ring-2 focus:ring-blue-600 outline-none transition-all`}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-widest opacity-60">Tipo de Projeto</label>
                    <select 
                      name="projectType"
                      className={`w-full px-6 py-4 rounded-2xl border ${borderColor} ${isDark ? 'bg-gray-800' : 'bg-gray-50'} focus:ring-2 focus:ring-blue-600 outline-none transition-all appearance-none`}
                    >
                      <option>Landing Page</option>
                      <option>E-commerce</option>
                      <option>Site Institucional</option>
                      <option>Outro</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-widest opacity-60">Mensagem</label>
                    <textarea 
                      required
                      name="message"
                      rows={5}
                      placeholder="Conte-me um pouco sobre seu projeto..."
                      className={`w-full px-6 py-4 rounded-2xl border ${borderColor} ${isDark ? 'bg-gray-800' : 'bg-gray-50'} focus:ring-2 focus:ring-blue-600 outline-none transition-all resize-none`}
                    ></textarea>
                  </div>

                  <button 
                    disabled={isSubmitting}
                    className={`w-full py-5 ${accentBg} hover:bg-blue-700 text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20 disabled:opacity-70`}
                  >
                    {isSubmitting ? 'Enviando...' : (
                      <>
                        Quero Iniciar Meu Projeto →
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SOCIAL & INSTAGRAM SECTION */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Conecte-se Comigo</h2>
              <div className="flex justify-center gap-6 mb-16">
                {[
                  { icon: Instagram, href: "https://www.instagram.com/ojoaocds/?hl=pt-br", label: "Instagram" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                  { icon: Github, href: "#", label: "GitHub" },
                  { icon: Mail, href: "mailto:joaopedrocardosods@gmail.com", label: "E-mail" }
                ].map((social, i) => (
                  <a 
                    key={i}
                    href={social.href}
                    className={`w-16 h-16 rounded-2xl border ${borderColor} flex items-center justify-center text-blue-600 hover:${accentBg} hover:text-white hover:scale-110 transition-all duration-300`}
                    aria-label={social.label}
                  >
                    <social.icon size={28} />
                  </a>
                ))}
              </div>

              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold">Últimas do Instagram <span className="text-blue-600">@ojoaocds</span></h3>
                <a href="https://www.instagram.com/ojoaocds/?hl=pt-br" className="text-blue-600 font-bold hover:underline flex items-center gap-2">
                  Seguir no Instagram <ExternalLink size={18} />
                </a>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {INSTAGRAM_POSTS.map((post, i) => (
                  <motion.a
                    key={i}
                    href="https://www.instagram.com/ojoaocds/?hl=pt-br"
                    whileHover={{ scale: 1.05 }}
                    className="aspect-square rounded-2xl overflow-hidden relative group"
                  >
                    <img 
                      src={post} 
                      alt={`Instagram post ${i + 1}`} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-blue-600/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                      <Instagram className="text-white" size={32} />
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className={`${isDark ? 'bg-black' : 'bg-gray-900'} text-white py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className={`w-10 h-10 ${accentBg} rounded-lg flex items-center justify-center text-white font-bold text-xl`}>J</div>
                <span className="text-xl font-bold tracking-tight">João Cardoso</span>
              </div>
              <p className="text-gray-400 max-w-xs">
                Transformando ideias em experiências digitais de alto impacto. Especialista em Landing Pages e E-commerce.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Links Rápidos</h4>
              <ul className="space-y-4 text-gray-400">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="hover:text-blue-400 transition-colors">{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Redes Sociais</h4>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/ojoaocds/?hl=pt-br" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-all"><Instagram size={20} /></a>
                <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-all"><Linkedin size={20} /></a>
                <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-all"><Github size={20} /></a>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} João Cardoso. Todos os direitos reservados.</p>
            <div className="flex items-center gap-2">
              Desenvolvido com <Code2 size={16} className="text-blue-600" /> por João Cardoso
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
              className="absolute top-8 right-8 text-white hover:text-blue-400 transition-colors"
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
                className={`absolute top-6 right-6 z-10 p-3 rounded-full ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} shadow-lg hover:scale-110 transition-transform`}
                onClick={() => setSelectedProject(null)}
              >
                <X size={24} />
              </button>

              <div className="grid lg:grid-cols-2">
                <div className="p-8 lg:p-12">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4 block">{selectedProject.category}</span>
                  <h2 className="text-4xl font-bold mb-6">{selectedProject.title}</h2>
                  <div className="space-y-6 mb-10">
                    <p className={`text-lg ${secondaryTextColor}`}>{selectedProject.fullDescription}</p>
                    <div>
                      <h4 className="font-bold mb-3">Tecnologias Utilizadas:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech, i) => (
                          <span key={i} className={`px-4 py-1.5 rounded-full text-xs font-bold ${isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <a 
                      href={selectedProject.link}
                      className={`px-8 py-4 ${accentBg} text-white rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all`}
                    >
                      Visitar Site <ExternalLink size={20} />
                    </a>
                  </div>
                </div>

                <div className="bg-gray-100 dark:bg-gray-800 p-8 lg:p-12 flex flex-col justify-center">
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
                        className="p-2 bg-white/90 dark:bg-gray-900/90 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-all"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button 
                        onClick={() => setCurrentProjectImageIndex((prev) => (prev + 1) % [selectedProject.imageUrl, ...selectedProject.additionalImages].length)}
                        className="p-2 bg-white/90 dark:bg-gray-900/90 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-all"
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
                          className={`w-2 h-2 rounded-full transition-all ${currentProjectImageIndex === i ? 'bg-blue-600 w-4' : 'bg-white/50'}`}
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
                        className={`aspect-video rounded-xl overflow-hidden border-2 transition-all ${currentProjectImageIndex === i ? 'border-blue-600 scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'}`}
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
