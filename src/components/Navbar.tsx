"use client";

import { useState, useEffect } from "react";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map(link => link.href.substring(1));
      let current = "";
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 3) {
            current = sections[i];
            break;
          }
        }
      }
      
      if (!current && window.scrollY < 100) {
          current = "home";
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); 
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (location.pathname === "/") {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", href);
      }
    } else {
      navigate("/" + href);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] ease-out ${
        scrolled && !mobileMenuOpen
          ? "bg-[#07070d]/80 backdrop-blur-xl border-b border-white/[0.05] shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-all duration-500"
          : "bg-transparent border-b border-transparent pt-2 transition-[background-color,border-color,padding] duration-300"
      }`}
    >
      <div
        className={`
          relative z-50
          container mx-auto 
          px-4 md:px-8
          transition-all duration-500
          flex items-center justify-between
          ${scrolled ? "py-4" : "py-6"}
        `}
      >
        {/* LOGO */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="flex items-center group cursor-pointer relative"
        >
          <span
            className="
              text-[22px] md:text-[24px] 
              font-extrabold tracking-tight
              text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300
              transition-all duration-500
              md:group-hover:from-purple-400 md:group-hover:to-fuchsia-400
              drop-shadow-sm
            "
          >
            prakhar<span className="text-[#BD4FF4]">.dev</span>
          </span>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full mix-blend-screen pointer-events-none" />
        </a>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center ml-auto gap-8 lg:gap-12">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative py-2 px-1 text-sm font-semibold tracking-widest uppercase transition-all duration-300 transform group cursor-pointer hover:-translate-y-0.5
                  ${isActive ? 'text-white drop-shadow-sm' : 'text-gray-400 hover:text-white'}`}
              >
                <span className="relative z-10">{link.name}</span>

                <span 
                  className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-purple-500 to-[#BD4FF4] transition-all duration-300 rounded-full
                    ${isActive ? 'w-full opacity-100 shadow-[0_0_12px_rgba(189,79,244,0.8)]' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-50'}
                  `}
                />
                
                <span className="absolute inset-x-0 -bottom-2 h-8 bg-purple-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none rounded-full" />
              </a>
            );
          })}

          <a 
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="ml-4 px-6 py-2.5 rounded-full text-sm font-bold text-white bg-white/[0.03] border border-white/10 hover:border-[#BD4FF4]/50 hover:bg-[#BD4FF4]/10 transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_rgba(189,79,244,0.2)] hover:-translate-y-1 relative overflow-hidden group"
          >
            <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[100%] group-hover:animate-[shimmer_1.5s_infinite]" />
            <span className="relative z-10">Hire Me</span>
          </a>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-2 rounded-xl border transition-all relative z-50 overflow-hidden group outline-none ${
             mobileMenuOpen ? "border-transparent bg-white/5" : "border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.05]"
          }`}
          aria-label="Toggle Menu"
        >
          <div className="absolute inset-0 bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
          <MenuToggleIcon
            open={mobileMenuOpen}
            className="h-6 w-6 text-gray-200 relative z-10"
            duration={400}
          />
        </button>
      </div>

      {/* MOBILE MENU PANEL (Premium Full-Screen Overlay) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden fixed inset-0 z-40 bg-[#07070d]/98 backdrop-blur-md flex flex-col items-center justify-center min-h-[100dvh] transform-gpu will-change-[opacity]"
            style={{ touchAction: 'none' }} 
          >
            {/* Tamed background glows */}
            <div className="absolute top-1/3 left-0 w-[200px] h-[200px] bg-purple-500/5 rounded-full blur-[80px] pointer-events-none -translate-x-1/2" />
            <div className="absolute bottom-1/3 right-0 w-[200px] h-[200px] bg-fuchsia-500/5 rounded-full blur-[80px] pointer-events-none translate-x-1/2" />

            <div className="flex flex-col gap-6 text-center w-full px-6 relative z-10 items-center justify-center">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative group inline-block"
                  >
                    <span className={`
                      text-2xl font-black tracking-[0.1em] uppercase py-1 transition-all duration-300 block
                      ${isActive ? 'text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]' : 'text-white/60 group-active:text-white'}
                    `}>
                      {link.name}
                    </span>
                    {/* Active dot indicator on mobile */}
                    {isActive && (
                      <motion.div 
                        layoutId="mobileActiveDot"
                        className="absolute -left-5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" 
                      />
                    )}
                  </motion.a>
                );
              })}

              {/* Minimal Balanced Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ delay: navLinks.length * 0.08, duration: 0.5 }}
                className="pt-6"
              >
                <a 
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact")}
                  className="inline-flex items-center justify-center w-full min-w-[200px] px-8 py-3.5 rounded-full text-sm font-bold tracking-widest uppercase text-white bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] transition-all transform active:scale-95"
                >
                  Start a Project
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
