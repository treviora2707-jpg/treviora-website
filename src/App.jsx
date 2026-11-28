import { Component, Fragment, lazy, Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import CinematicIntro from './components/CinematicIntro'
import {
  getRouteIndex,
  isNavPathActive,
  runSignatureTransitionOut,
  runSignatureTransitionIn,
  playHeroCinematicSequence,
  playSubHeroCinematicSequence,
} from './motion/trevioraMotion'

const CinematicBackdrop3D = lazy(() => import('./components/CinematicBackdrop3D'))
const PartnerLogo3D = lazy(() => import('./components/PartnerLogo3D'))

class WebGLErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}
import {
  fetchPublishedProjects,
  submitContactInquiry,
  uploadProjectImage,
  verifyAdminCredentials,
  adminListProjects,
  adminUpsertProject,
  adminDeleteProject,
  adminListInquiries,
} from './lib/supabase'
import {
  checkRateLimit,
  isValidEmail,
  resetRateLimit,
  sanitizeMultilineText,
  sanitizeText,
  sanitizeUrl,
  validateImageFile,
} from './lib/security'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const EMAIL = 'treviora2707@gmail.com'
const PHONE = '+91 90259 10642'
const PUBLIC_SITE_URL = (import.meta.env.VITE_PUBLIC_SITE_URL || 'https://trevioraindustry.vercel.app').replace(/\/$/, '')
const IS_ADMIN_HOST =
  import.meta.env.VITE_APP_MODE === 'admin' ||
  (typeof window !== 'undefined' && window.location.hostname.toLowerCase().includes('treviora-admin'))

const socialLinks = [
  ['Instagram', 'https://www.instagram.com/trevioraindustry?hvrq=MWIxbGJybmQ1OGoxeQ=='],
  ['LinkedIn', 'https://www.linkedin.com/in/treviora-industry-b5b8a0426?utm_source=share_via&utm_content=profile&utm_medium=member_android'],
  ['YouTube', 'https://www.youtube.com/@TREVIORAINDUSTRY'],
  ['WhatsApp', 'https://whatsapp.com/channel/0029VbEJbK9E50UZcKGl3A2B'],
]

const navItems = [
  ['Home', '/'],
  ['Services', '/services'],
  ['Work', '/work'],
  ['Team', '/team'],
  ['Contact', '/contact'],
]

const services = [
  {
    slug: 'web',
    number: '01',
    icon: 'WEB',
    title: 'Website & Web Application Development',
    description: 'Modern responsive websites, robust single-page web applications & cloud architectures',
    pageTitle: 'Website and Web Application Development',
    subtitle: 'Modern Responsive Websites & Scalable Web Applications',
    image: '/images/service-web-development.webp',
    imageAlt: 'Modern web application development and responsive interface coding',
  },
  {
    slug: 'mobile',
    number: '02',
    icon: 'APP',
    title: 'Android Application Development',
    description: 'High-performance native & cross-platform Android mobile applications',
    pageTitle: 'Android Application Development',
    subtitle: 'Scalable Native & Cross-Platform Android Applications',
    image: '/images/service-mobile-apps.webp',
    imageAlt: 'Android application interface design and mobile engineering',
  },
  {
    slug: 'ai',
    number: '03',
    icon: 'AI',
    title: 'AI/ML Solutions and Automation',
    description: 'Intelligent neural models, machine learning & cognitive process automation',
    pageTitle: 'AI/ML Solutions and Automation',
    subtitle: 'Machine Learning Models & Cognitive Intelligent Automation',
    image: '/images/service-ai.webp',
    imageAlt: 'Neural network architecture and AI model automation',
  },
  {
    slug: 'iot',
    number: '04',
    icon: 'IOT',
    title: 'IoT Solutions',
    description: 'Microcontroller hardware, sensor networks, cloud telemetry & automation',
    pageTitle: 'IoT Solutions',
    subtitle: 'Embedded Hardware & Connected Smart Automation',
    image: '/images/service-iot.webp',
    imageAlt: 'IoT circuit boards, embedded sensors and wireless telemetry',
  },
  {
    slug: 'software',
    number: '05',
    icon: 'DEV',
    title: 'Custom Software Development',
    description: 'Bespoke enterprise software, scalable microservices, backend APIs & database architecture',
    pageTitle: 'Custom Software Development',
    subtitle: 'Bespoke Enterprise Software Systems & Scalable Architecture',
    image: '/images/service-custom-software.webp',
    imageAlt: 'Custom software architecture, code frameworks and enterprise databases',
  },
  {
    slug: 'uiux',
    number: '06',
    icon: 'UI',
    title: 'UI/UX and Digital Solutions',
    description: 'Human-centered UI/UX research, wireframing, modern design systems & interactive prototypes',
    pageTitle: 'UI/UX and Digital Solutions',
    subtitle: 'Modern Product Design Systems & Human-Centered Experiences',
    image: '/images/service-uiux.webp',
    imageAlt: 'UI/UX design wireframes, responsive mobile interfaces and prototyping',
  },
  {
    slug: '3d-design',
    number: '07',
    icon: '3D',
    title: '3D Model Design / 3D Assets',
    description: 'High-fidelity 3D model assets, photorealistic rendering, PBR textures & spatial models',
    pageTitle: '3D Model Design / 3D Assets',
    subtitle: 'High-Fidelity 3D Models, Product Renders & Spatial Assets',
    image: '/images/service-3d-model.webp',
    imageAlt: 'Complex 3D digital model wireframe rendering and computer graphics',
  },
  {
    slug: 'graphics',
    number: '08',
    icon: 'DES',
    title: 'Graphics Design',
    description: 'Creative brand identity systems, typography, vector design, social media assets & visuals',
    pageTitle: 'Graphics Design',
    subtitle: 'Creative Brand Identities & Impactful Digital Visuals',
    image: '/images/service-design.webp',
    imageAlt: 'Vector graphic design, brand identity styling and creative layouts',
  },
]

const heroSlides = [
  {
    image: '/images/hero-collaboration.webp',
    alt: 'Creative team collaborating around laptops',
    tag: 'COLLABORATION',
    title: 'Modern Digital Engineering',
  },
  {
    image: '/images/service-ai.webp',
    alt: 'Abstract visualization of artificial intelligence and digital data',
    tag: 'ARTIFICIAL INTELLIGENCE',
    title: 'Next-Gen Smart Systems',
  },
  {
    image: '/images/about-studio.webp',
    alt: 'Modern creative studio workspace',
    tag: 'INNOVATION LAB',
    title: 'Future-Ready Cloud & Design',
  },
  {
    image: '/images/service-iot.webp',
    alt: 'Close-up of a circuit board and connected technology',
    tag: 'IOT & AUTOMATION',
    title: 'Connected Smart Hardware',
  },
]

const people = [
  {
    slug: 'chairman', route: '/chairman', name: 'THIRUVEL.K', title: 'Founder & Executive Chairman', role: 'Founder • Chairman • Chief Technology Officer', image: '/images/chairman.jpeg', note: "Leads the company's technological vision, innovation strategy and engineering excellence.",
    intro: 'Thiruvel.K is the visionary Founder, Chairman and Chief Technology Officer of TREVIORA. He leads the company with a passion for innovation, technology strategy, and digital transformation. His leadership drives TREVIORA to create world-class technology products that inspire innovation and create meaningful impact in the digital world.',
    stats: [['4+', 'Core Skills'], ['100%', 'Dedication'], ['100%', 'Innovation']],
    aboutTitle: 'About the Chairman',
    paragraphs: [
      { text: 'Thiruvel.K is the Founder, Chairman and Chief Technology Officer of TREVIORA. He is responsible for leading innovation, technology strategy and digital transformation across all company initiatives.' },
      { text: 'His expertise spans App Development, Web Development, AI Model Building, and Graphics Designing. He combines technical excellence with creative vision to build intelligent digital products.', emphasis: ['App Development', 'Web Development', 'AI Model Building', 'Graphics Designing'] },
      { text: 'His vision is to build world-class technology products that inspire innovation, empower businesses, and create meaningful impact in the digital ecosystem. Under his leadership, TREVIORA continues to push boundaries and deliver cutting-edge solutions.' },
    ],
    skills: [
      { name: 'App Development', description: 'Expert in building powerful, secure and user-friendly mobile applications for Android and cross-platform environments. Using modern technologies to ensure high performance, scalability and exceptional user experience.', tags: ['Android', 'Cross-Platform', 'UI/UX'] },
      { name: 'Web Development', description: 'Creating modern, responsive and high-performance websites using the latest web technologies. Delivering secure, scalable and user-friendly digital experiences that help businesses grow and succeed online.', tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive'] },
      { name: 'AI Model Building', description: 'Developing intelligent AI models using Machine Learning, Deep Learning, and Natural Language Processing. Building smart solutions that automate processes, analyze data, and solve real-world problems with advanced analytics.', tags: ['Machine Learning', 'Deep Learning', 'NLP'] },
      { name: 'Graphics Designing', description: 'Creating stunning visual designs including logos, posters, social media creatives, brand identities, and marketing materials. Combining creativity with strategy to build memorable and impactful visual experiences.', tags: ['Logo Design', 'Brand Identity', 'Poster Design'] },
    ],
    proficiency: [['App Development', '95%'], ['Web Development', '98%'], ['AI Model Building', '90%'], ['Graphics Designing', '92%']],
    vision: [
      'As the Founder and Chairman of TREVIORA, Thiruvel.K believes that innovation, collaboration and customer-focused solutions are the foundation of sustainable growth.',
      'His vision is to create intelligent digital products that combine creativity, modern engineering and artificial intelligence to solve real-world challenges. He is committed to building a culture of continuous learning, technical excellence, and creative thinking.',
      'Under his leadership, TREVIORA is transforming ideas into powerful digital experiences that empower businesses, inspire innovation, and shape the future of technology.',
    ],
  },
  {
    slug: 'ceo', route: '/ceo', name: 'PAGOLU SAI REVANTH', title: 'Chief Executive Officer (CEO)', role: 'Executive Leadership', image: '/images/chief-executive-officer.jpeg', note: "Drives the company's business strategy, innovation and digital growth.",
    intro: "Pagolu Sai Revanth serves as the Chief Executive Officer of TREVIORA, driving the company's business strategy, innovation and digital growth. With a passion for technology and creative problem-solving, he leads the team to deliver world-class digital solutions that empower businesses and transform ideas into reality.",
    stats: [['4+', 'Core Skills'], ['100%', 'Commitment'], ['100%', 'Creativity']],
    aboutTitle: 'About the CEO',
    paragraphs: [
      { text: 'Pagolu Sai Revanth is passionate about building modern digital experiences through creativity, technology and strategic leadership. As the CEO, he oversees all business operations, drives innovation, and ensures every project delivers exceptional value.' },
      { text: 'His expertise spans UI/UX Design, Finance Management, Graphics Designing, and Digital Marketing. He combines creative vision with business acumen to build products that are both beautiful and profitable.', emphasis: ['UI/UX Design', 'Finance Management', 'Graphics Designing', 'Digital Marketing'] },
      { text: 'His leadership philosophy emphasizes continuous innovation, collaboration, creative thinking and delivering high-quality technology solutions for clients worldwide. Under his guidance, TREVIORA continues to grow and evolve as a leading technology company.' },
    ],
    skills: [
      { name: 'UI/UX Design', description: 'Expert in creating intuitive, user-centered digital experiences. Designing wireframes, prototypes, and high-fidelity interfaces using Figma and modern design tools. Ensuring every product is visually stunning, easy to use, and accessible to all users.', tags: ['Figma', 'Wireframing', 'Prototyping', 'User Research'] },
      { name: 'Finance Management', description: "Skilled in financial planning, budgeting, cost analysis, and resource allocation. Ensuring the company's financial health through strategic investment, revenue optimization, and risk management. Driving sustainable growth and profitability.", tags: ['Budgeting', 'Financial Planning', 'Cost Analysis', 'Revenue Strategy'] },
      { name: 'Graphics Designing', description: 'Creating visually compelling designs that capture attention and communicate effectively. Designing logos, brand identities, marketing materials, and digital assets that strengthen brand presence and drive engagement across all platforms.', tags: ['Logo Design', 'Brand Identity', 'Social Media', 'Marketing Materials'] },
      { name: 'Digital Marketing', description: 'Expert in creating and executing effective digital marketing strategies. Managing social media campaigns, SEO optimization, content marketing, and paid advertising to increase brand visibility, drive traffic, and generate leads.', tags: ['SEO', 'Social Media', 'Content Marketing', 'Paid Ads'] },
    ],
    proficiency: [['UI/UX Design', '95%'], ['Finance Management', '90%'], ['Graphics Designing', '93%'], ['Digital Marketing', '92%']],
    vision: [
      'As the Chief Executive Officer of TREVIORA, Pagolu Sai Revanth believes that innovation, collaboration and customer-focused solutions are the foundation of sustainable growth.',
      'His vision is to create intelligent digital products that combine creativity, modern engineering and artificial intelligence to solve real-world challenges. He is committed to building a culture of continuous learning, technical excellence, and creative thinking.',
      'Under his leadership, TREVIORA is transforming ideas into powerful digital experiences that empower businesses, inspire innovation, and shape the future of technology.',
    ],
  },
  {
    slug: 'md', route: '/md', name: 'MOHAMED BOUVASH.S', title: 'Managing Director (MD)', role: 'Executive Leadership', image: '/images/managing-director.jpeg', note: 'Oversees business operations, strategic execution and organizational growth.',
    intro: "S. Mohamed Bouvash serves as the Managing Director of TREVIORA, leading operational excellence, strategic execution and business growth. With a passion for creative technology and innovative problem-solving, he drives the company's vision forward by delivering exceptional digital solutions that exceed client expectations.",
    stats: [['5+', 'Core Skills'], ['100%', 'Creativity'], ['100%', 'Innovation']],
    aboutTitle: 'About the Managing Director',
    paragraphs: [
      { text: "S. Mohamed Bouvash plays a vital role in driving TREVIORA's business strategy, operational excellence and digital transformation. As the Managing Director, he oversees daily operations, ensures project quality, and fosters a culture of innovation and creativity." },
      { text: 'His expertise spans Video Editing, Content Writing, Web Development, and AI Model Development. With a 100% Creativity mindset, he brings innovative ideas to every project.', emphasis: ['Video Editing', 'Content Writing', 'Web Development', 'AI Model Development', '100% Creativity'] },
      { text: 'He believes collaboration, continuous learning and creativity are the keys to building world-class technology solutions. His leadership ensures that every TREVIORA project delivers exceptional quality, innovation and customer satisfaction.' },
    ],
    skills: [
      { name: 'Video Editing', description: 'Expert in professional video editing, cinematic productions, motion graphics, promotional videos, YouTube content, advertisements and creative visual storytelling. Using industry-standard tools to deliver high-quality video content that captivates audiences.', tags: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'CapCut'] },
      { name: 'Content Writing', description: 'Skilled in creating engaging, informative and SEO-optimized content for websites, blogs, social media, marketing campaigns and business communications. Crafting compelling narratives that connect with audiences and drive engagement.', tags: ['SEO Writing', 'Blog Posts', 'Copywriting', 'Script Writing'] },
      { name: 'Web Development', description: 'Creating modern, responsive and high-performance websites using the latest web technologies. Building secure, scalable and user-friendly digital experiences that help businesses establish a strong online presence and achieve their goals.', tags: ['HTML5', 'CSS3', 'JavaScript', 'React'] },
      { name: 'AI Model Development', description: 'Developing intelligent AI models using Machine Learning, Deep Learning, and Natural Language Processing. Building smart solutions that automate processes, analyze data, and solve real-world problems with advanced analytics and predictive capabilities.', tags: ['Machine Learning', 'Deep Learning', 'NLP', 'Python'] },
    ],
    proficiency: [['Video Editing', '95%'], ['Content Writing', '92%'], ['Web Development', '90%'], ['AI Model Development', '88%'], ['Creativity', '100%']],
    vision: [
      'As the Managing Director of TREVIORA, S. Mohamed Bouvash is committed to building a culture of innovation, teamwork and operational excellence.',
      'His vision is to transform ideas into powerful digital products through modern technology, creative design and customer-focused solutions. With his 100% Creativity, he continuously pushes boundaries to deliver exceptional value.',
      "Under his leadership, TREVIORA is growing as a globally recognized technology company, delivering innovative solutions that empower businesses and inspire change.",
    ],
  },
  {
    slug: 'kavya', route: '/board1', name: 'KAVYA.V.M', title: 'Board of Director', role: 'Board of Directors', image: '/images/brand-ambassador.jpeg', note: 'Contributes to strategic planning, digital innovation and collaborative decision-making.',
    intro: "V. M. Kavya serves as a Board of Director at TREVIORA, contributing to strategic planning, creative innovation and collaborative decision-making across technology projects. She is passionate about designing modern digital experiences and supporting the company's long-term vision through innovation, teamwork and continuous learning.",
    stats: [['4+', 'Core Skills'], ['100%', 'Dedication'], ['100%', 'Creativity']],
    aboutTitle: 'About the Director',
    paragraphs: [
      { text: 'V. M. Kavya plays an important role in TREVIORA by supporting strategic initiatives, creative product development and team collaboration. She brings a unique blend of technical expertise and creative vision to every project.' },
      { text: "Her expertise spans Video Editing, AI Model Building, Web Development, and Strategic Planning. She combines creative storytelling with technical innovation to deliver impactful solutions.", emphasis: ['Video Editing', 'AI Model Building', 'Web Development', 'Strategic Planning'] },
      { text: 'She believes that creativity, effective communication and collaboration are the key foundations for building innovative technology solutions. Her strategic mindset helps TREVIORA navigate complex challenges and seize new opportunities.' },
    ],
    skills: [
      { name: 'Video Editing', description: 'Expert in professional video editing, cinematic storytelling, motion graphics, and creative visual production. Transforming raw footage into compelling narratives that engage audiences and deliver powerful messages across all platforms.', tags: ['Premiere Pro', 'After Effects', 'Motion Graphics', 'CapCut'] },
      { name: 'AI Model Building', description: 'Skilled in developing intelligent AI models using Machine Learning, Deep Learning, and Natural Language Processing. Building smart solutions that automate processes, analyze data, and solve real-world problems with advanced analytics.', tags: ['Machine Learning', 'Deep Learning', 'NLP', 'Python'] },
      { name: 'Web Development', description: 'Creating modern, responsive and high-performance websites using the latest web technologies. Building secure, scalable and user-friendly digital experiences that help businesses establish a strong online presence and achieve their goals.', tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive'] },
      { name: 'Strategist', description: 'Expert in strategic planning, business analysis, and decision-making. Developing innovative strategies that drive growth, optimize operations, and position TREVIORA for long-term success in the competitive technology landscape.', tags: ['Strategic Planning', 'Business Analysis', 'Decision Making', 'Growth Strategy'] },
    ],
    proficiency: [['Video Editing', '94%'], ['AI Model Building', '90%'], ['Web Development', '92%'], ['Strategic Planning', '96%']],
    vision: [
      'As a Board of Director at TREVIORA, V. M. Kavya believes that innovation, creativity and collaboration are the foundation of every successful organization.',
      "Her vision is to contribute towards building intelligent digital products, enhancing user experiences and supporting TREVIORA's mission of delivering modern technology solutions with quality, integrity and continuous innovation.",
      'With her strategic mindset and creative expertise, she helps guide TREVIORA towards sustainable growth and technological excellence, ensuring the company remains at the forefront of innovation.',
    ],
  },
  {
    slug: 'athila', route: '/board2', name: 'ATHILA BANU.A', title: 'Board of Director', role: 'Board of Directors', image: '/images/athila-designer.jpeg', note: 'Contributes to creative innovation, digital product strategy and visual design.',
    intro: 'A. Athila Banu serves as a Board of Director at TREVIORA, contributing to creative innovation, digital product strategy and visual communication. She specializes in design, web development, invention, and quality assurance, ensuring every TREVIORA project meets the highest standards of excellence.',
    stats: [['4+', 'Core Skills'], ['100%', 'Quality Focus'], ['100%', 'Creativity']],
    aboutTitle: 'About the Director',
    paragraphs: [
      { text: "A. Athila Banu is a Board of Director at TREVIORA, bringing creativity, innovation and strategic thinking to the organization's digital initiatives. She is passionate about design excellence, technical innovation, and maintaining the highest quality standards." },
      { text: 'Her expertise spans Design, Web Development, Invention, and Quality Control. She combines artistic vision with technical precision to deliver visually stunning and highly functional digital products.', emphasis: ['Design', 'Web Development', 'Invention', 'Quality Control'] },
      { text: 'She believes that creativity, continuous learning and teamwork are essential for building future-ready digital products. Her commitment to quality ensures that every TREVIORA project exceeds client expectations.' },
    ],
    skills: [
      { name: 'Designer', description: 'Expert in creating visually stunning designs that capture attention and communicate effectively. Designing logos, brand identities, social media creatives, marketing materials, and UI/UX interfaces that strengthen brand presence and engage audiences.', tags: ['Figma', 'Photoshop', 'Illustrator', 'Canva'] },
      { name: 'Web Developer', description: 'Skilled in creating modern, responsive and high-performance websites using the latest web technologies. Building secure, scalable and user-friendly digital experiences that help businesses establish a strong online presence and achieve their goals.', tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive'] },
      { name: 'Inventor', description: 'Innovative thinker with a passion for creating new solutions and exploring cutting-edge technologies. Developing creative concepts, unique product ideas, and innovative approaches to solve complex problems and drive technological advancement.', tags: ['Innovation', 'Problem Solving', 'Creative Thinking', 'Prototyping'] },
      { name: 'Quality Control Incharge', description: 'Expert in ensuring every project meets the highest standards of quality, precision and excellence. Implementing rigorous quality assurance processes, testing procedures, and performance benchmarks to deliver flawless digital products.', tags: ['QA Testing', 'Performance', 'Bug Tracking', 'Standards'] },
    ],
    proficiency: [['Design', '98%'], ['Web Development', '93%'], ['Invention', '95%'], ['Quality Control', '97%']],
    vision: [
      'As a Board of Director at TREVIORA, A. Athila Banu believes that creativity, design thinking and innovation are the foundation of successful digital products.',
      'Her vision is to strengthen TREVIORA through modern design, innovative solutions and unwavering quality standards. She is committed to delivering products that are not only visually stunning but also technically superior.',
      'With her passion for invention and dedication to quality, she helps guide TREVIORA towards continuous innovation and excellence, ensuring the company remains a leader in the technology industry.',
    ],
  },
  {
    slug: 'shahidh', route: '/board3', name: 'MOHAMED SHAHIDH.S', title: 'Board of Director', role: 'Board of Directors', image: '/images/video-editor.jpeg', note: 'Contributes to creative technology, software development and AI-driven innovation.',
    intro: 'Mohamed Shahidh S serves as a Board Member at TREVIORA, contributing to creative technology, software development and AI-driven innovation. His expertise in graphic design, video editing, website design, and software architecture helps deliver visually stunning and technically robust digital solutions.',
    stats: [['4+', 'Core Skills'], ['100%', 'Creativity'], ['100%', 'Innovation']],
    aboutTitle: 'About the Director',
    paragraphs: [
      { text: 'Mohamed Shahidh S is a creative and technical visionary at TREVIORA, bringing innovation, design thinking and engineering excellence to every project. He is passionate about creating digital experiences that are both beautiful and functional.' },
      { text: 'His expertise spans Graphic Design, Video Editing, Website Design, and Software Architecture. He combines artistic creativity with technical precision to deliver world-class digital products.', emphasis: ['Graphic Design', 'Video Editing', 'Website Design', 'Software Architecture'] },
      { text: 'He believes that innovation, collaboration and continuous learning are the keys to building future-ready technology solutions. His commitment to excellence ensures every TREVIORA project exceeds expectations.' },
    ],
    skills: [
      { name: 'Graphic Designer', description: 'Expert in creating visually compelling designs that capture attention and communicate effectively. Designing logos, brand identities, social media creatives, posters, marketing materials, and digital assets that strengthen brand presence and drive engagement.', tags: ['Photoshop', 'Illustrator', 'Figma', 'Canva'] },
      { name: 'Video Editor', description: 'Skilled in professional video editing, cinematic productions, motion graphics, promotional videos, YouTube content, advertisements and creative visual storytelling. Using industry-standard tools to deliver high-quality video content that captivates audiences.', tags: ['Premiere Pro', 'After Effects', 'Motion Graphics', 'CapCut'] },
      { name: 'Website Designer', description: 'Expert in designing modern, responsive and user-friendly websites that combine aesthetics with functionality. Creating intuitive interfaces, seamless user experiences, and visually stunning layouts that help businesses establish a strong online presence.', tags: ['HTML5', 'CSS3', 'JavaScript', 'UI/UX'] },
      { name: 'Software Architect', description: 'Expert in designing scalable, secure and high-performance software systems. Creating architectural frameworks, defining technical standards, and ensuring robust system design that supports long-term growth and innovation.', tags: ['System Design', 'Architecture', 'Scalability', 'Security'] },
    ],
    proficiency: [['Graphic Design', '97%'], ['Video Editing', '95%'], ['Website Design', '94%'], ['Software Architecture', '92%']],
    vision: [
      'As a Board Member at TREVIORA, Mohamed Shahidh S believes that creativity, technology and collaboration are essential for building innovative digital products.',
      "His vision is to strengthen TREVIORA through advanced design, modern development practices and creative media production. He is committed to delivering solutions that are visually stunning, technically superior and user-centric.",
      "With his passion for design and technical excellence, he helps guide TREVIORA towards continuous innovation and growth, contributing to the company's success as a leading technology innovator.",
    ],
  },
]

const plans = [
  { name: 'Basic', price: '₹4,999', unit: '/project', homepageFeatures: ['Website Design (5 pages)', 'Mobile Responsive', 'Contact Form', 'Basic SEO', '1 Revision'], features: ['Website Design (5 pages)', 'Mobile Responsive', 'Contact Form', 'Basic SEO', '1 Revision', 'CMS Integration', 'E-commerce', 'Priority Support'] },
  { name: 'Standard', price: '₹9,999', unit: '/project', featured: true, homepageFeatures: ['Website Design (10 pages)', 'CMS Integration', 'E-commerce Ready', 'Advanced SEO', '3 Revisions', '1 Month Support'], features: ['Website Design (10 pages)', 'CMS Integration', 'E-commerce Ready', 'Advanced SEO', 'Blog Integration', '3 Revisions', '1 Month Support'] },
  { name: 'Premium', price: '₹19,999', unit: '/project', homepageFeatures: ['Full Website (Unlimited pages)', 'Custom Features', 'API Integration', 'Priority Support', 'Unlimited Revisions', '3 Months Support'], features: ['Full Website (Unlimited pages)', 'Custom Features', 'API Integration', 'Payment Gateway', 'Advanced Security', 'Unlimited Revisions', '3 Months Support', 'Priority Support'] },
]

const projectCategories = [
  ['web', 'Website and Web Application Development', 'Modern Responsive Websites & Scalable Web Applications'],
  ['mobile', 'Android Application Development', 'Scalable Native & Cross-Platform Android Applications'],
  ['ai', 'AI/ML Solutions and Automation', 'Machine Learning Models & Cognitive Intelligent Automation'],
  ['iot', 'IoT Solutions', 'Embedded Hardware & Connected Smart Automation'],
  ['software', 'Custom Software Development', 'Bespoke Enterprise Software Systems & Scalable Architecture'],
  ['uiux', 'UI/UX and Digital Solutions', 'Modern Product Design Systems & Human-Centered Experiences'],
  ['3d-design', '3D Model Design / 3D Assets', 'High-Fidelity 3D Models, Product Renders & Spatial Assets'],
  ['graphics', 'Graphics Design', 'Creative Brand Identities & Impactful Digital Visuals'],
]

const servicePricing = [
  ['Website & Web App Development', '₹4,999', '5-10 Days'],
  ['Android App Development', '₹5,999', '2-4 Weeks'],
  ['AI/ML Solutions & Automation', '₹6,999', '3-5 Weeks'],
  ['IoT Solutions', '₹6,999', '2-4 Weeks'],
  ['Custom Software Development', '₹8,999', '3-6 Weeks'],
  ['UI/UX & Digital Solutions', '₹2,999', '1-2 Weeks'],
  ['3D Model Design / 3D Assets', '₹1,999', '3-7 Days'],
  ['Graphics Design', '₹499', '1-2 Days'],
]

/* ── React-Safe Word & Character Text Reveal ── */
function WordReveal({ text, className = '', splitChars = false }) {
  if (!text) return null
  const words = text.split(' ')

  return (
    <span className={className}>
      {words.map((word, index) => (
        <Fragment key={index}>
          <span className="text-reveal-line">
            <span className="text-reveal-word">
              {splitChars
                ? [...word].map((ch, charIdx) => (
                    <span className="text-reveal-char" key={charIdx}>
                      {ch}
                    </span>
                  ))
                : word}
            </span>
          </span>
          {index < words.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </span>
  )
}

/* ── Scroll-Scrubbed Word-by-Word Manifesto (FIDA Unfold Inspiration) ── */
function UnfoldManifesto({ text, highlightWords = [], className = '' }) {
  const containerRef = useRef(null)

  useGSAP(() => {
    const el = containerRef.current
    if (!el) return
    const words = el.querySelectorAll('.unfold-word')
    if (!words.length) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      gsap.set(words, { opacity: 1 })
      return
    }

    gsap.fromTo(
      words,
      { opacity: 0.34, y: 6 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.04,
        ease: 'power2.out',
        clearProps: 'opacity,transform',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          end: 'bottom 60%',
          scrub: 0.65,
        },
      }
    )
  }, { scope: containerRef })

  if (!text) return null
  const words = text.split(' ')
  const highlightSet = new Set(highlightWords.map((w) => w.toLowerCase()))

  return (
    <p ref={containerRef} className={`unfold-manifesto ${className}`}>
      {words.map((word, index) => {
        const clean = word.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
        const isHighlighted = highlightSet.has(clean)
        return (
          <span
            key={index}
            className={`unfold-word ${isHighlighted ? 'is-highlight' : ''}`}
          >
            {word}
            {index < words.length - 1 ? '\u00A0' : ''}
          </span>
        )
      })}
    </p>
  )
}

/* ── Interactive FAQ Accordion (FIDA Enquiry Pattern) ── */
function FaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="faq-accordion" data-reveal>
      {items.map((item, idx) => {
        const isOpen = openIndex === idx
        return (
          <div className={`faq-item ${isOpen ? 'is-open' : ''}`} key={item.q}>
            <button
              type="button"
              className="faq-trigger"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? -1 : idx)}
            >
              <span>{item.q}</span>
              <span className="faq-symbol" aria-hidden="true">{isOpen ? '−' : '+'}</span>
            </button>
            <div className="faq-panel" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
              <div className="faq-panel-inner">
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ── Scroll To Top On Navigation ── */
function ScrollToTop() {
  const { pathname } = useLocation()
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

/* ── Top Scroll Progress Bar ── */
function ScrollProgressBar() {
  const barRef = useRef(null)

  useGSAP(() => {
    if (!barRef.current) return
    gsap.fromTo(barRef.current, { scaleX: 0 }, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.2,
      },
    })
  })

  return <div className="scroll-progress-bar" ref={barRef} aria-hidden="true" />
}

/* ── Desktop Cursor Spotlight Glow & Precision Magnetic Reticle ── */
function CursorSpotlight() {
  const spotlightRef = useRef(null)
  const reticleRef = useRef(null)
  const coreRef = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = spotlightRef.current
    const reticle = reticleRef.current
    const core = coreRef.current
    if (!el) return

    const xTo = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power2.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power2.out' })
    const rxTo = reticle ? gsap.quickTo(reticle, 'x', { duration: 0.22, ease: 'power3.out' }) : null
    const ryTo = reticle ? gsap.quickTo(reticle, 'y', { duration: 0.22, ease: 'power3.out' }) : null
    const cxTo = core ? gsap.quickTo(core, 'x', { duration: 0.08, ease: 'power2.out' }) : null
    const cyTo = core ? gsap.quickTo(core, 'y', { duration: 0.08, ease: 'power2.out' }) : null

    const onPointerMove = (e) => {
      xTo(e.clientX)
      yTo(e.clientY)
      if (rxTo && ryTo) {
        rxTo(e.clientX)
        ryTo(e.clientY)
      }
      if (cxTo && cyTo) {
        cxTo(e.clientX)
        cyTo(e.clientY)
      }
      if (reticle && e.target?.closest) {
        const isInteractive = Boolean(
          e.target.closest('a, button, .button, .tilt-card, .nav-link, .service-card, .project-card, input, select, textarea')
        )
        reticle.classList.toggle('is-pointer', isInteractive)
      }
    }

    const onPointerLeave = () => {
      if (reticle) reticle.classList.remove('is-pointer')
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [])

  return (
    <>
      <div ref={spotlightRef} className="cursor-spotlight" aria-hidden="true" />
      <div ref={reticleRef} className="treviora-cursor-reticle" aria-hidden="true">
        <span ref={coreRef} className="treviora-cursor-core" />
      </div>
    </>
  )
}

/* ── Mobile Flipkart/Amazon Style Bottom Quick Dock ── */
function MobileBottomDock() {
  const location = useLocation()
  const dockItems = [
    {
      label: 'Home',
      path: '/',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      label: 'Services',
      path: '/services',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
    },
    {
      label: 'Work',
      path: '/work',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
    },
    {
      label: 'Team',
      path: '/team',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      label: 'Contact',
      path: '/contact',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
  ]

  return (
    <nav className="mobile-bottom-dock" aria-label="Mobile quick navigation">
      {dockItems.map((item) => {
        const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path))
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`dock-item ${isActive ? 'is-active' : ''}`}
            aria-label={item.label}
          >
            <span className="dock-icon">{item.icon}</span>
            <span className="dock-label">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}

/* ── Interactive Canvas Particle Constellation with Cursor Attraction ── */
function TechParticlesCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let particles = []
    const mouse = { x: -1000, y: -1000, active: false }

    const setSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const initParticles = () => {
      const count = width < 768 ? 14 : 24
      particles = []
      const colors = ['#13b9f5', '#3867dc', '#7547ff', '#8ca8ff', '#ffffff']

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.8 + 0.8,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.6 + 0.25,
          pulseSpeed: Math.random() * 0.02 + 0.008,
          pulseVal: Math.random() * Math.PI,
        })
      }
    }

    setSize()
    initParticles()

    const handleResize = () => {
      setSize()
      initParticles()
    }
    window.addEventListener('resize', handleResize)

    const handlePointerMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.active = true
    }

    const handlePointerLeave = () => {
      mouse.active = false
      mouse.x = -1000
      mouse.y = -1000
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true })

    const render = () => {
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(render)
        return
      }

      ctx.clearRect(0, 0, width, height)

      // Draw particle constellation connections
      const maxDist = width < 768 ? 90 : 125
      const maxDistSq = maxDist * maxDist

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distSq = dx * dx + dy * dy
          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq)
            const alpha = (1 - dist / maxDist) * 0.16
            ctx.strokeStyle = `rgba(19, 185, 245, ${alpha})`
            ctx.lineWidth = 0.85
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw interactive lines to pointer if nearby
      if (mouse.active && !isReducedMotion) {
        const mouseRadius = 135
        const mouseRadiusSq = mouseRadius * mouseRadius
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i]
          const mdx = mouse.x - p.x
          const mdy = mouse.y - p.y
          const mDistSq = mdx * mdx + mdy * mdy
          if (mDistSq < mouseRadiusSq) {
            const dist = Math.sqrt(mDistSq)
            const mAlpha = (1 - dist / mouseRadius) * 0.35
            ctx.strokeStyle = `rgba(19, 185, 245, ${mAlpha})`
            ctx.lineWidth = 1.1
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.stroke()

            // Gentle repulsion away from pointer
            p.x -= (mdx / dist) * 0.4
            p.y -= (mdy / dist) * 0.4
          }
        }
      }

      // Draw and move particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        if (!isReducedMotion) {
          p.x += p.vx
          p.y += p.vy
          p.pulseVal += p.pulseSpeed

          if (p.x < 0) p.x = width
          else if (p.x > width) p.x = 0
          if (p.y < 0) p.y = height
          else if (p.y > height) p.y = 0
        }

        const currentAlpha = isReducedMotion ? p.alpha : p.alpha * (0.75 + Math.sin(p.pulseVal) * 0.25)

        ctx.fillStyle = p.color
        ctx.globalAlpha = currentAlpha
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      if (!isReducedMotion) {
        animationFrameId = requestAnimationFrame(render)
      }
    }

    if (isReducedMotion) {
      render()
    } else {
      animationFrameId = requestAnimationFrame(render)
    }

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onMotionChange = (e) => {
      isReducedMotion = e.matches
      if (isReducedMotion) {
        cancelAnimationFrame(animationFrameId)
        render()
      } else {
        animationFrameId = requestAnimationFrame(render)
      }
    }
    motionQuery.addEventListener('change', onMotionChange)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerleave', handlePointerLeave)
      motionQuery.removeEventListener('change', onMotionChange)
    }
  }, [])

  return (
    <div className="ambient-canvas-wrapper" aria-hidden="true">
      <div className="ambient-digital-grid" />
      <div className="ambient-glow-layer" />
      <div className="ambient-beam ambient-beam-cyan" />
      <div className="ambient-beam ambient-beam-violet" />
      <canvas ref={canvasRef} />
    </div>
  )
}

