"use client";

import { useState, useEffect } from "react";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "backdrop-blur-lg bg-white/70 dark:bg-black/50 shadow-md"
        : "bg-transparent"
        }`}
    >
      <div
        className="
          container mx-auto 
          px-3 py-3.5
          md:px-6 md:py-4
          flex items-center justify-between
        "
      >
        {/* LOGO */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="flex items-center group cursor-pointer"
        >
          <span
            className="
              text-[21px] md:text-[23px] 
              font-bold tracking-wide 

              /* PHONE → ALWAYS PURPLE */
              text-purple-500

              /* DESKTOP → NORMAL COLORS */
              md:text-gray-900 md:dark:text-gray-100

              /* DESKTOP HOVER */
              transition-colors md:group-hover:text-purple-500
            "
          >
            prakhar.dev
          </span>
        </a>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center ml-auto space-x-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="relative font-medium text-gray-800 dark:text-gray-200 hover:text-purple-500 transition-colors
                after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-purple-500 
                after:transition-all hover:after:w-full cursor-pointer"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-purple-500/10 transition-all"
          aria-label="Toggle Menu"
        >
          <MenuToggleIcon
            open={mobileMenuOpen}
            className="h-6 w-6 text-purple-500"
            duration={400}
          />
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${mobileMenuOpen ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"
          }`}
      >
        <div className="mx-3 rounded-xl p-5 backdrop-blur-lg bg-white/85 dark:bg-black/60 border border-gray-200 dark:border-gray-700 shadow-lg">
          <div className="flex flex-col space-y-4 text-[16px]">

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="
                  font-semibold 
                  text-white        /* PHONE ALWAYS WHITE */
                  dark:text-white
                  transition-none
                  cursor-pointer
                "
              >
                {link.name}
              </a>
            ))}

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
