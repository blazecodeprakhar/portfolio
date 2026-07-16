"use client";

import { Github, Linkedin, Instagram, Mail, ArrowRight } from "lucide-react";
import { LaserSnake } from "@/components/ui/laser-snake";

// Reusable Footer Link Component with Micro-Animation
const FooterLink = ({ href, label }: { href: string; label: string }) => (
  <li>
    <a
      href={href}
      className="group flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 w-fit"
    >
      <span className="w-0 h-[2px] bg-gradient-to-r from-[#BD4FF4] to-violet-500 transition-all duration-300 group-hover:w-4 rounded-full opacity-0 group-hover:opacity-100" />
      <span className="group-hover:translate-x-1 transition-transform duration-300 font-medium">
        {label}
      </span>
    </a>
  </li>
);

const Footer = () => {
  return (
    <footer className="relative bg-[#07070d] text-white pt-24 pb-8 overflow-hidden group/footer">
      <LaserSnake />

      {/* ---------------- BACKGROUND DEPTH & AMBIENT GLOWS ---------------- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-[#BD4FF4]/20 to-transparent" />

      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-fuchsia-600/5 rounded-full blur-[120px] pointer-events-none translate-y-1/3 translate-x-1/3" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">

        {/* ---------------- TOP INFO BRANDING ---------------- */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-16 lg:mb-20">
          <div className="text-center md:text-left space-y-4">
            <a
              href="#home"
              className="inline-block text-4xl font-extrabold cursor-pointer transition-all duration-500"
            >
              {/* blazecode */}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                blazecode
              </span>

              {/* prakhar (50-50 gradient) */}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #CC65F5 0%, #CC65F5 50%, #E48A60 100%)",
                }}
              >
                prakhar
              </span>
            </a>
            <p className="text-gray-400/80 max-w-md font-light leading-relaxed text-sm lg:text-base">
              Crafting premium digital experiences. Bringing bold visions to life through modern web architecture and stunning UI/UX design.
            </p>
          </div>

          <div className="hidden md:block">
            <a href="#contact" className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white/[0.03] border border-white/10 hover:border-[#BD4FF4]/50 hover:bg-[#BD4FF4]/10 text-white font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(189,79,244,0.2)]">
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* ---------------- GRID SECTION ---------------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* COLUMN 1 */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-white tracking-[0.15em] uppercase">Navigation</h3>
            <ul className="space-y-4">
              <FooterLink href="#home" label="Home" />
              <FooterLink href="#skills" label="Technical Skills" />
              <FooterLink href="#projects" label="Work & Projects" />
              <FooterLink href="#gallery" label="Photography" />
              <FooterLink href="#contact" label="Get In Touch" />
            </ul>
          </div>

          {/* COLUMN 2 */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-white tracking-[0.15em] uppercase">Resources</h3>
            <ul className="space-y-4">
              <FooterLink href="#" label="Privacy Policy" />
              <FooterLink href="#" label="Terms of Service" />
              <FooterLink href="#" label="Cookie Guidelines" />
              <FooterLink href="#" label="Direct Support" />
            </ul>
          </div>

          {/* COLUMN 3 */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-white tracking-[0.15em] uppercase">Portfolio Base</h3>
            <ul className="space-y-4">
              <FooterLink href="#projects" label="Web Applications" />
              <FooterLink href="#projects" label="Open Source" />
              <FooterLink href="#skills" label="Tech Insights" />
              <FooterLink href="#gallery" label="Visual Gallery" />
            </ul>
          </div>

          {/* COLUMN 4 — CONNECT WITH ME */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-white tracking-[0.15em] uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#BD4FF4] animate-pulse" />
              Connect With Me
            </h3>

            {/* PREMIUM SOCIAL ICONS */}
            <div className="flex items-center gap-3">
              {[
                { icon: Github, href: "https://github.com/blazecodeprakhar", color: "group-hover:border-white/40 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/prakhar-yadav096/", color: "group-hover:border-[#0077B5]/40 group-hover:shadow-[0_0_15px_rgba(0,119,181,0.3)] group-hover:text-[#0077B5]" },
                { icon: Instagram, href: "https://www.instagram.com/iitzprakhar/", color: "group-hover:border-[#E4405F]/40 group-hover:shadow-[0_0_15px_rgba(228,64,95,0.3)] group-hover:text-[#E4405F]" },
                { icon: Mail, href: "mailto:prakharyadav096@gmail.com", color: "group-hover:border-[#BD4FF4]/40 group-hover:shadow-[0_0_15px_rgba(189,79,244,0.3)] group-hover:text-[#BD4FF4]" }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative p-3.5 bg-white/[0.02] border border-white/[0.05] rounded-xl transition-all duration-300 hover:-translate-y-1.5 focus:outline-none group overflow-hidden ${social.color}`}
                >
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-current relative z-10 transition-colors" />
                </a>
              ))}
            </div>

            {/* DIRECT COMMS */}
            <div className="space-y-3 pt-2">
              <a
                href="mailto:prakharyadav096@gmail.com"
                className="group flex flex-col items-start gap-0.5 w-fit"
              >
                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold group-hover:text-gray-400 transition-colors">Direct Email</span>
                <span className="text-gray-300 font-medium group-hover:text-[#BD4FF4] transition-colors relative block">
                  prakharyadav096@gmail.com
                  <span className="absolute left-0 -bottom-1 w-0 h-px bg-[#BD4FF4] transition-all duration-300 group-hover:w-full" />
                </span>
              </a>

              <a
                href="tel:+916390498069"
                className="group flex flex-col items-start gap-0.5 w-fit"
              >
                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold group-hover:text-gray-400 transition-colors">Mobile Support</span>
                <span className="text-gray-300 font-medium group-hover:text-[#BD4FF4] transition-colors relative block">
                  +91 63904 98069
                  <span className="absolute left-0 -bottom-1 w-0 h-px bg-[#BD4FF4] transition-all duration-300 group-hover:w-full" />
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* ---------------- COPYRIGHT BOTTOM BAR ---------------- */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm font-medium">
            © {new Date().getFullYear()}{" "}
            <a
              href="https://blazecodeprakhar.github.io/blazeforge/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#BD4FF4] transition-colors font-bold"
            >
              blazecodeprakhar
            </a>{" "}
            All Rights Reserved.
          </p>

          {/* Back to top micro-interaction */}
          <a href="#home" className="text-xs uppercase tracking-widest text-gray-500 font-bold hover:text-[#BD4FF4] transition-colors flex items-center gap-2 group">
            Back to Top
            <ArrowRight className="w-3 h-3 -rotate-90 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