/* ── Signature TREVIORA Branded Transition Curtain ── */
function RouteTransitionOverlay({ cutState }) {
  const classes = ['tv-orbit-cut']
  if (cutState.act) classes.push('act')
  if (cutState.in) classes.push('in')
  if (cutState.show) classes.push('show')
  if (cutState.out) classes.push('out')
  return (
    <div className={classes.join(' ')} aria-hidden="true">
      <i className="u" />
      <div className="tv-orbit-logo">
        <img src="/images/tv-intro-w.png" alt="" />
        <img src="/images/tv-intro-b.png" alt="" />
      </div>
    </div>
  )
}

/* ── Header with Sliding Active Indicator & Subtle Entrance ── */
function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const headerRef = useRef(null)
  const navRef = useRef(null)
  const glideRef = useRef(null)

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 24
      setIsScrolled((prev) => (prev === next ? prev : next))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Initial subtle navbar entrance animation
  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.from('.brand, .main-nav > a, .nav-contact', {
      y: -10,
      opacity: 0.45,
      duration: 0.48,
      stagger: 0.045,
      ease: 'power3.out',
      clearProps: 'transform,opacity',
    })
  }, { scope: headerRef })

  // Smooth GSAP sliding underline for active desktop route
  useEffect(() => {
    const navEl = navRef.current
    const glideEl = glideRef.current
    if (!navEl || !glideEl) return

    const syncIndicator = () => {
      if (window.innerWidth <= 900) {
        gsap.set(glideEl, { opacity: 0 })
        return
      }
      const links = navEl.querySelectorAll('a.nav-route-link')
      let activeLink = null
      links.forEach((link) => {
        const targetPath = link.getAttribute('data-nav-path') || ''
        if (isNavPathActive(targetPath, location.pathname, services, people)) {
          activeLink = link
        }
      })

      if (!activeLink) {
        gsap.to(glideEl, { opacity: 0, duration: 0.2, ease: 'power2.out' })
        return
      }

      const targetX = activeLink.offsetLeft
      const targetW = activeLink.offsetWidth
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(glideEl, { x: targetX, width: targetW, opacity: 1 })
      } else {
        gsap.to(glideEl, {
          x: targetX,
          width: targetW,
          opacity: 1,
          duration: 0.44,
          ease: 'expo.out',
        })
      }
    }

    syncIndicator()
    window.addEventListener('resize', syncIndicator, { passive: true })
    return () => window.removeEventListener('resize', syncIndicator)
  }, [location.pathname])

  return (
    <header ref={headerRef} className={`site-header ${menuOpen ? 'menu-open' : ''} ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="header-inner">
        <Link to="/" className="brand" aria-label={IS_ADMIN_HOST ? 'TREVIORA Admin Home' : 'TREVIORA Home'}>
          <span className="brand-mark"><img src="/images/treviora-symbol.png" alt="" /></span>
          <span className="brand-wordmark">
            <strong>TREVIORA</strong>
            <small>{IS_ADMIN_HOST ? 'ADMIN PORTAL' : 'INDUSTRY'}</small>
          </span>
        </Link>
        {IS_ADMIN_HOST ? (
          <div className="main-nav is-admin-nav" aria-label="Admin Portal navigation">
            <a className="nav-contact" href={PUBLIC_SITE_URL} target="_blank" rel="noreferrer">
              Live Website <span aria-hidden="true">↗</span>
            </a>
          </div>
        ) : (
          <>
            <button
              className="menu-toggle"
              type="button"
              aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span /><span />
            </button>
            <nav ref={navRef} className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
              {navItems.map(([label, path]) => {
                const active = isNavPathActive(path, location.pathname, services, people)
                return (
                  <NavLink
                    key={path}
                    to={path}
                    end={path === '/'}
                    data-nav-path={path}
                    className={`nav-route-link${active ? ' active' : ''}`}
                  >
                    <span className="nav-item-label">{label}</span>
                    <span className="nav-item-arrow" aria-hidden="true">↗</span>
                  </NavLink>
                )
              })}
              <span ref={glideRef} className="nav-active-glide" aria-hidden="true" />
              <Link className="nav-contact" to="/contact">Let&apos;s Talk <span aria-hidden="true">↗</span></Link>
              <div className="mobile-nav-caption" aria-hidden="true">
                <span>TREVIORA INDUSTRY · Tamil Nadu, India</span>
              </div>
            </nav>
          </>
        )}
      </div>
    </header>
  )
}

/* ── Social Links ── */
function SocialLinks() {
  const iconPaths = {
    Instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="18" cy="6" r="1" fill="currentColor" stroke="none" /></>,
    LinkedIn: <><path d="M5 9v10M5 5v.01M10 19v-6a4 4 0 0 1 8 0v6M10 10v9" /><circle cx="5" cy="5" r="1.4" fill="currentColor" stroke="none" /></>,
    YouTube: <><path d="M22 12s0-3.4-.44-5.03a2.6 2.6 0 0 0-1.83-1.83C18.1 4.7 12 4.7 12 4.7s-6.1 0-7.73.44a2.6 2.6 0 0 0-1.83 1.83C2 8.6 2 12 2 12s0 3.4.44 5.03a2.6 2.6 0 0 0 1.83 1.83c1.63.44 7.73.44 7.73.44s6.1 0 7.73-.44a2.6 2.6 0 0 0 1.83-1.83C22 15.4 22 12 22 12Z" /><path d="m10 9 5 3-5 3z" fill="currentColor" stroke="none" /></>,
    WhatsApp: <path d="M17.5 14.4c-.3-.1-1.8-.9-2.1-1-.3-.1-.5-.1-.7.2-.2.3-.8 1-.9 1.2-.2.2-.4.2-.7.1-.3-.1-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.7-1-2.3-.3-.6-.6-.5-.8-.5h-.7c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.4 1.4 3.6c.2.2 2.4 3.7 5.8 5.1 3.4 1.4 3.4 1 4 1 .6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.4zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z" />,
    X: <path d="M5 4h4.2l9.8 16h-4.2L5 4Zm14 0-5.5 6.6M5 20l5.6-6.7" />,
    Facebook: <path d="M14 21v-8h3l.5-3H14V8.2c0-.9.3-1.5 1.6-1.5h2V4a25 25 0 0 0-2.8-.15c-2.8 0-4.7 1.7-4.7 4.8V10H7v3h3v8z" />,
  }
  return (
    <div className="footer-socials">
      {socialLinks.map(([name, url]) => (
        <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={`TREVIORA on ${name}`}>
          <svg viewBox="0 0 24 24" aria-hidden="true">{iconPaths[name]}</svg>
        </a>
      ))}
    </div>
  )
}

/* ── Footer ── */
function Footer() {
  const footerServices = [
    ['Web Development', '/web'],
    ['Android Apps', '/mobile'],
    ['AI/ML Solutions', '/ai'],
    ['IoT Solutions', '/iot'],
    ['Custom Software', '/software'],
    ['UI/UX Design', '/uiux'],
    ['3D Model Design', '/3d-design'],
    ['Graphics Design', '/graphics'],
  ]
  return (
    <footer className="site-footer">
      <div className="footer-social-block wrap">
        <h3>Connect With TREVIORA</h3>
        <SocialLinks />
      </div>
      <div className="footer-main wrap">
        <div className="footer-brand">
          <Link to="/" className="brand">
            <span className="brand-mark"><img src="/images/treviora-symbol.png" alt="" /></span>
            <span className="brand-wordmark footer-brand-glow"><strong>TREVIORA</strong><small>INDUSTRY</small></span>
          </Link>
          <p>Engineering Tomorrow. Empowering Innovation through advanced digital technologies.</p>
        </div>
        <div>
          <h3>Quick Links</h3>
          <div className="footer-links">
            {navItems.map(([label, path]) => <Link key={path} to={path}>{label}</Link>)}
          </div>
        </div>
        <div>
          <h3>Services</h3>
          <div className="footer-links">
            {footerServices.map(([label, path]) => <Link key={path} to={path}>{label}</Link>)}
          </div>
        </div>
        <div>
          <h3>Contact</h3>
          <div className="footer-links">
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <a href={`tel:${PHONE.replaceAll(' ', '')}`}>{PHONE}</a>
            <span>Tamil Nadu, India</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom wrap">
        <span>© {new Date().getFullYear()} TREVIORA INDUSTRY. All Rights Reserved.</span>
        <span>Innovative • Design • Intelligence • Future</span>
      </div>
    </footer>
  )
}

/* ── Reusable Eyebrow & Section Heading ── */
function Eyebrow() {
  return null
}

function SectionHeading({ eyebrow, title, text, align = 'left' }) {
  return (
    <div className={`section-heading ${align === 'center' ? 'align-center' : ''}`} data-reveal>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>
        {typeof title === 'string' ? <WordReveal text={title} /> : title}
      </h2>
      {text && <p>{text}</p>}
    </div>
  )
}

/* ── Service Cards with 3D Tilt ── */
function ServiceCards({ limit }) {
  const list = limit ? services.slice(0, limit) : services
  return (
    <>
      <div className="mobile-swipe-hint" aria-hidden="true">
        <span>⇄ Swipe to explore services</span>
      </div>
      <div className="service-grid">
        {list.map((service, index) => (
          <Link
            className="service-card tilt-card"
            key={service.number}
            to={`/${service.slug}`}
            data-direction={index % 2 === 0 ? 'left' : 'right'}
            aria-label={`${service.title}: ${service.subtitle}`}
          >
            <div className="tilt-card-glare" />
            <div className="service-image">
              <img src={service.image} alt={service.imageAlt} loading="lazy" width="1000" height="650" />
              <div className="card-hover-action" aria-hidden="true">
                <span>Explore Domain</span>
                <b>↗</b>
              </div>
            </div>
            <div className="service-card-content">
              <div className="service-card-top">
                <span className="service-icon">{service.icon}</span>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <span className="card-arrow" aria-hidden="true">↗</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

/* ── Team Cards with 3D Tilt ── */
function TeamCards({ limit, boardOnly = false }) {
  const list = boardOnly ? people.slice(3) : limit ? people.slice(0, limit) : people
  return (
    <>
      <div className="mobile-swipe-hint" aria-hidden="true">
        <span>⇄ Swipe to view profiles</span>
      </div>
      <div className="team-grid">
        {list.map((person, index) => (
          <Link
            className="team-card tilt-card"
            key={person.slug}
            to={person.route}
            aria-label={`View ${person.name} profile`}
          >
            <div className="tilt-card-glare" />
            <div className={`team-image team-image-${index}`}>
              <img src={person.image} alt={person.name} loading="lazy" />
              <span className="team-index">VIEW PROFILE <span aria-hidden="true">↗</span></span>
            </div>
            <div className="team-copy">
              <h3>{person.name}</h3>
              <p className="team-title">{person.title}</p>
              <p className="team-note">{person.note}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

/* ── Hero ScrollTrigger Dynamic Showcase (FIDA 3-Chapter Aperture Inspiration) ── */
function HeroScrollShowcase() {
  const showcaseRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  // Continuous auto-cycle timer with FIDA-inspired clip-path aperture wipe
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % heroSlides.length
        const slides = gsap.utils.toArray('.hero-scroll-slide', showcaseRef.current)
        slides.forEach((slide, idx) => {
          if (idx === next) {
            gsap.fromTo(
              slide,
              { clipPath: 'inset(42% 100% 42% 0%)', autoAlpha: 1, scale: 1.065, yPercent: 0 },
              { clipPath: 'inset(0% 0% 0% 0%)', autoAlpha: 1, scale: 1, yPercent: 0, duration: 0.95, ease: 'power3.out' }
            )
          } else {
            gsap.to(slide, { autoAlpha: 0, scale: 1.03, duration: 0.7, ease: 'power2.out' })
          }
        })
        return next
      })
    }, 4500)

    return () => clearInterval(timer)
  }, [])

  useGSAP(() => {
    const slides = gsap.utils.toArray('.hero-scroll-slide', showcaseRef.current)
    const progressEl = showcaseRef.current?.querySelector('.hero-showcase-progress-fill')
    if (!slides.length) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion) {
      gsap.set(slides[0], { autoAlpha: 1, yPercent: 0, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' })
      if (slides.length > 1) {
        gsap.set(slides.slice(1), { autoAlpha: 0, yPercent: 0, scale: 1 })
      }
      if (progressEl) gsap.set(progressEl, { scaleX: 1 })
      return
    }

    gsap.set(slides[0], { autoAlpha: 1, yPercent: 0, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' })
    if (slides.length > 1) {
      gsap.set(slides.slice(1), { autoAlpha: 0, yPercent: 0, scale: 1.065, clipPath: 'inset(42% 100% 42% 0%)' })
    }

    // ScrollTrigger Scrub tied to the showcase section
    const showcaseSection = document.querySelector('.hero-showcase-section') || document.querySelector('.hero')
    if (!showcaseSection) return

    const scrubTl = gsap.timeline({
      scrollTrigger: {
        trigger: showcaseSection,
        start: 'top 65%',
        end: 'bottom 20%',
        scrub: 1,
        onUpdate: (self) => {
          const step = self.progress * (slides.length - 1)
          const currentActive = Math.min(Math.round(step), slides.length - 1)
          setActiveIndex(currentActive)
          if (progressEl) {
            gsap.set(progressEl, { scaleX: Math.max(0.25, self.progress) })
          }
        },
      },
    })

    const count = slides.length
    for (let i = 0; i < count - 1; i++) {
      const current = slides[i]
      const next = slides[i + 1]
      const timePos = i * 2

      scrubTl
        .to(current, {
          autoAlpha: 0,
          scale: 1.04,
          ease: 'power1.inOut',
          duration: 1.1,
        }, timePos)
        .fromTo(next, {
          clipPath: 'inset(44% 100% 44% 0%)',
          autoAlpha: 0.4,
          scale: 1.065,
        }, {
          clipPath: 'inset(0% 0% 0% 0%)',
          autoAlpha: 1,
          scale: 1,
          ease: 'power3.out',
          duration: 1.2,
        }, timePos + 0.15)
    }
  }, { scope: showcaseRef })

  const goToSlide = (targetIndex) => {
    setActiveIndex(targetIndex)
    const slides = gsap.utils.toArray('.hero-scroll-slide', showcaseRef.current)
    slides.forEach((slide, idx) => {
      if (idx === targetIndex) {
        gsap.fromTo(
          slide,
          { clipPath: 'inset(40% 100% 40% 0%)', autoAlpha: 1, scale: 1.065 },
          { clipPath: 'inset(0% 0% 0% 0%)', autoAlpha: 1, scale: 1, duration: 0.75, ease: 'power3.out' }
        )
      } else {
        gsap.to(slide, { autoAlpha: 0, scale: 1.03, duration: 0.5, ease: 'power2.out' })
      }
    })
  }

  return (
    <div className="hero-scroll-showcase" ref={showcaseRef}>
      {heroSlides.map((slide, index) => (
        <div
          key={slide.image}
          className={`hero-scroll-slide ${index === activeIndex ? 'is-active' : ''}`}
          data-hero-slide-index={index}
          aria-hidden={index !== activeIndex}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            fetchPriority={index === 0 ? 'high' : undefined}
            loading={index === 0 ? 'eager' : 'lazy'}
            width="1500"
            height="1100"
          />
        </div>
      ))}

      <div className="hero-scroll-controls" aria-label="Hero showcase scroll controls">
        <div className="hero-scroll-cue">
          <span className="scroll-cue-dot" />
          <span>{heroSlides[activeIndex]?.title || 'Modern Digital Engineering'}</span>
        </div>
        <div className="hero-showcase-progress-track" aria-hidden="true">
          <span
            className="hero-showcase-progress-fill"
            style={{ transform: `scaleX(${(activeIndex + 1) / heroSlides.length})` }}
          />
        </div>
        <div className="hero-slide-dots" role="group" aria-label="Choose hero image">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.image}
              type="button"
              className={index === activeIndex ? 'active' : ''}
              onClick={() => goToSlide(index)}
              aria-label={`Show ${slide.title}`}
              aria-pressed={index === activeIndex}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Enterprise Tech Ecosystem Marquee ── */
function TechEcosystemMarquee() {
  const techStack = [
    { name: 'React 19', role: 'Modern UI Engine', tag: 'Frontend' },
    { name: 'Vite 6', role: 'High-Speed Bundler', tag: 'Build' },
    { name: 'Python 3', role: 'AI & Data Processing', tag: 'Intelligence' },
    { name: 'PyTorch', role: 'Neural Deep Learning', tag: 'AI/ML' },
    { name: 'Node.js', role: 'Microservice APIs', tag: 'Backend' },
    { name: 'ESP32 IoT', role: 'Smart Connected Sensors', tag: 'Embedded' },
    { name: 'Docker', role: 'Containerized Services', tag: 'DevOps' },
    { name: 'AWS Cloud', role: 'Scalable Infrastructure', tag: 'Cloud' },
    { name: 'Figma', role: 'Design Systems', tag: 'UI/UX' },
    { name: 'Adobe Premiere', role: '4K Cinematic Motion', tag: 'Media' },
  ]

  return (
    <section className="tech-ecosystem-section" aria-label="Enterprise Technology Ecosystem">
      <div className="wrap">
        <div className="tech-ecosystem-header">
          <h2 className="tech-ecosystem-title">Technology Stack</h2>
          <p>Enterprise frameworks engineered for performance and reliability</p>
        </div>
      </div>
      <div className="tech-marquee-wrapper">
        <div className="tech-marquee-track">
          {[...techStack, ...techStack].map((tech, idx) => (
            <div className="tech-marquee-pill" key={`${tech.name}-${idx}`}>
              <span className="tech-pill-dot" />
              <strong>{tech.name}</strong>
              <small>{tech.role}</small>
              <span className="tech-pill-tag">{tech.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Mobile Amazon App Experience Component (Active on Mobile Viewports) ── */
function MobileAmazonExperience() {
  const quickCategories = [
    { name: 'Web Dev', icon: '💻', slug: 'web', color: '#13b9f5' },
    { name: 'Android', icon: '📱', slug: 'mobile', color: '#a855f7' },
    { name: 'AI/ML', icon: '🧠', slug: 'ai', color: '#10b981' },
    { name: 'IoT', icon: '🌐', slug: 'iot', color: '#f59e0b' },
    { name: 'Software', icon: '⚙️', slug: 'software', color: '#06b6d4' },
    { name: 'UI/UX', icon: '✨', slug: 'uiux', color: '#ec4899' },
    { name: '3D Assets', icon: '🧊', slug: '3d-design', color: '#eab308' },
    { name: 'Graphics', icon: '🎨', slug: 'graphics', color: '#8b5cf6' },
  ]

  const promoCards = [
    {
      title: 'Flat ₹500 Off On Web & Mobile',
      subtitle: 'Complete Single-Page Architecture with GSAP & Vite',
      badge1: 'Up to 50% off',
      badge2: '100% IP Transfer',
      tag: '🔥 GREAT TECH FESTIVAL',
      link: '/pricing',
      bgGradient: 'linear-gradient(135deg, #ea580c 0%, #c2410c 50%, #9a3412 100%)',
      image: '/images/service-web-development.webp',
    },
    {
      title: 'Next-Gen AI Systems & Telemetry',
      subtitle: 'Custom Python & PyTorch Predictive Models',
      badge1: 'New Release',
      badge2: 'Real-Time API',
      tag: '🧠 SMART AUTOMATION',
      link: '/ai',
      bgGradient: 'linear-gradient(135deg, #0284c7 0%, #0369a1 50%, #075985 100%)',
      image: '/images/service-ai.webp',
    },
    {
      title: '3D Spatial Models & Interactive Assets',
      subtitle: 'Photorealistic Product Renders & Spatial Computing Assets',
      badge1: 'Fast Turnaround',
      badge2: 'PBR Shading',
      tag: '🧊 3D MODEL DESIGN',
      link: '/3d-design',
      bgGradient: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #5b21b6 100%)',
      image: '/images/service-3d-model.webp',
    },
  ]

  const [activePromo, setActivePromo] = useState(0)

  return (
    <section className="mobile-amazon-experience" aria-label="Mobile Navigation Experience">
      {/* 1. Amazon Top Quick Category Strip */}
      <div className="amazon-quick-strip">
        {quickCategories.map((cat) => (
          <Link to={`/${cat.slug}`} className="amazon-quick-item" key={cat.name}>
            <div className="amazon-quick-icon" style={{ borderColor: cat.color, background: `${cat.color}22` }}>
              <span>{cat.icon}</span>
            </div>
            <span className="amazon-quick-label">{cat.name}</span>
          </Link>
        ))}
      </div>

      {/* 2. Amazon Location / Status Bar */}
      <div className="amazon-delivery-bar">
        <span className="delivery-pin">📍</span>
        <div className="delivery-text">
          <small>Delivering Worldwide</small>
          <strong>TREVIORA Global Tech Dispatch • 24/7 Live</strong>
        </div>
        <Link to="/contact" className="amazon-prime-pill">Connect ↗</Link>
      </div>

      {/* 3. Amazon Signature Promotional Banner Rail */}
      <div className="amazon-banner-section">
        <div className="amazon-banner-rail">
          {promoCards.map((card, idx) => (
            <Link
              to={card.link}
              key={card.title}
              className={`amazon-promo-card ${idx === activePromo ? 'is-active' : ''}`}
              style={{ background: card.bgGradient }}
            >
              <div className="amazon-card-header">
                <span className="amazon-festival-tag">{card.tag}</span>
                <h3>{card.title}</h3>
                <p>{card.subtitle}</p>
              </div>

              <div className="amazon-card-badges">
                <span className="amazon-discount-circle">{card.badge1}</span>
                <span className="amazon-discount-circle secondary">{card.badge2}</span>
              </div>

              <div className="amazon-card-image-wrap">
                <img src={card.image} alt={card.title} loading="lazy" />
              </div>

              <div className="amazon-card-bank-bar">
                <span>⚡ 100% NDA & Verified Quality</span>
                <strong>Explore Offer ↗</strong>
              </div>
            </Link>
          ))}
        </div>

        <div className="amazon-carousel-dots">
          <span className="amazon-pause-indicator">⏸</span>
          {promoCards.map((_, idx) => (
            <span key={idx} className={`amazon-dot ${idx === activePromo ? 'active' : ''}`} />
          ))}
        </div>
      </div>

      {/* 4. Amazon Quick Dual Deal Tiles */}
      <div className="amazon-deal-tiles">
        <Link to="/pricing" className="amazon-tile-card">
          <span className="tile-tag">FOR YOU • SPONSORED</span>
          <h4>Academic & Starter Pack</h4>
          <p>Projects starting from ₹3,499</p>
          <span className="tile-link">View Offers ↗</span>
        </Link>
        <Link to="/contact" className="amazon-tile-card">
          <span className="tile-tag">GREAT DEALS • LIVE</span>
          <h4>Direct Sales Call</h4>
          <p>Consult our Sales Team in &lt; 2 hrs</p>
          <span className="tile-link">Call Now ↗</span>
        </Link>
      </div>
    </section>
  )
}

/* ── Hero 3D Extruded Sculpted Logo Stage (Integrated & Performance-Optimized) ── */
function build3DLogoLayers() {
  const N = 5
  const M = 2
  const lerp = (a, b, t) => a + (b - a) * t
  const mix = (c1, c2, t) => `rgb(${c1.map((v, i) => Math.round(lerp(v, c2[i], t))).join(',')})`

  const fr = []
  const bk = []
  for (let i = 1; i <= N; i++) {
    const c = i / N
    const bg = mix([34, 44, 72], [3, 5, 12], c)
    fr.push({ cls: 'dk', c: -c, bg, isFace: false, b: false })
    bk.push({ cls: 'dk', c: -1 + c, bg, isFace: false, b: true })
  }
  for (let j = 1; j <= M; j++) {
    const c = (j + 0.4) / M
    const bg = mix([46, 104, 222], [14, 44, 110], j / M)
    fr.push({ cls: 'bl', c: -c * 0.36, bg, isFace: false, b: false })
    bk.push({ cls: 'bl', c: -1 + c * 0.36, bg, isFace: false, b: true })
  }
  fr.sort((a, b) => a.c - b.c)
  bk.sort((a, b) => b.c - a.c)
  fr.push({ cls: 'face', c: 0, bg: '', isFace: true, b: false })
  bk.push({ cls: 'face', c: -1, bg: '', isFace: true, b: true })
  return fr.concat(bk)
}

function Hero3DLogoWidget() {
  const panelRef = useRef(null)
  const stageRef = useRef(null)
  const logoRef = useRef(null)
  const shadowRef = useRef(null)
  const canvasRef = useRef(null)
  const layerRefs = useRef([])
  const [spinPaused, setSpinPaused] = useState(false)
  const pausedRef = useRef(false)
  const layers = useMemo(() => build3DLogoLayers(), [])

  useEffect(() => {
    const panel = panelRef.current
    const stage = stageRef.current
    const logo = logoRef.current
    const shadow = shadowRef.current
    const canvas = canvasRef.current
    if (!panel || !stage || !logo || !shadow) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const P = 1550
    const SPEED = 18
    let depth = 34
    let W = 480
    let cachedRect = panel.getBoundingClientRect()

    const updateSize = () => {
      cachedRect = panel.getBoundingClientRect()
      const pw = panel.clientWidth || 540
      const ph = panel.clientHeight || 520
      W = Math.min(pw * 0.84, ph * 0.74 * 1.3226)
      logo.style.setProperty('--w', `${W}px`)
      logo.style.setProperty('--h', `${W / 1.3226}px`)
      depth = W * 0.072
    }
    updateSize()
    window.addEventListener('resize', updateSize)

    // Render static cosmic starfield once onto .holo-earth-canvas (zero per-frame canvas overhead)
    if (canvas) {
      const starCtx = canvas.getContext('2d')
      if (starCtx) {
        starCtx.clearRect(0, 0, 520, 520)
        for (let i = 0; i < 40; i++) {
          const sx = Math.random() * 520
          const sy = Math.random() * 520
          const sr = Math.random() * 1.6 + 0.5
          const sa = Math.random() * 0.55 + 0.25
          starCtx.fillStyle = i % 3 === 0 ? `rgba(0, 229, 255, ${sa})` : `rgba(219, 228, 240, ${sa})`
          starCtx.beginPath()
          starCtx.arc(sx, sy, sr, 0, Math.PI * 2)
          starCtx.fill()
        }
      }
    }

    const now0 = performance.now()
    const t0 = now0
    let lastT = now0
    let rot = 0
    let lastInteract = -1e9
    let tx = 0
    let ty = 0
    let cx = 0
    let cy = 0
    let down = null
    let isInView = true

    const place = (rx, ry, spread) => {
      const base = `perspective(${P}px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) `
      const nodes = layerRefs.current
      for (let i = 0; i < layers.length; i++) {
        const el = nodes[i]
        if (!el) continue
        const L = layers[i]
        const z = spread * depth * L.c
        el.style.transform =
          `${base}translateZ(${z.toFixed(2)}px) ${L.b ? 'rotateY(180deg) ' : ''}scale(${((P - z) / P).toFixed(5)})`
      }
    }

    const tilt = (e) => {
      if (!cachedRect.width || !cachedRect.height) return
      ty = Math.max(-0.5, Math.min(0.5, (e.clientX - cachedRect.left) / cachedRect.width - 0.5)) * 68
      tx = -Math.max(-0.5, Math.min(0.5, (e.clientY - cachedRect.top) / cachedRect.height - 0.5)) * 44
      lastInteract = performance.now()
    }

    const onPointerEnter = () => {
      cachedRect = panel.getBoundingClientRect()
    }
    const onPointerMove = (e) => tilt(e)
    const onPointerDown = (e) => {
      cachedRect = panel.getBoundingClientRect()
      down = { x: e.clientX, y: e.clientY }
      panel.classList.add('is-dragging')
      tilt(e)
    }
    const onPointerUp = (e) => {
      panel.classList.remove('is-dragging')
      if (down && Math.abs(e.clientX - down.x) < 6 && Math.abs(e.clientY - down.y) < 6) {
        if (!reduce) {
          pausedRef.current = !pausedRef.current
          setSpinPaused(pausedRef.current)
        }
      }
      down = null
    }
    const onPointerCancel = () => {
      panel.classList.remove('is-dragging')
      down = null
    }

    panel.addEventListener('pointerenter', onPointerEnter)
    panel.addEventListener('pointermove', onPointerMove, { passive: true })
    panel.addEventListener('pointerdown', onPointerDown)
    panel.addEventListener('pointerup', onPointerUp)
    panel.addEventListener('pointercancel', onPointerCancel)

    let rafId = null
    const frame = (now) => {
      if (!isInView || document.hidden) {
        rafId = null
        return
      }
      const dt = Math.min(0.05, (now - lastT) / 1000)
      lastT = now
      const u = reduce ? 1 : Math.max(0, Math.min(1, (now - t0) / 2600))
      const intro = !reduce && u < 1
      const spread = intro ? 1 + Math.pow(1 - Math.min(1, u * 1.25), 3) * 5 : 1

      if (!reduce && !pausedRef.current) {
        rot = (rot + SPEED * dt) % 360
      }

      const idle = now - lastInteract > 2200
      if (idle) {
        ty = 0
        tx = reduce ? 0 : Math.cos((now / 1000) * 0.5) * 8
      }

      cx += (tx - cx) * 0.08
      cy += (ty - cy) * 0.08
      const angle = cy + rot
      place(cx, angle, spread)

      stage.style.opacity = intro ? Math.min(1, u * 5) : 1
      const rad = (angle * Math.PI) / 180
      shadow.style.transform = `translateX(calc(-50% + ${(-Math.sin(rad) * W * 0.1).toFixed(1)}px)) scaleX(${(0.65 + 0.35 * Math.abs(Math.cos(rad))).toFixed(3)})`

      rafId = requestAnimationFrame(frame)
    }

    const startLoop = () => {
      if (!rafId && isInView && !document.hidden) {
        lastT = performance.now()
        rafId = requestAnimationFrame(frame)
      }
    }

    const observer = typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver(([entry]) => {
          isInView = entry.isIntersecting
          if (isInView) startLoop()
        }, { threshold: 0.05 })
      : null
    if (observer) observer.observe(panel)

    const onVisChange = () => {
      if (!document.hidden && isInView) startLoop()
    }
    document.addEventListener('visibilitychange', onVisChange)

    startLoop()

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      if (observer) observer.disconnect()
      document.removeEventListener('visibilitychange', onVisChange)
      window.removeEventListener('resize', updateSize)
      panel.removeEventListener('pointerenter', onPointerEnter)
      panel.removeEventListener('pointermove', onPointerMove)
      panel.removeEventListener('pointerdown', onPointerDown)
      panel.removeEventListener('pointerup', onPointerUp)
      panel.removeEventListener('pointercancel', onPointerCancel)
    }
  }, [layers])

  return (
    <div className={`hero-3d-logo-stage ${spinPaused ? 'is-spin-paused' : ''}`}>
      {/* Ambient Space Beams & Horizontal Anamorphic Lens Flare */}
      <div className="hero-3d-ambient-beams" aria-hidden="true">
        <div className="beam-line beam-line-1" />
        <div className="beam-line beam-line-2" />
        <div className="holo-flare-horizontal" />
        <div className="beam-orbit-glow" />
      </div>

      {/* 3D Holographic Sculpted Emblem Stage (Integrated from 3D animated logo.html) */}
      <div className="hero-3d-logo-card hero-holo-globe-card">
        <div className="tilt-card-glare" />

        {/* Multi-Axis Ambient Gyro Rings with Orbiting Photons */}
        <div className="globe-gyro-system" aria-hidden="true">
          <div className="globe-ring globe-ring-equator">
            <span className="orbit-photon photon-1" />
            <span className="orbit-photon photon-2" />
          </div>
          <div className="globe-ring globe-ring-polar">
            <span className="orbit-photon photon-3" />
          </div>
          <div className="globe-ring globe-ring-diagonal">
            <span className="orbit-photon photon-4" />
          </div>
          <div className="globe-ring globe-ring-outer logo-orbital-ring" />
          <div className="ring-pulse" />
        </div>

        <canvas ref={canvasRef} className="holo-earth-canvas" width="520" height="520" aria-hidden="true" />

        {/* 16-Layer Extruded Sculpted 3D TV Emblem */}
        <div
          className="treviora-3d-panel"
          ref={panelRef}
          role="region"
          aria-label="Interactive 3D animated TREVIORA logo"
        >
          <div className="treviora-3d-shadow" ref={shadowRef} aria-hidden="true" />
          <div className="treviora-3d-stage" ref={stageRef}>
            <div className="treviora-3d-logo" ref={logoRef}>
              {layers.map((layer, idx) => (
                <div
                  key={idx}
                  ref={(el) => { layerRefs.current[idx] = el }}
                  className={`treviora-3d-layer ${layer.cls}`}
                  style={layer.bg ? { background: layer.bg } : undefined}
                >
                  {layer.isFace && !layer.b && (
                    <div className="treviora-3d-sheen" aria-hidden="true">
                      <i />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Futuristic Cybernetic Holographic Projector Pedestal Base Platform */}
        <div className="holo-pedestal-platform" aria-hidden="true">
          <div className="pedestal-energy-cone" />
          <div className="pedestal-laser-pillar" />
          <div className="pedestal-focal-core-sparkle" />
          <div className="pedestal-disc-system">
            <div className="pedestal-disc disc-tier-outer">
              <div className="disc-rim-ticks" />
            </div>
            <div className="pedestal-disc disc-tier-mid">
              <div className="disc-neon-track" />
              <div className="disc-orbit-pulse" />
            </div>
            <div className="pedestal-disc disc-tier-inner">
              <div className="disc-core-lens" />
            </div>
          </div>
          <div className="pedestal-floor-glow" />
        </div>
      </div>
    </div>
  )
}

/* ── Home Page ── */
function Home() {
  const capabilities = [
    { label: 'Web & Web Apps', desc: 'React, Vite, Fullstack', icon: 'WEB' },
    { label: 'Android Apps', desc: 'Native & Cross-Platform', icon: 'APP' },
    { label: 'AI/ML & Automation', desc: 'Machine Learning Models', icon: 'AI' },
    { label: 'IoT Solutions', desc: 'Smart Connected Systems', icon: 'IOT' },
    { label: 'Custom Software', desc: 'Enterprise Systems & APIs', icon: 'DEV' },
    { label: 'UI/UX & Digital', desc: 'Modern Product Design', icon: 'UI' },
    { label: '3D Model Design', desc: 'High-Fidelity 3D Assets', icon: '3D' },
    { label: 'Graphics Design', desc: 'Brand Identities & Media', icon: 'DES' },
  ]

  return (
    <>
      <main>
        {/* Amazon Mobile Experience (Only on mobile <= 768px) */}
        <div className="wrap mobile-only-wrap">
          <MobileAmazonExperience />
        </div>

        <section className="hero">
          <div className="hero-grid wrap">
            <div className="hero-copy">
              <h1 className="hero-title-main">
                <span className="hero-title-white"><WordReveal text="TREVIORA" splitChars /></span>{' '}
                <span className="hero-title-cyan"><WordReveal text="INDUSTRY" splitChars /></span>
              </h1>
              <p className="hero-tagline-classy">Turning Ideas into Digital Solutions</p>
              <p className="hero-intro">
                TREVIORA INDUSTRY is an emerging technology-driven company focused on transforming innovative ideas into meaningful digital solutions across Web Development, Mobile Application Development, Artificial Intelligence, IoT, Cloud Solutions, and Creative Media.
              </p>
              <div className="hero-actions">
                <Link className="button button-primary" to="/services">
                  Explore Services <span>↗</span>
                </Link>
                <Link className="button button-outline" to="/contact">
                  Get Consultation
                </Link>
              </div>

              {/* Quick Hero Metric Pills */}
              <div className="hero-metrics-pill-row">
                <div className="hero-pill-badge">
                  <span className="pill-dot" />
                  <strong>6+ Core Domains</strong>
                </div>
                <div className="hero-pill-badge">
                  <span className="pill-dot" />
                  <strong>100% Innovation</strong>
                </div>
                <div className="hero-pill-badge">
                  <span className="pill-dot" />
                  <strong>Enterprise Scalability</strong>
                </div>
              </div>
            </div>

            <div className="hero-art">
              <Hero3DLogoWidget />
            </div>
          </div>

          <div className="wrap">
            <div className="panel-heading-inline">
              <h2>Core Capabilities</h2>
              <span>8 Specialized Engineering &amp; Creative Domains</span>
            </div>
            <div className="hero-capabilities" aria-label="Core Capabilities">
              {capabilities.map((item) => (
                <div className="capability-item" key={item.label}>
                  <span className="capability-icon">{item.icon}</span>
                  <div className="capability-copy">
                    <strong>{item.label}</strong>
                    <small>{item.desc}</small>
                  </div>
                </div>
              ))}
            </div>

            <div className="panel-heading-inline compact">
              <h2>Company Impact</h2>
              <span>Verified Delivery &amp; Engineering Benchmarks</span>
            </div>
            <div className="company-metrics-bar" data-reveal aria-label="TREVIORA Impact Numbers">
              <div className="metric-box">
                <strong data-count="7" data-suffix="+">7+</strong>
                <span>Core Domains</span>
              </div>
              <div className="metric-box">
                <strong data-count="100" data-suffix="%">100%</strong>
                <span>Client Dedication</span>
              </div>
              <div className="metric-box">
                <strong data-count="6" data-suffix="+">6+</strong>
                <span>Leadership Experts</span>
              </div>
              <div className="metric-box">
                <strong data-count="100" data-suffix="%">100%</strong>
                <span>Innovation Driven</span>
              </div>
            </div>
          </div>
        </section>

        {/* Structured About TREVIORA INDUSTRY Section */}
        <section className="about-treviora-home section-pad" id="about-treviora">
          <div className="wrap">
            <div className="about-home-header" data-reveal>
              <span className="panel-kicker-title">About TREVIORA INDUSTRY</span>
              <h2>
                <WordReveal text="Turning Ideas into Digital Solutions" />
              </h2>
              <div className="about-home-narrative">
                <UnfoldManifesto
                  className="lead-paragraph"
                  text="TREVIORA INDUSTRY is an emerging technology-driven company focused on transforming innovative ideas into meaningful digital solutions across Web Development, Mobile Application Development, Artificial Intelligence, Internet of Things (IoT), Cloud Solutions, and Creative Digital Services."
                  highlightWords={['TREVIORA', 'INDUSTRY', 'Web', 'Artificial', 'Intelligence,', 'IoT', 'Cloud']}
                />
                <UnfoldManifesto
                  text="Our mission is to empower individuals, startups, and businesses through modern technology, creative thinking, and intelligent solutions that solve real-world problems and create lasting impact."
                  highlightWords={['empower', 'modern', 'intelligent', 'impact']}
                />
              </div>
            </div>

            {/* 3D Floating Vision & Mission Cards */}
            <div className="vision-mission-grid">
              <div className="vm-card vm-card-vision tilt-card" data-reveal>
                <div className="tilt-card-glare" />
                <div className="vm-icon-bubble">🌐</div>
                <div className="vm-content">
                  <h3>Our Vision</h3>
                  <p>
                    To become an innovative technology company recognized for building intelligent products and shaping the future of digital technology.
                  </p>
                </div>
              </div>

              <div className="vm-card vm-card-mission tilt-card" data-reveal>
                <div className="tilt-card-glare" />
                <div className="vm-icon-bubble">🎯</div>
                <div className="vm-content">
                  <h3>Our Mission</h3>
                  <ul className="vm-checklist">
                    <li>
                      <span className="check-bullet">✓</span>
                      <span>Deliver innovative and reliable technology solutions.</span>
                    </li>
                    <li>
                      <span className="check-bullet">✓</span>
                      <span>Build intelligent products using emerging technologies.</span>
                    </li>
                    <li>
                      <span className="check-bullet">✓</span>
                      <span>Empower startups and businesses through digital transformation.</span>
                    </li>
                    <li>
                      <span className="check-bullet">✓</span>
                      <span>Encourage creativity, research, and continuous innovation.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Our Core Values (3D Interactive Hex/Pill Grid) */}
            <div className="core-values-section" data-reveal>
              <div className="core-values-header">
                <h3>Our Core Values</h3>
                <p>The principles and engineering standards behind every product we deliver.</p>
              </div>
              <div className="core-values-grid">
                {[
                  { icon: '💡', title: 'Innovation', desc: 'Continuous breakthroughs with modern engineering' },
                  { icon: '⭐', title: 'Quality', desc: 'Precision craftsmanship & high reliability' },
                  { icon: '🎨', title: 'Creativity', desc: 'Inspiring visual designs and fresh ideas' },
                  { icon: '🛡️', title: 'Integrity', desc: 'Transparent, honest, and ethical practices' },
                  { icon: '🤝', title: 'Teamwork', desc: 'Collaborative synergy driving success' },
                  { icon: '🎯', title: 'Customer Satisfaction', desc: 'Empowering client growth & real results' },
                ].map((val) => (
                  <div className="value-chip-card tilt-card" key={val.title}>
                    <div className="tilt-card-glare" />
                    <span className="value-chip-icon">{val.icon}</span>
                    <div className="value-chip-copy">
                      <strong>{val.title}</strong>
                      <small>{val.desc}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What We Do Interactive Matrix */}
            <div className="what-we-do-matrix" data-reveal>
              <div className="what-we-do-header">
                <h3>Transforming Vision into Products</h3>
                <p>End-to-end software engineering, intelligent automation, and creative design.</p>
              </div>
              <div className="what-we-do-pills">
                {[
                  { label: 'Web Development', slug: '/web', icon: '💻' },
                  { label: 'Android Apps', slug: '/mobile', icon: '📱' },
                  { label: 'AI/ML Solutions', slug: '/ai', icon: '🧠' },
                  { label: 'IoT Solutions', slug: '/iot', icon: '📡' },
                  { label: 'Custom Software', slug: '/software', icon: '⚙️' },
                  { label: 'UI/UX Design', slug: '/uiux', icon: '✨' },
                  { label: '3D Models & Assets', slug: '/3d-design', icon: '🧊' },
                  { label: 'Graphics Design', slug: '/graphics', icon: '🎨' },
                ].map((item) => (
                  <Link to={item.slug} className="what-we-do-pill" key={item.label}>
                    <span className="wwd-icon">{item.icon}</span>
                    <span className="wwd-label">{item.label}</span>
                    <span className="wwd-arrow">↗</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Innovate. Build. Grow. Tagline Banner */}
            <div className="innovate-slogan-banner tilt-card" data-reveal>
              <div className="tilt-card-glare" />
              <div className="slogan-glow-orb" />
              <div className="slogan-content">
                <h3 className="slogan-highlight">Innovate. Build. Grow.</h3>
                <p className="slogan-sub">TREVIORA INDUSTRY — Turning Ideas into Digital Solutions</p>
              </div>
              <div className="slogan-actions">
                <Link to="/contact" className="button button-primary">
                  Start Your Project <span>↗</span>
                </Link>
                <Link to="/services" className="button button-outline">
                  Explore Services
                </Link>
              </div>
            </div>

            {/* Official Verified Social Channels */}
            <div className="official-social-community" data-reveal>
              <div className="community-header">
                <h3>Official Digital Channels</h3>
                <p>Connect with TREVIORA INDUSTRY across our verified corporate channels.</p>
              </div>
              <div className="official-social-cards">
                {[
                  {
                    name: 'Instagram',
                    handle: '@trevioraindustry',
                    url: 'https://www.instagram.com/trevioraindustry?hvrq=MWIxbGJybmQ1OGoxeQ==',
                    badge: 'Official Page',
                    icon: 'instagram',
                    color: '#E1306C',
                  },
                  {
                    name: 'LinkedIn',
                    handle: 'Treviora Industry',
                    url: 'https://www.linkedin.com/in/treviora-industry-b5b8a0426?utm_source=share_via&utm_content=profile&utm_medium=member_android',
                    badge: 'Corporate Profile',
                    icon: 'linkedin',
                    color: '#0077B5',
                  },
                  {
                    name: 'YouTube',
                    handle: '@TREVIORAINDUSTRY',
                    url: 'https://www.youtube.com/@TREVIORAINDUSTRY',
                    badge: 'Video Channel',
                    icon: 'youtube',
                    color: '#FF0000',
                  },
                  {
                    name: 'WhatsApp Channel',
                    handle: 'TREVIORA Updates',
                    url: 'https://whatsapp.com/channel/0029VbEJbK9E50UZcKGl3A2B',
                    badge: 'Direct Channel',
                    icon: 'whatsapp',
                    color: '#25D366',
                  },
                ].map((ch) => (
                  <a
                    key={ch.name}
                    href={ch.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="official-social-card tilt-card"
                  >
                    <div className="tilt-card-glare" />
                    <div className="ch-icon" style={{ borderColor: ch.color }}>
                      {ch.icon === 'instagram' && (
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                      )}
                      {ch.icon === 'linkedin' && (
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                          <rect x="2" y="9" width="4" height="12" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
                      )}
                      {ch.icon === 'youtube' && (
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
                        </svg>
                      )}
                      {ch.icon === 'whatsapp' && (
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                          <path d="M17.5 14.4c-.3-.1-1.8-.9-2.1-1-.3-.1-.5-.1-.7.2-.2.3-.8 1-.9 1.2-.2.2-.4.2-.7.1-.3-.1-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.7-1-2.3-.3-.6-.6-.5-.8-.5h-.7c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.4 1.4 3.6c.2.2 2.4 3.7 5.8 5.1 3.4 1.4 3.4 1 4 1 .6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.4zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z" />
                        </svg>
                      )}
                    </div>
                    <div className="ch-info">
                      <span className="ch-badge">{ch.badge}</span>
                      <strong>{ch.name}</strong>
                      <small>{ch.handle}</small>
                    </div>
                    <span className="ch-arrow">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <TechEcosystemMarquee />

        {/* Engineering Showcase Spotlight with HeroScrollShowcase & Relatable Architecture Content */}
        <section className="hero-showcase-section section-pad">
          <div className="wrap">
            <SectionHeading
              eyebrow="Architecture Overview"
              title="Next-Gen Architecture in Action"
              text="Explore our engineered platforms, connected hardware, and creative media systems."
            />
            <div className="hero-showcase-container">
              <div className="hero-showcase-split-grid">
                {/* Left Column: Interactive Visual Showcase Slider */}
                <div className="showcase-visual-col" data-reveal>
                  <div className="hero-photo">
                    <HeroScrollShowcase />
                  </div>
                </div>

                {/* Right Column: Relatable Architecture Capabilities & Live Specs */}
                <div className="showcase-content-col" data-reveal>
                  <div className="showcase-content-header">
                    <h3>Pioneering Intelligent Digital Systems</h3>
                    <p>
                      From neural AI pipelines to industrial IoT hardware, our engineering teams architect reliable, scalable systems built for real-world deployment.
                    </p>
                  </div>

                  <div className="showcase-feature-cards">
                    <div className="showcase-feature-card tilt-card">
                      <div className="tilt-card-glare" />
                      <span className="showcase-card-icon">🧠</span>
                      <div className="showcase-card-body">
                        <h4>Neural &amp; AI Pipelines</h4>
                        <p>Custom machine learning models and smart workflow automation.</p>
                      </div>
                    </div>

                    <div className="showcase-feature-card tilt-card">
                      <div className="tilt-card-glare" />
                      <span className="showcase-card-icon">⚡</span>
                      <div className="showcase-card-body">
                        <h4>Fullstack &amp; Cloud Systems</h4>
                        <p>Fast React web apps, Android builds, and reliable cloud APIs.</p>
                      </div>
                    </div>

                    <div className="showcase-feature-card tilt-card">
                      <div className="tilt-card-glare" />
                      <span className="showcase-card-icon">📡</span>
                      <div className="showcase-card-body">
                        <h4>IoT &amp; Smart Hardware</h4>
                        <p>Sensor telemetry, microcontroller firmware, and automation.</p>
                      </div>
                    </div>

                    <div className="showcase-feature-card tilt-card">
                      <div className="tilt-card-glare" />
                      <span className="showcase-card-icon">🧊</span>
                      <div className="showcase-card-body">
                        <h4>3D, UI/UX &amp; Digital Design</h4>
                        <p>Interactive 3D models, clean design systems, and brand visuals.</p>
                      </div>
                    </div>
                  </div>

                  {/* Performance Reliability Bar & CTA */}
                  <div className="showcase-meta-bar">
                    <div className="meta-stat">
                      <strong>99.9%</strong>
                      <small>System Reliability</small>
                    </div>
                    <div className="meta-stat">
                      <strong>&lt; 100ms</strong>
                      <small>Global Latency</small>
                    </div>
                    <div className="meta-stat">
                      <strong>100%</strong>
                      <small>Enterprise Grade</small>
                    </div>
                    <Link to="/services" className="button button-primary showcase-cta-btn">
                      Explore Services <span>↗</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="services-section section-pad">
          <div className="wrap">
            <SectionHeading eyebrow="Our Services" title="What We Offer" text="Complete digital solutions engineered for your business growth" />
            <ServiceCards />
          </div>
        </section>

        <section className="values-section section-pad">
          <div className="wrap">
            <SectionHeading eyebrow="Why Choose Us" title="Why Choose TREVIORA?" text="Excellence, innovation, and value built into every digital product" />
            <div className="values-grid">
              {[
                ['💡', 'Innovation', 'Creative solutions using modern engineering and future-ready frameworks'],
                ['⚡', 'Modern Technology', 'Cutting-edge web, mobile, AI, and IoT tech stacks'],
                ['🎯', 'Quality Focus', 'Rigorous testing and high standards in every project deliverable'],
                ['💰', 'Affordable Pricing', 'Transparent, cost-effective pricing with maximum return on investment']
              ].map(([icon, title, text]) => (
                <article className="value-card" key={title}>
                  <span className="value-emoji">{icon}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="pricing-section section-pad wrap">
          <SectionHeading eyebrow="Pricing & Offers" title="Affordable Plans" text="Choose the perfect plan tailored to your business scale" />
          <PricingCards homepage />
          <Offers />
          <div className="source-home-cta" data-reveal>
            <div>
              <h2>Ready to Start Your Project?</h2>
              <p>Get a free consultation and customized quote from our sales team today.</p>
            </div>
            <Link className="button button-primary" to="/contact">Contact Us <span>↗</span></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

/* ── Page Hero with Dynamic 2-Column Visual Architecture (FIDA Subpage Scene Choreography) ── */
function PageHero({
  eyebrow,
  title,
  text,
  image,
  badge = 'TREVIORA CERTIFIED',
  badgeIcon = '⚡',
  subBadge,
  actions,
  sceneVariant = 'default',
}) {
  return (
    <section className={`page-hero ${image ? 'page-hero-has-image' : ''} page-scene page-scene-${sceneVariant}`}>
      {/* FIDA-Inspired Diagonal Light Beam for Contact Scene */}
      {sceneVariant === 'contact' && (
        <>
          <div className="scene-contact-beam" aria-hidden="true" />
          <div className="scene-contact-hubs" aria-hidden="true">
            <span className="scene-hub-tag">TAMIL NADU · INDIA</span>
            <span className="scene-hub-tag">GLOBAL REMOTE</span>
            <span className="scene-hub-tag">&lt; 2 HR SLA</span>
          </div>
        </>
      )}

      {/* FIDA-Inspired Frosted Weave Curtain Strips for Services Scene */}
      {sceneVariant === 'services' && (
        <div className="scene-weave-curtains" aria-hidden="true">
          {[0, 1, 2, 3, 4, 5, 6].map((idx) => (
            <span className="scene-weave-strip" data-strip-index={idx} key={idx} />
          ))}
        </div>
      )}

      {/* FIDA-Inspired Curved Luminous SVG Thread Path */}
      <svg className="scene-thread-svg" viewBox="0 0 1200 320" preserveAspectRatio="none" aria-hidden="true">
        <path
          className="scene-thread-path"
          d="M -20 260 C 260 210, 420 60, 680 140 C 890 205, 1030 70, 1240 120"
          fill="none"
          stroke="url(#trevioraThreadGrad)"
          strokeWidth="1.6"
        />
        <defs>
          <linearGradient id="trevioraThreadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0, 229, 255, 0.08)" />
            <stop offset="50%" stopColor="rgba(0, 229, 255, 0.72)" />
            <stop offset="100%" stopColor="rgba(168, 85, 247, 0.5)" />
          </linearGradient>
        </defs>
      </svg>

      <div className="wrap page-hero-grid">
        <div className="page-hero-inner">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1>
            {typeof title === 'string' ? <WordReveal text={title} splitChars /> : title}
          </h1>
          {text && <p>{text}</p>}
          {actions && (
            <div className="page-hero-actions">
              {actions}
            </div>
          )}
        </div>

        {image && (
          <div className="page-hero-visual">
            <div className="page-hero-card tilt-card">
              <div className="tilt-card-glare" />
              <div className="page-hero-image-frame">
                <img
                  src={image}
                  alt={typeof title === 'string' ? title : 'TREVIORA Technology'}
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Scroll Progress Hairline */}
      <div className="page-scene-progress" aria-hidden="true">
        <i />
      </div>
    </section>
  )
}

/* ── About Page ── */
function About() {
  const values = [
    ['💡', 'Innovation', 'We embrace creativity and future-focused thinking.'],
    ['⭐', 'Excellence', 'We aim for quality in every project we undertake.'],
    ['🤝', 'Integrity', 'We believe in honesty, trust, and responsibility.'],
    ['📚', 'Continuous Learning', 'Technology evolves, and so do we.'],
    ['🎯', 'Customer Commitment', 'Every client deserves our best effort.'],
    ['🚀', 'Future Ready', 'Building intelligent solutions for tomorrow.'],
  ]

  return (
    <>
      <PageHero
        eyebrow="Welcome to TREVIORA"
        title={<><WordReveal text="About" splitChars /><br /><span className="hero-accent"><WordReveal text="TREVIORA" splitChars /></span></>}
        text="Engineering the Future with Innovation and Technology"
        image="/images/about-studio.webp"
        badge="TREVIORA TECHNOLOGY LAB"
        badgeIcon="⚡"
        subBadge="Next-Gen Engineering & Digital Architecture"
        sceneVariant="story"
        actions={
          <>
            <Link className="button button-primary" to="/contact">Get In Touch <span>↗</span></Link>
            <Link className="button button-outline" to="/projects">View Projects</Link>
          </>
        }
      />
      <main>
        <section className="about-story section-pad wrap">
          <div className="story-aside" data-reveal>
            <Eyebrow>Who We Are</Eyebrow>
            <div className="story-visual-card tilt-card">
              <div className="tilt-card-glare" />
              <div className="story-visual-image">
                <img
                  src="/images/about-studio.webp"
                  alt="TREVIORA Technology Studio & Innovation Lab"
                  loading="lazy"
                  width="800"
                  height="600"
                />
              </div>
            </div>
          </div>
          <div className="story-main" data-reveal>
            <h2>Innovative Technology Company</h2>
            <p>TREVIORA is an emerging technology company driven by innovation, creativity, and engineering excellence.</p>
            <p>We specialize in Website and Web Application Development, Android Application Development, AI/ML Solutions and Automation, IoT Solutions, Custom Software Development, UI/UX and Digital Solutions, 3D Model Design / 3D Assets, and Graphics Design.</p>
            <p>Our vision is to transform ideas into intelligent digital solutions that create real-world impact through technology, quality, and continuous innovation.</p>
            <p>Every great company starts with a vision. TREVIORA was founded with the ambition of creating innovative technology solutions that combine creativity, intelligence, and modern engineering.</p>
            <p>As a growing startup, we are committed to continuous learning, exploring new technologies, and delivering high-quality digital experiences.</p>
          </div>
        </section>

        <section className="about-pillars section-pad">
          <div className="wrap">
            <SectionHeading title="Vision, Mission & Core Pillars" text="Our strategic direction, engineering standards, and measurable impact" />
          </div>
          <div className="wrap values-grid">
            <article className="value-card" data-reveal>
              <h3>Our Vision</h3>
              <p>To become a trusted global technology company creating intelligent digital solutions for the future.</p>
            </article>
            <article className="value-card" data-reveal>
              <h3>Our Mission</h3>
              <p>To deliver reliable, scalable, and innovative technology solutions while maintaining creativity, quality, and customer satisfaction.</p>
            </article>
          </div>

          <div className="wrap" style={{ marginTop: '32px' }}>
            <div className="about-pillars-grid" data-reveal>
              {[
                ['🎯', 'Our Mission & Story', 'Creative Digital Engineering'],
                ['👥', 'Meet the Leadership', 'Visionary Founders & CTO'],
                ['🌐', 'Global Standards', 'Enterprise Grade Delivery'],
                ['✉️', 'Direct Sales Team', 'Zero Intermediaries'],
              ].map(([icon, title, desc]) => (
                <div className="glass-pillar-card tilt-card" key={title}>
                  <div className="tilt-card-glare" />
                  <span className="glass-pillar-icon">{icon}</span>
                  <div>
                    <strong>{title}</strong>
                    <small>{desc}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="wrap">
            <div className="company-metrics-bar" data-reveal aria-label="TREVIORA Impact Numbers">
              <div className="metric-box">
                <strong data-count="7" data-suffix="+">7+</strong>
                <span>Core Services</span>
              </div>
              <div className="metric-box">
                <strong data-count="100" data-suffix="%">100%</strong>
                <span>Innovation & Dedication</span>
              </div>
              <div className="metric-box">
                <strong data-count="100" data-suffix="%">100%</strong>
                <span>Client Satisfaction</span>
              </div>
              <div className="metric-box">
                <strong data-count="24" data-suffix="/7">24/7</strong>
                <span>Technical Support</span>
              </div>
            </div>
          </div>
        </section>

        <section className="values-section section-pad">
          <div className="wrap">
            <SectionHeading eyebrow="Our Values" title="What Guides Us" text="The core principles that shape our culture and engineering mindset" />
            <div className="values-grid">
              {values.map(([icon, title, text]) => (
                <article className="value-card" key={title} data-reveal>
                  <span className="value-emoji">{icon}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-cta wrap">
          <h2>Let&apos;s Build Something Extraordinary Together</h2>
          <p>Innovation begins with a single idea. TREVIORA is ready to transform your vision into modern digital solutions.</p>
          <Link className="button button-primary" to="/contact">Contact Us <span>↗</span></Link>
        </section>
      </main>
      <Footer />
    </>
  )
}

/* ── Team Page ── */
function Team() {
  return (
    <>
      <PageHero
        eyebrow="Executive Leadership"
        title="Leadership Team"
        text="Meet the visionary leaders of TREVIORA who drive innovation, technology, engineering excellence and the future of intelligent digital solutions."
        image="/images/hero-collaboration.webp"
        badge="COLLABORATIVE LEADERSHIP"
        badgeIcon="👥"
        subBadge="Executive Founders & Strategic Advisory Board"
        actions={
          <>
            <Link className="button button-primary" to="/contact">Schedule Meeting <span>↗</span></Link>
            <Link className="button button-outline" to="/about">About Treviora</Link>
          </>
        }
      />
      <main>
        <section className="team-page section-pad wrap">
          <div className="profile-group">
            <div className="profile-group-heading">
              <Eyebrow>Executive Leadership</Eyebrow>
              <h2>Leadership Team</h2>
            </div>
            <TeamCards limit={3} />
          </div>
          <div className="profile-group">
            <div className="profile-group-heading">
              <Eyebrow>Board of Directors</Eyebrow>
              <h2>Board Members</h2>
            </div>
            <TeamCards boardOnly />
          </div>

          <div className="team-principles-section" data-reveal style={{ marginTop: '48px' }}>
            <SectionHeading eyebrow="Culture" title="Core Leadership Principles" text="The engineering principles that guide our technical decisions and execution" />
            <div className="team-principles-grid">
              {[
                ['Direct Sales Team Touch', 'Zero intermediate layers. You consult and communicate directly with our Sales Team and engineers.'],
                ['Engineering Rigor', 'Every codebase is built with production standards, clean architecture, and thorough unit testing.'],
                ['Radical Transparency', 'Clear scope breakdowns, milestone-driven billing, and real-time sprint visibility.'],
                ['Future-Ready Scalability', 'We build modern architectures designed to grow with your business without tech debt.'],
              ].map(([title, desc]) => (
                <div className="team-principle-card tilt-card" key={title}>
                  <div className="tilt-card-glare" />
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="partner-companies-section" data-reveal style={{ marginTop: '56px' }}>
            <SectionHeading
              eyebrow="Strategic Collaborations"
              title="Partner Companies"
              text="Creative studios and technology partners collaborating with TREVIORA INDUSTRY"
            />
            <div className="partner-companies-list">
              {[
                {
                  logoIndex: 0,
                  name: 'Rejish Design Studio',
                  role: 'Creative Design & Multimedia Partner',
                  description:
                    'Rejish Pandian is our creative design and multimedia partner, providing professional graphic design, video editing, motion graphics, and visual content production. Their creative expertise supports our branding, promotional materials, and multimedia requirements, ensuring high-quality visual communication across our projects.',
                  website: 'https://rejishpandian.framer.media/',
                },
                {
                  logoIndex: 1,
                  name: 'CEFABEX Innovation',
                  role: 'Technology & Innovation Partner',
                  description:
                    'CEFABEX Innovation collaborates with TREVIORA INDUSTRY on forward-thinking engineering, emerging technology initiatives, and next-generation digital innovation.',
                  website: null,
                },
                {
                  logoIndex: 2,
                  name: 'STONZ Animation Studio',
                  role: 'Animation & Game Development Partner',
                  description:
                    'STONZ Animation Studio is our creative animation and game development partner, specializing in anime development, 3D modelling, character design, and game development. Their team brings creative concepts to life through high-quality animations, detailed 3D assets, and immersive digital experiences, supporting our creative and development projects.',
                  website: 'https://share.google/2KoOI4bfW9xTfKgyx',
                },
              ].map((partner) => (
                <article className="partner-company-card tilt-card" key={partner.name}>
                  <div className="tilt-card-glare" />
                  <div className="partner-logo-stage">
                    <Suspense fallback={<div className="partner-logo-placeholder" />}>
                      <PartnerLogo3D logoIndex={partner.logoIndex} alt={`${partner.name} 3D Logo`} />
                    </Suspense>
                  </div>
                  <div className="partner-content-col">
                    <span className="partner-role-badge">{partner.role}</span>
                    <h3>{partner.name}</h3>
                    <p>{partner.description}</p>
                    <div className="partner-actions">
                      {partner.website ? (
                        <a
                          className="button button-primary"
                          href={partner.website}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Visit Website <span>↗</span>
                        </a>
                      ) : (
                        <span className="partner-coming-soon">Website: Link will be soon</span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

/* ── Service Directory Page ── */
function ServiceDirectory() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="What We Offer"
        text="Complete digital solutions engineered for your business success"
        image="/images/service-ai.webp"
        badge="8+ SPECIALIZED TECH DISCIPLINES"
        badgeIcon="🚀"
        subBadge="Web, Mobile, AI/ML, IoT, Software, UI/UX, 3D Models & Graphics"
        sceneVariant="services"
        actions={
          <>
            <Link className="button button-primary" to="/pricing">Explore Pricing <span>↗</span></Link>
            <Link className="button button-outline" to="/contact">Discuss Architecture</Link>
          </>
        }
      />
      <main>
        <section className="services-page section-pad wrap">
          <SectionHeading eyebrow="Comprehensive Offerings" title="Specialized Service Categories" text="Explore our end-to-end capabilities across software, intelligent systems, hardware, and creative design" />
          <ServiceCards />

          <section className="tech-architecture-section" data-reveal>
            <SectionHeading eyebrow="Technology Stacks" title="Engineering Ecosystem" text="Modern frameworks and platforms powering TREVIORA solutions" />
            <div className="tech-architecture-grid">
              {[
                ['💻', 'Web & Web Apps', 'React, Vite, Next.js, Modern CSS, WebGL'],
                ['📱', 'Android Applications', 'Kotlin, React Native, Flutter, Jetpack Compose'],
                ['🧠', 'AI/ML & Automation', 'Python, PyTorch, TensorFlow, NLP Models, Automation'],
                ['🌐', 'IoT & Embedded', 'ESP32, STM32, Arduino, MQTT, Cloud Telemetry'],
                ['⚙️', 'Custom Software', 'Node.js, Express, PostgreSQL, Microservices, REST APIs'],
                ['✨', 'UI/UX Solutions', 'Figma, Design Systems, Wireframing, UX Research'],
                ['🧊', '3D Model Design', 'Blender, 3D Modeling, PBR Materials, WebGL Assets'],
                ['🎨', 'Graphics Design', 'Vector Branding, Adobe Illustrator, Visual Media'],
              ].map(([icon, title, desc]) => (
                <div className="tech-arch-card tilt-card" key={title}>
                  <div className="tilt-card-glare" />
                  <span className="tech-arch-icon">{icon}</span>
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="source-home-cta" data-reveal style={{ marginTop: '70px' }}>
            <div>
              <h2>Have a Custom Project in Mind?</h2>
              <p>Consult with our sales team for a tailored technology stack and delivery timeline.</p>
            </div>
            <Link className="button button-primary" to="/contact">Get in Touch <span>↗</span></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

/* ── Service Category Details (Rich Visual Experience) ── */
function ServiceCategory({ slug }) {
  const service = services.find((item) => item.slug === slug)
  if (!service) return <NotFound />

  const serviceSpecs = {
    web: [
      ['⚡', 'High-Speed Architecture', 'Ultra-fast Vite and React SPA rendering with sub-second page loads.'],
      ['📱', 'Responsive & Mobile First', 'Flawless responsive behavior across desktop, tablet, and mobile.'],
      ['🔒', 'Secure & Scalable', 'Modern API endpoints, clean structure, and bank-grade security.'],
      ['🚀', 'SEO & Performance', 'Optimized semantic markup, rich metadata, and performance tuning.'],
    ],
    mobile: [
      ['📱', 'Android & Cross-Platform', 'Native performance using modern cross-platform mobile frameworks.'],
      ['⚡', 'Smooth 60 FPS UX', 'Fluid gesture-driven animations and intuitive touch interactions.'],
      ['🔄', 'Offline First Sync', 'Robust local database persistence with background cloud synchronization.'],
      ['🔔', 'Push Notifications', 'Real-time alert delivery and background message processing.'],
    ],
    ai: [
      ['🧠', 'Intelligent Models', 'Deep learning and machine learning algorithms tailored to business needs.'],
      ['📊', 'Predictive Analytics', 'Transform raw enterprise telemetry into actionable predictive insights.'],
      ['💬', 'NLP & Smart Agents', 'Intelligent conversational interfaces and custom language models.'],
      ['⚙️', 'Automated Workflows', 'End-to-end cognitive automation reducing manual operational latency.'],
    ],
    iot: [
      ['🌐', 'Hardware Interfacing', 'Microcontroller integration with ESP32, STM32, and Arduino.'],
      ['📡', 'Real-Time Telemetry', 'MQTT and WebSocket streaming of sensor data to cloud dashboards.'],
      ['⚡', 'Industrial Automation', 'Reliable relay control and sensor monitoring for harsh environments.'],
      ['🔒', 'Encrypted Telemetry', 'Secure device-to-cloud payload encryption and authentication.'],
    ],
    software: [
      ['⚙️', 'Bespoke Architecture', 'Tailor-made software architectures engineered for enterprise scale.'],
      ['🔗', 'REST & GraphQL APIs', 'High-throughput backend endpoints with comprehensive documentation.'],
      ['🗄️', 'Database Engineering', 'Robust relational & NoSQL schemas optimized for speed and integrity.'],
      ['🛡️', 'Enterprise Security', 'End-to-end encryption, role-based access control, and audit logging.'],
    ],
    uiux: [
      ['✨', 'Human-Centered Research', 'User journey mapping, personas, and actionable behavioral insights.'],
      ['🎨', 'Design Systems & Tokens', 'Scalable component libraries built with Figma for design consistency.'],
      ['📱', 'Interactive Prototyping', 'High-fidelity clickable prototypes that replicate production dynamics.'],
      ['♿', 'Accessibility & Usability', 'WCAG 2.1 AA compliant typography, contrast, and navigation standards.'],
    ],
    '3d-design': [
      ['🧊', 'High-Poly & Low-Poly', 'Detailed 3D modeling for web visualization, games, and product mockups.'],
      ['✨', 'Photorealistic Texturing', 'PBR materials, realistic lighting simulations, and texture baking.'],
      ['🎮', 'Real-Time WebGL Assets', 'Optimized GLTF/GLB models calibrated for interactive 3D web rendering.'],
      ['📐', 'Industrial & Product 3D', 'Precision CAD-aligned modeling for prototyping and manufacturing.'],
    ],
    graphics: [
      ['🎨', 'Brand Identity Systems', 'Memorable logos, color palettes, and comprehensive brand books.'],
      ['📐', 'Vector Iconography', 'Pixel-perfect digital assets for web, mobile, and print applications.'],
      ['📱', 'Social Media Creatives', 'High-converting social graphics, promotional banners, and ads.'],
      ['🚀', 'Marketing Collateral', 'Brochures, posters, business cards, and packaging mockups.'],
    ],
    ppt: [
      ['🎨', 'Executive Pitch Decks', 'Investor-ready presentations designed to command attention.'],
      ['📊', 'Data Visualization', 'Complex statistics turned into compelling charts and infographics.'],
      ['✨', 'Dynamic Transitions', 'Subtle motion design and modern typography hierarchy.'],
      ['💼', 'Brand Cohesion', '100% adherence to corporate visual identity and typography standards.'],
    ],
    video: [
      ['🎬', 'Cinematic 4K Editing', 'High-definition color grading, pacing, and multi-cam cutting.'],
      ['✨', 'Motion Graphics', 'Sleek animated title cards, kinetic typography, and visual effects.'],
      ['🔊', 'Audio Mastering', 'Crisp voice cleanup, sound design, and background score mixing.'],
      ['📱', 'Social Reels & Shorts', 'Engaging vertical formats optimized for Instagram, YouTube, and TikTok.'],
    ],
  }[slug] || [
    ['⚡', 'Custom Engineering', 'Bespoke solutions crafted to your technical requirements.'],
    ['🎯', 'Quality Standards', 'Rigorous testing and peer review on every deliverable.'],
    ['🚀', 'Rapid Turnaround', 'Efficient delivery with proactive milestone updates.'],
    ['🤝', 'Dedicated Support', 'Direct engineer communication from concept to deployment.'],
  ]

  const featureChecklist = {
    web: ['Custom React Architecture', 'Mobile Touch Optimization', 'Fast API Integration', 'Production Deployment'],
    mobile: ['Cross-Platform Codebase', 'Material & Cupertino UX', 'App Store / Play Store Prep', 'Real-time Database'],
    ai: ['Custom Model Architecture', 'Python & PyTorch Stack', 'API Inference Endpoints', 'Data Pipeline Processing'],
    iot: ['Sensor & Relay Firmware', 'MQTT Cloud Telemetry', 'Live Web Dashboard', 'Circuit Schematics'],
    software: ['Custom Backend Architecture', 'Automated Testing & CI/CD', 'Scalable Database Design', 'API Documentation'],
    uiux: ['Figma Design System', 'Wireframing & Prototyping', 'User Testing & Heatmaps', 'WCAG AA Compliance'],
    '3d-design': ['Photorealistic PBR Materials', 'GLTF/GLB Web Optimization', 'Custom Mesh Topology', 'Turnaround 4K Renders'],
    graphics: ['Vector Logo Design', 'Brand Guidelines', 'Social Media Assets', 'Print Ready CMYK Files'],
    ppt: ['Investor Pitch Decks', 'Corporate Keynotes', 'Infographic Design', 'Custom Slide Master'],
    video: ['4K Video Editing', 'Color Correction', 'Sound Design & SFX', 'Motion Graphic Titles'],
  }[slug] || ['Custom Solution Design', 'Iterative Milestones', 'Dedicated Project Manager', 'Deployment Assistance']

  return (
    <>
      <PageHero
        eyebrow={`Service 0${services.findIndex(s => s.slug === slug) + 1} / ${service.title}`}
        title={service.pageTitle}
        text={service.subtitle}
        image={service.image}
        badge={`VERIFIED ${service.title.toUpperCase()} ARCHITECTURE`}
        badgeIcon={service.icon}
        subBadge="Enterprise Grade Delivery & 100% Quality Tested"
        actions={
          <>
            <Link className="button button-primary" to="/contact">Get Consultation <span>↗</span></Link>
            <Link className="button button-outline" to="/pricing">View Plans</Link>
          </>
        }
      />
      <main>
        <section className="service-detail-section wrap">
          <div className="service-detail-grid">
            <div className="service-detail-copy" data-reveal>
              <Eyebrow>Overview & Capabilities</Eyebrow>
              <h2>State-of-the-Art {service.title} Solutions</h2>
              <p>
                At TREVIORA INDUSTRY, our {service.title.toLowerCase()} service combines cutting-edge engineering, creative design, and robust architecture to deliver high-performance solutions tailored to your business objectives.
              </p>
              <p>
                Every project is crafted with modern standards, rigorous testing, and direct Sales Team coordination for maximum reliability.
              </p>

              <div className="service-feature-checklist">
                {featureChecklist.map((feat) => (
                  <div className="service-check-item" key={feat}>
                    <span>✓</span>
                    <strong>{feat}</strong>
                  </div>
                ))}
              </div>

              <div className="service-detail-actions">
                <Link className="button button-primary" to="/contact">Get Consultation <span>↗</span></Link>
                <Link className="button button-outline" to="/pricing">View Pricing</Link>
              </div>
            </div>

            <div className="service-detail-visual tilt-card detail-visual-arrive" data-reveal>
              <div className="tilt-card-glare" />
              <div className="service-visual-frame">
                <img
                  src={service.image}
                  alt={`${service.title} - ${service.subtitle}`}
                  loading="lazy"
                  width="1000"
                  height="750"
                />
              </div>
            </div>
          </div>

          <div className="service-specs-block" data-reveal>
            <SectionHeading eyebrow="Specifications" title="Technical Architecture" text="Key engineering capabilities that set our solutions apart" />
            <div className="service-specs-grid">
              {serviceSpecs.map(([icon, title, desc]) => (
                <article className="service-spec-card tilt-card" key={title}>
                  <div className="tilt-card-glare" />
                  <span className="spec-icon">{icon}</span>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="service-roadmap-section" data-reveal>
            <SectionHeading eyebrow="Methodology" title="End-to-End Delivery Roadmap" text="Our structured engineering lifecycle ensuring excellence and on-time delivery" />
            <div className="service-roadmap-grid">
              {[
                ['Architectural Blueprint', 'Detailed requirement scoping, technical schematics, and UI/UX wireframes.'],
                ['Agile Engineering Sprint', 'Rapid iterative development with weekly milestones and transparent progress.'],
                ['Rigorous Automated QA', 'Performance benchmarking, security testing, and cross-device responsiveness.'],
                ['Production Handover', 'Seamless cloud deployment, comprehensive documentation, and 30-day support.'],
              ].map(([stepTitle, stepDesc]) => (
                <div className="service-roadmap-step tilt-card" key={stepTitle}>
                  <div className="tilt-card-glare" />
                  <h4>{stepTitle}</h4>
                  <p>{stepDesc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="source-home-cta" data-reveal style={{ marginTop: '60px' }}>
            <div>
              <h2>Ready to Start Your {service.title} Project?</h2>
              <p>Discuss your specifications directly with our sales team for a tailored quote.</p>
            </div>
            <Link className="button button-primary" to="/contact">Contact Our Team <span>↗</span></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

/* ── Projects Page with Rich Case Studies ── */
function Projects() {
  const initialProjects = useMemo(() => [
    {
      title: 'Next-Gen Reactive Cloud Web Portal',
      category: 'Website and Web Application Development',
      description: 'Ultra-fast single page web architecture with interactive GSAP animations and sub-second load times.',
      image: '/images/service-web-development.webp',
      tags: ['React', 'Vite', 'Node.js', 'Tailwind'],
      slug: 'web',
    },
    {
      title: 'Cross-Platform Android Fleet Suite',
      category: 'Android Application Development',
      description: 'Intuitive mobile application for Android with real-time telemetry sync, push alerts, and offline caching.',
      image: '/images/service-mobile-apps.webp',
      tags: ['Android', 'Kotlin', 'Firebase', 'Mobile UX'],
      slug: 'mobile',
    },
    {
      title: 'Enterprise AI/ML Telemetry Engine',
      category: 'AI/ML Solutions and Automation',
      description: 'Neural pattern recognition and real-time smart analytics platform built for cognitive process automation.',
      image: '/images/service-ai.webp',
      tags: ['Python', 'TensorFlow', 'FastAPI', 'Automation'],
      slug: 'ai',
    },
    {
      title: 'Smart Industrial IoT Controller',
      category: 'IoT Solutions',
      description: 'Embedded microcontroller architecture with sensor monitoring, cloud telemetry, and industrial relay triggers.',
      image: '/images/service-iot.webp',
      tags: ['ESP32', 'MQTT', 'Embedded C', 'Hardware'],
      slug: 'iot',
    },
    {
      title: 'Distributed Custom Enterprise Platform',
      category: 'Custom Software Development',
      description: 'Bespoke enterprise backend platform with microservice architecture, REST APIs, and automated data pipelines.',
      image: '/images/service-custom-software.webp',
      tags: ['Node.js', 'PostgreSQL', 'Microservices', 'REST API'],
      slug: 'software',
    },
    {
      title: 'Modern Design System & Interactive UI/UX',
      category: 'UI/UX and Digital Solutions',
      description: 'Comprehensive design system, Figma component tokens, interactive wireframe prototypes, and usability testing.',
      image: '/images/service-uiux.webp',
      tags: ['Figma', 'UI/UX', 'Design System', 'Prototypes'],
      slug: 'uiux',
    },
    {
      title: 'Photorealistic 3D Spatial Models & Assets',
      category: '3D Model Design / 3D Assets',
      description: 'High-fidelity 3D modeling, PBR textures, spatial assets, and WebGL-optimized assets for immersive digital environments.',
      image: '/images/service-3d-model.webp',
      tags: ['Blender', '3D Modeling', 'WebGL', 'PBR Assets'],
      slug: '3d-design',
    },
    {
      title: 'Corporate Brand & Vector Design System',
      category: 'Graphics Design',
      description: 'Modern visual design system including vector iconography, logo identity, and promotional marketing creatives.',
      image: '/images/service-design.webp',
      tags: ['Branding', 'Vector', 'Illustrator', 'Visual Design'],
      slug: 'graphics',
    },
  ], [])

  const [projects, setProjects] = useState(initialProjects)
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    let cancelled = false
    fetchPublishedProjects()
      .then((rows) => {
        if (!cancelled && Array.isArray(rows) && rows.length > 0) {
          setProjects(rows.map((row) => ({
            id: row.id,
            title: row.title,
            category: row.category,
            description: row.description,
            image: row.image_url || '/images/service-web-development.webp',
            tags: Array.isArray(row.tags) ? row.tags : [],
            slug: row.slug || 'web',
            project_url: row.project_url || '',
            featured: Boolean(row.featured),
          })))
        }
      })
      .catch(() => {
        // Keep curated fallback list if database is temporarily unreachable
      })
    return () => {
      cancelled = true
    }
  }, [initialProjects])

  const categoryFilters = useMemo(() => {
    const unique = Array.from(new Set(projects.map((item) => item.category).filter(Boolean)))
    return ['All', ...unique]
  }, [projects])

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((item) => item.category === activeCategory)

  return (
    <>
      <PageHero
        eyebrow="Our Portfolio"
        title="TREVIORA PROJECTS"
        text="Discover our portfolio of innovative solutions, AI systems, software applications and digital creative works."
        image="/images/service-web-development.webp"
        badge="PRODUCTION CASE STUDIES"
        badgeIcon="📁"
        subBadge="High-Performance Systems Built For Scale"
        actions={
          <>
            <Link className="button button-primary" to="/contact">Start Your Project <span>↗</span></Link>
            <Link className="button button-outline" to="/pricing">Pricing Plans</Link>
          </>
        }
      />
      <main>
        <section className="projects-section section-pad wrap">
          <SectionHeading eyebrow="Categories" title="Project Categories" text="Explore our work across diverse technology domains" />
          <div className="project-category-grid">
            {projectCategories.map(([slug, title, description]) => (
              <Link className="project-category-card tilt-card" to={`/${slug}`} key={slug}>
                <div className="tilt-card-glare" />
                <h3>{title}</h3>
                <p>{description}</p>
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>

          <section className="recent-projects" data-reveal style={{ marginTop: '60px' }}>
            <SectionHeading eyebrow="Showcase" title="Featured Case Studies" text="Explore our live deployments and showcased applications across technology domains" />
            <div className="mobile-swipe-hint" aria-hidden="true">
              <span>⇄ Swipe to explore case studies</span>
            </div>
            {categoryFilters.length > 2 && (
              <div className="project-filter-bar" role="tablist" aria-label="Filter projects by category">
                {categoryFilters.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`project-filter-chip${activeCategory === cat ? ' is-active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            <div className="projects-showcase-grid">
              {filteredProjects.map((project) => {
                const safeProjectUrl = sanitizeUrl(project.project_url, '')
                const safeImageUrl = sanitizeUrl(project.image, '/images/service-web-development.webp')
                const isExternalUrl = Boolean(safeProjectUrl && /^https?:\/\//i.test(safeProjectUrl))
                const cardContent = (
                  <>
                    <div className="tilt-card-glare" />
                    <div className="project-card-image">
                      <img src={safeImageUrl} alt={project.title} loading="lazy" width="800" height="530" />
                      <div className="card-hover-action" aria-hidden="true">
                        <span>{isExternalUrl ? 'Open Live Project' : 'View Architecture'}</span>
                        <b>↗</b>
                      </div>
                    </div>
                    <div className="project-card-body">
                      <span className="project-card-category">{project.category}</span>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <div className="project-tags">
                        {(project.tags || []).map((tag) => (
                          <span className="project-tag" key={tag}>{tag}</span>
                        ))}
                      </div>
                      <span className="project-card-link">{isExternalUrl ? 'View Live Deployment ↗' : 'Explore Service ↗'}</span>
                    </div>
                  </>
                )

                return isExternalUrl ? (
                  <a
                    href={safeProjectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-showcase-card tilt-card"
                    key={project.id || project.title}
                  >
                    {cardContent}
                  </a>
                ) : (
                  <Link
                    to={`/${project.slug || 'web'}`}
                    className="project-showcase-card tilt-card"
                    key={project.id || project.title}
                  >
                    {cardContent}
                  </Link>
                )
              })}
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </>
  )
}

/* ── Dedicated Database-Backed Admin CRUD Portal ── */
const EMPTY_PROJECT_FORM = {
  id: null,
  title: '',
  category: 'Website and Web Application Development',
  slug: 'web',
  description: '',
  image_url: '/images/service-web-development.webp',
  project_url: '',
  tagsText: 'React, Vite, Node.js',
  status: 'published',
  featured: true,
}

const DOMAIN_IMAGE_PRESETS = [
  ['/images/service-web-development.webp', 'Web Development Visual'],
  ['/images/service-mobile-apps.webp', 'Android App Visual'],
  ['/images/service-ai.webp', 'AI / ML Visual'],
  ['/images/service-iot.webp', 'IoT Hardware Visual'],
  ['/images/service-custom-software.webp', 'Custom Software Visual'],
  ['/images/service-uiux.webp', 'UI/UX Design Visual'],
  ['/images/service-3d-model.webp', '3D Model Visual'],
  ['/images/service-design.webp', 'Graphics Design Visual'],
]

function AdminPortal() {
  const [credentials, setCredentials] = useState(null)
  const [usernameInput, setUsernameInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [authLoading, setAuthLoading] = useState(false)
  const [authError, setAuthError] = useState('')
  const [activeTab, setActiveTab] = useState('projects')
  const [projects, setProjects] = useState([])
  const [inquiries, setInquiries] = useState([])
  const [dataLoading, setDataLoading] = useState(false)
  const [statusBanner, setStatusBanner] = useState('')
  const [rpcMissing, setRpcMissing] = useState(false)
  const [formState, setFormState] = useState(EMPTY_PROJECT_FORM)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploadingImage, setIsUploadingImage] = useState(false)

  const loadAdminData = async (username, password) => {
    setDataLoading(true)
    setStatusBanner('')
    setRpcMissing(false)
    try {
      const [projRows, inqRows] = await Promise.all([
        adminListProjects(username, password),
        adminListInquiries(username, password),
      ])
      setProjects(Array.isArray(projRows) ? projRows : [])
      setInquiries(Array.isArray(inqRows) ? inqRows : [])
      setIsUnlocked(true)
    } catch (err) {
      const msg = err?.message || 'Unable to load admin records.'
      if (/404|could not find the function|verify_admin_credentials|admin_list/i.test(msg)) {
        setRpcMissing(true)
      }
      setStatusBanner(msg)
    } finally {
      setDataLoading(false)
    }
  }

  useEffect(() => {
    try {
      sessionStorage.removeItem('treviora_admin_auth')
    } catch { /* ignore */ }
  }, [])

  const handleUnlock = async (event) => {
    event.preventDefault()
    const rate = checkRateLimit('admin_login', 5, 5 * 60 * 1000)
    if (!rate.allowed) {
      setAuthError(`Too many login attempts. Please wait ${rate.retryAfterSec}s before trying again.`)
      return
    }
    const cleanUser = sanitizeText(usernameInput, 64)
    const cleanPass = String(passwordInput || '').trim().slice(0, 128)
    if (!cleanUser || !cleanPass) {
      setAuthError('Username and password are required.')
      return
    }
    setAuthLoading(true)
    setAuthError('')
    setRpcMissing(false)
    try {
      const valid = await verifyAdminCredentials(cleanUser, cleanPass)
      if (!valid) {
        setAuthError('Invalid admin username or password. Please verify your credentials.')
        return
      }
      resetRateLimit('admin_login')
      const nextCreds = { username: cleanUser, password: cleanPass }
      setCredentials(nextCreds)
      setPasswordInput('')
      await loadAdminData(cleanUser, cleanPass)
    } catch (err) {
      const msg = err?.message || 'Authentication service failed.'
      if (/404|could not find the function|verify_admin_credentials/i.test(msg)) {
        setRpcMissing(true)
        setAuthError('Admin backend service is not configured yet.')
      } else {
        setAuthError(msg)
      }
    } finally {
      setAuthLoading(false)
    }
  }

  const handleLock = () => {
    setCredentials(null)
    setIsUnlocked(false)
    setProjects([])
    setInquiries([])
    setFormState(EMPTY_PROJECT_FORM)
    setStatusBanner('')
  }

  const handleImageFileChange = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const fileCheck = validateImageFile(file)
    if (!fileCheck.ok) {
      setStatusBanner(fileCheck.error)
      return
    }
    setIsUploadingImage(true)
    setStatusBanner('')
    try {
      const publicUrl = await uploadProjectImage(file)
      setFormState((prev) => ({ ...prev, image_url: publicUrl }))
      setStatusBanner('Image uploaded cleanly to storage.')
    } catch (err) {
      setStatusBanner(`Image upload failed: ${err?.message || 'Unable to upload image.'}`)
    } finally {
      setIsUploadingImage(false)
    }
  }

  const handleSaveProject = async (event) => {
    event.preventDefault()
    if (!credentials?.username || !credentials?.password) return
    setIsSaving(true)
    setStatusBanner('')
    try {
      const tags = formState.tagsText
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
      const saved = await adminUpsertProject(credentials.username, credentials.password, {
        id: formState.id,
        title: formState.title.trim(),
        category: formState.category,
        slug: formState.slug,
        description: formState.description.trim(),
        image_url: formState.image_url.trim(),
        project_url: formState.project_url.trim(),
        tags,
        status: formState.status,
        featured: formState.featured,
      })
      setProjects((prev) => {
        const exists = prev.some((p) => p.id === saved.id)
        const next = exists ? prev.map((p) => (p.id === saved.id ? saved : p)) : [saved, ...prev]
        return next.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
      })
      setFormState(EMPTY_PROJECT_FORM)
      setStatusBanner(
        formState.id
          ? `"${saved.title}" updated in Supabase database and live on the website!`
          : `"${saved.title}" uploaded to Supabase database and published live on the website!`
      )
    } catch (err) {
      setStatusBanner(`Save failed: ${err?.message || 'Could not save project to Supabase.'}`)
    } finally {
      setIsSaving(false)
    }
  }

  const handleEditProject = (proj) => {
    setActiveTab('projects')
    setFormState({
      id: proj.id,
      title: proj.title || '',
      category: proj.category || 'Website and Web Application Development',
      slug: proj.slug || 'web',
      description: proj.description || '',
      image_url: proj.image_url || '/images/service-web-development.webp',
      project_url: proj.project_url || '',
      tagsText: Array.isArray(proj.tags) ? proj.tags.join(', ') : '',
      status: proj.status || 'published',
      featured: Boolean(proj.featured),
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleToggleProjectStatus = async (proj) => {
    if (!credentials?.username || !credentials?.password) return
    const nextStatus = proj.status === 'published' ? 'draft' : 'published'
    setStatusBanner('')
    try {
      const updated = await adminUpsertProject(credentials.username, credentials.password, {
        ...proj,
        status: nextStatus,
      })
      setProjects((prev) => prev.map((item) => (item.id === updated.id ? updated : item)))
      setStatusBanner(`"${updated.title}" marked as ${nextStatus}.`)
    } catch (err) {
      setStatusBanner(`Status update failed: ${err?.message || 'Could not update status.'}`)
    }
  }

  const handleDeleteProject = async (proj) => {
    if (!credentials?.username || !credentials?.password) return
    if (!window.confirm(`Delete "${proj.title}" permanently from Supabase database?`)) return
    setStatusBanner('')
    try {
      await adminDeleteProject(credentials.username, credentials.password, proj.id)
      setProjects((prev) => prev.filter((item) => item.id !== proj.id))
      if (formState.id === proj.id) setFormState(EMPTY_PROJECT_FORM)
      setStatusBanner(`Deleted "${proj.title}" from Supabase database.`)
    } catch (err) {
      setStatusBanner(`Delete failed: ${err?.message || 'Could not delete project.'}`)
    }
  }

  return (
    <>
      <PageHero
        title={<>TREVIORA <span className="hero-accent">Admin Portal</span></>}
        text="Upload new projects, modify existing case studies, toggle live visibility, delete entries, and view client inquiries backed by Supabase."
      />
      <main>
        <section className="admin-portal section-pad wrap">
          {!isUnlocked ? (
            <div className="admin-login-card">
              <span className="admin-backend-pill">Database-Backed Admin Authentication</span>
              <h2>Admin Portal Sign In</h2>
              <p>Sign in with your Supabase-verified administrator username and password to manage live portfolio projects.</p>
              {rpcMissing && (
                <div className="admin-alert is-warning">
                  Admin backend service is unavailable. Please contact the system administrator.
                </div>
              )}
              <form className="admin-login-form" onSubmit={handleUnlock}>
                <label>
                  Username
                  <input
                    type="text"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    placeholder="Enter admin username"
                    autoComplete="username"
                    required
                    autoFocus
                  />
                </label>
                <label>
                  Password
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter admin password"
                    autoComplete="current-password"
                    required
                  />
                </label>
                <button type="submit" className="button button-primary" disabled={authLoading}>
                  {authLoading ? 'Verifying with Database...' : 'Sign In to Admin Portal'} <span>↗</span>
                </button>
              </form>
              {authError && <p className="admin-alert is-error" role="alert">{authError}</p>}
            </div>
          ) : (
            <div className="admin-workspace">
              <div className="admin-toolbar">
                <div className="admin-tabs" role="tablist">
                  <button
                    type="button"
                    className={`project-filter-chip${activeTab === 'projects' ? ' is-active' : ''}`}
                    onClick={() => setActiveTab('projects')}
                  >
                    Projects ({projects.length})
                  </button>
                  <button
                    type="button"
                    className={`project-filter-chip${activeTab === 'inquiries' ? ' is-active' : ''}`}
                    onClick={() => setActiveTab('inquiries')}
                  >
                    Inquiries ({inquiries.length})
                  </button>
                  <span className="admin-backend-pill">Signed in as {credentials?.username} • Supabase Live</span>
                </div>
                <div className="admin-toolbar-actions">
                  <button
                    type="button"
                    className="button button-outline"
                    onClick={() => loadAdminData(credentials.username, credentials.password)}
                    disabled={dataLoading}
                  >
                    {dataLoading ? 'Syncing...' : 'Refresh DB'}
                  </button>
                  {IS_ADMIN_HOST ? (
                    <a className="button button-outline" href={`${PUBLIC_SITE_URL}/work`} target="_blank" rel="noreferrer">
                      View Website Portfolio ↗
                    </a>
                  ) : (
                    <Link className="button button-outline" to="/work">View Website Portfolio ↗</Link>
                  )}
                  <button type="button" className="button button-outline" onClick={handleLock}>Sign Out</button>
                </div>
              </div>

              {statusBanner && <div className="admin-alert is-info" role="status">{statusBanner}</div>}
              {rpcMissing && (
                <div className="admin-alert is-warning">
                  Admin backend endpoints are currently unavailable.
                </div>
              )}

              {activeTab === 'projects' ? (
                <div className="admin-grid">
                  <form className="admin-form-card" onSubmit={handleSaveProject}>
                    <h3>{formState.id ? 'Modify Existing Project' : 'Upload New Project'}</h3>
                    <label>
                      Project Title
                      <input
                        type="text"
                        value={formState.title}
                        onChange={(e) => setFormState((prev) => ({ ...prev, title: e.target.value }))}
                        placeholder="e.g., Autonomous Retail Analytics Portal"
                        required
                      />
                    </label>
                    <div className="admin-form-row">
                      <label>
                        Category
                        <select
                          value={formState.category}
                          onChange={(e) => setFormState((prev) => ({ ...prev, category: e.target.value }))}
                        >
                          <option value="Website and Web Application Development">Website and Web Application Development</option>
                          <option value="Android Application Development">Android Application Development</option>
                          <option value="AI/ML Solutions and Automation">AI/ML Solutions and Automation</option>
                          <option value="IoT Solutions">IoT Solutions</option>
                          <option value="Custom Software Development">Custom Software Development</option>
                          <option value="UI/UX and Digital Solutions">UI/UX and Digital Solutions</option>
                          <option value="3D Model Design / 3D Assets">3D Model Design / 3D Assets</option>
                          <option value="Graphics Design">Graphics Design</option>
                        </select>
                      </label>
                      <label>
                        Service Route
                        <select
                          value={formState.slug}
                          onChange={(e) => setFormState((prev) => ({ ...prev, slug: e.target.value }))}
                        >
                          <option value="web">/web</option>
                          <option value="mobile">/mobile</option>
                          <option value="ai">/ai</option>
                          <option value="iot">/iot</option>
                          <option value="software">/software</option>
                          <option value="uiux">/uiux</option>
                          <option value="3d-design">/3d-design</option>
                          <option value="graphics">/graphics</option>
                        </select>
                      </label>
                    </div>
                    <label>
                      Project Description
                      <textarea
                        rows="3"
                        value={formState.description}
                        onChange={(e) => setFormState((prev) => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe architecture, tech stack, and client impact..."
                        required
                      />
                    </label>
                    <div className="admin-form-row">
                      <label>
                        Upload Image (Supabase Storage)
                        <input type="file" accept="image/*" onChange={handleImageFileChange} disabled={isUploadingImage} />
                      </label>
                      <label>
                        Quick Domain Image Preset
                        <select
                          value={DOMAIN_IMAGE_PRESETS.some(([url]) => url === formState.image_url) ? formState.image_url : ''}
                          onChange={(e) => {
                            if (e.target.value) setFormState((prev) => ({ ...prev, image_url: e.target.value }))
                          }}
                        >
                          <option value="">Custom / Uploaded URL</option>
                          {DOMAIN_IMAGE_PRESETS.map(([url, label]) => (
                            <option key={url} value={url}>{label}</option>
                          ))}
                        </select>
                      </label>
                    </div>
                    <label>
                      Image URL
                      <input
                        type="text"
                        value={formState.image_url}
                        onChange={(e) => setFormState((prev) => ({ ...prev, image_url: e.target.value }))}
                        placeholder="/images/service-web-development.webp"
                        required
                      />
                    </label>
                    {formState.image_url && (
                      <div className="admin-image-preview">
                        <img src={formState.image_url} alt="Selected project preview" />
                      </div>
                    )}
                    <label>
                      Live Project URL (optional)
                      <input
                        type="url"
                        value={formState.project_url}
                        onChange={(e) => setFormState((prev) => ({ ...prev, project_url: e.target.value }))}
                        placeholder="https://example.com"
                      />
                    </label>
                    <div className="admin-form-row">
                      <label>
                        Tags (comma separated)
                        <input
                          type="text"
                          value={formState.tagsText}
                          onChange={(e) => setFormState((prev) => ({ ...prev, tagsText: e.target.value }))}
                          placeholder="React, FastAPI, PostgreSQL"
                        />
                      </label>
                      <label>
                        Status
                        <select
                          value={formState.status}
                          onChange={(e) => setFormState((prev) => ({ ...prev, status: e.target.value }))}
                        >
                          <option value="published">Published (Live on Website)</option>
                          <option value="draft">Draft (Admin Only)</option>
                        </select>
                      </label>
                    </div>
                    <label className="admin-checkbox-label">
                      <input
                        type="checkbox"
                        checked={formState.featured}
                        onChange={(e) => setFormState((prev) => ({ ...prev, featured: e.target.checked }))}
                      />
                      <span>Feature prominently in portfolio</span>
                    </label>
                    <div className="admin-form-actions">
                      <button type="submit" className="button button-primary" disabled={isSaving || isUploadingImage}>
                        {isSaving ? 'Saving to Database...' : formState.id ? 'Save Changes' : 'Upload & Publish Project'} <span>↗</span>
                      </button>
                      {formState.id && (
                        <button
                          type="button"
                          className="button button-outline"
                          onClick={() => setFormState(EMPTY_PROJECT_FORM)}
                        >
                          Cancel Edit
                        </button>
                      )}
                    </div>
                  </form>

                  <div className="admin-list-card">
                    <h3>Database Projects ({projects.length})</h3>
                    {dataLoading ? (
                      <p className="admin-muted">Loading projects from Supabase...</p>
                    ) : projects.length === 0 ? (
                      <p className="admin-muted">No projects found in database yet. Upload your first project using the form.</p>
                    ) : (
                      <div className="admin-project-list">
                        {projects.map((proj) => (
                          <article className="admin-project-row" key={proj.id}>
                            <img src={proj.image_url || '/images/service-web-development.webp'} alt={proj.title} />
                            <div className="admin-project-meta">
                              <div className="admin-project-head">
                                <strong>{proj.title}</strong>
                                <span className={`admin-status-badge ${proj.status === 'published' ? 'is-live' : 'is-draft'}`}>
                                  {proj.status || 'published'}
                                </span>
                              </div>
                              <small>{proj.category} · /{proj.slug || 'web'}</small>
                              <p>{proj.description}</p>
                            </div>
                            <div className="admin-row-actions">
                              <button type="button" className="button button-outline" onClick={() => handleEditProject(proj)}>
                                Edit
                              </button>
                              <button type="button" className="button button-outline" onClick={() => handleToggleProjectStatus(proj)}>
                                {proj.status === 'published' ? 'Set Draft' : 'Publish'}
                              </button>
                              <button type="button" className="button button-danger" onClick={() => handleDeleteProject(proj)}>
                                Delete
                              </button>
                            </div>
                          </article>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="admin-list-card">
                  <h3>Submitted Client Inquiries ({inquiries.length})</h3>
                  {inquiries.length === 0 ? (
                    <p className="admin-muted">No inquiries recorded yet.</p>
                  ) : (
                    <div className="admin-inquiries-list">
                      {inquiries.map((inq) => (
                        <article className="admin-inquiry-card" key={inq.id}>
                          <div className="admin-project-head">
                            <strong>{inq.full_name} · {inq.subject}</strong>
                            <small>{new Date(inq.created_at).toLocaleString()}</small>
                          </div>
                          <p className="admin-inquiry-email">{inq.email} {inq.service_interest ? `• ${inq.service_interest}` : ''}</p>
                          <p>{inq.message}</p>
                        </article>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}

/* ── Team Member Details ── */
function TeamMember({ profileSlug }) {
  const { slug } = useParams()
  const currentSlug = profileSlug || slug
  const person = people.find((member) => member.slug === currentSlug || member.route.slice(1) === currentSlug)
  if (!person) return <NotFound />

  const renderParagraph = ({ text, emphasis = [] }) => {
    if (!emphasis.length) return text
    const pattern = new RegExp(`(${emphasis.map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g')
    return text.split(pattern).map((part, index) => emphasis.includes(part) ? <strong key={index}>{part}</strong> : part)
  }

  return (
    <>
      <main className="profile-detail">
        <section className="profile-detail-hero section-pad wrap">
          <div className="profile-detail-copy detail-copy-arrive" data-reveal>
            <Eyebrow>{person.role}</Eyebrow>
            <h1>
              <WordReveal text={person.name} splitChars />
            </h1>
            <h3>{person.title}</h3>
            <p>{person.intro}</p>
            <div className="profile-stats">
              {person.stats.map(([value, label]) => (
                <div key={label}>
                  <strong data-count={String(value).replace(/[^0-9.]/g, '') || '0'} data-suffix={String(value).replace(/[0-9.]/g, '') || ''}>
                    {value}
                  </strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="profile-detail-image detail-visual-arrive" data-reveal>
            <img src={person.image} alt={`${person.name} - ${person.title}`} />
          </div>
        </section>

        <section className="profile-about section-pad">
          <div className="wrap">
            <SectionHeading eyebrow="About" title={person.aboutTitle} />
            <div className="profile-prose">
              {person.paragraphs.map((paragraph, index) => (
                <p key={index}>{renderParagraph(paragraph)}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="profile-skills section-pad wrap">
          <SectionHeading eyebrow="Core Skills" title="Professional Expertise" text="The skills that drive TREVIORA's engineering excellence" />
          <div className="profile-skill-grid">
            {person.skills.map((skill) => (
              <article className="profile-skill-card tilt-card" key={skill.name}>
                <div className="tilt-card-glare" />
                <span className="service-icon">{skill.name}</span>
                <h3>{skill.name}</h3>
                <p>{skill.description}</p>
                <div>
                  {skill.tags.map((tag) => (
                    <span className="skill-tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="profile-proficiency section-pad">
          <div className="wrap">
            <SectionHeading eyebrow="Skill Levels" title="Technical Proficiency" text="Demonstrated domain expertise and technical capabilities" />
            <div className="proficiency-grid">
              {person.proficiency.map(([skill, percent]) => (
                <div className="proficiency-item" key={skill}>
                  <div>
                    <span>{skill}</span>
                    <strong data-count={percent.replace('%', '')} data-suffix="%">{percent}</strong>
                  </div>
                  <div className="proficiency-track">
                    <span data-width={percent} style={{ width: '0%' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="profile-vision section-pad wrap">
          <SectionHeading eyebrow="Vision" title="Leadership Vision" />
          <div className="profile-prose">
            {person.vision.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="profile-cta wrap">
          <h2>Build the Future With TREVIORA</h2>
          <p>Join us in creating innovative technology solutions that make a meaningful difference.</p>
          <Link className="button button-primary" to="/contact">Contact Us <span>↗</span></Link>
        </section>
      </main>
      <Footer />
    </>
  )
}

/* ── Pricing Cards with 3D Tilt ── */
function PricingCards({ homepage = false }) {
  return (
    <div className="pricing-grid">
      {plans.map((plan) => (
        <article className={`price-card tilt-card ${plan.featured ? 'featured' : ''}`} key={plan.name}>
          <div className="tilt-card-glare" />
          {plan.featured && <span className="popular-label">{homepage ? 'POPULAR' : '⭐ MOST POPULAR'}</span>}
          <h3>{plan.name}</h3>
          <p className="plan-price">{plan.price}<span>{plan.unit}</span></p>
          {!homepage && <p className="plan-intro">One-time payment</p>}
          <ul>
            {(homepage ? plan.homepageFeatures : plan.features).map((feature) => (
              <li key={feature}><span>✓</span>{feature}</li>
            ))}
          </ul>
          <Link className={plan.featured ? 'button button-primary' : 'button button-outline'} to="/contact">
            {homepage ? 'Get Started' : `Choose ${plan.name}`}
          </Link>
        </article>
      ))}
    </div>
  )
}

/* ── Offers ── */
function Offers() {
  const offers = [
    ['🎉', '20% OFF', 'On all website development projects for new clients', 'Use Code: TREVIORA20'],
    ['🚀', 'FREE Logo', 'Free logo design with every Premium website package', 'Limited Period'],
    ['📱', 'FREE Mobile App', 'Get a basic mobile app free with every AI/IoT project', 'Bundle Deal'],
    ['🎨', '3 in 1 Combo', 'Website + Logo + Poster design at special combo price', 'Save 30%'],
  ]
  return (
    <div className="offers-section">
      <SectionHeading eyebrow="Special Offers" title="Limited Time Deals" text="Take advantage of our exclusive seasonal bundles" />
      <div className="offer-grid">
        {offers.map(([icon, title, text, badge]) => (
          <article className="offer-card tilt-card" key={title}>
            <div className="tilt-card-glare" />
            <span className="offer-emoji">{icon}</span>
            <h3>{title}</h3>
            <p>{text}</p>
            <span className="offer-badge">{badge}</span>
          </article>
        ))}
      </div>
    </div>
  )
}

/* ── Pricing Table ── */
function PricingTable() {
  return (
    <div className="pricing-table-block" data-reveal>
      <SectionHeading title="Domain Rate Matrix" text="Starting prices and estimated turnaround across all 8 services" />
      <div className="service-pricing-table">
        <div className="pricing-table-row pricing-table-head">
          <strong>Service</strong>
          <strong>Starting Price</strong>
          <strong>Timeline</strong>
        </div>
        {servicePricing.map(([service, price, timeline]) => (
          <div className="pricing-table-row" key={service}>
            <span>{service}</span>
            <span>{price}</span>
            <span>{timeline}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Pricing Page ── */
function Pricing() {
  return (
    <>
      <PageHero
        eyebrow="Plans & Engagement"
        title="Affordable Plans"
        text="Choose the perfect plan tailored to your business needs and project scope"
        image="/images/hero-collaboration.webp"
        badge="TRANSPARENT VALUE COMMITMENT"
        badgeIcon="💎"
        subBadge="100% Milestone Billing & Full IP Ownership"
        actions={
          <>
            <Link className="button button-primary" to="/contact">Get Custom Quote <span>↗</span></Link>
            <Link className="button button-outline" to="/services">All Services</Link>
          </>
        }
      />
      <main>
        <section className="pricing-section section-pad wrap">
          <SectionHeading title="Choose Your Package" text="Flexible milestone-backed packages tailored for startups and enterprises" />
          <PricingCards />
          <PricingTable />
          <Offers />

          <div className="pricing-guarantees-section" data-reveal>
            <SectionHeading title="Client Engagement Guarantees" text="Built-in IP ownership, transparent billing, and post-launch protection" />
            <div className="pricing-guarantees-grid">
            {[
              ['🔒', '100% IP Ownership', 'Full source code ownership, intellectual property rights, and repository access transferred upon completion.'],
              ['📊', 'Milestone-Based Billing', 'Pay in structured installments tied strictly to verified sprint deliverables and approval.'],
              ['⚡', 'Direct Architecture Review', 'Every architecture, codebase, and deliverable is coordinated through our Sales Team and senior engineers.'],
              ['🤝', '30-Day Launch Warranty', 'Complimentary post-deployment bug resolution and technical assistance to guarantee smooth operation.'],
            ].map(([icon, title, desc]) => (
              <div className="pricing-guarantee-card tilt-card" key={title}>
                <div className="tilt-card-glare" />
                <span className="guarantee-icon">{icon}</span>
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
          </div>

          <div className="source-home-cta" data-reveal>
            <div>
              <h2>Need a Custom Quote?</h2>
              <p>Contact us for personalized pricing tailored to your specific technical requirements.</p>
            </div>
            <Link className="button button-primary" to="/contact">Get a Quote <span>↗</span></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

/* ── Contact Page ── */
function Contact() {
  const contacts = [
    ['Sales Team (Client Support)', 'Thiruvel.K', '+91 90259 10642', 'https://wa.me/919025910642'],
    ['Sales Team (Client Relations)', 'Pagolu Sai Revanth', '+91 91508 91080', 'https://wa.me/919150891080'],
    ['Sales Team (Project Enquiries)', 'Mohamed Bouvash', '+91 74188 69487', 'https://wa.me/917418869487'],
  ]
  const [isSending, setIsSending] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')

  useEffect(() => {
    const loadEmailJs = () => {
      if (window.emailjs) {
        window.emailjs.init({ publicKey: 'x7fUSlpttypV_J2ts' })
        return
      }

      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js'
      script.async = true
      script.onload = () => {
        if (window.emailjs) {
          window.emailjs.init({ publicKey: 'x7fUSlpttypV_J2ts' })
        }
      }
      document.body.appendChild(script)
    }

    loadEmailJs()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const rate = checkRateLimit('contact_submit', 3, 2 * 60 * 1000)
    if (!rate.allowed) {
      setStatusMessage(`Too many submissions. Please wait ${rate.retryAfterSec}s before sending another inquiry.`)
      return
    }

    const form = event.currentTarget
    const formData = new FormData(form)
    const full_name = sanitizeText(formData.get('from_name'), 120)
    const email = sanitizeText(formData.get('from_email'), 254)
    const subject = sanitizeText(formData.get('subject'), 200)
    const service_interest = sanitizeText(formData.get('service_interest'), 120)
    const message = sanitizeMultilineText(formData.get('message'), 2500)

    if (!full_name || !isValidEmail(email) || !subject || !message) {
      setStatusMessage('Please provide a valid name, email address, subject, and message.')
      return
    }

    setIsSending(true)
    setStatusMessage('')

    const dbPromise = submitContactInquiry({
      full_name,
      email,
      subject,
      service_interest,
      message,
    })

    const emailPromise = window.emailjs
      ? window.emailjs.sendForm('service_odvg8we', 'template_2bynm4c', form)
      : Promise.reject(new Error('EmailJS unavailable'))

    const [dbResult, emailResult] = await Promise.allSettled([dbPromise, emailPromise])

    if (dbResult.status === 'fulfilled' || emailResult.status === 'fulfilled') {
      setStatusMessage('Thank you for contacting TREVIORA. Your inquiry has been received and our team will respond shortly.')
      form.reset()
    } else {
      setStatusMessage('Failed to send the message. Please contact us via phone or WhatsApp.')
    }

    setIsSending(false)
  }

  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title={<><WordReveal text="Let's Build" splitChars /><br /><span className="hero-accent"><WordReveal text="The Future Together" splitChars /></span></>}
        text="Engineering Tomorrow. Empowering Innovation."
        image="/images/about-studio.webp"
        badge="GLOBAL RESPONSE CENTER"
        badgeIcon="⚡"
        subBadge="Direct Sales Consultation • < 2 Hr SLA"
        sceneVariant="contact"
        actions={
          <>
            <a className="button button-primary" href="https://wa.me/919025910642" target="_blank" rel="noreferrer">WhatsApp Direct <span>↗</span></a>
            <a className="button button-outline" href="tel:+919025910642">Call Sales Team</a>
          </>
        }
      />
      <main>
        <section className="contact-section section-pad wrap original-contact">
          <div className="contact-details">
            <span className="panel-kicker-title">Direct Communication Channels</span>
            <h2>Get In Touch</h2>
            <p style={{ color: 'var(--muted)', margin: '14px 0 24px' }}>
              Have questions or want to discuss a new project? Reach out directly to our Sales Team.
            </p>
            {contacts.map(([role, name, phone, whatsapp]) => (
              <article className="leader-contact" key={`${role}-${name}`}>
                <h3>{role}</h3>
                <p>{name}</p>
                <a className="contact-line" href={`tel:${phone.replaceAll(' ', '')}`}>
                  <span>Phone</span>
                  {phone}
                  <b>↗</b>
                </a>
                <a className="whatsapp-link" href={whatsapp} target="_blank" rel="noreferrer">
                  WhatsApp Direct <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}

            <div className="contact-support-card" data-reveal>
              <div className="contact-support-inner">
                <div className="contact-support-image">
                  <img src="/images/about-studio.webp" alt="TREVIORA Technology Studio" loading="lazy" width="600" height="400" />
                </div>
                <div className="contact-support-content">
                  <h4>TREVIORA Rapid Response</h4>
                  <p>Direct communication with our dedicated Sales Team.</p>
                  <div className="support-commitments">
                    <span>Average response time: &lt; 2 hours</span>
                    <span>Direct sales team consultation</span>
                    <span>100% NDA & IP confidentiality</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-message">
            <span className="panel-kicker-title">Project Inquiry Form</span>
            <h2>Send Us a Message</h2>
            <p style={{ color: 'var(--muted)', marginTop: '8px' }}>
              Have an idea or project requirement in mind? Fill out the form below.
            </p>
            <form className="contact-form" onSubmit={handleSubmit}>
              <label>
                Full Name
                <input type="text" name="from_name" placeholder="Your Full Name" required />
              </label>
              <label>
                Email Address
                <input type="email" name="from_email" placeholder="Your Email Address" required />
              </label>
              <label>
                Subject
                <input type="text" name="subject" placeholder="Project subject..." required />
              </label>
              <label>
                Service Interest (Optional)
                <select name="service_interest" defaultValue="">
                  <option value="">General Inquiry</option>
                  <option value="Web Development">Website & Web Applications</option>
                  <option value="Android Apps">Android App Development</option>
                  <option value="AI/ML Solutions">AI/ML & Automation</option>
                  <option value="IoT Solutions">IoT & Embedded Systems</option>
                  <option value="Custom Software">Custom Software Development</option>
                  <option value="UI/UX Design">UI/UX & Product Design</option>
                  <option value="3D Model Design">3D Model Design & Assets</option>
                  <option value="Graphics Design">Graphics & Visual Branding</option>
                </select>
              </label>
              <label>
                Message
                <textarea name="message" rows="5" placeholder="Tell us about your project..." required />
              </label>
              <button className="button button-primary" type="submit" disabled={isSending}>
                {isSending ? 'Sending...' : 'Send Message'} <span aria-hidden="true">↗</span>
              </button>
              {statusMessage && <p className="contact-status" role="status" aria-live="polite">{statusMessage}</p>}
            </form>
          </div>
        </section>

        {/* Nagercoil Headquarters Location Map */}
        <section className="contact-map-section wrap">
          <div className="contact-map-grid">
            <div className="contact-map-info">
              <span className="contact-map-badge">Headquarters Location</span>
              <h2>Visit Our Studio in Nagercoil</h2>
              <p>
                Partner directly with our engineering, AI, IoT, and digital design teams in Kanyakumari District, Tamil Nadu.
              </p>
              <div className="contact-map-meta">
                <div>
                  <strong>Address</strong>
                  <span>TREVIORA INDUSTRY, Nagercoil, Kanyakumari District, Tamil Nadu 629001, India</span>
                </div>
                <div>
                  <strong>Consultation Hours</strong>
                  <span>Monday – Saturday · 9:30 AM – 7:00 PM IST</span>
                </div>
              </div>
              <a
                className="button button-primary"
                href="https://www.google.com/maps/search/?api=1&query=Nagercoil%2C+Tamil+Nadu+629001%2C+India"
                target="_blank"
                rel="noreferrer"
              >
                Open in Google Maps <span>↗</span>
              </a>
            </div>
            <div className="contact-map-frame">
              <iframe
                title="TREVIORA INDUSTRY Nagercoil Location Map"
                src="https://maps.google.com/maps?q=Nagercoil%2C%20Tamil%20Nadu%2C%20India&t=&z=13&ie=UTF8&iwloc=&output=embed"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* FIDA-Inspired Interactive FAQ Accordion ("Before we say hello.") */}
        <section className="faq-section section-pad wrap">
          <SectionHeading
            eyebrow="Client Guide"
            title="Before we say hello."
            text="Everything you need to know before starting a digital engineering engagement with TREVIORA INDUSTRY."
          />
          <FaqAccordion
            items={[
              {
                q: 'How quickly does the Sales Team respond to a new project inquiry?',
                a: 'Our dedicated Sales Team responds within 2 hours during working days with a direct technical feasibility review and milestone estimate.',
              },
              {
                q: 'Do clients receive full source code ownership and intellectual property rights?',
                a: 'Yes. Every custom website, mobile app, AI model, IoT firmware, and 3D/creative deliverable transfers 100% full source code and IP ownership to your organization upon final milestone sign-off.',
              },
              {
                q: 'How are multi-domain builds (e.g., Web + Mobile + AI/IoT) coordinated?',
                a: 'A single engineering architecture unifies all layers — React/Vite web portals, Android clients, FastAPI/Python intelligence pipelines, and MQTT hardware telemetry — tested end-to-end with dedicated Sales Team coordination.',
              },
              {
                q: 'What post-launch support and revisions are included?',
                a: 'All launches include a complimentary 30-day warranty covering bug fixes, optimization, and deployment support, with flexible monthly retainers available for continuous scaling.',
              },
            ]}
          />
        </section>
      </main>
      <Footer />
    </>
  )
}

/* ── Not Found ── */
function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="404 Error"
        title={<><WordReveal text="A Little Off" splitChars /><br /><span className="hero-accent"><WordReveal text="The Map." splitChars /></span></>}
        text="The requested page could not be found. Let’s get you back to the home base."
        image="/images/about-studio.webp"
        badge="NAVIGATION BASE"
        badgeIcon="🧭"
        subBadge="Safe Route Recovery"
      />
      <main className="not-found wrap">
        <Link className="button button-primary" to="/">Back to Home <span>↗</span></Link>
      </main>
      <Footer />
    </>
  )
}

/* ── Main App Component with Signature TREVIORA Transitions & Choreography ── */
export default function App() {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [showWebGL, setShowWebGL] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth >= 768 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })
  const appRef = useRef(null)
  const transitionStageRef = useRef(null)
  const [cutState, setCutState] = useState({ act: false, in: false, show: false, out: false })
  const [pageEnterKey, setPageEnterKey] = useState(0)
  const transitionTimersRef = useRef([])
  const isFirstMountRef = useRef(true)

  useEffect(() => {
    const robotsMeta = document.querySelector('meta[name="robots"]')
    if (IS_ADMIN_HOST || location.pathname.startsWith('/admin')) {
      document.title = 'Treviora Admin Portal'
      if (robotsMeta) robotsMeta.setAttribute('content', 'noindex, nofollow')
      return
    }
    if (robotsMeta) robotsMeta.setAttribute('content', 'index, follow')
    const routeMeta = {
      '/': {
        title: 'Treviora Industry | Web Design, Mobile Apps & AI Solutions',
        description: 'Official website of Treviora Industry — delivering premium websites, mobile apps, AI solutions, and creative digital designs.',
      },
      '/services': {
        title: 'Services | Treviora Industry',
        description: 'Explore Treviora Industry services: website & web application development, mobile apps, AI & intelligent automation, and 3D digital design.',
      },
      '/work': {
        title: 'Our Work | Treviora Industry',
        description: 'Selected projects, web platforms, mobile apps, and digital products engineered by Treviora Industry.',
      },
      '/team': {
        title: 'Leadership Team | Treviora Industry',
        description: 'Meet the founders and engineering leadership team behind Treviora Industry.',
      },
      '/contact': {
        title: 'Contact Us | Treviora Industry',
        description: 'Start a project with Treviora Industry. Reach out for web development, mobile apps, AI systems, or creative design.',
      },
    }
    const meta = routeMeta[location.pathname] || routeMeta['/']
    document.title = meta.title
    const descEl = document.querySelector('meta[name="description"]')
    if (descEl) descEl.setAttribute('content', meta.description)
    const canonicalEl = document.querySelector('link[rel="canonical"]')
    if (canonicalEl) canonicalEl.setAttribute('href', `${PUBLIC_SITE_URL}${location.pathname === '/' ? '/' : location.pathname}`)
  }, [location.pathname])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncWebGL = () => {
      setShowWebGL(window.innerWidth >= 768 && !mediaQuery.matches)
    }
    window.addEventListener('resize', syncWebGL, { passive: true })
    mediaQuery.addEventListener?.('change', syncWebGL)
    return () => {
      window.removeEventListener('resize', syncWebGL)
      mediaQuery.removeEventListener?.('change', syncWebGL)
    }
  }, [])

  // Orbit – Cinematic Page Change Transition (GPU-only for 60fps mobile & desktop)
  useEffect(() => {
    if (location.pathname === displayLocation.pathname) return undefined

    transitionTimersRef.current.forEach((id) => clearTimeout(id))
    transitionTimersRef.current = []

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      setDisplayLocation(location)
      return undefined
    }

    const isMobile = window.innerWidth < 768
    const showLogoAt = isMobile ? 90 : 140
    const swapAt = isMobile ? 280 : 400
    const slideOutAt = isMobile ? 370 : 520
    const cleanupAt = isMobile ? 660 : 940

    setCutState({ act: true, in: false, show: false, out: false })

    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setCutState({ act: true, in: true, show: false, out: false })
      })
    })

    const t1 = window.setTimeout(() => {
      setCutState({ act: true, in: true, show: true, out: false })
    }, showLogoAt)

    const t2 = window.setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' })
      setDisplayLocation(location)
      setPageEnterKey((k) => k + 1)
    }, swapAt)

    const t3 = window.setTimeout(() => {
      setCutState({ act: true, in: true, show: false, out: true })
    }, slideOutAt)

    const t4 = window.setTimeout(() => {
      setCutState({ act: false, in: false, show: false, out: false })
      ScrollTrigger.refresh()
    }, cleanupAt)

    transitionTimersRef.current = [t1, t2, t3, t4]

    return () => {
      cancelAnimationFrame(rafId)
    }
  }, [location.pathname])

  useEffect(() => () => {
    transitionTimersRef.current.forEach((id) => clearTimeout(id))
  }, [])

  useGSAP(() => {
    const media = gsap.matchMedia()
    const listenerCleanups = []

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const stage = transitionStageRef.current
      if (stage && isFirstMountRef.current) {
        isFirstMountRef.current = false
        gsap.fromTo(
          stage,
          { opacity: 0.85, y: 10 },
          { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out', clearProps: 'opacity,transform' }
        )
      }

      // 1. Movie-Title Hero Sequence & Choreographed Subpage PageHero
      const heroElement = document.querySelector('.hero')
      if (heroElement) {
        playHeroCinematicSequence(heroElement)
      }

      const subHero = appRef.current?.querySelector('.page-hero')
      if (subHero) {
        playSubHeroCinematicSequence(subHero, displayLocation.pathname, services, people)
      }

      // Sequential Grid Stagger for Domain, Guarantee & Architecture Cards
      const gridSelectors = [
        '.values-grid',
        '.project-category-grid',
        '.tech-architecture-grid',
        '.service-specs-grid',
        '.service-roadmap-grid',
        '.pricing-guarantees-grid',
        '.team-principles-grid',
        '.offer-grid',
      ]
      gridSelectors.forEach((sel) => {
        const grid = appRef.current?.querySelector(sel)
        if (!grid || !grid.children.length) return
        gsap.fromTo(
          grid.children,
          { opacity: 0.85, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.06,
            ease: 'power2.out',
            clearProps: 'opacity,transform',
            scrollTrigger: { trigger: grid, start: 'top 95%', once: true },
          }
        )
      })

      // 2. Section Headings Text Reveals (ScrollTrigger per section — excludes heroes)
      const sectionContainers = new Set()
      gsap.utils.toArray('.text-reveal-word', appRef.current).forEach((word) => {
        if (!word.closest('.hero, .page-hero-inner')) {
          const container = word.closest('.section-heading, .profile-detail-copy') || word.parentElement
          if (container) sectionContainers.add(container)
        }
      })

      sectionContainers.forEach((container) => {
        const words = container.querySelectorAll('.text-reveal-word')
        const subtext = container.querySelectorAll('p, h3')

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top 96%',
            once: true,
          },
        })

        tl.fromTo(
          words,
          { clipPath: 'inset(0 0 100% 0)', yPercent: 24, filter: 'blur(3px)' },
          {
            clipPath: 'inset(0 0 0% 0)',
            yPercent: 0,
            filter: 'blur(0px)',
            duration: 0.62,
            stagger: 0.035,
            ease: 'power3.out',
            clearProps: 'clipPath,transform,filter',
          }
        )

        if (subtext.length) {
          tl.fromTo(
            subtext,
            { y: 10, opacity: 0.72 },
            { y: 0, opacity: 1, duration: 0.48, stagger: 0.04, ease: 'power2.out', clearProps: 'opacity,transform' },
            '-=0.35'
          )
        }
      })

      // 3. Hero Multi-Plane Dynamic ScrollTrigger Motion (Moving Hero Image System)
      if (heroElement) {
        const photoCard = heroElement.querySelector('.hero-photo')
        const floatTop = heroElement.querySelector('.hero-float-card-top')
        const floatSide = heroElement.querySelector('.hero-float-card-side')
        const teamCard = heroElement.querySelector('.hero-team-card')
        const heroCopyEl = heroElement.querySelector('.hero-copy')

        if (heroCopyEl) {
          gsap.to(heroCopyEl, {
            y: -50,
            ease: 'none',
            scrollTrigger: {
              trigger: heroElement,
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
            },
          })
        }

        if (photoCard) {
          gsap.to(photoCard, {
            y: 95,
            scale: 1.05,
            rotateX: 6,
            rotateY: -4,
            ease: 'none',
            scrollTrigger: {
              trigger: heroElement,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.2,
            },
          })
        }

        if (floatTop) {
          gsap.to(floatTop, {
            y: -110,
            x: 28,
            rotateZ: -4,
            ease: 'none',
            scrollTrigger: {
              trigger: heroElement,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.8,
            },
          })
        }

        if (floatSide) {
          gsap.to(floatSide, {
            y: 75,
            x: -28,
            rotateZ: 3,
            ease: 'none',
            scrollTrigger: {
              trigger: heroElement,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.4,
            },
          })
        }

        if (teamCard) {
          gsap.to(teamCard, {
            y: -60,
            x: -20,
            ease: 'none',
            scrollTrigger: {
              trigger: heroElement,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.0,
            },
          })
        }
      }

      // PageHero Visual Cards ScrollTrigger Parallax on all other pages
      gsap.utils.toArray('.page-hero-card', appRef.current).forEach((card) => {
        const parentHero = card.closest('.page-hero')
        if (parentHero) {
          gsap.to(card, {
            y: 55,
            scale: 1.04,
            ease: 'none',
            scrollTrigger: {
              trigger: parentHero,
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
            },
          })
        }
      })

      // 4. Hero Desktop Mouse-Follow Parallax (cached rect + quickTo)
      if (heroElement && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const floatBadges = gsap.utils.toArray('.hero-float-card, .hero-team-card')
        const photoCard = document.querySelector('.hero-photo')
        if (floatBadges.length || photoCard) {
          let heroRect = heroElement.getBoundingClientRect()
          const updateHeroRect = () => { heroRect = heroElement.getBoundingClientRect() }
          const photoRotXTo = photoCard ? gsap.quickTo(photoCard, 'rotateX', { duration: 0.65, ease: 'power1.out' }) : null
          const photoRotYTo = photoCard ? gsap.quickTo(photoCard, 'rotateY', { duration: 0.65, ease: 'power1.out' }) : null

          const onHeroMove = (e) => {
            if (!heroRect.width || !heroRect.height) return
            const xPct = (e.clientX - heroRect.left) / heroRect.width - 0.5
            const yPct = (e.clientY - heroRect.top) / heroRect.height - 0.5

            if (floatBadges.length) {
              gsap.to(floatBadges, {
                x: xPct * 24,
                y: yPct * 18,
                duration: 0.6,
                ease: 'power1.out',
                overwrite: 'auto',
              })
            }
            if (photoRotXTo && photoRotYTo) {
              photoRotYTo(xPct * 5)
              photoRotXTo(-yPct * 5)
            }
          }

          const onHeroLeave = () => {
            if (floatBadges.length) {
              gsap.to(floatBadges, { x: 0, y: 0, duration: 0.7, ease: 'power2.out', overwrite: 'auto' })
            }
            if (photoRotXTo && photoRotYTo) {
              photoRotXTo(0)
              photoRotYTo(0)
            }
          }

          heroElement.addEventListener('pointerenter', updateHeroRect)
          heroElement.addEventListener('pointermove', onHeroMove, { passive: true })
          heroElement.addEventListener('pointerleave', onHeroLeave)
          listenerCleanups.push(() => {
            heroElement.removeEventListener('pointerenter', updateHeroRect)
            heroElement.removeEventListener('pointermove', onHeroMove)
            heroElement.removeEventListener('pointerleave', onHeroLeave)
          })
        }
      }

      // 5. Restrained Interactive 3D Card Tilt on Hover (quickTo + cached rect)
      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const tiltCards = gsap.utils.toArray('.tilt-card', appRef.current)
        tiltCards.forEach((card) => {
          let rect = card.getBoundingClientRect()
          const rotXTo = gsap.quickTo(card, 'rotateX', { duration: 0.25, ease: 'power1.out' })
          const rotYTo = gsap.quickTo(card, 'rotateY', { duration: 0.25, ease: 'power1.out' })
          gsap.set(card, { transformPerspective: 1000 })

          const updateRect = () => { rect = card.getBoundingClientRect() }

          const onCardMove = (e) => {
            if (!rect.width || !rect.height) return
            const mouseX = e.clientX - rect.left
            const mouseY = e.clientY - rect.top
            const xNorm = (mouseX / rect.width - 0.5) * 2
            const yNorm = (mouseY / rect.height - 0.5) * 2

            rotXTo(-yNorm * 6)
            rotYTo(xNorm * 6)

            card.style.setProperty('--mouse-x', `${(mouseX / rect.width) * 100}%`)
            card.style.setProperty('--mouse-y', `${(mouseY / rect.height) * 100}%`)
          }

          const onCardLeave = () => {
            rotXTo(0)
            rotYTo(0)
          }

          card.addEventListener('pointerenter', updateRect)
          card.addEventListener('pointermove', onCardMove, { passive: true })
          card.addEventListener('pointerleave', onCardLeave)
          listenerCleanups.push(() => {
            card.removeEventListener('pointerenter', updateRect)
            card.removeEventListener('pointermove', onCardMove)
            card.removeEventListener('pointerleave', onCardLeave)
          })
        })
      }

      // 6. General Reveal for Content Blocks (Never Dim Headings or Sections)
      gsap.utils.toArray('[data-reveal]', appRef.current).forEach((el, index) => {
        gsap.from(el, {
          y: 12,
          duration: 0.45,
          delay: (index % 3) * 0.03,
          ease: 'power2.out',
          clearProps: 'transform,visibility',
          scrollTrigger: { trigger: el, start: 'top 98%', once: true },
        })
      })

      // 7. Directional Staggered Service & Showcase Cards Entrance (Always Visible Floor)
      const serviceCards = gsap.utils.toArray('.service-card, .project-showcase-card, .vm-card, .showcase-feature-card', appRef.current)
      if (serviceCards.length) {
        serviceCards.forEach((card, i) => {
          const dir = card.dataset.direction === 'left' ? -14 : 14
          gsap.fromTo(card, { opacity: 0.85, y: 18, x: dir }, {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.55,
            delay: (i % 4) * 0.05,
            ease: 'power3.out',
            clearProps: 'opacity,transform,visibility',
            scrollTrigger: { trigger: card, start: 'top 97%', once: true },
          })

          const img = card.querySelector('img')
          if (img) {
            gsap.fromTo(img, { scale: 1.07 }, {
              scale: 1,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: { trigger: card, start: 'top 97%', once: true },
            })
          }
        })
      }

      // 8. Team Cards — Cinematic Zoom Entrance with Image Reveal
      const teamCards = gsap.utils.toArray('.team-card', appRef.current)
      if (teamCards.length) {
        teamCards.forEach((card, i) => {
          gsap.fromTo(card, { opacity: 0.88, y: 16, scale: 0.97 }, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            delay: (i % 3) * 0.06,
            ease: 'power3.out',
            clearProps: 'opacity,transform,visibility',
            scrollTrigger: { trigger: card, start: 'top 97%', once: true },
          })

          const img = card.querySelector('img')
          if (img) {
            gsap.fromTo(img, { scale: 1.07 }, {
              scale: 1,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: { trigger: card, start: 'top 97%', once: true },
            })
          }
        })
      }

      // 9. Profile Detail, Story Visual, Service Detail & Project Masked Image Reveals
      const visualImages = gsap.utils.toArray(
        '.profile-detail-image img, .story-visual-image img, .service-visual-frame img, .project-card-image img, .contact-support-image img',
        appRef.current
      )
      visualImages.forEach((img) => {
        gsap.fromTo(
          img,
          { clipPath: 'inset(10% 0% 10% 0%)', scale: 1.12, opacity: 0.72 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            scale: 1,
            opacity: 1,
            duration: 0.95,
            ease: 'expo.out',
            clearProps: 'clipPath,transform,opacity',
            scrollTrigger: { trigger: img.parentElement, start: 'top 88%', once: true },
          }
        )
      })

      // 10. Value Cards — Sequential Tech Glow on Viewport Enter
      gsap.utils.toArray('.value-card', appRef.current).forEach((card) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'top 80%',
          end: 'bottom 20%',
          onEnter: () => card.classList.add('value-card-glow'),
          onLeaveBack: () => card.classList.remove('value-card-glow'),
        })
      })

      // 10. Pricing Cards — Staggered Fan In Effect (Always Visible)
      const priceCards = gsap.utils.toArray('.price-card', appRef.current)
      if (priceCards.length) {
        const midIndex = (priceCards.length - 1) / 2
        priceCards.forEach((card, index) => {
          const rotateStart = (index - midIndex) * 2
          gsap.fromTo(card, { opacity: 0.88, y: 16, rotateZ: rotateStart, transformOrigin: 'center bottom' }, {
            opacity: 1,
            y: 0,
            rotateZ: 0,
            duration: 0.6,
            delay: index * 0.08,
            ease: 'power2.out',
            clearProps: 'opacity,transform,visibility',
            scrollTrigger: { trigger: card, start: 'top 96%', once: true },
          })
        })
      }

      // 11. Interactive Number Counters (Zero Forced Reflow — Plain Object Tween)
      gsap.utils.toArray('[data-count]', appRef.current).forEach((counter) => {
        const value = Number(counter.dataset.count) || 0
        const suffix = counter.dataset.suffix || ''
        const prefix = counter.dataset.prefix || ''
        const obj = { val: 0 }
        gsap.to(obj, {
          val: value,
          duration: 1.3,
          ease: 'power2.out',
          scrollTrigger: { trigger: counter, start: 'top 92%', once: true },
          onUpdate: () => {
            counter.textContent = `${prefix}${Math.round(obj.val)}${suffix}`
          },
        })
      })

      // 12. Technical Proficiency Bars (Compositor-Only scaleX — Zero Layout Reflow)
      gsap.utils.toArray('.proficiency-track span', appRef.current).forEach((bar) => {
        const targetWidth = bar.dataset.width || '90%'
        bar.style.width = targetWidth
        gsap.fromTo(bar, { scaleX: 0, transformOrigin: 'left center' }, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: bar.parentElement,
            start: 'top 92%',
            end: 'top 60%',
            scrub: 0.6,
          },
        })
      })

      // 13. Subtle Ambient Bobbing on Floating Badges (Only on non-clickable badges)
      const heroBadges = gsap.utils.toArray('.hero-float-card, .hero-team-card', appRef.current)
      if (heroBadges.length) {
        gsap.to(heroBadges, {
          y: -8,
          duration: 3,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: 0.4,
        })
      }

      // 14. Contact Form & Details Entrance
      const contactForm = gsap.utils.toArray('.contact-message', appRef.current)
      const contactDetails = gsap.utils.toArray('.contact-details', appRef.current)
      if (contactForm.length) {
        gsap.fromTo(contactForm, { opacity: 0.75, y: 12 }, {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: 'power2.out',
          clearProps: 'opacity,transform,visibility',
          scrollTrigger: { trigger: contactForm[0], start: 'top 95%', once: true },
        })
      }
      if (contactDetails.length) {
        gsap.fromTo(contactDetails, { opacity: 0.75, y: 12 }, {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: 'power2.out',
          clearProps: 'opacity,transform,visibility',
          scrollTrigger: { trigger: contactDetails[0], start: 'top 95%', once: true },
        })
      }

      // 15. Footer Smooth Entrance
      const siteFooter = gsap.utils.toArray('.site-footer', appRef.current)
      if (siteFooter.length) {
        gsap.fromTo(siteFooter, { autoAlpha: 0.7, y: 20 }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: siteFooter[0], start: 'top 98%', once: true },
        })
      }

      // 16. Magnetic CTA Buttons on Desktop Fine Pointer (quickTo + cached rect + clean teardown)
      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const magneticBtns = gsap.utils.toArray('.button-primary, .button-outline, .nav-contact', appRef.current)
        magneticBtns.forEach((btn) => {
          let rect = btn.getBoundingClientRect()
          const xTo = gsap.quickTo(btn, 'x', { duration: 0.35, ease: 'power2.out' })
          const yTo = gsap.quickTo(btn, 'y', { duration: 0.35, ease: 'power2.out' })
          const onEnter = () => { rect = btn.getBoundingClientRect() }
          const onMove = (e) => {
            if (!rect.width || !rect.height) return
            const x = e.clientX - (rect.left + rect.width / 2)
            const y = e.clientY - (rect.top + rect.height / 2)
            xTo(x * 0.2)
            yTo(y * 0.2)
          }
          const onLeave = () => {
            xTo(0)
            yTo(0)
          }
          btn.addEventListener('pointerenter', onEnter)
          btn.addEventListener('pointermove', onMove, { passive: true })
          btn.addEventListener('pointerleave', onLeave)
          listenerCleanups.push(() => {
            btn.removeEventListener('pointerenter', onEnter)
            btn.removeEventListener('pointermove', onMove)
            btn.removeEventListener('pointerleave', onLeave)
          })
        })
      }

      // 17. FIDA-Inspired Subpage Scene Choreography (Progress Hairline, SVG Thread Draw, Weave Curtains, Contact Beam, Story Unveil)
      const sceneProgressFill = appRef.current?.querySelector('.page-scene-progress > i')
      const pageSceneHero = appRef.current?.querySelector('.page-hero')
      if (sceneProgressFill && pageSceneHero) {
        gsap.fromTo(sceneProgressFill, { scaleX: 0 }, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: pageSceneHero,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.4,
          },
        })
      }

      const threadPath = appRef.current?.querySelector('.scene-thread-path')
      if (threadPath && typeof threadPath.getTotalLength === 'function') {
        const len = threadPath.getTotalLength()
        gsap.set(threadPath, { strokeDasharray: len, strokeDashoffset: len })
        gsap.to(threadPath, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: 'power2.out',
        })
      }

      const weaveStrips = gsap.utils.toArray('.scene-weave-strip', appRef.current)
      if (weaveStrips.length) {
        weaveStrips.forEach((strip, idx) => {
          const dir = idx % 2 === 0 ? -45 : 45
          gsap.fromTo(strip, { yPercent: 0, opacity: 0.55 }, {
            yPercent: dir,
            opacity: 0.08,
            ease: 'none',
            scrollTrigger: {
              trigger: pageSceneHero || strip,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.9,
            },
          })
        })
      }

      const contactBeam = appRef.current?.querySelector('.scene-contact-beam')
      if (contactBeam) {
        gsap.fromTo(contactBeam, { xPercent: -30, opacity: 0.25 }, {
          xPercent: 45,
          opacity: 0.75,
          ease: 'none',
          scrollTrigger: {
            trigger: pageSceneHero || contactBeam,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
        })
      }

      const contactHubs = gsap.utils.toArray('.scene-hub-tag', appRef.current)
      if (contactHubs.length) {
        gsap.from(contactHubs, {
          xPercent: 30,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          clearProps: 'opacity,transform',
        })
      }

      const storyVisual = appRef.current?.querySelector('.story-visual-card')
      if (storyVisual) {
        gsap.fromTo(storyVisual, { clipPath: 'inset(100% 0% 0% 0%)' }, {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.05,
          ease: 'power3.out',
          clearProps: 'clipPath',
          scrollTrigger: { trigger: storyVisual, start: 'top 90%', once: true },
        })
      }

      ScrollTrigger.refresh()
    })

    media.add('(prefers-reduced-motion: reduce)', () => {
      // Immediate visibility without motion for reduced-motion users
      gsap.set('.text-reveal-word, .unfold-word, .hero-copy > *, .hero-art, .service-card, .team-card, .price-card, [data-reveal], .site-footer, .contact-message, .contact-details, .story-visual-card', {
        autoAlpha: 1,
        y: 0,
        x: 0,
        scale: 1,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        clearProps: 'clipPath',
      })
      gsap.utils.toArray('.proficiency-track span', appRef.current).forEach((bar) => {
        bar.style.width = bar.dataset.width || '90%'
      })
      gsap.utils.toArray('[data-count]', appRef.current).forEach((counter) => {
        const value = counter.dataset.count || '0'
        const suffix = counter.dataset.suffix || ''
        const prefix = counter.dataset.prefix || ''
        counter.textContent = `${prefix}${value}${suffix}`
      })
    })

    return () => {
      listenerCleanups.forEach((fn) => fn())
      media.revert()
    }
  }, { scope: appRef, dependencies: [displayLocation.pathname], revertOnUpdate: true })

  // Synchronize document title with active route
  useEffect(() => {
    const path = location.pathname
    const memberSlug = path.startsWith('/team/') ? path.split('/')[2] : ''
    const member = people.find((person) => person.slug === memberSlug || person.route === path)
    const service = services.find((item) => `/${item.slug}` === path)

    const pageTitle = member ? member.name : service ? service.pageTitle : ({
      '/': 'Home',
      '/about': 'About TREVIORA',
      '/services': 'Our Services',
      '/pricing': 'Pricing & Offers',
      '/profile': 'Leadership Team',
      '/team': 'Leadership Team',
      '/work': 'TREVIORA PROJECTS',
      '/projects': 'TREVIORA PROJECTS',
      '/admin': 'Admin Portal',
      '/contact': 'Contact TREVIORA',
      '/connect': 'Contact TREVIORA',
    })[path] ?? 'Page Not Found'

    document.title = IS_ADMIN_HOST ? 'Admin Portal | TREVIORA INDUSTRY' : `${pageTitle} | TREVIORA INDUSTRY`
  }, [location.pathname])

  return (
    <div ref={appRef} className="app-shell">
      {!IS_ADMIN_HOST && <CinematicIntro />}
      <CursorSpotlight />
      {showWebGL && (
        <WebGLErrorBoundary>
          <Suspense fallback={null}>
            <CinematicBackdrop3D />
          </Suspense>
        </WebGLErrorBoundary>
      )}
      <TechParticlesCanvas />
      <ScrollProgressBar />
      <RouteTransitionOverlay cutState={cutState} />
      <Header />
      <div
        ref={transitionStageRef}
        key={pageEnterKey}
        className={`page-transition-stage${pageEnterKey > 0 ? ' tv-orbit-page-in' : ''}`}
      >
        <Routes location={displayLocation}>
          <Route path="/" element={IS_ADMIN_HOST ? <AdminPortal /> : <Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/profile" element={<Team />} />
          <Route path="/team" element={<Team />} />
          <Route path="/team/:slug" element={<TeamMember />} />
          {people.map((person) => (
            <Route key={person.route} path={person.route} element={<TeamMember profileSlug={person.slug} />} />
          ))}
          <Route path="/work" element={<Projects />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/admin" element={IS_ADMIN_HOST ? <AdminPortal /> : <NotFound />} />
          <Route path="/services" element={<ServiceDirectory />} />
          {services.map((service) => (
            <Route key={service.slug} path={`/${service.slug}`} element={<ServiceCategory slug={service.slug} />} />
          ))}
          {/* Legacy service aliases for backward compatibility */}
          <Route path="/ppt" element={<ServiceCategory slug="uiux" />} />
          <Route path="/video" element={<ServiceCategory slug="graphics" />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/connect" element={<Contact />} />
          <Route path="*" element={IS_ADMIN_HOST ? <AdminPortal /> : <NotFound />} />
        </Routes>
      </div>
      {!IS_ADMIN_HOST && <MobileBottomDock />}
    </div>
  )
}
