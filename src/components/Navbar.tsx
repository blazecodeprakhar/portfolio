"use client";

import { useState, useEffect } from "react";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
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
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 30;
      setScrolled(isScrolled);

      const sections = navLinks.map((link) => link.href.substring(1));
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

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const sectionId = href.substring(1);
    setActiveSection(sectionId);

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
    <>
      {/* Outer Wrapper handles perfect centering across all screen sizes */}
      <header
        className={`fixed top-0 inset-x-0 z-[100] flex justify-center pointer-events-none transition-all duration-500 ease-out ${
          scrolled ? "pt-3 md:pt-4 px-3 sm:px-6" : "pt-0 px-0"
        }`}
      >
        {/* Floating Capsule / Top Bar */}
        <div
          className={`pointer-events-auto w-full transition-all duration-500 ease-out flex items-center justify-between transform-gpu will-change-[padding,background-color,border-color,box-shadow,border-radius] ${
            scrolled
              ? "max-w-5xl lg:max-w-6xl rounded-full bg-[#080714]/85 backdrop-blur-2xl border border-purple-500/25 shadow-[0_12px_45px_rgba(0,0,0,0.8),0_0_30px_rgba(189,79,244,0.2)] py-2.5 px-4 sm:px-6 md:px-8"
              : "max-w-7xl rounded-none bg-transparent border-b border-transparent py-5 px-6 md:px-10"
          }`}
        >
          {/* Top Sheen Line when scrolled */}
          {scrolled && (
            <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/40 to-transparent pointer-events-none rounded-full" />
          )}

          {/* LOGO */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center group cursor-pointer relative py-1 shrink-0"
          >
            <span className="text-[20px] sm:text-[22px] font-extrabold tracking-tight transition-all duration-300">
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #CC65F5 0%, #CC65F5 50%, #E48A60 100%)",
                }}
              >
                BLAZE
              </span>
            </span>

            {/* Logo Ambient Glow */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full mix-blend-screen pointer-events-none" />
          </a>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 ml-auto">
            {navLinks.map((link) => {
              const sectionId = link.href.substring(1);
              const isActive = activeSection === sectionId;
              const isHovered = hoveredLink === link.name;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={`relative px-3 md:px-4 py-1.5 text-xs md:text-[13px] font-bold tracking-wider uppercase transition-colors duration-200 rounded-full cursor-pointer flex items-center justify-center shrink-0 ${
                    isActive ? "text-white" : "text-gray-300 hover:text-white"
                  }`}
                >
                  {/* Hover Pill */}
                  {isHovered && !isActive && (
                    <motion.div
                      layoutId="hoverNavPill"
                      className="absolute inset-0 bg-white/10 rounded-full pointer-events-none"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}

                  {/* Active Highlight Glass Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/40 via-fuchsia-600/35 to-purple-600/40 border border-purple-400/50 shadow-[0_0_20px_rgba(189,79,244,0.4)]"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}

                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}

            {/* Hire Me CTA Button */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="ml-2 sm:ml-3 px-4 md:px-5 py-1.5 sm:py-2 rounded-full text-xs md:text-[13px] font-bold text-white bg-white/[0.06] border border-purple-400/40 hover:border-purple-400/90 hover:bg-purple-600/30 transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_rgba(189,79,244,0.45)] hover:-translate-y-0.5 relative overflow-hidden group shrink-0"
            >
              <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-[100%] group-hover:animate-[shimmer_1.5s_infinite]" />
              <span className="relative z-10">Hire Me</span>
            </a>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-full border transition-all relative z-50 overflow-hidden outline-none ${
              mobileMenuOpen
                ? "border-transparent bg-white/10"
                : "border-white/10 bg-white/[0.03] hover:bg-white/10"
            }`}
            aria-label="Toggle Menu"
          >
            <MenuToggleIcon
              open={mobileMenuOpen}
              className="h-5 w-5 text-gray-200 relative z-10"
              duration={400}
            />
          </button>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden fixed inset-0 z-[90] bg-[#07070d]/96 backdrop-blur-2xl flex flex-col items-center justify-center min-h-[100dvh]"
            style={{ touchAction: "none" }}
          >
            {/* Background Glow Orbs */}
            <div className="absolute top-1/4 left-10 w-[180px] h-[180px] bg-purple-600/10 rounded-full blur-[70px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-10 w-[180px] h-[180px] bg-fuchsia-600/10 rounded-full blur-[70px] pointer-events-none" />

            <div className="flex flex-col gap-5 text-center w-full px-8 relative z-10 items-center justify-center">
              {navLinks.map((link, i) => {
                const sectionId = link.href.substring(1);
                const isActive = activeSection === sectionId;
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    className="relative group inline-block py-1"
                  >
                    <span
                      className={`text-xl font-bold tracking-widest uppercase transition-all duration-300 ${
                        isActive
                          ? "text-purple-400 drop-shadow-[0_0_10px_rgba(189,79,244,0.6)]"
                          : "text-gray-300 group-hover:text-white"
                      }`}
                    >
                      {link.name}
                    </span>

                    {isActive && (
                      <motion.div
                        layoutId="mobileActiveDot"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-[2px] rounded-full bg-purple-400 shadow-[0_0_8px_rgba(189,79,244,0.8)]"
                      />
                    )}
                  </motion.a>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ delay: navLinks.length * 0.06, duration: 0.4 }}
                className="pt-6"
              >
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact")}
                  className="inline-flex items-center justify-center px-8 py-3 rounded-full text-sm font-bold tracking-widest uppercase text-white bg-gradient-to-r from-purple-600/80 to-fuchsia-600/80 border border-purple-400/40 shadow-[0_0_20px_rgba(189,79,244,0.3)] active:scale-95 transition-all"
                >
                  Hire Me
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;


