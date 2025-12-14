"use client";

import { Github, Linkedin, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0E0E10] text-white pt-16 pb-10 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">

        {/* TOP INFO SECTION */}
        <div className="text-center md:text-left space-y-4 mb-12">
          <a
            href="#home"
            className="text-3xl font-bold text-white hover:text-[#BD4FF4] transition-colors duration-300 cursor-pointer"
          >
            prakhar.dev
          </a>

          <p className="text-white/60 max-w-2xl">
            Your destination for modern web development, portfolio showcases, and
            premium digital experiences crafted with precision.
          </p>
        </div>

        {/* GRID SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* COLUMN 1 */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white/80">NAVIGATION</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-white/60 hover:text-[#BD4FF4] transition-colors">Home</a></li>
              <li><a href="#skills" className="text-white/60 hover:text-[#BD4FF4] transition-colors">Skills</a></li>
              <li><a href="#projects" className="text-white/60 hover:text-[#BD4FF4] transition-colors">Projects</a></li>
              <li><a href="#gallery" className="text-white/60 hover:text-[#BD4FF4] transition-colors">Gallery</a></li>
              <li><a href="#contact" className="text-white/60 hover:text-[#BD4FF4] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* COLUMN 2 */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white/80">RESOURCES</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/60 hover:text-[#BD4FF4] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-white/60 hover:text-[#BD4FF4] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-white/60 hover:text-[#BD4FF4] transition-colors">Support</a></li>
            </ul>
          </div>

          {/* COLUMN 3 */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white/80">PORTFOLIO</h3>
            <ul className="space-y-2">
              <li><a href="#projects" className="text-white/60 hover:text-[#BD4FF4] transition-colors">Web Apps</a></li>
              <li><a href="#skills" className="text-white/60 hover:text-[#BD4FF4] transition-colors">Technologies</a></li>
              <li><a href="#gallery" className="text-white/60 hover:text-[#BD4FF4] transition-colors">Gallery</a></li>
            </ul>
          </div>

          {/* COLUMN 4 — CONNECT WITH ME */}
          <div className="space-y-5 group">
            <h3
              className="text-sm font-semibold text-white/80
                         transition-all duration-300
                         group-hover:text-[#BD4FF4]
                         group-hover:drop-shadow-[0_0_8px_#BD4FF4]"
            >
              CONNECT WITH ME
            </h3>

            {/* SOCIAL ICONS */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/blazecodeprakhar"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/10 rounded-full
                           transition-all duration-300
                           hover:scale-110
                           hover:bg-white/20
                           hover:shadow-[0_0_15px_#ffffff]"
              >
                <Github className="w-5 h-5 text-white" />
              </a>

              <a
                href="https://www.linkedin.com/in/prakhar-yadav-0963s8299/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/10 rounded-full
                           transition-all duration-300
                           hover:scale-110
                           hover:bg-white/20
                           hover:shadow-[0_0_15px_#0077B5]"
              >
                <Linkedin className="w-5 h-5 text-[#0077B5]" />
              </a>

              <a
                href="https://www.instagram.com/iitzprakhar/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/10 rounded-full
                           transition-all duration-300
                           hover:scale-110
                           hover:bg-white/20
                           hover:shadow-[0_0_15px_#E4405F]"
              >
                <Instagram className="w-5 h-5 text-[#E4405F]" />
              </a>

              <a
                href="mailto:prakharyadav096@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/10 rounded-full
                           transition-all duration-300
                           hover:scale-110
                           hover:bg-white/20
                           hover:shadow-[0_0_15px_#BD4FF4]"
              >
                <Mail className="w-5 h-5 text-[#BD4FF4]" />
              </a>
            </div>

            {/* EMAIL & PHONE */}
            <div className="space-y-1 text-white/70">
              <a
                href="mailto:prakharyadav096@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-all duration-300
                           hover:text-[#BD4FF4]
                           hover:underline
                           hover:drop-shadow-[0_0_6px_#BD4FF4]"
              >
                prakharyadav096@gmail.com
              </a>

              <a
                href="tel:+916390498069"
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-all duration-300
                           hover:text-[#BD4FF4]
                           hover:underline
                           hover:drop-shadow-[0_0_6px_#BD4FF4]"
              >
                +91 63904 98069
              </a>
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-14 pt-6 border-t border-white/10 text-center text-white/50 text-sm">
          © 2025{" "}
          <a
            href="https://blazecodeprakhar.github.io/blazeforge/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#BD4FF4] transition-colors font-semibold"
          >
            prakhar.dev
          </a>{" "}
          All Rights Reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
