import { Github, Linkedin, Instagram, Mail } from "lucide-react";
import { useEffect, useRef } from "react";

interface SocialLink {
  name: string;
  icon: React.ElementType;
  url: string;
  glowColor: string;
  textColor: string;
}

const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/blazecodeprakhar",
    glowColor: "#6e5494", // GitHub purple glow
    textColor: "#6e5494",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/prakhar-yadav-0963s8299/",
    glowColor: "#0077B5",
    textColor: "#0077B5",
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/iitzprakhar/",
    glowColor: "#E4405F",
    textColor: "#E4405F",
  },
  {
    name: "Email",
    icon: Mail,
    url: "mailto:prakharyadav096@gmail.com",
    glowColor: "#9b59b6", // Light purple for email
    textColor: "#9b59b6",
  },
];

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = sectionRef.current;
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section id="contact" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div
          ref={sectionRef}
          className="max-w-4xl mx-auto text-center opacity-0"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Connect with Me
          </h2>
          <p className="text-muted-foreground text-lg mb-12">
            Let's collaborate and create something amazing together
          </p>

          {/* Social Links */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 justify-items-center">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div
                    className="h-28 w-28 flex flex-col items-center justify-center rounded-2xl
                    bg-[#f3f3f3] dark:bg-[#1c1c1c] text-black dark:text-white
                    transition-all duration-300 hover:scale-110"
                    style={{
                      boxShadow: "0 0 0 transparent",
                    }}
                    onMouseEnter={(e) => {
                      (
                        e.currentTarget as HTMLElement
                      ).style.boxShadow = `0 0 25px ${social.glowColor}`;
                      (e.currentTarget as HTMLElement).style.color =
                        social.textColor;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "0 0 0 transparent";
                      (e.currentTarget as HTMLElement).style.color = "";
                    }}
                  >
                    <Icon className="h-8 w-8 mb-2 transition-transform duration-300 group-hover:scale-125" />
                    <p className="text-sm font-medium">{social.name}</p>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Email Button */}
          <div className="mt-16 pt-8 border-t border-border/50">
            <p className="text-muted-foreground mb-4">
              Ready to start a project?
            </p>
            <a
              href="mailto:prakharyadav096@gmail.com"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-accent text-accent-foreground rounded-full font-semibold hover:scale-105 transition-transform shadow-lg"
            >
              <Mail className="h-5 w-5" />
              <span>Send me an email</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
