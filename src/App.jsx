import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import {
  ArrowUpRight, Award, BrainCircuit, BriefcaseBusiness, ChevronDown, Code2, Download,
  ExternalLink, GraduationCap, LayoutTemplate, Mail, Menu, Moon,
  Send, ServerCog, Sparkles, Sun, Wrench, X, ArrowUp, CircleDot,
} from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'
import { portfolio, skills, projects, certifications } from './data/portfolioData'

const navItems = ['About', 'Skills', 'Projects', 'Experience', 'Certifications', 'Education', 'Contact']
const iconMap = { Code2, LayoutTemplate, ServerCog, BrainCircuit, Sparkles, Wrench }
const Github = FaGithub
const Linkedin = FaLinkedin
const reveal = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } } }

function SectionHeading({ kicker, title, copy }) {
  return <motion.div className="section-heading" variants={reveal}>
    <span className="kicker">{kicker}</span>
    <h2>{title}</h2>
    {copy && <p>{copy}</p>}
  </motion.div>
}

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('About')
  const [showTop, setShowTop] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id === 'home' ? 'Home' : entry.target.id[0].toUpperCase() + entry.target.id.slice(1))
      })
    }, { rootMargin: '-22% 0px -65% 0px' })
    navItems.concat('Home').forEach((id) => { const section = document.getElementById(id.toLowerCase()); if (section) observer.observe(section) })
    const onScroll = () => setShowTop(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { observer.disconnect(); window.removeEventListener('scroll', onScroll) }
  }, [])

  const goTo = (id) => { document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false) }
  const toggleTheme = () => setTheme((current) => current === 'dark' ? 'light' : 'dark')

  return <div className="app-shell">
    <motion.div className="scroll-progress" style={{ scaleX: progress }} />
    <header className="site-header">
      <a className="brand" href="#home" onClick={() => goTo('Home')} aria-label="Jayanth Arumalla home"><span>JA</span><b>Jayanth<span>.</span></b></a>
      <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
        {['Home', ...navItems].map((item) => <button className={active === item ? 'nav-link active' : 'nav-link'} key={item} onClick={() => goTo(item)}>{item}</button>)}
        <a className="resume-link" href="/resume.pdf" download><Download size={15} /> Resume</a>
      </nav>
      <div className="header-actions"><button className="icon-button" onClick={toggleTheme} aria-label="Toggle theme">{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</button><button className="menu-button icon-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X size={21} /> : <Menu size={21} />}</button></div>
    </header>

    <main>
      <section className="hero section-wrap" id="home">
        <div className="hero-grid" />
        <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
        <motion.div className="hero-copy" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.11 } } }}>
          <motion.div className="availability" variants={reveal}><CircleDot size={13} /> Open to learning & collaboration</motion.div>
          <motion.p className="hero-overline" variants={reveal}>Hello, I&apos;m</motion.p>
          <motion.h1 variants={reveal}>Jayanth<br /><em>Arumalla.</em></motion.h1>
          <motion.h2 variants={reveal}>{portfolio.heroRole}</motion.h2>
          <motion.p className="hero-intro" variants={reveal}>{portfolio.intro}</motion.p>
          <motion.div className="hero-actions" variants={reveal}><button className="button button-primary" onClick={() => goTo('Projects')}>View my projects <ArrowUpRight size={17} /></button><button className="button button-quiet" onClick={() => goTo('Contact')}>Let&apos;s connect <ArrowUpRight size={17} /></button></motion.div>
          <motion.div className="social-row" variants={reveal}><a href={portfolio.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub size={18} /></a><a href={portfolio.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin size={18} /></a><a href={`mailto:${portfolio.email}`} aria-label="Email"><Mail size={18} /></a><span className="social-rule" /><span className="social-note">Scroll to explore <ChevronDown size={14} /></span></motion.div>
        </motion.div>
        <motion.div className="hero-mark" initial={{ opacity: 0, scale: .8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .9, delay: .4 }}><span className="mark-label">BUILD / LEARN / REPEAT</span><div className="mark-circle"><span>JA</span><div className="mark-ring" /></div><span className="mark-caption">CS • AI • 2027</span></motion.div>
      </section>

      <motion.section className="section-wrap about-section" id="about" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }}>
        <SectionHeading kicker="01 / About" title="Curious by nature. Practical by choice." />
        <div className="about-layout"><motion.div className="about-copy" variants={reveal}><p className="lead">I&apos;m a final-year Computer Science Engineering student graduating in 2027. My interests span software development, artificial intelligence, machine learning, computer vision, and generative AI.</p><p>I enjoy learning by building projects and experimenting with new technologies. My goal is to become a strong software engineer who can combine solid programming fundamentals with modern AI technologies to solve real-world problems.</p><div className="interest-list">{portfolio.interests.map((interest) => <span key={interest}>{interest}</span>)}</div></motion.div><motion.div className="education-card" variants={reveal}><span className="card-index">EDUCATION / 2027</span><GraduationCap size={27} /><h3>B.Tech</h3><p>Computer Science<br />and Engineering</p><div className="card-line" /><small>Focused on building a strong technical foundation and exploring what&apos;s next.</small></motion.div></div>
      </motion.section>

      <motion.section className="section-wrap skills-section" id="skills" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .15 }}><SectionHeading kicker="02 / Toolkit" title="Tools I use to turn ideas into working things." /><div className="skills-grid">{skills.map((skill, index) => { const Icon = iconMap[skill.icon]; return <motion.article className="skill-card" variants={reveal} key={skill.category} custom={index}><div className="skill-top"><Icon size={20} /><span>0{index + 1}</span></div><h3>{skill.category}</h3><div className="chip-list">{skill.items.map((item) => <span key={item}>{item}</span>)}</div></motion.article> })}</div></motion.section>

      <motion.section className="section-wrap projects-section" id="projects" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .12 }}><SectionHeading kicker="03 / Selected work" title="A few things I&apos;ve been building." copy="Real projects, open questions, and a habit of following the problem all the way through." /><div className="projects-list">{projects.map((project, index) => <motion.article className={index === 0 ? 'project-card featured' : 'project-card'} variants={reveal} key={project.name}><div className="project-visual"><span>{project.number}</span><div className="project-scanline" /><div className="project-glyph">{index === 0 ? <BrainCircuit size={70} strokeWidth={1} /> : <CircleDot size={70} strokeWidth={1} />}</div></div><div className="project-content"><span className="kicker">{project.eyebrow}</span><h3>{project.name}</h3><p>{project.description}</p><div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="project-links"><a href={project.github} target="_blank" rel="noreferrer">GitHub <Github size={15} /></a><a href={project.demo}>Live demo <ExternalLink size={15} /></a></div></div></motion.article>)}</div></motion.section>

      <motion.section className="section-wrap split-section" id="experience" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }}><SectionHeading kicker="04 / Experience" title="Learning through doing." /><div className="timeline"><motion.div className="timeline-item" variants={reveal}><span className="timeline-date">2025 — Present</span><div><span className="kicker">Independent</span><h3>AI / GenAI Learning & Project Development</h3><p>Developing hands-on projects in generative AI, machine learning, computer vision, LLM applications, prompt engineering, and AI-powered software systems.</p></div></motion.div><motion.div className="timeline-item muted" variants={reveal}><span className="timeline-date">Next chapter</span><div><span className="kicker">Open slot</span><h3>Internship experience</h3><p>A place for a future internship, role, or collaboration to take shape.</p></div></motion.div></div></motion.section>

      <motion.section className="section-wrap certifications-section" id="certifications" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .15 }}><SectionHeading kicker="05 / Credentials" title="Proof of the work behind the curiosity." /><div className="cert-grid">{certifications.map((cert) => <motion.article className="cert-card" variants={reveal} key={cert.name}><Award size={22} /><span className="cert-year">{cert.year}</span><h3>{cert.name}</h3><p>{cert.organization}</p><a href={cert.link}>View certificate <ArrowUpRight size={14} /></a></motion.article>)}</div></motion.section>

      <motion.section className="section-wrap education-section" id="education" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }}><SectionHeading kicker="06 / Education" title="The foundation." /><div className="education-line"><div className="edu-dot" /><div><span className="timeline-date">Graduating 2027</span><h3>B.Tech — Computer Science Engineering</h3><p>Building a broad foundation across programming, software engineering, and intelligent systems.</p></div></div></motion.section>

      <motion.section className="section-wrap contact-section" id="contact" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .15 }}><div className="contact-layout"><div><SectionHeading kicker="07 / Contact" title="Let&apos;s build something." copy="I&apos;m always interested in learning, building, and connecting with people working on interesting technology." /><div className="contact-details"><a href={`mailto:${portfolio.email}`}><Mail size={17} /> {portfolio.email}</a><a href={portfolio.github} target="_blank" rel="noreferrer"><Github size={17} /> github.com/Jayanth1825</a><a href={portfolio.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn profile</a></div></div><ContactForm /></div></motion.section>

      <section className="resume-band"><div><span className="kicker">Keep exploring</span><h2>Want to know more about my work?</h2></div><a className="button button-primary" href="/resume.pdf" download><Download size={17} /> Download resume</a></section>
    </main>

    <footer className="site-footer"><div><a className="brand" href="#home"><span>JA</span><b>Jayanth<span>.</span></b></a><p>Building, learning, and improving every day.</p></div><div className="footer-right"><div className="social-row"><a href={portfolio.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub size={17} /></a><a href={portfolio.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin size={17} /></a><a href={`mailto:${portfolio.email}`} aria-label="Email"><Mail size={17} /></a></div><small>© 2026 Jayanth Arumalla. All rights reserved.</small></div></footer>
    <AnimatePresence>{showTop && <motion.button className="back-top icon-button" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top"><ArrowUp size={18} /></motion.button>}</AnimatePresence>
  </div>
}

function ContactForm() {
  const [status, setStatus] = useState('')
  const submit = (event) => { event.preventDefault(); const form = new FormData(event.currentTarget); const subject = encodeURIComponent(`Portfolio contact from ${form.get('name')}`); const body = encodeURIComponent(`${form.get('message')}\n\nReply to: ${form.get('email')}`); window.location.href = `mailto:${portfolio.email}?subject=${subject}&body=${body}`; setStatus('Your email client should open with this message ready to send.') }
  return <form className="contact-form" onSubmit={submit}><label>Name<input required name="name" placeholder="Your name" /></label><label>Email<input required type="email" name="email" placeholder="you@example.com" /></label><label>Message<textarea required name="message" rows="4" placeholder="What would you like to build?"></textarea></label><button className="button button-primary" type="submit"><Send size={16} /> Open email draft</button>{status && <p className="form-status">{status}</p>}</form>
}

export default App
