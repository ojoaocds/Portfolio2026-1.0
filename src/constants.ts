import { 
  Code2, 
  Layout, 
  ShoppingBag, 
  Smartphone, 
  Search, 
  Zap,
  Github,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  ExternalLink,
  Eye,
  MapPin,
  Clock,
  Send
} from 'lucide-react';

export interface Project {
  id: number;
  title: string;
  category: 'Landing Page' | 'E-commerce' | 'Site';
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  imageUrl: string;
  additionalImages: string[];
  link: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatarUrl: string;
}

export interface Specialty {
  title: string;
  icon: any;
  description: string;
}

export const SPECIALTIES: Specialty[] = [
  {
    title: "Landing Pages de Alta Conversão",
    icon: Layout,
    description: "Páginas focadas em transformar visitantes em clientes reais."
  },
  {
    title: "E-commerce Profissional",
    icon: ShoppingBag,
    description: "Lojas virtuais completas, seguras e fáceis de gerenciar."
  },
  {
    title: "Sites Institucionais",
    icon: Code2,
    description: "Presença digital sólida para empresas de todos os tamanhos."
  },
  {
    title: "Design Responsivo",
    icon: Smartphone,
    description: "Experiência perfeita em qualquer dispositivo: celular, tablet ou PC."
  },
  {
    title: "SEO & Performance",
    icon: Search,
    description: "Sites rápidos e otimizados para os motores de busca."
  },
  {
    title: "Otimização de Conversão",
    icon: Zap,
    description: "Análise e melhoria contínua para maximizar seus resultados."
  }
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "EcoStore - Moda Sustentável",
    category: "E-commerce",
    shortDescription: "Loja virtual completa com foco em sustentabilidade e UX minimalista.",
    fullDescription: "Desenvolvimento de uma plataforma de e-commerce robusta para uma marca de moda sustentável. O projeto incluiu integração com meios de pagamento, cálculo de frete em tempo real e um painel administrativo personalizado para gestão de estoque.",
    technologies: ["React", "Node.js", "Tailwind CSS", "Shopify API"],
    imageUrl: "https://picsum.photos/seed/project1/800/600",
    additionalImages: [
      "https://picsum.photos/seed/p1-1/800/600",
      "https://picsum.photos/seed/p1-2/800/600"
    ],
    link: "#"
  },
  {
    id: 2,
    title: "SaaS Flow - Landing Page",
    category: "Landing Page",
    shortDescription: "Página de vendas de alta conversão para software de automação.",
    fullDescription: "Criação de uma landing page estratégica para um software SaaS. Foco total em copywriting visual, hierarquia de informações e chamadas para ação (CTAs) claras para maximizar a taxa de conversão de leads.",
    technologies: ["Next.js", "Framer Motion", "Tailwind CSS"],
    imageUrl: "https://picsum.photos/seed/project2/800/600",
    additionalImages: [
      "https://picsum.photos/seed/p2-1/800/600",
      "https://picsum.photos/seed/p2-2/800/600"
    ],
    link: "#"
  },
  {
    id: 3,
    title: "TechConsult - Site Institucional",
    category: "Site",
    shortDescription: "Site corporativo para consultoria de tecnologia e inovação.",
    fullDescription: "Redesign completo da presença digital da TechConsult. O objetivo foi transmitir autoridade e modernidade através de um design limpo, tipografia imponente e animações sutis que guiam o usuário.",
    technologies: ["TypeScript", "React", "Styled Components"],
    imageUrl: "https://picsum.photos/seed/project3/800/600",
    additionalImages: [
      "https://picsum.photos/seed/p3-1/800/600",
      "https://picsum.photos/seed/p3-2/800/600"
    ],
    link: "#"
  },
  {
    id: 4,
    title: "FitLife App - Landing Page",
    category: "Landing Page",
    shortDescription: "Página promocional para lançamento de aplicativo fitness.",
    fullDescription: "Landing page vibrante e energética para o lançamento de um novo app de exercícios. Inclui seções de depoimentos, planos de assinatura e integração com formulário de pré-lançamento.",
    technologies: ["HTML5", "CSS3", "JavaScript", "AOS"],
    imageUrl: "https://picsum.photos/seed/project4/800/600",
    additionalImages: [
      "https://picsum.photos/seed/p4-1/800/600"
    ],
    link: "#"
  },
  {
    id: 5,
    title: "ArtGallery - Portfólio Digital",
    category: "Site",
    shortDescription: "Exposição online para fotógrafo profissional.",
    fullDescription: "Um site minimalista focado na exibição de fotografias em alta resolução. Sistema de galeria dinâmica com carregamento inteligente para garantir performance sem perder qualidade visual.",
    technologies: ["React", "Vite", "Cloudinary"],
    imageUrl: "https://picsum.photos/seed/project5/800/600",
    additionalImages: [
      "https://picsum.photos/seed/p5-1/800/600"
    ],
    link: "#"
  },
  {
    id: 6,
    title: "Gourmet Express - E-commerce",
    category: "E-commerce",
    shortDescription: "Plataforma de delivery e venda de produtos artesanais.",
    fullDescription: "E-commerce especializado em gastronomia. Sistema de pedidos complexo com agendamento de entrega e integração com WhatsApp para confirmação imediata.",
    technologies: ["React", "Firebase", "Tailwind CSS"],
    imageUrl: "https://picsum.photos/seed/project6/800/600",
    additionalImages: [
      "https://picsum.photos/seed/p6-1/800/600"
    ],
    link: "#"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Ricardo Silva",
    role: "CEO",
    company: "EcoModa",
    content: "O João superou todas as nossas expectativas. O e-commerce ficou impecável, rápido e nossas vendas aumentaram 40% no primeiro mês após o lançamento.",
    rating: 5,
    avatarUrl: "https://i.pravatar.cc/150?u=ricardo"
  },
  {
    id: 2,
    name: "Ana Oliveira",
    role: "Marketing Manager",
    company: "SaaS Flow",
    content: "Eu esperava um desenvolvedor. Recebi um parceiro de negócio. Ele questionou minha oferta, sugeriu melhorias no funil e a landing page converteu desde o primeiro dia.",
    rating: 5,
    avatarUrl: "https://i.pravatar.cc/150?u=ana"
  },
  {
    id: 3,
    name: "Marcos Santos",
    role: "Fundador",
    company: "TechConsult",
    content: "Entregou antes do prazo, sem surpresas no preço e ainda apontou melhorias que eu não tinha pensado. É raro encontrar isso.",
    rating: 5,
    avatarUrl: "https://i.pravatar.cc/150?u=marcos"
  }
];

export const JOAO_PHOTOS = [
  "https://picsum.photos/seed/joao-headphones/800/1000",
  "https://picsum.photos/seed/joao-close/800/1000",
  "https://picsum.photos/seed/joao-jiujitsu/800/1000"
];

export const INSTAGRAM_POSTS = [
  "https://picsum.photos/seed/ig1/400/400",
  "https://picsum.photos/seed/ig2/400/400",
  "https://picsum.photos/seed/ig3/400/400",
  "https://picsum.photos/seed/ig4/400/400",
  "https://picsum.photos/seed/ig5/400/400",
  "https://picsum.photos/seed/ig6/400/400"
];
