"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowDownRight, ArrowUpRight, Mail, Menu, X } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "motion/react";

const HeroCanvas = dynamic(() => import("@/components/HeroCanvas"), { ssr: false });
const projects = [
  { name: "Wasyelh", type: "Learning platform", image: "/wsyelh/dashboard.jpeg", number: "01", link: "https://examcorrection.wsyelhi.com/" },
  { name: "Qudra", type: "Assessment experience", image: "/qudra/landing.png", number: "02", link: "https://qudra-web.vercel.app/" },
  { name: "El Dokan", type: "Modern commerce", image: "/el-dokan/home.png", number: "03", link: "https://el-dokan.vercel.app/" },
  { name: "Again", type: "Offline-first invoicing", image: "/again/invoices.png", number: "04", link: "#contact" },
];

function LiquidGlass({ children, className = "" }) {
  const surfaceRef = useRef(null);
  useEffect(() => {
    let glass; let active = true;
    import("liquid-glass-js").then(({ default: LiquidGlassEffect }) => {
      if (!active || !surfaceRef.current) return;
      glass = new LiquidGlassEffect({ background: document.querySelector("#ambient-scene"), width: 1, height: 1, radius: 28, scale: 12, blur: 2, glow: 0.08, edge: 0.35, draggable: false, x: -1000, y: -1000 });
    });
    return () => { active = false; glass?.destroy(); };
  }, []);
  return <div ref={surfaceRef} className={`glass ${className}`}>{children}</div>;
}

export default function Home() {
  const [open, setOpen] = useState(false);
  const nav = ["About", "Work", "Capabilities", "Contact"];
  return <main id="ambient-scene">
    <div className="grain" />
    <header className="nav-wrap">
      <a className="wordmark" href="#top" aria-label="Mazin Emad home">ME<span>°</span></a>
      <nav className={open ? "nav-links open" : "nav-links"}>
        {nav.map((item) => (
          <a
            onClick={() => setOpen(false)}
            key={item}
            href={`#${item.toLowerCase()}`}
            className="hover:text-accent transition-colors duration-300"
          >
            {item}
          </a>
        ))}
      </nav>
      <a className="availability" href="mailto:mazinemaddev@gmail.com">
        <i /> Available for select work
      </a>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle menu">
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
    </header>
    <section className="hero" id="top">
      <div className="shader-layer"><HeroCanvas /></div>
      <div className="hero-copy">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="eyebrow"
        >
          Independent software engineer · Egypt
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hero-heading"
        >
          I make digital<br /><em>things feel clear.</em>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hero-summary"
        >
          Thoughtful interfaces and full-stack systems for people who value both precision and ease.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hero-actions"
        >
          <div className="flex flex-col space-y-6">
            <a
              className="button button-dark"
              href="#work"
            >
              Explore selected work <ArrowDownRight size={17} />
            </a>
            <a
              className="text-link"
              href="/Mazin_Emad_FullStack.pdf"
              target="_blank"
            >
              Read my resume <ArrowUpRight size={16} />
            </a>
          </div>
        </motion.div>
      </div>
      <LiquidGlass className="hero-orb">
        <div className="orb-reflection" />
      </LiquidGlass>
      <div className="hero-foot">
        <span>Scroll to wander</span>
        <span className="scroll-line" />
        <span>2026</span>
      </div>
    </section>
    <section id="about" className="intro section-pad">
      <p className="section-label">01 / A little introduction</p>
      <div className="intro-grid">
        <h2>Technology should<br />feel <em>considered.</em></h2>
        <div className="intro-side">
          <p>I’m Mazin — a software engineer who pairs enduring engineering with calm, useful design. I care about the in-between moments: the pause before a page answers, the confidence of a familiar pattern, the pleasure of a task feeling lighter.</p>
          <a className="text-link" href="#contact">
            Let’s work together <ArrowDownRight size={16} />
          </a>
        </div>
      </div>
    </section>
    <section id="work" className="work section-pad">
      <div className="section-head">
        <div>
          <p className="section-label">02 / Selected work</p>
          <h2>Made to be<br /><em>remembered.</em></h2>
        </div>
        <p>A few recent products where strategy, interface, and implementation meet.</p>
      </div>
      <div className="project-list">
        {projects.map((project, index) => (
          <motion.article
            key={project.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
            className="project-card"
          >
            <div className="project-image">
              <img src={project.image} alt={`${project.name} project`} />
              <div className="project-shade" />
            </div>
            <div className="project-meta">
              <span>{project.number}</span>
              <div>
                <h3>{project.name}</h3>
                <p>{project.type}</p>
              </div>
              <a
                href={project.link || "#contact"}
                {...(project.link?.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                aria-label={`Ask about ${project.name}`}
              >
                <ArrowUpRight size={20} />
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
    <section id="capabilities" className="capabilities section-pad">
      <p className="section-label">03 / Ways I can help</p>
      <div className="capability-grid">
        <h2>Small details,<br /><em>wide impact.</em></h2>
        <div className="capability-list">
          {[
            ["01", "Interface systems", "Distinct, durable user experiences that hold together at every scale."],
            ["02", "Full-stack builds", "Responsive web products from a polished first screen to dependable infrastructure."],
            ["03", "Frontend craft", "Fast, accessible React and Next.js implementations that never feel generic."]
          ].map(([no, title, text]) => (
            <motion.div
              key={no}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: parseInt(no) * 0.08 }}
              className="capability-item"
            >
              <span>{no}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
              <ArrowUpRight size={19} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    <section id="contact" className="contact section-pad">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="contact-card"
      >
        <p className="section-label">04 / Have a project in mind?</p>
        <h2>Let’s create<br />something <em>quietly<br />exceptional.</em></h2>
        <a
          className="button button-dark"
          href="mailto:mazinemaddev@gmail.com"
        >
          Start a conversation <ArrowUpRight size={17} />
        </a>
      </motion.div>
    </section>
    <footer>
      <a className="wordmark" href="#top">
        ME<span>°</span>
      </a>
      <span>© {new Date().getFullYear()} Mazin Emad</span>
      <div>
        <a href="https://github.com/MazinEmad" aria-label="GitHub">
          <FaGithub size={17} />
        </a>
        <a href="https://www.linkedin.com/" aria-label="LinkedIn">
          <FaLinkedin size={17} />
        </a>
        <a href="mailto:mazinemaddev@gmail.com" aria-label="Email">
          <Mail size={17} />
        </a>
      </div>
    </footer>
  </main>;
}
