import { useState, useEffect } from "react";
import { /* Moon, Sun, */ Menu, X } from "lucide-react"; // 🔒 Commented icons used for theme toggle
// import { useTheme } from "next-themes"; // 🔒 Temporarily disabled theme support

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const { theme, setTheme } = useTheme(); // 🔒 Dark/light mode temporarily disabled

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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-lg bg-white/70 dark:bg-black/50 shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        {/* 🌟 Logo (Left Side) */}
        <a href="#home" className="flex items-center space-x-1 group">
          <span className="text-2xl font-light text-gray-800 dark:text-gray-200">
            &gt;
          </span>
          <span className="text-2xl font-extrabold text-purple-600 dark:text-purple-400">
            &lt;
          </span>
          <span className="text-xl font-bold ml-1 text-gray-900 dark:text-gray-100 group-hover:text-purple-500 transition-colors">
            BlazeForge
          </span>
        </a>

        {/* 💻 Desktop Menu (Right-Aligned) */}
        <div className="hidden md:flex items-center ml-auto space-x-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative font-medium text-gray-800 dark:text-gray-200 hover:text-purple-500 transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-purple-500 after:transition-all hover:after:w-full"
            >
              {link.name}
            </a>
          ))}

          {/* 🌓 Theme Toggle (Commented Out) */}
          {/*
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-purple-500/10 transition-all"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-purple-400" />
            ) : (
              <Moon className="h-5 w-5 text-purple-600" />
            )}
          </button>
          */}
        </div>

        {/* 📱 Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-purple-500/10 transition-all"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5 text-purple-500" />
          ) : (
            <Menu className="h-5 w-5 text-purple-500" />
          )}
        </button>
      </div>

      {/* 📲 Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 mx-4 rounded-xl p-5 backdrop-blur-lg bg-white/80 dark:bg-black/60 border border-gray-200 dark:border-gray-700 shadow-lg animate-fade-in">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-medium text-gray-800 dark:text-gray-200 hover:text-purple-500 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
