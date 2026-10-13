import { FaRegEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white/90 backdrop-blur-sm border-t border-line/20 py-12">
      <div className="flex flex-col items-center gap-6 text-center">
        <a href="#top" className="flex items-center gap-2 text-2xl font-bold text-ink">
          <span className="text-accent">ME</span><span>°</span>
        </a>
        <p className="text-muted">© {new Date().getFullYear()} Mazin Emad</p>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/MazinEmad"
            aria-label="GitHub"
            className="flex items-center justify-center w-10 h-10 border border-line/30 rounded-full hover:bg-line/10 transition-colors duration-300"
          >
            <FaGithub className="w-5 h-5 text-ink" />
          </a>
          <a
            href="https://www.linkedin.com/"
            aria-label="LinkedIn"
            className="flex items-center justify-center w-10 h-10 border border-line/30 rounded-full hover:bg-line/10 transition-colors duration-300"
          >
            <FaLinkedin className="w-5 h-5 text-ink" />
          </a>
          <a
            href="mailto:mazinemaddev@gmail.com"
            aria-label="Email"
            className="flex items-center justify-center w-10 h-10 border border-line/30 rounded-full hover:bg-line/10 transition-colors duration-300"
          >
            <FaRegEnvelope className="w-5 h-5 text-ink" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
